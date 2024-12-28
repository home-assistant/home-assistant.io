---
title: Model Context Protocol Server
description: Instructions on how to add a Model Context Protocol Server to Home Assistant.
ha_category:
  - Voice
ha_release: 2023.2
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - 'allenporter'
ha_domain: mcp_server
ha_integration_type: integration
related:
  - docs: /integrations/conversation/
    title: Conversation
---

The [Model Context Protocol](https://modelcontextprotocol.io) is an open protocol for standardizing how applications provide context to LLMs. The **Model Context Protocol Server** integration enables using Home Assistant as context for MCP LLM Client Applications.

This integration can help you expose other Home Assistant integrations as
context for LLM applications outside of Home Assistant. For example, you can expose
your Google Tasks To-do list as a tool for Claude Desktop.

Controlling Home Assistant is done by providing MCP clients access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}.

## Pre-requisites

1. You will need an [MCP client ](https://modelcontextprotocol.io/clients) LLM Application such as [Claude Desktop](https://claude.ai/download).
1. Since most clients do not support native remote servers, you will need an additional local MCP server  remote gateway.

See [Client Configuration](#client-configuration) below for detailed instructions.

{% include integrations/config_flow.md %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Control Home Assistant:
  description: The API to use to expose tools over the Model Context Protocol. Clients
    can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
{% endconfiguration_basic %}

## Architecture Overview

This integration can provide similar functionality as other LLM based conversation
agents (for example [Anthropic](/integrations/anthropic/), [Google Generative AI](/integrations/google_generative_ai_conversation), [Ollama](/integrations/ollama/), [Open AI](/integrations/openai_conversation/)). In those conversation agents, Home Assistant is the
client and prepares the available tools and passes them into the LLM with a prompt.

The Model Context Protocol follows a different pattern: An LLM application acts as
a client and can connect to multiple MCP servers to provide context. See the
[Model Context Protocol Introducton](https://modelcontextprotocol.io/introduction#general-architecture) for more details.

## Client Configuration

The Model Context Protocol specification does not yet currently define standards
for authentication and connecting to remote servers. These are a *work in progress*
and this configuration will likely change in the near future.

### Access Control

For now, we can use
[Long-lived access token](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token) to control access to the API.

1. Visit your account profile settings, under the **Security** tab. {% my profile badge %}.

1. Create a **Long-lived access token**

1. Copy the access token to use when configuring the MCP client LLM application.

See [Authentication](https://www.home-assistant.io/docs/authentication/#your-account-profile) for more information about Authentication in Home Assistant.

### Client Configuration

Most MCP clients do not support native remote servers. You will need an
additional local MCP server to act as a gateway to Home Assistant.

#### Example: Claude Desktop

See [MCP Quickstart: For Claude Desktop Users](https://modelcontextprotocol.io/quickstart/user#for-claude-desktop-users) for a detailed guide on using Claude Desktop with
a local MCP server. It is recommended to get another server working first before
configuring Home Assistant MCP Server.

TODO: Give example

## Supported functionality

### Prompts

[MCP Prompts](https://modelcontextprotocol.io/docs/concepts/prompts) are reusable
workflows that clients can surface. The prompt used by the LLM API are exposed.

### Tools

[MCP Tools](https://modelcontextprotocol.io/docs/concepts/tools) enable LLMs to
perform actions through Home Assistant. The tools used by the configured LLM API
are exposed.

## Known Limitations

The Remote Model Context Protocol integration does not currently support
notifications which notify clients of state changes.

## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
