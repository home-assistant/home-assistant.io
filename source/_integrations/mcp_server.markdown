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

Controlling Home Assistant is done by providing <abbr title="Model Context Protocol">MCP</abbr> clients with access to Home Assistant's Assist API. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}, and your <abbr title="Model Context Protocol">MCP</abbr> client can also read a real-time snapshot of that context. This gives your AI assistant a clear picture of your home's current state.

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

### Exposing a specific LLM API

The `/api/mcp` endpoint serves the LLM API you select when you set up the
integration. If you have more than one LLM API available, you can also connect a
client to a specific one by adding its ID to the URL:

`/api/mcp/<api_id>`

For example, the built-in Assist API is always available at `/api/mcp/assist`.
Point your MCP client at this URL in the same way you would use the base
`/api/mcp` endpoint. If you request an API ID that does not exist, Home Assistant
responds with a 404 Not Found error.

Connecting to any API other than Assist requires the authenticated user to be an
administrator. The Assist API stays available to non-administrator users, just
like the base `/api/mcp` endpoint.

### Access control

#### OAuth

The Model Context Protocol supports OAuth for [Authorization](https://spec.modelcontextprotocol.io/specification/2025-03-26/basic/authorization/) and is fully supported by Home Assistant's
[Authentication API](https://developers.home-assistant.io/docs/auth_api/). MCP
Clients that support OAuth can use this to allow you to give the client access
to your Home Assistant MCP server.

Home Assistant has adopted [IndieAuth](https://indieauth.spec.indieweb.org/) and does not require you to pre-define
an OAuth Client ID. Instead, the Client ID is the base URL of the client application making the request.

- *Client ID*: This is the base URL of the LLM application configuring the connector (for example, `https://claude.ai` for Claude, or `https://chatgpt.com` for ChatGPT). It should **not** be your Home Assistant server's URL.
- *Client Secret*: This is not used by Home Assistant. If the client strictly requires a value, you can put any random text or leave it blank.

#### Long-Lived Access Tokens

Some MCP clients may not support OAuth, but may support access tokens. You may create a
[Long-lived access token](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token) to allow the client to access the API.

1. Go to {% my profile_security title="**User profile** > **Security**" %}.
2. Under **Long-lived access tokens**, select **Create token**.
3. Copy the access token to use when configuring the MCP client LLM application.

For more information about authentication in Home Assistant, refer to the [Authentication documentation](/docs/authentication/).

### Example: Claude for Desktop

Claude for Desktop can connect to Home Assistant using either a cloud-based remote connector or a local MCP proxy server.

**Option 1: Remote connector (requires public Home Assistant URL)**

When using a remote custom connector in Claude for Desktop, the connection is brokered through Anthropic's cloud infrastructure. This means your Home Assistant instance must be publicly accessible from the internet.

1. Download [Claude for Desktop](https://claude.ai/download) and log in.
2. Select **Customize** from the side menu, and then **Connectors**.
3. Select **+** in the **Connectors** pane, and then select **Add Custom Connector**.
4. Enter the following details:
   - **Name**: "Home Assistant" (or any more descriptive name you prefer)
   - **Remote MCP Server URL**: `https://<your_home_assistant_external_url>/api/mcp`
   - Under advanced settings:
     - **OAuth Client ID**: `https://claude.ai`
     - **OAuth Client Secret**: Leave this blank
5. Select **Add**. Then select **Connect** next to the entry created with the name you provided above.
6. Log in to your Home Assistant instance and allow the redirect back to Claude Desktop.
7. You can now enable tools from Home Assistant when chatting with Claude, allowing you to control Home Assistant in a similar way to how you control it through the Voice Assistant. Claude will ask you for permission before calling any tools.

   ![Screenshot of Claude for Desktop adding an item to a Home Assistant To-do list](/images/integrations/mcp_server/claude-todo-list-control.png)

**Option 2: Local MCP proxy server (for internal/local Home Assistant URLs)**

If your Home Assistant instance is only accessible on your local network (for example, `http://homeassistant.local:8123` or `http://192.168.1.10:8123`) or behind a VPN, you can use a local MCP proxy. This allows Claude Desktop to connect directly from your computer without routing through Anthropic's cloud.

1. Make sure you have a [Long-lived access token](#long-lived-access-tokens) from your Home Assistant account.
2. Install `mcp-proxy` following the instructions in the [README](https://github.com/sparfenyuk/mcp-proxy). For example: `uv tool install git+https://github.com/sparfenyuk/mcp-proxy`.
3. Locate your Claude Desktop configuration file (for example, `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS or `%APPDATA%\Claude\claude_desktop_config.json` on Windows).
4. Add the following to your `mcpServers` configuration:

   ```json
   {
     "mcpServers": {
       "Home Assistant": {
         "command": "mcp-proxy",
         "args": [
           "--transport=streamablehttp",
           "--stateless",
           "http://<your_local_home_assistant_ip_or_url>:8123/api/mcp"
         ],
         "env": {
           "API_ACCESS_TOKEN": "<your_access_token_here>"
         }
       }
     }
   }
   ```
5. Restart Claude for Desktop to connect.

### Example: ChatGPT

ChatGPT supports connecting to remote Model Context Protocol servers for Plus, Pro, Business, and Enterprise/Edu users. ChatGPT currently only supports remote connections, which means your Home Assistant instance must be publicly accessible from the internet.

1. Log in to [ChatGPT](https://chatgpt.com). Ensure developer mode is enabled for your account (this can be toggled in **Settings** > **Apps** > **Advanced Settings**).
2. Navigate to **Workspace settings** (or user settings), select **Apps**, and select **Create**.
3. Enter the following details:
   - **Name**: "Home Assistant" (or any name you prefer).
   - **MCP Server URL**: `https://<your_home_assistant_external_url>/api/mcp`
   - Select **OAuth** for the authentication mechanism. ChatGPT will attempt to auto discover OAuth settings. If this does not work you will need to manually enter the settings under **Advanced OAuth Settings** > **User defined oauth client**:
     - Under **Client registration**:
       - **OAuth Client ID**: `https://chatgpt.com`
       - **OAuth Client Secret**: Enter any random text (it is not used by Home Assistant, but the ChatGPT configuration form may require a value).
       - **Token endpoint auth method**: `client_secret_post`
     - Under **OAuth endpoints**:
       - **Auth URL**: `https://<your_home_assistant_external_url>/auth/authorize`
       - **Token URL**: `https://<your_home_assistant_external_url>/auth/token`
       - **Authorization server base**: `https://<your_home_assistant_external_url>`
4. Select **Create**. Once created, the app will appear in your **Enabled Apps**.
5. Begin a new chat in ChatGPT, open the apps menu, and select your newly created Home Assistant app. ChatGPT will prompt you to authenticate, which will redirect you to Home Assistant to log in and authorize the connection.

### Example: Claude Code

Claude Code supports remote MCP servers, making it easy to connect to your Home Assistant instance:

1. Install [Claude Code](https://claude.com/product/claude-code) and log in.
2. In your shell, run the following command:

   ```bash
   claude mcp add-json "HA" '{
     "type": "http",
     "url": "https://<your_home_assistant_url>/api/mcp",
     "oauth": {
       "clientId": "http://localhost:12345",
       "callbackPort": 12345
     }
   }' --client-secret
   ```
   The name `"HA"`, the URL `"https://<your_home_assistant_url>"`, and the callback port `"12345"` are examples; adjust them to match your setup. *(Note: `clientId: "http://localhost:12345"` is correct for the Claude Code CLI's internal local callback server. Do not change this to your Home Assistant URL.)*

3. Start `claude` and type `/mcp`. Navigate to your MCP listing (for example, **HA**) and press Enter. Select **Authenticate** to open a web browser to your Home Assistant login page.
4. After you authenticate to your Home Assistant server, Home Assistant will tell you that you can close the web browser.
5. You can now enable tools from Home Assistant when chatting with Claude, allowing you to control Home Assistant in a similar way to how you control it through the Voice Assistant. Claude will ask you for permission before calling any tools.

### Example: Codex

Codex can connect to Home Assistant as a remote MCP server by using OAuth:

1. Install [Codex](https://developers.openai.com/codex/cli/) and sign in.
2. Open `.codex/config.toml` in your project. To make the server available in every project, open `~/.codex/config.toml` instead.
3. Add the following root-level setting before the first TOML table header in the file:

   ```toml
   mcp_oauth_callback_port = 12345
   ```

4. Add the Home Assistant MCP server configuration. You can add this table at the end of the file:

   ```toml
   [mcp_servers.homeassistant]
   url = "<your_home_assistant_url>/api/mcp"
   auth = "oauth"
   oauth = { client_id = "http://127.0.0.1:12345" }
   ```

   Replace `<your_home_assistant_url>` with the complete URL of your Home Assistant server, including `http://` or `https://` and the port, if required. For example, use `http://homeassistant.local:8123` for a typical local connection. The callback port and the port in `client_id` must match. The `client_id` value is the base URL of the local OAuth callback used by Codex; do not replace it with your Home Assistant URL.

5. If you used project-local configuration, start Codex from the project and confirm the trust prompt. After the project opens, exit Codex and return to a shell in the same project. If you do not want to trust the project, use global configuration instead.
6. Run the following command:

   ```bash
   codex mcp login homeassistant
   ```

7. Complete the authentication in your web browser and authorize Codex to access Home Assistant.
8. Restart Codex or start a new task to load the Home Assistant MCP server.

### Example: Cursor

1. Download and install [Cursor](https://www.cursor.com).
2. Install `mcp-proxy` following the instructions in the [README](https://github.com/sparfenyuk/mcp-proxy).
   For example, `uv tool install git+https://github.com/sparfenyuk/mcp-proxy`.
3. Open the main Cursor Settings and select **MCP**.
4. Select **Add new global MCP server** and add the Home Assistant server configuration:

   ```json
   {
     "mcpServers": {
       "Home Assistant": {
         "command": "mcp-proxy",
         "args": [
           "--transport=streamablehttp",
           "--stateless",
           "http://<your_local_home_assistant_ip_or_url>:8123/api/mcp"
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

### Example: Antigravity CLI

1.  Install the Antigravity CLI if you haven't already. You can find installation instructions at [https://antigravity.google](https://antigravity.google).
2.  Open the Antigravity CLI MCP configuration file, `mcp_config.json`. This is usually located at `~/.gemini/antigravity-cli/mcp_config.json`. For more details, refer to the [Antigravity CLI MCP server documentation](https://antigravity.google/docs/mcp).
3.  Add the following to your `mcpServers` configuration:

    ```json
    {
      "mcpServers": {
        "homeassistant": {
          "serverUrl": "https://<your_home_assistant_url>/api/mcp",
          "headers": {
            "Authorization": "Bearer ${HOMEASSISTANT_TOKEN}"
          }
        }
      }
    }
    ```

4.  Replace `<your_home_assistant_url>` with the URL of your Home Assistant instance.
5.  Set the `HOMEASSISTANT_TOKEN` environment variable to a [Long-Lived Access Token](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token) from your Home Assistant instance.
6.  Save the file. You can now use Home Assistant tools within the Antigravity CLI.

## Supported functionality

### Tools

[MCP Tools](https://modelcontextprotocol.io/docs/concepts/tools) enable LLMs to
perform actions through Home Assistant. The tools used by the configured LLM API
are exposed.

### Prompts

The [MCP Prompts](https://modelcontextprotocol.io/docs/concepts/prompts) provided
inform LLMs how to call the tools. The tools used by the configured LLM API
are exposed.

### Resources

When the configured LLM API includes the `GetLiveContext` tool, Home Assistant
also exposes a read-only [MCP Resource](https://modelcontextprotocol.io/docs/concepts/resources)
named `homeassistant://assist/context-snapshot`.

This resource returns a plain-text snapshot that matches the existing
`GetLiveContext` tool output. It is intended for inspection, debugging, and
explanation workflows where a static snapshot is useful. If the configured LLM
API does not expose `GetLiveContext`, this resource is not available.

## Known limitations

The Home Assistant Model Context Protocol integration currently only supports a
subset of MCP features:

- **Prompts**: Supported
- **Tools**: Supported
- **Resources**: Supported (Assist only)
- **Sampling**: Not supported
- **Notifications**: Not supported


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

1. Select **Settings...**.
2. Select **Developer**.
3. Select the **Home Assistant** MCP server.
4. Select **Open Logs Folder**.
5. View `mcp-server-Home Assistant.log`. These are known problems and their resolution:
   - `Client error '404 Not Found' for URL 'http://<your_local_home_assistant_ip_or_url>:8123/api/mcp'`:
     this means the MCP Server integration is not configured in Home Assistant.
   - `Client error '401 Unauthorized' for URL 'http://<your_local_home_assistant_ip_or_url>:8123/api/mcp'`:
     this means that the long-lived access token is not correct.
...

### Repeated OAuth failures

#### Symptom: Unable to access Home Assistant after several failed login attempts

If authentication keeps failing during the OAuth setup flow, the most likely cause is that one or more OAuth details are incorrect, like the client ID, client secret, or Home Assistant URL.

##### Resolution

Review the OAuth configuration in your client and enter the details again. Make sure the client ID, client secret, and Home Assistant URL exactly match the values you configured for the MCP server in Home Assistant.

If you have explicitly enabled IP bans in Home Assistant and repeated failed sign-in attempts caused a ban, check the `ip_bans.yaml` file in your Home Assistant configuration directory. If your computer's IP address or the client's IP address is listed there, remove it, restart Home Assistant, and then try authenticating again.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
