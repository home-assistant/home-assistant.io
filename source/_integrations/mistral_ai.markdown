---
title: Mistral
description: Instructions on how to integrate Mistral as a conversation agent
ha_category:
  - AI
  - Voice
ha_release: 2026.10
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: mistral_ai
ha_integration_type: service
ha_platforms:
  - conversation
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://console.mistral.ai/api-keys
    title: Mistral API key
  - url: https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key
    title: Activate and generate an API key
  - url: https://mistral.ai
    title: Mistral
ha_quality_scale: bronze
ha_codeowners:
  - '@fortytwo-dev'
---

The **Mistral** {% term integration %} adds a conversation agent powered by [Mistral](https://mistral.ai) to Home Assistant.

Controlling Home Assistant is done by providing the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI can provide you information about your devices and control them.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

This integration requires an API key to use, [which you can generate here](https://console.mistral.ai/api-keys). The service is billed based on usage, we advise you to monitor your costs in the [Mistral Studio](https://console.mistral.ai) closely to avoid unwanted costs associated with using the service.

## Prerequisites

The Mistral key is used to authenticate requests to the Mistral API. To generate an API key take the following steps:

1. Log in to the [Mistral Studio](https://console.mistral.ai) or sign up for an account.
2. Make sure a plan is selected in the billing section of the console. A free plan is available for evaluation; a payment method is only required for higher usage.
3. Visit the [API Keys page](https://console.mistral.ai/api-keys) to create the API key you'll use to configure the integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "API key from Mistral for authentication."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

The integration provides a [Conversation](/integrations/conversation/) subentry with the following configuration options:

{% configuration_basic %}
Name:
  description: The name of this configuration.
Recommended settings:
  description: If enabled, the recommended model and settings are chosen.
Chat model:
  description: The chat model to use for the conversation. The default is `mistral-small-latest`. The list of available models is retrieved from the Mistral API.
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/templating/).
Control Home Assistant:
  description: If the model is allowed to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
{% endconfiguration_basic %}

If you choose not to use the recommended settings, you can configure the following additional options:

{% configuration_basic %}
Maximum Tokens to Return in Response:
  description: The maximum number of words or "tokens" that the AI model should generate in its completion of the prompt.
Temperature:
  description: A value that determines the level of creativity and risk-taking the model should use when generating text. A higher temperature means the model is more likely to generate unexpected results, while a lower temperature results in more deterministic results.
Top P:
  description: An alternative to temperature, top_p determines the proportion of the most likely word choices the model should consider when generating text.
{% endconfiguration_basic %}

## Supported features

### Models

The integration supports the Mistral chat models (for example `mistral-small-latest`, `mistral-medium-latest` and `mistral-large-latest`). The available models are listed in the configuration flow based on your API key.

## Talking to the assistant

You can use a Mistral Conversation integration to [create an AI personality and, if desired, have it control devices](/voice_control/assist_create_open_ai_personality/) in your home.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
