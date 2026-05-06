const QUESTION_COUNT = 10;
const CANDIDATE_COUNT = 24;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TEXT_LENGTH = 8000;
const MAX_SOURCE_SPANS = 18;
const PROMPT_VERSION = "resume_interview_question_generator_v1.0";
const CATEGORY_VALUES = [
  "Self_Introduction",
  "Motivation",
  "Experience_Deep_Dive",
  "Technical_Depth",
  "Semiconductor_Process",
  "Problem_Solving",
  "Collaboration",
  "Risk_Or_Gap",
  "Follow_Up",
];
const PRIORITY_VALUES = ["High", "Medium", "Low"];
const SUPPORTED_EXTENSIONS = new Set(["pdf", "doc", "docx", "txt"]);
const MIME_BY_EXTENSION = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  txt: "text/plain",
};
const ROLE_LABELS = {
  process: "공정기술/양산기술",
  "package-test": "Package & Test",
  device: "소자",
  personality: "인성 면접",
};
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...SECURITY_HEADERS,
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "no-store",
    },
  });

const cleanText = (value, maxLength = MAX_TEXT_LENGTH) =>
  String(value || "")
    .trim()
    .slice(0, maxLength);

const compactText = (value, maxLength = 260) =>
  cleanText(value, maxLength)
    .replace(/\s+/g, " ")
    .trim();

const readOpenAiError = async (response, fallbackMessage) => {
  const responseText = await response.text().catch(() => "");

  try {
    const payload = responseText ? JSON.parse(responseText) : {};
    return payload.error?.message || payload.message || `${fallbackMessage} (HTTP ${response.status})`;
  } catch (error) {
    const excerpt = compactText(responseText);
    if (!excerpt) return `${fallbackMessage} (HTTP ${response.status})`;
    if (excerpt.startsWith("<!DOCTYPE html") || excerpt.startsWith("<html")) {
      return `${fallbackMessage} (HTTP ${response.status}). AI 제공업체 또는 Cloudflare에서 HTML 오류 페이지를 반환했습니다.`;
    }
    return `${fallbackMessage} (HTTP ${response.status}): ${excerpt}`;
  }
};

const extractResponseText = (payload) => {
  if (typeof payload.output_text === "string") return payload.output_text;

  const textParts = [];
  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") {
        textParts.push(content.text);
      }
      if (typeof content.refusal === "string") {
        textParts.push(content.refusal);
      }
    }
  }
  return textParts.join("\n").trim();
};

const parseJsonOutput = (payload, fallbackMessage) => {
  const text = extractResponseText(payload);
  if (!text) {
    throw new Error(fallbackMessage);
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${fallbackMessage}: ${compactText(text)}`);
  }
};

const isUploadedFile = (value) =>
  Boolean(
    value &&
      typeof value === "object" &&
      typeof value.size === "number" &&
      typeof value.arrayBuffer === "function",
  );

const fileExtension = (filename = "") => String(filename).split(".").pop().toLowerCase();

const safeFilename = (filename = "resume.pdf") => {
  const cleaned = String(filename || "resume.pdf")
    .replace(/[^\w.\-가-힣 ]+/g, "_")
    .trim();
  return cleaned || "resume.pdf";
};

const arrayBufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    let chunkBinary = "";
    for (const byte of chunk) {
      chunkBinary += String.fromCharCode(byte);
    }
    binary += chunkBinary;
  }
  return btoa(binary);
};

const fileToInputFile = async (file) => {
  const extension = fileExtension(file.name);
  const mime = file.type || MIME_BY_EXTENSION[extension] || "application/octet-stream";
  const base64 = arrayBufferToBase64(await file.arrayBuffer());
  return {
    type: "input_file",
    filename: safeFilename(file.name || `resume.${extension || "pdf"}`),
    file_data: `data:${mime};base64,${base64}`,
  };
};

const authTokenFromRequest = (request) => {
  const header = request.headers.get("Authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || "";
};

const verifySupabaseUser = async ({ env, token }) => {
  const supabaseUrl = cleanText(env.SUPABASE_URL || env.PUBLIC_SUPABASE_URL || "", 300).replace(/\/$/, "");
  const supabaseAnonKey = cleanText(env.SUPABASE_ANON_KEY || env.PUBLIC_SUPABASE_ANON_KEY || "", 1000);
  if (!supabaseUrl || !supabaseAnonKey || !token) return null;

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: supabaseAnonKey,
    },
  });
  if (!response.ok) return null;
  const payload = await response.json().catch(() => null);
  return payload?.id ? payload : null;
};

const sourceSpanSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    source_span_id: { type: "string" },
    section: { type: "string" },
    text: { type: "string" },
  },
  required: ["source_span_id", "section", "text"],
};

const documentSummarySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    target_role: { type: "string" },
    candidate_strengths: { type: "array", items: { type: "string" } },
    candidate_risks: { type: "array", items: { type: "string" } },
    detected_semiconductor_topics: { type: "array", items: { type: "string" } },
  },
  required: ["target_role", "candidate_strengths", "candidate_risks", "detected_semiconductor_topics"],
};

const extractionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    document_summary: documentSummarySchema,
    source_spans: {
      type: "array",
      items: sourceSpanSchema,
    },
    quality_warnings: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["document_summary", "source_spans", "quality_warnings"],
};

const evidenceSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    source_span_id: { type: "string" },
    quote: { type: "string" },
    reason: { type: "string" },
  },
  required: ["source_span_id", "quote", "reason"],
};

const rubricScoresSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    evidence_fit: { type: "integer", minimum: 1, maximum: 5 },
    role_relevance: { type: "integer", minimum: 1, maximum: 5 },
    specificity: { type: "integer", minimum: 1, maximum: 5 },
    diagnostic_value: { type: "integer", minimum: 1, maximum: 5 },
    follow_up_potential: { type: "integer", minimum: 1, maximum: 5 },
  },
  required: ["evidence_fit", "role_relevance", "specificity", "diagnostic_value", "follow_up_potential"],
};

const questionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    question_id: { type: "string" },
    question: { type: "string" },
    category: { type: "string", enum: CATEGORY_VALUES },
    priority: { type: "string", enum: PRIORITY_VALUES },
    interviewer_intent: { type: "string" },
    evidence: {
      type: "array",
      items: evidenceSchema,
    },
    answer_direction: {
      type: "array",
      items: { type: "string" },
    },
    follow_up_questions: {
      type: "array",
      items: { type: "string" },
    },
    rubric_scores: rubricScoresSchema,
    my_interview_tags: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: [
    "question_id",
    "question",
    "category",
    "priority",
    "interviewer_intent",
    "evidence",
    "answer_direction",
    "follow_up_questions",
    "rubric_scores",
    "my_interview_tags",
  ],
};

const questionGenerationSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    document_summary: documentSummarySchema,
    question_set: {
      type: "array",
      items: questionSchema,
    },
    quality_warnings: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["document_summary", "question_set", "quality_warnings"],
};

const normalizeSourceSpan = (span, index) => ({
  source_span_id: cleanText(span?.source_span_id || span?.sourceSpanId || `s_${String(index + 1).padStart(3, "0")}`, 40),
  section: cleanText(span?.section || `지원서 문단 ${index + 1}`, 80),
  text: cleanText(span?.text || "", 1200),
});

const normalizeSourceSpans = (items) =>
  (Array.isArray(items) ? items : [])
    .map(normalizeSourceSpan)
    .filter((span) => span.text)
    .slice(0, MAX_SOURCE_SPANS);

const buildSourceSpansFromText = (sourceText) => {
  const source = cleanText(sourceText);
  const roughParagraphs = source
    .split(/\n{2,}/)
    .flatMap((paragraph) => (paragraph.length > 1400 ? paragraph.split(/\n/) : [paragraph]))
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const spans = [];
  for (const paragraph of roughParagraphs) {
    for (let index = 0; index < paragraph.length && spans.length < MAX_SOURCE_SPANS; index += 1200) {
      const text = paragraph.slice(index, index + 1200).trim();
      if (text) {
        spans.push({
          source_span_id: `s_${String(spans.length + 1).padStart(3, "0")}`,
          section: `지원서 문단 ${spans.length + 1}`,
          text,
        });
      }
    }
  }
  return spans;
};

const normalizeDocumentSummary = (summary, targetRoleLabel) => ({
  target_role: cleanText(summary?.target_role || targetRoleLabel, 80),
  candidate_strengths: normalizeStringArray(summary?.candidate_strengths, 8),
  candidate_risks: normalizeStringArray(summary?.candidate_risks, 8),
  detected_semiconductor_topics: normalizeStringArray(summary?.detected_semiconductor_topics, 12),
});

const normalizeStringArray = (items, limit = 20) =>
  (Array.isArray(items) ? items : [])
    .map((item) => cleanText(item, 160))
    .filter(Boolean)
    .slice(0, limit);

const normalizeEvidence = (items, sourceSpans) => {
  const knownIds = new Set(sourceSpans.map((span) => span.source_span_id));
  return (Array.isArray(items) ? items : [])
    .map((item) => {
      const fallbackSpan = sourceSpans[0] || { source_span_id: "s_001", text: "" };
      const sourceSpanId = cleanText(item?.source_span_id || item?.sourceSpanId || fallbackSpan.source_span_id, 40);
      return {
        source_span_id: knownIds.has(sourceSpanId) ? sourceSpanId : fallbackSpan.source_span_id,
        quote: cleanText(item?.quote || fallbackSpan.text, 420),
        reason: cleanText(item?.reason || "지원서 내용에서 면접관이 검증할 수 있는 근거입니다.", 260),
      };
    })
    .filter((item) => item.quote)
    .slice(0, 3);
};

const normalizeRubricScores = (scores = {}) => ({
  evidence_fit: Math.min(5, Math.max(1, Number(scores.evidence_fit) || 3)),
  role_relevance: Math.min(5, Math.max(1, Number(scores.role_relevance) || 3)),
  specificity: Math.min(5, Math.max(1, Number(scores.specificity) || 3)),
  diagnostic_value: Math.min(5, Math.max(1, Number(scores.diagnostic_value) || 3)),
  follow_up_potential: Math.min(5, Math.max(1, Number(scores.follow_up_potential) || 3)),
});

const normalizeQuestionCandidate = (question, index, sourceSpans) => {
  const category = CATEGORY_VALUES.includes(question?.category) ? question.category : "Experience_Deep_Dive";
  const priority = PRIORITY_VALUES.includes(question?.priority) ? question.priority : "Medium";
  const evidence = normalizeEvidence(question?.evidence, sourceSpans);
  return {
    question_id: cleanText(question?.question_id || `c_${String(index + 1).padStart(3, "0")}`, 40),
    question: cleanText(question?.question, 360),
    category,
    priority,
    interviewer_intent: cleanText(question?.interviewer_intent, 600),
    evidence,
    answer_direction: normalizeStringArray(question?.answer_direction, 8),
    follow_up_questions: normalizeStringArray(question?.follow_up_questions, 3),
    rubric_scores: normalizeRubricScores(question?.rubric_scores),
    my_interview_tags: normalizeStringArray(question?.my_interview_tags, 10),
  };
};

const normalizeQuestionCandidates = (items, sourceSpans) =>
  (Array.isArray(items) ? items : [])
    .map((question, index) => normalizeQuestionCandidate(question, index, sourceSpans))
    .filter((question) => question.question && question.evidence.length)
    .slice(0, 40);

const questionScore = (question) => {
  const scores = question.rubric_scores || {};
  const priorityBonus = question.priority === "High" ? 0.25 : question.priority === "Medium" ? 0.1 : 0;
  return (
    (Number(scores.evidence_fit) || 1) * 0.3 +
    (Number(scores.role_relevance) || 1) * 0.2 +
    (Number(scores.specificity) || 1) * 0.15 +
    (Number(scores.diagnostic_value) || 1) * 0.15 +
    (Number(scores.follow_up_potential) || 1) * 0.1 +
    priorityBonus
  );
};

const duplicateKey = (question) =>
  cleanText(question.question, 260)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "");

const selectFinalQuestions = (candidates) => {
  const eligible = candidates.filter((question) => question.rubric_scores.evidence_fit >= 3);
  const sorted = (eligible.length ? eligible : candidates).slice().sort((a, b) => questionScore(b) - questionScore(a));
  const selected = [];
  const selectedKeys = new Set();
  const sourceCounts = new Map();

  const addCandidate = (question, { relaxSourceLimit = false } = {}) => {
    if (selected.length >= QUESTION_COUNT) return false;
    const key = duplicateKey(question);
    if (!key || selectedKeys.has(key)) return false;
    const primarySourceId = question.evidence[0]?.source_span_id || "";
    if (!relaxSourceLimit && primarySourceId && (sourceCounts.get(primarySourceId) || 0) >= 2) return false;

    selected.push(question);
    selectedKeys.add(key);
    if (primarySourceId) {
      sourceCounts.set(primarySourceId, (sourceCounts.get(primarySourceId) || 0) + 1);
    }
    return true;
  };

  const addByCategory = (categories, count) => {
    for (const question of sorted) {
      if (selected.filter((item) => categories.includes(item.category)).length >= count) return;
      if (categories.includes(question.category)) {
        addCandidate(question);
      }
    }
  };

  addByCategory(["Risk_Or_Gap"], 1);
  addByCategory(["Experience_Deep_Dive"], 3);
  addByCategory(["Technical_Depth", "Semiconductor_Process"], 3);

  for (const question of sorted) {
    addCandidate(question);
  }
  for (const question of sorted) {
    addCandidate(question, { relaxSourceLimit: true });
  }

  return selected.slice(0, QUESTION_COUNT).map((question, index) => ({
    ...question,
    question_id: `rq_${String(index + 1).padStart(3, "0")}`,
  }));
};

const callOpenAiJson = async ({ apiKey, model, input, schema, name, maxOutputTokens = 6000 }) => {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input,
      max_output_tokens: maxOutputTokens,
      text: {
        format: {
          type: "json_schema",
          name,
          strict: true,
          schema,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(await readOpenAiError(response, "AI 요청에 실패했습니다."));
  }

  return parseJsonOutput(await response.json(), "AI 응답을 JSON으로 해석하지 못했습니다.");
};

const extractSourceSpansFromFile = async ({ apiKey, model, file, sourceText, context }) => {
  const fileInput = await fileToInputFile(file);
  const payload = await callOpenAiJson({
    apiKey,
    model,
    name: "resume_source_span_extraction",
    schema: extractionSchema,
    maxOutputTokens: 5000,
    input: [
      {
        role: "system",
        content: `
너는 반도체 취업 지원서 분석 도우미다.
지원서 파일과 추가 입력 텍스트를 문단 단위 source_span으로 구조화한다.
이름, 전화번호, 이메일, 주소, 생년월일 등 개인정보는 질문 생성에 불필요하면 제외하거나 일반화한다.
문서에 없는 경험이나 성과를 만들지 말고, 면접 질문 근거로 쓸 수 있는 실제 문장만 남긴다.
반드시 JSON Schema를 따른다.
`.trim(),
      },
      {
        role: "user",
        content: [
          fileInput,
          {
            type: "input_text",
            text: JSON.stringify({
              target_company: context.targetCompany,
              target_role: context.targetRoleLabel,
              interview_type: context.interviewType,
              extra_source_text: sourceText,
              source_span_limit: MAX_SOURCE_SPANS,
            }),
          },
        ],
      },
    ],
  });

  return {
    document_summary: normalizeDocumentSummary(payload.document_summary, context.targetRoleLabel),
    source_spans: normalizeSourceSpans(payload.source_spans),
    quality_warnings: normalizeStringArray(payload.quality_warnings, 8),
  };
};

const generateQuestionCandidates = async ({ apiKey, model, context, documentSummary, sourceSpans }) => {
  const payload = await callOpenAiJson({
    apiKey,
    model,
    name: "resume_interview_question_candidates",
    schema: questionGenerationSchema,
    maxOutputTokens: 9000,
    input: [
      {
        role: "system",
        content: `
너는 반도체 기업 면접관이자 반도체 취업 코치다.
지원자의 지원서 source_spans를 근거로 실제 면접관이 물어볼 가능성이 높은 질문 후보를 만든다.

원칙:
1. source_spans에 근거가 있는 질문을 우선 생성한다.
2. 문서에 없는 경험, 기술, 성과를 사실처럼 만들지 않는다.
3. Generic 질문은 낮은 우선순위로 둔다.
4. 질문마다 면접관 의도, 지원서 근거, 답변 방향, 꼬리질문, rubric 점수를 포함한다.
5. 난이도 필드는 만들지 않는다.
6. 지나치게 사적이거나 차별적이거나 면접과 무관한 질문은 생성하지 않는다.

후보는 ${CANDIDATE_COUNT}개를 목표로 만들고, category와 priority는 반드시 enum 안에서 선택한다.
반드시 JSON Schema를 따른다.
`.trim(),
      },
      {
        role: "user",
        content: JSON.stringify({
          target_company: context.targetCompany,
          target_role: context.targetRoleLabel,
          interview_type: context.interviewType,
          question_count: QUESTION_COUNT,
          candidate_count: CANDIDATE_COUNT,
          document_summary: documentSummary,
          source_spans: sourceSpans,
          rubric: {
            evidence_fit: "지원서 실제 문장과 연결되는 정도",
            role_relevance: "반도체 직무 면접에서 물어볼 법한 정도",
            specificity: "지원자에게 구체적으로 맞는 정도",
            diagnostic_value: "역량, 사고방식, 경험 진위를 검증하는 가치",
            follow_up_potential: "꼬리질문으로 깊게 파고들 수 있는 정도",
          },
        }),
      },
    ],
  });

  return {
    document_summary: normalizeDocumentSummary(payload.document_summary, context.targetRoleLabel),
    question_set: normalizeQuestionCandidates(payload.question_set, sourceSpans),
    quality_warnings: normalizeStringArray(payload.quality_warnings, 8),
  };
};

export const onRequestOptions = () => json({ ok: true });

export const onRequestGet = () => json({ ok: false, message: "POST multipart/form-data만 지원합니다." }, 405);

export const onRequestPost = async ({ request, env }) => {
  try {
    const contentType = request.headers.get("Content-Type") || request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("multipart/form-data")) {
      return json({ ok: false, message: "multipart/form-data POST 요청만 지원합니다." }, 415);
    }

    const token = authTokenFromRequest(request);
    const user = await verifySupabaseUser({ env, token });
    if (!user) {
      return json({ ok: false, message: "로그인 후 사용할 수 있습니다." }, 401);
    }

    const apiKey = cleanText(env.OPENAI_API_KEY || env.OPENAI_KEY || "", 1000);
    if (!apiKey) {
      return json({ ok: false, message: "AI 생성 서버 설정이 아직 완료되지 않았습니다." }, 500);
    }

    const form = await request.formData();
    const targetCompany = cleanText(form.get("targetCompany"), 80) || "지원 회사";
    const targetRole = cleanText(form.get("targetRole"), 80) || "process";
    const targetRoleLabel = ROLE_LABELS[targetRole] || targetRole;
    const interviewType = cleanText(form.get("interviewType"), 40) || "종합";
    const sourceText = cleanText(form.get("sourceText"));
    const resumeFile = form.get("resumeFile");
    const hasFile = isUploadedFile(resumeFile) && resumeFile.size > 0;

    if (!sourceText && !hasFile) {
      return json({ ok: false, message: "지원서 파일 또는 핵심 내용을 입력해주세요." }, 400);
    }

    if (hasFile) {
      if (resumeFile.size > MAX_FILE_BYTES) {
        return json({ ok: false, message: "파일은 최대 8MB까지 업로드할 수 있습니다." }, 413);
      }
      const extension = fileExtension(resumeFile.name);
      if (!SUPPORTED_EXTENSIONS.has(extension)) {
        return json({ ok: false, message: "PDF, DOC, DOCX, TXT 파일만 업로드할 수 있습니다." }, 400);
      }
    }

    const model = cleanText(env.AI_RESUME_MODEL || "gpt-5-mini", 80);
    const context = {
      targetCompany,
      targetRole,
      targetRoleLabel,
      interviewType,
    };

    let extraction = {
      document_summary: normalizeDocumentSummary(null, targetRoleLabel),
      source_spans: buildSourceSpansFromText(sourceText),
      quality_warnings: [],
    };

    if (hasFile) {
      extraction = await extractSourceSpansFromFile({
        apiKey,
        model,
        file: resumeFile,
        sourceText,
        context,
      });
      if (!extraction.source_spans.length && sourceText) {
        extraction.source_spans = buildSourceSpansFromText(sourceText);
        extraction.quality_warnings.push("파일에서 충분한 문단을 추출하지 못해 입력 텍스트를 기준으로 질문을 생성했습니다.");
      }
    }

    if (!extraction.source_spans.length) {
      return json({ ok: false, message: "지원서에서 질문 근거로 사용할 텍스트를 찾지 못했습니다." }, 400);
    }

    const generated = await generateQuestionCandidates({
      apiKey,
      model,
      context,
      documentSummary: extraction.document_summary,
      sourceSpans: extraction.source_spans,
    });
    const finalQuestions = selectFinalQuestions(generated.question_set);

    if (finalQuestions.length < QUESTION_COUNT) {
      return json({ ok: false, message: "최종 질문 10개를 만들 만큼 근거가 충분하지 않습니다. 지원서 핵심 내용을 더 구체적으로 입력해주세요." }, 422);
    }

    const generationRunId = `resume-run-${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
    return json({
      ok: true,
      generation_run_id: generationRunId,
      prompt_version: PROMPT_VERSION,
      model_version: model,
      target_company: targetCompany,
      target_role: targetRoleLabel,
      role_id: targetRole,
      document_summary: generated.document_summary,
      source_spans: extraction.source_spans,
      question_set: finalQuestions,
      quality_warnings: [...extraction.quality_warnings, ...generated.quality_warnings].slice(0, 8),
    });
  } catch (error) {
    return json(
      {
        ok: false,
        message: error?.message || "질문 생성 중 오류가 발생했습니다.",
      },
      500,
    );
  }
};
