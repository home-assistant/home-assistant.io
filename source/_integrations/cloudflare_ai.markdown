---
title: Cloudflare Workers AI
description: Instructions on how to integrate Cloudflare Workers AI as a conversation agent
ha_category:
  - AI
  - Voice
ha_release: "2026.5"
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: cloudflare_ai
ha_integration_type: service
ha_platforms:
  - conversation
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - url: https://developers.cloudflare.com/workers-ai/
    title: Cloudflare Workers AI
  - url: https://developers.cloudflare.com/ai-gateway/
    title: Cloudflare AI Gateway
  - url: https://dash.cloudflare.com/profile/api-tokens
    title: Cloudflare API Tokens
ha_quality_scale: bronze
---

The **Cloudflare Workers AI** {% term integration %} adds a conversation agent powered by [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) in Home Assistant.

Controlling Home Assistant is done by providing the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI is able to provide you information about your devices and control them.

This integration supports any text generation model available on the [Workers AI model catalog](https://developers.cloudflare.com/workers-ai/models/), including Kimi K2.5, Llama, Mistral, Qwen, and many others. Requests can optionally be routed through [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/) for analytics, caching, and rate limiting.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

## Prerequisites

You need a Cloudflare account with Workers AI access. The free tier includes a generous allowance of inference requests. To set up the integration, you need:

1. Your **Cloudflare Account ID**, found in the Cloudflare dashboard sidebar.
2. A **Cloudflare API Token** with "Workers AI Read" permission. You can create one at [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens).
3. (Optional) An **AI Gateway** name, if you want to route requests through [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Account ID:
  description: "Your Cloudflare Account ID, found in the Cloudflare dashboard sidebar."
API Token:
  description: "An API token with Workers AI Read permission."
Use AI Gateway:
  description: "Enable to route requests through Cloudflare AI Gateway for analytics, caching, and rate limiting."
AI Gateway ID:
  description: "The name of your AI Gateway. Only required if AI Gateway is enabled."
AI Gateway API Token:
  description: "A separate API token for AI Gateway authentication. Leave empty to use the same API token."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

The integration provides the following type of subentry:

- [Conversation](/integrations/conversation/)

The conversation subentry has the following configuration options:

{% configuration_basic %}
Model:
  description: "The Workers AI model to use for conversation. Any model from the [text generation catalog](https://developers.cloudflare.com/workers-ai/models/?feature=text-generation) can be used. The default is `@cf/moonshotai/kimi-k2.5`, which supports function calling for device control."
Control Home Assistant:
  description: "Select which Home Assistant APIs the model can use to control your home. Requires a model that supports function calling."
System prompt:
  description: "Instructions for the AI on how it should respond to your requests. Written using [Home Assistant Templating](/docs/configuration/templating/)."
Max output tokens:
  description: "The maximum number of tokens the model should generate."
Temperature:
  description: "Controls randomness. Lower values are more focused and deterministic, higher values are more creative."
Enable reasoning:
  description: "When enabled, the model reasons step-by-step before answering. Improves accuracy but increases response time. Supported by Kimi K2.5, QwQ, and other reasoning models."
{% endconfiguration_basic %}

## Supported models

You can use any model from the [Workers AI text generation catalog](https://developers.cloudflare.com/workers-ai/models/?feature=text-generation). The configuration dropdown shows popular options but also accepts custom model IDs.

Some commonly used models:

- `@cf/moonshotai/kimi-k2.5` (default, fast, 256k context, function calling)
- `@cf/meta/llama-3.3-70b-instruct-fp8-fast`
- `@cf/meta/llama-4-scout-17b-16e-instruct`
- `@cf/openai/gpt-oss-120b`
- `@cf/qwen/qwen3-30b-a3b-fp8`
- `@cf/mistralai/mistral-small-3.1-24b-instruct`

## Known limitations

- **Streaming**: Chat responses are streamed in real-time when no tools are active. When tool calling is enabled (Assist API), responses use non-streaming mode to ensure reliable function call parsing.
- **Reasoning mode**: When "Enable reasoning" is on, the model thinks step-by-step before responding. This improves accuracy but adds latency. For voice assistants, keeping reasoning disabled is recommended for faster responses.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
