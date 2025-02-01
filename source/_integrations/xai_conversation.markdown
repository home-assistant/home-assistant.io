---
title: xAI Conversation
description: Instructions on how to integrate xAI as a conversation agent
ha_category:
  - Voice
ha_release: 2023.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@dwardu89'
ha_domain: xAI_conversation
ha_integration_type: service
ha_platforms:
  - conversation
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://console.x.ai
    title: xAI Console
  - url: https://www.xAI.com
    title: xAI
---

The xAI integration adds a conversation agent powered by [xAI](https://www.x.ai) in Home Assistant.

Controlling Home Assistant is done by providing the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI is able to provide you information about your devices and control them.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

{% include integrations/config_flow.md %}

## Generate an API Key

The xAI key is used to authenticate requests to the xAI API. To generate an API key take the following steps:

- Log in to the [xAI portal](https://x.ai/api) or sign up for an account.
- Enable billing with a valid credit card
- Configure usage limits by navigating to Billing -> Credits.
- Visit the API Keys page to create the API key you'll use to configure the integration.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/configuration/templating/).
Control Home Assistant:
  description: If the model is allowed to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
Recommended settings:
  description: If enabled, the recommended model and settings are chosen.
{% endconfiguration_basic %}

If you choose to not use the recommended settings, you can configure the following options:

{% configuration_basic %}
Model:
  description: The GPT language model is used for text generation. You can find more details on the available models in the [Models and Pricing Documentation](https://docs.x.ai/docs/models). The default is "grok-2".
Maximum Tokens to Return in Response:
  description: The maximum number of words or "tokens" that the AI model should generate in its completion of the prompt. For more information, see the [xAI Completion Documentation](https://docs.x.ai/docs/api-reference#chat-completions).
Temperature:
  description: A value that determines the level of creativity and risk-taking the model should use when generating text. A higher temperature means the model is more likely to generate unexpected results, while a lower temperature results in more deterministic results. See the [xAI Completion Documentation](https://platform.xAI.com/docs/guides/completion/introduction) for more information.
Top P:
  description: An alternative to temperature, top_p determines the proportion of the most likely word choices the model should consider when generating text. A higher top_p means the model will only consider the most likely words, while a lower top_p means a wider range of words, including less likely ones, will be considered. For more information, see the [xAI Completion API Reference](https://platform.xAI.com/docs/api-reference/completions/create#completions/create-top_p).
{% endconfiguration_basic %}
