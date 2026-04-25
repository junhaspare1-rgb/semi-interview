const questions = [
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
    text: "양산 라인에서 특정 Lot의 수율이 급락했을 때 공정기술 엔지니어가 확인해야 할 항목은 무엇인가요?",
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

const state = {
  config: {
    questionCount: 5,
    prepSeconds: 60,
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
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const elements = {};

const cacheElements = () => {
  [
    "homeView",
    "interviewView",
    "resultView",
    "exitModal",
    "questionCount",
    "prepTime",
    "answerTime",
    "answerValue",
    "startInterview",
    "questionProgress",
    "rigorLabel",
    "questionText",
    "phaseLabel",
    "timerMode",
    "timerText",
    "cameraPreview",
    "cameraPlaceholder",
    "cameraButton",
    "skipPrepButton",
    "recordButton",
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
  ].forEach((id) => {
    elements[id] = $(`#${id}`);
  });
  elements.webcamPanel = $(".webcam-panel");
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

const buildQuestionSet = (count) =>
  questions.slice(0, count).map((question, index) => ({
    ...question,
    originalIndex: index,
  }));

const activeQuestions = () => state.sessionQuestions;
const currentQuestion = () => activeQuestions()[state.currentIndex] || activeQuestions()[0];

const setView = (view) => {
  elements.homeView.classList.toggle("active", view === "home");
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
  elements.skipPrepButton.disabled = false;
  renderQuestion();
  startTimer();
};

const beginAnswer = () => {
  state.phase = "answer";
  state.remaining = state.config.answerSeconds;
  elements.skipPrepButton.disabled = true;
  startTimer();
};

const readConfig = () => {
  const selectedRigor = $(".rigor-card.active");
  state.config.questionCount = Math.max(1, Math.min(Number(elements.questionCount.value) || 5, questions.length));
  state.config.prepSeconds = Number(elements.prepTime.value) || 60;
  state.config.answerSeconds = (Number(elements.answerTime.value) || 3) * 60;
  state.config.rigor = selectedRigor?.dataset.rigor || "입문";
};

const resetForInterview = (sessionQuestions) => {
  state.sessionQuestions = sessionQuestions;
  state.completedQuestions = [...sessionQuestions];
  state.currentIndex = 0;
  state.recordings = [];
  state.recordedChunks = [];
};

const startInterview = () => {
  readConfig();
  resetForInterview(buildQuestionSet(state.config.questionCount));
  setView("interview");
  beginPrep();
};

const startSingleQuestionPractice = (originalIndex) => {
  const question = questions[originalIndex];
  if (!question) return;
  resetForInterview([{ ...question, originalIndex }]);
  state.config.questionCount = 1;
  setView("interview");
  beginPrep();
};

const nextQuestion = () => {
  finishRecording();
  const total = activeQuestions().length;
  if (state.currentIndex >= total - 1) {
    finishInterview();
    return;
  }

  state.currentIndex += 1;
  beginPrep();
};

const finishCurrentAnswer = () => {
  finishRecording();
  stopTimer();
  elements.phaseLabel.textContent = "답변 종료";
  elements.timerMode.textContent = "완료";
  elements.timerText.textContent = "00:00";
};

const finishInterview = () => {
  finishRecording();
  stopTimer();
  elements.phaseLabel.textContent = "면접 종료";
  elements.timerMode.textContent = "종료";
  elements.timerText.textContent = "완료";
  renderResultPage();
  setView("result");
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

const leaveInterview = () => {
  hideExitModal();
  stopTimer();
  finishRecording();
  setView("home");
};

const requestLeaveInterview = () => {
  if (isInterviewOpen()) {
    showExitModal();
    return;
  }
  setView("home");
};

const ensureCamera = async () => {
  if (state.cameraStream) return state.cameraStream;

  try {
    state.cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    elements.cameraPreview.srcObject = state.cameraStream;
    elements.webcamPanel.classList.add("camera-on");
    elements.cameraButton.querySelector("span").textContent = "카메라 켜짐";
    return state.cameraStream;
  } catch (error) {
    elements.cameraPlaceholder.innerHTML =
      "<strong>카메라 접근이 필요합니다</strong><span>브라우저 권한을 허용하면 녹화 복기 기능을 사용할 수 있습니다.</span>";
    renderIcons();
    throw error;
  }
};

const startRecording = async () => {
  const stream = await ensureCamera();
  if (state.recorder?.state === "recording") return;

  state.recordedChunks = [];
  state.recorder = new MediaRecorder(stream);
  state.recorder.addEventListener("dataavailable", (event) => {
    if (event.data.size > 0) {
      state.recordedChunks.push(event.data);
    }
  });
  state.recorder.addEventListener("stop", saveRecording);
  state.recorder.start();
  elements.webcamPanel.classList.add("recording");
  elements.recordButton.querySelector("span").textContent = "녹화 중지";
};

const finishRecording = () => {
  if (state.recorder?.state === "recording") {
    state.recorder.stop();
  }
};

const saveRecording = () => {
  if (!state.recordedChunks.length) return;

  const blob = new Blob(state.recordedChunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  state.recordings.push({
    url,
    questionNumber: state.currentIndex + 1,
    questionIndex: currentQuestion().originalIndex,
    question: currentQuestion().text,
    createdAt: new Date(),
  });
  state.recordedChunks = [];
  elements.webcamPanel.classList.remove("recording");
  elements.recordButton.querySelector("span").textContent = "답변 녹화";
};

const recordingForQuestion = (questionIndex) =>
  state.recordings.find((recording) => recording.questionIndex === questionIndex);

const renderResultPage = () => {
  elements.summaryQuestions.textContent = state.completedQuestions.length;
  elements.summaryRecordings.textContent = state.recordings.length;
  elements.summaryRigor.textContent = state.config.rigor;

  elements.resultList.innerHTML = state.completedQuestions
    .map((question, index) => {
      const recording = recordingForQuestion(question.originalIndex);
      const video = recording
        ? `<video src="${recording.url}" controls></video>`
        : `<div class="no-recording"><i data-lucide="video-off"></i><span>저장된 녹화 없음</span></div>`;

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
    });
  });

  elements.answerTime.addEventListener("input", () => {
    elements.answerValue.textContent = elements.answerTime.value;
  });

  elements.startInterview.addEventListener("click", startInterview);
};

const bindInterviewControls = () => {
  $$("[data-view='home']").forEach((button) => {
    button.addEventListener("click", requestLeaveInterview);
  });

  elements.cameraButton.addEventListener("click", () => {
    ensureCamera().catch(() => {});
  });

  elements.skipPrepButton.addEventListener("click", beginAnswer);

  elements.recordButton.addEventListener("click", () => {
    if (state.recorder?.state === "recording") {
      finishRecording();
      return;
    }
    startRecording().catch(() => {});
  });

  elements.nextQuestionButton.addEventListener("click", nextQuestion);
  elements.finishInterviewButton.addEventListener("click", finishInterview);

  elements.cancelExitButton.addEventListener("click", hideExitModal);
  elements.confirmExitButton.addEventListener("click", leaveInterview);
  elements.exitModal.addEventListener("click", (event) => {
    if (event.target === elements.exitModal) {
      hideExitModal();
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
});
