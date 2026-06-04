---
title: LiteLLM
description: Instructions on how to integrate LiteLLM as a conversation agent
ha_category:
  - AI
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

LiteLLM exposes an OpenAI-compatible API in front of a wide range of model providers. Because the proxy is self-hosted, this integration lets you point Home Assistant at your own endpoint instead of a hosted service.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The base URL of your LiteLLM proxy, including the host and port. The integration automatically appends the OpenAI `/v1` path if it is missing.
API key:
  description: An optional LiteLLM API key or virtual key. Leave it empty if your proxy does not require authentication.
{% endconfiguration_basic %}

## Prerequisites

You need a running [LiteLLM proxy](https://docs.litellm.ai/docs/simple_proxy) that is reachable from your Home Assistant instance, with at least one model configured. The integration discovers the available models from the proxy during setup.

## Supported functionality

### Conversation agent

The integration adds a conversation agent for each configured model that can be used in [Assist](/voice_control/). When you grant it control of Home Assistant, the agent can call the configured tools to interact with your devices and entities. To choose which devices and entities the agent can access, see [exposing entities to Assist](/voice_control/voice_remote_expose_devices/).

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
