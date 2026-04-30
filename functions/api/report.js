const MAX_TEXT_LENGTH = 1800;
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

const safeObject = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value;
};

const buildRecord = (payload, request) => {
  const reportText = cleanText(payload.reportText);

  if (!reportText) {
    return { error: "신고 내용을 입력해주세요." };
  }

  const createdAt = new Date().toISOString();
  const id = crypto.randomUUID();

  return {
    record: {
      id,
      createdAt,
      reportText,
      question: safeObject(payload.question),
      context: safeObject(payload.context),
      client: safeObject(payload.client),
      request: {
        country: request.cf?.country || null,
        userAgent: cleanText(request.headers.get("user-agent"), 300),
      },
    },
  };
};

const storeInKv = async (env, record) => {
  const kv = env.REPORT_KV || env.FEEDBACK_KV;
  if (!kv) {
    return false;
  }

  await kv.put(`report:${record.createdAt}:${record.id}`, JSON.stringify(record), {
    metadata: {
      createdAt: record.createdAt,
      questionNumber: String(record.question?.number || ""),
    },
  });
  return true;
};

export const onRequestOptions = () => json({ ok: true });

export const onRequestPost = async ({ request, env }) => {
  let payload;

  try {
    payload = await request.json();
  } catch (error) {
    return json({ ok: false, message: "올바른 JSON 요청이 아닙니다." }, 400);
  }

  const { record, error } = buildRecord(payload, request);
  if (error) {
    return json({ ok: false, message: error }, 400);
  }

  try {
    const storedInKv = await storeInKv(env, record);

    if (!storedInKv) {
      return json({ ok: false, message: "문제 신고 저장소 설정이 필요합니다." }, 503);
    }

    return json({ ok: true, id: record.id, storedInKv });
  } catch (error) {
    return json({ ok: false, message: error.message }, 502);
  }
};

export const onRequestGet = () => json({ ok: false, message: "POST 요청만 지원합니다." }, 405);
