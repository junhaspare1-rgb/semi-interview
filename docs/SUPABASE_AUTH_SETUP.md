# Supabase Auth 설정 메모

반면뿌 계정 시스템 1단계는 선택 로그인입니다. 로그인하지 않아도 기존 기능은 계속 사용할 수 있고, 로그인 사용자는 질문 모음의 북마크/대답 가능/연습 필요 상태가 Supabase와 동기화됩니다.

## 1. Supabase 프로젝트 생성

1. Supabase에서 새 프로젝트를 만듭니다.
2. `Project Settings > API`에서 아래 값을 확인합니다.
   - Project URL
   - anon public key

## 2. Cloudflare Pages 환경변수

Cloudflare Pages 프로젝트의 `Settings > Variables and Secrets`에 아래 값을 추가합니다.

```text
SUPABASE_URL=프로젝트 URL
SUPABASE_ANON_KEY=anon public key
```

변경 후에는 새 배포가 필요합니다.

## 3. Supabase Auth 설정

`Authentication > URL Configuration`에서 사이트 URL과 redirect URL을 설정합니다.

```text
Site URL: https://xn--e42b13ak0f.kr
Redirect URLs:
https://xn--e42b13ak0f.kr
https://xn--e42b13ak0f.kr/*
```

Google 로그인은 `Authentication > Providers > Google`에서 별도로 활성화해야 합니다. Google OAuth Client ID/Secret을 넣기 전에는 이메일 Magic Link만 먼저 테스트해도 됩니다.

## 4. DB 스키마

Supabase SQL Editor에서 아래 파일 내용을 실행합니다.

```text
supabase/schema.sql
```

현재 포함된 테이블:

- `profiles`
- `question_progress`
- `behavior_answers`

모두 Row Level Security가 켜져 있고, 사용자는 자기 데이터만 읽고 쓸 수 있습니다.

`schema.sql`은 정책을 먼저 `drop policy if exists`로 정리하므로, 초기 세팅 중 여러 번 실행해도 괜찮게 구성되어 있습니다.
프로젝트 생성 시 `Automatically expose new tables and functions`를 꺼둔 경우를 대비해, 마지막에 `authenticated` role용 table grant도 포함되어 있습니다.

## 5. 프론트 동작

- `functions/api/auth-config.js`가 Cloudflare 환경변수를 프론트에 전달합니다.
- 로컬 `file://` 환경에서는 `data/auth-config.js`를 fallback으로 봅니다.
- `data/auth-config.js`는 기본적으로 빈 값입니다. 로컬에서 실제 로그인 테스트를 하려면 여기에 Supabase URL과 anon key를 임시로 넣으면 됩니다.
- anon key는 공개 가능한 키지만, 서비스 role key는 절대 프론트에 넣으면 안 됩니다.
- `_headers`의 CSP에는 Supabase 통신을 위한 `https://*.supabase.co`와 CDN 스크립트 로드를 위한 `https://cdn.jsdelivr.net`이 포함되어 있습니다.
- 로그인 성공 시 `profiles`가 자동으로 upsert됩니다.
- 기존 localStorage 키 `banmyeonppu_question_progress_v1`의 진도는 로그인 후 `question_progress`와 병합됩니다. 더 최신인 값이 우선합니다.

## 로컬 테스트

1. `data/auth-config.js`에 Supabase URL과 anon key를 임시 입력합니다.
2. `index.html`을 열고 우측 상단 `로그인`을 누릅니다.
3. 이메일 Magic Link 또는 Google 로그인을 테스트합니다.
4. 질문 모음에서 북마크/대답 가능/연습 필요를 누른 뒤 Supabase `question_progress` 테이블에 반영되는지 확인합니다.

## 문제 해결

로그인은 되고 `Authentication > Users`에는 유저가 보이는데 `question_progress`가 비어 있다면 아래를 확인합니다.

1. 최신 `supabase/schema.sql`을 SQL Editor에서 다시 실행합니다.
2. 실행 후 질문 모음에서 북마크/대답 가능/연습 필요를 새로 클릭합니다.
3. 브라우저 개발자 도구 Console에 `Question progress sync failed`가 뜨면 메시지를 확인합니다.
4. Network 탭에서 Supabase `question_progress` 요청이 401/403이면 RLS 정책 또는 grant가 적용되지 않은 상태입니다.

## 다음 단계

1. 인성면접 질문 데이터와 답변 작성 UI 추가
2. 인성면접 답변 작성/저장을 `behavior_answers`에 연결
3. 관리자 페이지에서 사용자/진도/피드백 조회
