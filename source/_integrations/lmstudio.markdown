---
title: LM Studio
description: Instructions on how to integrate LM Studio
ha_category:
  - Voice
ha_release: 2025.09
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@apo-mak'
ha_domain: lmstudio
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
  - ai_task
---

The **LM Studio** {% term integration %} adds a conversation agent and AI task support in Home Assistant powered by a local [LM Studio](https://lmstudio.ai/) server.

Controlling Home Assistant is an experimental feature that provides the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI is able to provide you information about your devices and control them.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

This integration requires an external LM Studio server running locally. LM Studio is a desktop application that allows you to run Large Language Models (LLMs) locally on your machine with an OpenAI-compatible API. LMStudio is available for macOS, Linux, and Windows. Download and install LM Studio from their [official website](https://lmstudio.ai/). Once installed, start the local server in LM Studio and ensure it's accessible on your network (typically `http://localhost:1234`).

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Base URL:
  description: The URL of the LM Studio local server, such as `http://localhost:1234` or `http://192.168.1.100:1234`.
API Key:
  description: Optional API key for authentication if you've configured one in LM Studio. Leave empty if no authentication is required.
Model:
  description: Name of the model to use. The integration will automatically fetch available models from your LM Studio server during setup.
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/configuration/templating/).
Control Home Assistant:
  description: If the model is allowed to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it. This feature is considered experimental and see [Controlling Home Assistant](#controlling-home-assistant) below for details on model limitations.
Max tokens:
  description: Maximum number of tokens to generate in the response. Higher values allow for longer responses but may increase processing time.
Temperature:
  description: Controls randomness in the AI's responses. Lower values (0.1-0.3) make responses more focused and deterministic, while higher values (0.7-1.0) make them more creative and varied.
Top P:
  description: Controls diversity via nucleus sampling. Lower values focus on more probable tokens, while higher values allow more diverse responses.
Max history messages:
  description: Maximum number of messages to keep for each conversation (0 = no limit). Limiting this value will cause older messages in a conversation to be dropped.
{% endconfiguration_basic %}

## Controlling Home Assistant

If you want to experiment with local LLMs using Home Assistant, we recommend exposing fewer than 25 entities. Note that smaller models are more likely to make mistakes than larger models.

Only models that support function calling/tools may control Home Assistant. Most modern instruction-tuned models support this functionality, but check your specific model's capabilities.

Smaller models may not reliably maintain a conversation when controlling Home Assistant is enabled. However, you may use multiple LM Studio configurations that share the same model, but use different prompts:

- Add the LM Studio integration without enabling control of Home Assistant. You can use this conversation agent to have a conversation.
- Add an additional LM Studio integration, using the same model, enabling control of Home Assistant. You can use this conversation agent to control Home Assistant.

## AI Task Platform

The LM Studio integration also supports Home Assistant's AI task platform, allowing you to use local LLMs for structured data generation in automations and scripts. This enables you to:

- Generate structured responses based on sensor data
- Create dynamic content for notifications
- Process and analyze data from your smart home devices
- Generate summaries or insights from historical data

## Setting up LM Studio

1. Download and install [LM Studio](https://lmstudio.ai/) for your operating system (Windows, macOS, or Linux).
2. Launch LM Studio and download your preferred model from the built-in model browser.
3. Go to the "Local Server" tab in LM Studio. ( if you do not see this option, you need to select "Power User" on the bottom left of the window )
4. Configure the server settings:
   - Set the port (default is 1234)
   - Choose your model
   - select "Serve on Local Network" if accessing from different machines
   - Optionally set up CORS settings if accessing from different machines
5. Click "Start Server" to begin the local API server.
6. The server will be available at `http://localhost:1234` and `http://YOUR_LOCAL_IP:1234` (or your configured address).

To run LM Studio as a service (headless), see: [https://lmstudio.ai/docs/app/api/headless](https://lmstudio.ai/docs/app/api/headless)

For the official getting started guide, see: [https://lmstudio.ai/docs/app/basics](https://lmstudio.ai/docs/app/basics)

## Privacy and Performance

Since LM Studio runs entirely on your local machine:

- **Privacy**: All conversations and data processing happen locally - nothing is sent to external services
- **No costs**: No API fees or usage limits beyond your hardware capabilities
- **Offline capability**: Works without internet connection once models are downloaded
- **Performance**: Response speed depends on your hardware (CPU/GPU) and model size

For best performance, consider using models optimized for your hardware and adjusting the context window size based on your available RAM.
