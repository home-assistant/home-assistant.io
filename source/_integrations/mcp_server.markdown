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

The [Model Context Protocol](https://modelcontextprotocol.io) is an open protocol that standardizes how applications provide context to <abbr title="Large Language Models">LLMs</abbr>. The **Model Context Protocol Server** (MCP) integration enables using Home Assistant to provide context for <abbr title="Model Context Protocol">MCP</abbr> LLM Client Applications. For example, you can control your lights from Claude Desktop, or expose your Google Tasks to-do list as a tool.

Controlling Home Assistant is done by providing <abbr title="Model Context Protocol">MCP</abbr> clients access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}.

## Prerequisites

- You need an [MCP client](https://modelcontextprotocol.io/clients) LLM Application such as [Claude for Desktop](https://claude.ai/download).
- If your client does not support remote servers, you need an additional local MCP server remote gateway.

For detailed configuration instructions, refer to the [Client configuration](#client-configuration) section.

{% include integrations/config_flow.md %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Control Home Assistant:
  description: If MCP clients are allowed to control Home Assistant. Clients can only
    control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
{% endconfiguration_basic %}

## Architecture overview

This integration can provide similar functionality as other LLM-based conversation
agents (for example [Anthropic](/integrations/anthropic/), [Google Generative AI](/integrations/google_generative_ai_conversation), [Ollama](/integrations/ollama/), [Open AI](/integrations/openai_conversation/)). In those conversation agents, Home Assistant is the
client and prepares the available tools and passes them into the LLM with a prompt.

The Model Context Protocol follows a different pattern: An LLM application acts as
a client and can connect to multiple MCP servers to provide context. See the
[Model Context Protocol Introduction](https://modelcontextprotocol.io/introduction#general-architecture) for more details.

The Home Assistant Model Context Protocol Server integration implements the
[Streamable HTTP protocol](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http)
allowing client-to-server communication using the stateless protocol. Some MCP clients only support
[stdio](https://modelcontextprotocol.io/docs/concepts/transports#standard-input-output-stdio) transport,
and directly run an MCP server as a local command line tool. You can 
use an MCP proxy server like [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy)
to act as a gateway to the Home Assistant MCP SSE server.

## Client configuration

The Model Context Protocol specification has recently defined standards for
authorization and connecting to remote servers. The standards are a *work in progress*
and so some clients may not support the latest functionality, and the specification
will likely continue to evolve.

The Home Assistant MCP server is exposed as `/api/mcp` and requires the
client to provide an authentication token.

### Access control

#### OAuth

The Model Context Protocol supports OAuth for [Authorization](https://spec.modelcontextprotocol.io/specification/2025-03-26/basic/authorization/) and is fully supported by Home Assistant's
[Authentication API](https://developers.home-assistant.io/docs/auth_api/). MCP
Clients that support OAuth can use this to allow you to give the client access
to your Home Assistant MCP server.

Home Assistant has adopted [IndieAuth](https://indieauth.spec.indieweb.org/) and does not require you to pre-define
an OAuth Client ID. Instead, the Client ID is the base of the redirect URL.

- *Client ID*: If your redirect-uri is `https://www.example.com/mcp/redirect`, your client ID should be `https://www.example.com`.
- *Client Secret*: This is not used by Home Assistant and can be ignored or set to any value.

#### Long-Lived Access Tokens

Some MCP clients may not support OAuth, but may support access tokens. You may create a
[Long-lived access token](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token) to allow the client to access the API.

1. Visit your account profile settings, under the **Security** tab. {% my profile badge %}.

2. Create a **Long-lived access token**

3. Copy the access token to use when configuring the MCP client LLM application.

For more information about Authentication in Home Assistant, refer to the [Authentication documentation](https://www.home-assistant.io/docs/authentication/#your-account-profile).

### Example: Claude for Desktop

Claude for Desktop now supports remote MCP servers, making it extremely easy to connect to your
Home Assistant instance:

1. Download [Claude for Desktop](https://claude.ai/download) and log in.
2. Click your profile name, select **Settings**, and go to **Connectors**.
3. Click **Add Custom Connector**.
4. Enter the following details:
   - **Name**: "Home Assistant" (or any more descriptive name you prefer)
   - **Remote MCP Server URL**: `https://<your_home_assistant_url>/api/mcp`
   - Under advanced settings:
     - **OAuth Client ID**: `https://claude.ai`
     - **OAuth Client Secret**: Leave this blank
5. Click **OK**. Now click **Connect** next to the entry created with the name you provided above.
6. Log in to your Home Assistant instance and allow the redirect back to Claude Desktop.
7. You can now enable tools from Home Assistant when chatting with Claude, allowing you to control Home Assistant in a similar way to how you control it through the Voice Assistant. Claude will ask you for permission before calling any tools.

   ![Screenshot of Claude for Desktop adding an item to a Home Assistant To-do list](/images/integrations/mcp_server/claude-todo-list-control.png)

### Example: Cursor

1. Download and install [Cursor](https://www.cursor.com).
2. Install `mcp-proxy` following the instructions in the [README](https://github.com/sparfenyuk/mcp-proxy).
   For example, `uv tool install git+https://github.com/sparfenyuk/mcp-proxy`.
3. Open the main Cursor Settings and select **MCP**.
4. Click **Add new global MCP server** and add the Home Assistant server configuration:
   ```json
    {
      "mcpServers": {
        "Home Assistant": {
          "command": "mcp-proxy",
          "args": [
            "--transport=streamablehttp",
            "--stateless",
            "http://localhost:8123/api/mcp"
          ],
          "env": {
            "API_ACCESS_TOKEN": "<your_access_token_here>"
          }
        }
      }
    }
    ```
5. Save your `mcp.json` file. You can also find this file in the `$HOME/.cursor/mcp.json` directory.
6. Restart Cursor and return to the MCP settings. You should see the Home Assistant server in the list. The indicator should be green.
7. In chat agent mode (Ctrl+I), ask it to control your home and the tool should be used.

![Screenshot of Cursor controlling the office lights](/images/integrations/mcp_server/cursor-lights-control.png)

### Example: gemini-cli

1.  Install `gemini-cli` if you haven't already. You can find installation instructions at [https://geminicli.com/](https://geminicli.com/).
2.  Open the `gemini-cli` configuration file. This is usually located at `~/.gemini/settings.json`. For more details, refer to the [gemini-cli MCP server documentation](https://geminicli.com/docs/tools/mcp-server/).
3.  Add the following to your `mcpServers` configuration:

    ```json
    {
      "mcpServers": {
        "homeassistant": {
          "httpUrl": "https://<your_home_assistant_url>/api/mcp",
          "headers": {
            "Authorization": "Bearer ${HOMEASSISTANT_TOKEN}"
          }
        }
      }
    }
    ```

4.  Replace `<your_home_assistant_url>` with the URL of your Home Assistant instance.
5.  Set the `HOMEASSISTANT_TOKEN` environment variable to a [Long-Lived Access Token](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token) from your Home Assistant instance.
6.  Save the file. You can now use Home Assistant tools within `gemini-cli`.

## Supported functionality

### Tools

[MCP Tools](https://modelcontextprotocol.io/docs/concepts/tools) enable LLMs to
perform actions through Home Assistant. The tools used by the configured LLM API
are exposed.

### Prompts

The [MCP Prompts](https://modelcontextprotocol.io/docs/concepts/prompts) provided
inform LLMs how to call the tools. The tools used by the configured LLM API
are exposed.

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
   - `Client error '404 Not Found' for url 'http://localhost:8123/api/mcp'`:
     this means the MCP Server integration is not configured in Home Assistant.
   - `Client error '401 Unauthorized' for url 'http://localhost:8123/api/mcp'`:
     this means that the long live access token is not correct.
...

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
