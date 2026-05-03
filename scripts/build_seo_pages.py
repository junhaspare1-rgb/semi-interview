import json
import shutil
from datetime import date
from html import escape
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SITE_URL = "https://xn--e42b13ak0f.kr"
LASTMOD = date.today().isoformat()

SEO_CONFIG_PATH = ROOT / "data" / "seo-pages.json"
QUESTION_SOURCES = {
    "process": ROOT / "data" / "process-questions.json",
    "package-test": ROOT / "data" / "package-test-questions.json",
    "personality": ROOT / "data" / "personality-questions.json",
}

APP_URLS = [
    ("/", "1.0"),
    ("/questions", "0.9"),
    ("/mock-interview", "0.8"),
    ("/contact", "0.5"),
    ("/my-page", "0.5"),
    ("/privacy.html", "0.4"),
    ("/terms.html", "0.4"),
    ("/disclaimer.html", "0.4"),
]

GENERATED_SLUGS = [
    "semiconductor-interview-questions",
    "sk-hynix-yangsang-technology-interview",
    "sk-hynix-yangsan-technology-interview",
    "samsung-process-technology-interview",
    "sk-hynix-interview",
    "samsung-interview",
]

ROLE_LABELS = {
    "process": "공정기술/양산기술",
    "package-test": "Package & Test",
    "personality": "인성 면접",
}

DIFFICULTY_RANK = {
    "실전": 0,
    "입문": 1,
    "심화": 2,
}


def clean_text(value):
    return " ".join(str(value or "").split())


def html_escape(value):
    return escape(str(value or ""), quote=True)


def absolute_url(path):
    if path == "/":
        return f"{SITE_URL}/"
    return f"{SITE_URL}{path}"


def write_text(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8", newline="\n")


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def load_questions():
    questions = []
    for role_id, path in QUESTION_SOURCES.items():
        if not path.exists():
            continue
        for index, record in enumerate(load_json(path)):
            if record.get("active") is False:
                continue
            if clean_text(record.get("difficulty")) == "지엽":
                continue
            question = clean_text(record.get("question"))
            if not question:
                continue
            questions.append(
                {
                    **record,
                    "roleId": role_id,
                    "roleLabel": ROLE_LABELS.get(role_id, clean_text(record.get("jobRole")) or role_id),
                    "sourceIndex": index,
                    "question": question,
                    "answer": clean_text(record.get("answer") or record.get("recommendedAnswer")),
                    "shortAnswer": clean_text(record.get("shortAnswer")),
                    "recommendedAnswer": clean_text(record.get("recommendedAnswer")),
                    "avoidAnswer": clean_text(record.get("avoidAnswer")),
                    "category": clean_text(record.get("category")),
                    "difficulty": clean_text(record.get("difficulty")),
                    "keywords": [clean_text(keyword) for keyword in record.get("keywords", []) if clean_text(keyword)],
                }
            )
    return questions


def select_questions(questions, page):
    source_roles = set(page.get("sourceRoles") or [])
    category_includes = set(page.get("categoryIncludes") or [])
    keyword_terms = [term.lower() for term in page.get("targetKeywords", [])]
    limit = int(page.get("questionLimit") or 20)

    candidates = []
    for question in questions:
        if source_roles and question["roleId"] not in source_roles:
            continue
        if category_includes and question.get("category") not in category_includes:
            continue
        candidates.append(question)

    if not candidates:
        candidates = [
            question
            for question in questions
            if not source_roles or question["roleId"] in source_roles
        ]

    def score(question):
        searchable = " ".join(
            [
                question.get("question", ""),
                question.get("category", ""),
                question.get("answer", ""),
                " ".join(question.get("keywords", [])),
            ]
        ).lower()
        keyword_score = sum(1 for term in keyword_terms if term and term in searchable)
        category_rank = 0 if question.get("category") in category_includes else 1
        difficulty_rank = DIFFICULTY_RANK.get(question.get("difficulty"), 9)
        role_rank = 0 if question["roleId"] == "process" else 1
        return (-keyword_score, category_rank, role_rank, difficulty_rank, question["sourceIndex"])

    selected = []
    seen = set()
    for question in sorted(candidates, key=score):
        key = (question["roleId"], str(question.get("id")))
        if key in seen:
            continue
        selected.append(question)
        seen.add(key)
        if len(selected) >= limit:
            break
    return selected


def path_for_slug(slug):
    return f"/{slug}/"


def app_practice_href(question):
    return f"/practice?role={question['roleId']}&id={question['id']}"


def answer_preview(question):
    if question.get("shortAnswer"):
        return question["shortAnswer"]
    if question.get("recommendedAnswer"):
        return question["recommendedAnswer"]
    return question.get("answer", "")


def paragraphs(text, max_count=4):
    text = clean_text(text)
    if not text:
        return []
    chunks = []
    current = []
    length = 0
    for sentence in text.replace(". ", ".\n").replace("? ", "?\n").splitlines():
        sentence = clean_text(sentence)
        if not sentence:
            continue
        current.append(sentence)
        length += len(sentence)
        if length >= 180:
            chunks.append(" ".join(current))
            current = []
            length = 0
    if current:
        chunks.append(" ".join(current))
    return chunks[:max_count]


def question_card(question):
    keywords = "".join(
        f"<span>{html_escape(keyword)}</span>"
        for keyword in question.get("keywords", [])[:5]
    )
    answer = answer_preview(question)
    answer_block = "".join(f"<p>{html_escape(item)}</p>" for item in paragraphs(answer, 2))
    if question["roleId"] == "personality":
        answer_heading = "권장 답변"
        href = "/questions?type=personality"
    else:
        answer_heading = "답변 예시"
        href = app_practice_href(question)

    return f"""<article class="seo-question-card seo-target-question">
  <div>
    <p class="seo-card-meta">
      <span>{html_escape(question["roleLabel"])}</span>
      <span>{html_escape(question.get("difficulty") or "면접")}</span>
      <span>{html_escape(question.get("category"))}</span>
    </p>
    <h3>{html_escape(question.get("question"))}</h3>
    <div class="seo-keywords">{keywords}</div>
    <div class="seo-answer-preview">
      <strong>{answer_heading}</strong>
      {answer_block}
    </div>
  </div>
  <a class="seo-card-cta" href="{html_escape(href)}">연습하기</a>
</article>"""


def base_head(page):
    path = path_for_slug(page["slug"])
    canonical = absolute_url(path)
    structured_data = structured_data_for_page(page)
    return f"""<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html_escape(page["title"])}</title>
  <meta name="description" content="{html_escape(page["description"])}" />
  <link rel="canonical" href="{html_escape(canonical)}" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:site_name" content="반면뿌" />
  <meta property="og:title" content="{html_escape(page["title"])}" />
  <meta property="og:description" content="{html_escape(page["description"])}" />
  <meta property="og:url" content="{html_escape(canonical)}" />
  <meta property="og:image" content="{SITE_URL}/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{html_escape(page["title"])}" />
  <meta name="twitter:description" content="{html_escape(page["description"])}" />
  <meta name="twitter:image" content="{SITE_URL}/og-image.png" />
  <link rel="stylesheet" href="/styles.css?v=20260503-seo-targets" />
  <script type="application/ld+json">{json.dumps(structured_data, ensure_ascii=False, separators=(",", ":"))}</script>
</head>"""


def structured_data_for_page(page):
    path = path_for_slug(page["slug"])
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "name": page["h1"],
                "url": absolute_url(path),
                "description": page["description"],
                "isPartOf": {
                    "@type": "WebSite",
                    "name": "반면뿌",
                    "url": absolute_url("/"),
                },
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "반면뿌",
                        "item": absolute_url("/"),
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": page["h1"],
                        "item": absolute_url(path),
                    },
                ],
            },
        ],
    }


def header():
    return """<header class="top-nav seo-target-nav">
  <a class="brand" href="/"><span>반</span>도체 <span>면</span>접 <span>뿌</span>수기</a>
  <nav class="main-nav" aria-label="주요 메뉴">
    <a href="/questions">질문 모음</a>
    <a href="/mock-interview">모의 면접</a>
    <a href="/contact">Contact</a>
  </nav>
  <a class="seo-nav-cta" href="/questions">질문 보기</a>
</header>"""


def footer():
    return """<footer class="site-footer">
  <strong>반도체 면접 뿌수기</strong>
  <nav aria-label="법적 안내">
    <a href="/privacy.html">개인정보처리방침</a>
    <a href="/terms.html">이용약관</a>
    <a href="/disclaimer.html">면책 고지</a>
  </nav>
</footer>"""


def render_page(page, questions):
    selected_questions = select_questions(questions, page)
    keyword_chips = "".join(
        f"<span>{html_escape(keyword)}</span>"
        for keyword in page.get("targetKeywords", [])
    )
    guide_items = "".join(
        f"<li>{html_escape(item)}</li>"
        for item in page.get("guideBody", [])
    )
    notice = ""
    if page.get("notice"):
        notice = f"""<aside class="seo-notice">
  {html_escape(page["notice"])}
</aside>"""

    question_cards = "\n".join(question_card(question) for question in selected_questions)
    item_list = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": index + 1,
                "name": question["question"],
                "url": absolute_url(app_practice_href(question)),
            }
            for index, question in enumerate(selected_questions)
        ],
    }
    path = path_for_slug(page["slug"])
    html = f"""<!doctype html>
<html lang="ko">
{base_head(page)}
<body class="seo-page seo-target-page">
{header()}
<main class="seo-main">
  <section class="seo-hero seo-target-hero">
    <p class="module-label">{html_escape(page["eyebrow"])}</p>
    <h1>{html_escape(page["h1"])}</h1>
    <p>{html_escape(page["intro"])}</p>
    <div class="seo-keywords seo-target-keywords">{keyword_chips}</div>
    <div class="seo-actions">
      <a class="black-button" href="{html_escape(page["primaryCtaHref"])}">{html_escape(page["primaryCtaLabel"])}</a>
      <a class="outline-button" href="{html_escape(page["secondaryCtaHref"])}">{html_escape(page["secondaryCtaLabel"])}</a>
    </div>
  </section>
  {notice}
  <section class="seo-section seo-target-guide">
    <div class="seo-section-head">
      <h2>{html_escape(page["guideTitle"])}</h2>
      <p>검색으로 들어온 사용자가 바로 이해할 수 있도록 핵심 준비 방향을 먼저 정리했습니다.</p>
    </div>
    <ol class="seo-guide-list">{guide_items}</ol>
  </section>
  <section class="seo-section">
    <div class="seo-section-head">
      <h2>자주 확인하는 면접 질문</h2>
      <p>일부 질문과 답변 예시를 먼저 확인한 뒤, 전체 질문 모음에서 이어서 연습할 수 있습니다.</p>
    </div>
    <div class="seo-question-list">{question_cards}</div>
  </section>
  <section class="seo-section seo-final-cta">
    <h2>읽는 것에서 끝내지 말고 직접 말해보세요.</h2>
    <p>반면뿌에서는 질문을 누르고 바로 답변 연습을 시작할 수 있습니다. 북마크와 학습 진도도 계정에 동기화됩니다.</p>
    <a class="black-button" href="/questions">질문 모음으로 이동</a>
  </section>
  <script type="application/ld+json">{json.dumps(item_list, ensure_ascii=False, separators=(",", ":"))}</script>
</main>
{footer()}
</body>
</html>
"""
    write_text(ROOT / page["slug"] / "index.html", html)
    return path, len(selected_questions)


def sitemap_url(path, priority):
    return f"""  <url>
    <loc>{html_escape(absolute_url(path))}</loc>
    <lastmod>{LASTMOD}</lastmod>
    <priority>{priority}</priority>
  </url>"""


def render_sitemap(pages):
    urls = [sitemap_url(path, priority) for path, priority in APP_URLS]
    urls.extend(sitemap_url(path_for_slug(page["slug"]), "0.85") for page in pages)
    write_text(
        ROOT / "sitemap.xml",
        f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>
""",
    )


def cleanup_previous_outputs():
    for slug in GENERATED_SLUGS:
        target = ROOT / slug
        if target.exists() and target.is_dir():
            shutil.rmtree(target)


def main():
    pages = load_json(SEO_CONFIG_PATH)
    questions = load_questions()
    cleanup_previous_outputs()

    generated = []
    for page in pages:
        path, question_count = render_page(page, questions)
        generated.append((path, question_count))

    render_sitemap(pages)

    print(f"SEO target pages generated: {len(generated)}")
    for path, question_count in generated:
        print(f"- {path} ({question_count} questions)")
    print("sitemap.xml updated.")


if __name__ == "__main__":
    main()
