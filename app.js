const MAIN_PROCESS_CATEGORIES = new Set(["포토(Lithography)", "식각(Etch)", "증착(Deposition)"]);
const DIFFICULTY_ALIASES = {
  실무: "실전",
};
const normalizeDifficulty = (difficulty) => DIFFICULTY_ALIASES[difficulty] || difficulty;
const processSourceQuestions = Array.isArray(window.BANMYEONPPU_PROCESS_QUESTIONS)
  ? window.BANMYEONPPU_PROCESS_QUESTIONS
  : [];
const packageTestSourceQuestions = Array.isArray(window.BANMYEONPPU_PACKAGE_TEST_QUESTIONS)
  ? window.BANMYEONPPU_PACKAGE_TEST_QUESTIONS
  : [];
const personalitySourceQuestions = Array.isArray(window.BANMYEONPPU_PERSONALITY_QUESTIONS)
  ? window.BANMYEONPPU_PERSONALITY_QUESTIONS
  : [];
const buildQuestionBank = (sourceQuestions, { roleId, jobRole, mainCategories = new Set() }) =>
  sourceQuestions
    .map((question, index) => ({
      id: question.id ?? index + 1,
      roleId,
      jobRole: question.jobRole || jobRole,
      category: question.category || "기타",
      group: question.group || (mainCategories.has(question.category) ? "main" : "other"),
      difficulty: normalizeDifficulty(question.difficulty || "입문"),
      text: question.question || question.text || "",
      answer: question.answer || "",
      shortAnswer: question.shortAnswer || question["40초 Script"] || "",
      recommendedAnswer: question.recommendedAnswer || question.answerGuide || question.answer || "",
      avoidAnswer: question.avoidAnswer || "",
      questionType: question.questionType || "technical",
      keywords: Array.isArray(question.keywords) ? question.keywords : [],

      estimatedAnswerMinutes: Number(question.estimatedAnswerMinutes || question["예상 답변 시간(분)"]) || null,
      active: question.active !== false,
    }))
    .filter((question) => question.active && question.difficulty !== "지엽" && question.text)
    .map((question, index) => ({ ...question, originalIndex: index }));

const questionBanksByRole = {
  process: buildQuestionBank(processSourceQuestions, {
    roleId: "process",
    jobRole: "공정기술",
    mainCategories: MAIN_PROCESS_CATEGORIES,
  }),
  "package-test": buildQuestionBank(packageTestSourceQuestions, {
    roleId: "package-test",
    jobRole: "Package & Test",
  }),
  personality: buildQuestionBank(personalitySourceQuestions, {
    roleId: "personality",
    jobRole: "인성 면접",
  }),
};
const questionBank = questionBanksByRole.process;
const questions = questionBank;
const state = {
  config: {
    role: "process",
    questionCount: 5,
    prepSeconds: 0,
    answerSeconds: 120,
    rigor: "실전",
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
  reportTarget: null,
  auth: {
    client: null,
    config: null,
    ready: false,
    loading: false,
    progressSyncing: false,
    lastSyncError: "",
    session: null,
    user: null,
  },
  pendingView: "home",
  pendingPracticeIndex: null,
  pendingSessionQuestionKeys: [],
  pendingStartMode: "standard",
  landing: {
    selectedRole: "process",
    waitlistSubmitting: false,
  },
  studyProgress: {},
  answerScriptMode: "short",
  questionBank: {
    role: "process",
    categories: [],
    difficulties: [],
    sort: "default",
    layout: "list",
    search: "",
    expandedId: null,
    pageSize: 10,
    page: 1,
    sidebarCollapsed: false,
    filterDrawerOpen: false,
  },
  myPage: {
    role: "all",
    difficulty: "all",
    category: "all",
    search: "",
    sort: "recent",
    filterDrawerOpen: false,
    selectedKeys: [],
    pendingRemoveKeys: [],
  },
  quickPractice: {
    questionId: null,
    questionKey: "",
    queueKeys: [],
    returnView: "question-bank",
    tab: "practice",
    recorder: null,
    stream: null,
    chunks: [],
    audioUrl: "",
    elapsed: 0,
    timerId: null,
    status: "idle",
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const elements = {};

const cleanAnalyticsParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );

const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag !== "function") return;

  try {
    window.gtag("event", eventName, {
      page_path: window.location.pathname,
      ...cleanAnalyticsParams(params),
    });
  } catch (error) {
    // Analytics failures should never interrupt interview practice.
  }
};

const analyticsQuestionPayload = (question, extra = {}) =>
  cleanAnalyticsParams({
    question_id: question?.id,
    role: question?.roleId,
    original_index: question?.originalIndex,
    category: question?.category,
    difficulty: question?.difficulty,
    ...extra,
  });

const HELP_DISMISS_KEY = "banmyeonppu_help_hidden_until";
const FEEDBACK_QUEUE_KEY = "banmyeonppu_feedback_queue";
const REPORT_QUEUE_KEY = "banmyeonppu_report_queue";
const WAITLIST_QUEUE_KEY = "banmyeonppu_waitlist_queue";
const STUDY_PROGRESS_KEY = "banmyeonppu_question_progress_v1";
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

const QUESTION_BANK_DIFFICULTIES = ["입문", "실전", "심화"];
const QUESTION_BANK_DIFFICULTY_RANK = {
  입문: 0,
  실전: 1,
  심화: 2,
};
const QUESTION_BANK_ROLES = [
  {
    id: "process",
    label: "공정기술 (양산기술)",
    shortLabel: "공정기술",
    description: "반도체 양산 현장의 수율, 공정 조건, 불량 분석, 장비 이슈 대응 질문",
    enabled: true,
  },
  {
    id: "package-test",
    label: "Package & Test",
    shortLabel: "Package & Test",
    description: "후공정, 패키징, 테스트, 신뢰성, 품질 분석 면접 질문",
    enabled: true,
  },
  {
    id: "personality",
    label: "인성 면접",
    shortLabel: "인성 면접",
    description: "자기소개, 지원동기, 협업, 문제해결, 가치관 중심 인성 면접 질문",
    enabled: true,
    questionType: "personality",
  },
  {
    id: "design",
    label: "회로설계",
    shortLabel: "회로설계",
    description: "디지털/아날로그 회로설계 직무 문제는 준비중입니다.",
    enabled: false,
  },
  {
    id: "device",
    label: "소자",
    shortLabel: "소자",
    description: "소자 물리와 디바이스 특성 직무 문제는 준비중입니다.",
    enabled: false,
  },
];

const LANDING_ROLE_LABELS = {
  process: "공정기술/양산기술",
  "package-test": "Package & Test",
  personality: "인성 면접",
  device: "소자",
  circuit: "회로설계",
};

const cacheElements = () => {
  [
    "landingView",
    "landingStartButton",
    "landingMockButton",
    "landingWaitlistModal",
    "landingWaitlistTitle",
    "landingWaitlistDescription",
    "landingWaitlistForm",
    "landingWaitlistEmail",
    "landingWaitlistStatus",
    "closeLandingWaitlistButton",
    "questionBankView",
    "myPageView",
    "myPageSidebar",
    "myPageFilterBackdrop",
    "myPageFilterButton",
    "myPageFilterCloseButton",
    "myPageSignedIn",
    "myPageBookmarkCount",
    "myPageRoleFilter",
    "myPageDifficultyFilter",
    "myPageCategoryFilter",
    "myPageSearch",
    "myPageSort",
    "myPageSelectAll",
    "myPageClearSelection",
    "myPageList",
    "myPageEmpty",
    "myPageSelectedBar",
    "myPageSelectedCount",
    "myPageQuickPracticeButton",
    "myPageMockPracticeButton",
    "myPageRemoveSelectedButton",
    "myPracticeModal",
    "myPracticePrepTime",
    "myPracticeAnswerTime",
    "cancelMyPracticeButton",
    "confirmMyPracticeButton",
    "myBookmarkConfirmModal",
    "cancelMyBookmarkRemoveButton",
    "confirmMyBookmarkRemoveButton",
    "quickPracticeView",
    "homeView",
    "aboutView",
    "contactView",
    "sttTestView",
    "checkView",
    "interviewView",
    "resultView",
    "authModal",
    "startEnvironmentModal",
    "exitModal",
    "finishModal",
    "aiAdminModal",
    "reportModal",
    "feedbackModal",
    "helpModal",
    "legalModal",
    "helpButton",
    "authButton",
    "authButtonLabel",
    "personalityQuestionsMenuButton",
    "mobilePersonalityQuestionsMenuButton",
    "accountMenu",
    "accountMenuEmail",
    "accountMenuLogoutButton",
    "mobileMenuButton",
    "mobileMenuBackdrop",
    "mobileMenuDrawer",
    "mobileMenuCloseButton",
    "mobileMenuEmail",
    "mobileMenuBookmarkButton",
    "mobileMenuHelpButton",
    "mobileMenuAuthButton",
    "mobileMenuLogoutButton",
    "closeAuthButton",
    "authSignedOutPanel",
    "authSignedInPanel",
    "authUserEmail",
    "authStatus",
    "magicLinkForm",
    "authEmail",
    "magicLinkButton",
    "googleLoginButton",
    "signOutButton",
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
    "bookmarkNavButton",
    "questionBankSidebar",
    "questionBankFilterBackdrop",
    "questionBankSidebarCollapseButton",
    "questionBankFilterButton",
    "questionBankFilterCloseButton",
    "questionBankRole",
    "questionBankStudySummary",
    "questionBankProgressPercent",
    "questionBankKnownCount",
    "questionBankKnownMeter",
    "questionBankPracticeCount",
    "questionBankPracticeMeter",
    "questionBankDifficultyList",
    "questionBankCategoryList",
    "questionBankRoleName",
    "questionBankTitle",
    "questionBankDescription",
    "questionBankSearch",
    "questionBankCount",
    "questionBankPageSize",
    "questionBankSortLabel",
    "questionBankSort",
    "questionBankLayoutToggle",
    "questionBankList",
    "questionBankPagination",
    "questionBankEmpty",
    "quickPracticeBackButton",
    "quickPracticeCounter",
    "quickPracticeBookmarkButton",
    "quickPracticeDifficulty",
    "quickPracticeCategory",
    "quickPracticeStatusChip",
    "quickPracticeTitle",
    "quickPracticeTopKeywords",
    "quickPracticeAudioDock",
    "quickPracticePanel",
    "quickPracticeAnswerButton",
    "quickPracticeNextButton",
    "questionCount",
    "targetRole",
    "prepTime",
    "answerTime",
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

const hideAccountMenu = () => {
  if (!elements.accountMenu) return;
  elements.accountMenu.classList.remove("open");
  elements.accountMenu.setAttribute("aria-hidden", "true");
  elements.authButton?.setAttribute("aria-expanded", "false");
};

const closeMobileMenu = () => {
  document.body.classList.remove("mobile-menu-open");
  elements.mobileMenuDrawer?.classList.remove("open");
  elements.mobileMenuDrawer?.setAttribute("aria-hidden", "true");
  elements.mobileMenuBackdrop?.classList.remove("open");
  elements.mobileMenuBackdrop?.setAttribute("aria-hidden", "true");
  elements.mobileMenuButton?.setAttribute("aria-expanded", "false");
};

const openMobileMenu = () => {
  hideAccountMenu();
  document.body.classList.add("mobile-menu-open");
  elements.mobileMenuDrawer?.classList.add("open");
  elements.mobileMenuDrawer?.setAttribute("aria-hidden", "false");
  elements.mobileMenuBackdrop?.classList.add("open");
  elements.mobileMenuBackdrop?.setAttribute("aria-hidden", "false");
  elements.mobileMenuButton?.setAttribute("aria-expanded", "true");
};

const showAccountMenu = () => {
  if (!elements.accountMenu || !state.auth.user) return;
  elements.accountMenu.classList.add("open");
  elements.accountMenu.setAttribute("aria-hidden", "false");
  elements.authButton?.setAttribute("aria-expanded", "true");
  renderIcons();
};

const toggleAccountMenu = () => {
  if (!elements.accountMenu) return;
  if (elements.accountMenu.classList.contains("open")) {
    hideAccountMenu();
  } else {
    showAccountMenu();
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

const isAiAdminUnlocked = () => Boolean(state.aiAdminKey.trim());

const shouldOpenSttTest = () => {
  const params = new URLSearchParams(window.location.search);
  return window.location.hash === "#stt-test" || params.has("stt-test");
};

const readPracticeQuestionId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("practiceQuestion") || params.get("id") || "";
};

const readPracticeRoleId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("role") || params.get("job") || "process";
};

const readQuestionBankRoleId = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("type") === "personality") return "personality";
  return params.get("role") || params.get("job") || "process";
};

const canUseAppRoutes = () => window.location.protocol === "http:" || window.location.protocol === "https:";

const normalizeAppPath = (pathname = window.location.pathname) => {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
};

const viewFromRoute = () => {
  switch (normalizeAppPath()) {
    case "/questions":
      return "question-bank";
    case "/mock-interview":
      return "home";
    case "/contact":
      return "contact";
    case "/my-page":
    case "/my-questions":
      return "my-page";
    case "/practice":
      return "quick-practice";
    default:
      return "landing";
  }
};

const routeForView = (view) => {
  if (view === "landing") return "/";
  if (view === "question-bank") {
    const params = new URLSearchParams();
    if (state.questionBank.role === "personality") {
      params.set("type", "personality");
    } else if (state.questionBank.role && state.questionBank.role !== "process") {
      params.set("role", state.questionBank.role);
    }
    const query = params.toString();
    return query ? `/questions?${query}` : "/questions";
  }
  if (view === "home") return "/mock-interview";
  if (view === "contact") return "/contact";
  if (view === "my-page") return "/my-questions";
  if (view === "quick-practice") {
    const question = quickPracticeQuestion();
    if (!question) return "/questions";
    const params = new URLSearchParams({
      role: questionRoleId(question),
      id: String(question.id),
    });
    return `/practice?${params.toString()}`;
  }
  return null;
};

const updateAppRoute = (view, { replace = false } = {}) => {
  if (!canUseAppRoutes()) return;
  const route = routeForView(view);
  if (!route) return;
  const current = `${window.location.pathname}${window.location.search}`;
  if (current === route) return;
  const method = replace ? "replaceState" : "pushState";
  window.history[method]({ view }, "", route);
};

const resetQuestionBankFiltersForRole = (roleId) => {
  state.questionBank.role = questionBankRoleById(roleId).id;
  state.questionBank.categories = [];
  state.questionBank.difficulties = [];
  state.questionBank.search = "";
  state.questionBank.expandedId = null;
  state.questionBank.page = 1;
  if (elements.questionBankSearch) {
    elements.questionBankSearch.value = "";
  }
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

const selectedTargetRole = () => elements.targetRole?.value || state.config.role || "process";

const questionsForDifficulty = (difficulty, roleId = selectedTargetRole()) =>
  questionBankQuestionsForRole(roleId).filter(
    (question) => question.difficulty === difficulty && question.difficulty !== "지엽",
  );

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

const buildQuestionSet = (count, roleId = state.config.role || selectedTargetRole()) => {
  const difficulty = state.config.rigor;
  const pool = questionsForDifficulty(difficulty, roleId);
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

const setView = (view, options = {}) => {
  const { updateRoute = true, replaceRoute = false } = options;
  const nextView = view;
  if (nextView !== "quick-practice") {
    cleanupQuickPracticeRecording();
  }
  if (nextView !== "question-bank") {
    state.questionBank.filterDrawerOpen = false;
  }
  if (nextView !== "my-page") {
    state.myPage.filterDrawerOpen = false;
  }
  elements.landingView.classList.toggle("active", nextView === "landing");
  elements.questionBankView.classList.toggle("active", nextView === "question-bank");
  elements.myPageView.classList.toggle("active", nextView === "my-page");
  elements.quickPracticeView.classList.toggle("active", nextView === "quick-practice");
  elements.homeView.classList.toggle("active", nextView === "home");
  elements.aboutView.classList.toggle("active", nextView === "about");
  elements.contactView.classList.toggle("active", nextView === "contact");
  elements.sttTestView.classList.toggle("active", nextView === "stt-test");
  elements.checkView.classList.toggle("active", nextView === "check");
  elements.interviewView.classList.toggle("active", nextView === "interview");
  elements.resultView.classList.toggle("active", nextView === "result");
  document.body.classList.toggle("quick-practice-active", nextView === "quick-practice");
  document.body.classList.toggle("landing-active", nextView === "landing");
  document.body.classList.toggle("question-bank-active", nextView === "question-bank");
  document.body.classList.toggle("my-questions-active", nextView === "my-page");
  document.body.classList.toggle("question-bank-sidebar-collapsed", nextView === "question-bank" && state.questionBank.sidebarCollapsed);
  document.body.classList.toggle(
    "question-filter-open",
    (nextView === "question-bank" && state.questionBank.filterDrawerOpen) ||
      (nextView === "my-page" && state.myPage.filterDrawerOpen),
  );
  const activeNavView = ["about", "contact", "question-bank", "quick-practice", "home", "landing", "my-page"].includes(nextView)
    ? nextView === "quick-practice"
      ? "question-bank"
      : nextView === "my-page"
        ? ""
      : nextView
    : "home";
  const isQuestionBankNavActive = activeNavView === "question-bank";
  $$(".main-nav [data-view]").forEach((button) => {
    const isRoleSubmenuItem =
      button.dataset.view === "question-bank" &&
      button.dataset.questionBankRole &&
      !button.classList.contains("main-nav-trigger");
    const isActive = isRoleSubmenuItem
      ? isQuestionBankNavActive && button.dataset.questionBankRole === state.questionBank.role
      : button.dataset.view === activeNavView;
    button.classList.toggle("active", isActive);
  });
  elements.personalityQuestionsMenuButton?.classList.toggle(
    "active",
    isQuestionBankNavActive && state.questionBank.role === "personality",
  );
  $$(".mobile-menu-list [data-view]").forEach((button) => {
    const isRoleMenuItem = button.dataset.view === "question-bank" && button.dataset.questionBankRole;
    const isActive = isRoleMenuItem
      ? isQuestionBankNavActive && button.dataset.questionBankRole === state.questionBank.role
      : button.dataset.view === activeNavView;
    button.classList.toggle("active", isActive);
  });
  elements.mobilePersonalityQuestionsMenuButton?.classList.toggle(
    "active",
    isQuestionBankNavActive && state.questionBank.role === "personality",
  );
  if (nextView === "question-bank") {
    renderQuestionBank();
  }
  if (nextView === "quick-practice") {
    renderQuickPractice();
  }
  if (nextView === "my-page") {
    renderMyPage();
  }
  if (updateRoute) {
    updateAppRoute(nextView, { replace: replaceRoute });
  }
  window.scrollTo(0, 0);
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
  state.config.role = selectedTargetRole();
  const selectedRigor = getSelectedRigor();
  const roleQuestions = questionBankQuestionsForRole(state.config.role);
  const availableQuestionCount = questionsForDifficulty(selectedRigor, state.config.role).length;
  state.config.rigor = selectedRigor;

  if (state.interviewMode === "ai") {
    state.config.questionCount = Math.min(AI_INTERVIEW_CONFIG.questionCount, availableQuestionCount || roleQuestions.length);
    state.config.prepSeconds = AI_INTERVIEW_CONFIG.prepSeconds;
    state.config.answerSeconds = AI_INTERVIEW_CONFIG.answerSeconds;
    state.recordingEnabled = true;
    return;
  }

  state.config.questionCount = Math.max(
    1,
    Math.min(Number(elements.questionCount.value) || 5, availableQuestionCount || roleQuestions.length),
  );
  state.config.prepSeconds = Math.max(0, Number(elements.prepTime.value));
  state.config.answerSeconds = (Number(elements.answerTime.value) || 3) * 60;
};

const syncStartAvailability = () => {
  const selectedRole = selectedTargetRole();
  const role = questionBankRoleById(selectedRole);
  const availableQuestionCount = questionsForDifficulty(getSelectedRigor(), selectedRole).length;
  const isAiMode = getSelectedInterviewMode() === "ai";
  const requiredQuestionCount = isAiMode ? AI_INTERVIEW_CONFIG.questionCount : 1;
  const isAvailable = role.enabled && availableQuestionCount >= requiredQuestionCount;
  const label = elements.startInterview.querySelector("span");
  elements.startInterview.disabled = !isAvailable;
  elements.startInterview.setAttribute("aria-disabled", String(!isAvailable));
  label.textContent =
    role.enabled
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
        ? "녹화 모드는 문항별 영상 복기를 제공합니다."
        : "영상은 저장하지 않고 문항별 음성만 녹음합니다.";
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

  if (!key) {
    elements.aiAdminStatus.textContent = "관리자 키를 입력해주세요.";
    elements.aiAdminKeyInput.select();
    return;
  }

  state.aiAdminKey = key;
  hideAiAdminModal();
  setInterviewMode("ai");
};

const startInterview = () => {
  if (elements.startInterview.disabled) return;
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
  trackEvent("mock_interview_start", {
    interview_mode: state.interviewMode,
    question_count: state.config.questionCount,
    difficulty: state.config.rigor,
    role: state.config.role,
    prep_seconds: state.config.prepSeconds,
    answer_seconds: state.config.answerSeconds,
    recording_enabled: state.interviewMode === "ai" || state.recordingEnabled ? 1 : 0,
  });
  resetForInterview(buildQuestionSet(state.config.questionCount, state.config.role));
  setView("check");
};

const showStartEnvironmentModal = (options = {}) => {
  const hasPracticeTarget = Number.isInteger(options.practiceIndex);
  const customQuestionKeys = Array.isArray(options.questionKeys) ? options.questionKeys.filter((key) => questionByProgressKey(key)) : [];
  const hasCustomSession = customQuestionKeys.length > 0;
  const mode = hasPracticeTarget || hasCustomSession ? "standard" : getSelectedInterviewMode();
  if (!hasPracticeTarget && !hasCustomSession && elements.startInterview.disabled) return;
  state.pendingPracticeIndex = hasPracticeTarget ? options.practiceIndex : null;
  state.pendingSessionQuestionKeys = hasCustomSession ? customQuestionKeys : [];
  state.pendingStartMode = mode;
  const isAiMode = mode === "ai";
  if (isAiMode && !isAiAdminUnlocked()) {
    showAiAdminModal();
    return;
  }
  elements.startEnvironmentTitle.textContent = isAiMode
    ? "AI 모의면접은 답변 음성 분석 동의가 필요합니다."
    : "반면뿌는 PC 환경에 최적화되어 있습니다.";
  elements.startEnvironmentDescription.textContent = isAiMode
    ? "AI 채점을 위해 면접 종료 후 문항별 답변 음성 파일을 OpenAI API로 전송하고, 전사문과 답변 예시를 바탕으로 분석합니다. 현재 파일럿 테스트에서는 AI 모의면접이 1문항, 준비 10초, 답변 2분으로 진행됩니다."
    : "모바일 환경에서는 카메라 권한, 녹화 저장, 복기 기능이 기기와 브라우저 환경에 따라 제한될 수 있습니다.\n원활한 모의면접을 위해 PC 크롬 환경을 권장합니다.";
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
    state.pendingSessionQuestionKeys = [];
  }
  state.pendingStartMode = "standard";
  elements.startEnvironmentConsent.checked = false;
  elements.confirmStartEnvironmentButton.disabled = false;
  elements.startEnvironmentModal.classList.remove("open");
  elements.startEnvironmentModal.setAttribute("aria-hidden", "true");
};

const confirmStartEnvironment = () => {
  const practiceIndex = state.pendingPracticeIndex;
  const sessionQuestionKeys = [...state.pendingSessionQuestionKeys];
  const startMode = state.pendingStartMode;
  if (startMode === "ai" && !elements.startEnvironmentConsent.checked) return;
  state.aiEvaluationConsent = startMode === "ai";
  hideStartEnvironmentModal(false);
  state.pendingPracticeIndex = null;
  state.pendingSessionQuestionKeys = [];
  if (Number.isInteger(practiceIndex)) {
    startSingleQuestionPractice(practiceIndex, "environment_confirm");
    return;
  }
  if (sessionQuestionKeys.length) {
    startSelectedQuestionInterview(sessionQuestionKeys.map((key) => questionByProgressKey(key)).filter(Boolean));
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

const questionByOriginalIndex = (originalIndex, roleId = state.questionBank.role) =>
  questionBankQuestionsForRole(roleId).find((question) => Number(question.originalIndex) === Number(originalIndex));

const startSingleQuestionPractice = (originalIndex, source = "unknown", roleId = state.questionBank.role) => {
  const question = questionByOriginalIndex(originalIndex, roleId) || questions[originalIndex];
  if (!question) return;
  trackEvent("practice_click", analyticsQuestionPayload(question, { source }));
  openQuickPractice(question, { clearQueue: true, returnView: "question-bank" });
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

const interviewReportTarget = () => ({
  source: "mock_interview",
  question: currentQuestion(),
  number: state.currentIndex + 1,
  total: activeQuestions().length,
  role: elements.targetRole.value,
  phase: state.phase,
  rigor: state.config.rigor,
});

const questionBankReportTarget = (question) => {
  const roleQuestions = questionBankQuestionsForRole(question.roleId || state.questionBank.role);
  const index = roleQuestions.findIndex((item) => String(item.id) === String(question.id));
  return {
    source: "question_bank",
    question,
    number: index >= 0 ? index + 1 : null,
    total: roleQuestions.length,
    role: question.roleId || state.questionBank.role,
    phase: "question_bank",
    rigor: question.difficulty,
  };
};

const showReportModal = (target = null) => {
  state.reportTarget = target || interviewReportTarget();
  const { question, number, total } = state.reportTarget;
  elements.reportQuestionPreview.textContent = number && total ? `${number} / ${total}. ${question.text}` : question.text;
  elements.reportText.value = "";
  elements.sendReportButton.disabled = false;
  elements.reportModal.classList.add("open");
  elements.reportModal.setAttribute("aria-hidden", "false");
  window.setTimeout(() => elements.reportText.focus(), 0);
};

const hideReportModal = () => {
  state.reportTarget = null;
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

const readWaitlistQueue = () => {
  try {
    return JSON.parse(localStorage.getItem(WAITLIST_QUEUE_KEY) || "[]");
  } catch (error) {
    return [];
  }
};

const writeWaitlistQueue = (queue) => {
  try {
    localStorage.setItem(WAITLIST_QUEUE_KEY, JSON.stringify(queue.slice(-30)));
  } catch (error) {
    // localStorage를 사용할 수 없는 환경에서도 랜딩 화면 자체는 계속 동작합니다.
  }
};

const queueWaitlistPayload = (payload) => {
  writeWaitlistQueue([...readWaitlistQueue(), payload]);
};

const postWaitlistPayload = async (payload) => {
  const response = await fetch("/api/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Waitlist request failed");
  }

  return response;
};

const flushQueuedWaitlist = async () => {
  const queue = readWaitlistQueue();
  if (!queue.length) return;

  const remaining = [];
  for (const payload of queue) {
    try {
      await postWaitlistPayload(payload);
    } catch (error) {
      remaining.push(payload);
    }
  }

  writeWaitlistQueue(remaining);
};

const authRedirectUrl = () => {
  if (window.location.protocol === "file:") return undefined;
  return `${window.location.origin}${window.location.pathname}`;
};

const authCallbackParams = () => {
  const params = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return { params, hashParams };
};

const readAuthCallbackError = () => {
  const { params, hashParams } = authCallbackParams();
  return (
    hashParams.get("error_description") ||
    hashParams.get("error") ||
    params.get("error_description") ||
    params.get("error") ||
    ""
  );
};

const clearAuthCallbackFragments = () => {
  if (window.location.protocol === "file:" || (!window.location.hash && !window.location.search)) return;
  const url = new URL(window.location.href);
  const hasAuthParams =
    url.hash.includes("access_token") ||
    url.hash.includes("error") ||
    url.searchParams.has("code") ||
    url.searchParams.has("error") ||
    url.searchParams.has("error_description");
  if (!hasAuthParams) return;
  window.history.replaceState({}, document.title, `${url.origin}${url.pathname}`);
};

const localAuthConfig = () => {
  const config = window.BANMYEONPPU_AUTH_CONFIG || {};
  return {
    supabaseUrl: String(config.supabaseUrl || "").trim(),
    supabaseAnonKey: String(config.supabaseAnonKey || "").trim(),
  };
};

const loadAuthConfig = async () => {
  const fallback = localAuthConfig();

  if (window.location.protocol === "file:") {
    return fallback;
  }

  try {
    const response = await fetch("/api/auth-config", { cache: "no-store" });
    if (!response.ok) return fallback;
    const payload = await response.json();
    return {
      supabaseUrl: String(payload.supabaseUrl || fallback.supabaseUrl || "").trim(),
      supabaseAnonKey: String(payload.supabaseAnonKey || fallback.supabaseAnonKey || "").trim(),
    };
  } catch (error) {
    return fallback;
  }
};

const authClientFactory = () => window.supabase?.createClient;

const applyAuthSession = (session) => {
  state.auth.session = session || null;
  state.auth.user = session?.user || null;
  renderAuthUi();
};

const setAuthStatus = (message = "", tone = "muted") => {
  if (!elements.authStatus) return;
  elements.authStatus.textContent = message;
  elements.authStatus.dataset.tone = tone;
};

const reportAuthSyncError = (context, error) => {
  const message = error?.message || "알 수 없는 동기화 오류";
  state.auth.lastSyncError = message;
  console.warn(`Question progress sync failed: ${context}`, error);
  if (elements.authModal?.classList.contains("open")) {
    setAuthStatus(`학습 진도 동기화 실패: ${message}`, "warning");
  }
};

const renderAuthUi = () => {
  if (!elements.authButtonLabel) return;

  const signedIn = Boolean(state.auth.user);
  const email = state.auth.user?.email || "";
  elements.authButton.classList.toggle("signed-in", signedIn);
  elements.authButton.setAttribute("aria-label", signedIn ? `${email} 마이 페이지` : "로그인");
  elements.authButton.setAttribute("aria-haspopup", signedIn ? "menu" : "dialog");
  elements.authButton.setAttribute("aria-expanded", elements.accountMenu?.classList.contains("open") ? "true" : "false");
  elements.authButtonLabel.hidden = signedIn;
  elements.authButtonLabel.textContent = signedIn ? "" : "로그인";
  if (elements.accountMenuEmail) {
    elements.accountMenuEmail.textContent = email || "-";
  }
  if (elements.mobileMenuEmail) {
    elements.mobileMenuEmail.textContent = signedIn ? email : "로그인이 필요합니다";
  }
  if (elements.mobileMenuAuthButton) {
    elements.mobileMenuAuthButton.textContent = signedIn ? "마이 페이지" : "로그인";
  }
  if (elements.mobileMenuLogoutButton) {
    elements.mobileMenuLogoutButton.hidden = !signedIn;
  }
  if (!signedIn) {
    hideAccountMenu();
  }

  if (elements.authSignedOutPanel && elements.authSignedInPanel) {
    elements.authSignedOutPanel.hidden = signedIn;
    elements.authSignedInPanel.hidden = !signedIn;
  }

  if (elements.authUserEmail) {
    elements.authUserEmail.textContent = email || "-";
  }

  if (elements.myPageView?.classList.contains("active")) {
    renderMyPage();
  }

  const configured = Boolean(state.auth.client);
  [elements.magicLinkButton, elements.googleLoginButton].forEach((button) => {
    if (button) {
      button.disabled = state.auth.loading || signedIn || !configured;
    }
  });

  if (!configured && elements.authModal?.classList.contains("open")) {
    setAuthStatus("Supabase 설정이 필요합니다. Cloudflare 환경변수에 SUPABASE_URL, SUPABASE_ANON_KEY를 넣으면 활성화됩니다.", "warning");
  }
};

const initAuth = async () => {
  state.auth.config = await loadAuthConfig();
  const { supabaseUrl, supabaseAnonKey } = state.auth.config;

  if (!supabaseUrl || !supabaseAnonKey) {
    state.auth.ready = false;
    renderAuthUi();
    return;
  }

  const createClient = authClientFactory();
  if (!createClient) {
    state.auth.ready = false;
    renderAuthUi();
    setAuthStatus("로그인 라이브러리를 불러오지 못했습니다. 네트워크 상태를 확인해주세요.", "warning");
    return;
  }

  state.auth.client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  try {
    const callbackError = readAuthCallbackError();
    const { data } = await state.auth.client.auth.getSession();
    applyAuthSession(data?.session || null);
    if (callbackError && !data?.session) {
      showAuthModal();
      setAuthStatus(`Google 로그인 실패: ${callbackError}`, "warning");
    }
    if (callbackError || data?.session) {
      clearAuthCallbackFragments();
    }
    if (data?.session) {
      syncAccountData({ silent: true }).catch((error) => {
        reportAuthSyncError("initial account sync", error);
      });
    }
    state.auth.client.auth.onAuthStateChange((event, session) => {
      applyAuthSession(session);
      if (event === "SIGNED_IN") {
        setAuthStatus("로그인되었습니다.", "success");
        syncAccountData().catch((error) => {
          reportAuthSyncError("sign in account sync", error);
          setAuthStatus("학습 진도 동기화에 실패했습니다. 잠시 후 다시 시도해주세요.", "warning");
        });
      }
      if (event === "SIGNED_OUT") {
        setAuthStatus("로그아웃되었습니다.", "muted");
      }
    });
    state.auth.ready = true;
  } catch (error) {
    state.auth.ready = false;
    setAuthStatus("로그인 상태를 확인하지 못했습니다.", "warning");
  } finally {
    renderAuthUi();
  }
};

const showAuthModal = () => {
  elements.authModal.classList.add("open");
  elements.authModal.setAttribute("aria-hidden", "false");
  if (state.auth.user) {
    setAuthStatus("로그인 상태에서는 학습 진도와 북마크가 동기화됩니다.", "muted");
  } else if (!state.auth.client) {
    setAuthStatus("Supabase 설정이 필요합니다. Cloudflare 환경변수에 SUPABASE_URL, SUPABASE_ANON_KEY를 넣으면 활성화됩니다.", "warning");
  } else {
    setAuthStatus("로그인 링크를 받거나 Google 계정으로 계속할 수 있습니다.", "muted");
  }
  renderAuthUi();
  renderIcons();
  window.setTimeout(() => {
    if (!state.auth.user && state.auth.client) {
      elements.authEmail.focus();
    }
  }, 0);
};

const hideAuthModal = () => {
  elements.authModal.classList.remove("open");
  elements.authModal.setAttribute("aria-hidden", "true");
};

const requireLoginForStudySave = (source = "unknown", action = "save_progress") => {
  if (state.auth.user) return true;

  showAuthModal();
  setAuthStatus("북마크와 학습 진도 저장은 로그인 후 사용할 수 있습니다.", "warning");
  trackEvent("login_required", {
    source,
    action,
  });
  return false;
};

const setAuthLoading = (loading) => {
  state.auth.loading = loading;
  renderAuthUi();
};

const sendMagicLink = async (event) => {
  event.preventDefault();
  if (!state.auth.client || state.auth.loading) return;

  const email = elements.authEmail.value.trim();
  if (!EMAIL_PATTERN.test(email)) {
    setAuthStatus("이메일을 정확히 입력해주세요.", "warning");
    return;
  }

  setAuthLoading(true);
  setAuthStatus("로그인 링크를 보내는 중입니다.", "muted");

  try {
    const redirectTo = authRedirectUrl();
    const { error } = await state.auth.client.auth.signInWithOtp({
      email,
      options: redirectTo ? { emailRedirectTo: redirectTo } : undefined,
    });
    if (error) throw error;
    setAuthStatus("로그인 링크를 보냈습니다. 메일함을 확인해주세요.", "success");
    trackEvent("auth_magic_link_request", { method: "magic_link" });
  } catch (error) {
    setAuthStatus(error.message || "로그인 링크 전송에 실패했습니다.", "warning");
  } finally {
    setAuthLoading(false);
  }
};

const signInWithGoogle = async () => {
  if (!state.auth.client || state.auth.loading) return;
  setAuthLoading(true);
  setAuthStatus("Google 로그인으로 이동합니다.", "muted");

  try {
    const redirectTo = authRedirectUrl();
    const { error } = await state.auth.client.auth.signInWithOAuth({
      provider: "google",
      options: {
        ...(redirectTo ? { redirectTo } : {}),
        queryParams: {
          prompt: "select_account",
        },
      },
    });
    if (error) throw error;
    trackEvent("auth_oauth_start", { provider: "google" });
  } catch (error) {
    setAuthStatus(error.message || "Google 로그인 시작에 실패했습니다.", "warning");
    setAuthLoading(false);
  }
};

const signOut = async () => {
  hideAccountMenu();
  if (!state.auth.client || state.auth.loading) return;
  setAuthLoading(true);

  try {
    const { error } = await state.auth.client.auth.signOut();
    if (error) throw error;
    applyAuthSession(null);
    setAuthStatus("로그아웃되었습니다.", "muted");
    trackEvent("auth_sign_out");
  } catch (error) {
    setAuthStatus(error.message || "로그아웃에 실패했습니다.", "warning");
  } finally {
    setAuthLoading(false);
  }
};

const allQuestionBankQuestions = () => Object.values(questionBanksByRole).flat();

const progressRowForQuestion = (question) => {
  if (!state.auth.user || !question) return null;
  const studyState = getQuestionStudyState(question);
  const hasProgress = studyState.bookmarked || studyState.status;
  if (!hasProgress) return null;

  return {
    user_id: state.auth.user.id,
    role_id: questionRoleId(question),
    question_id: String(question.id),
    bookmarked: Boolean(studyState.bookmarked),
    status: studyState.status || null,
    updated_at: new Date(studyState.updatedAt || Date.now()).toISOString(),
  };
};

const renderStudyProgressSurfaces = () => {
  if (elements.questionBankView?.classList.contains("active")) {
    renderQuestionBank();
  }
  if (elements.quickPracticeView?.classList.contains("active")) {
    renderQuickPractice();
  }
  if (elements.myPageView?.classList.contains("active")) {
    renderMyPage();
  }
};

const syncUserProfile = async () => {
  if (!state.auth.client || !state.auth.user) return;
  const { error } = await state.auth.client.from("profiles").upsert(
    {
      id: state.auth.user.id,
      email: state.auth.user.email || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );
  if (error) throw error;
};

const syncQuestionProgress = async (question) => {
  if (!state.auth.client || !state.auth.user || !question) return;

  const row = progressRowForQuestion(question);
  const query = state.auth.client
    .from("question_progress")
    .delete()
    .eq("user_id", state.auth.user.id)
    .eq("role_id", questionRoleId(question))
    .eq("question_id", String(question.id));

  if (!row) {
    const { error } = await query;
    if (error) throw error;
    return;
  }

  const { error } = await state.auth.client
    .from("question_progress")
    .upsert(row, { onConflict: "user_id,role_id,question_id" });
  if (error) throw error;
};

const syncAccountData = async ({ silent = false } = {}) => {
  if (!state.auth.client || !state.auth.user || state.auth.progressSyncing) return;
  state.auth.progressSyncing = true;
  if (!silent) {
    setAuthStatus("학습 진도를 동기화하는 중입니다.", "muted");
  }

  try {
    await syncUserProfile();
    const { data, error } = await state.auth.client
      .from("question_progress")
      .select("role_id,question_id,bookmarked,status,updated_at");
    if (error) throw error;

    const remoteByKey = new Map(
      (data || []).map((row) => [`${row.role_id}:${row.question_id}`, row]),
    );
    const rowsToUpsert = [];
    let localChanged = false;

    allQuestionBankQuestions().forEach((question) => {
      const key = progressKey(question);
      const localState = getQuestionStudyState(question);
      const localHasProgress = localState.bookmarked || localState.status;
      const remote = remoteByKey.get(key);
      const remoteHasProgress = Boolean(remote && (remote.bookmarked || remote.status));
      const localUpdatedAt = Number(localState.updatedAt) || 0;
      const remoteUpdatedAt = Date.parse(remote?.updated_at || "") || 0;

      if (remoteHasProgress && (!localHasProgress || remoteUpdatedAt > localUpdatedAt)) {
        state.studyProgress[key] = {
          bookmarked: Boolean(remote.bookmarked),
          status: remote.status === "known" || remote.status === "confused" ? remote.status : null,
          updatedAt: remoteUpdatedAt || Date.now(),
        };
        localChanged = true;
        return;
      }

      if (localHasProgress && (!remoteHasProgress || localUpdatedAt >= remoteUpdatedAt)) {
        const row = progressRowForQuestion(question);
        if (row) rowsToUpsert.push(row);
      }
    });

    if (localChanged) {
      writeStudyProgress();
      renderStudyProgressSurfaces();
    }

    if (rowsToUpsert.length) {
      const { error: upsertError } = await state.auth.client
        .from("question_progress")
        .upsert(rowsToUpsert, { onConflict: "user_id,role_id,question_id" });
      if (upsertError) throw upsertError;
    }

    if (!silent) {
      setAuthStatus("학습 진도 동기화가 완료되었습니다.", "success");
    }
  } finally {
    state.auth.progressSyncing = false;
    renderAuthUi();
  }
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
  const target = state.reportTarget || interviewReportTarget();
  const question = target.question;
  if (!question) return;
  const reportText = elements.reportText.value.trim() || "신고 내용 미입력";
  const payload = {
    reportText,
    question: {
      number: target.number,
      total: target.total,
      text: question.text,
      answer: question.answer,
      shortAnswer: question.shortAnswer,
      keywords: question.keywords || [],
      category: question.category,
      difficulty: question.difficulty,
      originalIndex: question.originalIndex,
      roleId: question.roleId || target.role,
    },
    context: {
      source: target.source,
      rigor: target.rigor || state.config.rigor,
      phase: target.phase,
      role: target.role,
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

const selectedLandingRoleLabel = () => LANDING_ROLE_LABELS[state.landing.selectedRole] || "선택한 직무";

const showLandingWaitlistModal = () => {
  elements.landingWaitlistTitle.textContent = "준비중인 직무에요.";
  elements.landingWaitlistDescription.textContent = "콘텐츠가 완료되면 이메일로 먼저 알려드릴게요.";
  elements.landingWaitlistStatus.textContent = "";
  elements.landingWaitlistModal.classList.add("open");
  elements.landingWaitlistModal.setAttribute("aria-hidden", "false");
  window.setTimeout(() => elements.landingWaitlistEmail.focus(), 0);
};

const hideLandingWaitlistModal = () => {
  if (state.landing.waitlistSubmitting) return;
  elements.landingWaitlistModal.classList.remove("open");
  elements.landingWaitlistModal.setAttribute("aria-hidden", "true");
};

const setLandingRole = (card) => {
  state.landing.selectedRole = card.dataset.landingRole || "process";
  const selectedRole = questionBankRoleById(state.landing.selectedRole);
  const isEnabled = selectedRole.id === state.landing.selectedRole && selectedRole.enabled;

  $$(".landing-role-card").forEach((item) => {
    const active = item === card;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });

  elements.landingStartButton.disabled = !isEnabled;
  elements.landingStartButton.setAttribute("aria-disabled", String(!isEnabled));
  elements.landingStartButton.querySelector("span").textContent = isEnabled
    ? "면접 질문 확인하기"
    : "준비 중인 직무입니다";
  elements.landingMockButton.disabled = !isEnabled;
  elements.landingMockButton.setAttribute("aria-disabled", String(!isEnabled));

  if (!isEnabled) {
    showLandingWaitlistModal();
  }

  elements.landingWaitlistStatus.textContent = "";
  trackEvent("landing_role_select", {
    role: state.landing.selectedRole,
    enabled: isEnabled ? 1 : 0,
  });
};

const buildWaitlistPayload = () => ({
  email: elements.landingWaitlistEmail.value.trim(),
  role: state.landing.selectedRole,
  roleLabel: selectedLandingRoleLabel(),
  source: "landing",
  path: window.location.pathname,
  client: {
    userAgent: navigator.userAgent,
    language: navigator.language,
    submittedAt: new Date().toISOString(),
  },
});

const setWaitlistSubmitting = (isSubmitting) => {
  state.landing.waitlistSubmitting = isSubmitting;
  elements.landingWaitlistEmail.disabled = isSubmitting;
  elements.landingWaitlistForm.querySelector("button").disabled = isSubmitting;
};

const submitLandingWaitlist = async (event) => {
  event.preventDefault();
  if (state.landing.waitlistSubmitting) return;

  const payload = buildWaitlistPayload();
  if (!EMAIL_PATTERN.test(payload.email)) {
    elements.landingWaitlistStatus.textContent = "알림을 받을 이메일을 정확히 입력해주세요.";
    return;
  }

  setWaitlistSubmitting(true);
  elements.landingWaitlistStatus.textContent = "오픈 알림을 등록하는 중입니다.";

  try {
    await postWaitlistPayload(payload);
    elements.landingWaitlistStatus.textContent = `${payload.roleLabel} 오픈 알림 신청이 완료되었습니다.`;
    elements.landingWaitlistEmail.value = "";
    trackEvent("waitlist_submit", {
      role: payload.role,
      queued: 0,
    });
  } catch (error) {
    queueWaitlistPayload(payload);
    elements.landingWaitlistStatus.textContent =
      "지금은 서버 연결이 불안정해 임시 저장했습니다. 다음 접속 때 다시 전송을 시도할게요.";
    trackEvent("waitlist_submit", {
      role: payload.role,
      queued: 1,
    });
  } finally {
    setWaitlistSubmitting(false);
  }
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
    questionKey: progressKey(question),
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
    questionKey: state.recordingQuestion?.questionKey ?? progressKey(currentQuestion()),
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

const recordingForQuestion = (questionIndex, question = null) =>
  state.recordings.find((recording) =>
    question && recording.questionKey
      ? recording.questionKey === progressKey(question)
      : recording.questionIndex === questionIndex,
  );

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

const answerParagraphs = (answer) => {
  const cleaned = String(answer || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return ["모범 답안 준비중입니다."];

  const sentences = cleaned.split(/(?<=[.!?])\s+/).map((sentence) => sentence.trim()).filter(Boolean);
  const paragraphs = [];
  let current = "";

  sentences.forEach((sentence) => {
    const next = current ? `${current} ${sentence}` : sentence;
    if (current && next.length > 260) {
      paragraphs.push(current);
      current = sentence;
    } else {
      current = next;
    }
  });

  if (current) {
    paragraphs.push(current);
  }

  return paragraphs;
};

const renderModelAnswerHtml = (answer) =>
  answerParagraphs(answer)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

const modelAnswerForQuestion = (question) =>
  state.answerScriptMode === "short" && question.shortAnswer ? question.shortAnswer : question.answer;

const renderAnswerScriptToggle = () => `
  <div class="answer-script-toggle" role="group" aria-label="답변 예시 길이 선택">
    <button class="${state.answerScriptMode === "short" ? "active" : ""}" type="button" data-answer-script-mode="short">
      40초 Script
    </button>
    <button class="${state.answerScriptMode === "full" ? "active" : ""}" type="button" data-answer-script-mode="full">
      2분 Script
    </button>
  </div>
`;

const renderModelAnswerBlock = (question) =>
  `${renderAnswerScriptToggle()}${renderModelAnswerHtml(modelAnswerForQuestion(question))}`;

const renderPersonalityAnswerBlock = (question) => `
  <div class="personality-answer-grid">
    <section class="personality-answer-card recommended">
      <h4 class="personality-answer-title">
        <i data-lucide="check-circle-2"></i>
        <span>권장 답변</span>
      </h4>
      <div class="model-answer-text">${renderModelAnswerHtml(question.recommendedAnswer || question.answer)}</div>
    </section>
    <section class="personality-answer-card avoid">
      <h4 class="personality-answer-title">
        <i data-lucide="alert-circle"></i>
        <span>피해야할 답변</span>
      </h4>
      <div class="model-answer-text">${renderModelAnswerHtml(question.avoidAnswer)}</div>
    </section>
  </div>
`;

const activeAnswerQuestionForAnalytics = () => {
  if (elements.quickPracticeView?.classList.contains("active")) {
    return { question: quickPracticeQuestion(), source: "quick_practice" };
  }

  if (elements.questionBankView?.classList.contains("active") && state.questionBank.expandedId) {
    return { question: questionBankQuestionById(state.questionBank.expandedId), source: "question_bank" };
  }

  return { question: null, source: "unknown" };
};

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
    // localStorage가 막힌 환경에서도 질문 모음 자체는 계속 사용할 수 있게 둡니다.
  }
};

const questionRoleId = (question) => question?.roleId || "process";
const progressKey = (question) => `${questionRoleId(question)}:${question.id}`;
const legacyProgressKey = (question) => String(question.id);

const getQuestionStudyState = (question) => {
  const saved =
    state.studyProgress[progressKey(question)] ||
    (questionRoleId(question) === "process" ? state.studyProgress[legacyProgressKey(question)] : {}) ||
    {};
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

  if (questionRoleId(question) === "process") {
    delete state.studyProgress[legacyProgressKey(question)];
  }

  writeStudyProgress();
  syncQuestionProgress(question).catch((error) => {
    reportAuthSyncError("single question progress sync", error);
  });
};

const questionBankRoleById = (roleId) =>
  QUESTION_BANK_ROLES.find((role) => role.id === roleId) || QUESTION_BANK_ROLES[0];

const questionBankRole = () => questionBankRoleById(state.questionBank.role);

const isPersonalityRole = (roleId = state.questionBank.role) => questionBankRoleById(roleId).questionType === "personality";

const isPersonalityQuestion = (question) => question?.questionType === "personality" || questionRoleId(question) === "personality";

const questionBankQuestionsForRole = (roleId = state.questionBank.role) => questionBanksByRole[roleId] || [];

const questionBankQuestionById = (questionId, roleId = state.questionBank.role) =>
  questionBankQuestionsForRole(roleId).find((question) => String(question.id) === String(questionId));

const questionByProgressKey = (key) => {
  const [roleId, ...idParts] = String(key || "").split(":");
  const questionId = idParts.join(":");
  if (!roleId || !questionId) return null;
  return questionBankQuestionById(questionId, roleId);
};

const progressKeysForQuestions = (questionsToMap = []) =>
  questionsToMap.map((question) => progressKey(question)).filter(Boolean);

const questionBankCategories = () => {
  const categoryCounts = new Map();
  questionBankQuestionsForRole().forEach((question) => {
    categoryCounts.set(question.category, (categoryCounts.get(question.category) || 0) + 1);
  });
  const entries = [...categoryCounts.entries()];
  return (isPersonalityRole() ? entries : entries.sort((a, b) => {
      const aIsMain = MAIN_PROCESS_CATEGORIES.has(a[0]) ? 0 : 1;
      const bIsMain = MAIN_PROCESS_CATEGORIES.has(b[0]) ? 0 : 1;
      if (aIsMain !== bIsMain) return aIsMain - bIsMain;
      return a[0].localeCompare(b[0], "ko");
    }))
    .map(([category, count]) => ({ category, count }));
};

const questionBankSearchMatches = (question, search = state.questionBank.search) => {
  const query = search.trim().toLowerCase();
  if (!query) return true;

  const haystack = [
    question.text,
    question.answer,
    question.recommendedAnswer,
    question.avoidAnswer,
    question.category,
    question.difficulty,
    ...(question.keywords || []),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
};

const questionBankMatches = (
  question,
  {
    categories = state.questionBank.categories,
    difficulties = state.questionBank.difficulties,
    search = state.questionBank.search,
  } = {},
) => {
  if (categories.length && !categories.includes(question.category)) return false;
  if (difficulties.length && !difficulties.includes(question.difficulty)) return false;
  return questionBankSearchMatches(question, search);
};

const questionBankDifficultyCounts = () => {
  const counts = { all: 0, 입문: 0, 실전: 0, 심화: 0 };
  questionBankQuestionsForRole()
    .filter((question) => questionBankMatches(question, { difficulties: [] }))
    .forEach((question) => {
      counts.all += 1;
      if (counts[question.difficulty] !== undefined) {
        counts[question.difficulty] += 1;
      }
    });
  return counts;
};

const questionBankCategoryCounts = () => {
  const counts = new Map();
  let all = 0;
  questionBankQuestionsForRole()
    .filter((question) => questionBankMatches(question, { categories: [] }))
    .forEach((question) => {
      all += 1;
      counts.set(question.category, (counts.get(question.category) || 0) + 1);
    });
  return { all, counts };
};

const questionBankBaseSort = (a, b) => {
  if (isPersonalityQuestion(a) || isPersonalityQuestion(b)) {
    return a.originalIndex - b.originalIndex;
  }

  const aIsMain = MAIN_PROCESS_CATEGORIES.has(a.category) ? 0 : 1;
  const bIsMain = MAIN_PROCESS_CATEGORIES.has(b.category) ? 0 : 1;
  if (aIsMain !== bIsMain) return aIsMain - bIsMain;

  const categoryCompare = a.category.localeCompare(b.category, "ko");
  if (categoryCompare !== 0) return categoryCompare;

  return a.originalIndex - b.originalIndex;
};

const sortQuestionBankQuestions = (questionsToSort) => {
  const sorted = [...questionsToSort];
  const difficultyRank = (question) => QUESTION_BANK_DIFFICULTY_RANK[question.difficulty] ?? 99;

  if (state.questionBank.sort === "bookmarked") {
    return sorted.sort((a, b) => {
      const bookmarkCompare = Number(getQuestionStudyState(b).bookmarked) - Number(getQuestionStudyState(a).bookmarked);
      return bookmarkCompare || questionBankBaseSort(a, b);
    });
  }

  if (state.questionBank.sort === "practiceNeeded") {
    return sorted.sort((a, b) => {
      const practiceCompare =
        Number(getQuestionStudyState(b).status === "confused") - Number(getQuestionStudyState(a).status === "confused");
      return practiceCompare || questionBankBaseSort(a, b);
    });
  }

  if (state.questionBank.sort === "difficultyAsc") {
    return sorted.sort((a, b) => difficultyRank(a) - difficultyRank(b) || questionBankBaseSort(a, b));
  }

  if (state.questionBank.sort === "difficultyDesc") {
    return sorted.sort((a, b) => difficultyRank(b) - difficultyRank(a) || questionBankBaseSort(a, b));
  }

  return sorted.sort(questionBankBaseSort);
};

const filteredQuestionBankQuestions = () =>
  sortQuestionBankQuestions(questionBankQuestionsForRole().filter((question) => questionBankMatches(question)));

const questionBankPageSizeValue = () =>
  state.questionBank.pageSize === "all" ? "all" : Math.max(1, Number(state.questionBank.pageSize) || 10);

const questionBankPageCount = (totalCount) => {
  const pageSize = questionBankPageSizeValue();
  if (pageSize === "all") return 1;
  return Math.max(1, Math.ceil(totalCount / pageSize));
};

const clampQuestionBankPage = (totalCount) => {
  const pageCount = questionBankPageCount(totalCount);
  state.questionBank.page = Math.min(Math.max(1, state.questionBank.page), pageCount);
  return pageCount;
};

const paginatedQuestionBankQuestions = (filtered) => {
  const pageSize = questionBankPageSizeValue();
  const pageCount = clampQuestionBankPage(filtered.length);

  if (pageSize === "all") {
    return {
      pageQuestions: filtered,
      pageCount,
      startIndex: 0,
      endIndex: filtered.length,
    };
  }

  const startIndex = (state.questionBank.page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filtered.length);

  return {
    pageQuestions: filtered.slice(startIndex, endIndex),
    pageCount,
    startIndex,
    endIndex,
  };
};

const questionBankDifficultyClass = (difficulty) =>
  ({
    입문: "beginner",
    실전: "intermediate",
    심화: "advanced",
  })[difficulty] || "intermediate";

const personalityCategoryClass = (category) =>
  ({
    자기소개: "intro",
    지원동기: "motivation",
    팀워크: "teamwork",
    문제해결: "problem-solving",
    실패경험: "failure",
    "성격/가치관": "values",
    "회사/산업": "industry",
    "회사/산업 관심도": "industry",
    마무리: "closing",
    "면접 마무리": "closing",
  })[category] || "default";

const renderQuestionBankCategoryList = () => {
  const categories = questionBankCategories();
  const categoryCounts = questionBankCategoryCounts();
  const options = [
    `<label class="bank-filter-option ${state.questionBank.categories.length === 0 ? "active" : ""}">
      <input type="checkbox" data-bank-category="all" ${state.questionBank.categories.length === 0 ? "checked" : ""} />
      <span>전체</span>
      <strong>${categoryCounts.all}</strong>
    </label>`,
    ...categories.map(
      ({ category }) => `
        <label class="bank-filter-option ${state.questionBank.categories.includes(category) ? "active" : ""}">
          <input type="checkbox" data-bank-category="${escapeHtml(category)}" ${state.questionBank.categories.includes(category) ? "checked" : ""} />
          <span>${escapeHtml(category)}</span>
          <strong>${categoryCounts.counts.get(category) || 0}</strong>
        </label>
      `,
    ),
  ];
  elements.questionBankCategoryList.innerHTML = options.join("");
};

const renderQuestionBankDifficultyList = () => {
  const counts = questionBankDifficultyCounts();
  const difficulties = [
    ["all", "전체"],
    ...QUESTION_BANK_DIFFICULTIES.map((difficulty) => [difficulty, difficulty]),
  ];
  elements.questionBankDifficultyList.innerHTML = difficulties
    .map(
      ([value, label]) => `
        <label class="bank-filter-option ${
          value === "all"
            ? state.questionBank.difficulties.length === 0
              ? "active"
              : ""
            : state.questionBank.difficulties.includes(value)
              ? "active"
              : ""
        }">
          <input type="checkbox" data-bank-difficulty="${value}" ${
            value === "all"
              ? state.questionBank.difficulties.length === 0
                ? "checked"
                : ""
              : state.questionBank.difficulties.includes(value)
                ? "checked"
                : ""
          } />
          <span>${label}</span>
          <strong>${counts[value] || 0}</strong>
        </label>
      `,
    )
    .join("");
};

const renderQuestionBankStudySummary = () => {
  const role = questionBankRole();
  if (isPersonalityRole(role.id)) {
    elements.questionBankStudySummary.hidden = true;
    return;
  }
  const roleQuestions = questionBankQuestionsForRole();
  const totalCount = roleQuestions.length;
  const knownCount = roleQuestions.filter((question) => getQuestionStudyState(question).status === "known").length;
  const practiceCount = roleQuestions.filter((question) => getQuestionStudyState(question).status === "confused").length;
  const knownPercent = totalCount ? Math.round((knownCount / totalCount) * 100) : 0;
  const practicePercent = totalCount ? Math.round((practiceCount / totalCount) * 100) : 0;
  const progressPercent = totalCount ? Math.round(((knownCount + practiceCount) / totalCount) * 100) : 0;

  elements.questionBankStudySummary.hidden = !role.enabled;
  elements.questionBankProgressPercent.textContent = `${progressPercent}%`;
  elements.questionBankKnownCount.textContent = `${knownCount} / ${totalCount}`;
  elements.questionBankPracticeCount.textContent = `${practiceCount} / ${totalCount}`;
  elements.questionBankKnownMeter.style.width = `${knownPercent}%`;
  elements.questionBankPracticeMeter.style.width = `${practicePercent}%`;
};

const renderQuestionBankPagination = ({ totalCount, pageCount, startIndex, endIndex }) => {
  if (!elements.questionBankPagination) return;

  if (!totalCount) {
    elements.questionBankPagination.innerHTML = "";
    elements.questionBankPagination.hidden = true;
    return;
  }

  const currentPage = state.questionBank.page;
  const pageItems = [1, currentPage - 1, currentPage, currentPage + 1, pageCount]
    .filter((page) => page >= 1 && page <= pageCount)
    .filter((page, index, pages) => pages.indexOf(page) === index)
    .sort((a, b) => a - b);

  const pageButtons = [];
  pageItems.forEach((page, index) => {
    if (index > 0 && page - pageItems[index - 1] > 1) {
      pageButtons.push('<span class="bank-page-ellipsis">...</span>');
    }

    pageButtons.push(`
      <button class="bank-page-button ${page === currentPage ? "active" : ""}" type="button" data-bank-page="${page}" aria-label="${page}페이지">
        ${page}
      </button>
    `);
  });

  elements.questionBankPagination.hidden = false;
  elements.questionBankPagination.innerHTML = `
    <span class="bank-page-summary">${startIndex + 1}-${endIndex} / ${totalCount}개 표시</span>
    <div class="bank-page-buttons">
      <button class="bank-page-button" type="button" data-bank-page="prev" ${currentPage <= 1 ? "disabled" : ""} aria-label="이전 페이지">
        <i data-lucide="chevron-left"></i>
      </button>
      ${pageButtons.join("")}
      <button class="bank-page-button" type="button" data-bank-page="next" ${currentPage >= pageCount ? "disabled" : ""} aria-label="다음 페이지">
        <i data-lucide="chevron-right"></i>
      </button>
    </div>
  `;
};

const renderQuestionBankList = () => {
  const role = questionBankRole();
  const filtered = filteredQuestionBankQuestions();
  const { pageQuestions, pageCount, startIndex, endIndex } = paginatedQuestionBankQuestions(filtered);
  elements.questionBankCount.textContent = `${filtered.length}개 문제`;
  elements.questionBankPageSize.value = String(state.questionBank.pageSize);
  elements.questionBankSortLabel.textContent = role.enabled ? "정렬" : "준비중";
  elements.questionBankSort.disabled = !role.enabled;
  elements.questionBankPageSize.disabled = !role.enabled;
  elements.questionBankLayoutToggle.querySelectorAll("[data-bank-layout]").forEach((button) => {
    const isActive = button.dataset.bankLayout === state.questionBank.layout;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  elements.questionBankList.classList.toggle("list-layout", state.questionBank.layout === "list");
  elements.questionBankList.classList.toggle("card-layout", state.questionBank.layout !== "list");
  elements.questionBankEmpty.hidden = filtered.length > 0;

  if (!role.enabled) {
    elements.questionBankList.innerHTML = `
      <article class="question-bank-coming-soon">
        <i data-lucide="construction"></i>
        <strong>${escapeHtml(role.shortLabel)} 질문 모음은 준비중입니다.</strong>
        <p>${escapeHtml(role.description)}</p>
      </article>
    `;
    elements.questionBankEmpty.hidden = true;
    renderQuestionBankPagination({ totalCount: 0, pageCount: 1, startIndex: 0, endIndex: 0 });
    renderIcons();
    return;
  }

  elements.questionBankList.innerHTML = pageQuestions
    .map((question) => {
      const expanded = String(state.questionBank.expandedId) === String(question.id);
      const personalityQuestion = isPersonalityQuestion(question);
      const studyState = getQuestionStudyState(question);
      const keywords = question.keywords?.length
        ? question.keywords.slice(0, 5).map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("")
        : "<span>키워드 준비중</span>";
      const preview = personalityQuestion
        ? question.recommendedAnswer || question.answer || "권장 답변 준비중입니다."
        : modelAnswerForQuestion(question) || "모범 답안 준비중입니다.";
      const difficultyBadge = personalityQuestion
        ? ""
        : `<span class="bank-difficulty-badge ${questionBankDifficultyClass(question.difficulty)}">${escapeHtml(question.difficulty)}</span>`;
      const categoryBadge = personalityQuestion
        ? `<span class="personality-category-badge ${personalityCategoryClass(question.category)}">${escapeHtml(question.category)}</span>`
        : `<span>${escapeHtml(question.category)}</span>`;
      const keywordBlock = personalityQuestion ? "" : `<div class="question-bank-keywords">${keywords}</div>`;
      const answerTitle = personalityQuestion ? "인성 답변 가이드" : "모범 답안";
      const answerBody = personalityQuestion
        ? renderPersonalityAnswerBlock(question)
        : `<div class="model-answer-text">${renderModelAnswerBlock(question)}</div>`;
      const statusAndPractice = personalityQuestion
        ? ""
        : `
            <div class="bank-status-actions" aria-label="문제 연습 상태">
              <button class="bank-status-button known ${studyState.status === "known" ? "active" : ""}" type="button" data-bank-status-id="${question.id}" data-bank-status="known" aria-label="대답 가능" title="대답 가능" aria-pressed="${studyState.status === "known"}">
                <i data-lucide="check-circle-2"></i>
                <span>대답 가능</span>
              </button>
              <button class="bank-status-button practice ${studyState.status === "confused" ? "active" : ""}" type="button" data-bank-status-id="${question.id}" data-bank-status="confused" aria-label="연습 필요" title="연습 필요" aria-pressed="${studyState.status === "confused"}">
                <i data-lucide="alert-circle"></i>
                <span>연습 필요</span>
              </button>
            </div>
            <button class="small-button bank-practice-button" type="button" data-bank-practice="${question.originalIndex}" data-bank-practice-role="${escapeHtml(question.roleId || "process")}" aria-label="연습하기" title="연습하기">
              <span>연습하기</span>
              <i data-lucide="arrow-right"></i>
            </button>
          `;
      return `
        <article class="question-bank-card ${expanded ? "expanded" : ""} ${personalityQuestion ? "personality-card" : ""}" data-bank-card="${escapeHtml(question.id)}">
          <div class="question-bank-card-main">
            <button class="bank-icon-button bank-bookmark-button bank-bookmark-card-button ${studyState.bookmarked ? "active" : ""}" type="button" data-bank-bookmark="${question.id}" aria-label="${studyState.bookmarked ? "북마크 해제" : "북마크"}" title="${studyState.bookmarked ? "북마크 해제" : "북마크"}" aria-pressed="${studyState.bookmarked}">
              <i data-lucide="bookmark"></i>
            </button>
            <div class="question-bank-card-meta">
              ${difficultyBadge}
              ${categoryBadge}
              <h2>${escapeHtml(question.text)}</h2>
            </div>
            <p class="question-bank-preview" ${expanded ? "hidden" : ""}>${escapeHtml(preview)}</p>
            ${keywordBlock}
            <div class="question-bank-answer" ${expanded ? "" : "hidden"}>
              <div class="question-bank-answer-head">
                <h3>${answerTitle}</h3>
                <button class="bank-answer-report-button" type="button" data-bank-report="${question.id}" aria-label="문항 신고" title="문항 신고">
                  <i data-lucide="flag"></i>
                  <span>문항 신고</span>
                </button>
              </div>
              ${answerBody}
            </div>
          </div>
          <aside class="question-bank-card-side ${personalityQuestion ? "personality-side" : ""}">
            <button class="bank-icon-button bank-bookmark-button bank-bookmark-list-button ${studyState.bookmarked ? "active" : ""}" type="button" data-bank-bookmark="${question.id}" aria-label="${studyState.bookmarked ? "북마크 해제" : "북마크"}" title="${studyState.bookmarked ? "북마크 해제" : "북마크"}" aria-pressed="${studyState.bookmarked}">
              <i data-lucide="bookmark"></i>
            </button>
            ${statusAndPractice}
          </aside>
        </article>
      `;
    })
    .join("");
  renderQuestionBankPagination({ totalCount: filtered.length, pageCount, startIndex, endIndex });
  renderIcons();
};

const renderQuestionBank = () => {
  const role = questionBankRole();
  const personalityMode = isPersonalityRole(role.id);
  elements.questionBankRole.value = state.questionBank.role;
  elements.questionBankSort.value = state.questionBank.sort;
  elements.questionBankView.classList.toggle("sidebar-collapsed", state.questionBank.sidebarCollapsed);
  elements.questionBankView.classList.toggle("filter-drawer-open", state.questionBank.filterDrawerOpen);
  elements.questionBankView.classList.toggle("personality-bank", personalityMode);
  document.body.classList.toggle(
    "question-bank-sidebar-collapsed",
    elements.questionBankView.classList.contains("active") && state.questionBank.sidebarCollapsed,
  );
  document.body.classList.toggle(
    "question-filter-open",
    elements.questionBankView.classList.contains("active") && state.questionBank.filterDrawerOpen,
  );
  elements.questionBankSidebarCollapseButton.setAttribute(
    "aria-label",
    state.questionBank.sidebarCollapsed ? "필터 사이드바 열기" : "필터 사이드바 접기",
  );
  elements.questionBankSidebarCollapseButton.setAttribute("aria-expanded", String(!state.questionBank.sidebarCollapsed));
  elements.questionBankSidebarCollapseButton.innerHTML = state.questionBank.sidebarCollapsed
    ? '<i data-lucide="panel-left-open"></i>'
    : '<i data-lucide="panel-left-close"></i>';
  elements.questionBankFilterButton.setAttribute("aria-expanded", String(state.questionBank.filterDrawerOpen));
  elements.questionBankFilterBackdrop.setAttribute("aria-hidden", String(!state.questionBank.filterDrawerOpen));
  if (elements.questionBankRoleName) {
    elements.questionBankRoleName.textContent = role.shortLabel;
  }
  elements.questionBankTitle.textContent = `${role.shortLabel} 질문 모음`;
  elements.questionBankDescription.textContent = personalityMode
    ? "문제를 클릭하면 권장 답변과 피해야할 답변을 확인할 수 있어요."
    : "문제를 클릭하면 모범 답안을 확인할 수 있어요.";
  renderQuestionBankStudySummary();
  renderQuestionBankDifficultyList();
  renderQuestionBankCategoryList();
  renderQuestionBankList();
};

const setQuestionBankRole = (roleId) => {
  resetQuestionBankFiltersForRole(roleId);
  state.questionBank.sort = "default";
  renderQuestionBank();
  if (elements.questionBankView.classList.contains("active")) {
    updateAppRoute("question-bank");
  }
};

const openPersonalityQuestionBank = () => {
  resetQuestionBankFiltersForRole("personality");
  requestViewChange("question-bank");
};

const toggleQuestionBankFilter = (filterName, value) => {
  if (value === "all") {
    state.questionBank[filterName] = [];
  } else {
    const currentValues = state.questionBank[filterName];
    state.questionBank[filterName] = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
  }
  state.questionBank.page = 1;
  state.questionBank.expandedId = null;
  renderQuestionBank();
};

const closeQuestionBankFilterDrawer = () => {
  state.questionBank.filterDrawerOpen = false;
  elements.questionBankView?.classList.remove("filter-drawer-open");
  elements.questionBankFilterButton?.setAttribute("aria-expanded", "false");
  elements.questionBankFilterBackdrop?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("question-filter-open");
};

const syncMyPageFilterDrawer = () => {
  const drawerOpen = elements.myPageView?.classList.contains("active") && state.myPage.filterDrawerOpen;
  elements.myPageView?.classList.toggle("filter-drawer-open", drawerOpen);
  elements.myPageFilterButton?.setAttribute("aria-expanded", String(drawerOpen));
  elements.myPageFilterBackdrop?.setAttribute("aria-hidden", String(!drawerOpen));
  document.body.classList.toggle("question-filter-open", Boolean(drawerOpen));
};

const closeMyPageFilterDrawer = () => {
  state.myPage.filterDrawerOpen = false;
  syncMyPageFilterDrawer();
};

const toggleQuestionBankBookmark = (questionId) => {
  const question = questionBankQuestionById(questionId);
  if (!question) return;
  if (!requireLoginForStudySave("question_bank", "bookmark")) return;
  const studyState = getQuestionStudyState(question);
  const nextBookmarked = !studyState.bookmarked;
  setQuestionStudyState(question, { bookmarked: nextBookmarked });
  trackEvent(
    "bookmark_click",
    analyticsQuestionPayload(question, {
      source: "question_bank",
      bookmarked: nextBookmarked ? 1 : 0,
      action: nextBookmarked ? "add" : "remove",
    }),
  );
  renderQuestionBankList();
};

const toggleQuestionBankStatus = (questionId, status) => {
  const question = questionBankQuestionById(questionId);
  if (!question) return;
  if (!requireLoginForStudySave("question_bank", "study_status")) return;
  const studyState = getQuestionStudyState(question);
  setQuestionStudyState(question, { status: studyState.status === status ? null : status });
  renderQuestionBankStudySummary();
  renderQuestionBankList();
};

const myPageBookmarkedQuestions = () =>
  allQuestionBankQuestions().filter((question) => getQuestionStudyState(question).bookmarked);

const myPageStatusLabel = (status) =>
  ({
    known: "대답 가능",
    confused: "연습 필요",
  })[status] || "미분류";

const myPageMatchesSearch = (question) => {
  const query = state.myPage.search.trim().toLowerCase();
  if (!query) return true;
  return [
    question.text,
    question.answer,
    question.shortAnswer,
    question.recommendedAnswer,
    question.avoidAnswer,
    question.jobRole,
    question.category,
    question.difficulty,
    ...(question.keywords || []),
  ]
    .join(" ")
    .toLowerCase()
    .includes(query);
};

const myPageFilteredBookmarks = () => {
  const roleFilter = state.myPage.role;
  const difficultyFilter = state.myPage.difficulty;
  const categoryFilter = state.myPage.category;
  const difficultyRank = (question) => QUESTION_BANK_DIFFICULTY_RANK[question.difficulty] ?? 99;

  const filtered = myPageBookmarkedQuestions().filter((question) => {
    if (roleFilter !== "all" && questionRoleId(question) !== roleFilter) return false;
    if (difficultyFilter !== "all" && question.difficulty !== difficultyFilter) return false;
    if (categoryFilter !== "all" && question.category !== categoryFilter) return false;
    return myPageMatchesSearch(question);
  });

  return filtered.sort((a, b) => {
    if (state.myPage.sort === "role") {
      return questionBankRoleById(questionRoleId(a)).shortLabel.localeCompare(
        questionBankRoleById(questionRoleId(b)).shortLabel,
        "ko",
      ) || questionBankBaseSort(a, b);
    }

    if (state.myPage.sort === "difficulty") {
      return difficultyRank(a) - difficultyRank(b) || questionBankBaseSort(a, b);
    }

    if (state.myPage.sort === "category") {
      return a.category.localeCompare(b.category, "ko") || questionBankBaseSort(a, b);
    }

    return getQuestionStudyState(b).updatedAt - getQuestionStudyState(a).updatedAt || questionBankBaseSort(a, b);
  });
};

const myPageSelectedQuestions = () =>
  state.myPage.selectedKeys
    .map((key) => questionByProgressKey(key))
    .filter((question) => question && getQuestionStudyState(question).bookmarked);

const myPageFilterOptionHtml = (type, value, label, count, active) => `
  <label class="bank-filter-option ${active ? "active" : ""}">
    <input type="checkbox" data-my-page-filter="${type}" value="${escapeHtml(value)}" ${active ? "checked" : ""} />
    <span>${escapeHtml(label)}</span>
    <strong>${count}</strong>
  </label>
`;

const syncMyPageFilterOptions = (bookmarks) => {
  const roleMatched = bookmarks
    .filter((question) => state.myPage.role === "all" || questionRoleId(question) === state.myPage.role)
    .filter(myPageMatchesSearch);
  const difficultyBase = roleMatched.filter((question) => state.myPage.category === "all" || question.category === state.myPage.category);
  const availableDifficulties = QUESTION_BANK_DIFFICULTIES.filter((difficulty) =>
    difficultyBase.some((question) => question.difficulty === difficulty),
  );

  if (state.myPage.difficulty !== "all" && !availableDifficulties.includes(state.myPage.difficulty)) {
    state.myPage.difficulty = "all";
  }

  elements.myPageDifficultyFilter.innerHTML = [
    myPageFilterOptionHtml("difficulty", "all", "전체", difficultyBase.length, state.myPage.difficulty === "all"),
    ...availableDifficulties.map((difficulty) => {
      const count = difficultyBase.filter((question) => question.difficulty === difficulty).length;
      return myPageFilterOptionHtml("difficulty", difficulty, difficulty, count, state.myPage.difficulty === difficulty);
    }),
  ].join("");

  const categories = [...new Set(
    roleMatched
      .filter((question) => state.myPage.difficulty === "all" || question.difficulty === state.myPage.difficulty)
      .map((question) => question.category),
  )].sort((a, b) => a.localeCompare(b, "ko"));

  if (state.myPage.category !== "all" && !categories.includes(state.myPage.category)) {
    state.myPage.category = "all";
  }

  elements.myPageCategoryFilter.innerHTML = [
    myPageFilterOptionHtml("category", "all", "전체", roleMatched.filter(
      (question) => state.myPage.difficulty === "all" || question.difficulty === state.myPage.difficulty,
    ).length, state.myPage.category === "all"),
    ...categories.map((category) => {
      const count = roleMatched
        .filter((question) => state.myPage.difficulty === "all" || question.difficulty === state.myPage.difficulty)
        .filter((question) => question.category === category).length;
      return myPageFilterOptionHtml("category", category, category, count, state.myPage.category === category);
    }),
  ].join("");
};

const renderMyPageFilters = (bookmarks) => {
  elements.myPageRoleFilter.innerHTML = [
    '<option value="all">전체 직무</option>',
    ...QUESTION_BANK_ROLES.filter((role) => role.enabled).map(
      (role) => `<option value="${role.id}">${escapeHtml(role.shortLabel)}</option>`,
    ),
  ].join("");
  elements.myPageRoleFilter.value = state.myPage.role;

  elements.myPageSearch.value = state.myPage.search;
  elements.myPageSort.value = state.myPage.sort;
  syncMyPageFilterOptions(bookmarks);
};

const renderMyPageSelectionBar = (visibleQuestions) => {
  const selectedQuestions = myPageSelectedQuestions();
  const selectedCount = selectedQuestions.length;
  const visibleKeys = new Set(visibleQuestions.map((question) => progressKey(question)));
  const visibleSelectedCount = state.myPage.selectedKeys.filter((key) => visibleKeys.has(key)).length;

  elements.myPageSelectedCount.textContent = selectedCount;
  elements.myPageSelectedBar.hidden = selectedCount === 0;
  elements.myPageSelectAll.checked = visibleQuestions.length > 0 && visibleSelectedCount === visibleQuestions.length;
  elements.myPageSelectAll.indeterminate = visibleSelectedCount > 0 && visibleSelectedCount < visibleQuestions.length;
  elements.myPageQuickPracticeButton.disabled = selectedCount === 0;
  elements.myPageMockPracticeButton.disabled = selectedCount === 0;
  elements.myPageRemoveSelectedButton.disabled = selectedCount === 0;
};

const redirectUnauthenticatedMyPage = () => {
  if (!elements.myPageView?.classList.contains("active")) return;
  setView("question-bank", { replaceRoute: true });
  showAuthModal();
};

const renderMyPage = () => {
  const signedIn = Boolean(state.auth.user);
  elements.myPageSelectedBar.hidden = true;
  elements.myPageSidebar.hidden = !signedIn;

  if (!signedIn) {
    elements.myPageSignedIn.hidden = true;
    state.myPage.filterDrawerOpen = false;
    syncMyPageFilterDrawer();
    if (state.auth.ready || state.auth.client) {
      window.setTimeout(redirectUnauthenticatedMyPage, 0);
    }
    renderIcons();
    return;
  }

  elements.myPageSignedIn.hidden = false;
  syncMyPageFilterDrawer();
  const bookmarks = myPageBookmarkedQuestions();
  const bookmarkKeys = new Set(bookmarks.map((question) => progressKey(question)));
  state.myPage.selectedKeys = state.myPage.selectedKeys.filter((key) => bookmarkKeys.has(key));
  const visibleQuestions = myPageFilteredBookmarks();

  elements.myPageBookmarkCount.textContent = bookmarks.length;
  renderMyPageFilters(bookmarks);

  const hasBookmarks = bookmarks.length > 0;
  elements.myPageEmpty.hidden = hasBookmarks && visibleQuestions.length > 0;
  elements.myPageList.hidden = !hasBookmarks || visibleQuestions.length === 0;
  elements.myPageSelectAll.disabled = !visibleQuestions.length;
  elements.myPageClearSelection.disabled = !state.myPage.selectedKeys.length;

  if (!hasBookmarks) {
    elements.myPageEmpty.querySelector("strong").textContent = "아직 북마크한 질문이 없습니다.";
    elements.myPageEmpty.querySelector("p").textContent = "질문 모음에서 다시 보고 싶은 질문을 북마크해두면 이곳에 모입니다.";
    elements.myPageList.innerHTML = "";
    renderMyPageSelectionBar([]);
    renderIcons();
    return;
  }

  if (!visibleQuestions.length) {
    elements.myPageEmpty.querySelector("strong").textContent = "조건에 맞는 북마크가 없습니다.";
    elements.myPageEmpty.querySelector("p").textContent = "필터나 검색어를 조정해보세요.";
    elements.myPageList.innerHTML = "";
    renderMyPageSelectionBar([]);
    renderIcons();
    return;
  }

  elements.myPageList.innerHTML = visibleQuestions
    .map((question) => {
      const key = progressKey(question);
      const studyState = getQuestionStudyState(question);
      const selected = state.myPage.selectedKeys.includes(key);
      const status = studyState.status || "none";
      return `
        <article class="my-bookmark-item ${selected ? "selected" : ""}" data-my-page-key="${escapeHtml(key)}">
          <label class="my-bookmark-check">
            <input type="checkbox" data-my-page-select="${escapeHtml(key)}" ${selected ? "checked" : ""} />
            <span class="sr-only">질문 선택</span>
          </label>
          <div class="my-bookmark-main">
            <div class="my-bookmark-meta">
              <span>${escapeHtml(questionBankRoleById(questionRoleId(question)).shortLabel)}</span>
              <span class="bank-difficulty-badge ${questionBankDifficultyClass(question.difficulty)}">${escapeHtml(question.difficulty)}</span>
              <span>${escapeHtml(question.category)}</span>
              <span class="my-bookmark-status ${status}">${escapeHtml(myPageStatusLabel(studyState.status))}</span>
            </div>
            <strong>${escapeHtml(question.text)}</strong>
          </div>
          <div class="my-bookmark-actions">
            <button class="my-bookmark-icon-button quick" type="button" data-my-page-practice="${escapeHtml(key)}" aria-label="빠른 연습" title="빠른 연습">
              <i data-lucide="mic"></i>
            </button>
            <button class="my-bookmark-icon-button mock" type="button" data-my-page-mock="${escapeHtml(key)}" aria-label="모의면접 연습" title="모의면접 연습">
              <i data-lucide="video"></i>
            </button>
            <button class="my-bookmark-icon-button bookmark" type="button" data-my-page-unbookmark="${escapeHtml(key)}" aria-label="북마크 해제" title="북마크 해제">
              <i data-lucide="bookmark-x"></i>
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  renderMyPageSelectionBar(visibleQuestions);
  renderIcons();
};

const setMyPageSelection = (keys) => {
  state.myPage.selectedKeys = [...new Set(keys)].filter((key) => {
    const question = questionByProgressKey(key);
    return question && getQuestionStudyState(question).bookmarked;
  });
  renderMyPage();
};

const removeMyPageBookmarks = (keys) => {
  const questionsToRemove = [...new Set(keys)]
    .map((key) => questionByProgressKey(key))
    .filter(Boolean);

  questionsToRemove.forEach((question) => {
    setQuestionStudyState(question, { bookmarked: false });
    trackEvent("bookmark_click", analyticsQuestionPayload(question, {
      source: "my_page",
      bookmarked: 0,
      action: "remove",
    }));
  });

  const removedKeys = new Set(questionsToRemove.map((question) => progressKey(question)));
  state.myPage.selectedKeys = state.myPage.selectedKeys.filter((key) => !removedKeys.has(key));
  renderMyPage();
  renderStudyProgressSurfaces();
};

const startMyPageQuickPractice = (questionKeys = state.myPage.selectedKeys) => {
  const questionsToPractice = [...new Set(questionKeys)]
    .map((key) => questionByProgressKey(key))
    .filter(Boolean);
  if (!questionsToPractice.length) return;
  trackEvent("my_page_quick_practice_start", { question_count: questionsToPractice.length });
  openQuickPractice(questionsToPractice[0], {
    queueQuestions: questionsToPractice,
    returnView: "my-page",
  });
};

const showMyPracticeModal = () => {
  if (!myPageSelectedQuestions().length) return;
  elements.myPracticeModal.classList.add("open");
  elements.myPracticeModal.setAttribute("aria-hidden", "false");
  renderIcons();
};

const hideMyPracticeModal = () => {
  elements.myPracticeModal.classList.remove("open");
  elements.myPracticeModal.setAttribute("aria-hidden", "true");
};

const showMyBookmarkRemoveModal = (keys) => {
  const keysToRemove = [...new Set(keys)].filter((key) => questionByProgressKey(key));
  if (!keysToRemove.length) return;
  state.myPage.pendingRemoveKeys = keysToRemove;
  elements.myBookmarkConfirmModal.classList.add("open");
  elements.myBookmarkConfirmModal.setAttribute("aria-hidden", "false");
};

const hideMyBookmarkRemoveModal = () => {
  state.myPage.pendingRemoveKeys = [];
  elements.myBookmarkConfirmModal.classList.remove("open");
  elements.myBookmarkConfirmModal.setAttribute("aria-hidden", "true");
};

const confirmMyBookmarkRemove = () => {
  const keysToRemove = [...state.myPage.pendingRemoveKeys];
  hideMyBookmarkRemoveModal();
  removeMyPageBookmarks(keysToRemove);
};

const startSelectedQuestionInterview = (questionsToInterview) => {
  if (!questionsToInterview.length) return;
  state.interviewMode = "standard";
  state.aiEvaluationConsent = false;
  state.config.role = questionRoleId(questionsToInterview[0]);
  state.config.rigor = "선택 문항";
  state.config.questionCount = questionsToInterview.length;
  state.config.prepSeconds = Math.max(0, Number(elements.myPracticePrepTime.value) || 0);
  state.config.answerSeconds = Math.max(60, Number(elements.myPracticeAnswerTime.value) || 120);
  setRecordingMode(state.recordingEnabled);
  trackEvent("my_page_mock_practice_start", {
    question_count: questionsToInterview.length,
    prep_seconds: state.config.prepSeconds,
    answer_seconds: state.config.answerSeconds,
  });
  resetForInterview(questionsToInterview.map((question) => ({ ...question })));
  setView("check");
};

const confirmMyPractice = () => {
  const questionsToInterview = myPageSelectedQuestions();
  if (!questionsToInterview.length) return;
  state.pendingSessionQuestionKeys = progressKeysForQuestions(questionsToInterview);
  hideMyPracticeModal();
  showStartEnvironmentModal({ questionKeys: state.pendingSessionQuestionKeys });
};

const quickPracticeQuestion = () =>
  questionByProgressKey(state.quickPractice.questionKey) || questionBankQuestionById(state.quickPractice.questionId);

const quickPracticeSequence = () => {
  const queueQuestions = state.quickPractice.queueKeys.map((key) => questionByProgressKey(key)).filter(Boolean);
  if (queueQuestions.length) {
    return queueQuestions;
  }

  const filtered = filteredQuestionBankQuestions();
  if (filtered.some((question) => progressKey(question) === state.quickPractice.questionKey)) {
    return filtered;
  }
  return questionBankQuestionsForRole();
};

const quickPracticeQuestionPosition = (question) => {
  const sequence = quickPracticeSequence();
  const index = sequence.findIndex((item) => progressKey(item) === progressKey(question));
  return {
    current: index >= 0 ? index + 1 : 1,
    total: sequence.length || 1,
  };
};

const quickPracticeEstimate = (question) => {
  const minutes = Number(question.estimatedAnswerMinutes);
  if (!minutes) return "1-2분";
  if (minutes <= 1) return "1분 내외";
  return `${minutes}분 내외`;
};

const quickPracticeGuide = (question) => {
  const keywords = (question.keywords || []).slice(0, 4);
  if (keywords.length >= 3) {
    return `${keywords.join(" → ")} 순서로 답변해보세요.`;
  }
  if (keywords.length) {
    return `${keywords.join(", ")}를 먼저 짚고 공정상 의미를 연결해보세요.`;
  }
  return "핵심 개념을 먼저 정의하고, 원리와 공정상 의미를 차례로 답변해보세요.";
};

const quickPracticeRelatedQuestions = (question) =>
  questionBankQuestionsForRole()
    .filter((item) => item.id !== question.id && item.category === question.category)
    .slice(0, 4);

const quickPracticeKeywordHtml = (question) =>
  (question.keywords || []).slice(0, 5).map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("");

const setQuickPracticeStatus = (status) => {
  state.quickPractice.status = status;
  if (!elements.quickPracticeStatusChip) return;
  elements.quickPracticeStatusChip.className = `quick-practice-status ${status}`;
  elements.quickPracticeStatusChip.textContent =
    {
      idle: "연습 전",
      recording: "녹음 중",
      done: "녹음 완료",
      error: "확인 필요",
    }[status] || "연습 전";
};

const stopQuickPracticeTimer = () => {
  if (state.quickPractice.timerId) {
    clearInterval(state.quickPractice.timerId);
    state.quickPractice.timerId = null;
  }
};

const stopQuickPracticeStream = () => {
  state.quickPractice.stream?.getTracks().forEach((track) => track.stop());
  state.quickPractice.stream = null;
};

const cleanupQuickPracticeRecording = () => {
  stopQuickPracticeTimer();
  if (state.quickPractice.recorder?.state === "recording") {
    state.quickPractice.recorder.stop();
  }
  stopQuickPracticeStream();
  state.quickPractice.recorder = null;
  state.quickPractice.chunks = [];
};

const updateQuickPracticeRecorderUi = () => {
  const timeElement = $("#quickPracticeRecordTime");
  const button = $("#quickPracticeRecordButton");
  const prompt = $("#quickPracticeRecordPrompt");
  const recording = state.quickPractice.status === "recording";
  if (prompt) {
    prompt.textContent = recording ? "답변을 녹음하고 있습니다" : "녹음 버튼을 눌러 답변 연습";
  }
  if (timeElement) {
    timeElement.textContent = formatTime(state.quickPractice.elapsed);
  }
  if (button) {
    button.classList.toggle("recording", recording);
    button.setAttribute("aria-pressed", String(recording));
    button.setAttribute("aria-label", recording ? "녹음 중지" : "녹음 시작");
    button.innerHTML = recording ? '<i data-lucide="square"></i>' : '<i data-lucide="mic"></i>';
    renderIcons();
  }
};

const startQuickPracticeRecording = async () => {
  const question = quickPracticeQuestion();
  if (!question) return;
  cleanupQuickPracticeRecording();
  if (state.quickPractice.audioUrl) {
    URL.revokeObjectURL(state.quickPractice.audioUrl);
  }
  state.quickPractice.audioUrl = "";
  state.quickPractice.elapsed = 0;
  state.quickPractice.chunks = [];
  renderQuickPracticeAudioDock();

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.quickPractice.stream = stream;
    const recorder = createMediaRecorder(stream, ["audio/webm;codecs=opus", "audio/webm"]);
    state.quickPractice.recorder = recorder;
    recorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        state.quickPractice.chunks.push(event.data);
      }
    });
    recorder.addEventListener("stop", () => {
      stopQuickPracticeTimer();
      stopQuickPracticeStream();
      if (state.quickPractice.audioUrl) {
        URL.revokeObjectURL(state.quickPractice.audioUrl);
      }
      const blob = new Blob(state.quickPractice.chunks, { type: state.quickPractice.chunks[0]?.type || "audio/webm" });
      state.quickPractice.audioUrl = URL.createObjectURL(blob);
      state.quickPractice.recorder = null;
      state.quickPractice.chunks = [];
      setQuickPracticeStatus("done");
      renderQuickPracticeAudioDock();
      renderQuickPracticePanel();
    });
    recorder.start();
    setQuickPracticeStatus("recording");
    updateQuickPracticeRecorderUi();
    state.quickPractice.timerId = setInterval(() => {
      state.quickPractice.elapsed += 1;
      updateQuickPracticeRecorderUi();
    }, 1000);
  } catch (error) {
    cleanupQuickPracticeRecording();
    setQuickPracticeStatus("error");
    renderQuickPracticeAudioDock("마이크 권한을 허용하면 바로 녹음 연습을 시작할 수 있습니다.");
    renderQuickPracticePanel("마이크 권한을 허용하면 바로 녹음 연습을 시작할 수 있습니다.");
  }
};

const stopQuickPracticeRecording = () => {
  if (state.quickPractice.recorder?.state === "recording") {
    state.quickPractice.recorder.stop();
  }
};

const renderQuickPracticePracticePanel = (question, notice = "") => {
  const keywordHtml = quickPracticeKeywordHtml(question);

  return `
    <div class="quick-guide-card">
      <strong><i data-lucide="zap"></i> 답변 가이드</strong>
      <p>${escapeHtml(quickPracticeGuide(question))}</p>
    </div>
    <div class="quick-keyword-block">
      <span>답변에 포함하면 좋은 키워드</span>
      <div>${keywordHtml || "<em>키워드 준비중</em>"}</div>
    </div>
  `;
};

const renderQuickPracticeAudioDock = (notice = "") => {
  if (!elements.quickPracticeAudioDock) return;
  const question = quickPracticeQuestion();
  if (!question) return;
  const hasAudio = Boolean(state.quickPractice.audioUrl && state.quickPractice.status === "done");
  const status = state.quickPractice.status || "idle";
  const audioUrl = hasAudio ? state.quickPractice.audioUrl : "";
  const existingAudio = elements.quickPracticeAudioDock.querySelector("audio[data-quick-audio='current']");

  if (
    hasAudio &&
    existingAudio?.dataset.audioUrl === audioUrl &&
    elements.quickPracticeAudioDock.dataset.status === status &&
    elements.quickPracticeAudioDock.dataset.notice === notice
  ) {
    return;
  }

  elements.quickPracticeAudioDock.dataset.status = status;
  elements.quickPracticeAudioDock.dataset.notice = notice;
  elements.quickPracticeAudioDock.innerHTML = `
    <div class="quick-record-card ${hasAudio ? "has-audio" : ""}">
      <p id="quickPracticeRecordPrompt">${status === "recording" ? "답변을 녹음하고 있습니다" : hasAudio ? "내 답변을 들으며 답안을 비교해보세요" : "녹음 버튼을 눌러 답변 연습"}</p>
      <button class="quick-record-button ${status === "recording" ? "recording" : ""}" id="quickPracticeRecordButton" type="button" aria-pressed="${status === "recording"}" aria-label="${status === "recording" ? "녹음 중지" : "녹음 시작"}">
        <i data-lucide="${status === "recording" ? "square" : "mic"}"></i>
      </button>
      <strong id="quickPracticeRecordTime">${status === "recording" ? formatTime(state.quickPractice.elapsed) : `예상 시간 ${quickPracticeEstimate(question)}`}</strong>
      ${notice ? `<span class="quick-record-notice">${escapeHtml(notice)}</span>` : ""}
      ${
        hasAudio
          ? `<div class="quick-audio-review"><audio data-quick-audio="current" data-audio-url="${escapeHtml(audioUrl)}" src="${escapeHtml(audioUrl)}" controls></audio></div>`
          : ""
      }
    </div>
  `;
  renderIcons();
};

const renderQuickPracticeAnswerPanel = (question) => `
  <div class="quick-answer-card">
    <h2>모범 답안</h2>
    <div class="model-answer-text">${renderModelAnswerBlock(question)}</div>
  </div>
`;

const renderQuickPracticeRelatedPanel = (question) => {
  const related = quickPracticeRelatedQuestions(question);
  if (!related.length) {
    return `
      <div class="quick-answer-card">
        <h2>관련 질문</h2>
        <p>같은 카테고리의 관련 질문이 아직 없습니다.</p>
      </div>
    `;
  }

  return `
    <div class="quick-related-list">
      ${related
        .map(
          (item) => `
            <button class="quick-related-item" type="button" data-quick-related-id="${item.id}">
              <span>${escapeHtml(item.difficulty)} · ${escapeHtml(item.category)}</span>
              <strong>${escapeHtml(item.text)}</strong>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
};

const renderQuickPracticePanel = (notice = "") => {
  const question = quickPracticeQuestion();
  if (!question) return;

  if (state.quickPractice.tab === "answer") {
    elements.quickPracticePanel.innerHTML = renderQuickPracticeAnswerPanel(question);
  } else if (state.quickPractice.tab === "related") {
    elements.quickPracticePanel.innerHTML = renderQuickPracticeRelatedPanel(question);
  } else {
    elements.quickPracticePanel.innerHTML = renderQuickPracticePracticePanel(question, notice);
  }
  renderIcons();
};

const renderQuickPractice = () => {
  const question = quickPracticeQuestion();
  if (!question) return;
  const position = quickPracticeQuestionPosition(question);
  const studyState = getQuestionStudyState(question);
  const keywordHtml = quickPracticeKeywordHtml(question);

  elements.quickPracticeCounter.textContent = `${position.current} / ${position.total}`;
  elements.quickPracticeDifficulty.className = `bank-difficulty-badge ${questionBankDifficultyClass(question.difficulty)}`;
  elements.quickPracticeDifficulty.textContent = question.difficulty;
  elements.quickPracticeCategory.textContent = question.category;
  elements.quickPracticeTitle.textContent = question.text;
  elements.quickPracticeTopKeywords.innerHTML = keywordHtml || "<span>#키워드 준비중</span>";
  elements.quickPracticeBookmarkButton.classList.toggle("active", studyState.bookmarked);
  elements.quickPracticeBookmarkButton.setAttribute("aria-pressed", String(studyState.bookmarked));
  setQuickPracticeStatus(state.quickPractice.status || "idle");

  $$(".quick-practice-tabs [data-quick-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.quickTab === state.quickPractice.tab);
  });

  renderQuickPracticeAudioDock();
  renderQuickPracticePanel();
};

const openQuickPractice = (question, options = {}) => {
  cleanupQuickPracticeRecording();
  if (state.quickPractice.audioUrl) {
    URL.revokeObjectURL(state.quickPractice.audioUrl);
  }
  const queueQuestions = Array.isArray(options.queueQuestions) ? options.queueQuestions.filter(Boolean) : null;
  if (question.roleId && state.questionBank.role !== question.roleId) {
    resetQuestionBankFiltersForRole(question.roleId);
  }
  state.quickPractice.questionId = question.id;
  state.quickPractice.questionKey = progressKey(question);
  if (queueQuestions) {
    state.quickPractice.queueKeys = progressKeysForQuestions(queueQuestions);
  } else if (options.clearQueue !== false) {
    state.quickPractice.queueKeys = [];
  }
  state.quickPractice.returnView = options.returnView || state.quickPractice.returnView || "question-bank";
  state.quickPractice.tab = "practice";
  state.quickPractice.audioUrl = "";
  state.quickPractice.elapsed = 0;
  state.quickPractice.status = "idle";
  setView("quick-practice", options);
};

const openPracticeQuestionFromUrl = (options = {}) => {
  const questionId = readPracticeQuestionId();
  if (!questionId) return false;

  const roleId = questionBankRoleById(readPracticeRoleId()).id;
  const question = questionBankQuestionById(questionId, roleId);
  if (!question) return false;

  openQuickPractice(question, { ...options, clearQueue: true, returnView: "question-bank" });
  return true;
};

const applyQuestionBankRouteState = () => {
  const roleId = questionBankRoleById(readQuestionBankRoleId()).id;
  if (roleId !== state.questionBank.role) {
    resetQuestionBankFiltersForRole(roleId);
  }
};

const openRouteFromLocation = () => {
  if (shouldOpenSttTest()) {
    setView("stt-test", { updateRoute: false });
    return "stt-test";
  }

  const routeView = viewFromRoute();
  if (routeView === "quick-practice" || readPracticeQuestionId()) {
    if (openPracticeQuestionFromUrl({ updateRoute: false })) {
      return "quick-practice";
    }
    applyQuestionBankRouteState();
    setView("question-bank", { updateRoute: false });
    return "question-bank";
  }

  if (routeView === "question-bank") {
    applyQuestionBankRouteState();
  }

  setView(routeView, { updateRoute: false });
  return routeView;
};

const openNextQuickPracticeQuestion = () => {
  const question = quickPracticeQuestion();
  if (!question) return;
  const sequence = quickPracticeSequence();
  const currentIndex = sequence.findIndex((item) => progressKey(item) === progressKey(question));
  const nextQuestion = sequence[(currentIndex + 1 + sequence.length) % sequence.length] || sequence[0];
  if (nextQuestion) {
    openQuickPractice(nextQuestion, {
      clearQueue: false,
      returnView: state.quickPractice.returnView || "question-bank",
    });
  }
};

const toggleQuickPracticeBookmark = () => {
  const question = quickPracticeQuestion();
  if (!question) return;
  if (!requireLoginForStudySave("quick_practice", "bookmark")) return;
  const studyState = getQuestionStudyState(question);
  const nextBookmarked = !studyState.bookmarked;
  setQuestionStudyState(question, { bookmarked: nextBookmarked });
  trackEvent(
    "bookmark_click",
    analyticsQuestionPayload(question, {
      source: "quick_practice",
      bookmarked: nextBookmarked ? 1 : 0,
      action: nextBookmarked ? "add" : "remove",
    }),
  );
  renderQuickPractice();
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
    const recording = recordingForQuestion(question.originalIndex, question);
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
        message: "전사문과 답변 예시를 비교 분석하는 중입니다.",
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
      const recording = recordingForQuestion(question.originalIndex, question);
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
            <button class="small-button retry-question" type="button" data-question-index="${question.originalIndex}" data-question-role="${escapeHtml(question.roleId || "process")}">
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
              <h3>모범 답안</h3>
              ${keywordBlock}
              <div class="model-answer-text">${renderModelAnswerBlock(question)}</div>
            </section>
            ${aiEvaluationBlock}
          </div>
        </article>
      `;
    })
    .join("");

  renderIcons();
};

const renderActiveAnswerScriptView = () => {
  if (elements.questionBankView.classList.contains("active")) {
    renderQuestionBankList();
  }
  if (elements.quickPracticeView.classList.contains("active")) {
    renderQuickPracticePanel();
  }
  if (elements.resultView.classList.contains("active")) {
    renderResultPage();
  }
};

const bindAnswerScriptControls = () => {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-answer-script-mode]");
    if (!button) return;
    const scriptMode = button.dataset.answerScriptMode === "full" ? "full" : "short";
    const { question, source } = activeAnswerQuestionForAnalytics();
    trackEvent(
      scriptMode === "full" ? "script_2min_click" : "script_40_click",
      analyticsQuestionPayload(question, { source, script_mode: scriptMode }),
    );
    state.answerScriptMode = scriptMode;
    renderActiveAnswerScriptView();
  });
};

const bindQuestionBankControls = () => {
  elements.questionBankSidebarCollapseButton.addEventListener("click", () => {
    state.questionBank.sidebarCollapsed = !state.questionBank.sidebarCollapsed;
    renderQuestionBank();
  });

  elements.questionBankFilterButton.addEventListener("click", () => {
    state.questionBank.filterDrawerOpen = true;
    renderQuestionBank();
  });

  elements.questionBankFilterCloseButton.addEventListener("click", closeQuestionBankFilterDrawer);
  elements.questionBankFilterBackdrop.addEventListener("click", closeQuestionBankFilterDrawer);

  elements.questionBankSidebar.addEventListener("click", (event) => {
    const miniButton = event.target.closest("[data-sidebar-mini]");
    if (miniButton) {
      const target = miniButton.dataset.sidebarMini;
      state.questionBank.sidebarCollapsed = false;
      renderQuestionBank();
      requestAnimationFrame(() => {
        if (target === "role") {
          elements.questionBankRole.focus();
          elements.questionBankRole.scrollIntoView({ block: "center" });
          return;
        }

        const section =
          target === "difficulty"
            ? elements.questionBankDifficultyList.closest(".bank-filter-block")
            : elements.questionBankCategoryList.closest(".bank-filter-block");
        section?.scrollIntoView({ block: "center" });
      });
      return;
    }

    const toggle = event.target.closest("[data-filter-toggle]");
    if (!toggle) return;

    const block = toggle.closest(".bank-filter-collapsible");
    const isCollapsed = block.classList.toggle("collapsed");
    toggle.setAttribute("aria-expanded", String(!isCollapsed));
  });

  elements.questionBankRole.addEventListener("change", () => {
    setQuestionBankRole(elements.questionBankRole.value);
  });

  elements.questionBankSearch.addEventListener("input", () => {
    state.questionBank.search = elements.questionBankSearch.value;
    state.questionBank.page = 1;
    state.questionBank.expandedId = null;
    renderQuestionBank();
  });

  elements.questionBankSort.addEventListener("change", () => {
    state.questionBank.sort = elements.questionBankSort.value;
    state.questionBank.page = 1;
    state.questionBank.expandedId = null;
    renderQuestionBankList();
  });

  elements.questionBankPageSize.addEventListener("change", () => {
    const value = elements.questionBankPageSize.value;
    state.questionBank.pageSize = value === "all" ? "all" : Number(value) || 10;
    state.questionBank.page = 1;
    state.questionBank.expandedId = null;
    renderQuestionBankList();
  });

  elements.questionBankLayoutToggle.addEventListener("click", (event) => {
    const button = event.target.closest("[data-bank-layout]");
    if (!button) return;
    state.questionBank.layout = button.dataset.bankLayout === "list" ? "list" : "card";
    state.questionBank.expandedId = null;
    renderQuestionBankList();
  });

  elements.questionBankDifficultyList.addEventListener("change", (event) => {
    const input = event.target.closest("[data-bank-difficulty]");
    if (!input) return;
    toggleQuestionBankFilter("difficulties", input.dataset.bankDifficulty || "all");
  });

  elements.questionBankCategoryList.addEventListener("change", (event) => {
    const input = event.target.closest("[data-bank-category]");
    if (!input) return;
    toggleQuestionBankFilter("categories", input.dataset.bankCategory || "all");
  });

  elements.questionBankList.addEventListener("click", (event) => {
    if (event.target.closest("[data-answer-script-mode]")) {
      return;
    }

    const reportButton = event.target.closest("[data-bank-report]");
    if (reportButton) {
      const question = questionBankQuestionById(reportButton.dataset.bankReport);
      if (question) {
        showReportModal(questionBankReportTarget(question));
      }
      return;
    }

    const practiceButton = event.target.closest("[data-bank-practice]");
    if (practiceButton) {
      startSingleQuestionPractice(
        Number(practiceButton.dataset.bankPractice),
        "question_bank",
        practiceButton.dataset.bankPracticeRole || state.questionBank.role,
      );
      return;
    }

    const bookmarkButton = event.target.closest("[data-bank-bookmark]");
    if (bookmarkButton) {
      toggleQuestionBankBookmark(bookmarkButton.dataset.bankBookmark);
      return;
    }

    const statusButton = event.target.closest("[data-bank-status]");
    if (statusButton) {
      toggleQuestionBankStatus(statusButton.dataset.bankStatusId, statusButton.dataset.bankStatus);
      return;
    }

    const card = event.target.closest("[data-bank-card]");
    if (card) {
      const questionId = card.dataset.bankCard;
      const isOpening = String(state.questionBank.expandedId) !== String(questionId);
      state.questionBank.expandedId = isOpening ? questionId : null;
      if (isOpening) {
        const question = questionBankQuestionById(questionId);
        trackEvent("answer_open", analyticsQuestionPayload(question, { source: "question_bank" }));
      }
      renderQuestionBankList();
    }
  });

  elements.questionBankPagination.addEventListener("click", (event) => {
    const button = event.target.closest("[data-bank-page]");
    if (!button || button.disabled) return;

    const targetPage = button.dataset.bankPage;
    const pageCount = questionBankPageCount(filteredQuestionBankQuestions().length);

    if (targetPage === "prev") {
      state.questionBank.page = Math.max(1, state.questionBank.page - 1);
    } else if (targetPage === "next") {
      state.questionBank.page = Math.min(pageCount, state.questionBank.page + 1);
    } else {
      state.questionBank.page = Math.min(pageCount, Math.max(1, Number(targetPage) || 1));
    }

    state.questionBank.expandedId = null;
    renderQuestionBankList();
  });
};

const bindQuickPracticeControls = () => {
  elements.quickPracticeBackButton.addEventListener("click", () => setView(state.quickPractice.returnView || "question-bank"));
  elements.quickPracticeBookmarkButton.addEventListener("click", toggleQuickPracticeBookmark);
  elements.quickPracticeAnswerButton.addEventListener("click", () => {
    if (state.quickPractice.tab !== "answer") {
      trackEvent("answer_open", analyticsQuestionPayload(quickPracticeQuestion(), { source: "quick_practice" }));
    }
    state.quickPractice.tab = "answer";
    renderQuickPractice();
  });
  elements.quickPracticeNextButton.addEventListener("click", openNextQuickPracticeQuestion);

  $$(".quick-practice-tabs [data-quick-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTab = button.dataset.quickTab || "practice";
      if (nextTab === "answer" && state.quickPractice.tab !== "answer") {
        trackEvent("answer_open", analyticsQuestionPayload(quickPracticeQuestion(), { source: "quick_practice" }));
      }
      state.quickPractice.tab = nextTab;
      renderQuickPractice();
    });
  });

  elements.quickPracticeAudioDock.addEventListener("click", (event) => {
    const recordButton = event.target.closest("#quickPracticeRecordButton");
    if (recordButton) {
      if (state.quickPractice.status === "recording") {
        stopQuickPracticeRecording();
      } else {
        startQuickPracticeRecording();
      }
    }
  });

  elements.quickPracticePanel.addEventListener("click", (event) => {
    const relatedButton = event.target.closest("[data-quick-related-id]");
    if (relatedButton) {
      const question = questionBankQuestionById(relatedButton.dataset.quickRelatedId);
      if (question) {
        openQuickPractice(question);
      }
    }
  });
};

const bindMyPageControls = () => {
  elements.myPageFilterButton.addEventListener("click", () => {
    state.myPage.filterDrawerOpen = true;
    syncMyPageFilterDrawer();
  });

  elements.myPageFilterCloseButton.addEventListener("click", closeMyPageFilterDrawer);
  elements.myPageFilterBackdrop.addEventListener("click", closeMyPageFilterDrawer);

  elements.myPageRoleFilter.addEventListener("change", () => {
    state.myPage.role = elements.myPageRoleFilter.value;
    state.myPage.category = "all";
    renderMyPage();
  });

  elements.myPageDifficultyFilter.addEventListener("change", (event) => {
    const input = event.target.closest("[data-my-page-filter='difficulty']");
    if (!input) return;
    state.myPage.difficulty = input.value === state.myPage.difficulty ? "all" : input.value;
    state.myPage.category = "all";
    renderMyPage();
  });

  elements.myPageCategoryFilter.addEventListener("change", (event) => {
    const input = event.target.closest("[data-my-page-filter='category']");
    if (!input) return;
    state.myPage.category = input.value === state.myPage.category ? "all" : input.value;
    renderMyPage();
  });

  elements.myPageSearch.addEventListener("input", () => {
    state.myPage.search = elements.myPageSearch.value;
    renderMyPage();
  });

  elements.myPageSort.addEventListener("change", () => {
    state.myPage.sort = elements.myPageSort.value;
    renderMyPage();
  });

  elements.myPageSelectAll.addEventListener("change", () => {
    const visibleKeys = myPageFilteredBookmarks().map((question) => progressKey(question));
    if (elements.myPageSelectAll.checked) {
      setMyPageSelection([...state.myPage.selectedKeys, ...visibleKeys]);
    } else {
      const visibleSet = new Set(visibleKeys);
      setMyPageSelection(state.myPage.selectedKeys.filter((key) => !visibleSet.has(key)));
    }
  });

  elements.myPageClearSelection.addEventListener("click", () => setMyPageSelection([]));
  elements.myPageQuickPracticeButton.addEventListener("click", () => startMyPageQuickPractice());
  elements.myPageMockPracticeButton.addEventListener("click", showMyPracticeModal);
  elements.myPageRemoveSelectedButton.addEventListener("click", () => showMyBookmarkRemoveModal(state.myPage.selectedKeys));

  elements.myPageList.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-my-page-select]");
    if (!checkbox) return;
    const key = checkbox.dataset.myPageSelect;
    setMyPageSelection(
      checkbox.checked
        ? [...state.myPage.selectedKeys, key]
        : state.myPage.selectedKeys.filter((item) => item !== key),
    );
  });

  elements.myPageList.addEventListener("click", (event) => {
    const practiceButton = event.target.closest("[data-my-page-practice]");
    if (practiceButton) {
      startMyPageQuickPractice([practiceButton.dataset.myPagePractice]);
      return;
    }

    const mockButton = event.target.closest("[data-my-page-mock]");
    if (mockButton) {
      setMyPageSelection([mockButton.dataset.myPageMock]);
      showMyPracticeModal();
      return;
    }

    const unbookmarkButton = event.target.closest("[data-my-page-unbookmark]");
    if (unbookmarkButton) {
      showMyBookmarkRemoveModal([unbookmarkButton.dataset.myPageUnbookmark]);
    }
  });

  elements.cancelMyPracticeButton.addEventListener("click", hideMyPracticeModal);
  elements.confirmMyPracticeButton.addEventListener("click", confirmMyPractice);
  elements.myPracticeModal.addEventListener("click", (event) => {
    if (event.target === elements.myPracticeModal) {
      hideMyPracticeModal();
    }
  });
  elements.cancelMyBookmarkRemoveButton.addEventListener("click", hideMyBookmarkRemoveModal);
  elements.confirmMyBookmarkRemoveButton.addEventListener("click", confirmMyBookmarkRemove);
  elements.myBookmarkConfirmModal.addEventListener("click", (event) => {
    if (event.target === elements.myBookmarkConfirmModal) {
      hideMyBookmarkRemoveModal();
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

  elements.targetRole.addEventListener("change", syncStartAvailability);
  elements.startInterview.addEventListener("click", showStartEnvironmentModal);
  syncInterviewModeUi();
};

const bindLandingControls = () => {
  $$(".landing-role-card").forEach((card) => {
    card.setAttribute("aria-pressed", String(card.classList.contains("active")));
    card.addEventListener("click", () => setLandingRole(card));
  });

  elements.landingStartButton.addEventListener("click", () => {
    const selectedRole = questionBankRoleById(state.landing.selectedRole);
    if (!selectedRole.enabled || selectedRole.id !== state.landing.selectedRole) return;
    trackEvent("landing_start_practice", {
      role: state.landing.selectedRole,
    });
    setQuestionBankRole(state.landing.selectedRole);
    setView("question-bank");
  });

  elements.landingMockButton.addEventListener("click", () => {
    const selectedRole = questionBankRoleById(state.landing.selectedRole);
    if (!selectedRole.enabled || selectedRole.id !== state.landing.selectedRole) return;
    trackEvent("landing_mock_interview_click", {
      role: state.landing.selectedRole,
    });
    elements.targetRole.value = state.landing.selectedRole;
    syncStartAvailability();
    setView("home");
  });

  elements.landingWaitlistForm.addEventListener("submit", submitLandingWaitlist);
  elements.closeLandingWaitlistButton.addEventListener("click", hideLandingWaitlistModal);
  elements.landingWaitlistModal.addEventListener("click", (event) => {
    if (event.target === elements.landingWaitlistModal) {
      hideLandingWaitlistModal();
    }
  });
};

const bindInterviewControls = () => {
  $$("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const menuItem = button.closest(".main-nav-item.has-submenu");
      if (button.dataset.view === "question-bank" && button.dataset.questionBankRole) {
        resetQuestionBankFiltersForRole(button.dataset.questionBankRole);
      }
      requestViewChange(button.dataset.view || "home");
      menuItem?.classList.add("submenu-dismissed");
      button.blur();
    });
  });

  $$(".main-nav-item.has-submenu").forEach((item) => {
    item.addEventListener("mouseleave", () => item.classList.remove("submenu-dismissed"));
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
  elements.authButton.addEventListener("click", () => {
    if (state.auth.user) {
      toggleAccountMenu();
    } else {
      showAuthModal();
    }
  });
  elements.bookmarkNavButton.addEventListener("click", () => {
    if (state.auth.user) {
      hideAccountMenu();
      requestViewChange("my-page");
    } else {
      showAuthModal();
    }
  });
  elements.personalityQuestionsMenuButton.addEventListener("click", () => {
    trackEvent("personality_questions_menu_click");
    openPersonalityQuestionBank();
    elements.personalityQuestionsMenuButton.closest(".main-nav-item.has-submenu")?.classList.add("submenu-dismissed");
    elements.personalityQuestionsMenuButton.blur();
  });
  elements.mobilePersonalityQuestionsMenuButton.addEventListener("click", () => {
    trackEvent("personality_questions_menu_click", { source: "mobile_menu" });
    closeMobileMenu();
    openPersonalityQuestionBank();
  });
  elements.accountMenuLogoutButton.addEventListener("click", signOut);
  elements.mobileMenuButton.addEventListener("click", openMobileMenu);
  elements.mobileMenuCloseButton.addEventListener("click", closeMobileMenu);
  elements.mobileMenuBackdrop.addEventListener("click", closeMobileMenu);
  elements.mobileMenuDrawer.addEventListener("click", (event) => {
    if (event.target.closest("[data-view]")) {
      closeMobileMenu();
    }
  });
  elements.mobileMenuBookmarkButton.addEventListener("click", () => {
    closeMobileMenu();
    if (state.auth.user) {
      requestViewChange("my-page");
    } else {
      showAuthModal();
    }
  });
  elements.mobileMenuHelpButton.addEventListener("click", () => {
    closeMobileMenu();
    showHelpModal();
  });
  elements.mobileMenuAuthButton.addEventListener("click", () => {
    closeMobileMenu();
    if (state.auth.user) {
      requestViewChange("my-page");
    } else {
      showAuthModal();
    }
  });
  elements.mobileMenuLogoutButton.addEventListener("click", () => {
    closeMobileMenu();
    signOut();
  });
  document.addEventListener("click", (event) => {
    if (!elements.accountMenu?.classList.contains("open")) return;
    if (elements.accountMenu.contains(event.target) || elements.authButton.contains(event.target)) return;
    hideAccountMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideAccountMenu();
      closeMobileMenu();
    }
  });
  elements.closeAuthButton.addEventListener("click", hideAuthModal);
  elements.magicLinkForm.addEventListener("submit", sendMagicLink);
  elements.googleLoginButton.addEventListener("click", signInWithGoogle);
  elements.signOutButton.addEventListener("click", signOut);
  elements.authModal.addEventListener("click", (event) => {
    if (event.target === elements.authModal) {
      hideAuthModal();
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

  window.addEventListener("popstate", () => {
    if (isInterviewOpen()) {
      const routeView = viewFromRoute();
      state.pendingView = routeView === "quick-practice" ? "question-bank" : routeView;
      showExitModal();
      return;
    }
    openRouteFromLocation();
  });
};

const bindResultControls = () => {
  elements.resultHomeButton.addEventListener("click", () => setView("home"));
  elements.restartInterviewButton.addEventListener("click", showStartEnvironmentModal);
  elements.resultList.addEventListener("click", (event) => {
    const button = event.target.closest(".retry-question");
    if (!button) return;
    startSingleQuestionPractice(Number(button.dataset.questionIndex), "result", button.dataset.questionRole || "process");
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
  state.studyProgress = readStudyProgress();

  renderIcons();
  bindAnswerScriptControls();

  bindLandingControls();
  bindQuestionBankControls();
  bindQuickPracticeControls();
  bindMyPageControls();
  bindSetupControls();
  bindInterviewControls();
  bindResultControls();
  bindSttTestControls();
  setRecordingMode(true);
  const openedView = openRouteFromLocation();
  flushQueuedFeedback().catch(() => {});
  flushQueuedReports().catch(() => {});
  flushQueuedWaitlist().catch(() => {});
  initAuth().catch(() => {
    setAuthStatus("로그인 초기화에 실패했습니다.", "warning");
  });
  if (openedView === "landing" && !shouldOpenSttTest() && !readPracticeQuestionId()) {
    showStartupHelp();
  }
});
