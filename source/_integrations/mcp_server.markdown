---
title: Model Context Protocol Server
description: Expose Home Assistant Large Language Model APIs through the Model Context Protocol.
ha_category:
  - Voice
ha_release: 2025.10
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@allenporter'
ha_domain: mcp_server
ha_integration_type: service
related:
  - docs: /integrations/conversation/
    title: Conversation
ha_quality_scale: silver
---

The [Model Context Protocol](https://modelcontextprotocol.io) is an open standard for exposing tools, prompts, and contextual data to <abbr title="Large Language Models">LLMs</abbr>. The **Model Context Protocol Server** integration turns Home Assistant into a fully compliant MCP server so MCP clients, such as Claude for Desktop, Cursor, FastMCP-compatible deskktop assistants, IDE extensions or custom agents can call Home Assistant tools and prompts. You can, for example, control lights from Claude Desktop, run automations from Cursor, or expose Home Assistant lists to any MCP-aware agent.

When this integration is enabled, the Assist API (or any other configured Home Assistant LLM API) becomes accessible to MCP clients. You retain full control over which entities or devices are exposed through the {% my voice_assistants title="exposed entities page" %}.

## Prerequisites

- An [MCP client](https://modelcontextprotocol.io/clients) such as [Claude for Desktop](https://claude.ai/download), [Cursor](https://www.cursor.com), or any FastMCP-compatible tool.
- A Home Assistant LLM API configured (Assist, Anthropic, Gemini, Ollama, etc.).
- Either:
  - An MCP gateway (for example [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy)) if your client only supports local `stdio`.
  - A client that can connect directly to HTTP(S) endpoints using the MCP streamable HTTP transport.
- A Home Assistant access token (long-lived access token or OAuth consent flow).

{% include integrations/config_flow.md %}

## Configuration options

{% configuration_basic %}
Control Home Assistant:
  description: Whether MCP clients may call Home Assistant tools. Access remains limited to the entities that are [exposed](/voice_control/voice_remote_expose_devices/).
{% endconfiguration_basic %}

## Architecture overview

Traditional LLM integrations (Anthropic, Google Generative AI Conversation, Ollama, OpenAI) treat Home Assistant as the client: Home Assistant gathers tools, prepares prompts, and sends them to the LLM. MCP reverses that direction. Here, the LLM application is the client and connects to one or more MCP servers, Home Assistant among them to request prompts and call tools.

The Home Assistant MCP Server implementation now uses [FastMCP](https://github.com/modelcontextprotocol/fastmcp) and supports both the [Server-Sent Events (SSE) transport](https://modelcontextprotocol.io/docs/concepts/transports#server-sent-events-sse) and the newer [streamable HTTP transport](https://modelcontextprotocol.io/docs/concepts/transports#streamable-http-sse-over-http). Streamable HTTP:

- Keeps a single HTTP connection open for bidirectional JSON-RPC traffic.
- Stores outbound messages in an in-memory event store so reconnecting clients can resume with `Last-Event-ID`.
- Mirrors CORS headers on every response so browser-based IDEs can connect without reverse proxies.

Most current MCP clients still require a local proxy (for example `mcp-proxy`) to bridge `stdio` to HTTP, but any FastMCP-based or browser-based client can now talk to Home Assistant directly.

## MCP endpoints and transports

All endpoints are served under `/mcp_server`:

| Endpoint | Purpose |
| -------- | ------- |
| `/mcp_server/sse` | Primary SSE stream. Clients receive an `endpoint` event on connect that points to the message ingress URL. |
| `/mcp_server/messages/{session_id}` | Accepts JSON-RPC requests for the active SSE session. |
| `/mcp_server/mcp` | Streamable HTTP endpoint supporting resumable sessions, reconnection, and browser CORS. |

### Event store & resumable sessions

Outbound messages are stored per stream (default 100 events) in the server	219;s in-memory event store. When a client reconnects with the `Last-Event-ID`, missed events are replayed before live traffic resumes. If you scale Home Assistant horizontally, replace the in-memory store with a shared backend (Redis, database, message bus) that preserves the `EventStore` interface.

### CORS and browser clients

The streamable HTTP endpoint mirrors the caller	219;s `Origin`, allows `Authorization`, `MCP-Session-ID`, and `Content-Type`, and responds to `OPTIONS` requests. This means IDEs like VS Code or web-based tools like Copilot M365 can interact with Home Assistant without additional gateways.

## Client configuration

The MCP specification continues to evolve	219;OAuth scopes, remote discovery, and client UX are still being standardized. Some clients support only `stdio`, while others now support remote HTTP transports. Adapt the instructions below to match your client	219;s capabilities.

### Access control

#### OAuth

Home Assistant MCP server fully supports the MCP OAuth flow defined in the [2025-03-26 specification](https://spec.modelcontextprotocol.io/specification/2025-03-26/basic/authorization/). Home Assistant uses [IndieAuth](https://indieauth.spec.indieweb.org/), so no pre-registered client IDs are required	219;the client ID is the origin of your redirect URI.

- *Client ID*: If the redirect URI is `https://www.example.com/mcp/redirect`, use `https://www.example.com`.
- *Client secret*: Not required by Home Assistant (provide any placeholder if your client insists).

#### Long-lived access tokens

If your MCP client lacks OAuth, use a [long-lived access token](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token):

1. Visit your account profile settings, under the **Security** tab. {% my profile badge %}.
2. Create a **Long-lived access token**.
3. Copy the token; your MCP client will send it as `Authorization: Bearer <token>`.

More background is available in [Home Assistant Authentication](https://www.home-assistant.io/docs/authentication/#your-account-profile).

### Example: Claude for Desktop

1. Download [Claude for Desktop](https://claude.ai/download). 
2. Install `mcp-proxy` following the instructions in the [README](https://github.com/sparfenyuk/mcp-proxy).
   For example, `uv tool install git+https://github.com/sparfenyuk/mcp-proxy`.
3. Open the configuration file. Visit **Settings…** and on the **Developer** tab, select **Edit Config**.
   which will edit `claude_desktop_config.json`. The full file location depends on your
   operating system (macOS or Windows).
4. Add a new MCP server to the JSON file. You need to set the `SSE_URL` to the URL you use to
   connect to Home Assistant with the path `/mcp_server/sse`. You will also need to set `API_ACCESS_TOKEN`
   to the long live access token created above in the [access control instructions](#access-control)
```json
{
  "mcpServers": {
    "Home Assistant": {
      "command": "mcp-proxy",
      "env": {
        "SSE_URL": "http://localhost:8123/mcp_server/sse",
        "API_ACCESS_TOKEN": "<your_access_token_here>"
      }
    }
  }
}
```

5. Restart Claude.
6. Confirm the connection icon {% icon "mdi:connection" %} shows *Home Assistant*.
7. Select the Home Assistant prompt and follow Claude's permission prompts when tools run.
8. You can now control Home Assistant similarly to using a voice assistant.

![Screenshot of Claude for Desktop adding an item to a Home Assistant to-do list](/images/integrations/mcp_server/claude-todo-list-control.png)

### Example: Cursor

1. Download [Cursor](https://www.cursor.com).
2. Install `mcp-proxy`.
3. Open **Settings 	'; MCP**, and click **Add new global MCP server**.
4. Configure Home Assistant. You can include both SSE and streamable URLs; Cursor currently uses SSE via the proxy:

```json
{
  "mcpServers": {
    "Home Assistant": {
      "command": "mcp-proxy",
      "args": [
        "http://localhost:8123/mcp_server/sse"
      ],
      "env": {
        "API_ACCESS_TOKEN": "<your_access_token_here>"
      }
    }
  }
}
```

5. Save `mcp.json` (`$HOME/.cursor/mcp.json`).
6. Restart Cursor and verify the Home Assistant server indicator is green.
7. In chat mode (Ctrl+I), ask the assistant to control Home Assistant	';Cursor will invoke the Home Assistant tools.

![Screenshot of Cursor controlling the office lights](/images/integrations/mcp_server/cursor-lights-control.png)

## Supported functionality

### Tools

[MCP Tools](https://modelcontextprotocol.io/docs/concepts/tools) exposed by the selected Home Assistant LLM API are made available to the MCP client. Permissions remain governed by the LLM API configuration and the exposed-entities list.

### Prompts

[MCP Prompts](https://modelcontextprotocol.io/docs/concepts/prompts) mirror the LLM API	's;s default system prompt. Home Assistant publishes the LLM-specific instructions so clients can see how to call the tools.

### Transport summary

| Feature | Supported by Home Assistant |
| ------- | --------------------------- |
| Prompts | ✅ |
| Tools | ✅ |
| Streamable HTTP (resumable) | ✅ |
| SSE | ✅ |
| Resources | ❌ |
| Sampling | ❌ |
| Notifications | ❌ |

## Troubleshooting

See [Debugging in Claude Desktop](https://modelcontextprotocol.io/docs/tools/debugging#debugging-in-claude-desktop) for client-side log capture. Additional Home Assistant-specific tips are below.

### Client cannot connect to Home Assistant

#### Symptom: 	201Failed to start MCP server: Could not start MCP server Home Assistant	201

`mcp-proxy` could not start, often due to a missing executable or incorrect arguments.

**Resolution:** Verify the command and environment variables in `claude_desktop_config.json`. Try running the command manually to ensure `mcp-proxy` is available.

#### Symptom: 	201MCP server Home Assistant disconnected	201 or 	201Could not attach to MCP server Home Assistant	201

The proxy started, but it cannot reach Home Assistant or authentication failed.

**Resolution:**

1. Open the client	's;s MCP logs (for Claude Desktop: **Settings 	's; Developer 	's; Open Logs Folder**).
2. Check `mcp-server-Home Assistant.log` for errors:
   - `404 Not Found`: The integration is not configured or the URL path is incorrect.
   - `401 Unauthorized`: Token is invalid or missing.
   - `425 Too Early` / `503`: Home Assistant is still starting; retry.
   - `Event store replay failed`: The `Last-Event-ID` is unknown. Ensure the client handles reconnections correctly, or clear the stored event ID.
3. For browser/IDE clients, use the streamable HTTP endpoint (`/mcp_server/mcp`) and confirm that CORS headers match your origin.

### Streamable HTTP reconnect issues

If reconnecting clients lose state:

- Confirm the client sends the `Last-Event-ID` header.
- Increase the `max_events_per_stream` setting (requires custom component override) or deploy a shared event store backend if you run multiple Home Assistant instances.

## Removing the integration

{% include integrations/remove_device_service.md %}
