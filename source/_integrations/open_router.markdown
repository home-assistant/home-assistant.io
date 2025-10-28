---
title: OpenRouter
description: Instructions on how to integrate OpenRouter as a conversation agent
ha_category:
  - AI
  - Voice
ha_release: 2025.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: open_router
ha_integration_type: service
ha_platforms:
  - ai_task
  - conversation
ha_quality_scale: bronze
---

The [OpenRouter](https://openrouter.ai/) {% term integration %} allows you to use the OpenRouter API as a conversation agent in Home Assistant.

This integration provides a way to interact with a wide range of AI models available on OpenRouter, while billing is handled by OpenRouter.
You can even use your own third-party (like OpenAI) API key.

{% include integrations/config_flow.md %}

## Generate an API Key

The API key is used to authenticate requests to OpenRouter. To generate an API key take the following steps:

- Log in to [OpenRouter](https://openrouter.ai/) or sign up for an account.
- Go to the **API Keys** section in your account settings.
- To generate a new key, select **Create API Key**.
- Give the key a name, and be sure to set up billing limits.

# Supported functionality

## Generating data with AI

The OpenRouter integration allows you to generate data using AI models available on OpenRouter. You can use this functionality in automations, scripts, or directly in the Home Assistant UI.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
