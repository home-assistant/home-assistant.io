#!/usr/bin/env python3
"""MCP server exposing Home Assistant documentation search as an LLM tool.

Runs over SSE, which is the transport the Model Context Protocol
integration in Home Assistant speaks. Point that integration at
http://<host>:8131/sse and every conversation agent in Home Assistant
gains a `search_documentation` tool.

Requires: pip install mcp

Usage:
    python3 mcp_server.py [port]
"""

import sys

from mcp.server.fastmcp import FastMCP

from search import search

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8131
mcp = FastMCP("home-assistant-docs", host="0.0.0.0", port=port)


@mcp.tool()
def search_documentation(query: str, limit: int = 5) -> list[dict]:
    """Search the official Home Assistant documentation at
    www.home-assistant.io.

    Use this to answer questions about setting up, configuring, or
    troubleshooting Home Assistant, its integrations, automations,
    dashboards, voice assistants, and add-ons.

    Use short keyword queries (like "zigbee network setup" rather than a
    full sentence). If the results don't answer the question, try again
    with different keywords. Each result contains the page title, section
    heading, URL, and a text excerpt. Cite the URL when answering.
    """
    return search(query, min(limit, 10))


if __name__ == "__main__":
    print(f"MCP docs-search server on http://0.0.0.0:{port}/sse")
    mcp.run(transport="sse")
