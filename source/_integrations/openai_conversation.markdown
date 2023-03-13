---
title: OpenAI Conversation
description: Instructions on how to integrate OpenAI as a conversation agent
ha_category:
  - Voice
ha_release: 2023.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@balloob'
ha_domain: openai_conversation
ha_integration_type: service
---

The OpenAI integration adds a conversation agent powered by [OpenAI](https://www.openai.com) in Home Assistant.

This conversation agent is unable to control your house. It can only query information that has been provided by Home Assistant. To be able to answer questions about your house, Home Assistant will need to provide OpenAI with the details of your house, which include areas, devices and their states.

This integration requires an API key to use, [which you can generate here.](https://platform.openai.com/account/api-keys). This is a paid service, we advise you to monitor your costs in the [OpenAI portal](https://platform.openai.com/account) closely and configure [usage limits](https://platform.openai.com/account/billing/limits) to avoid unwanted costs associated with using the service.

{% include integrations/config_flow.md %}

### Generate an API Key

The OpenAI key is used to authenticate requests to the OpenAI API. To generate an API key take the following steps:

- Log in to the [OpenAI portal](https://platform.openai.com/account) or sign up for an account.
- Enable billing with a valid credit card
- Configure [usage limits](https://platform.openai.com/account/billing/limits).
- Visit the [API Keys page](https://platform.openai.com/account/api-keys) to retrieve the API key you'll use to configure the integration.

{% include integrations/option_flow.md %}
{% configuration_basic %}
Prompt Template:
  description: The starting text for the AI language model to generate new text from. This text can include information about your Home Assistant instance, devices, and areas and is written using [Home Assistant Templating](/docs/configuration/templating/).

Completion Model:
  description: The GPT-3 language model is used for text generation. You can find more details on the available models in the [OpenAI GPT-3 Documentation](https://platform.openai.com/docs/models/gpt-3).

Maximum Tokens to Return in Response:
  description: The maximum number of words or "tokens" that the AI model should generate in its completion of the prompt. For more information, see the [OpenAI Completion Documentation](https://platform.openai.com/docs/guides/completion/introduction).

Temperature:
  description: A value that determines the level of creativity and risk-taking the model should use when generating text. A higher temperature means the model is more likely to generate unexpected results, while a lower temperature results in more deterministic results. See the [OpenAI Completion Documentation](https://platform.openai.com/docs/guides/completion/introduction) for more information.

Top P:
  description: An alternative to temperature, top_p determines the proportion of the most likely word choices the model should consider when generating text. A higher top_p means the model will only consider the most likely words, while a lower top_p means a wider range of words, including less likely ones, will be considered. For more information, see the [OpenAI Completion API Reference](https://platform.openai.com/docs/api-reference/completions/create#completions/create-top_p).

{% endconfiguration_basic %}
