---
title: Open Responses
description: Instructions on how to integrate a server that implements the Open Responses API as a conversation agent.
ha_category:
  - AI
  - Voice
ha_release: 2026.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@zweckj'
ha_domain: openresponses
ha_integration_type: service
ha_platforms:
  - conversation
ha_quality_scale: bronze
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://www.openresponses.org
    title: Open Responses
---

The **Open Responses** {% term integration %} allows you to use any server that implements the [Open Responses](https://www.openresponses.org) API as a conversation agent in Home Assistant.

Open Responses is an open specification based on the OpenAI Responses API. It is supported by local servers that run models on your own hardware, and by cloud providers. This lets you use the model of your choice, wherever it runs.

Controlling Home Assistant is done by providing the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI can provide you with information about your devices and control them.

{% tip %}
If there is a dedicated integration for your provider, such as [OpenAI](/integrations/openai_conversation/), [Ollama](/integrations/ollama/), or [OpenRouter](/integrations/open_router/), it may support more features.
{% endtip %}

## Prerequisites

This integration requires a server that implements the Open Responses API. Examples of servers and their base URLs:

- **Ollama**: `http://localhost:11434/v1`
- **vLLM**: `http://localhost:8000/v1`
- **LM Studio**: `http://localhost:1234/v1`
- **OpenAI**: `https://api.openai.com/v1`
- **Azure AI Foundry**: `https://<resource name>.openai.azure.com/openai/v1`

The base URL always includes the version prefix, such as `/v1`. Home Assistant sends requests to the `/responses` path below it.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The base URL of the server, including the version prefix. For example, `http://localhost:11434/v1`."
API key:
  description: "The API key to use when connecting to the server. Leave empty if your server does not require authentication."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

The integration supports adding one or more conversation agents as subentries. Each conversation agent uses one model of the server. To add a conversation agent, go to {% my integrations title="**Settings** > **Devices & services**" %}, open the **Open Responses** integration, and select **Add conversation agent**.

A conversation agent has the following configuration options:

{% configuration_basic %}
Model:
  description: "The name of the model to use, as expected by the server. For example, `gpt-oss:20b` for Ollama. On Microsoft Foundry, this is the name of your deployment."
Instructions:
  description: "Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/templating/)."
Control Home Assistant:
  description: "If the model is allowed to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it."
{% endconfiguration_basic %}

## Supported functionality

The integration provides a [conversation](/integrations/conversation/) entity for each configured conversation agent. You can use this entity to:

- Chat with the model through the Home Assistant interface.
- Use the model as a conversation agent in an [Assist pipeline](/integrations/assist_pipeline/).
- Trigger the model from automations and scripts with the `conversation.process` action.

Responses are streamed, so you see the answer while it is being generated. If the model shares its reasoning, it is shown together with the answer.

### Assist pipeline

You can set up your Open Responses conversation agent in an [Assist pipeline](/integrations/assist_pipeline/), as described in the [voice guide](/voice_control/assist_create_open_ai_personality/). You can then chat through the Home Assistant web interface, or on [Android](/voice_control/android/) or [Apple](/voice_control/apple/) devices using the [Home Assistant Companion App](https://companion.home-assistant.io/docs/getting_started/), or by voice using an [Assist satellite](/integrations/assist_satellite/).

[Expose entities](/voice_control/voice_remote_expose_devices/) and configure aliases for the entities you want the model to control.

## Known limitations

- The model name is not validated when you add a conversation agent. If it is wrong, you get an error when you talk to the agent.
- The model must support tool calling for the **Control Home Assistant** option to work. If it does not, the agent can still answer questions, but it cannot control your devices.
- Home Assistant keeps the conversation history itself and asks the server not to store responses.
- This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

## Troubleshooting

### Cannot connect to the server

#### Symptom: "Failed to connect" during setup

When adding the integration, you receive a connection error.

#### Resolution

To resolve this issue, try the following steps:

1. Confirm the server is running and reachable from the Home Assistant host.
2. Verify that the URL contains the correct protocol (HTTP or HTTPS), hostname, port, and version prefix (such as `/v1`). A URL without the version prefix is the most common cause of this error.
3. Ensure any firewall or network settings do not block connections between Home Assistant and the server.

### Invalid authentication

#### Symptom: "Invalid authentication" during setup

When adding the integration, the server rejects the API key.

#### Resolution

Verify that the API key is correct and has access to the Responses API of the server. If your server does not require authentication, leave the API key empty.

### The agent answers with an error

#### Symptom: "Error talking to the server"

When you talk to the conversation agent, it responds with an error from the server.

#### Resolution

Check that the model name of the conversation agent matches a model that is available on the server. To change it, open the **Open Responses** integration, select the conversation agent, and select **Reconfigure**.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
