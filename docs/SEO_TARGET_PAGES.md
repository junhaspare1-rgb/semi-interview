# SEO 검색 유도 페이지 관리

반면뿌의 앱 화면은 그대로 유지하고, 검색 유입을 위한 정적 HTML 페이지를 별도로 생성합니다.

## 현재 목표 키워드

- 반도체 면접 질문
- SK하이닉스 양산기술 면접
- 삼성전자 공정기술 면접
- SK하이닉스 면접
- 삼성전자 면접

## 관리 파일

검색 유도 페이지의 제목, 설명, 본문, CTA, 노출할 질문 조건은 아래 파일에서 관리합니다.

```txt
data/seo-pages.json
```

새 검색어를 노리고 싶을 때는 이 JSON에 항목을 추가한 뒤 생성 스크립트를 실행합니다.

## 생성 명령

```powershell
python scripts\build_seo_pages.py
```

이 명령은 다음을 생성합니다.

- `/semiconductor-interview-questions/`
- `/sk-hynix-yangsan-technology-interview/`
- `/samsung-process-technology-interview/`
- `/sk-hynix-interview/`
- `/samsung-interview/`
- `sitemap.xml`

## 운영 원칙

- 기업명 페이지에는 공식 자료처럼 보이는 표현을 쓰지 않습니다.
- `기출 확정`, `실제 출제`처럼 검증하기 어려운 표현은 피합니다.
- 페이지마다 실제 질문과 답변 예시를 포함해 검색자가 바로 읽을 수 있게 합니다.
- 앱 내부 사용 경험은 `/questions`, `/mock-interview` 중심으로 유지합니다.

## Search Console 제출

배포 후 Google Search Console에서 아래 sitemap을 다시 제출합니다.

```txt
https://반면뿌.kr/sitemap.xml
```
