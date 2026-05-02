# 질문 DB 관리 워크플로우

반면뿌의 질문 데이터는 장기적으로 Supabase를 원본 DB로 관리하되, 사용자에게 보여주는 앱은 기존처럼 정적 `data/*.js` 파일을 읽도록 둡니다.

이 구조의 목적은 다음과 같습니다.

- 사용자는 빠른 정적 파일을 읽으므로 초기 로딩이 가볍습니다.
- 검색엔진용 정적 페이지 생성 구조는 현재 비활성화되어 있지만, 필요하면 `scripts/build_seo_pages.py`로 다시 재개할 수 있습니다.
- 운영자는 Supabase에서 질문, 답변, 난이도, 공개 범위를 관리할 수 있습니다.
- 유료화 시 `is_free`, `seo_published`, `active` 같은 필드로 공개 범위를 제어할 수 있습니다.

## 구조

```text
Supabase question tables
  ↓ scripts/supabase_pull_questions.py
data/process-questions.js
data/package-test-questions.js
  ↓
index.html 앱에서 정적 로드
```

반대로 기존 엑셀/JSON 데이터를 Supabase에 올릴 때는 아래 방향을 사용합니다.

```text
data/process-questions.json
data/package-test-questions.json
  ↓ scripts/supabase_push_questions.py
Supabase question tables
```

## 1. Supabase 스키마 적용

Supabase SQL Editor에서 아래 파일을 다시 실행합니다.

```text
supabase/schema.sql
```

질문 관리용으로 추가되는 테이블:

- `question_roles`
- `question_categories`
- `questions`

주의: 이 테이블들은 원본 콘텐츠 관리용입니다. 현재 앱은 이 테이블을 직접 조회하지 않고 정적 파일을 읽습니다.

## 2. 로컬 데이터를 Supabase에 업로드

서비스 role key는 절대 프론트 코드, Cloudflare public env, GitHub에 넣으면 안 됩니다.
로컬 터미널에서만 환경변수로 넣고 실행합니다.

PowerShell 예시:

```powershell
$env:SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
$env:SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
python -B scripts\supabase_push_questions.py --dry-run
python -B scripts\supabase_push_questions.py
```

특정 직무만 업로드할 수도 있습니다.

```powershell
python -B scripts\supabase_push_questions.py --role process
python -B scripts\supabase_push_questions.py --role package-test
```

## 3. Supabase에서 정적 파일 재생성

Supabase에서 질문을 수정한 뒤 앱에 반영하려면 정적 파일을 다시 생성합니다.

```powershell
$env:SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
$env:SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
python -B scripts\supabase_pull_questions.py
```

생성되는 파일:

- `data/process-questions.json`
- `data/process-questions.js`
- `data/package-test-questions.json`
- `data/package-test-questions.js`

그다음 평소처럼 검증 후 커밋/릴리즈합니다.

```powershell
node --check app.js
git diff --check
```

## 4. 필드 설명

`questions` 주요 필드:

- `role_id`: `process`, `package-test` 같은 직무 ID
- `source_question_id`: 엑셀/JSON 원본 번호
- `category_name`: 화면에 표시할 카테고리명
- `difficulty`: `입문`, `실전`, `심화`, `지엽`
- `question_text`: 질문
- `answer_short`: 40초 Script
- `answer_full`: 2분 Script
- `keywords`: JSON 배열
- `active`: 앱 노출 여부
- `is_free`: 무료 공개 여부
- `seo_published`: 개별 SEO 페이지 공개 여부
- `sort_order`: 정렬 순서

## 5. 운영 원칙

- 사용자의 학습 상태는 `question_progress`에 저장합니다.
- 질문 원본은 `questions`에 저장합니다.
- 앱은 정적 파일을 읽으므로, Supabase에서 질문을 수정한 뒤에는 `supabase_pull_questions.py`를 실행해야 사이트에 반영됩니다.
- 관리자 페이지를 만들기 전까지는 Supabase Table Editor와 위 스크립트를 관리 도구로 사용합니다.
