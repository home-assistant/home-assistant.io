---
title: LiteLLM
description: Instructions on how to integrate LiteLLM as a conversation agent
ha_category:
  - AI
  - Voice
ha_release: 2026.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@luismalves'
ha_domain: litellm
ha_integration_type: service
ha_platforms:
  - conversation
ha_quality_scale: bronze
---

The [LiteLLM](https://www.litellm.ai/) {% term integration %} allows you to use a self-hosted LiteLLM proxy as a conversation agent in Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The base URL of your LiteLLM proxy, including the host and port (for example `homeassistant.local`). The integration automatically appends the OpenAI `/v1` path if it is missing."
API key:
  description: "An optional LiteLLM API key or virtual key. Leave it empty if your proxy does not require authentication."
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
