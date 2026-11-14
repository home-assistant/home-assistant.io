---
description: Instructions on how to add a Model Context Protocol server to Home Assistant.
featured: true
ha_release: 2025.2
ha_domain: mcp_server
related:
  - docs: /integrations/conversation/
    title: Conversation
  - docs: /integrations/mcp/
    title: Model Context Protocol Client
  - docs: /integrations/llm/
    title: LLM
---

The **Model Context Protocol** (<abbr title="Model Context Protocol">MCP</abbr>) integration lets you connect an {% term "AI app" %}, such as ChatGPT or Claude, to Home Assistant. The AI app can then control your devices and see the current state of your home.

With this integration, Home Assistant is the MCP *server*. It offers its {% term "AI tools" %} to the AI app. The AI tools are grouped into sets. Unless you change the settings, the AI app can use all sets of AI tools. Home Assistant has two built-in sets of AI tools:

- **Device control**: Reads and controls the {% term entities %} you expose to voice assistants, on the {% my voice_assistants title="exposed entities page" %}.
- **Home Assistant**: Looks into and manages Home Assistant itself. It can read all entities, logs, and history, list and reload integrations, and perform any action. Only administrators can use it.

Integrations can add more sets of AI tools. For example, [KNX](/integrations/knx/) adds a **KNX** set.

To choose which sets of AI tools the AI app can use, refer to [Configuration options](#configuration-options).

{% tip %}
Home Assistant has two MCP integrations, and they work in opposite directions:

- **Model Context Protocol** (this page): An AI app, such as Claude or ChatGPT, controls Home Assistant.
- [**Model Context Protocol Client**](/integrations/mcp/): Your Home Assistant conversation agent uses AI tools from another service.

If you want your Home Assistant {% term "conversation agent" %} to use AI tools from another service, such as web search, you need the [Model Context Protocol Client](/integrations/mcp/) integration.
{% endtip %}

## Prerequisites

- Your MCP server URL. To get it:
  1. Go to {% my config_ai title="**Settings** > **System** > **AI**" %}.
  2. If the **Model Context Protocol** card shows an **Enable** button, select it.
  3. Next to the URL you want to use, select **Copy URL** {% icon "mdi:content-copy" %}.
     - The **Main URL** exposes the sets of {% term "AI tools" %} that you choose in the [configuration options](#configuration-options).
     - Under **Individual URLs**, each set of AI tools has its own URL.
- An {% term "AI app" %} that supports MCP servers.
- If the AI app runs in the cloud, for example when you use it through a website, your Home Assistant instance must be accessible from the internet. Use [Home Assistant Cloud](/integrations/cloud/) or another method of [remote access](/docs/configuration/remote/).

For detailed configuration instructions, refer to the [Client configuration](#client-configuration) section.

{% include integrations/config_flow.md %}

When you set up the integration, the main URL exposes all sets of {% term "AI tools" %} and requires an administrator account. To change this, go to {% my config_ai title="**Settings** > **System** > **AI**" %}, and next to **Main URL**, select **Configure** {% icon "mdi:cog" %}.

## Configuration options

The integration provides the following configuration options. They only apply to the main URL (`/api/mcp`), shown as **Main URL** in {% my config_ai title="**Settings** > **System** > **AI**" %}.

Each set of {% term "AI tools" %} also has its own URL, listed under **Individual URLs**. For example, `/api/mcp/assist` only exposes **Device control**. These URLs ignore the options below. They are never read-only, and all of them except the **Device control** URL require an administrator account.

{% configuration_basic %}
Expose all AI tools:
  description: If the main URL exposes every set of AI tools, including sets of AI tools that
    integrations add later. This option is turned on by default. If you set up the integration
    before this option existed, it stays turned off so that your clients keep the sets of AI tools you
    selected. Turn it off to select individual sets of AI tools.
AI tools:
  description: The sets of AI tools that the main URL exposes when **Expose all AI tools** is turned
    off. **Device control** only accesses the entities you
    [expose](/voice_control/voice_remote_expose_devices/) to voice assistants. **Home Assistant** accesses
    everything and requires an administrator account.
Require an administrator account:
  description: If only administrator accounts can use the main URL. This option is turned on by
    default. If you set up the integration before this option existed, it stays turned off so
    that your clients keep working. When the main URL exposes **Home Assistant**, for example
    with **Expose all AI tools**, an administrator account is always required.
Read-only:
  description: If the main URL only exposes AI tools that are marked as not changing anything, such
    as getting the current state of your home. For example, it leaves out **Call action** and
    **Reload config entry** from the **Home Assistant** set, and the AI tools in **Device control**
    that control your devices. This option is turned off by default.
{% endconfiguration_basic %}

## Client configuration

Home Assistant implements the standard Model Context Protocol, including OAuth 2.0 with <abbr title="Proof Key for Code Exchange">PKCE</abbr>. It supports [OAuth Client ID Metadata Documents](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/), so {% term "AI apps" %} set up the client ID and callback URL automatically.

### Example: Claude

Before you start, copy your MCP server URL as described in the [prerequisites](#prerequisites).

{% note %}
Claude connects to your MCP server from the cloud, also when you use Claude Desktop. Your Home Assistant instance must be accessible from the internet.
{% endnote %}

1. Open the form to add a connector:
   - On claude.ai, go to the [Claude connectors page](https://claude.ai/new#customize/connectors/yours). In the top-right corner, select **Add** > **Add custom connector**.
   - In Claude Desktop, go to **Settings** > **Connectors** and select **Add** > **Add custom connector**.
2. Enter the following details:
   - **Name**: `Home Assistant`
   - **MCP Server URL**: Paste your MCP server URL.
3. Select **Add**.
4. Claude verifies the MCP server and shows a dialog. Enter the following details:
   - **Authentication**: Select **Sign in now**.
   - **OAuth client**: Select **Use Claude's published identity**.
5. Select **Add**.
6. On the page for your new connector, select **Connect**.
7. Log in to your Home Assistant instance.
   - Result: You can now enable {% term "AI tools" %} from Home Assistant when chatting with Claude. This lets you control Home Assistant much like you do with Assist. Claude asks for your permission before it uses an AI tool, unless you choose to always allow it.

   ![Screenshot of Claude Desktop adding an item to a Home Assistant To-do list](/images/integrations/mcp_server/claude-todo-list-control.png)

### Example: ChatGPT

Before you start, copy your MCP server URL as described in the [prerequisites](#prerequisites).

{% note %}
If you use ChatGPT on chatgpt.com, your Home Assistant instance must be accessible from the internet.
{% endnote %}

1. Open the form to add an MCP server:
   - On chatgpt.com, go to the [ChatGPT plugins page](https://chatgpt.com/plugins). In the top-right corner, select **Add** > **Add custom MCP server**.
   - In ChatGPT Desktop, go to **Settings** > **Plugins** and select **Add** > **Add MCP server**.
2. Enter the following details:
   - **Name**: `Home Assistant`
   - **Connection**: Paste your MCP server URL.
   - **Authentication**: Select **OAuth**.
3. Select **I understand and want to continue**.
4. Select **Create as plugin**.
5. ChatGPT offers to **Connect Home Assistant**. Select **Continue to Home Assistant**.
6. Log in to your Home Assistant instance.

### Example: Claude Code

Claude Code connects to MCP servers over HTTPS only. Use the MCP server URL of your remotely accessible Home Assistant instance, as described in the [prerequisites](#prerequisites).

1. Install [Claude Code](https://claude.com/product/claude-code) and log in.
2. In your terminal, run the following command. Replace `<your_mcp_server_url>` with your MCP server URL.

   ```bash
   claude mcp add --transport http home-assistant <your_mcp_server_url>
   ```

3. Run the following command:

   ```bash
   claude mcp login home-assistant
   ```

4. In your web browser, log in to your Home Assistant instance.
   - Result: You can now enable {% term "AI tools" %} from Home Assistant when chatting with Claude. This lets you control Home Assistant much like you do with Assist. Claude asks for your permission before it uses an AI tool, unless you choose to always allow it.

### Example: Codex

1. Install [Codex](https://developers.openai.com/codex/cli/) and sign in.
2. In your terminal, run the following command. Replace `<your_mcp_server_url>` with your MCP server URL, for example `http://homeassistant.local:8123/api/mcp`.

   ```bash
   codex mcp add homeassistant --url <your_mcp_server_url>
   ```

3. Codex opens your Home Assistant instance in your web browser. Log in to your Home Assistant instance.

### Example: OpenCode

1. Install [OpenCode](https://opencode.ai).
2. In your terminal, run the following command. Replace `<your_mcp_server_url>` with your MCP server URL.

   ```bash
   opencode mcp add home-assistant --url <your_mcp_server_url>
   ```

3. Run the following command:

   ```bash
   opencode mcp auth home-assistant
   ```

4. In your web browser, log in to your Home Assistant instance.

## Supported functionality

### Tools

Home Assistant offers its {% term "AI tools" %} as [MCP tools](https://modelcontextprotocol.io/docs/concepts/tools). The {% term "AI app" %} can use the AI tools to read information and control Home Assistant. Each URL only exposes the AI tools from its sets of AI tools. For the AI tools in the **Home Assistant** set, refer to the [LLM](/integrations/llm/) integration.

### Prompts

Home Assistant provides one default [MCP prompt](https://modelcontextprotocol.io/docs/concepts/prompts). It tells the {% term "AI app" %} how to use the {% term "AI tools" %}. It contains the instructions of the sets of AI tools that the URL exposes.

### Resources

When the URL exposes **Device control**, Home Assistant also offers a read-only [MCP resource](https://modelcontextprotocol.io/docs/concepts/resources) named `homeassistant://assist/context-snapshot`.

This resource returns a plain-text snapshot of the current state of your exposed {% term entities %}. It matches the output of the **Get live context** {% term "AI tool" %} (`homeassistant__GetLiveContext`). It's useful when a static snapshot is enough. For example, you can use it to check what the {% term "AI app" %} sees. Without **Device control**, this resource isn't available.

## Known limitations

The Home Assistant Model Context Protocol integration currently only supports a
subset of MCP features:

- **Prompts**: Supported
- **Tools**: Supported
- **Resources**: Supported (**Device control** only)
- **Sampling**: Not supported
- **Notifications**: Not supported


## Troubleshooting

### Repeated OAuth failures

#### Symptom: Unable to access Home Assistant after several failed login attempts

If authentication keeps failing during the OAuth setup flow, the most likely cause is that one or more OAuth details are incorrect, such as the client ID or the Home Assistant URL.

##### Resolution

1. Review the OAuth configuration in your client and verify the details:
   - Make sure the **Client ID** is the base URL of the {% term "AI app" %} (for example, `https://claude.ai` for Claude or `https://chatgpt.com` for ChatGPT), and never your Home Assistant instance URL. IndieAuth validates that the redirect URI shares the same scheme and domain with the client ID; setting the client ID to your Home Assistant instance causes the authorization flow to fail.
   - Home Assistant does not use a client secret. If the field is required by the client application, enter any text; if it is optional, leave it blank.
   - Make sure the URL used to access Home Assistant matches the configured **Internal URL** or **External URL** in {% my network title="**Settings** > **System** > **Network**" %}.
2. If you have explicitly enabled IP bans in Home Assistant and repeated failed sign-in attempts caused a ban, check the `ip_bans.yaml` file in your Home Assistant configuration directory. If your computer's IP address or the client's IP address is listed there, remove it, restart Home Assistant, and then try authenticating again.

#### Symptom: OAuth discovery fails or authorization server metadata is rejected

When connecting an external client (such as ChatGPT or Claude) through a tunnel, reverse proxy, or custom domain, the client fails to complete OAuth discovery or rejects the metadata with an error regarding the `issuer` or registration endpoint.

##### Description

This can occur for two reasons:

- **Hostname or proxy mismatch**: Home Assistant checks incoming requests against its configured internal and external URLs. If the hostname used by the {% term "AI app" %} does not match the configured URL, or if reverse-proxy headers (`X-Forwarded-Host`, `X-Forwarded-Proto`) are missing or mismatched, Home Assistant cannot resolve the `issuer` in `/.well-known/oauth-authorization-server` and returns relative paths. Conforming OAuth clients reject this metadata because RFC 8414 requires the `issuer` to match the URL used to discover it.
- **Unsupported Dynamic Client Registration (RFC 7591)**: Home Assistant uses the `draft-ietf-oauth-client-id-metadata-document` standard (`client_id_metadata_document_supported: true`) rather than RFC 7591 Dynamic Client Registration. AI apps that strictly require RFC 7591 Dynamic Client Registration cannot register automatically.

##### Resolution

1. Go to {% my network title="**Settings** > **System** > **Network**" %} and make sure that the **External URL** (or **Internal URL**) matches the exact hostname and scheme used by the AI app to reach Home Assistant.
2. If using a reverse proxy or tunnel (such as Cloudflare Tunnel), make sure Home Assistant is configured to trust forwarded headers from the proxy. See [Reverse proxies in the HTTP integration documentation](/integrations/http/#reverse-proxies) for details on configuring **Trust X-Forwarded-For** and **Trusted proxies**.
3. If the AI app supports manual OAuth configuration (such as ChatGPT's user-defined OAuth client), enter the authorization and token endpoints manually rather than relying on automatic discovery.
4. Using [Home Assistant Cloud](/integrations/cloud/) (`https://<your-id>.ui.nabu.casa`) avoids reverse-proxy and tunnel configuration pitfalls because it automatically handles canonical hostnames and SSL termination.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
