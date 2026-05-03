import argparse
import hashlib
import json
import os
import re
import sys
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import quote
from urllib.request import Request, urlopen


ROLE_CONFIGS = {
    "process": {
        "input": "data/process-questions.json",
        "label": "공정기술/양산기술",
        "short_label": "공정기술",
        "description": "반도체 양산 현장의 수율, 공정 조건, 불량 분석, 장비 이슈 대응 질문",
        "enabled": True,
        "sort_order": 10,
    },
    "package-test": {
        "input": "data/package-test-questions.json",
        "label": "Package & Test",
        "short_label": "Package & Test",
        "description": "후공정, 패키징, 테스트, 신뢰성, 품질 분석 면접 질문",
        "enabled": True,
        "sort_order": 20,
    },
    "personality": {
        "input": "data/personality-questions.json",
        "label": "인성 면접",
        "short_label": "인성 면접",
        "description": "자기소개, 지원동기, 협업, 문제해결, 가치관 중심 인성 면접 질문",
        "enabled": True,
        "sort_order": 30,
    },
}

MAIN_CATEGORIES = {"포토(Lithography)", "식각(Etch)", "증착(Deposition)"}
DIFFICULTY_ALIASES = {"실무": "실전"}
VALID_DIFFICULTIES = {"입문", "실전", "심화", "지엽"}


def normalize_text(value):
    return " ".join(str(value or "").split())


def normalize_difficulty(value):
    text = normalize_text(value)
    normalized = DIFFICULTY_ALIASES.get(text, text or "입문")
    if normalized not in VALID_DIFFICULTIES:
        raise ValueError(f"Unsupported difficulty: {normalized}")
    return normalized


def slugify_category(name):
    english = re.search(r"\(([^)]+)\)", name)
    source = english.group(1) if english else name
    slug = re.sub(r"[^a-z0-9]+", "-", source.lower()).strip("-")
    digest = hashlib.sha1(name.encode("utf-8")).hexdigest()[:8]
    return f"{slug or 'category'}-{digest}"


def question_id(role_id, source_id):
    return f"{role_id}:{source_id}"


def category_id(role_id, category_name):
    return f"{role_id}:{slugify_category(category_name)}"


def read_json(path):
    with Path(path).open("r", encoding="utf-8") as handle:
        return json.load(handle)


def service_headers(key, prefer=None):
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
    }
    if prefer:
        headers["Prefer"] = prefer
    return headers


def supabase_request(base_url, key, method, path, payload=None, prefer=None):
    url = f"{base_url.rstrip('/')}/rest/v1/{path.lstrip('/')}"
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8") if payload is not None else None
    request = Request(url, data=data, method=method, headers=service_headers(key, prefer))
    try:
        with urlopen(request, timeout=60) as response:
            body = response.read().decode("utf-8")
            return json.loads(body) if body else None
    except HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"{method} {url} failed: HTTP {error.code} {detail}") from error


def upsert_rows(base_url, key, table, rows, conflict):
    if not rows:
        return
    conflict_query = quote(conflict, safe=",")
    supabase_request(
        base_url,
        key,
        "POST",
        f"{table}?on_conflict={conflict_query}",
        rows,
        prefer="resolution=merge-duplicates",
    )


def build_payload(role_ids):
    role_rows = []
    category_rows_by_id = {}
    question_rows = []

    for role_id in role_ids:
        config = ROLE_CONFIGS[role_id]
        records = read_json(config["input"])
        role_rows.append(
            {
                "id": role_id,
                "label": config["label"],
                "short_label": config["short_label"],
                "description": config["description"],
                "enabled": bool(config["enabled"]),
                "sort_order": int(config["sort_order"]),
            }
        )

        category_order = {}
        for index, record in enumerate(records, start=1):
            source_id = normalize_text(record.get("id"))
            category_name = normalize_text(record.get("category") or "기타")
            difficulty = normalize_difficulty(record.get("difficulty"))
            question_text = normalize_text(record.get("question") or record.get("text"))
            if not source_id or not question_text:
                continue

            if category_name not in category_order:
                category_order[category_name] = len(category_order) + 1

            cat_id = category_id(role_id, category_name)
            category_rows_by_id[cat_id] = {
                "id": cat_id,
                "role_id": role_id,
                "name": category_name,
                "slug": slugify_category(category_name),
                "is_main": bool(record.get("group") == "main" or category_name in MAIN_CATEGORIES),
                "sort_order": category_order[category_name],
            }

            keywords = record.get("keywords") if isinstance(record.get("keywords"), list) else []
            metadata = {
                "jobRole": record.get("jobRole") or config["short_label"],
                "group": record.get("group") or "other",
                "originalId": record.get("id"),
            }
            if record.get("questionType"):
                metadata["questionType"] = normalize_text(record.get("questionType"))
            if record.get("recommendedAnswer"):
                metadata["recommendedAnswer"] = normalize_text(record.get("recommendedAnswer"))
            if record.get("avoidAnswer"):
                metadata["avoidAnswer"] = normalize_text(record.get("avoidAnswer"))

            question_rows.append(
                {
                    "id": question_id(role_id, source_id),
                    "role_id": role_id,
                    "source_question_id": source_id,
                    "category_id": cat_id,
                    "category_name": category_name,
                    "difficulty": difficulty,
                    "question_text": question_text,
                    "answer_full": normalize_text(record.get("answer") or record.get("recommendedAnswer")),
                    "answer_short": normalize_text(record.get("shortAnswer") or record.get("40초 Script")),
                    "keywords": [normalize_text(keyword) for keyword in keywords if normalize_text(keyword)],
                    "active": bool(record.get("active", True)),
                    "is_free": bool(record.get("isFree", True)),
                    "seo_published": bool(record.get("seoPublished", index <= 50)),
                    "sort_order": index,
                    "estimated_answer_minutes": record.get("estimatedAnswerMinutes"),
                    "metadata": metadata,
                }
            )

    return role_rows, list(category_rows_by_id.values()), question_rows


def main():
    parser = argparse.ArgumentParser(
        description="Upload local question JSON files into Supabase question tables."
    )
    parser.add_argument("--role", action="append", choices=ROLE_CONFIGS.keys(), help="Role id to upload")
    parser.add_argument("--dry-run", action="store_true", help="Print counts without calling Supabase")
    args = parser.parse_args()

    role_ids = args.role or list(ROLE_CONFIGS.keys())
    role_rows, category_rows, question_rows = build_payload(role_ids)

    print(f"roles: {len(role_rows)}")
    print(f"categories: {len(category_rows)}")
    print(f"questions: {len(question_rows)}")

    if args.dry_run:
        return

    base_url = os.environ.get("SUPABASE_URL", "").strip()
    service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    if not base_url or not service_key:
        raise SystemExit("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script.")

    upsert_rows(base_url, service_key, "question_roles", role_rows, "id")
    upsert_rows(base_url, service_key, "question_categories", category_rows, "id")
    upsert_rows(base_url, service_key, "questions", question_rows, "id")
    print("Upload complete.")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(error, file=sys.stderr)
        raise
