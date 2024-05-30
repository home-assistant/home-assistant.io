---
title: Azure OpenAI Conversation
description: Instructions on how to integrate Azure OpenAI as a conversation agent
ha_category:
  - Voice
ha_release: 2024.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@zweckj'
ha_domain: azure_openai_conversation
ha_integration_type: service
ha_platforms:
  - conversation
---

The Azure OpenAI integration adds a conversation agent powered by [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service) in Home Assistant.

Controlling Home Assistant is done by providing the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI is able to provide you information about your devices and control them.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

This integration requires an Azure OpenAI instance, with an active model deployed.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}
{% configuration_basic %}
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/configuration/templating/).

Control Home Assistant:
  description: If the model is allowed to interact with Home Assistant

Recommended settings:
  description: If enabled, the recommended model and settings are chosen.

{% endconfiguration_basic %}

If you choose to not use the recommended settings, you can configure the following options:

{% configuration_basic %}

Model:
  description: The GPT language model is used for text generation. You can find more details on the available models in the [OpenAI GPT-3 Documentation](https://platform.openai.com/docs/models/gpt-3), [OpenAI GPT-3.5 Documentation](https://platform.openai.com/docs/models/gpt-3-5), or [OpenAI GPT-4 and GPT-4 Turbo Documentation](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo). The default is "gpt-3.5-turbo".

Maximum Tokens to Return in Response:
  description: The maximum number of words or "tokens" that the AI model should generate in its completion of the prompt. For more information, see the [OpenAI Completion Documentation](https://platform.openai.com/docs/guides/completion/introduction).

Temperature:
  description: A value that determines the level of creativity and risk-taking the model should use when generating text. A higher temperature means the model is more likely to generate unexpected results, while a lower temperature results in more deterministic results. See the [OpenAI Completion Documentation](https://platform.openai.com/docs/guides/completion/introduction) for more information.

Top P:
  description: An alternative to temperature, top_p determines the proportion of the most likely word choices the model should consider when generating text. A higher top_p means the model will only consider the most likely words, while a lower top_p means a wider range of words, including less likely ones, will be considered. For more information, see the [OpenAI Completion API Reference](https://platform.openai.com/docs/api-reference/completions/create#completions/create-top_p).

{% endconfiguration_basic %}
