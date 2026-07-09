#!/usr/bin/env python3
"""Build a full-text search index of the Home Assistant documentation.

Walks the Markdown sources of home-assistant.io, strips front matter and
Liquid tags, splits every page into heading-based chunks, and writes them
to an SQLite FTS5 (BM25) index.

This is intentionally dependency-free: in production the same chunker
would feed Typesense/Meilisearch instead of SQLite, but the chunking and
URL-mapping logic is identical.

Usage:
    python3 build_index.py [--source ../source] [--db docs.db]
"""

import argparse
import re
import sqlite3
import sys
from pathlib import Path

# Directories under source/ that hold end-user documentation, mapped to
# their URL prefix on www.home-assistant.io.
SECTIONS = {
    "_integrations": "/integrations",
    "_docs": "/docs",
    "_dashboards": "/dashboards",
    "getting-started": "/getting-started",
    "common-tasks": "/common-tasks",
    "voice_control": "/voice_control",
    "installation": "/installation",
    "green": "/green",
    "yellow": "/yellow",
    "cloud": "/cloud",
}

# Chunks below this size are merged into the page intro; above max size a
# section is split again on the next heading level.
MAX_CHUNK_CHARS = 4000

FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---\n", re.DOTALL)
LIQUID_TAG_RE = re.compile(r"{%-?\s*(\w+)([^%]*?)-?%}")
LIQUID_VAR_RE = re.compile(r"{{.*?}}")
HTML_TAG_RE = re.compile(r"</?(?:abbr|p|img|a|lite-youtube|br|div|span)[^>]*>")


def parse_front_matter(text):
    """Return (front matter dict, body). Only flat `key: value` pairs."""
    match = FRONT_MATTER_RE.match(text)
    if not match:
        return {}, text
    meta = {}
    for line in match.group(1).splitlines():
        if line.startswith((" ", "\t", "-")) or ":" not in line:
            continue
        key, _, value = line.partition(":")
        meta[key.strip()] = value.strip().strip("\"'")
    return meta, text[match.end():]


def strip_liquid(body):
    """Replace Liquid tags with their human-readable text content."""

    def replace_tag(match):
        tag, arg = match.group(1), match.group(2).strip()
        if tag in ("term", "my"):
            # {% term entity "the entity" %} -> the entity (or the term)
            title = re.search(r'title="([^"]*)"', arg)
            if title:
                return title.group(1)
            parts = re.findall(r'"([^"]*)"|(\S+)', arg)
            words = [a or b for a, b in parts if (a or b) != "title=" ]
            return words[-1] if words else ""
        if tag == "icon":
            return ""
        # Container tags (details, note, tip, ...) keep their inner text,
        # so just drop the tag markers themselves.
        return ""

    body = LIQUID_TAG_RE.sub(replace_tag, body)
    body = LIQUID_VAR_RE.sub("", body)
    body = HTML_TAG_RE.sub("", body)
    return body


def url_for(path, source_root):
    rel = path.relative_to(source_root)
    prefix = SECTIONS[rel.parts[0]]
    stem = "/".join(rel.parts[1:]).rsplit(".", 1)[0]
    if stem.endswith("/index") or stem == "index":
        stem = stem[: -len("index")].rstrip("/")
    return f"{prefix}/{stem}/" if stem else f"{prefix}/"


def chunk_page(title, body):
    """Split a page body into (section_heading, text) chunks on h2/h3."""
    chunks = []
    current_heading = ""
    current_lines = []
    in_code = False

    def flush():
        text = "\n".join(current_lines).strip()
        if text:
            chunks.append((current_heading, text))

    for line in body.splitlines():
        if line.lstrip().startswith("```"):
            in_code = not in_code
        heading = re.match(r"(##+)\s+(.*)", line)
        if heading and not in_code and len(heading.group(1)) <= 3:
            flush()
            current_heading = heading.group(2).strip()
            current_lines = []
        else:
            current_lines.append(line)
    flush()

    # Merge tiny chunks into their predecessor so one-liner sections
    # (like "## Prerequisites: none") don't become standalone results.
    merged = []
    for heading, text in chunks:
        if merged and len(text) < 200 and len(merged[-1][1]) < MAX_CHUNK_CHARS:
            merged[-1] = (merged[-1][0], merged[-1][1] + f"\n\n{heading}\n{text}")
        else:
            merged.append((heading, text))
    return [(h, t[:MAX_CHUNK_CHARS]) for h, t in merged]


def build(source_root, db_path):
    conn = sqlite3.connect(db_path)
    conn.executescript(
        """
        DROP TABLE IF EXISTS chunks;
        CREATE VIRTUAL TABLE chunks USING fts5(
            title, section, content, url UNINDEXED, domain UNINDEXED,
            tokenize='porter unicode61'
        );
        """
    )

    pages = chunk_count = 0
    for section_dir in SECTIONS:
        for path in sorted((source_root / section_dir).rglob("*.markdown")):
            if path.name.startswith("_"):
                continue  # templates like _integration_docs_template
            meta, body = parse_front_matter(path.read_text(encoding="utf-8"))
            title = meta.get("title") or path.stem
            body = strip_liquid(body)
            url = url_for(path, source_root)
            domain = meta.get("ha_domain", "")
            rows = [
                (title, heading, text, url, domain)
                for heading, text in chunk_page(title, body)
            ]
            conn.executemany("INSERT INTO chunks VALUES (?,?,?,?,?)", rows)
            pages += 1
            chunk_count += len(rows)

    conn.commit()
    conn.close()
    print(f"Indexed {pages} pages into {chunk_count} chunks -> {db_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", default=Path(__file__).parent.parent / "source")
    parser.add_argument("--db", default=Path(__file__).parent / "docs.db")
    args = parser.parse_args()
    source = Path(args.source)
    if not source.is_dir():
        sys.exit(f"Source directory not found: {source}")
    build(source, str(args.db))
