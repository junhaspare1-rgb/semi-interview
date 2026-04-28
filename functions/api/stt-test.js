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

const isUploadedFile = (value) =>
  Boolean(
    value &&
      typeof value === "object" &&
      typeof value.size === "number" &&
      typeof value.arrayBuffer === "function",
  );

const koreanSttPrompt = `
이 음성은 한국어로 진행되는 반도체 공정기술/양산기술 녹음 테스트입니다.
반도체 용어와 약어를 그대로 보존해 전사하세요.
특히 다음 표현을 정확히 인식하세요: CVD, ALD, 박막, 스텝커버리지, Step Coverage, 증착 공정, 유니포미티, Uniformity.
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

const transcribeAudio = async ({ apiKey, audio }) => {
  const model = "gpt-4o-transcribe";
  const body = new FormData();
  body.append("file", audio, audio.name || "stt-test.webm");
  body.append("model", model);
  body.append("response_format", "json");
  body.append("language", "ko");
  body.append("temperature", "0");
  body.append("prompt", koreanSttPrompt);
  body.append("chunking_strategy", "auto");

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
  return {
    transcript: cleanText(payload.text, MAX_TEXT_LENGTH),
    model,
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
    return json({ ok: false, message: "AI 녹음 테스트 관리자 인증이 필요합니다." }, 403);
  }

  const audio = formData.get("audio");
  if (!isUploadedFile(audio) || audio.size <= 0) {
    return json({ ok: false, message: "오디오 파일이 필요합니다." }, 400);
  }

  if (audio.size > MAX_AUDIO_BYTES) {
    return json({ ok: false, message: "오디오 파일은 25MB 이하만 지원합니다." }, 413);
  }

  try {
    const result = await transcribeAudio({ apiKey, audio });
    return json({
      ok: true,
      ...result,
      audio: {
        size: audio.size,
        type: audio.type || "",
      },
      expectedText: cleanText(formData.get("expectedText"), 1000),
    });
  } catch (error) {
    return json({ ok: false, message: error.message || "STT 테스트 중 오류가 발생했습니다." });
  }
};

export const onRequestGet = () => json({ ok: false, message: "POST 요청만 지원합니다." }, 405);
