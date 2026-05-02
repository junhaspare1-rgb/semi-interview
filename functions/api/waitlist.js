const MAX_EMAIL_LENGTH = 254;
const MAX_TEXT_LENGTH = 300;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  const email = cleanText(payload.email, MAX_EMAIL_LENGTH);
  const role = cleanText(payload.role, 80);
  const roleLabel = cleanText(payload.roleLabel, 120);

  if (!email || !EMAIL_PATTERN.test(email)) {
    return { error: "알림을 받을 이메일을 정확히 입력해주세요." };
  }

  if (!role) {
    return { error: "직무 선택 정보가 필요합니다." };
  }

  const createdAt = new Date().toISOString();
  const id = crypto.randomUUID();

  return {
    record: {
      id,
      createdAt,
      email,
      role,
      roleLabel,
      source: cleanText(payload.source, 80) || "landing",
      path: cleanText(payload.path, 300),
      client: safeObject(payload.client),
      request: {
        country: request.cf?.country || null,
        userAgent: cleanText(request.headers.get("user-agent"), 300),
      },
    },
  };
};

const storeWaitlistRecord = async (env, record) => {
  const kv = env.WAITLIST_KV || env.FEEDBACK_KV;
  if (!kv) {
    return false;
  }

  await kv.put(`waitlist:${record.createdAt}:${record.id}`, JSON.stringify(record), {
    metadata: {
      role: record.role,
      roleLabel: record.roleLabel,
      createdAt: record.createdAt,
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
    const stored = await storeWaitlistRecord(env, record);
    if (!stored) {
      return json({ ok: false, message: "대기자 명단 저장소 설정이 필요합니다." }, 503);
    }
  } catch (error) {
    return json({ ok: false, message: "대기자 명단 저장에 실패했습니다.", detail: error.message }, 502);
  }

  return json({
    ok: true,
    id: record.id,
  });
};

export const onRequestGet = () => json({ ok: false, message: "POST 요청만 지원합니다." }, 405);
