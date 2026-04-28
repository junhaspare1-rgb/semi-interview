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
const normalizeTailQuestions = (question) => {
  const value = question.tailQuestions || question.tailquestions || question.followUps || question["꼬리질문"];

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\n|;/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};
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
    tailQuestions: normalizeTailQuestions(question),
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
      keywords: [],
      tailQuestions: [],
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
  audioStream: null,
  sttTestStream: null,
  sttTestRecorder: null,
  sttTestChunks: [],
  sttTestAudioUrl: "",
  recorder: null,
  audioRecorder: null,
  recordedChunks: [],
  audioRecordedChunks: [],
  recordings: [],
  recordingQuestion: null,
  recordingEnabled: true,
  interviewMode: "standard",
  micAnimationId: null,
  feedbackRating: 0,
  feedbackSubmitting: false,
  aiEvaluationConsent: false,
  aiEvaluations: {},
  aiEvaluating: false,
  aiAdminKey: "",
  pendingView: "home",
  pendingPracticeIndex: null,
  pendingStartMode: "standard",
  studyProgress: {},
  browse: {
    index: 0,
    answerOpen: false,
    filters: {
      difficulty: "all",
      category: "all",
      status: "all",
    },
    touchStartY: null,
    wheelLocked: false,
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const elements = {};
const HELP_DISMISS_KEY = "banmyeonppu_help_hidden_until";
const FEEDBACK_QUEUE_KEY = "banmyeonppu_feedback_queue";
const REPORT_QUEUE_KEY = "banmyeonppu_report_queue";
const STUDY_PROGRESS_KEY = "banmyeonppu_question_progress_v1";
const AI_ADMIN_KEY_STORAGE_KEY = "banmyeonppu_ai_admin_key";
const AI_ADMIN_KEY = "0811";
const STT_TEST_SCRIPT =
  "CVD와 ALD의 차이는 박막의 스텝커버리지 입니다. 증착 공정에서는 박막의 유니포미티가 매우 중요합니다.";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const AI_INTERVIEW_CONFIG = {
  questionCount: 1,
  prepSeconds: 10,
  answerSeconds: 120,
};
const MAX_AI_AUDIO_BYTES = 25 * 1024 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const browseCategories = [...new Set(questions.map((question) => question.category))];

const cacheElements = () => {
  [
    "browseView",
    "homeView",
    "aboutView",
    "sttTestView",
    "checkView",
    "interviewView",
    "resultView",
    "startEnvironmentModal",
    "exitModal",
    "finishModal",
    "aiAdminModal",
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
    "sttTestScript",
    "sttTestAdminKey",
    "sttTestStartButton",
    "sttTestStopButton",
    "sttTestStatus",
    "sttTestTranscript",
    "sttTestModel",
    "sttTestAudioPlayer",
    "browseStudyPercent",
    "browseKnownCount",
    "browseConfusedCount",
    "browseBookmarkedCount",
    "browseCategoryProgress",
    "browseDifficultyFilter",
    "browseCategoryFilter",
    "browseStatusFilter",
    "browseShorts",
    "browseCard",
    "browseEmpty",
    "browsePrevButton",
    "browseNextButton",
    "browseDifficultyChip",
    "browseCategoryChip",
    "browseCounter",
    "browseQuestionText",
    "browseAnswerPanel",
    "browseKeywordList",
    "browseAnswerText",
    "browseTailQuestions",
    "browseBookmarkButton",
    "browseConfusedButton",
    "browseKnownButton",
    "browseToggleAnswerButton",
    "browsePracticeButton",
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
    "feedbackEmail",
    "feedbackConsent",
    "feedbackStatus",
    "skipFeedbackButton",
    "submitFeedbackButton",
    "phaseLabel",
    "timerMode",
    "timerText",
    "cameraPreview",
    "cameraPlaceholder",
    "recordingBadge",
    "skipPrepButton",
    "nextQuestionButton",
    "finishInterviewButton",
    "resultHomeButton",
    "restartInterviewButton",
    "resultList",
    "summaryQuestions",
    "summaryRecordings",
    "summaryRigor",
    "cancelStartEnvironmentButton",
    "confirmStartEnvironmentButton",
    "startEnvironmentTitle",
    "startEnvironmentDescription",
    "startEnvironmentConsentLabel",
    "startEnvironmentConsent",
    "aiAdminKeyInput",
    "aiAdminStatus",
    "cancelAiAdminButton",
    "confirmAiAdminButton",
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
const getSelectedInterviewMode = () => $(".interview-mode-card.active")?.dataset.interviewMode || "standard";

const readAiAdminKey = () => {
  try {
    return sessionStorage.getItem(AI_ADMIN_KEY_STORAGE_KEY) || "";
  } catch (error) {
    return "";
  }
};

const writeAiAdminKey = (key) => {
  try {
    sessionStorage.setItem(AI_ADMIN_KEY_STORAGE_KEY, key);
  } catch (error) {
    // sessionStorage가 막힌 환경에서는 현재 페이지 세션에서만 유지합니다.
  }
};

const isAiAdminUnlocked = () => state.aiAdminKey === AI_ADMIN_KEY;

const readHiddenSttTestKey = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("stt-test") || params.get("sttKey") || "";
};

const shouldOpenSttTest = () => {
  const params = new URLSearchParams(window.location.search);
  return window.location.hash === "#stt-test" || params.has("stt-test") || params.has("sttKey");
};

const setInterviewMode = (mode) => {
  $$(".interview-mode-card").forEach((item) => {
    item.classList.toggle("active", item.dataset.interviewMode === mode);
  });
  syncInterviewModeUi();
};

const syncInterviewModeUi = () => {
  const isAiMode = getSelectedInterviewMode() === "ai";
  $$(".configurable-field").forEach((field) => {
    field.classList.toggle("locked", isAiMode);
    field.querySelectorAll("input, select").forEach((control) => {
      control.disabled = isAiMode;
    });
  });

  if (isAiMode) {
    elements.questionCount.value = AI_INTERVIEW_CONFIG.questionCount;
    elements.prepTime.value = String(AI_INTERVIEW_CONFIG.prepSeconds);
    elements.answerTime.value = String(AI_INTERVIEW_CONFIG.answerSeconds / 60);
    elements.answerValue.textContent = String(AI_INTERVIEW_CONFIG.answerSeconds / 60);
  }

  syncStartAvailability();
};

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
  const nextView = view === "browse" ? "home" : view;
  elements.browseView.classList.remove("active");
  elements.homeView.classList.toggle("active", nextView === "home");
  elements.aboutView.classList.toggle("active", nextView === "about");
  elements.sttTestView.classList.toggle("active", nextView === "stt-test");
  elements.checkView.classList.toggle("active", nextView === "check");
  elements.interviewView.classList.toggle("active", nextView === "interview");
  elements.resultView.classList.toggle("active", nextView === "result");
  const activeNavView = ["about", "home"].includes(nextView) ? nextView : "home";
  $$(".main-nav [data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === activeNavView);
  });
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
  state.interviewMode = getSelectedInterviewMode();
  const selectedRigor = getSelectedRigor();
  const availableQuestionCount = questionsForDifficulty(selectedRigor).length;
  state.config.rigor = selectedRigor;

  if (state.interviewMode === "ai") {
    state.config.questionCount = Math.min(AI_INTERVIEW_CONFIG.questionCount, availableQuestionCount || questions.length);
    state.config.prepSeconds = AI_INTERVIEW_CONFIG.prepSeconds;
    state.config.answerSeconds = AI_INTERVIEW_CONFIG.answerSeconds;
    state.recordingEnabled = true;
    return;
  }

  state.config.questionCount = Math.max(
    1,
    Math.min(Number(elements.questionCount.value) || 5, availableQuestionCount || questions.length),
  );
  state.config.prepSeconds = Math.max(0, Number(elements.prepTime.value));
  state.config.answerSeconds = (Number(elements.answerTime.value) || 3) * 60;
};

const syncStartAvailability = () => {
  const availableQuestionCount = questionsForDifficulty(getSelectedRigor()).length;
  const isAiMode = getSelectedInterviewMode() === "ai";
  const requiredQuestionCount = isAiMode ? AI_INTERVIEW_CONFIG.questionCount : 1;
  const isAvailable = elements.targetRole.value === "process" && availableQuestionCount >= requiredQuestionCount;
  const label = elements.startInterview.querySelector("span");
  elements.startInterview.disabled = !isAvailable;
  elements.startInterview.setAttribute("aria-disabled", String(!isAvailable));
  label.textContent =
    elements.targetRole.value === "process"
      ? isAvailable
        ? isAiMode
          ? "AI 모의면접 시작"
          : "모의 면접 시작"
        : isAiMode
          ? "AI 모의면접은 최소 1문항이 필요합니다"
          : "출제 가능한 문항이 없습니다"
      : "준비중인 직무입니다";
};

const setRecordingMode = (enabled) => {
  if (state.interviewMode === "ai" && !enabled) {
    enabled = true;
  }
  state.recordingEnabled = enabled;
  elements.recordingModeOn.classList.toggle("active", enabled);
  elements.recordingModeOff.classList.toggle("active", !enabled);
  elements.recordingModeOn.setAttribute("aria-pressed", String(enabled));
  elements.recordingModeOff.setAttribute("aria-pressed", String(!enabled));
  elements.recordingModeOff.disabled = state.interviewMode === "ai";
  elements.recordingModeNotice.textContent =
    state.interviewMode === "ai"
      ? "AI 모의면접은 녹화가 필수입니다. 면접 종료 후 동의한 답변 음성만 AI 채점을 위해 전송됩니다."
      : enabled
        ? "녹화 모드는 문항별 영상 복기를 제공합니다. 녹화 파일은 별도 서버로 전송되지 않습니다."
        : "녹화 없이 연습하면 영상은 저장하지 않고 문항별 음성만 녹음합니다. 녹음 파일은 별도 서버로 전송되지 않습니다.";
  elements.cameraPlaceholder.innerHTML = enabled
    ? '<i data-lucide="video"></i><strong>사용자 웹캠 화면</strong><span>녹화 모드에서는 답변 시간이 시작되면 자동으로 녹화됩니다.</span>'
    : '<i data-lucide="mic"></i><strong>음성 녹음 모드</strong><span>영상은 저장하지 않고 답변 음성만 녹음합니다.</span>';
  renderIcons();
};

const resetForInterview = (sessionQuestions) => {
  state.sessionQuestions = sessionQuestions;
  state.completedQuestions = [...sessionQuestions];
  state.currentIndex = 0;
  state.recordings = [];
  state.recordedChunks = [];
  state.audioRecordedChunks = [];
  state.recordingQuestion = null;
  state.recorder = null;
  state.audioRecorder = null;
  state.aiEvaluations = {};
  state.aiEvaluating = false;
};

const showAiAdminModal = () => {
  elements.aiAdminKeyInput.value = "";
  elements.aiAdminStatus.textContent = "";
  elements.aiAdminModal.classList.add("open");
  elements.aiAdminModal.setAttribute("aria-hidden", "false");
  window.setTimeout(() => elements.aiAdminKeyInput.focus(), 0);
};

const hideAiAdminModal = () => {
  elements.aiAdminModal.classList.remove("open");
  elements.aiAdminModal.setAttribute("aria-hidden", "true");
  elements.aiAdminStatus.textContent = "";
};

const confirmAiAdminKey = () => {
  const key = elements.aiAdminKeyInput.value.trim();

  if (key !== AI_ADMIN_KEY) {
    elements.aiAdminStatus.textContent = "관리자 키가 올바르지 않습니다.";
    elements.aiAdminKeyInput.select();
    return;
  }

  state.aiAdminKey = key;
  writeAiAdminKey(key);
  hideAiAdminModal();
  setInterviewMode("ai");
};

const startInterview = () => {
  if (elements.targetRole.value !== "process") return;
  readConfig();
  if (state.interviewMode === "standard") {
    state.aiEvaluationConsent = false;
  }
  if (state.interviewMode === "ai" && !isAiAdminUnlocked()) {
    showAiAdminModal();
    return;
  }
  if (state.interviewMode === "ai" && !state.aiEvaluationConsent) {
    showStartEnvironmentModal();
    return;
  }
  setRecordingMode(state.interviewMode === "ai" ? true : state.recordingEnabled);
  resetForInterview(buildQuestionSet(state.config.questionCount));
  setView("check");
};

const showStartEnvironmentModal = (options = {}) => {
  const hasPracticeTarget = Number.isInteger(options.practiceIndex);
  const mode = hasPracticeTarget ? "standard" : getSelectedInterviewMode();
  if (!hasPracticeTarget && (elements.targetRole.value !== "process" || elements.startInterview.disabled)) return;
  state.pendingPracticeIndex = hasPracticeTarget ? options.practiceIndex : null;
  state.pendingStartMode = mode;
  const isAiMode = mode === "ai";
  if (isAiMode && !isAiAdminUnlocked()) {
    showAiAdminModal();
    return;
  }
  elements.startEnvironmentTitle.textContent = isAiMode
    ? "AI 모의면접은 답변 음성 분석 동의가 필요합니다."
    : "반면뿌는 PC 환경에서 가장 안정적으로 동작합니다.";
  elements.startEnvironmentDescription.textContent = isAiMode
    ? "AI 채점을 위해 면접 종료 후 문항별 답변 음성 파일을 OpenAI API로 전송하고, 전사문과 모범 답안을 바탕으로 분석합니다. 현재 파일럿 테스트에서는 AI 모의면접이 1문항, 준비 10초, 답변 2분으로 진행됩니다."
    : "모바일에서도 이용할 수 있지만, 카메라 권한, 녹화 저장, 복기 기능은 기기와 브라우저 환경에 따라 제한될 수 있습니다. 원활한 모의면접을 위해 가능하면 PC 크롬 환경을 권장합니다.";
  elements.startEnvironmentConsentLabel.hidden = !isAiMode;
  elements.startEnvironmentConsent.checked = false;
  elements.confirmStartEnvironmentButton.disabled = isAiMode;
  elements.confirmStartEnvironmentButton.textContent = isAiMode ? "동의하고 시작하기" : "확인하고 계속하기";
  elements.startEnvironmentModal.classList.add("open");
  elements.startEnvironmentModal.setAttribute("aria-hidden", "false");
};

const hideStartEnvironmentModal = (clearPracticeTarget = true) => {
  if (clearPracticeTarget) {
    state.pendingPracticeIndex = null;
  }
  state.pendingStartMode = "standard";
  elements.startEnvironmentConsent.checked = false;
  elements.confirmStartEnvironmentButton.disabled = false;
  elements.startEnvironmentModal.classList.remove("open");
  elements.startEnvironmentModal.setAttribute("aria-hidden", "true");
};

const confirmStartEnvironment = () => {
  const practiceIndex = state.pendingPracticeIndex;
  const startMode = state.pendingStartMode;
  if (startMode === "ai" && !elements.startEnvironmentConsent.checked) return;
  state.aiEvaluationConsent = startMode === "ai";
  hideStartEnvironmentModal(false);
  state.pendingPracticeIndex = null;
  if (Number.isInteger(practiceIndex)) {
    startSingleQuestionPractice(practiceIndex);
    return;
  }
  startInterview();
};

const enterInterview = () => {
  if (state.recordingEnabled) {
    ensureCamera().catch(() => {});
  } else {
    ensureAudioStream().catch(() => {});
  }
  setView("interview");
  beginPrep();
};

const startSingleQuestionPractice = (originalIndex) => {
  const question = questions[originalIndex];
  if (!question) return;
  state.interviewMode = "standard";
  state.aiEvaluationConsent = false;
  resetForInterview([{ ...question, originalIndex }]);
  state.config.questionCount = 1;
  state.config.rigor = question.difficulty;
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
  if (state.interviewMode === "ai") {
    startAiEvaluations().catch(() => {});
  } else {
    window.setTimeout(showFeedbackModal, 350);
  }
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
  elements.feedbackEmail.disabled = isSubmitting;
  elements.feedbackConsent.disabled = isSubmitting;
  elements.feedbackStars.querySelectorAll("button").forEach((button) => {
    button.disabled = isSubmitting;
  });
};

const resetFeedbackForm = () => {
  state.feedbackRating = 0;
  state.feedbackSubmitting = false;
  elements.feedbackComment.value = "";
  elements.feedbackEmail.value = "";
  elements.feedbackConsent.checked = false;
  elements.feedbackStatus.textContent = "";
  elements.submitFeedbackButton.disabled = false;
  elements.skipFeedbackButton.disabled = false;
  elements.feedbackEmail.disabled = false;
  elements.feedbackConsent.disabled = false;
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

const getFeedbackEmail = () => elements.feedbackEmail.value.trim();

const validateFeedbackContact = () => {
  const email = getFeedbackEmail();
  const consent = elements.feedbackConsent.checked;

  if (email && !EMAIL_PATTERN.test(email)) {
    return "올바른 이메일 형식으로 입력해주세요.";
  }

  if (email && !consent) {
    return "응시권 안내를 받으려면 이메일 저장 동의에 체크해주세요.";
  }

  if (!email && consent) {
    return "동의 체크와 함께 이메일을 입력해주세요.";
  }

  return "";
};

const buildFeedbackPayload = () => ({
  rating: state.feedbackRating,
  comment: elements.feedbackComment.value.trim(),
  email: getFeedbackEmail(),
  releaseBenefitConsent: elements.feedbackConsent.checked,
  context: {
    source: "result",
    role: elements.targetRole.value,
    rigor: state.config.rigor,
    questionCount: state.completedQuestions.length,
    requestedQuestionCount: state.config.questionCount,
    prepSeconds: state.config.prepSeconds,
    answerSeconds: state.config.answerSeconds,
    recordingEnabled: state.recordingEnabled,
    captureMode: state.recordingEnabled ? "video" : "audio",
    recordingsCount: state.recordings.length,
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

  const contactError = validateFeedbackContact();
  if (contactError) {
    elements.feedbackStatus.textContent = contactError;
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
    showStartEnvironmentModal();
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
  const nextView = state.pendingView || "home";
  state.pendingView = "home";
  hideExitModal();
  stopTimer();
  await finishRecording();
  setView(nextView);
};

const requestViewChange = (view) => {
  if (isInterviewOpen()) {
    state.pendingView = view;
    showExitModal();
    return;
  }
  setView(view);
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

const ensureAudioStream = async () => {
  const cameraAudioTracks = state.cameraStream?.getAudioTracks().filter((track) => track.readyState === "live") || [];
  if (cameraAudioTracks.length) {
    return new MediaStream(cameraAudioTracks);
  }

  if (state.audioStream?.getAudioTracks().some((track) => track.readyState === "live")) {
    return state.audioStream;
  }

  try {
    state.audioStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    markReady(elements.micCheckState, "마이크 감지");
    startMicMeter(state.audioStream);
    return state.audioStream;
  } catch (error) {
    elements.cameraPlaceholder.innerHTML =
      "<strong>마이크 접근이 필요합니다</strong><span>브라우저 권한을 허용하면 음성 복기 기능을 사용할 수 있습니다.</span>";
    elements.cameraCheckPlaceholder.innerHTML =
      "<strong>마이크 접근이 필요합니다</strong><span>브라우저 권한을 허용한 뒤 다시 시도해주세요.</span>";
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

const mediaRecorderOptions = (types) => {
  if (!window.MediaRecorder?.isTypeSupported) return undefined;
  const mimeType = types.find((type) => MediaRecorder.isTypeSupported(type));
  return mimeType ? { mimeType } : undefined;
};

const createMediaRecorder = (stream, types = []) => {
  const options = mediaRecorderOptions(types);
  return options ? new MediaRecorder(stream, options) : new MediaRecorder(stream);
};

const startAudioRecorder = (stream) => {
  const audioTracks = stream.getAudioTracks().filter((track) => track.readyState === "live");
  if (!audioTracks.length) return;

  const audioStream = new MediaStream(audioTracks);
  state.audioRecorder = createMediaRecorder(audioStream, ["audio/webm;codecs=opus", "audio/webm"]);
  state.audioRecorder.addEventListener("dataavailable", (event) => {
    if (event.data.size > 0) {
      state.audioRecordedChunks.push(event.data);
    }
  });
  state.audioRecorder.start();
};

const startRecording = async () => {
  const shouldRecordVideo = state.recordingEnabled;
  const stream = shouldRecordVideo ? await ensureCamera() : await ensureAudioStream();
  if (state.recorder?.state === "recording" || state.audioRecorder?.state === "recording") return;

  const question = currentQuestion();
  state.recordedChunks = [];
  state.audioRecordedChunks = [];
  state.recordingQuestion = {
    questionNumber: state.currentIndex + 1,
    questionIndex: question.originalIndex,
    question: question.text,
  };

  if (shouldRecordVideo) {
    state.recorder = createMediaRecorder(stream, ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"]);
    state.recorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        state.recordedChunks.push(event.data);
      }
    });
    state.recorder.start();
  }

  if (state.interviewMode === "ai" || !shouldRecordVideo) {
    try {
      startAudioRecorder(stream);
    } catch (error) {
      state.audioRecorder = null;
      state.audioRecordedChunks = [];
    }
  }

  elements.recordingBadge.textContent = shouldRecordVideo ? "녹화중" : "녹음중";
  elements.webcamPanel.classList.add("recording");
};

const stopMediaRecorder = (recorder) => {
  if (!recorder || recorder.state === "inactive") return Promise.resolve();

  return new Promise((resolve) => {
    recorder.addEventListener("stop", resolve, { once: true });
    recorder.stop();
  });
};

const finishRecording = async () => {
  const wasRecording = state.recorder?.state === "recording" || state.audioRecorder?.state === "recording";
  if (!wasRecording) return;

  await Promise.all([stopMediaRecorder(state.recorder), stopMediaRecorder(state.audioRecorder)]);
  saveRecording();
};

const saveRecording = () => {
  if (!state.recordedChunks.length && !state.audioRecordedChunks.length) return;

  const blob = state.recordedChunks.length ? new Blob(state.recordedChunks, { type: state.recordedChunks[0]?.type || "video/webm" }) : null;
  const audioBlob = state.audioRecordedChunks.length
    ? new Blob(state.audioRecordedChunks, { type: state.audioRecordedChunks[0]?.type || "audio/webm" })
    : null;
  const url = URL.createObjectURL(blob || audioBlob);
  state.recordings.push({
    url,
    blob,
    audioBlob,
    mimeType: blob?.type || "",
    audioMimeType: audioBlob?.type || "",
    size: blob?.size || 0,
    audioSize: audioBlob?.size || 0,
    captureMode: blob ? "video" : "audio",
    questionNumber: state.recordingQuestion?.questionNumber ?? state.currentIndex + 1,
    questionIndex: state.recordingQuestion?.questionIndex ?? currentQuestion().originalIndex,
    question: state.recordingQuestion?.question ?? currentQuestion().text,
    createdAt: new Date(),
  });
  state.recordedChunks = [];
  state.audioRecordedChunks = [];
  state.recordingQuestion = null;
  state.recorder = null;
  state.audioRecorder = null;
  elements.webcamPanel.classList.remove("recording");
};

const recordingForQuestion = (questionIndex) =>
  state.recordings.find((recording) => recording.questionIndex === questionIndex);

const stopSttTestStream = () => {
  state.sttTestStream?.getTracks().forEach((track) => track.stop());
  state.sttTestStream = null;
};

const setSttTestBusy = (isBusy) => {
  elements.sttTestStartButton.disabled = isBusy;
  elements.sttTestStopButton.disabled = !isBusy;
};

const startSttTestRecording = async () => {
  const adminKey = elements.sttTestAdminKey.value.trim() || state.aiAdminKey;
  if (!adminKey) {
    elements.sttTestStatus.textContent = "관리자 키를 입력해주세요.";
    return;
  }

  state.aiAdminKey = adminKey;
  writeAiAdminKey(adminKey);
  state.sttTestChunks = [];
  elements.sttTestTranscript.textContent = "녹음 중입니다. 문장을 읽은 뒤 녹음 종료를 눌러주세요.";
  elements.sttTestStatus.textContent = "마이크 권한을 요청하는 중입니다.";
  elements.sttTestAudioPlayer.hidden = true;

  try {
    state.sttTestStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    state.sttTestRecorder = createMediaRecorder(state.sttTestStream, ["audio/webm;codecs=opus", "audio/webm"]);
    state.sttTestRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        state.sttTestChunks.push(event.data);
      }
    });
    state.sttTestRecorder.start();
    setSttTestBusy(true);
    elements.sttTestStatus.textContent = "녹음 중입니다.";
  } catch (error) {
    stopSttTestStream();
    setSttTestBusy(false);
    elements.sttTestStatus.textContent = "마이크 권한을 허용한 뒤 다시 시도해주세요.";
  }
};

const postSttTest = async (audioBlob, adminKey) => {
  const formData = new FormData();
  formData.append("audio", audioBlob, "stt-test.webm");
  formData.append("adminKey", adminKey);
  formData.append("expectedText", STT_TEST_SCRIPT);

  const response = await fetch("/api/stt-test", {
    method: "POST",
    body: formData,
  });

  const responseText = await response.text();
  let payload = {};
  try {
    payload = responseText ? JSON.parse(responseText) : {};
  } catch (error) {
    payload = {};
  }

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || `STT 테스트 요청 실패 (HTTP ${response.status})`);
  }

  return payload;
};

const stopSttTestRecording = async () => {
  if (!state.sttTestRecorder || state.sttTestRecorder.state === "inactive") return;

  const adminKey = elements.sttTestAdminKey.value.trim() || state.aiAdminKey;
  elements.sttTestStopButton.disabled = true;
  elements.sttTestStatus.textContent = "녹음을 정리하는 중입니다.";

  await stopMediaRecorder(state.sttTestRecorder);
  stopSttTestStream();

  const audioBlob = new Blob(state.sttTestChunks, { type: state.sttTestChunks[0]?.type || "audio/webm" });
  state.sttTestChunks = [];
  if (state.sttTestAudioUrl) {
    URL.revokeObjectURL(state.sttTestAudioUrl);
  }
  state.sttTestAudioUrl = URL.createObjectURL(audioBlob);
  elements.sttTestAudioPlayer.src = state.sttTestAudioUrl;
  elements.sttTestAudioPlayer.hidden = false;

  try {
    elements.sttTestStatus.textContent = "전사 요청 중입니다.";
    const payload = await postSttTest(audioBlob, adminKey);
    elements.sttTestTranscript.textContent = payload.transcript || "전사문이 비어 있습니다.";
    elements.sttTestModel.textContent = payload.model || "gpt-4o-transcribe";
    elements.sttTestStatus.textContent = `전사 완료 · ${(audioBlob.size / 1024).toFixed(1)}KB`;
  } catch (error) {
    elements.sttTestTranscript.textContent = error.message || "STT 테스트 중 오류가 발생했습니다.";
    elements.sttTestStatus.textContent = "전사 실패";
  } finally {
    setSttTestBusy(false);
    state.sttTestRecorder = null;
  }
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const readStudyProgress = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STUDY_PROGRESS_KEY) || "{}");
    return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  } catch (error) {
    return {};
  }
};

const writeStudyProgress = () => {
  try {
    localStorage.setItem(STUDY_PROGRESS_KEY, JSON.stringify(state.studyProgress));
  } catch (error) {
    // localStorage가 막힌 환경에서도 문제 훑기 자체는 계속 사용할 수 있게 둡니다.
  }
};

const progressKey = (question) => String(question.id);

const getQuestionStudyState = (question) => {
  const saved = state.studyProgress[progressKey(question)] || {};
  return {
    bookmarked: Boolean(saved.bookmarked),
    status: saved.status === "known" || saved.status === "confused" ? saved.status : null,
    updatedAt: Number(saved.updatedAt) || 0,
  };
};

const setQuestionStudyState = (question, nextState) => {
  const key = progressKey(question);
  const current = getQuestionStudyState(question);
  const merged = { ...current, ...nextState, updatedAt: Date.now() };

  if (!merged.bookmarked && !merged.status) {
    delete state.studyProgress[key];
  } else {
    state.studyProgress[key] = merged;
  }

  writeStudyProgress();
};

const fallbackTailQuestions = (question) => {
  const byCategory = {
    "포토(Lithography)": [
      "CD와 Overlay 관점에서 이 이슈가 어떤 문제로 이어질 수 있나요?",
      "노광 조건을 조정하기 전에 어떤 계측 데이터를 먼저 확인하겠습니까?",
      "DOF, 해상도, 공정 윈도우를 함께 고려하면 어떤 trade-off가 생기나요?",
    ],
    "식각(Etch)": [
      "식각 선택비와 프로파일을 동시에 만족시키기 어려운 이유는 무엇인가요?",
      "Chamber condition 변화가 의심될 때 어떤 장비 데이터를 확인하겠습니까?",
      "Over etch를 늘렸을 때 얻는 이점과 리스크를 설명해보세요.",
    ],
    "증착(Deposition)": [
      "두께 균일도와 막질을 함께 관리하기 위해 어떤 파라미터를 보겠습니까?",
      "CVD와 PVD 중 어떤 방식이 더 적절한지 판단하는 기준은 무엇인가요?",
      "Chamber seasoning이나 PM 직후 막 특성이 흔들릴 때 어떻게 대응하겠습니까?",
    ],
    "CMP": [
      "Dishing과 erosion을 구분해서 원인을 좁히려면 어떤 데이터를 봐야 하나요?",
      "Pad, slurry, pressure 중 어떤 인자를 먼저 의심하겠습니까?",
      "CMP 결과가 후속 공정에 미치는 영향을 설명해보세요.",
    ],
    "이온주입(Implant)": [
      "Dose와 energy가 소자 특성에 어떤 영향을 주는지 설명해보세요.",
      "Annealing 조건을 바꾸면 어떤 장점과 리스크가 생기나요?",
      "Implant 이후 계측이나 모니터링은 어떤 항목이 중요할까요?",
    ],
    "세정(Cleaning)": [
      "Particle과 metal contamination은 각각 어떻게 접근해야 하나요?",
      "세정 강도를 높였을 때 발생할 수 있는 부작용은 무엇인가요?",
      "세정 공정 이상을 확인하기 위한 모니터링 지표는 무엇인가요?",
    ],
  };

  return (
    byCategory[question.category] || [
      "이 개념이 실제 양산 수율과 연결되는 지점을 설명해보세요.",
      "현장에서 이 문제가 발생했다면 원인 가설을 어떤 순서로 세우겠습니까?",
      "관련 데이터를 확인한 뒤 공정 조건을 바꿀 때 주의할 점은 무엇인가요?",
    ]
  );
};

const tailQuestionsFor = (question) =>
  question.tailQuestions?.length ? question.tailQuestions.slice(0, 3) : fallbackTailQuestions(question).slice(0, 3);

const filteredBrowseQuestions = () =>
  questions.filter((question) => {
    const { difficulty, category, status } = state.browse.filters;
    const studyState = getQuestionStudyState(question);

    if (difficulty !== "all" && question.difficulty !== difficulty) return false;
    if (category !== "all" && question.category !== category) return false;
    if (status === "bookmarked" && !studyState.bookmarked) return false;
    if (status === "confused" && studyState.status !== "confused") return false;
    if (status === "known" && studyState.status !== "known") return false;
    if (status === "unmarked" && (studyState.bookmarked || studyState.status)) return false;

    return true;
  });

const currentBrowseQuestion = () => {
  const filtered = filteredBrowseQuestions();
  return filtered[state.browse.index] || filtered[0] || null;
};

const syncBrowseFiltersFromInputs = () => {
  state.browse.filters.difficulty = elements.browseDifficultyFilter.value;
  state.browse.filters.category = elements.browseCategoryFilter.value;
  state.browse.filters.status = elements.browseStatusFilter.value;
};

const renderBrowseCategoryOptions = () => {
  elements.browseCategoryFilter.innerHTML = [
    '<option value="all">전체</option>',
    ...browseCategories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`),
  ].join("");
};

const renderBrowseDashboard = () => {
  const knownCount = questions.filter((question) => getQuestionStudyState(question).status === "known").length;
  const confusedCount = questions.filter((question) => getQuestionStudyState(question).status === "confused").length;
  const bookmarkedCount = questions.filter((question) => getQuestionStudyState(question).bookmarked).length;
  const studyPercent = questions.length ? Math.round((knownCount / questions.length) * 100) : 0;

  elements.browseStudyPercent.textContent = `${studyPercent}%`;
  elements.browseKnownCount.textContent = knownCount;
  elements.browseConfusedCount.textContent = confusedCount;
  elements.browseBookmarkedCount.textContent = bookmarkedCount;

  elements.browseCategoryProgress.innerHTML = browseCategories
    .map((category) => {
      const categoryQuestions = questions.filter((question) => question.category === category);
      const categoryKnown = categoryQuestions.filter((question) => getQuestionStudyState(question).status === "known").length;
      const percent = categoryQuestions.length ? Math.round((categoryKnown / categoryQuestions.length) * 100) : 0;

      return `
        <article class="browse-category-row">
          <div>
            <strong>${escapeHtml(category)}</strong>
            <span>${categoryKnown} / ${categoryQuestions.length}</span>
          </div>
          <div class="browse-category-bar" aria-hidden="true">
            <span style="width: ${percent}%"></span>
          </div>
        </article>
      `;
    })
    .join("");
};

const renderBrowseCard = () => {
  const filtered = filteredBrowseQuestions();

  if (state.browse.index >= filtered.length) {
    state.browse.index = Math.max(0, filtered.length - 1);
  }

  const question = filtered[state.browse.index] || null;
  const hasQuestion = Boolean(question);
  elements.browseCard.hidden = !hasQuestion;
  elements.browseEmpty.hidden = hasQuestion;
  elements.browsePrevButton.disabled = !hasQuestion || filtered.length <= 1;
  elements.browseNextButton.disabled = !hasQuestion || filtered.length <= 1;

  if (!question) {
    renderIcons();
    return;
  }

  const studyState = getQuestionStudyState(question);
  const tailQuestions = tailQuestionsFor(question);
  elements.browseDifficultyChip.textContent = question.difficulty;
  elements.browseCategoryChip.textContent = question.category;
  elements.browseCounter.textContent = `${state.browse.index + 1} / ${filtered.length}`;
  elements.browseQuestionText.textContent = question.text;
  elements.browseKeywordList.innerHTML = question.keywords?.length
    ? question.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("")
    : "<span>키워드 준비중</span>";
  elements.browseAnswerText.textContent = question.answer || "모범 답안 준비중입니다.";
  elements.browseTailQuestions.innerHTML = tailQuestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  elements.browseAnswerPanel.classList.toggle("open", state.browse.answerOpen);
  elements.browseAnswerPanel.setAttribute("aria-hidden", String(!state.browse.answerOpen));
  elements.browseToggleAnswerButton.classList.toggle("active", state.browse.answerOpen);
  elements.browseToggleAnswerButton.querySelector("span").textContent = state.browse.answerOpen ? "답안 접기" : "답안 보기";

  elements.browseBookmarkButton.classList.toggle("active", studyState.bookmarked);
  elements.browseBookmarkButton.setAttribute("aria-pressed", String(studyState.bookmarked));
  elements.browseConfusedButton.classList.toggle("active", studyState.status === "confused");
  elements.browseConfusedButton.setAttribute("aria-pressed", String(studyState.status === "confused"));
  elements.browseKnownButton.classList.toggle("active", studyState.status === "known");
  elements.browseKnownButton.setAttribute("aria-pressed", String(studyState.status === "known"));

  renderIcons();
};

const renderBrowseView = () => {
  if (!elements.browseView) return;
  renderBrowseDashboard();
  renderBrowseCard();
};

const moveBrowseQuestion = (direction) => {
  const filtered = filteredBrowseQuestions();
  if (filtered.length <= 1) return;

  state.browse.index = (state.browse.index + direction + filtered.length) % filtered.length;
  state.browse.answerOpen = false;
  renderBrowseView();
};

const toggleBrowseAnswer = () => {
  state.browse.answerOpen = !state.browse.answerOpen;
  renderBrowseCard();
};

const toggleBrowseBookmark = () => {
  const question = currentBrowseQuestion();
  if (!question) return;
  const studyState = getQuestionStudyState(question);
  setQuestionStudyState(question, { bookmarked: !studyState.bookmarked });
  renderBrowseView();
};

const setBrowseStatus = (status) => {
  const question = currentBrowseQuestion();
  if (!question) return;
  const studyState = getQuestionStudyState(question);
  setQuestionStudyState(question, { status: studyState.status === status ? null : status });

  const filtered = filteredBrowseQuestions();
  if (!filtered.includes(question)) {
    state.browse.index = Math.min(state.browse.index, Math.max(0, filtered.length - 1));
  }

  renderBrowseView();
};

const startBrowsePractice = () => {
  const question = currentBrowseQuestion();
  if (!question) return;
  showStartEnvironmentModal({ practiceIndex: question.originalIndex });
};

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

const evaluationForQuestion = (questionIndex) => state.aiEvaluations[String(questionIndex)];

const setAiEvaluationState = (questionIndex, nextState) => {
  const key = String(questionIndex);
  state.aiEvaluations[key] = {
    ...(state.aiEvaluations[key] || {}),
    ...nextState,
  };
  renderResultPage();
};

const postAiEvaluation = async (question, recording) => {
  const aiAudio = recording?.audioBlob || recording?.blob;
  if (!aiAudio) {
    throw new Error("답변 음성 파일을 찾을 수 없습니다.");
  }

  if (aiAudio.size > MAX_AI_AUDIO_BYTES) {
    throw new Error("답변 음성 파일이 25MB를 초과해 AI 채점을 진행할 수 없습니다.");
  }

  const formData = new FormData();
  formData.append("audio", aiAudio, `answer-${question.originalIndex}.webm`);
  formData.append("question", question.text);
  formData.append("modelAnswer", question.answer || "");
  formData.append("keywords", JSON.stringify(question.keywords || []));
  formData.append("category", question.category || "");
  formData.append("difficulty", question.difficulty || "");
  formData.append("questionIndex", String(question.originalIndex));
  formData.append("adminKey", state.aiAdminKey || "");

  const response = await fetch("/api/evaluate-answer", {
    method: "POST",
    body: formData,
  });

  const responseText = await response.text();
  let payload = {};
  try {
    payload = responseText ? JSON.parse(responseText) : {};
  } catch (error) {
    payload = {};
  }

  if (!response.ok || !payload.ok) {
    const fallbackMessage = responseText
      ? `AI 채점 요청 실패 (HTTP ${response.status}): ${responseText.slice(0, 180)}`
      : `AI 채점 요청 실패 (HTTP ${response.status})`;
    throw new Error(payload.message || fallbackMessage);
  }

  return payload.evaluation;
};

const startAiEvaluations = async () => {
  if (state.interviewMode !== "ai" || state.aiEvaluating) return;

  state.aiEvaluating = true;

  for (const question of state.completedQuestions) {
    const recording = recordingForQuestion(question.originalIndex);
    if (!recording?.blob) {
      setAiEvaluationState(question.originalIndex, {
        status: "error",
        message: "녹화 답변이 없어 AI 채점을 진행할 수 없습니다.",
      });
      continue;
    }

    setAiEvaluationState(question.originalIndex, {
      status: "transcribing",
      message: "답변 음성을 전사하는 중입니다.",
    });

    let analysisTimer = window.setTimeout(() => {
      setAiEvaluationState(question.originalIndex, {
        status: "analyzing",
        message: "전사문과 모범 답안을 비교 분석하는 중입니다.",
      });
    }, 1200);

    try {
      const evaluation = await postAiEvaluation(question, recording);
      window.clearTimeout(analysisTimer);
      setAiEvaluationState(question.originalIndex, {
        status: "complete",
        message: "AI 채점이 완료되었습니다.",
        result: evaluation,
      });
    } catch (error) {
      window.clearTimeout(analysisTimer);
      setAiEvaluationState(question.originalIndex, {
        status: "error",
        message: error.message || "AI 채점 중 오류가 발생했습니다.",
      });
    }
  }

  state.aiEvaluating = false;
};

const renderListItems = (items = []) => {
  const safeItems = Array.isArray(items) ? items : [];
  if (!safeItems.length) {
    return "<li>분석 결과가 없습니다.</li>";
  }
  return safeItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
};

const renderRubric = (rubric = {}) => {
  const entries = [
    ["technicalAccuracy", "기술 정확성"],
    ["structure", "질문 대응성/구조화"],
    ["problemSolving", "실무 문제해결"],
    ["clarity", "표현 명확성"],
    ["keywordCoverage", "키워드 커버리지"],
  ];

  return entries
    .map(([key, label]) => {
      const item = rubric[key] || {};
      const score = Number.isFinite(Number(item.score)) ? Number(item.score) : 0;
      const maxScore = Number.isFinite(Number(item.maxScore)) ? Number(item.maxScore) : "";
      const comment = item.comment ? String(item.comment) : "";

      return `
        <article>
          <div>
            <strong>${label}</strong>
            <span>${score}${maxScore ? ` / ${maxScore}` : ""}</span>
          </div>
          <p>${escapeHtml(comment || "세부 코멘트가 없습니다.")}</p>
        </article>
      `;
    })
    .join("");
};

const renderAiEvaluationBlock = (question, recording) => {
  if (state.interviewMode !== "ai") return "";

  const evaluation = evaluationForQuestion(question.originalIndex) || { status: "waiting" };
  const statusText =
    {
      waiting: "채점 대기",
      transcribing: "전사 중",
      analyzing: "분석 중",
      complete: "채점 완료",
      error: "채점 실패",
    }[evaluation.status] || "채점 대기";

  if (!recording) {
    return `
      <section class="ai-evaluation-panel status-error">
        <div class="ai-evaluation-head">
          <h3>AI 채점</h3>
          <span>녹화 없음</span>
        </div>
        <p>녹화 답변이 없어 AI 채점이 제공되지 않습니다.</p>
      </section>
    `;
  }

  if (evaluation.status !== "complete") {
    return `
      <section class="ai-evaluation-panel status-${escapeHtml(evaluation.status)}">
        <div class="ai-evaluation-head">
          <h3>AI 채점</h3>
          <span>${escapeHtml(statusText)}</span>
        </div>
        <p>${escapeHtml(evaluation.message || "면접 종료 후 자동으로 AI 채점을 시작합니다.")}</p>
      </section>
    `;
  }

  const result = evaluation.result || {};
  return `
    <section class="ai-evaluation-panel status-complete">
      <div class="ai-evaluation-head">
        <h3>AI 채점</h3>
        <span>총점 ${escapeHtml(result.totalScore ?? "-")}점</span>
      </div>
      <div class="ai-transcript">
        <h4>STT 전사문</h4>
        <p>${escapeHtml(result.transcript || "전사문이 없습니다.")}</p>
      </div>
      <div class="ai-rubric-grid">
        ${renderRubric(result.rubric)}
      </div>
      <div class="ai-feedback-grid">
        <article>
          <h4>강점</h4>
          <ul>${renderListItems(result.strengths)}</ul>
        </article>
        <article>
          <h4>보완점</h4>
          <ul>${renderListItems(result.improvements)}</ul>
        </article>
        <article>
          <h4>놓친 키워드</h4>
          <ul>${renderListItems(result.missedKeywords)}</ul>
        </article>
      </div>
      <div class="ai-suggested-answer">
        <h4>개선 답변 예시</h4>
        <p>${escapeHtml(result.suggestedAnswer || "개선 답변 예시가 없습니다.")}</p>
      </div>
      <p class="ai-caution">${escapeHtml(result.caution || "AI 채점은 학습 참고용이며 최종 답변은 지원 회사와 직무에 맞게 보완해주세요.")}</p>
    </section>
  `;
};

const renderResultPage = () => {
  elements.summaryQuestions.textContent = state.completedQuestions.length;
  elements.summaryRecordings.textContent =
    state.interviewMode === "ai" ? `${state.recordings.length} / ${state.completedQuestions.length}` : state.recordings.length;
  elements.summaryRigor.textContent = state.config.rigor;

  elements.resultList.innerHTML = state.completedQuestions
    .map((question, index) => {
      const recording = recordingForQuestion(question.originalIndex);
      const keywordBlock = renderKeywordBlock(question.keywords);
      const aiEvaluationBlock = renderAiEvaluationBlock(question, recording);
      const reviewMedia = recording?.blob
        ? `<video src="${recording.url}" controls></video>`
        : recording?.audioBlob
          ? `<div class="audio-review"><audio src="${recording.url}" controls></audio><span>영상 없이 음성만 녹음된 답변입니다.</span></div>`
          : `<div class="no-recording"><i data-lucide="mic-off"></i><span>저장된 답변 복기 자료가 없습니다.</span></div>`;

      return `
        <article class="result-card">
          <div class="result-card-head">
            <span>${index + 1}번 문항</span>
            <button class="small-button retry-question" type="button" data-question-index="${question.originalIndex}">
              이 문항 다시 연습
            </button>
          </div>
          <h2>${question.text}</h2>
          <div class="result-card-body ${state.interviewMode === "ai" ? "ai-result-card-body" : ""}">
            <section>
              <h3>답변 복기</h3>
              ${reviewMedia}
            </section>
            <section>
              <h3>AI 모범 답안</h3>
              ${keywordBlock}
              <p>${question.answer}</p>
            </section>
            ${aiEvaluationBlock}
          </div>
        </article>
      `;
    })
    .join("");

  renderIcons();
};

const handleBrowseFilterChange = () => {
  syncBrowseFiltersFromInputs();
  state.browse.index = 0;
  state.browse.answerOpen = false;
  renderBrowseView();
};

const bindBrowseControls = () => {
  elements.browseDifficultyFilter.addEventListener("change", handleBrowseFilterChange);
  elements.browseCategoryFilter.addEventListener("change", handleBrowseFilterChange);
  elements.browseStatusFilter.addEventListener("change", handleBrowseFilterChange);
  elements.browsePrevButton.addEventListener("click", () => moveBrowseQuestion(-1));
  elements.browseNextButton.addEventListener("click", () => moveBrowseQuestion(1));
  elements.browseToggleAnswerButton.addEventListener("click", toggleBrowseAnswer);
  elements.browseBookmarkButton.addEventListener("click", toggleBrowseBookmark);
  elements.browseConfusedButton.addEventListener("click", () => setBrowseStatus("confused"));
  elements.browseKnownButton.addEventListener("click", () => setBrowseStatus("known"));
  elements.browsePracticeButton.addEventListener("click", startBrowsePractice);

  elements.browseShorts.addEventListener(
    "wheel",
    (event) => {
      if (!elements.browseView.classList.contains("active") || Math.abs(event.deltaY) < 24) return;
      event.preventDefault();
      if (state.browse.wheelLocked) return;
      state.browse.wheelLocked = true;
      moveBrowseQuestion(event.deltaY > 0 ? 1 : -1);
      window.setTimeout(() => {
        state.browse.wheelLocked = false;
      }, 420);
    },
    { passive: false },
  );

  elements.browseShorts.addEventListener("touchstart", (event) => {
    state.browse.touchStartY = event.touches[0]?.clientY ?? null;
  });

  elements.browseShorts.addEventListener("touchend", (event) => {
    if (state.browse.touchStartY === null) return;
    const endY = event.changedTouches[0]?.clientY ?? state.browse.touchStartY;
    const distance = state.browse.touchStartY - endY;
    state.browse.touchStartY = null;
    if (Math.abs(distance) < 44) return;
    moveBrowseQuestion(distance > 0 ? 1 : -1);
  });

  window.addEventListener("keydown", (event) => {
    if (!elements.browseView.classList.contains("active")) return;
    if (["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

    if (event.key === "ArrowDown" || event.key === "PageDown") {
      event.preventDefault();
      moveBrowseQuestion(1);
    }
    if (event.key === "ArrowUp" || event.key === "PageUp") {
      event.preventDefault();
      moveBrowseQuestion(-1);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      toggleBrowseAnswer();
    }
  });
};

const bindSetupControls = () => {
  $$(".interview-mode-card").forEach((card) => {
    card.addEventListener("click", () => {
      const mode = card.dataset.interviewMode || "standard";
      if (mode === "ai" && !isAiAdminUnlocked()) {
        showAiAdminModal();
        return;
      }
      setInterviewMode(mode);
    });
  });

  $$(".rigor-card").forEach((card) => {
    card.addEventListener("click", () => {
      $$(".rigor-card").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
      syncInterviewModeUi();
    });
  });

  elements.answerTime.addEventListener("input", () => {
    elements.answerValue.textContent = elements.answerTime.value;
  });

  elements.targetRole.addEventListener("change", syncStartAvailability);
  elements.startInterview.addEventListener("click", showStartEnvironmentModal);
  syncInterviewModeUi();
};

const bindInterviewControls = () => {
  $$("[data-view]").forEach((button) => {
    button.addEventListener("click", () => requestViewChange(button.dataset.view || "home"));
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

  elements.cancelStartEnvironmentButton.addEventListener("click", hideStartEnvironmentModal);
  elements.confirmStartEnvironmentButton.addEventListener("click", confirmStartEnvironment);
  elements.startEnvironmentConsent.addEventListener("change", () => {
    if (state.pendingStartMode === "ai") {
      elements.confirmStartEnvironmentButton.disabled = !elements.startEnvironmentConsent.checked;
    }
  });
  elements.startEnvironmentModal.addEventListener("click", (event) => {
    if (event.target === elements.startEnvironmentModal) {
      hideStartEnvironmentModal();
    }
  });
  elements.cancelAiAdminButton.addEventListener("click", hideAiAdminModal);
  elements.confirmAiAdminButton.addEventListener("click", confirmAiAdminKey);
  elements.aiAdminKeyInput.addEventListener("input", () => {
    elements.aiAdminStatus.textContent = "";
  });
  elements.aiAdminKeyInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      confirmAiAdminKey();
    }
  });
  elements.aiAdminModal.addEventListener("click", (event) => {
    if (event.target === elements.aiAdminModal) {
      hideAiAdminModal();
    }
  });
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
  elements.feedbackEmail.addEventListener("input", () => {
    elements.feedbackStatus.textContent = "";
  });
  elements.feedbackConsent.addEventListener("change", () => {
    elements.feedbackStatus.textContent = "";
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
  elements.restartInterviewButton.addEventListener("click", showStartEnvironmentModal);
  elements.resultList.addEventListener("click", (event) => {
    const button = event.target.closest(".retry-question");
    if (!button) return;
    startSingleQuestionPractice(Number(button.dataset.questionIndex));
  });
};

const bindSttTestControls = () => {
  elements.sttTestScript.textContent = STT_TEST_SCRIPT;
  elements.sttTestAdminKey.value = state.aiAdminKey;
  elements.sttTestStartButton.addEventListener("click", startSttTestRecording);
  elements.sttTestStopButton.addEventListener("click", stopSttTestRecording);
  elements.sttTestAdminKey.addEventListener("input", () => {
    elements.sttTestStatus.textContent = "대기 중입니다.";
  });
};

window.addEventListener("load", () => {
  cacheElements();
  const hiddenSttKey = readHiddenSttTestKey();
  const openSttTest = shouldOpenSttTest();
  state.aiAdminKey = hiddenSttKey || readAiAdminKey();
  if (hiddenSttKey) {
    writeAiAdminKey(hiddenSttKey);
  }
  state.studyProgress = readStudyProgress();
  renderBrowseCategoryOptions();
  renderIcons();
  bindBrowseControls();
  bindSetupControls();
  bindInterviewControls();
  bindResultControls();
  bindSttTestControls();
  setRecordingMode(true);
  setView(openSttTest ? "stt-test" : "home");
  flushQueuedFeedback().catch(() => {});
  flushQueuedReports().catch(() => {});
  if (!openSttTest) {
    showStartupHelp();
  }
});
