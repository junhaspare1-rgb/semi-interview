const MAX_AUDIO_BYTES = 25 * 1024 * 1024;
const MAX_TEXT_LENGTH = 6000;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
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

const parseKeywords = (value) => {
  try {
    const parsed = JSON.parse(String(value || "[]"));
    return Array.isArray(parsed) ? parsed.map((item) => cleanText(item, 80)).filter(Boolean).slice(0, 20) : [];
  } catch (error) {
    return [];
  }
};

const isUploadedFile = (value) =>
  Boolean(
    value &&
      typeof value === "object" &&
      typeof value.size === "number" &&
      typeof value.arrayBuffer === "function",
  );

const koreanSttPrompt = `
이 음성은 한국어로 진행되는 반도체 공정기술/양산기술 모의면접 답변입니다.
반도체 용어와 약어를 그대로 보존해 전사하세요.
자주 등장하는 용어: 포토, 노광, PR, 레지스트, DOF, Depth of Focus, CD, Overlay, Etch, 식각, 증착, Deposition, CVD, PVD, ALD, CMP, 이온주입, Anneal, 수율, 불량, Lot, Wafer, Chamber, Recipe, SPC, FDC, DOE, 공정 조건, 균일도, 선택비, 플라즈마, RF Power, ESC, PM.
들리지 않는 부분은 억지로 추측하지 말고 자연스럽게 생략하세요.
`.trim();

const readOpenAiError = async (response, fallbackMessage) => {
  const responseText = await response.text().catch(() => "");

  try {
    const payload = responseText ? JSON.parse(responseText) : {};
    return payload.error?.message || payload.message || `${fallbackMessage} (HTTP ${response.status})`;
  } catch (error) {
    const excerpt = compactText(responseText);
    if (!excerpt) {
      return `${fallbackMessage} (HTTP ${response.status})`;
    }
    if (excerpt.startsWith("<!DOCTYPE html") || excerpt.startsWith("<html")) {
      return `${fallbackMessage} (HTTP ${response.status}). AI 제공업체 또는 Cloudflare에서 HTML 오류 페이지를 반환했습니다.`;
    }
    return `${fallbackMessage} (HTTP ${response.status}): ${excerpt}`;
  }
};

const evaluationSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    transcript: { type: "string" },
    totalScore: { type: "number", minimum: 0, maximum: 100 },
    rubric: {
      type: "object",
      additionalProperties: false,
      properties: {
        technicalAccuracy: {
          type: "object",
          additionalProperties: false,
          properties: {
            score: { type: "number", minimum: 0, maximum: 35 },
            maxScore: { type: "number" },
            comment: { type: "string" },
          },
          required: ["score", "maxScore", "comment"],
        },
        structure: {
          type: "object",
          additionalProperties: false,
          properties: {
            score: { type: "number", minimum: 0, maximum: 25 },
            maxScore: { type: "number" },
            comment: { type: "string" },
          },
          required: ["score", "maxScore", "comment"],
        },
        problemSolving: {
          type: "object",
          additionalProperties: false,
          properties: {
            score: { type: "number", minimum: 0, maximum: 20 },
            maxScore: { type: "number" },
            comment: { type: "string" },
          },
          required: ["score", "maxScore", "comment"],
        },
        clarity: {
          type: "object",
          additionalProperties: false,
          properties: {
            score: { type: "number", minimum: 0, maximum: 10 },
            maxScore: { type: "number" },
            comment: { type: "string" },
          },
          required: ["score", "maxScore", "comment"],
        },
        keywordCoverage: {
          type: "object",
          additionalProperties: false,
          properties: {
            score: { type: "number", minimum: 0, maximum: 10 },
            maxScore: { type: "number" },
            comment: { type: "string" },
          },
          required: ["score", "maxScore", "comment"],
        },
      },
      required: ["technicalAccuracy", "structure", "problemSolving", "clarity", "keywordCoverage"],
    },
    strengths: {
      type: "array",
      items: { type: "string" },
    },
    improvements: {
      type: "array",
      items: { type: "string" },
    },
    missedKeywords: {
      type: "array",
      items: { type: "string" },
    },
    suggestedAnswer: { type: "string" },
    caution: { type: "string" },
  },
  required: [
    "transcript",
    "totalScore",
    "rubric",
    "strengths",
    "improvements",
    "missedKeywords",
    "suggestedAnswer",
    "caution",
  ],
};

const extractResponseText = (payload) => {
  if (typeof payload.output_text === "string") return payload.output_text;

  const textParts = [];
  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") {
        textParts.push(content.text);
      }
    }
  }
  return textParts.join("\n").trim();
};

const transcribeAudio = async ({ apiKey, model, audio }) => {
  const body = new FormData();
  body.append("file", audio, audio.name || "answer.webm");
  body.append("model", model);
  body.append("response_format", "json");
  body.append("language", "ko");
  body.append("temperature", "0");

  if (!model.includes("diarize")) {
    body.append("prompt", koreanSttPrompt);
  }

  if (model.startsWith("gpt-4o")) {
    body.append("chunking_strategy", "auto");
  }

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  });

  if (!response.ok) {
    throw new Error(await readOpenAiError(response, "음성 전사 요청에 실패했습니다."));
  }

  const payload = await response.json().catch(() => ({}));
  return cleanText(payload.text, MAX_TEXT_LENGTH);
};

const analyzeAnswer = async ({ apiKey, model, transcript, question, modelAnswer, keywords, category, difficulty }) => {
  const prompt = `
당신은 반도체 공정기술/양산기술 직무 면접관입니다.
지원자의 답변 전사문을 평가해 주세요.

평가 기준:
- 기술 정확성 35점
- 질문 대응성/답변 구조 25점
- 실무 문제해결 관점 20점
- 표현 명확성 10점
- 키워드 커버리지 10점

반드시 한국어로, 취업준비생이 바로 고칠 수 있는 구체적인 피드백을 작성하세요.
모범 답안을 그대로 베끼라고 하지 말고, 지원자의 답변을 기준으로 부족한 논리와 키워드를 짚어주세요.
`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: JSON.stringify({
            question,
            category,
            difficulty,
            expectedKeywords: keywords,
            modelAnswer,
            transcript,
          }),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "interview_answer_evaluation",
          strict: true,
          schema: evaluationSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(await readOpenAiError(response, "AI 분석 요청에 실패했습니다."));
  }

  const payload = await response.json().catch(() => ({}));
  const outputText = extractResponseText(payload);
  if (!outputText) {
    throw new Error("AI 분석 결과가 비어 있습니다.");
  }

  const evaluation = JSON.parse(outputText);
  return {
    ...evaluation,
    transcript,
  };
};

export const onRequestOptions = () => json({ ok: true });

export const onRequestPost = async ({ request, env }) => {
  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    return json({ ok: false, message: "OPENAI_API_KEY 설정이 필요합니다." }, 503);
  }

  let formData;
  try {
    formData = await request.formData();
  } catch (error) {
    return json({ ok: false, message: "multipart/form-data 요청만 지원합니다." }, 400);
  }

  const expectedAdminKey = String(env.AI_ADMIN_KEY || "0811").trim();
  const adminKey = cleanText(formData.get("adminKey"), 80);
  if (!adminKey || adminKey !== expectedAdminKey) {
    return json({ ok: false, message: "AI 모의면접 관리자 인증이 필요합니다." }, 403);
  }

  const audio = formData.get("audio");
  if (!isUploadedFile(audio) || audio.size <= 0) {
    return json({ ok: false, message: "오디오 파일이 필요합니다." }, 400);
  }

  if (audio.size > MAX_AUDIO_BYTES) {
    return json({ ok: false, message: "오디오 파일은 25MB 이하만 지원합니다." }, 413);
  }

  const fileType = String(audio.type || "").toLowerCase();
  const fileName = String(audio.name || "").toLowerCase();
  if (!fileType.includes("webm") && !fileName.endsWith(".webm")) {
    return json({ ok: false, message: "현재 webm 녹화 파일만 지원합니다." }, 400);
  }

  const question = cleanText(formData.get("question"), 1200);
  if (!question) {
    return json({ ok: false, message: "질문 정보가 필요합니다." }, 400);
  }

  const modelAnswer = cleanText(formData.get("modelAnswer"), MAX_TEXT_LENGTH);
  const keywords = parseKeywords(formData.get("keywords"));
  const category = cleanText(formData.get("category"), 120);
  const difficulty = cleanText(formData.get("difficulty"), 60);
  const sttModel = "gpt-4o-transcribe";
  const scoreModel = env.AI_SCORE_MODEL || "gpt-5-mini";

  try {
    const transcript = await transcribeAudio({ apiKey, model: sttModel, audio });
    const evaluation = await analyzeAnswer({
      apiKey,
      model: scoreModel,
      transcript,
      question,
      modelAnswer,
      keywords,
      category,
      difficulty,
    });

    return json({
      ok: true,
      evaluation: {
        ...evaluation,
        model: {
          stt: sttModel,
          scoring: scoreModel,
        },
      },
    });
  } catch (error) {
    return json({ ok: false, message: error.message || "AI 채점 중 오류가 발생했습니다." });
  }
};

export const onRequestGet = () => json({ ok: false, message: "POST 요청만 지원합니다." }, 405);
