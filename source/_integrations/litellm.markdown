---
title: LiteLLM
description: Instructions on how to integrate a LiteLLM proxy as a conversation agent and speech-to-text service in Home Assistant
ha_category:
  - AI
  - Speech-to-text
ha_release: 2026.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@luismalves'
ha_domain: litellm
ha_integration_type: service
ha_platforms:
  - conversation
  - stt
ha_quality_scale: bronze
---

The [LiteLLM](https://www.litellm.ai/) {% term integration %} allows you to use a LiteLLM proxy as a conversation agent or [speech-to-text](/integrations/stt/) service in Home Assistant.

LiteLLM exposes a single OpenAI-compatible API in front of a wide range of model providers, so you can use almost any model through one endpoint. This is similar to a service like OpenRouter, with the added benefit that you can run LiteLLM yourself if you prefer to keep everything under your own control. This integration lets you point Home Assistant at any LiteLLM proxy, whether it is a hosted instance or one you self-host.

Home Assistant lists all models returned by LiteLLM in both the conversation and speech-to-text model lists. Choose a model that supports chat completions for a conversation agent or audio transcription for a speech-to-text service. The proxy's settings may not match what a model's backend can do, so LiteLLM or the model's backend may reject an incompatible request.

## Prerequisites

Before you add this integration, you need the following:

- **A LiteLLM proxy that Home Assistant can reach.** This is the endpoint the integration connects to. You can use a hosted LiteLLM proxy or [run one yourself](https://docs.litellm.ai/docs/simple_proxy).
- **At least one model configured on the proxy.** The integration discovers the available models when you add a conversation agent or speech-to-text service.
- **An API key, if your proxy requires authentication.** This is used to authorize Home Assistant's requests to the proxy. You can leave it empty if your proxy does not require one.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The base URL of your LiteLLM proxy, including the host and port. The integration automatically appends the OpenAI `/v1` path if it is missing.
API key:
  description: An optional LiteLLM API key or virtual key. Leave it empty if your proxy does not require authentication.
{% endconfiguration_basic %}

### Adding a conversation agent

After the integration is set up, add a conversation agent for the model you want to use:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select your LiteLLM entry.
2. Select **Add conversation agent**.
3. Fill in the fields:

{% configuration_basic %}
Model:
   description: "The model to use for the conversation agent. The list is discovered from your LiteLLM proxy."
Instructions:
   description: "Instruct how the LLM should respond. This field supports [templates](/docs/configuration/templating/)."
Control Home Assistant:
   description: "Select which tools the agent can use to interact with your devices and entities. Leave empty if you do not want the agent to control Home Assistant."
{% endconfiguration_basic %}

To change the model, instructions, or tools later, select the conversation agent and choose **Reconfigure conversation agent**.

### Adding a speech-to-text service

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select your LiteLLM entry.
2. Select **Add speech-to-text service**.
3. Fill in the fields. If you turn on **Custom prompt/keywords**, select **Submit** to show the **Prompt** and **Keywords** fields.

{% configuration_basic %}
Model:
  description: "The model used to transcribe speech. The list is discovered from your LiteLLM proxy."
Custom prompt/keywords:
  description: "Turn on to send optional prompt and keyword hints. Not every backend supports them. If the backend doesn't support a parameter, it rejects the request and Assist can't transcribe your speech. To fix this, clear the field or turn this off. Turning this off also removes any saved prompt and keywords."
Prompt:
  description: "Optional context or instructions for the transcription, in the same language as the audio. Supports [templates](/docs/templating/)."
Keywords:
  description: "Comma-separated words or phrases, such as names, to help the model recognize them. Supports [templates](/docs/templating/)."
{% endconfiguration_basic %}

The service appears as a speech-to-text entity named after the model. Select it in an [Assist pipeline](/integrations/assist_pipeline/). Home Assistant sends the pipeline language without its region. For example, `en-US` is sent as `en`.

To change these settings later, select the speech-to-text service and choose **Reconfigure speech-to-text service**.



## Supported functionality

For each conversation agent you add, you can use it in [Assist](/voice_control/) like any other conversation agent. Speech-to-text entities can be selected in an [Assist pipeline](/integrations/assist_pipeline/).

When you grant the agent control of Home Assistant, it can call the configured tools to interact with your devices and entities. To choose which devices and entities the agent can access, see [exposing entities to Assist](/voice_control/voice_remote_expose_devices/).

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
