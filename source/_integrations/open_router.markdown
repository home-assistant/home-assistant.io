---
title: OpenRouter
description: Instructions on how to integrate OpenRouter as a conversation agent
ha_category:
  - Voice
ha_release: 2025.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: open_router
ha_integration_type: service
ha_platforms:
  - conversation
---

The [OpenRouter](https://openrouter.ai/) integration allows you to use the OpenRouter API as a conversation agent in Home Assistant.

This integration provides a way to interact with a wide range of AI models available on OpenRouter, while billing is handled by OpenRouter.
You can even use your own third-party (like OpenAI) API key.

{% include integrations/config_flow.md %}

## Generate an API Key

The API key is used to authenticate requests to OpenRouter. To generate an API key take the following steps:

- Log in to [OpenRouter](https://openrouter.ai/) or sign up for an account.
- Navigate to the "API Keys" section in your account settings.
- Press "Create API Key" to generate a new key and give the key a name, and be sure to set up billing limits.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}