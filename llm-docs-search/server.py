#!/usr/bin/env python3
"""Minimal HTTP JSON API in front of the documentation index.

Dependency-free (Python standard library only). In production this layer
would be a thin stateless service behind a CDN; the response is fully
cacheable per query string.

Usage:
    python3 server.py [port]

    GET /search?q=<query>&limit=<n>   -> JSON list of results
    GET /healthz                      -> ok
"""

import json
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

from search import search

MAX_LIMIT = 10


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/healthz":
            return self._send(200, "ok", "text/plain")
        if parsed.path != "/search":
            return self._send(404, '{"error": "not found"}')
        params = parse_qs(parsed.query)
        query = (params.get("q") or [""])[0].strip()
        if not query:
            return self._send(400, '{"error": "missing q parameter"}')
        limit = min(int((params.get("limit") or ["5"])[0]), MAX_LIMIT)
        results = search(query, limit)
        body = json.dumps({"query": query, "results": results}, indent=2)
        self._send(200, body, cache="public, max-age=3600")

    def _send(self, status, body, content_type="application/json", cache=None):
        data = body.encode()
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        if cache:
            self.send_header("Cache-Control", cache)
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, fmt, *args):
        print(f"{self.address_string()} {fmt % args}")


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8130
    print(f"Serving documentation search on http://0.0.0.0:{port}/search?q=...")
    ThreadingHTTPServer(("0.0.0.0", port), Handler).serve_forever()
