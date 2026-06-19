---
title: LLM
description: Organizes the LLM APIs that large language models can use in Home Assistant.
ha_category:
  - Voice
ha_release: 2026.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: llm
ha_integration_type: system
---

The **LLM** {% term integration %} organizes the [LLM APIs](https://developers.home-assistant.io/docs/core/llm/) that large language models can use to interact with Home Assistant. An LLM API is a set of tools that a model can call, for example to control your devices or answer questions about your home.

This integration provides the framework that lets other integrations contribute tools to an LLM API. It is set up automatically when needed and has no configuration options.

To let a conversation agent use an LLM API, configure it on the conversation agent integration, such as [Ollama](/integrations/ollama/), [Google Generative AI](/integrations/google_generative_ai_conversation/), or [OpenAI](/integrations/openai_conversation/).
