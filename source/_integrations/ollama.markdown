---
title: Ollama
description: Instructions on how to integrate Ollama
ha_category:
  - Voice
ha_release: 2024.4
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@synesthesiam'
ha_domain: ollama
ha_integration_type: service
related:
  - docs: /docs/configuration/templating/
    title: Home Assistant Templating
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /docs/automation/trigger/#sentence-trigger
    title: Sentence trigger
ha_platforms:
  - conversation
---

The **Ollama** {% term integration %} adds a conversation agent in Home Assistant powered by a local [Ollama](https://ollama.com/) server.

Controlling Home Assistant is an experimental feature that provides the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI is able to provide you information about your devices and control them.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

This integration requires an external Ollama server, which is available for macOS, Linux, and Windows. Follow the [download instructions](https://ollama.com/download) to install the server. Once installed, configure Ollama to be [accessible over the network](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-can-i-expose-ollama-on-my-network).

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
URL:
  description: The URL of the external Ollama server, such as `http://localhost:11434`.
Model:
  description: Name of the [Ollama model](https://ollama.com/library) to use, such as `mistral` or `llama2:13b`. Models will be automatically downloaded during setup.
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/configuration/templating/).
Control Home Assistant:
  description: If the model is allowed to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it. This feature is considered experimental and see [Controlling Home Assistant](#controlling-home-assistant) below for details on model limitations.
Context window size:
  description: "The context window size is the number of tokens the model can take as input. Home Assistant defaults to 8k, which is larger than the default value in Ollama Server (2k), and you may adjust it based on the maximum context size of the specific model used. A larger value will better support larger homes with more entities, and smaller values may lower Ollama server RAM usage."
Max history messages:
  description: Maximum number of messages to keep for each conversation (0 = no limit). Limiting this value will cause older messages in a conversation to be dropped.
Keep alive:
  description: Duration in seconds for the Ollama host to keep the model in memory after receiving a message (-1 = no limit, 0 = no retention). Default value is -1.
{% endconfiguration_basic %}

## Controlling Home Assistant

If you want to experiment with local LLMs using Home Assistant, we currently recommend using the `llama3.1:8b` model and exposing fewer than 25 entities. Note that smaller models are more likely to make mistakes than larger models.

Only models that support [Tools](https://ollama.com/search?c=tools) may control Home Assistant.

Smaller models may not [reliably maintain a conversation](https://llama.meta.com/docs/model-cards-and-prompt-formats/llama3_1/#llama-3.1-instruct) when controlling
Home Assistant is enabled. However, you may use multiple Ollama configurations that
share the same model, but use different prompts:

- Add the Ollama integration without enabling control of Home Assistant. You can use
  this conversation agent to have a conversation.
- Add an additional Ollama integration, using the same model, enabling control of Home Assistant.
  You can use this conversation agent to control Home Assistant.
