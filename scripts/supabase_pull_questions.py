import argparse
import json
import os
import sys
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


ROLE_OUTPUTS = {
    "process": {
        "json": "process-questions.json",
        "js": "process-questions.js",
        "window_var": "BANMYEONPPU_PROCESS_QUESTIONS",
        "jobRole": "공정기술",
    },
    "package-test": {
        "json": "package-test-questions.json",
        "js": "package-test-questions.js",
        "window_var": "BANMYEONPPU_PACKAGE_TEST_QUESTIONS",
        "jobRole": "Package & Test",
    },
    "personality": {
        "json": "personality-questions.json",
        "js": "personality-questions.js",
        "window_var": "BANMYEONPPU_PERSONALITY_QUESTIONS",
        "jobRole": "인성 면접",
    },
}


def service_headers(key):
    return {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
    }


def supabase_get(base_url, key, table, params):
    query = urlencode(params, doseq=True)
    url = f"{base_url.rstrip('/')}/rest/v1/{table}?{query}"
    request = Request(url, method="GET", headers=service_headers(key))
    try:
        with urlopen(request, timeout=60) as response:
            return json.loads(response.read().decode("utf-8"))
    except HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"GET {url} failed: HTTP {error.code} {detail}") from error


def number_or_none(value):
    if value is None:
        return None
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    return int(number) if number.is_integer() else number


def source_id_value(value):
    text = str(value or "")
    return int(text) if text.isdigit() else text


def record_from_row(row, role_config):
    metadata = row.get("metadata") if isinstance(row.get("metadata"), dict) else {}
    keywords = row.get("keywords") if isinstance(row.get("keywords"), list) else []
    record = {
        "id": source_id_value(row.get("source_question_id")),
        "jobRole": metadata.get("jobRole") or role_config["jobRole"],
        "category": row.get("category_name") or "기타",
        "group": metadata.get("group") or "other",
        "difficulty": row.get("difficulty") or "입문",
        "question": row.get("question_text") or "",
        "answer": row.get("answer_full") or "",
        "keywords": [str(keyword).strip() for keyword in keywords if str(keyword).strip()],
        "active": bool(row.get("active", True)),
        "estimatedAnswerMinutes": number_or_none(row.get("estimated_answer_minutes")),
        "shortAnswer": row.get("answer_short") or "",
    }
    if metadata.get("questionType") == "personality":
        record["questionType"] = "personality"
        record["recommendedAnswer"] = metadata.get("recommendedAnswer") or row.get("answer_full") or ""
        record["avoidAnswer"] = metadata.get("avoidAnswer") or ""
    return record


def write_role_output(output_dir, role_id, rows):
    role_config = ROLE_OUTPUTS[role_id]
    records = [record_from_row(row, role_config) for row in rows]
    records.sort(key=lambda record: (record["id"] if isinstance(record["id"], int) else 10**9, str(record["id"])))
    json_text = json.dumps(records, ensure_ascii=False, indent=2)

    json_path = output_dir / role_config["json"]
    js_path = output_dir / role_config["js"]
    json_path.write_text(json_text + "\n", encoding="utf-8")
    js_path.write_text(
        f"window.{role_config['window_var']} = " + json_text + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(records)} records to {json_path} and {js_path}")


def main():
    parser = argparse.ArgumentParser(
        description="Export Supabase question tables back into static data files."
    )
    parser.add_argument("--role", action="append", choices=ROLE_OUTPUTS.keys(), help="Role id to export")
    parser.add_argument("--output-dir", default="data", help="Output directory for generated JSON/JS files")
    args = parser.parse_args()

    base_url = os.environ.get("SUPABASE_URL", "").strip()
    service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    if not base_url or not service_key:
        raise SystemExit("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script.")

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    role_ids = args.role or list(ROLE_OUTPUTS.keys())

    for role_id in role_ids:
        rows = supabase_get(
            base_url,
            service_key,
            "questions",
            {
                "select": "*",
                "role_id": f"eq.{role_id}",
                "active": "eq.true",
                "order": "sort_order.asc",
            },
        )
        write_role_output(output_dir, role_id, rows)


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(error, file=sys.stderr)
        raise
