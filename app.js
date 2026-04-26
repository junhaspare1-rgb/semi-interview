const legacyQuestions = [
  {
    text: "포토 공정에서 DOF(Depth Of Focus)를 개선하기 위한 방안을 얘기해주세요.",
    answer:
      "DOF는 노광 공정에서 초점 허용 범위를 의미합니다. 개선 방향은 먼저 focus/exposure matrix로 공정 윈도우를 확인하고, 레지스트 두께와 평탄도, NA와 조명 조건, 웨이퍼 topography 영향을 분리해 봅니다. 양산 관점에서는 overlay와 CD uniformity를 함께 확인하면서 공정 조건 변경 전후의 수율, 결함, 계측 신뢰도를 검증해야 합니다.",
  },
  {
    text: "Etch 공정 후 CD가 타깃보다 크게 나왔을 때 원인 가설과 대응 순서를 설명해주세요.",
    answer:
      "먼저 계측 이상인지 확인하고, 이후 recipe 변경 이력, chamber 상태, gas flow, pressure, RF power, ESC temperature, mask 두께를 점검합니다. 단기적으로는 lot hold와 동일 조건 재계측으로 확산을 막고, 장기적으로는 split lot 또는 DOE로 영향 인자를 검증한 뒤 관리 기준과 PM 조건을 업데이트합니다.",
  },
  {
    text: "양산 라인에서 특정 Lot의 수율이 급락했을 때 공정기술 담당자가 확인해야 할 항목은 무엇인가요?",
    answer:
      "수율 map과 불량 bin을 먼저 보고 공간 패턴을 확인합니다. 이후 공정 이력, 장비 이력, SPC/FDC 이상, 계측 데이터, 소재 lot, recipe 변경 여부를 시간순으로 대조합니다. 의심 공정을 좁힌 뒤 동일 장비와 타 장비 비교, 전후 lot 비교, 필요 시 hold와 재작업 가능성을 검토합니다.",
  },
  {
    text: "CMP 공정에서 dishing 또는 erosion이 커졌을 때 어떤 방식으로 문제를 접근하시겠습니까?",
    answer:
      "패턴 밀도와 layout 영향, pad condition, slurry, down force, platen speed, endpoint 조건을 분리해 봅니다. 계측 데이터로 위치별 경향을 확인하고, pad life와 conditioner 상태 같은 소모품 변수를 함께 봅니다. 개선은 제거율 안정화, dummy pattern 검토, recipe window 재설정 순서로 접근합니다.",
  },
  {
    text: "공정 recipe 변경을 양산에 적용하기 전에 어떤 검증이 필요하다고 생각하나요?",
    answer:
      "변경 목적과 위험도를 정의한 뒤 split lot, DOE, 신뢰성 영향, 계측 repeatability, 수율 영향, downstream 공정 영향을 확인해야 합니다. 품질 gate와 승인 절차를 통과한 뒤에는 초기 적용 lot을 모니터링하고, 이상 발생 시 rollback 기준을 명확히 둬야 합니다.",
  },
  {
    text: "Overlay 불량이 증가했을 때 포토 공정 관점에서 확인할 원인을 설명해주세요.",
    answer:
      "Alignment mark 상태, reticle 이슈, stage drift, wafer chucking, 노광 장비 matching, 전공정 막 두께 변화와 열 이력을 확인합니다. 단순히 노광 조건만 보지 않고 계측 recipe와 lot 흐름도 같이 봐야 하며, 장비별/slot별/wafer zone별 패턴으로 원인을 좁힙니다.",
  },
  {
    text: "박막 증착 공정에서 두께 균일도가 악화되었을 때 점검할 항목은 무엇인가요?",
    answer:
      "가스 유량, pressure, temperature, plasma 상태, showerhead 오염, wafer spacing, chamber seasoning 상태를 확인합니다. 장비 PM 직후인지, 특정 zone에서만 발생하는지, 전후 lot과 같은 패턴인지 비교하고 SPC 추세로 서서히 변한 문제인지 급격한 문제인지 구분합니다.",
  },
  {
    text: "공정기술 직무에서 데이터 기반 문제 해결이 중요한 이유를 설명해주세요.",
    answer:
      "양산 문제는 원인이 복합적이라 직감만으로 판단하면 잘못된 recipe 변경이나 불필요한 장비 조치를 할 수 있습니다. 데이터 기반 접근은 불량 패턴, 공정 이력, 장비 신호, 계측값을 연결해 원인을 좁히고 재현성 있는 개선안을 만들게 해줍니다. 결국 수율, 품질, 생산성을 동시에 지키기 위해 필요합니다.",
  },
  {
    text: "공정 조건을 바꾸면 수율은 좋아졌지만 공정 시간이 늘어났습니다. 어떻게 판단하시겠습니까?",
    answer:
      "수율 개선 효과와 throughput 손실을 정량화해 전체 생산성과 비용 관점에서 비교합니다. 고객 품질, 병목 공정 여부, 장비 capacity, 장기 안정성도 함께 봐야 합니다. 필요하면 조건을 세분화해 핵심 제품이나 취약 layer에만 적용하는 방식도 검토할 수 있습니다.",
  },
  {
    text: "면접관이 '왜 공정기술 직무인가요?'라고 물으면 어떻게 답변하시겠습니까?",
    answer:
      "공정기술은 물리, 화학, 장비, 데이터가 실제 제품 수율로 연결되는 지점이라 문제 해결의 결과가 명확합니다. 저는 원인을 구조화하고 데이터로 검증하는 과정에 흥미가 있고, 양산 현장에서 안정적인 공정 조건을 만들어 제품 경쟁력에 기여하고 싶다고 답변하면 좋습니다.",
  },
];

const MAIN_PROCESS_CATEGORIES = new Set(["포토(Lithography)", "식각(Etch)", "증착(Deposition)"]);
const DIFFICULTY_ALIASES = {
  실무: "실전",
};
const normalizeDifficulty = (difficulty) => DIFFICULTY_ALIASES[difficulty] || difficulty;
const sourceQuestions = Array.isArray(window.BANMYEONPPU_PROCESS_QUESTIONS)
  ? window.BANMYEONPPU_PROCESS_QUESTIONS
  : [];
const questionBank = sourceQuestions
  .map((question, index) => ({
    id: question.id ?? index + 1,
    jobRole: question.jobRole || "공정기술",
    category: question.category || "기타",
    group: question.group || (MAIN_PROCESS_CATEGORIES.has(question.category) ? "main" : "other"),
    difficulty: normalizeDifficulty(question.difficulty || "입문"),
    text: question.question || question.text || "",
    answer: question.answer || "",
    keywords: Array.isArray(question.keywords) ? question.keywords : [],
    active: question.active !== false,
  }))
  .filter((question) => question.active && question.difficulty !== "지엽" && question.text)
  .map((question, index) => ({ ...question, originalIndex: index }));
const questions = questionBank.length
  ? questionBank
  : legacyQuestions.map((question, index) => ({
      ...question,
      id: index + 1,
      category: "기타",
      group: "main",
      difficulty: "실전",
      originalIndex: index,
    }));

const state = {
  config: {
    questionCount: 5,
    prepSeconds: 0,
    answerSeconds: 180,
    rigor: "입문",
  },
  sessionQuestions: [],
  completedQuestions: [],
  currentIndex: 0,
  phase: "prep",
  remaining: 60,
  timerId: null,
  cameraStream: null,
  recorder: null,
  recordedChunks: [],
  recordings: [],
  recordingQuestion: null,
  recordingEnabled: true,
  micAnimationId: null,
  feedbackRating: 0,
  feedbackSubmitting: false,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const elements = {};
const HELP_DISMISS_KEY = "banmyeonppu_help_hidden_until";
const FEEDBACK_QUEUE_KEY = "banmyeonppu_feedback_queue";
const REPORT_QUEUE_KEY = "banmyeonppu_report_queue";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const cacheElements = () => {
  [
    "homeView",
    "checkView",
    "interviewView",
    "resultView",
    "exitModal",
    "finishModal",
    "reportModal",
    "feedbackModal",
    "helpModal",
    "legalModal",
    "helpButton",
    "closeHelpButton",
    "closeHelpFooterButton",
    "dismissHelpTodayButton",
    "developerMessageTemplate",
    "helpMessage",
    "privacyTemplate",
    "termsTemplate",
    "disclaimerTemplate",
    "legalTitle",
    "legalContent",
    "closeLegalButton",
    "questionCount",
    "targetRole",
    "prepTime",
    "answerTime",
    "answerValue",
    "startInterview",
    "cameraCheckPreview",
    "cameraCheckPlaceholder",
    "checkCameraButton",
    "enterInterviewButton",
    "micStatus",
    "micLevel",
    "speakerStatus",
    "speakerTestButton",
    "recordingModeNotice",
    "recordingModeOn",
    "recordingModeOff",
    "cameraCheckState",
    "micCheckState",
    "speakerCheckState",
    "questionProgress",
    "rigorLabel",
    "questionText",
    "reportQuestionButton",
    "reportQuestionPreview",
    "reportText",
    "cancelReportButton",
    "sendReportButton",
    "feedbackStars",
    "feedbackComment",
    "feedbackStatus",
    "skipFeedbackButton",
    "submitFeedbackButton",
    "phaseLabel",
    "timerMode",
    "timerText",
    "cameraPreview",
    "cameraPlaceholder",
    "skipPrepButton",
    "nextQuestionButton",
    "finishInterviewButton",
    "resultHomeButton",
    "restartInterviewButton",
    "resultList",
    "summaryQuestions",
    "summaryRecordings",
    "summaryRigor",
    "cancelExitButton",
    "confirmExitButton",
    "cancelFinishButton",
    "confirmFinishButton",
  ].forEach((id) => {
    elements[id] = $(`#${id}`);
  });
  elements.webcamPanel = $(".webcam-panel");
  elements.cameraCheckFrame = $(".camera-check-frame");
};

const renderIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

const formatTime = (seconds) => {
  const safeSeconds = Math.max(0, seconds);
  const mins = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
  const secs = String(safeSeconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
};

const getSelectedRigor = () => $(".rigor-card.active")?.dataset.rigor || "입문";

const shuffleQuestions = (items) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
};

const questionsForDifficulty = (difficulty) =>
  questions.filter((question) => question.difficulty === difficulty && question.difficulty !== "지엽");

const mainQuestionTarget = (count, mainAvailable, otherAvailable) => {
  let target = Math.round(count * 0.65);

  if (count >= 3) {
    const minMain = Math.ceil(count * 0.6);
    const maxMain = Math.max(minMain, Math.floor(count * 0.7));
    target = Math.min(maxMain, Math.max(minMain, target));
  }

  target = Math.min(target, mainAvailable);

  if (otherAvailable < count - target) {
    target = Math.min(mainAvailable, count - otherAvailable);
  }

  return Math.max(0, target);
};

const buildQuestionSet = (count) => {
  const difficulty = state.config.rigor;
  const pool = questionsForDifficulty(difficulty);
  const targetCount = Math.min(count, pool.length);
  const mainPool = shuffleQuestions(pool.filter((question) => question.group === "main"));
  const otherPool = shuffleQuestions(pool.filter((question) => question.group !== "main"));
  const mainCount = mainQuestionTarget(targetCount, mainPool.length, otherPool.length);
  const selected = [
    ...mainPool.slice(0, mainCount),
    ...otherPool.slice(0, targetCount - mainCount),
  ];

  if (selected.length < targetCount) {
    const selectedIds = new Set(selected.map((question) => question.id));
    const fillPool = shuffleQuestions(pool.filter((question) => !selectedIds.has(question.id)));
    selected.push(...fillPool.slice(0, targetCount - selected.length));
  }

  return shuffleQuestions(selected).slice(0, targetCount).map((question) => ({ ...question }));
};

const activeQuestions = () => state.sessionQuestions;
const currentQuestion = () => activeQuestions()[state.currentIndex] || activeQuestions()[0];

const setView = (view) => {
  elements.homeView.classList.toggle("active", view === "home");
  elements.checkView.classList.toggle("active", view === "check");
  elements.interviewView.classList.toggle("active", view === "interview");
  elements.resultView.classList.toggle("active", view === "result");
  window.scrollTo({ top: 0, behavior: "instant" });
};

const stopTimer = () => {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
};

const renderTimer = () => {
  const phaseText = state.phase === "prep" ? "준비" : "답변";
  elements.timerText.textContent = formatTime(state.remaining);
  elements.timerMode.textContent = phaseText;
  elements.phaseLabel.textContent = `${phaseText} 시간`;
};

const startTimer = () => {
  stopTimer();
  renderTimer();
  state.timerId = setInterval(() => {
    state.remaining -= 1;
    renderTimer();

    if (state.remaining <= 0) {
      if (state.phase === "prep") {
        beginAnswer();
      } else {
        finishCurrentAnswer();
      }
    }
  }, 1000);
};

const renderQuestion = () => {
  const total = activeQuestions().length;
  const question = currentQuestion();
  elements.questionProgress.textContent = `${state.currentIndex + 1} / ${total}`;
  elements.rigorLabel.textContent = state.config.rigor;
  elements.questionText.textContent = `${state.currentIndex + 1}. ${question.text}`;
};

const beginPrep = () => {
  state.phase = "prep";
  state.remaining = state.config.prepSeconds;
  renderQuestion();

  if (state.config.prepSeconds <= 0) {
    beginAnswer();
    return;
  }

  elements.skipPrepButton.disabled = false;
  startTimer();
};

const beginAnswer = () => {
  state.phase = "answer";
  state.remaining = state.config.answerSeconds;
  elements.skipPrepButton.disabled = true;
  startTimer();
  startRecording().catch(() => {});
};

const readConfig = () => {
  const selectedRigor = getSelectedRigor();
  const availableQuestionCount = questionsForDifficulty(selectedRigor).length;
  state.config.questionCount = Math.max(
    1,
    Math.min(Number(elements.questionCount.value) || 5, availableQuestionCount || questions.length),
  );
  state.config.prepSeconds = Math.max(0, Number(elements.prepTime.value));
  state.config.answerSeconds = (Number(elements.answerTime.value) || 3) * 60;
  state.config.rigor = selectedRigor;
};

const syncStartAvailability = () => {
  const availableQuestionCount = questionsForDifficulty(getSelectedRigor()).length;
  const isAvailable = elements.targetRole.value === "process" && availableQuestionCount > 0;
  const label = elements.startInterview.querySelector("span");
  elements.startInterview.disabled = !isAvailable;
  elements.startInterview.setAttribute("aria-disabled", String(!isAvailable));
  label.textContent =
    elements.targetRole.value === "process"
      ? isAvailable
        ? "모의 면접 시작"
        : "출제 가능한 문항이 없습니다"
      : "준비중인 직무입니다";
};

const setRecordingMode = (enabled) => {
  state.recordingEnabled = enabled;
  elements.recordingModeOn.classList.toggle("active", enabled);
  elements.recordingModeOff.classList.toggle("active", !enabled);
  elements.recordingModeOn.setAttribute("aria-pressed", String(enabled));
  elements.recordingModeOff.setAttribute("aria-pressed", String(!enabled));
  elements.recordingModeNotice.textContent = enabled
    ? "녹화 모드는 문항별 복기를 제공합니다. 녹화 파일은 별도 서버로 전송되지 않습니다."
    : "비녹화 모드는 녹화 복기가 제공되지 않으며, 카메라 영상도 별도 서버로 전송되지 않습니다.";
  elements.cameraPlaceholder.innerHTML = enabled
    ? '<i data-lucide="video"></i><strong>사용자 웹캠 화면</strong><span>녹화 모드에서는 답변 시간이 시작되면 자동으로 녹화됩니다.</span>'
    : '<i data-lucide="video-off"></i><strong>비녹화 모드</strong><span>이번 면접은 녹화 저장 없이 진행됩니다.</span>';
  renderIcons();
};

const resetForInterview = (sessionQuestions) => {
  state.sessionQuestions = sessionQuestions;
  state.completedQuestions = [...sessionQuestions];
  state.currentIndex = 0;
  state.recordings = [];
  state.recordedChunks = [];
  state.recordingQuestion = null;
};

const startInterview = () => {
  if (elements.targetRole.value !== "process") return;
  readConfig();
  resetForInterview(buildQuestionSet(state.config.questionCount));
  setView("check");
};

const enterInterview = () => {
  if (state.recordingEnabled) {
    ensureCamera().catch(() => {});
  }
  setView("interview");
  beginPrep();
};

const startSingleQuestionPractice = (originalIndex) => {
  const question = questions[originalIndex];
  if (!question) return;
  resetForInterview([{ ...question, originalIndex }]);
  state.config.questionCount = 1;
  setView("check");
};

const nextQuestion = async () => {
  await finishRecording();
  const total = activeQuestions().length;
  if (state.currentIndex >= total - 1) {
    finishInterview();
    return;
  }

  state.currentIndex += 1;
  beginPrep();
};

const finishCurrentAnswer = async () => {
  await finishRecording();
  stopTimer();
  elements.phaseLabel.textContent = "답변 종료";
  elements.timerMode.textContent = "완료";
  elements.timerText.textContent = "00:00";
};

const finishInterview = async () => {
  await finishRecording();
  stopTimer();
  elements.phaseLabel.textContent = "면접 종료";
  elements.timerMode.textContent = "종료";
  elements.timerText.textContent = "완료";
  renderResultPage();
  setView("result");
  window.setTimeout(showFeedbackModal, 350);
};

const isInterviewOpen = () => elements.interviewView.classList.contains("active");

const showExitModal = () => {
  elements.exitModal.classList.add("open");
  elements.exitModal.setAttribute("aria-hidden", "false");
};

const hideExitModal = () => {
  elements.exitModal.classList.remove("open");
  elements.exitModal.setAttribute("aria-hidden", "true");
};

const showFinishModal = () => {
  elements.finishModal.classList.add("open");
  elements.finishModal.setAttribute("aria-hidden", "false");
};

const hideFinishModal = () => {
  elements.finishModal.classList.remove("open");
  elements.finishModal.setAttribute("aria-hidden", "true");
};

const showReportModal = () => {
  const question = currentQuestion();
  elements.reportQuestionPreview.textContent = `${state.currentIndex + 1}. ${question.text}`;
  elements.reportText.value = "";
  elements.sendReportButton.disabled = false;
  elements.reportModal.classList.add("open");
  elements.reportModal.setAttribute("aria-hidden", "false");
  window.setTimeout(() => elements.reportText.focus(), 0);
};

const hideReportModal = () => {
  elements.reportModal.classList.remove("open");
  elements.reportModal.setAttribute("aria-hidden", "true");
};

const renderFeedbackStars = () => {
  elements.feedbackStars.querySelectorAll(".feedback-star").forEach((button) => {
    const rating = Number(button.dataset.rating);
    const isActive = rating <= state.feedbackRating;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const setFeedbackRating = (rating) => {
  state.feedbackRating = rating;
  renderFeedbackStars();
  elements.feedbackStatus.textContent = "";
};

const setFeedbackSubmitting = (isSubmitting) => {
  state.feedbackSubmitting = isSubmitting;
  elements.submitFeedbackButton.disabled = isSubmitting;
  elements.skipFeedbackButton.disabled = isSubmitting;
  elements.feedbackStars.querySelectorAll("button").forEach((button) => {
    button.disabled = isSubmitting;
  });
};

const resetFeedbackForm = () => {
  state.feedbackRating = 0;
  state.feedbackSubmitting = false;
  elements.feedbackComment.value = "";
  elements.feedbackStatus.textContent = "";
  elements.submitFeedbackButton.disabled = false;
  elements.skipFeedbackButton.disabled = false;
  elements.feedbackStars.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
  });
  renderFeedbackStars();
};

const showFeedbackModal = () => {
  resetFeedbackForm();
  elements.feedbackModal.classList.add("open");
  elements.feedbackModal.setAttribute("aria-hidden", "false");
};

const hideFeedbackModal = () => {
  elements.feedbackModal.classList.remove("open");
  elements.feedbackModal.setAttribute("aria-hidden", "true");
};

const buildFeedbackPayload = () => ({
  rating: state.feedbackRating,
  comment: elements.feedbackComment.value.trim(),
  context: {
    source: "result",
    role: elements.targetRole.value,
    rigor: state.config.rigor,
    questionCount: state.completedQuestions.length,
    requestedQuestionCount: state.config.questionCount,
    prepSeconds: state.config.prepSeconds,
    answerSeconds: state.config.answerSeconds,
    recordingEnabled: state.recordingEnabled,
    recordingsCount: state.recordingEnabled ? state.recordings.length : 0,
    path: window.location.pathname,
  },
  client: {
    userAgent: navigator.userAgent,
    language: navigator.language,
    submittedAt: new Date().toISOString(),
  },
});

const readFeedbackQueue = () => {
  try {
    return JSON.parse(localStorage.getItem(FEEDBACK_QUEUE_KEY) || "[]");
  } catch (error) {
    return [];
  }
};

const writeFeedbackQueue = (queue) => {
  try {
    localStorage.setItem(FEEDBACK_QUEUE_KEY, JSON.stringify(queue.slice(-20)));
  } catch (error) {
    // 저장 공간이 부족한 경우 피드백 입력 흐름을 막지 않습니다.
  }
};

const queueFeedbackPayload = (payload) => {
  writeFeedbackQueue([...readFeedbackQueue(), payload]);
};

const postFeedbackPayload = async (payload) => {
  const response = await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Feedback request failed");
  }

  return response;
};

const flushQueuedFeedback = async () => {
  const queue = readFeedbackQueue();
  if (!queue.length) return;

  const remaining = [];
  for (const payload of queue) {
    try {
      await postFeedbackPayload(payload);
    } catch (error) {
      remaining.push(payload);
    }
  }

  writeFeedbackQueue(remaining);
};

const readReportQueue = () => {
  try {
    return JSON.parse(localStorage.getItem(REPORT_QUEUE_KEY) || "[]");
  } catch (error) {
    return [];
  }
};

const writeReportQueue = (queue) => {
  try {
    localStorage.setItem(REPORT_QUEUE_KEY, JSON.stringify(queue.slice(-20)));
  } catch (error) {
    // 저장 공간이 부족한 경우 신고 입력 흐름을 막지 않습니다.
  }
};

const queueReportPayload = (payload) => {
  writeReportQueue([...readReportQueue(), payload]);
};

const postReportPayload = async (payload) => {
  const response = await fetch("/api/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Report request failed");
  }

  return response;
};

const flushQueuedReports = async () => {
  const queue = readReportQueue();
  if (!queue.length) return;

  const remaining = [];
  for (const payload of queue) {
    try {
      await postReportPayload(payload);
    } catch (error) {
      remaining.push(payload);
    }
  }

  writeReportQueue(remaining);
};

const submitFeedback = async () => {
  if (state.feedbackSubmitting) return;
  if (!state.feedbackRating) {
    elements.feedbackStatus.textContent = "별점을 먼저 선택해주세요.";
    return;
  }

  setFeedbackSubmitting(true);
  elements.feedbackStatus.textContent = "피드백을 보내는 중입니다.";
  const payload = buildFeedbackPayload();

  try {
    await postFeedbackPayload(payload);
    flushQueuedFeedback().catch(() => {});
    elements.feedbackStatus.textContent = "소중한 의견 감사합니다. 더 나은 서비스로 다듬어볼게요.";
    window.setTimeout(hideFeedbackModal, 900);
  } catch (error) {
    queueFeedbackPayload(payload);
    elements.feedbackStatus.textContent =
      "서버 저장소 연결이 불안정해 이 브라우저에 임시 저장했습니다. 연결이 복구되면 자동으로 다시 전송됩니다.";
    window.setTimeout(() => {
      hideFeedbackModal();
      setFeedbackSubmitting(false);
    }, 1300);
  }
};

const sendQuestionReport = async () => {
  const question = currentQuestion();
  const reportText = elements.reportText.value.trim() || "신고 내용 미입력";
  const payload = {
    reportText,
    question: {
      number: state.currentIndex + 1,
      total: activeQuestions().length,
      text: question.text,
      answer: question.answer,
      originalIndex: question.originalIndex,
    },
    context: {
      rigor: state.config.rigor,
      phase: state.phase,
      role: elements.targetRole.value,
      path: window.location.pathname,
    },
    client: {
      userAgent: navigator.userAgent,
      language: navigator.language,
      submittedAt: new Date().toISOString(),
    },
  };

  elements.sendReportButton.disabled = true;

  try {
    await postReportPayload(payload);
    flushQueuedReports().catch(() => {});
    elements.reportQuestionPreview.textContent = "신고가 접수되었습니다.";
    window.setTimeout(hideReportModal, 700);
  } catch (error) {
    queueReportPayload(payload);
    elements.reportQuestionPreview.textContent =
      "서버 저장소 연결이 불안정해 이 브라우저에 임시 저장했습니다. 연결이 복구되면 자동으로 다시 전송됩니다.";
    window.setTimeout(hideReportModal, 1300);
  } finally {
    window.setTimeout(() => {
      elements.sendReportButton.disabled = false;
    }, 1300);
  }
};

const showHelpModal = () => {
  elements.helpMessage.innerHTML = elements.developerMessageTemplate.innerHTML;
  elements.helpModal.classList.add("open");
  elements.helpModal.setAttribute("aria-hidden", "false");
  renderIcons();
};

const hideHelpModal = () => {
  if (elements.helpModal.contains(document.activeElement)) {
    document.activeElement.blur();
  }
  elements.helpModal.classList.remove("open");
  elements.helpModal.setAttribute("aria-hidden", "true");
};

const handleHelpBackdropClick = (event) => {
  if (event.target !== elements.helpModal) return;

  const { clientX, clientY } = event;
  hideHelpModal();

  const underlyingElement = document.elementFromPoint(clientX, clientY);
  if (underlyingElement?.closest("#startInterview") && !elements.startInterview.disabled) {
    startInterview();
  }
};

const legalDocuments = {
  privacy: {
    title: "개인정보처리방침",
    template: "privacyTemplate",
  },
  terms: {
    title: "이용약관",
    template: "termsTemplate",
  },
  disclaimer: {
    title: "면책 고지",
    template: "disclaimerTemplate",
  },
};

const showLegalModal = (type) => {
  const documentInfo = legalDocuments[type];
  if (!documentInfo) return;

  elements.legalTitle.textContent = documentInfo.title;
  elements.legalContent.innerHTML = elements[documentInfo.template].innerHTML;
  elements.legalModal.classList.add("open");
  elements.legalModal.setAttribute("aria-hidden", "false");
  renderIcons();
};

const hideLegalModal = () => {
  elements.legalModal.classList.remove("open");
  elements.legalModal.setAttribute("aria-hidden", "true");
};

const getHelpHiddenUntil = () => {
  try {
    return Number(localStorage.getItem(HELP_DISMISS_KEY)) || 0;
  } catch (error) {
    return 0;
  }
};

const shouldShowStartupHelp = () => Date.now() >= getHelpHiddenUntil();

const dismissHelpForToday = () => {
  try {
    localStorage.setItem(HELP_DISMISS_KEY, String(Date.now() + ONE_DAY_MS));
  } catch (error) {
    // localStorage may be unavailable in some privacy modes; closing still works.
  }
  hideHelpModal();
};

const showStartupHelp = () => {
  if (shouldShowStartupHelp()) {
    showHelpModal();
  }
};

const leaveInterview = async () => {
  hideExitModal();
  stopTimer();
  await finishRecording();
  setView("home");
};

const requestLeaveInterview = () => {
  if (isInterviewOpen()) {
    showExitModal();
    return;
  }
  setView("home");
};

const markReady = (element, text) => {
  element.textContent = text;
  element.classList.add("ready");
};

const startMicMeter = (stream) => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audioTrack = stream.getAudioTracks()[0];
  if (!AudioContextClass || !audioTrack) return;

  const audioContext = new AudioContextClass();
  const source = audioContext.createMediaStreamSource(new MediaStream([audioTrack]));
  const analyser = audioContext.createAnalyser();
  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.fftSize = 256;
  source.connect(analyser);

  const tick = () => {
    analyser.getByteFrequencyData(data);
    const average = data.reduce((sum, value) => sum + value, 0) / data.length;
    const level = Math.min(100, Math.round(average * 1.6));
    elements.micLevel.style.width = `${level}%`;
    elements.micStatus.textContent = level > 6 ? "마이크 입력이 감지되고 있습니다." : "말을 해보면 입력 레벨이 움직입니다.";
    if (level > 6) {
      markReady(elements.micCheckState, "마이크 감지");
    }
    state.micAnimationId = requestAnimationFrame(tick);
  };
  tick();
};

const ensureCamera = async () => {
  if (state.cameraStream) return state.cameraStream;

  try {
    state.cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    elements.cameraPreview.srcObject = state.cameraStream;
    elements.cameraCheckPreview.srcObject = state.cameraStream;
    elements.webcamPanel.classList.add("camera-on");
    elements.cameraCheckFrame.classList.add("camera-on");
    elements.checkCameraButton.querySelector("span").textContent = "카메라/마이크 켜짐";
    markReady(elements.cameraCheckState, "카메라 정상");
    startMicMeter(state.cameraStream);
    return state.cameraStream;
  } catch (error) {
    elements.cameraPlaceholder.innerHTML =
      "<strong>카메라 접근이 필요합니다</strong><span>브라우저 권한을 허용하면 녹화 복기 기능을 사용할 수 있습니다.</span>";
    elements.cameraCheckPlaceholder.innerHTML =
      "<strong>카메라 접근이 필요합니다</strong><span>브라우저 권한을 허용한 뒤 다시 시도해주세요.</span>";
    renderIcons();
    throw error;
  }
};

const playSpeakerTest = () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    elements.speakerStatus.textContent = "이 브라우저에서는 스피커 테스트를 지원하지 않습니다.";
    return;
  }

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = 660;
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.45);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
  elements.speakerStatus.textContent = "테스트음이 재생되었습니다.";
  markReady(elements.speakerCheckState, "스피커 완료");
};

const startRecording = async () => {
  if (!state.recordingEnabled) return;
  const stream = await ensureCamera();
  if (state.recorder?.state === "recording") return;

  const question = currentQuestion();
  state.recordedChunks = [];
  state.recordingQuestion = {
    questionNumber: state.currentIndex + 1,
    questionIndex: question.originalIndex,
    question: question.text,
  };
  state.recorder = new MediaRecorder(stream);
  state.recorder.addEventListener("dataavailable", (event) => {
    if (event.data.size > 0) {
      state.recordedChunks.push(event.data);
    }
  });
  state.recorder.addEventListener("stop", saveRecording);
  state.recorder.start();
  elements.webcamPanel.classList.add("recording");
};

const finishRecording = () => {
  if (state.recorder?.state !== "recording") return Promise.resolve();

  return new Promise((resolve) => {
    state.recorder.addEventListener("stop", resolve, { once: true });
    state.recorder.stop();
  });
};

const saveRecording = () => {
  if (!state.recordedChunks.length) return;

  const blob = new Blob(state.recordedChunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  state.recordings.push({
    url,
    questionNumber: state.recordingQuestion?.questionNumber ?? state.currentIndex + 1,
    questionIndex: state.recordingQuestion?.questionIndex ?? currentQuestion().originalIndex,
    question: state.recordingQuestion?.question ?? currentQuestion().text,
    createdAt: new Date(),
  });
  state.recordedChunks = [];
  state.recordingQuestion = null;
  elements.webcamPanel.classList.remove("recording");
};

const recordingForQuestion = (questionIndex) =>
  state.recordings.find((recording) => recording.questionIndex === questionIndex);

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderKeywordBlock = (keywords = []) => {
  const visibleKeywords = keywords.map((keyword) => String(keyword).trim()).filter(Boolean);

  if (!visibleKeywords.length) {
    return "";
  }

  return `
    <div class="keyword-block">
      <h4>Key word</h4>
      <div class="keyword-list">
        ${visibleKeywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("")}
      </div>
    </div>
  `;
};

const renderResultPage = () => {
  elements.summaryQuestions.textContent = state.completedQuestions.length;
  elements.summaryRecordings.textContent = state.recordingEnabled ? state.recordings.length : "미제공";
  elements.summaryRigor.textContent = state.config.rigor;

  elements.resultList.innerHTML = state.completedQuestions
    .map((question, index) => {
      const recording = recordingForQuestion(question.originalIndex);
      const keywordBlock = renderKeywordBlock(question.keywords);
      const video = recording
        ? `<video src="${recording.url}" controls></video>`
        : state.recordingEnabled
          ? `<div class="no-recording"><i data-lucide="video-off"></i><span>저장된 녹화 없음</span></div>`
          : `<div class="no-recording"><i data-lucide="video-off"></i><span>비녹화 모드로 진행해 녹화 복기가 제공되지 않습니다.</span></div>`;

      return `
        <article class="result-card">
          <div class="result-card-head">
            <span>${index + 1}번 문항</span>
            <button class="small-button retry-question" type="button" data-question-index="${question.originalIndex}">
              이 문항 다시 연습
            </button>
          </div>
          <h2>${question.text}</h2>
          <div class="result-card-body">
            <section>
              <h3>녹화 복기</h3>
              ${video}
            </section>
            <section>
              <h3>AI 모범 답안</h3>
              ${keywordBlock}
              <p>${question.answer}</p>
            </section>
          </div>
        </article>
      `;
    })
    .join("");

  renderIcons();
};

const bindSetupControls = () => {
  $$(".rigor-card").forEach((card) => {
    card.addEventListener("click", () => {
      $$(".rigor-card").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
      syncStartAvailability();
    });
  });

  elements.answerTime.addEventListener("input", () => {
    elements.answerValue.textContent = elements.answerTime.value;
  });

  elements.targetRole.addEventListener("change", syncStartAvailability);
  elements.startInterview.addEventListener("click", startInterview);
  syncStartAvailability();
};

const bindInterviewControls = () => {
  $$("[data-view='home']").forEach((button) => {
    button.addEventListener("click", requestLeaveInterview);
  });

  elements.checkCameraButton.addEventListener("click", () => {
    ensureCamera().catch(() => {});
  });

  elements.speakerTestButton.addEventListener("click", playSpeakerTest);
  elements.enterInterviewButton.addEventListener("click", enterInterview);
  elements.recordingModeOn.addEventListener("click", () => setRecordingMode(true));
  elements.recordingModeOff.addEventListener("click", () => setRecordingMode(false));

  elements.skipPrepButton.addEventListener("click", beginAnswer);

  elements.nextQuestionButton.addEventListener("click", nextQuestion);
  elements.finishInterviewButton.addEventListener("click", showFinishModal);

  elements.cancelExitButton.addEventListener("click", hideExitModal);
  elements.confirmExitButton.addEventListener("click", leaveInterview);
  elements.cancelFinishButton.addEventListener("click", hideFinishModal);
  elements.confirmFinishButton.addEventListener("click", () => {
    hideFinishModal();
    finishInterview();
  });
  elements.reportQuestionButton.addEventListener("click", showReportModal);
  elements.cancelReportButton.addEventListener("click", hideReportModal);
  elements.sendReportButton.addEventListener("click", sendQuestionReport);
  elements.feedbackStars.addEventListener("click", (event) => {
    const button = event.target.closest(".feedback-star");
    if (!button || state.feedbackSubmitting) return;
    setFeedbackRating(Number(button.dataset.rating));
  });
  elements.skipFeedbackButton.addEventListener("click", hideFeedbackModal);
  elements.submitFeedbackButton.addEventListener("click", submitFeedback);
  elements.exitModal.addEventListener("click", (event) => {
    if (event.target === elements.exitModal) {
      hideExitModal();
    }
  });
  elements.finishModal.addEventListener("click", (event) => {
    if (event.target === elements.finishModal) {
      hideFinishModal();
    }
  });
  elements.reportModal.addEventListener("click", (event) => {
    if (event.target === elements.reportModal) {
      hideReportModal();
    }
  });
  elements.feedbackModal.addEventListener("click", (event) => {
    if (event.target === elements.feedbackModal && !state.feedbackSubmitting) {
      hideFeedbackModal();
    }
  });
  elements.helpButton.addEventListener("click", showHelpModal);
  elements.closeHelpButton.addEventListener("click", hideHelpModal);
  elements.closeHelpFooterButton.addEventListener("click", hideHelpModal);
  elements.dismissHelpTodayButton.addEventListener("click", dismissHelpForToday);
  elements.helpModal.addEventListener("click", handleHelpBackdropClick);
  $$("[data-legal]").forEach((button) => {
    button.addEventListener("click", () => showLegalModal(button.dataset.legal));
  });
  elements.closeLegalButton.addEventListener("click", hideLegalModal);
  elements.legalModal.addEventListener("click", (event) => {
    if (event.target === elements.legalModal) {
      hideLegalModal();
    }
  });

  window.addEventListener("beforeunload", (event) => {
    if (!isInterviewOpen()) return;
    event.preventDefault();
    event.returnValue = "";
  });
};

const bindResultControls = () => {
  elements.resultHomeButton.addEventListener("click", () => setView("home"));
  elements.restartInterviewButton.addEventListener("click", startInterview);
  elements.resultList.addEventListener("click", (event) => {
    const button = event.target.closest(".retry-question");
    if (!button) return;
    startSingleQuestionPractice(Number(button.dataset.questionIndex));
  });
};

window.addEventListener("load", () => {
  cacheElements();
  renderIcons();
  bindSetupControls();
  bindInterviewControls();
  bindResultControls();
  setRecordingMode(true);
  flushQueuedFeedback().catch(() => {});
  flushQueuedReports().catch(() => {});
  showStartupHelp();
});
