# 반면뿌 개발 핸드오프

## 프로젝트 위치

- 로컬 프로젝트: `C:\Users\김준하\Documents\Codex\2026-04-25\ai-1-1-2-3-ai`
- GitHub: `https://github.com/junhaspare1-rgb/semi-interview`
- 기본 작업 브랜치: `main`
- 배포 브랜치: `release`
- Cloudflare Pages 배포는 `release` 브랜치 푸시 기준으로 운영

## 현재 배포 상태

- 최신 `main` 커밋: `f24f7a6 Align bookmarked questions page layout`
- 최신 `release` 커밋: `1ec170c Merge branch 'main' into release`
- 최근 작업은 `main`에 커밋/푸시했고, `release`에 병합/푸시까지 완료함
- 현재 작업트리 기준 `git status --short`는 깨끗해야 정상

## 핵심 라우트

- `/` 랜딩 페이지
- `/questions` 기술 면접 질문 모음
- `/questions?type=personality` 인성 면접 질문 모음
- `/mock-interview` 모의 면접 설정
- `/contact` Contact
- `/practice?role=process&id=1` 문항별 빠른 연습
- `/my-questions` 저장한 질문/북마크 페이지
- `/my-page`는 `/my-questions`로 리다이렉트

## 주요 파일

- `index.html`: 전체 SPA 마크업, 라우트별 뷰, 메타 태그, 스크립트 로드
- `styles.css`: 전체 UI 스타일. 질문 모음/북마크 페이지 사이드바 레이아웃 포함
- `app.js`: 라우팅, 질문 렌더링, 북마크/진도, Supabase Auth/동기화, 모의면접 로직
- `_redirects`: Cloudflare Pages SPA 라우팅/리다이렉트
- `_headers`: 정적 파일 헤더
- `sitemap.xml`, `robots.txt`: 현재는 주요 앱 URL 중심의 단순 SEO 구성

## 데이터 파일

- `data/process-questions.js/json`: 공정기술/양산기술 질문
- `data/package-test-questions.js/json`: Package & Test 질문
- `data/personality-questions.js/json`: 인성 면접 질문
- `data/auth-config.js`: Supabase public config를 Cloudflare API에서 주입받는 클라이언트 설정

## 원본 엑셀 위치

원본 질문 파일은 프로젝트 밖에서 관리한다.

- 폴더: `C:\Users\김준하\OneDrive\Desktop\김준하\005. Coding\03. Codex\PJT 반면뿌\Q&A`
- 공정기술: `QnA_공정기술.xlsx`
- Package & Test: `Q&A_Package&Test.xlsx`
- 인성 면접: `QnA_인성면접.xlsx`

엑셀 수정 후 반영 흐름:

1. 해당 빌드 스크립트 실행
   - `python -B scripts\build_process_questions.py`
   - `python -B scripts\build_package_test_questions.py`
   - `python -B scripts\build_personality_questions.py`
2. 필요 시 Supabase 업로드
   - `python -B scripts\supabase_push_questions.py`
3. 로컬 검증
   - `node --check app.js`
   - `git diff --check`
4. 커밋/푸시, 필요 시 `release` 병합/푸시

## Supabase / 서버 기능

Supabase는 로그인, 사용자별 질문 진도/북마크 동기화, 질문 DB 관리 방향으로 사용한다.

Cloudflare 환경변수에 필요한 값:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` 또는 업로드 스크립트에서 사용할 서비스 키
- AI 기능 사용 시 `OPENAI_API_KEY`

Cloudflare Functions:

- `functions/api/auth-config.js`
- `functions/api/feedback.js`
- `functions/api/report.js`
- `functions/api/waitlist.js`
- `functions/api/evaluate-answer.js`
- `functions/api/stt-test.js`

## 현재 UI 방향성

### 질문 모음

- 데스크톱: 상단 고정 내비게이션 + 좌측 고정 필터 사이드바 + 우측 메인 리스트
- 모바일: 햄버거 메뉴 + 하단 플로팅 필터 버튼 + 필터 드로어
- 기본 보기: 리스트형
- 필터: 직무, 난이도, 카테고리
- 기술 면접과 인성 면접은 같은 질문 모음 구조를 공유하되, 인성 면접은 난이도/연습 버튼 없이 `권장 답변`, `피해야할 답변` 중심

### 북마크 페이지

- 공식 URL은 `/my-questions`
- 질문 모음과 동일한 좌측 사이드바/우측 리스트 구조로 맞추는 중
- 최근 수정 사항:
  - `/my-page`를 `/my-questions`로 리다이렉트
  - 북마크 페이지 필터를 직무/난이도/카테고리 체크형 사이드바로 변경
  - 검색창과 정렬 드롭다운이 화면 밖으로 나가지 않도록 CSS 조정

## 최근 미완료/주의 이슈

- `/my-questions` UI는 질문 모음 UI와 계속 맞춰가는 중이다.
- 특히 다음을 새 대화에서 먼저 확인하면 좋다.
  - 북마크 페이지에서 검색창 텍스트가 정상 위치에 있는지
  - 정렬 드롭다운이 작은 화면에서 잘리지 않는지
  - 필터 변경 시 헤더/검색/선택바가 불필요하게 움직이지 않는지
  - 질문 모음과 북마크 페이지 사이드바 폭/간격이 실제로 일관적인지
- 모바일 필터 드로어는 배경 페이지가 아니라 드로어 내부가 스크롤되어야 한다.

## 배포 절차

일반적인 릴리즈 절차:

```powershell
git status --short
node --check app.js
git diff --check
git add <changed files>
git commit -m "커밋 메시지"
git push origin main
git checkout release
git merge main --no-edit
node --check app.js
git diff --check HEAD
git push origin release
git checkout main
```

주의:

- 사용자가 명시적으로 요청하기 전에는 `release` 푸시를 자동으로 하지 않는다.
- API 키, Supabase service key, OpenAI key는 프론트 코드에 넣지 않는다.
- 원본 엑셀은 삭제하거나 이동하지 않는다.
- 사용자가 VS Code에서 수정한 내용이 있으면 먼저 `git status`/diff로 확인하고 덮어쓰지 않는다.

## 새 대화 시작 프롬프트 예시

새 대화에서는 아래처럼 시작하면 된다.

```text
프로젝트 경로:
C:\Users\김준하\Documents\Codex\2026-04-25\ai-1-1-2-3-ai

먼저 HANDOFF.md를 읽고 현재 반면뿌 프로젝트 상태를 파악해줘.
이어서 /my-questions 북마크 페이지 UI를 질문 모음 페이지와 완전히 같은 좌측 사이드바/우측 리스트 구조로 정리하자.
```
