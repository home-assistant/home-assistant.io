#!/usr/bin/env python3
"""Query the documentation index built by build_index.py.

Shared by the HTTP API (server.py) and the MCP server (mcp_server.py).
Can also be used directly from the command line:

    python3 search.py "set up a zigbee network"
"""

import re
import sqlite3
import sys
from pathlib import Path

DB_PATH = Path(__file__).parent / "docs.db"

# Weights for BM25 ranking: a hit in the page title counts much more than
# a hit in the body, a section heading sits in between.
RANK_WEIGHTS = "10.0, 4.0, 1.0"

# Filler words in natural-language questions that only add noise to BM25.
STOPWORDS = frozenset(
    "a an and are can do does for from how i in is it my of on or set setting "
    "should that the this to up use using want what when where which with you "
    "your".split()
)


def _terms(query):
    terms = [t for t in re.findall(r"[\w.]+", query.lower()) if t not in STOPWORDS]
    return terms or re.findall(r"[\w.]+", query.lower())


def _run(conn, match, limit):
    return conn.execute(
        f"""
        SELECT title, section, url, domain,
               snippet(chunks, 2, '', '', ' … ', 40) AS excerpt,
               bm25(chunks, {RANK_WEIGHTS}) AS score
        FROM chunks
        WHERE chunks MATCH ?
        ORDER BY score
        LIMIT ?
        """,
        (match, limit),
    ).fetchall()


def search(query, limit=5):
    terms = [f'"{t}"' for t in _terms(query)]
    if not terms:
        return []
    conn = sqlite3.connect(f"file:{DB_PATH}?mode=ro", uri=True)
    # Require all terms first (precise); fall back to any-term matching
    # (broad) to fill remaining slots.
    rows = _run(conn, " AND ".join(terms), limit)
    if len(rows) < limit and len(terms) > 1:
        seen = {row[2:4] + row[0:2] for row in rows}
        for row in _run(conn, " OR ".join(terms), limit * 2):
            if row[2:4] + row[0:2] not in seen and len(rows) < limit:
                rows.append(row)
    conn.close()
    return [
        {
            "title": title,
            "section": section,
            "url": f"https://www.home-assistant.io{url}",
            "domain": domain,
            "excerpt": " ".join(excerpt.split()),
            "score": round(-score, 2),
        }
        for title, section, url, domain, excerpt, score in rows
    ]


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("Usage: search.py <query> [limit]")
    limit = int(sys.argv[2]) if len(sys.argv) > 2 else 5
    for hit in search(sys.argv[1], limit):
        heading = f" › {hit['section']}" if hit["section"] else ""
        print(f"[{hit['score']}] {hit['title']}{heading}\n    {hit['url']}\n    {hit['excerpt'][:200]}\n")
