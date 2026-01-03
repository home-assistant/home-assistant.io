---
title: Model Context Protocol
description: Instructions on how to use the Model Context Protocol with Home Assistant.
ha_category:
  - Voice
ha_release: 2025.2
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@allenporter'
ha_domain: mcp
ha_integration_type: integration
related:
  - docs: /integrations/conversation/
    title: Conversation
ha_quality_scale: silver
---

The [Model Context Protocol](https://modelcontextprotocol.io) is an open protocol that
standardizes how applications provide context to LLMs. The **Model Context Protocol** {% term integration %}
enables using MCP Servers in Home Assistant for providing additional tools to use with a
[conversation agent](/integrations/conversation). For example, you can add an MCP server that
supports memory functionality, or that can search the web using functionality not already
available in Home Assistant.

Controlling Home Assistant is done by providing MCP clients access to the Assist API of Home
Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}.

## Prerequisites

1. You will need an [MCP server](https://modelcontextprotocol.io/examples).
1. If your MCP server only supports the <abbr title="Standard input/output">*stdio*</abbr> protocol, you will also need an additional
   MCP proxy (such as [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy)) to expose
   the server over <abbr title="Server-sent events">*SSE*</abbr>.

{% include integrations/config_flow.md %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
SSE Server URL:
  description: The URL for the SSE endpoint of the MCP server. For example, `http://example/sse`.
{% endconfiguration_basic %}

## Architecture overview

This {% term integration %} can provide additional functionality for LLM conversation agents
(for example [Anthropic](/integrations/anthropic/), [Google Generative AI](/integrations/google_generative_ai_conversation), [Ollama](/integrations/ollama/), [Open AI](/integrations/openai_conversation/)). 

Home Assistant acts as a client to the MCP server you specify. Home Assistant will
poll the MCP server SSE endpoint and query the list of available tools. The tools are
made available for use by Home Assistant conversation agents, similar to the Assist API.
See the [Model Context Protocol Introduction](https://modelcontextprotocol.io/introduction#general-architecture)
for more details on the protocol.

The Home Assistant Model Context Protocol integration acts as a client using the
[Server-Sent Events (SSE) transport](https://modelcontextprotocol.io/docs/concepts/transports#server-sent-events-sse)
allowing streaming client-to-server communication. Most MCP clients today only support
[stdio](https://modelcontextprotocol.io/docs/concepts/transports#standard-input-output-stdio) transport,
and directly run an MCP server as a local command line tool. You can 
use an MCP proxy server like [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy)
to enable Home Assistant to access an MCP SSE server.

Once the integration is configured, you also need to configure the conversation
agent to use the tools.

## Supported functionality

### Tools

[MCP Tools](https://modelcontextprotocol.io/docs/concepts/tools) enable LLMs to
perform actions through Home Assistant. The tools used by the configured LLM API
are exposed.

## Known limitations

The Home Assistant Model Context Protocol integration currently only supports a
subset of MCP features:

| Feature | Supported by Home Assistant |
| ------- | --------- |
| Prompts | ❌ |
| Tools | ✅ |
| Resources | ❌ |
| Sampling | ❌ |
| Notifications | ❌ |

## Troubleshooting

See [Model Context Protocol: Debugging](https://modelcontextprotocol.io/docs/tools/debugging) for
general tips on debugging MCP. If you are developing your own MCP server and having trouble making it work
with Home Assistant, you can also use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
to verify that your MCP server is working correctly.


## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
