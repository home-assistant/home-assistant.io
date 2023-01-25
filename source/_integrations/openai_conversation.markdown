---
title: OpenAI conversation agent
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

The OpenAI integration adds a conversation agent powered by [OpenAI](https://www.openai.com) completion models in Home Assistant.

This conversation agent is unable to control your house. It can only query information that has been provided by Home Assistant.

This integration requires an API key to use, [which you can generate here.](https://beta.openai.com/account/api-keys).

{% include integrations/config_flow.md %}
