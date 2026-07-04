---
title: llama.cpp
description: Instructions on how to integrate llama.cpp (and other OpenAI-compatible servers) as a conversation agent.
ha_category:
  - AI
  - Voice
ha_release: 2026.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: llama_cpp
ha_integration_type: service
ha_platforms:
  - conversation
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
ha_quality_scale: bronze
ha_codeowners:
  - '@allenporter'
---

The **llama.cpp** {% term integration %} allows you to use a local or remote server that implements the OpenAI-compatible chat completions API as a conversation agent in Home Assistant.

This integration lets you connect with self-hosted models running on servers such as llama.cpp, llama-cpp-python, vLLM, DeepSeek, or other compatible API backends.

{% note %}
If you are using Ollama, you should prefer the official [Ollama](/integrations/ollama/) integration.
{% endnote %}

{% note %}
If you are using OpenRouter, you should prefer the official [OpenRouter](/integrations/open_router/) integration.
{% endnote %}

Controlling Home Assistant is done by providing the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI can provide you information about your devices and control them.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

## Prerequisites

This integration requires an external server running an OpenAI-compatible API. Standard examples of compatible servers and their typical URLs include:

- **llama.cpp**: Running on `http://localhost:8080/v1` or another port of your choosing. See the [llama.cpp quick start guide](https://github.com/ggml-org/llama.cpp/tree/master#quick-start) for more details.
- **llama-cpp-python**: Running on `http://localhost:8000/v1` or another port of your choosing. See the [llama-cpp-python installation guide](https://llama-cpp-python.readthedocs.io/en/latest/#installation) for more details.
- **vLLM**: Running on `http://localhost:8000/v1` or another port of your choosing. See the [vLLM installation guide](https://docs.vllm.ai/en/latest/getting_started/installation/) for more details.
- **DeepSeek**: Using the cloud API URL `https://api.deepseek.com`.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The base URL of your running OpenAI-compatible server. For example, `http://localhost:8080/v1`."
API key:
  description: "The API key to use when connecting to the server. This is optional if your server does not require authentication."
{% endconfiguration_basic %}

Once the connection is established, you will be prompted to select the chat model to use.

{% include integrations/option_flow.md %}

The conversation agent has the following configuration options:

{% configuration_basic %}
Instructions:
  description: "Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/templating/)."
Control Home Assistant:
  description: "Select the level of control over Home Assistant. The model can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it."
Recommended model settings:
  description: "Select whether to use recommended model settings. If enabled, default values are used for max tokens, temperature, and top P."
{% endconfiguration_basic %}

If you choose not to use the recommended settings, you can configure the following options:

{% configuration_basic %}
Model:
  description: "The language model used for text generation."
Maximum tokens to return in response:
  description: "The maximum number of tokens that the AI model should generate in its completion of the prompt."
Temperature:
  description: "A value that determines the level of creativity and risk-taking the model should use when generating text. A higher temperature means the model is more likely to generate unexpected results, while a lower temperature results in more deterministic results."
Top P:
  description: "An alternative to temperature, top P determines the proportion of the most likely word choices the model should consider when generating text."
{% endconfiguration_basic %}

## Supported functionality

The **llama.cpp** integration provides the following entities:

- **Conversation agent**: A conversation agent that can handle text-based queries, respond to requests, and control Home Assistant devices when configured to do so

## Known limitations

This integration requires an external server that implements the OpenAI-compatible chat completions API. Features that depend on specific proprietary API properties (such as billing or usage tracking) are not supported.

## Troubleshooting

### Cannot connect to the server

#### Symptom: Connection failed or timed out during setup

When configuring the integration, you receive a connection error.

#### Resolution

To resolve this issue, try the following steps:

1. Confirm the server is running and reachable from the Home Assistant host.
2. Verify that the URL contains the correct protocol (HTTP or HTTPS), hostname, port, and path (such as `/v1`).
3. Ensure any firewall or network settings do not block connections between Home Assistant and the server.
4. If authentication is required, verify that the API key is correct.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
