---
title: Anthropic Conversation
description: Instructions on how to integrate Anthropic Claude as a conversation agent
ha_category:
  - Voice
ha_release: 2024.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Shulyaka'
ha_domain: anthropic
ha_integration_type: service
ha_platforms:
  - conversation
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://console.anthropic.com/settings/keys
    title: Anthropic API key
  - url: https://www.anthropic.com
    title: Anthropic
  - url: https://claude.ai
    title: Claude
---

The **Anthropic** {% term integrations %} adds a conversation agent powered by [Anthropic](https://www.anthropic.com), such as Claude 3.5 Sonnet, in Home Assistant.

Controlling Home Assistant is done by providing the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI can provide you information about your devices and control them.

Legal note: Individuals and hobbyists are welcome to use the Anthropic API [for personal use](https://support.anthropic.com/en/articles/8987200-can-i-use-the-claude-api-for-individual-use), however, please note that the use of the API is subject to their [Commercial Terms of Service](https://www.anthropic.com/legal/commercial-terms), regardless of whether you are an individual or representing a company.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

## Prerequisites

- This integration requires an API key to use, [which you can generate here.](https://console.anthropic.com/settings/keys). 
- This is a paid service, we advise you to monitor your costs in the [Anthropic portal](https://console.anthropic.com/settings/cost) closely.

### Generating an API Key

The Anthropic API key is used to authenticate requests to the Anthropic API. To generate an API key, take the following steps:

1. Log in to the [Anthropic portal](https://console.anthropic.com) or sign up for an account.
2. Enable billing with a valid credit card on the [plans page](https://console.anthropic.com/settings/plans).
3. Visit the [API Keys page](https://console.anthropic.com/settings/keys) to retrieve the API key you'll use to configure the integration.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/configuration/templating/).
Control Home Assistant:
  description: If the model is allowed to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
Recommended settings:
  description: If enabled, the recommended model and settings are chosen.
{% endconfiguration_basic %}

If you choose not to use the recommended settings, you can configure the following options:

{% configuration_basic %}
Model:
  description: The model that will complete your prompt. See [models](https://docs.anthropic.com/en/docs/about-claude/models#model-names) for additional details and options.
Maximum Tokens to Return in Response:
  description: The maximum number of tokens to generate before stopping. Note that our models may stop _before_ reaching this maximum. This parameter only specifies the absolute maximum number of tokens to generate. Different models have different maximum values for this parameter. See [models](https://docs.anthropic.com/en/docs/models-overview) for details.
Temperature:
  description: Amount of randomness injected into the response. Use `temperature` closer to `0.0` for analytical / multiple choice, and closer to `1.0` for creative and generative tasks. Note that even with `temperature` of `0.0`, the results will not be fully deterministic.
{% endconfiguration_basic %}
