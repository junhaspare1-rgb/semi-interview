import json
from datetime import date
from html import escape
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "process-questions.json"
SITE_URL = "https://xn--e42b13ak0f.kr"
LASTMOD = date.today().isoformat()
SEO_QUESTION_LIMIT = 50

DIFFICULTIES = {
    "입문": {
        "slug": "beginner",
        "label": "입문",
        "description": "반도체와 공정의 기본 개념을 확인하는 면접 질문입니다.",
        "rank": 1,
    },
    "실전": {
        "slug": "practical",
        "label": "실전",
        "description": "공정기술 면접에서 자주 묻는 실무형 질문입니다.",
        "rank": 0,
    },
    "심화": {
        "slug": "advanced",
        "label": "심화",
        "description": "공정 조건, 불량 원인, 장비 관점까지 연결해야 하는 심화 질문입니다.",
        "rank": 2,
    },
}

CATEGORIES = [
    {
        "name": "반도체 기초이론",
        "slug": "semiconductor-basics",
        "description": "밴드갭, PN 접합, MOSFET, 수율 등 공정기술 면접 전 반드시 정리해야 하는 기초 질문입니다.",
    },
    {
        "name": "웨이퍼 제조",
        "slug": "wafer-manufacturing",
        "description": "단결정 실리콘, 잉곳, 웨이퍼 결정면과 대구경화 흐름을 다루는 질문입니다.",
    },
    {
        "name": "산화",
        "slug": "oxidation",
        "description": "Dry/Wet 산화, 산화막 신뢰성, High-k 절연막 등 산화 공정 질문입니다.",
    },
    {
        "name": "포토(Lithography)",
        "slug": "lithography",
        "description": "노광, PR, DOF, CD, Overlay, EUV 등 포토 공정 핵심 면접 질문입니다.",
        "main": True,
    },
    {
        "name": "식각(Etch)",
        "slug": "etch",
        "description": "플라즈마 식각, 선택비, 이방성, PR Ashing 등 식각 공정 질문입니다.",
        "main": True,
    },
    {
        "name": "증착(Deposition)",
        "slug": "deposition",
        "description": "CVD, PVD, ALD, 박막 균일도와 스텝커버리지 중심의 증착 공정 질문입니다.",
        "main": True,
    },
    {
        "name": "이온주입(Implant)",
        "slug": "ion-implant",
        "description": "도핑, Junction depth, Anneal, Channeling 등 이온주입 공정 질문입니다.",
    },
    {
        "name": "CMP",
        "slug": "cmp",
        "description": "평탄화, Slurry, Pad, Dishing/Erosion 등 CMP 공정 질문입니다.",
    },
    {
        "name": "세정(Cleaning)",
        "slug": "cleaning",
        "description": "RCA 세정, 파티클, 금속 오염, 세정 불량을 다루는 공정 질문입니다.",
    },
    {
        "name": "금속배선(Metallization)",
        "slug": "metallization",
        "description": "배선 재료, Barrier, Cu 공정, Electromigration 등 금속배선 질문입니다.",
    },
    {
        "name": "공정통합 및 수율관리",
        "slug": "process-integration-yield",
        "description": "공정 통합, 수율, SPC/FDC, DOE, 불량 분석 관점의 면접 질문입니다.",
    },
    {
        "name": "공정기술/양산기술 직무",
        "slug": "process-engineering-role",
        "description": "공정 엔지니어의 역할, 양산 이슈 대응, 협업과 문제 해결 역량을 묻는 질문입니다.",
    },
]

CATEGORY_BY_NAME = {category["name"]: category for category in CATEGORIES}
CATEGORY_ORDER = {category["name"]: index for index, category in enumerate(CATEGORIES)}


def clean_text(value):
    return " ".join(str(value or "").split())


def html_escape(value):
    return escape(str(value or ""), quote=True)


def absolute_url(path):
    if path == "/":
        return SITE_URL + "/"
    return SITE_URL + path


def write_text(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def load_questions():
    records = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    return [
        {
            **record,
            "question": clean_text(record.get("question")),
            "answer": clean_text(record.get("answer")),
            "shortAnswer": clean_text(record.get("shortAnswer")),
        }
        for record in records
        if record.get("active") is not False and record.get("difficulty") != "지엽" and record.get("question")
    ]


def question_path(question):
    return f"/jobs/process/questions/q-{int(question['id']):03d}/"


def practice_path(question):
    return f"/?practiceQuestion={int(question['id'])}"


def category_path(category):
    return f"/jobs/process/categories/{category['slug']}/"


def difficulty_path(difficulty):
    return f"/jobs/process/difficulties/{DIFFICULTIES[difficulty]['slug']}/"


def representative_questions(questions):
    selected = []
    selected_ids = set()

    def add(question):
        question_id = int(question["id"])
        if question_id in selected_ids:
            return
        selected.append(question)
        selected_ids.add(question_id)

    def rank(question):
        difficulty = DIFFICULTIES.get(question.get("difficulty"), {"rank": 9})
        return (difficulty["rank"], int(question["id"]))

    for category in CATEGORIES:
        bucket = [question for question in questions if question.get("category") == category["name"]]
        for question in sorted(bucket, key=rank)[: min(3, len(bucket))]:
            add(question)

    def fill_rank(question):
        category = CATEGORY_BY_NAME.get(question.get("category"), {})
        main_rank = 0 if category.get("main") else 1
        difficulty = DIFFICULTIES.get(question.get("difficulty"), {"rank": 9})
        return (main_rank, difficulty["rank"], CATEGORY_ORDER.get(question.get("category"), 99), int(question["id"]))

    for question in sorted(questions, key=fill_rank):
        if len(selected) >= SEO_QUESTION_LIMIT:
            break
        add(question)

    return selected[:SEO_QUESTION_LIMIT]


def answer_paragraphs(answer):
    if not answer:
        return []
    sentences = answer.replace(". ", ".\n").replace("다. ", "다.\n").splitlines()
    paragraphs = []
    current = []
    current_length = 0
    for sentence in [clean_text(item) for item in sentences if clean_text(item)]:
        current.append(sentence)
        current_length += len(sentence)
        if current_length >= 180:
            paragraphs.append(" ".join(current))
            current = []
            current_length = 0
    if current:
        paragraphs.append(" ".join(current))
    return paragraphs[:6]


def fallback_short_script(answer, limit=300):
    sentences = [clean_text(item) for item in answer.replace("다. ", "다.\n").splitlines() if clean_text(item)]
    picked = []
    current_length = 0
    for sentence in sentences:
        next_length = current_length + len(sentence) + (1 if picked else 0)
        if picked and next_length > limit:
            break
        picked.append(sentence)
        current_length = next_length
    summary = " ".join(picked).strip()
    if summary:
        return summary
    return clean_text(answer)[:limit].rstrip()


def base_head(title, description, path, structured_data=None):
    canonical = absolute_url(path)
    json_ld = "\n"
    if structured_data:
        json_ld = (
            '  <script type="application/ld+json">'
            + json.dumps(structured_data, ensure_ascii=False, separators=(",", ":"))
            + "</script>\n"
        )
    return f"""<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html_escape(title)}</title>
  <meta name="description" content="{html_escape(description)}" />
  <link rel="canonical" href="{html_escape(canonical)}" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:site_name" content="반면뿌" />
  <meta property="og:title" content="{html_escape(title)}" />
  <meta property="og:description" content="{html_escape(description)}" />
  <meta property="og:url" content="{html_escape(canonical)}" />
  <meta property="og:image" content="{SITE_URL}/og-image.png" />
  <link rel="stylesheet" href="/styles.css?v=20260501-seo" />
{json_ld}
</head>"""


def header(active="questions"):
    active_about = "active" if active == "about" else ""
    active_questions = "active" if active == "questions" else ""
    active_interview = "active" if active == "interview" else ""
    return f"""<header class="top-nav">
  <a class="brand" href="/"><span>반</span>도체 <span>면</span>접 <span>뿌</span>수기</a>
  <nav class="main-nav" aria-label="주요 메뉴">
    <a class="{active_about}" href="/about.html">About</a>
    <a class="{active_questions}" href="/jobs/process/questions/">기출 질문</a>
    <a class="{active_interview}" href="/">모의 면접</a>
  </nav>
  <div></div>
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


def page_shell(title, description, path, main_html, active="questions", structured_data=None):
    return f"""<!doctype html>
<html lang="ko">
{base_head(title, description, path, structured_data)}
<body class="seo-page">
{header(active)}
<main class="seo-main">
{main_html}
</main>
{footer()}
</body>
</html>
"""


def breadcrumbs(items):
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": index + 1,
                "name": item["name"],
                "item": absolute_url(item["path"]),
            }
            for index, item in enumerate(items)
        ],
    }


def item_list(items):
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": index + 1,
                "url": absolute_url(item["path"]),
                "name": item["name"],
            }
            for index, item in enumerate(items)
        ],
    }


def question_card(question, published_ids):
    published = int(question["id"]) in published_ids
    href = question_path(question) if published else practice_path(question)
    cta = "답변 보기" if published else "앱에서 연습"
    rel = "" if published else ' rel="nofollow"'
    keywords = "".join(f"<span>{html_escape(keyword)}</span>" for keyword in question.get("keywords", [])[:5])
    return f"""<article class="seo-question-card">
  <div>
    <p class="seo-card-meta">
      <span>{html_escape(question.get("difficulty"))}</span>
      <span>{html_escape(question.get("category"))}</span>
    </p>
    <h3><a href="{html_escape(href)}"{rel}>{html_escape(question.get("question"))}</a></h3>
    <div class="seo-keywords">{keywords}</div>
  </div>
  <a class="seo-card-cta" href="{html_escape(href)}"{rel}>{cta}</a>
</article>"""


def hero(label, title, description, primary_href="/", primary_label="기출 질문 풀어보기"):
    return f"""<section class="seo-hero">
  <p class="module-label">{html_escape(label)}</p>
  <h1>{html_escape(title)}</h1>
  <p>{html_escape(description)}</p>
  <div class="seo-actions">
    <a class="black-button" href="{html_escape(primary_href)}">{html_escape(primary_label)}</a>
    <a class="outline-button" href="/">앱으로 이동</a>
  </div>
</section>"""


def render_hub(questions, representative, published_ids):
    path = "/jobs/process/questions/"
    title = "공정기술 면접 질문 모음 | 반면뿌"
    description = "반도체 공정기술·양산기술 면접에 자주 나오는 기초, 포토, 식각, 증착, 수율관리 질문과 모범 답안을 확인하고 연습하세요."
    category_links = "\n".join(
        f"""<a class="seo-taxonomy-card" href="{category_path(category)}">
  <strong>{html_escape(category["name"])}</strong>
  <span>{sum(1 for question in questions if question.get("category") == category["name"])}개 질문</span>
  <p>{html_escape(category["description"])}</p>
</a>"""
        for category in CATEGORIES
    )
    difficulty_links = "\n".join(
        f"""<a class="seo-pill-link" href="{difficulty_path(name)}">
  {html_escape(meta["label"])} <span>{sum(1 for question in questions if question.get("difficulty") == name)}</span>
</a>"""
        for name, meta in DIFFICULTIES.items()
    )
    cards = "\n".join(question_card(question, published_ids) for question in representative[:12])
    main_html = (
        hero("공정기술 면접 질문", "공정기술 면접 질문 모음", description)
        + f"""<section class="seo-section">
  <div class="seo-section-head">
    <h2>카테고리별 질문</h2>
    <p>직무 면접에서 자주 이어지는 공정 흐름 기준으로 질문을 나눴습니다.</p>
  </div>
  <div class="seo-taxonomy-grid">{category_links}</div>
</section>
<section class="seo-section">
  <div class="seo-section-head">
    <h2>난이도별 질문</h2>
    <p>입문, 실전, 심화 기준으로 질문을 빠르게 훑어볼 수 있습니다.</p>
  </div>
  <div class="seo-pill-row">{difficulty_links}</div>
</section>
<section class="seo-section">
  <div class="seo-section-head">
    <h2>대표 질문</h2>
    <p>검색 공개용 대표 질문 50개 중 일부입니다. 전체 학습은 앱에서 이어갈 수 있습니다.</p>
  </div>
  <div class="seo-question-list">{cards}</div>
</section>"""
    )
    structured = [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "반면뿌",
            "url": SITE_URL + "/",
        },
        item_list([{"name": question["question"], "path": question_path(question)} for question in representative]),
    ]
    write_text(ROOT / "jobs/process/questions/index.html", page_shell(title, description, path, main_html, structured_data=structured))


def render_category_pages(questions, published_ids):
    for category in CATEGORIES:
        category_questions = [question for question in questions if question.get("category") == category["name"]]
        path = category_path(category)
        title = f"{category['name']} 면접 질문 | 공정기술 기출 질문"
        description = f"{category['description']} 반면뿌에서 대표 질문과 모범 답안을 확인하고 바로 연습해보세요."
        cards = "\n".join(question_card(question, published_ids) for question in category_questions)
        main_html = (
            hero("공정기술 카테고리", f"{category['name']} 면접 질문", description)
            + f"""<section class="seo-section">
  <div class="seo-section-head">
    <h2>{html_escape(category["name"])} 질문 {len(category_questions)}개</h2>
    <p>개별 답변 공개 문항은 답변 페이지로, 나머지 문항은 앱 연습 화면으로 연결됩니다.</p>
  </div>
  <div class="seo-question-list">{cards}</div>
</section>"""
        )
        structured = item_list(
            [
                {"name": question["question"], "path": question_path(question) if int(question["id"]) in published_ids else practice_path(question)}
                for question in category_questions
            ]
        )
        write_text(ROOT / f"jobs/process/categories/{category['slug']}/index.html", page_shell(title, description, path, main_html, structured_data=structured))


def render_difficulty_pages(questions, published_ids):
    for difficulty, meta in DIFFICULTIES.items():
        difficulty_questions = [question for question in questions if question.get("difficulty") == difficulty]
        path = difficulty_path(difficulty)
        title = f"공정기술 {difficulty} 면접 질문 | 반면뿌"
        description = f"{meta['description']} 공정기술 면접 준비에 필요한 질문과 답변 예시를 확인하세요."
        cards = "\n".join(question_card(question, published_ids) for question in difficulty_questions)
        main_html = (
            hero("공정기술 난이도", f"공정기술 {difficulty} 면접 질문", description)
            + f"""<section class="seo-section">
  <div class="seo-section-head">
    <h2>{html_escape(difficulty)} 질문 {len(difficulty_questions)}개</h2>
    <p>난이도별로 질문을 훑고, 필요한 문항은 앱에서 녹음 연습까지 이어갈 수 있습니다.</p>
  </div>
  <div class="seo-question-list">{cards}</div>
</section>"""
        )
        structured = item_list(
            [
                {"name": question["question"], "path": question_path(question) if int(question["id"]) in published_ids else practice_path(question)}
                for question in difficulty_questions
            ]
        )
        write_text(ROOT / f"jobs/process/difficulties/{meta['slug']}/index.html", page_shell(title, description, path, main_html, structured_data=structured))


def render_question_pages(representative):
    for question in representative:
        path = question_path(question)
        title = f"{question['question']} | 공정기술 면접 답변"
        description = f"{question['category']} {question['difficulty']} 면접 질문입니다. 40초 Script와 전체 모범 답안을 확인하고 반면뿌에서 답변 연습을 이어가세요."
        keywords = "".join(f"<span>{html_escape(keyword)}</span>" for keyword in question.get("keywords", []))
        paragraphs = "\n".join(f"<p>{html_escape(paragraph)}</p>" for paragraph in answer_paragraphs(question.get("answer")))
        short_answer = question.get("shortAnswer") or fallback_short_script(question.get("answer", ""))
        main_html = f"""<section class="seo-question-hero">
  <p class="seo-card-meta">
    <span>{html_escape(question.get("difficulty"))}</span>
    <span>{html_escape(question.get("category"))}</span>
  </p>
  <h1>{html_escape(question.get("question"))}</h1>
  <div class="seo-keywords">{keywords}</div>
  <div class="seo-actions">
    <a class="black-button" href="{practice_path(question)}" rel="nofollow">이 질문으로 연습하기</a>
    <a class="outline-button" href="/jobs/process/questions/">기출 질문 목록</a>
  </div>
</section>
<section class="seo-answer-grid">
  <article class="seo-answer-card">
    <h2>40초 Script</h2>
    <p>{html_escape(short_answer)}</p>
  </article>
  <article class="seo-answer-card wide">
    <h2>모범 답안</h2>
    {paragraphs}
  </article>
</section>"""
        structured = {
            "@context": "https://schema.org",
            "@graph": [
                breadcrumbs(
                    [
                        {"name": "기출 질문", "path": "/jobs/process/questions/"},
                        {"name": question.get("category"), "path": category_path(CATEGORY_BY_NAME[question.get("category")])},
                        {"name": question.get("question"), "path": path},
                    ]
                ),
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": question.get("question"),
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": question.get("answer"),
                            },
                        }
                    ],
                },
            ],
        }
        write_text(ROOT / f"jobs/process/questions/q-{int(question['id']):03d}/index.html", page_shell(title, description, path, main_html, structured_data=structured))


def render_simple_pages():
    pages = [
        {
            "path": "/about.html",
            "file": "about.html",
            "active": "about",
            "title": "반면뿌 소개 | 반도체 면접 뿌수기",
            "description": "반면뿌는 반도체 직무 면접을 실제처럼 연습하고, 기출 질문과 모범 답안을 확인할 수 있는 취업 준비 서비스입니다.",
            "heading": "반면뿌는 반도체 직무 면접을 실전처럼 연습하기 위한 서비스입니다.",
            "body": [
                "공정기술과 양산기술 면접에서 자주 나오는 질문을 직무, 카테고리, 난이도별로 정리했습니다.",
                "질문을 훑어보고, 모범 답안을 비교하고, 필요한 문항은 바로 녹음 연습으로 이어갈 수 있습니다.",
                "앞으로 회로설계, 소자 등 직무별 문제 은행과 모의면접 흐름을 확장할 예정입니다.",
            ],
        },
        {
            "path": "/terms.html",
            "file": "terms.html",
            "active": "questions",
            "title": "이용약관 | 반면뿌",
            "description": "반도체 면접 뿌수기 서비스 이용약관입니다.",
            "heading": "이용약관",
            "body": [
                "반면뿌는 반도체 취업 준비를 돕기 위한 학습 및 면접 연습 서비스를 제공합니다.",
                "서비스의 질문, 답변, AI 채점 결과는 학습 참고용이며 특정 기업의 실제 평가 기준을 보장하지 않습니다.",
                "사용자는 서비스의 콘텐츠를 무단 복제, 배포, 상업적으로 재판매해서는 안 됩니다.",
            ],
        },
        {
            "path": "/disclaimer.html",
            "file": "disclaimer.html",
            "active": "questions",
            "title": "면책 고지 | 반면뿌",
            "description": "반도체 면접 뿌수기 서비스의 학습 참고용 콘텐츠와 AI 결과에 대한 면책 고지입니다.",
            "heading": "면책 고지",
            "body": [
                "반면뿌의 질문과 답변 예시는 면접 준비를 돕기 위한 참고 자료입니다.",
                "실제 면접 질문, 평가 방식, 합격 여부는 기업, 직무, 시점에 따라 달라질 수 있습니다.",
                "AI 채점과 전사 결과는 기술적 한계가 있을 수 있으므로 최종 답변은 사용자가 직접 검토하고 보완해야 합니다.",
            ],
        },
    ]
    for page in pages:
        body = "\n".join(f"<p>{html_escape(paragraph)}</p>" for paragraph in page["body"])
        main_html = f"""<section class="seo-hero">
  <p class="module-label">반면뿌</p>
  <h1>{html_escape(page["heading"])}</h1>
  <div class="seo-legal-copy">{body}</div>
</section>"""
        write_text(
            ROOT / page["file"],
            page_shell(page["title"], page["description"], page["path"], main_html, active=page["active"]),
        )


def sitemap_url(path, priority="0.7"):
    return f"""  <url>
    <loc>{html_escape(absolute_url(path))}</loc>
    <lastmod>{LASTMOD}</lastmod>
    <priority>{priority}</priority>
  </url>"""


def write_urlset(path, urls):
    body = "\n".join(urls)
    write_text(
        ROOT / path,
        f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{body}
</urlset>
""",
    )


def render_sitemaps(representative):
    sitemap_files = [
        "/sitemaps/pages.xml",
        "/sitemaps/jobs.xml",
        "/sitemaps/categories.xml",
        "/sitemaps/questions-process.xml",
    ]
    write_text(
        ROOT / "sitemap.xml",
        """<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"""
        + "\n".join(
            f"""  <sitemap>
    <loc>{html_escape(absolute_url(path))}</loc>
    <lastmod>{LASTMOD}</lastmod>
  </sitemap>"""
            for path in sitemap_files
        )
        + "\n</sitemapindex>\n",
    )
    write_urlset(
        "sitemaps/pages.xml",
        [
            sitemap_url("/", "1.0"),
            sitemap_url("/about.html", "0.7"),
            sitemap_url("/privacy.html", "0.4"),
            sitemap_url("/terms.html", "0.4"),
            sitemap_url("/disclaimer.html", "0.4"),
        ],
    )
    write_urlset("sitemaps/jobs.xml", [sitemap_url("/jobs/process/questions/", "0.9")])
    write_urlset("sitemaps/categories.xml", [sitemap_url(category_path(category), "0.8") for category in CATEGORIES])
    write_urlset("sitemaps/questions-process.xml", [sitemap_url(question_path(question), "0.7") for question in representative])
    write_text(
        ROOT / "robots.txt",
        f"""User-agent: *
Allow: /

Sitemap: {SITE_URL}/sitemap.xml
""",
    )


def main():
    questions = load_questions()
    representative = representative_questions(questions)
    published_ids = {int(question["id"]) for question in representative}

    render_hub(questions, representative, published_ids)
    render_category_pages(questions, published_ids)
    render_difficulty_pages(questions, published_ids)
    render_question_pages(representative)
    render_simple_pages()
    render_sitemaps(representative)

    print(f"SEO pages generated for {len(questions)} active questions.")
    print(f"Published question pages: {len(representative)}")
    print("Generated hub, category, difficulty, legal, sitemap, and robots files.")


if __name__ == "__main__":
    main()
