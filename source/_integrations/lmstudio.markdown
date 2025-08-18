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

## Prerequisites

To use this integration, you need to have an LM Studio server running on your local machine or on a computer on the local network. 
- LM Studio is a desktop application that lets you run Large Language Models (LLMs) locally, using an API that is compatible with OpenAI. 
- You can download LM Studio for macOS, Linux, or Windows from the [official website](https://lmstudio.ai/). 
- After installing LM Studio, open the application and start the local server. Make sure the server is accessible on your network, usually at `http://YOUR_LOCAL_IP:1234`.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Base URL:
  description: The URL of the LM Studio local server, such as `http://localhost:1234` or `http://192.168.1.100:1234`.
API key:
  description: Optional API key for authentication if you've configured one in LM Studio. Leave empty if no authentication is required.
Model:
  description: Name of the model to use. The integration will automatically fetch available models from your LM Studio server during setup.
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/configuration/templating/).
Control Home Assistant:
  description: If the model is allowed to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it. This feature is considered experimental. For details on model limitations, refer to the section [Controlling Home Assistant](#controlling-home-assistant).
Max tokens:
  description: Maximum number of tokens to generate in the response. Higher values allow for longer responses but may increase processing time.
Temperature:
  description: Controls randomness in the AI's responses. Lower values (0.1-0.3) make responses more focused and deterministic, while higher values (0.7-1.0) make them more creative and varied.
Top P:
  description: Controls diversity via nucleus sampling. Lower values focus on more probable tokens, while higher values allow more diverse responses.
Max history messages:
  description: Maximum number of messages to keep for each conversation (0 = no limit). Limiting this value will cause older messages in a conversation to be dropped.
{% endconfiguration_basic %}

## Configuration options — detailed guide

This section explains every configuration option you see while adding the
integration in Home Assistant. Read the short tip under each option if you are
unsure what to pick.

{% configuration_basic %}
Base URL:
  description: |
    The address of the LM Studio local server. Use the address shown in the
    LM Studio app under the **Local Server** settings. Examples:

    - `http://localhost:1234` — when LM Studio runs on the same machine as
      Home Assistant.
    - `http://192.168.1.42:1234` — when LM Studio runs on another computer on
      your local network.

    Tip: include the `http://` prefix and the port (default 1234). If the
    server is not reachable, Home Assistant will show a connection error.

API Key:
  description: |
    Optional key if you enabled authentication on the LM Studio server. Leave
    this blank if you did not enable authentication. If you later enable an
    API key on LM Studio, reconfigure the integration and add the same key.

Model:
  description: |
    Select which model to use from the models that LM Studio serves. The
    integration queries your LM Studio server during setup and shows a list of
    available models. If no models appear, confirm the server is running and
    that you allowed access on the network.

Instructions (Prompt):
  description: |
    A short system prompt or instructions that tell the model how to behave.
    This can be any text, including Home Assistant templates. A good default
    is a short instruction such as: "You are a Home Assistant assistant. Be
    concise and only use Home Assistant features when asked." You can leave
    this empty to use the integration default.

Max history messages:
  description: |
    The number of past messages the integration will keep in memory for each
    conversation. More history helps the model remember context but increases
    the prompt size and memory use. Set to `0` for no limit (not recommended
    for small models). A sensible default is 20–50.

Control Home Assistant:
  description: |
    When enabled, the model can call Home Assistant functions and control
    entities that you explicitly *expose* to Assist. Only models that support
    function calling/tools will be able to control Home Assistant. This option
    is experimental.

Advanced options:
  description: |
        Advanced settings that affect response length, randomness, and diversity.
        Change these only if you understand the trade-offs in latency, memory,
        and reliability.

Advanced options - Max tokens:
  description: |
    Maximum number of tokens the model may generate in a single response. A
    higher value allows longer responses at the cost of CPU, RAM, and latency.
    Typical values:
    - 256 — short replies, faster responses, low memory use.
    - 512 — balanced length and cost.
    - 1024+ — long replies, may be slow or fail on small models.

    Tip: start with 256 or 512 and increase only if the replies are too short.

Advanced options - Temperature:
  description: |
    Controls randomness in the model's responses. Use lower values for
    predictable answers and higher values for creativity. Typical ranges:
    - 0.0–0.3 — deterministic answers (recommended for automation and
      controlling devices).
    - 0.4–0.7 — balanced.
    - 0.8–1.0 — creative, but may be less reliable.

Advanced options - Top P:
  description: |
    Alternate way to control response diversity (nucleus sampling). If you set
    both temperature and top_p, they work together. Use values between 0.1 and
    1.0. Lower values make output more focused.

{% endconfiguration_basic %}

## Tips and notes for beginners

- Keep things small at first: choose one model, set **Max tokens** to 256, and
  set **Max history messages** to 20.
- Use lower **Temperature** (0.0–0.3) when you want predictable behavior.
- Expose only the entities the assistant needs to know about. This improves
  privacy and reduces mistakes.
- If you want a conversational assistant only (no device control), disable
  *Control Home Assistant* — the model will still answer questions.
- If you have a weak CPU-only device, prefer smaller models or run LM Studio
  on a more powerful machine.

## Troubleshooting

### 1) Home Assistant shows "Authentication failed" or "Failed to connect"

1. Verify LM Studio is running and the Local Server is started.
2. Confirm the `Base URL` in the integration includes the correct port and
   protocol (for example `http://192.168.1.42:1234`).
3. If you set an API key in LM Studio, add the same key in the integration.
4. Check the firewall settings on the LM Studio host. Allow incoming connections
   on the configured port.

### 2) No models found during setup

  1. Open LM Studio on the host machine and go to the **Local Server** tab to check if a model is already loaded.
  2. If you have not downloaded any models, open the model browser in LM Studio and download at least one model to serve.
  3. Select a model for serving in LM Studio integration — LM Studio will automatically load the selected model for the server, so you do not need to check the **Local Server** tab again to confirm the model is already loaded
  4. If LM Studio runs on a different machine than Home Assistant, make sure **Serve on Local Network** is enabled on the **Local Server** tab
  5. If LM Studio runs on the same machine as Home Assistant, try `http://localhost:1234`

### 3) Model answers are short, off-topic, or inconsistent

- Increase **Max tokens** (try 512) for longer answers.
- Increase **Max history messages** if the model forgets earlier context.
- Lower **Temperature** and **Top P** for more deterministic replies.
- Adjust the *Instructions* prompt to be clearer about the assistant's role.

### 4) Model suggests an action but Home Assistant does not execute it

1. Confirm *Control Home Assistant* is enabled for that integration entry.
2. Make sure the entity the model tries to control is *exposed* to Assist.
3. Check Home Assistant logs for the function call validation error; the
   integration validates inputs before running actions.

### 5) Slow responses or out-of-memory errors

- Use a smaller model or move LM Studio to a machine with more RAM/CPU.
- Lower **Max tokens** and **Max history messages**.
- If running LM Studio on a GPU, ensure drivers and runtime are configured
  correctly in LM Studio.

## Reconfiguring the integration

To change settings after setup, go to **Settings** > **Devices & Services**,
find the LM Studio integration entry, and choose *Options* or *Reconfigure*.
When you reconfigure the `Base URL` or `API Key`, Home Assistant will test the
connection and refresh the available model list.

## Advanced notes for power users

- You can run multiple LM Studio config entries with different prompts or
  permissions (for example, one for casual chat and another that can control
  Home Assistant).
- When enabling control for an assistant, prefer larger models that support
  stable function calling behavior.
- For headless deployments (LM Studio as a service), see the
  [LM Studio headless documentation](https://lmstudio.ai/docs/app/api/headless).

## Controlling Home Assistant

If you want to experiment with local LLMs using Home Assistant, we recommend exposing fewer than 25 entities. Note that smaller models are more likely to make mistakes than larger models.

Only models that support function calling/tools may control Home Assistant. Most modern instruction-tuned models support this functionality, but check your specific model's capabilities.

Smaller models may not reliably maintain a conversation when controlling Home Assistant is enabled. However, you can use multiple LM Studio configurations that share the same model but use different prompts:

- Add the LM Studio integration without enabling control of Home Assistant. You can use this conversation agent to have a conversation.
- Add an additional LM Studio integration, using the same model, enabling control of Home Assistant. You can use this conversation agent to control Home Assistant.

<!-- 
TBD Split PR
## AI Task Platform

The LM Studio integration also supports Home Assistant's AI task platform, allowing you to use local LLMs for structured data generation in automations and scripts. This enables you to:

- Generate structured responses based on sensor data
- Create dynamic content for notifications
- Process and analyze data from your smart home devices
- Generate summaries or insights from historical data 

-->

## Setting up LM Studio

1. Download and install [LM Studio](https://lmstudio.ai/) for your operating system (Windows, macOS, or Linux).
2. Launch LM Studio and download your preferred model from the built-in model browser.
3. Go to the **Local Server** tab in LM Studio. If you do not see this option, select **Power User** at the bottom left of the window.
4. Configure the server settings:
   - Set the port (default is 1234)
   - Choose your model
   - Select "Serve on Local Network" if accessing from different machines
   - Optionally set up CORS settings if accessing from different machines
5. Click **"Start Server"** to begin the local API server.
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
