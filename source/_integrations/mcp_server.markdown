---
title: Model Context Protocol Server
description: Instructions on how to add a Model Context Protocol Server to Home Assistant.
ha_category:
  - Voice
ha_release: 2025.2
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

The [Model Context Protocol](https://modelcontextprotocol.io) is an open protocol that standardizes how applications provide context to <abbr title="Large Language Models">LLMs</abbr>. The **Model Context Protocol Server** (MCP) integration enables using Home Assistant to provide context for <abbr title="Model Context Protocol">MCP</abbr> LLM Client Applications. For example, you can expose your Google Tasks To-do list as a tool for Claude Desktop.

Controlling Home Assistant is done by providing <abbr title="Model Context Protocol">MCP</abbr> clients access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}.

## Prerequisites

- You need an [MCP client](https://modelcontextprotocol.io/clients) LLM Application such as [Claude for Desktop](https://claude.ai/download).
- Since most clients do not support native remote servers, you need an additional local MCP server remote gateway.

For detailed configuration instructions, refer to the [Client configuration](#client-configuration) section.

{% include integrations/config_flow.md %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Control Home Assistant:
  description: The API to use to expose tools over the Model Context Protocol. It is recommended
    to use **Stateless Assist** which is a version of the **Assist** API where the
    prompt does not contain any state information. Clients can only control or
    provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
{% endconfiguration_basic %}

## Architecture overview

This integration can provide similar functionality as other LLM-based conversation
agents (for example [Anthropic](/integrations/anthropic/), [Google Generative AI](/integrations/google_generative_ai_conversation), [Ollama](/integrations/ollama/), [Open AI](/integrations/openai_conversation/)). In those conversation agents, Home Assistant is the
client and prepares the available tools and passes them into the LLM with a prompt.

The Model Context Protocol follows a different pattern: An LLM application acts as
a client and can connect to multiple MCP servers to provide context. See the
[Model Context Protocol Introduction](https://modelcontextprotocol.io/introduction#general-architecture) for more details.

The Home Assistant Model Context Protocol Server integration implements the
[Server-Sent Events (SSE) transport](https://modelcontextprotocol.io/docs/concepts/transports#server-sent-events-sse)
allowing streaming client-to-server communication. Most MCP clients today only support
[stdio](https://modelcontextprotocol.io/docs/concepts/transports#standard-input-output-stdio) transport,
and directly run an MCP server as a local command line tool. You can
use an MCP proxy server like [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy)
to act as a gateway to the Home Assistant MCP SSE server.

## Client configuration

The Model Context Protocol specification does not yet define standards
for authentication and connecting to remote servers. These are a *work in progress*
and this configuration will likely change in the near future.

This guide focuses on two popular MCP clients:

- [Claude for Desktop](https://claude.ai/download) - A desktop application for interacting with Claude
- [Cursor Editor](https://cursor.sh/) - A code editor with AI capabilities

The following instructions will walk you through the setup process for these clients, but similar steps can be applied to other MCP-compatible applications.

### 1. Obtain an access token

First, you need to generate a long-lived access token from Home Assistant:

1. Visit your account profile settings, under the **Security** tab. {% my profile badge %}.
2. Create a **Long-lived access token**.
3. Copy the access token to use when configuring the MCP client LLM application.

For more information about Authentication in Home Assistant, refer to the [Authentication documentation](https://www.home-assistant.io/docs/authentication/#your-account-profile).

### 2. Verify server accessibility

Before proceeding, verify that your Home Assistant instance is accessible and the MCP Server integration is properly configured:

```bash
curl http://homeassistant.local:8123/mcp_server/sse
```

This should return `401: Unauthorized`, which confirms that the server is accessible and the MCP Server integration is installed.

### 3. Install the MCP proxy

The MCP proxy acts as a bridge between your LLM client and Home Assistant:

1. Install the MCP proxy:
   ```bash
   uv tool install git+https://github.com/sparfenyuk/mcp-proxy
   ```

2. Verify the installation and locate the absolute path:
   ```bash
   which mcp-proxy
   ```
   Note this absolute path for later configuration steps.

3. Test your configuration before setting it up in Cursor or Claude:
   ```bash
   env API_ACCESS_TOKEN=<YOUR TOKEN> /absolute/path/to/mcp-proxy http://homeassistant.local:8123/mcp_server/sse
   ```

   If the command runs without crashing, your setup is working correctly.

### 4. Configure your client

Depending on which client you're using, follow the appropriate configuration instructions:

#### Claude for Desktop

Claude for Desktop uses a JSON configuration file to set up MCP servers:

1. Download and install [Claude for Desktop](https://claude.ai/download).
2. Open the configuration file: Visit **Settings…** > **Developer** tab > **Edit Config**, which will open `claude_desktop_config.json`.
3. Add a new MCP server to the JSON file:
   ```json
   {
     "mcpServers": {
       "Home Assistant": {
         "command": "mcp-proxy",
         "env": {
           "API_ACCESS_TOKEN": "<YOUR KEY>"
         },
         "args": ["http://homeassistant.local:8123/mcp_server/sse"]
       }
     }
   }
   ```
4. Restart Claude.
5. You will see a connection icon {% icon "mdi:connection" %} if things are set up correctly. Clicking the icon will show enabled MCP servers including "Home Assistant".
6. Select the prompt provided by Home Assistant and start interacting with your home.

![Screenshot of Claude for Desktop adding an item to a Home Assistant To-do list](/images/integrations/mcp_server/claude-todo-list-control.png)

#### Cursor Editor in the UI

Cursor's UI provides a simple way to set up the MCP connection:

1. From the MCP tab in your settings panel
2. Click "Add new MCP server"
3. Select "command" under Type
4. Under "Command" input:
   ```shell
   env API_ACCESS_TOKEN=<YOUR TOKEN> /absolute/path/to/mcp-proxy http://homeassistant.local:8123/mcp_server/sse
   ```

> Cursor handles relative paths to `mcp-proxy`, while Claude requires absolute paths.

#### Shared configuration using `.cursor/mcp.json`

If you want to use both Claude and Cursor with the same configuration, you can create a shared configuration file:

1. Create or edit `.cursor/mcp.json` in your workspace
2. Create a symlink from `.cursor/mcp.json` to Claude's configuration path
3. Use this configuration format which works in both Cursor and Claude:

> Cursor does not support the `env` configuration key, so we need to pass the `API_ACCESS_TOKEN` in the `args` array.

```json
"homeassistant": {
  "command": "env",
  "args": [
    "API_ACCESS_TOKEN=<YOUR KEY>",
    "/absolute/path/to/mcp-proxy",
    "http://homeassistant.local:8123/mcp_server/sse"
  ]
}
```

> Use the absolute path to `mcp-proxy` that you found earlier with the `which mcp-proxy` command.

#### Claude-only configuration using `.cursor/mcp.json`

If you only need to use Claude, you can use the `env` configuration key which is not supported by Cursor:

```json
"homeassistant": {
  "command": "/absolute/path/to/mcp-proxy",
  "args": ["http://homeassistant.local:8123/mcp_server/sse"],
  "env": {
    "API_ACCESS_TOKEN": "<YOUR KEY>"
  }
}
```

## Supported functionality

### Tools

[MCP Tools](https://modelcontextprotocol.io/docs/concepts/tools) enable LLMs to
perform actions through Home Assistant. The tools used by the configured LLM API
are exposed.

### Prompts

The [MCP Prompts](https://modelcontextprotocol.io/docs/concepts/prompts) provided
inform LLMs how to call the tools. The tools used by the configured LLM API
are exposed.

It is recommended to use the **Stateless Assist** API since the prompt does
not contain any state information, which will be incorrect after any actions
are performed.


## Known Limitations

The Home Assistant Model Context Protocol integration currently only supports a
subset of MCP features:

| Feature | Supported by Home Assistant |
| ------- | --------- |
| Prompts | ✅ |
| Tools | ✅ |
| Resources | ❌ |
| Sampling | ❌ |
| Notifications | ❌ |

Home Assistant does not yet provide built-in tools that can fetch device state.

## Troubleshooting

This section has troubleshooting information for Claude for Desktop since it is
the primary client. Also see [Debugging in Claude Desktop](https://modelcontextprotocol.io/docs/tools/debugging#debugging-in-claude-desktop).

### LLM client cannot connect to Home Assistant MCP server

#### Symptom: Failed to start MCP server: Could not start MCP server Home Assistant

When trying to configure a client like Claude for Desktop to talk to Home Assistant, the app shows a
message like "Failed to start MCP server: Could not start MCP server Home Assistant"

##### Description

This means that the local MCP server `mcp-proxy` could not start.

##### Resolution

Verify the command line arguments in the `claude_desktop_config.json` are correct. You may try to run
the command manually to verify that the command can be found.

#### Symptom: "MCP server Home Assistant disconnected" or "Could not attach to MCP server Home Assistant"

When trying to configure a client like Claude Desktop to talk to Home Assistant, the app shows a
message like "MCP server Home Assistant disconnected" or "Could not attach to MCP server Home Assistant".

##### Description

This means the MCP server has started, however the MCP server is having trouble communicating with Home Assistant,
or the MCP server in Home Assistant is not configured.

##### Resolution

To understand the root cause, first check debug logs on the client. For example in Claude for Desktop:

1. Visit **Settings...**.
2. Select **Developer**.
3. Select the `Home Assistant` MCP server.
4. Select **Open Logs Folder**.
5. View `mcp-server-Home Assistant.log`. These are known problems and their resolution:
   - `Client error '404 Not Found' for url 'http://localhost:8123/mcp_server/sse'`:
     this means the MCP Server integration is not configured in Home Assistant.
   - `Client error '401 Unauthorized' for url 'http://localhost:8123/mcp_server/sse'`:
     this means that the long live access token is not correct.
...

## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
