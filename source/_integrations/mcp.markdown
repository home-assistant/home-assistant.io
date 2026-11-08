---
description: Instructions on how to give your Home Assistant AI conversation agent extra tools from a Model Context Protocol (MCP) server.
ha_release: 2025.2
ha_domain: mcp
related:
  - docs: /integrations/conversation/
    title: Conversation
  - docs: /integrations/mcp_server/
    title: Model Context Protocol
---

The **Model Context Protocol Client** {% term integration %} gives your AI [conversation agent](/integrations/conversation/) in Home Assistant extra tools from an MCP server of your choice. For example, you can connect the MCP server of a service you already use, such as a project tracker or a note-taking app, and then ask Assist about it. You can also connect to an MCP server that lets Assist remember things between conversations, or search the web in ways Home Assistant can't do on its own.

The [Model Context Protocol](https://modelcontextprotocol.io) (<abbr title="Model Context Protocol">MCP</abbr>) is an open standard that lets AI apps use tools and information from other services. With this integration, Home Assistant is the MCP *client*. It connects to an MCP server and passes that server's tools on to your conversation agent.

{% tip %}
Home Assistant has two MCP integrations, and they work in opposite directions:

- **Model Context Protocol Client** (this page): Your Home Assistant conversation agent uses tools from another service.
- [**Model Context Protocol**](/integrations/mcp_server/): Another AI app, such as Claude or ChatGPT, controls Home Assistant.

If you want to talk to Claude or ChatGPT and have it turn on your lights, you need the [Model Context Protocol](/integrations/mcp_server/) integration.
{% endtip %}

## Prerequisites

- An AI conversation agent in Home Assistant that can use tools. For example, [Anthropic](/integrations/anthropic/), [Google Gemini](/integrations/google_generative_ai_conversation/), [Ollama](/integrations/ollama/), or [OpenAI](/integrations/openai_conversation/).
- The URL of an [MCP server](https://modelcontextprotocol.io/examples) that Home Assistant can reach over the network.
- If your MCP server only runs locally using <abbr title="Standard input/output">*stdio*</abbr>, you also need an MCP proxy, such as [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy), to make it available over the network.
- If your MCP server requires you to sign in, an OAuth client ID and client secret from the service that provides the MCP server.

{% include integrations/config_flow.md %}

If an app you installed in Home Assistant provides an MCP server, Home Assistant can discover it automatically. The MCP server then shows up under **Discovered** in {% my integrations title="**Settings** > **Devices & services**" %}, and you only need to confirm it.

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
URL:
  description: The URL of the MCP server. Both Streamable HTTP and Server-Sent Events (SSE) endpoints work, for example `http://example.local:8000/mcp` or `http://example.local:8000/sse`.
{% endconfiguration_basic %}

### Signing in to the MCP server

If the MCP server requires you to sign in, Home Assistant detects this after you enter the URL. The first time, it asks you for an OAuth **Client ID** and **Client Secret** for the MCP server and stores them as [Application Credentials](/integrations/application_credentials/).

If you entered OAuth credentials for an MCP server before, Home Assistant asks how you want to sign in instead:

- **Set up new credentials**: Enter a new OAuth **Client ID** and **Client Secret** for the MCP server.
- **Use existing credentials**: Reuse OAuth credentials you entered before.

After that, you sign in to the service that provides the MCP server and give Home Assistant access.

## Using the MCP tools in a conversation agent

After you add the integration, your conversation agent doesn't use the new tools until you allow it.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the integration of your conversation agent, for example **OpenAI**.
2. Next to the conversation agent, select the cogwheel {% icon "mdi:cog-outline" %}.
3. Under **AI tools**, select the MCP server. It is listed by its name. You can keep **Device control** selected as well, so the agent can still control your home.
4. Select **Submit**.

The next time you talk to this conversation agent, it can use the tools from the MCP server.

## How it works

Home Assistant acts as a client to the MCP server you specify. It connects to the MCP server and asks for the list of tools it offers. These tools are then made available to Home Assistant conversation agents, in the same way as the tools of **Device control**. For more details on the protocol, refer to the [Model Context Protocol introduction](https://modelcontextprotocol.io/introduction#general-architecture).

Home Assistant connects to MCP servers over the network. It first tries the [Streamable HTTP transport](https://modelcontextprotocol.io/docs/concepts/transports#streamable-http). If the MCP server doesn't support it, Home Assistant uses the [Server-Sent Events (SSE) transport](https://modelcontextprotocol.io/docs/concepts/transports#server-sent-events-sse) instead.

Many MCP servers are made to run as a local command-line tool that an AI app starts directly, using the [stdio](https://modelcontextprotocol.io/docs/concepts/transports#standard-input-output-stdio) transport. Home Assistant can't start these servers itself. Use an MCP proxy, such as [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy), to run the server and make it available to Home Assistant over the network.

## Supported functionality

### Tools

[MCP Tools](https://modelcontextprotocol.io/docs/concepts/tools) let an LLM perform actions or look up information. The tools of the MCP server become available to the conversation agents that you allow to use them.

### Authorization

The Model Context Protocol supports OAuth, so you can give Home Assistant access to MCP servers that require you to sign in. Home Assistant stores the MCP server's OAuth client ID and client secret as [Application Credentials](/integrations/application_credentials/). For the setup steps, refer to [Signing in to the MCP server](#signing-in-to-the-mcp-server).

## Data updates

Home Assistant checks the MCP server for its list of available tools every 30 minutes.

## Known limitations

The Home Assistant Model Context Protocol Client integration currently only supports a subset of MCP features:

- **Prompts**: Not supported
- **Tools**: Supported
- **Resources**: Not supported
- **Sampling**: Not supported
- **Notifications**: Not supported

## Troubleshooting

### The MCP server does not support a required capability

#### Symptom: "The MCP server does not support a required capability (Tools)"

When you add the integration, setup stops with this message.

##### Resolution

Home Assistant only works with MCP servers that provide tools. Check the documentation of the MCP server to make sure it offers tools, and that the URL points to the MCP endpoint of the server.

### General MCP troubleshooting

Refer to [Model Context Protocol: Debugging](https://modelcontextprotocol.io/docs/tools/debugging) for general tips on debugging MCP. If you are developing your own MCP server and it doesn't work with Home Assistant, use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector) to verify that your MCP server is working correctly.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
