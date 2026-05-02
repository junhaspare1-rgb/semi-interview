# 반면뿌 AI 인수인계 문서

마지막 정리일: 2026-05-01

이 문서는 대화를 새로 시작해도 현재 프로젝트 맥락을 빠르게 복원하기 위한 핸드오프 문서입니다. 새 대화에서는 이 파일, `git log`, 주요 소스 파일을 먼저 읽고 이어서 작업하면 됩니다.

## 새 대화 시작 문구

새 대화에서 아래처럼 요청하면 됩니다.

```text
반면뿌 프로젝트 이어서 작업하자.
먼저 docs/AI_HANDOFF.md, git log, index.html, app.js, scripts 폴더를 읽고 현재 구조를 파악해줘.
릴리즈/푸시는 내가 명시적으로 요청하기 전까지 하지 마.
```

## 프로젝트 개요

- 서비스명: 반도체 면접 뿌수기, 줄여서 반면뿌
- 목적: 반도체 공정기술/양산기술 직무 면접을 질문 모음, 모범 답안, 빠른 연습, 모의면접으로 준비하는 웹앱
- 현재 주요 도메인: `https://xn--e42b13ak0f.kr/` (`반면뿌.kr`)
- GitHub 원격 저장소: `https://github.com/junhaspare1-rgb/semi-interview`
- 배포 방식: `main`에서 개발 후 `release` 브랜치에 병합/푸시하면 Cloudflare Pages 배포

## 현재 사용자 화면 구조

- 상단 탭 순서: `질문 모음 / 모의 면접 / Contact`
- 기본 진입 화면: 직무 선택 랜딩 페이지
- 좌상단 로고 클릭 시 랜딩 페이지로 이동
- `/`는 SPA 앱으로 유지
- SEO용 정적 페이지는 별도 URL에 생성되어 있고, CTA로 기존 앱에 연결

### 랜딩 페이지

- 첫 화면에서 사용자가 준비 중인 반도체 직무를 선택
- 현재 사용 가능한 직무는 `공정기술/양산기술`, `Package & Test`
- 미구현 직무는 `소자`, `회로설계`
- 미구현 직무를 선택하면 작은 팝업으로 준비 중 안내와 이메일 오픈 알림 폼 표시
- 오픈 알림 API는 `functions/api/waitlist.js`
- 기본 저장소는 `WAITLIST_KV`, 없으면 `FEEDBACK_KV`를 재사용
- 랜딩 하단에는 기존 About 핵심 내용을 카드 형태로 노출

## 핵심 기능

### 질문 모음

- 공정기술/양산기술 질문 데이터 기반 문제 은행
- 난이도/카테고리 다중 선택 필터
- 필터별 문제 수는 상호작용형 faceted count 방식
- 페이지당 보기 개수 선택, 기본 10개
- 정렬: 기본순, 난이도 우선, 북마크 우선, 연습 필요 우선 등
- 문제 카드 클릭 시 모범 답안 펼침
- 북마크, 대답 가능, 연습 필요 상태를 브라우저 localStorage에 저장
- 학습 진행률은 `대답 가능`과 `연습 필요`를 하나의 막대에서 초록/빨강으로 표시
- `연습하기` 버튼은 빠른 연습 화면으로 이동

### 빠른 연습

- 모바일/데스크톱 모두 면접 환경 체크 없이 가볍게 연습 가능
- 녹음 버튼으로 답변 연습
- 녹음 재생 중에도 모범 답안을 확인할 수 있음
- `/?practiceQuestion={id}`로 공정기술 문항 빠른 연습 화면 진입 가능
- Package & Test 문항은 `/?role=package-test&practiceQuestion={id}`로 빠른 연습 화면 진입 가능

### 모의 면접

- 일반 모의면접과 AI 모의면접 분리
- 모의면접 설정 화면은 `면접 방식 선택 → 직무 및 상세 설정 → 환경 점검 → 시작` 카드형 UI
- 일반 모의면접: 사용자가 질문 수, 준비 시간, 답변 시간 등을 설정
- AI 모의면접: 파일럿 용도로 관리자 키 입력 후 접근
- AI 모의면접은 답변 음성/전사문을 서버로 보내 채점
- 면접 중 이탈 시 확인 팝업 표시
- 결과 페이지에서 녹화 복기, 모범 답안, 피드백 제출 제공

### 피드백/문제 신고

- 피드백 API: `functions/api/feedback.js`
- 문제 신고 API: `functions/api/report.js`
- 네트워크/API 실패 시 일부 항목은 localStorage 큐에 보관
- 피드백에는 선택 이메일과 정식 릴리즈 응시권 안내 동의 흐름이 포함됨

## 데이터 흐름

원본 엑셀:

- `C:\Users\김준하\OneDrive\Desktop\김준하\005. Coding\03. Codex\PJT 반면뿌\Q&A\QnA_공정기술.xlsx`
- `C:\Users\김준하\OneDrive\Desktop\김준하\005. Coding\03. Codex\PJT 반면뿌\Q&A\Q&A_Package&Test.xlsx`

생성 산출물:

- `data/process-questions.json`
- `data/process-questions.js`
- `data/package-test-questions.json`
- `data/package-test-questions.js`

변환 스크립트:

- `scripts/build_process_questions.py`
- `scripts/build_package_test_questions.py`

문제 데이터를 새 엑셀로 갱신할 때의 기본 흐름:

```powershell
python scripts\build_process_questions.py "C:\Users\김준하\OneDrive\Desktop\김준하\005. Coding\03. Codex\PJT 반면뿌\Q&A\QnA_공정기술.xlsx" data
python scripts\build_package_test_questions.py "C:\Users\김준하\OneDrive\Desktop\김준하\005. Coding\03. Codex\PJT 반면뿌\Q&A\Q&A_Package&Test.xlsx" data
python scripts\build_seo_pages.py
node --check app.js
python -B -m py_compile scripts\build_process_questions.py scripts\build_package_test_questions.py scripts\build_seo_pages.py
```

주의:

- 엑셀 헤더명에 의존하는 스크립트입니다. 헤더가 바뀌면 `scripts/build_process_questions.py`도 함께 수정해야 합니다.
- `지엽` 난이도는 앱 출제/노출 대상에서 제외하는 방향으로 운영해왔습니다.
- 로컬 저장 키는 `banmyeonppu_question_progress_v1`입니다. 키를 바꾸면 기존 사용자 학습 상태가 초기화됩니다.

## SEO 구조

기존 앱 UX는 `/`에서 유지하고, 검색 유입용 정적 HTML 페이지를 별도로 생성합니다.

주요 URL:

- `/jobs/process/questions/` 공정기술 질문 허브
- `/jobs/process/categories/{categorySlug}/` 공정별 질문 페이지
- `/jobs/process/difficulties/{difficultySlug}/` 난이도별 질문 페이지
- `/jobs/process/questions/q-{id}/` 대표 개별 질문 페이지

SEO 산출물:

- `jobs/`
- `sitemaps/`
- `sitemap.xml`
- `robots.txt`
- `about.html`
- `terms.html`
- `disclaimer.html`

SEO 생성 스크립트:

- `scripts/build_seo_pages.py`

현재 SEO 정책:

- 대표 50개 문항만 개별 질문 페이지와 질문 sitemap에 포함
- 카테고리/난이도 페이지는 검색 유입용 허브 역할
- 앱 내부 다중 필터 조합은 sitemap에 넣지 않음
- 개별 질문 페이지 CTA는 `/?practiceQuestion={id}`로 연결

사이트맵 확인 URL:

- `https://xn--e42b13ak0f.kr/sitemap.xml`
- `https://xn--e42b13ak0f.kr/robots.txt`
- `https://xn--e42b13ak0f.kr/sitemaps/questions-process.xml`

## API와 환경변수

Cloudflare Pages Functions:

- `functions/api/evaluate-answer.js`
- `functions/api/stt-test.js`
- `functions/api/feedback.js`
- `functions/api/report.js`

필요한 환경변수/바인딩 이름:

- `OPENAI_API_KEY`
- `AI_ADMIN_KEY`
- `AI_SCORE_MODEL` 기본값은 코드에서 `gpt-5-mini`
- `FEEDBACK_KV`
- `REPORT_KV` 또는 `FEEDBACK_KV`
- `FEEDBACK_DB` 또는 `DB`가 있으면 D1 저장도 사용

현재 STT 모델은 코드에서 `gpt-4o-transcribe`로 고정되어 있습니다.

보안 주의:

- API 키, 관리자 키, Cloudflare 토큰 값은 절대 repo나 문서에 적지 않습니다.
- 관리자 키는 프론트 코드에 하드코딩하지 않습니다.
- `AI_ADMIN_KEY`가 Cloudflare 환경변수에 없으면 AI 채점 API는 실패하도록 되어 있습니다.

## 분석 도구

현재 삽입된 분석 도구:

- Google Analytics: `G-V8PWYYDSJC`
- Microsoft Clarity: `whfabvxf3v`

주요 GA 이벤트:

- `answer_open`
- `practice_click`
- `script_40_click`
- `script_2min_click`
- `bookmark_click`
- `mock_interview_start`

## 보안/헤더

보안 헤더 파일:

- `_headers`

현재 목적:

- CSP
- HSTS
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

주의:

- 외부 스크립트를 추가하면 CSP도 같이 갱신해야 할 수 있습니다.
- Google tag, Clarity, lucide CDN이 CSP에 막히지 않는지 배포 후 콘솔 확인이 필요합니다.

## 배포/릴리즈 절차

릴리즈는 사용자가 명시적으로 요청했을 때만 진행합니다.

일반 작업 흐름:

```powershell
git status --short --branch
git add .
git commit -m "작업 내용을 설명하는 메시지"
git push origin main
git switch release
git merge --no-edit main
git push origin release
git switch main
```

권장 검증:

```powershell
node --check app.js
python -B -m py_compile scripts\build_process_questions.py scripts\build_seo_pages.py
git diff --check HEAD~1 HEAD
```

릴리즈 후 확인:

- Cloudflare Pages 배포 성공 여부
- `/` 앱 접속
- `/jobs/process/questions/`
- `/sitemap.xml`
- `/robots.txt`
- 모바일 질문 모음 모범 답안 너비
- GA/Clarity 콘솔 오류 여부

## 최근 주요 커밋

- `546595e Add SEO static question pages`
- `4aab2cb Harden admin access and security headers`
- `d11ed3d Link logo to question bank`
- `3f3af47 Track core GA events`
- `5f29208 Add privacy policy page`
- `f094594 Improve mobile answer card width`
- `b7302b7 Open question bank by default`
- `85b646b Add quick practice recording UI`

## 다음에 작업할 때 먼저 확인할 것

1. `git status --short --branch`
2. 사용자가 VS Code에서 수정한 파일이 있는지
3. `app.js`, `styles.css`, `index.html` cache busting 버전
4. 엑셀 데이터 변경 여부
5. SEO 페이지를 재생성해야 하는 변경인지
6. localStorage 키 변경으로 기존 사용자 데이터가 날아갈 위험이 있는지
7. release 브랜치 푸시가 필요한 작업인지, 로컬 구현만 필요한 작업인지

## 새 기능을 넣을 때의 원칙

- 질문 모음 화면은 체류 시간과 SEO 유입을 받는 핵심 화면으로 본다.
- 빠른 연습은 면접 환경 체크보다 가벼운 반복 학습 경험으로 유지한다.
- 모의면접은 실전감 있는 별도 흐름으로 유지한다.
- 결제, 관리자 페이지, 직무별 문제 관리는 추후 DB 구조로 이관할 수 있게 데이터 필드와 URL slug를 안정적으로 유지한다.
- 계정 시스템은 Supabase 선택 로그인 1차 구조가 들어가 있다. 환경변수는 `SUPABASE_URL`, `SUPABASE_ANON_KEY`이며, 스키마와 설정법은 `docs/SUPABASE_AUTH_SETUP.md`와 `supabase/schema.sql`을 확인한다.
- 사용자의 학습 상태는 기본적으로 localStorage 키 `banmyeonppu_question_progress_v1`에 저장되고, 로그인 사용자는 `question_progress`와 병합 동기화된다. 키를 바꾸면 기존 사용자 학습 상태가 초기화될 수 있다.
