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

### Access control

For now, we can use
[Long-lived access token](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token) to control access to the API.

1. Visit your account profile settings, under the **Security** tab. {% my profile badge %}.

2. Create a **Long-lived access token**

3. Copy the access token to use when configuring the MCP client LLM application.

For more information about Authentication in Home Assistant, refer to the [Authentication documentation](https://www.home-assistant.io/docs/authentication/#your-account-profile).

### Example: Claude for Desktop

See [MCP Quickstart: For Claude Desktop Users](https://modelcontextprotocol.io/quickstart/user#for-claude-desktop-users)
for a detailed guide on using Claude for Desktop with an MCP server. It is recommended
to get the example server working first before using the Home Assistant MCP Server.

Claude for Desktop currently only supports local MCP servers using the [stdio](https://modelcontextprotocol.io/docs/concepts/transports#standard-input-output-stdio)
transport, run as a local command line tool. You can use a local MCP proxy server
to allow Claude for Desktop to access Home Assistant using the SSE transport.

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
6. You will see a connection icon {% icon "mdi:connection" %} if things are set up correctly. Clicking the connection icon will show enabled MCP servers such as *Home Assistant*.
7. Select the prompt provided by Home Assistant.
8. You can then use Claude to control Home Assistant similar to how you control Home Assistant through the Voice Assistant. Claude wil ask you for permission before calling any tools.

  ![Screenshot of Claude for Desktop adding an item to a Home Assistant To-do list](/images/integrations/mcp_server/claude-todo-list-control.png)


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

#### Symptom: “MCP server Home Assistant disconnected” or "Could not attach to MCP server Home Assistant"

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
