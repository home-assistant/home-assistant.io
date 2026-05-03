---
title: Open Responses
description: Instructions on how to integrate an OpenAI Responses API-compatible endpoint as a conversation agent
ha_category:
  - AI
  - Voice
ha_release: 2026.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Komzpa'
ha_domain: open_responses
ha_integration_type: service
ha_platforms:
  - ai_task
  - conversation
ha_quality_scale: bronze
related:
  - docs: /integrations/openai_conversation/
    title: OpenAI
  - docs: /integrations/open_router/
    title: OpenRouter
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
---

The **Open Responses** {% term integration %} lets Home Assistant use an endpoint that implements the OpenAI Responses API. You can use it with a proxy, gateway, load balancer, or provider that exposes a Responses-compatible API surface and supports the models and tools you configure in Home Assistant.

Use this integration when you want to connect Home Assistant to an OpenAI Responses API-compatible endpoint that is not the official OpenAI API endpoint. If you use the official OpenAI API endpoint directly, use the [OpenAI integration](/integrations/openai_conversation/) instead.

Controlling Home Assistant is done by giving the conversation agent access to the Assist API. You can control which devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}.

## Prerequisites

Before setting up the integration, make sure you have:

- An API key for your Responses-compatible endpoint
- The full API base URL for the endpoint
- A model name supported by that endpoint

The base URL must point to the API root used by the OpenAI Python SDK. For many compatible endpoints, this ends in `/v1`.

{% important %}
Home Assistant validates that the endpoint can list models during setup. After setup, compatibility depends on the endpoint implementing the Responses API features you enable, such as tool calling, structured output, web search, code interpreter, and image generation. If an endpoint behaves differently from the official OpenAI API, reproduce the issue against that endpoint before reporting it to Home Assistant.
{% endimportant %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key used to authenticate requests to your Responses-compatible endpoint."
Base URL:
  description: "The full API base URL for your Responses-compatible endpoint."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

The integration provides the following types of subentries:

- [Conversation](/integrations/conversation/)
- [AI Task](/integrations/ai_task/)

The Conversation and AI Task subentries have the following configuration options. Some options may be unavailable depending on the subentry type or selected model.

{% configuration_basic %}
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant templating](/docs/templating/).
Control Home Assistant:
  description: If enabled, the model can interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
Recommended settings:
  description: If enabled, Home Assistant uses the recommended model and settings.
{% endconfiguration_basic %}

If you choose not to use the recommended settings, you can configure the following options:

{% configuration_basic %}
Model:
  description: The model name to send to your Responses-compatible endpoint. The value must match a model supported by that endpoint.
Maximum tokens to return in response:
  description: The maximum number of output tokens the model can generate.
Temperature:
  description: Controls the creativity of the model response. Higher values can make responses more varied, while lower values make responses more deterministic.
Top P:
  description: Controls nucleus sampling. Lower values make the model consider fewer likely tokens.
Store requests and responses:
  description: If enabled, Home Assistant asks the endpoint to store requests and responses. Whether this is supported, where data is stored, and how long it is retained depends on your endpoint.
Service tier:
  description: The service tier value to send to the endpoint. Whether Auto, Standard, Flex, or Priority are supported depends on your endpoint and selected model.
Enable web search:
  description: Allows the model to use web search through the Responses API if your endpoint supports it.
Search context size:
  description: Controls how much context the web search tool can retrieve if web search is enabled and supported by your endpoint.
Include home location:
  description: Allows Home Assistant to use the location of your Home Assistant instance to provide more relevant web search results.
Code interpreter:
  description: Allows the model to use the code interpreter tool if your endpoint and model support it.
Image model:
  description: The image model to use when generating images with AI Task if your endpoint supports image generation.
Reasoning effort:
  description: Controls how many reasoning tokens the model can use before creating a response if the selected model supports reasoning.
Reasoning summary:
  description: Controls the length and detail of reasoning summaries provided by the model if the selected model supports reasoning summaries.
Verbosity:
  description: Controls response detail for models that support verbosity.
{% endconfiguration_basic %}

## Supported functionality

The Open Responses integration supports:

- Conversation agents for Assist
- AI Task data generation
- AI Task image generation when the endpoint supports Responses API image generation
- Home Assistant tool calling through the Assist API
- Responses API options such as structured output, reasoning settings, web search, code interpreter, and response storage when supported by the endpoint

## Known limitations

Open Responses is a compatibility integration. It does not translate requests between different provider APIs, add provider-specific fallback behavior, or hide endpoint compatibility problems.

If setup succeeds but a later request fails, check whether your endpoint supports the exact Responses API feature used by the selected model and subentry options. For example, an endpoint might support basic text responses but not web search, code interpreter, image generation, or reasoning summaries.

## Troubleshooting

### The integration cannot connect during setup

Check that the base URL is reachable from Home Assistant and points to the API root expected by the OpenAI Python SDK. Also check that the API key has permission to list models.

### A model or tool fails after setup

Disable advanced options such as web search, code interpreter, image generation, reasoning summaries, or response storage, then try again. If the request works with fewer options enabled, the endpoint likely does not support one of the selected Responses API features.

### Issues with a compatible endpoint

If the issue happens only with a third-party endpoint, proxy, or gateway, report it to that endpoint first. Home Assistant can usually fix bugs in how it calls the Responses API, but it cannot fix differences in endpoint behavior.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
