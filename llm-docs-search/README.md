# LLM documentation search (prototype)

A prototype of a public search service that lets LLM conversation agents in
Home Assistant look things up in the documentation on www.home-assistant.io.

**Status: exploration/prototype — not part of the website build.**

## What it does

1. `build_index.py` walks the Markdown sources of this repository
   (`_integrations`, `_docs`, `voice_control`, `getting-started`, and so on),
   strips front matter and Liquid tags, splits every page into
   heading-based chunks, and writes them to an SQLite FTS5 (BM25) index.
   Result: ~1,700 pages, ~8,000 chunks, 14 MB.
2. `search.py` ranks chunks with BM25 (title hits weighted over section
   headings over body text), requiring all query terms first and falling
   back to any-term matching. Stopwords from natural-language questions
   are removed.
3. Two front ends on top of the same index:
   - `server.py` — a dependency-free HTTP JSON API:
     `GET /search?q=zigbee+network&limit=5`. Responses are cacheable per
     query string.
   - `mcp_server.py` — a Model Context Protocol server (SSE transport,
     requires `pip install mcp`) exposing a `search_documentation` tool.
     Point the [MCP integration](https://www.home-assistant.io/integrations/mcp/)
     in Home Assistant at `http://<host>:8131/sse` and every conversation
     agent gains documentation search.

## Try it

```bash
python3 build_index.py           # builds docs.db from ../source
python3 search.py "zigbee network setup"
python3 server.py 8130           # JSON API
python3 mcp_server.py 8131       # MCP server (pip install mcp)
```

## Design notes for a production version

- **Keyword search, not embeddings, as the baseline.** The caller is an
  LLM: it writes good keyword queries and retries with new terms when the
  first attempt misses (the tool description tells it to). That removes
  the need for an embedding model in the request path, which is the main
  cost and scaling concern for a public, unauthenticated service. Hybrid
  (BM25 + vectors) can be added later if evaluation shows it is needed.
- **Indexing is a build step, not a crawler.** The docs are Markdown in
  this repository; the chunker runs in CI on every push to `current`,
  the same way the site deploys. The index is versioned and immutable,
  so the serving layer is stateless and trivially replaceable.
- **Serving layer.** For real deployment, replace SQLite with an open
  source search engine that has the same shape (BM25 + field weights):
  Typesense or Meilisearch are both a good fit and simple to operate.
  Because the corpus is small and read-only, replicas scale horizontally
  behind the existing CDN, and responses cache well (`Cache-Control` per
  query string).
- **MCP is the delivery mechanism.** Home Assistant already ships an MCP
  client integration, so no new core code is required for users to adopt
  this. A hosted endpoint (for example `mcp.home-assistant.io`) could
  later be preconfigured for Assist.
