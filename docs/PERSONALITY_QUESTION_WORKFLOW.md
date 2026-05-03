# 인성면접 질문/답변 반영 워크플로우

인성면접 질문 원본은 아래 엑셀 파일입니다.

```txt
C:\Users\김준하\OneDrive\Desktop\김준하\005. Coding\03. Codex\PJT 반면뿌\Q&A\QnA_인성면접.xlsx
```

## 엑셀에서 수정할 수 있는 항목

`질문목록` 시트에서 아래 컬럼을 수정하면 됩니다.

- `카테고리`
- `질문`
- `권장 답변`
- `지양 답변`

현재 앱에서는 `지양 답변` 컬럼을 `피해야할 답변`으로 보여줍니다.

## 로컬 데이터에 반영

엑셀을 저장한 뒤 프로젝트 루트에서 아래 명령을 실행합니다.

```powershell
& "C:\Users\김준하\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" scripts\build_personality_questions.py "C:\Users\김준하\OneDrive\Desktop\김준하\005. Coding\03. Codex\PJT 반면뿌\Q&A\QnA_인성면접.xlsx" data
```

생성되는 파일:

- `data/personality-questions.json`
- `data/personality-questions.js`

## SEO 페이지까지 다시 반영

인성면접 카테고리명이 SEO 페이지 조건에도 쓰이는 경우 아래 명령도 실행합니다.

```powershell
python scripts\build_seo_pages.py
```

## Supabase DB에 업로드

Supabase에도 반영하려면 서비스 role key가 로컬 PowerShell 환경변수에 들어간 상태에서 실행합니다.

```powershell
python -B scripts\supabase_push_questions.py --role personality --dry-run
python -B scripts\supabase_push_questions.py --role personality
```

## 검증

```powershell
node --check app.js
git diff --check
```

`git diff --check`에서 CRLF 경고만 나오면 기능상 문제는 아닙니다.
