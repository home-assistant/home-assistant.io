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
  - docs: /docs/automation/trigger/#sentence-trigger
    title: Sentence trigger
ha_platforms:
  - conversation
---

The **Ollama** {% term integration %} adds a conversation agent in Home Assistant powered by a local [Ollama](https://ollama.com/) server.

This conversation agent is unable to control your house. The Ollama conversation agent can be used in automations, but not as a [sentence trigger](/docs/automation/trigger/#sentence-trigger). It can only query information that has been provided by Home Assistant. To be able to answer questions about your house, Home Assistant will need to provide Ollama with the details of your house, which include areas, devices, and their states. 

This integration requires an external Ollama server, which is available for macOS, Linux, and Windows. Follow the [download instructions](https://ollama.com/download) to install the server. Once installed, configure Ollama to be [accessible over the network](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-can-i-expose-ollama-on-my-network).

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}
{% configuration_basic %}
URL:
  description: The URL of the external Ollama server, such as `http://localhost:11434`.
  
Model:
  description: Name of the [Ollama model](https://ollama.com/library) to use, such as `mistral` or `llama2:13b`. Models will be automatically downloaded during setup.
  
Prompt template:
  description: The starting text for the AI language model to generate new text from. This text can include information about your Home Assistant instance, devices, and areas and is written using [Home Assistant Templating](/docs/configuration/templating/).

Max history messages:
  description: Maximum number of messages to keep for each conversation (0 = no limit). Limiting this value will cause older messages in a conversation to be dropped.

{% endconfiguration_basic %}
