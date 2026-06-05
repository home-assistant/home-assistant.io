---
title: LiteLLM
description: Instructions on how to integrate a LiteLLM proxy as a conversation agent in Home Assistant
ha_category:
  - AI
ha_release: 2026.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@luismalves'
ha_domain: litellm
ha_integration_type: service
ha_platforms:
  - conversation
ha_quality_scale: bronze
---

The [LiteLLM](https://www.litellm.ai/) {% term integration %} allows you to use a LiteLLM proxy as a conversation agent in Home Assistant.

LiteLLM exposes a single OpenAI-compatible API in front of a wide range of model providers, so you can use almost any model through one endpoint. This is similar to a service like OpenRouter, with the added benefit that you can run LiteLLM yourself if you prefer to keep everything under your own control. This integration lets you point Home Assistant at any LiteLLM proxy, whether it is a hosted instance or one you self-host.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The base URL of your LiteLLM proxy, including the host and port. The integration automatically appends the OpenAI `/v1` path if it is missing.
API key:
  description: An optional LiteLLM API key or virtual key. Leave it empty if your proxy does not require authentication.
{% endconfiguration_basic %}

## Prerequisites

Before you add this integration, you need the following:

- **A LiteLLM proxy that Home Assistant can reach.** This is the endpoint the integration connects to. You can use a hosted LiteLLM proxy or [run one yourself](https://docs.litellm.ai/docs/simple_proxy).
- **At least one model configured on the proxy.** The integration discovers the available models from the proxy during setup and creates a conversation agent for each one.
- **An API key, if your proxy requires authentication.** This is used to authorize Home Assistant's requests to the proxy. You can leave it empty if your proxy does not require one.

## Supported functionality


### Adding a conversation agent

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

When you grant the agent control of Home Assistant, it can call the configured tools to interact with your devices and entities. To choose which devices and entities the agent can access, see [exposing entities to Assist](/voice_control/voice_remote_expose_devices/).

The agent can be used in [Assist](/voice_control/) like any other conversation agent.

To change the model, instructions, or tools later, select the conversation agent and choose **Reconfigure conversation agent**.


## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
