const MAX_COMMENT_LENGTH = 1200;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "no-store",
    },
  });

const cleanText = (value, maxLength = MAX_COMMENT_LENGTH) =>
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
  const rating = Number(payload.rating);

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: "별점은 1점부터 5점까지 선택해주세요." };
  }

  const createdAt = new Date().toISOString();
  const id = crypto.randomUUID();

  return {
    record: {
      id,
      createdAt,
      rating,
      comment: cleanText(payload.comment),
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
  if (!env.FEEDBACK_KV) {
    return false;
  }

  await env.FEEDBACK_KV.put(`feedback:${record.createdAt}:${record.id}`, JSON.stringify(record), {
    metadata: {
      rating: String(record.rating),
      createdAt: record.createdAt,
    },
  });
  return true;
};

const storeInD1 = async (env, record) => {
  const db = env.FEEDBACK_DB || env.DB;
  if (!db) {
    return false;
  }

  await db
    .prepare(
      "INSERT INTO feedback (id, created_at, rating, comment, context_json, client_json, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(
      record.id,
      record.createdAt,
      record.rating,
      record.comment,
      JSON.stringify(record.context),
      JSON.stringify(record.client),
      record.request.userAgent,
    )
    .run();
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

  const errors = [];
  let storedInKv = false;
  let storedInD1 = false;

  try {
    storedInKv = await storeInKv(env, record);
  } catch (error) {
    errors.push(`KV: ${error.message}`);
  }

  try {
    storedInD1 = await storeInD1(env, record);
  } catch (error) {
    errors.push(`D1: ${error.message}`);
  }

  if (!storedInKv && !storedInD1) {
    return json(
      {
        ok: false,
        message: "피드백 저장소 설정이 필요합니다.",
        errors,
      },
      errors.length ? 502 : 503,
    );
  }

  return json({
    ok: true,
    id: record.id,
    storedInKv,
    storedInD1,
  });
};

export const onRequestGet = () => json({ ok: false, message: "POST 요청만 지원합니다." }, 405);
