---
title: "LM Studio"
description: "Use a local LM Studio server as a conversation agent and AI task provider in Home Assistant."
ha_release: "2026.3"
ha_category: Voice
ha_iot_class: Local Polling
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - "@apo-mak"
ha_domain: lmstudio
ha_integration_type: service
related:
  - docs: /docs/configuration/templating/
    title: Home Assistant Templating
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /docs/automation/trigger/#sentence-trigger
    title: Sentence trigger
---

The LM Studio integration lets you use a local LM Studio server for Assist conversations and AI Task data generation.

## Prerequisites

To use this integration, you need to have an LM Studio server running on your local machine or on a computer on the local network.

- You can download LM Studio for macOS, Linux, or Windows from the [official website](https://lmstudio.ai/).
- Install LM Studio and start the local server.
- Ensure the server is reachable from your Home Assistant host.
- If you enabled authentication for the LM Studio server, keep the API token ready.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "Base URL of your LM Studio server, for example `http://localhost:1234`."
API key:
  description: "API token for your LM Studio server, if authentication is enabled."
{% endconfiguration_basic %}

## Configuration options

{% include integrations/option_flow.md %}

## Basic Configuration

{% configuration_basic %}
Base URL:
  description: |
    The address of the LM Studio local server. Examples: `http://localhost:1234` (same machine) or `http://192.168.1.42:1234` (different machine). Include the `http://` prefix and port number (default 1234).

API Key:
  description: |
    Optional API key for authentication if you've configured one in LM Studio. Leave empty if no authentication is required. More info : [https://lmstudio.ai/docs/developer/core/authentication](https://lmstudio.ai/docs/developer/core/authentication)
{% endconfiguration_basic %}

### Conversation agent options

{% configuration_basic %}
Name:
  description: "Name of the conversation agent."
Model:
  description: "Model identifier to use for chat responses. Auto populated by the LMStudio instance."
Prompt:
  description: "Instructions for how the assistant should respond."
Max history messages:
  description: "Number of previous user messages to include when a new LM Studio thread starts."
Max output tokens:
  description: "Maximum number of tokens to generate."
Temperature:
  description: "Lower values make responses more deterministic."
Top P:
  description: "Limit token sampling to the top P probability mass."
Top K:
  description: "Limit token sampling to the top K tokens."
Min P:
  description: "Minimum probability for token sampling."
Repeat penalty:
  description: "Penalty for repeating token sequences."
Context length:
  description: "Maximum context window size in tokens."
Reasoning effort:
  description: "Reasoning level for supported models."
{% endconfiguration_basic %}

### AI task options

{% configuration_basic %}
Name:
  description: "Name of the AI task entry."
Model:
  description: "Model identifier to use for data generation tasks."
Max output tokens:
  description: "Maximum number of tokens to generate."
Temperature:
  description: "Lower values make responses more deterministic."
Top P:
  description: "Limit token sampling to the top P probability mass."
Top K:
  description: "Limit token sampling to the top K tokens."
Min P:
  description: "Minimum probability for token sampling."
Repeat penalty:
  description: "Penalty for repeating token sequences."
Context length:
  description: "Maximum context window size in tokens."
Reasoning effort:
  description: "Reasoning level for supported models."
{% endconfiguration_basic %}

## Using the integration

1. Select the LM Studio conversation agent in Assist.
2. Use the AI Task integration to generate structured data with your chosen model.

## Tips and notes for beginners

- Keep things small at first: choose one model, set **Max tokens** to 256, and
  set **Max history messages** to 20.
- Use lower **Temperature** (0.0–0.3) when you want predictable behavior.
- Expose only the entities the assistant needs to know about. This improves
  privacy and reduces mistakes.
- If you have a weak CPU-only device, prefer smaller models or run LM Studio
  on a more powerful machine.

## Troubleshooting

### Home Assistant shows "Authentication failed" or "Failed to connect"

1. Verify LM Studio is running and the Local Server is started.
2. Confirm the `Base URL` in the integration includes the correct port and
   protocol (for example `http://192.168.1.42:1234`).
3. If you set an API key in LM Studio, add the same key in the integration.
4. Check the firewall settings on the LM Studio host. Allow incoming connections
   on the configured port.

### No models found during setup

  1. Open LM Studio on the host machine and go to the **Local Server** tab to check if a model is already loaded.
  2. If you have not downloaded any models, open the model browser in LM Studio and download at least one model to serve.
  3. Select a model for serving in LM Studio integration. LM Studio will automatically load the selected model for the server. You do not need to check the **Local Server** tab again to confirm if the model has already been loaded.
  4. If LM Studio runs on a different machine than Home Assistant, make sure **Serve on Local Network** is enabled on the **Local Server** tab.
  5. If LM Studio runs on the same machine as Home Assistant, try `http://localhost:1234`.

### Model answers are short, off-topic, or inconsistent

- Increase **Max tokens** (try 512) for longer answers.
- Increase **Max history messages** if the model forgets earlier context.
- Lower **Temperature** and **Top P** for more deterministic replies.
- Adjust the **Instructions** prompt to be clearer about the assistant's role.

### Model suggests an action, but Home Assistant does not execute it

1. Make sure the entity the model tries to control is *exposed* to Assist.
2. Check Home Assistant logs for the function call validation error; the
   integration validates inputs before running actions.

### Slow responses or out-of-memory errors

- Use a smaller model or move LM Studio to a machine with more RAM/CPU.
- Lower **Max tokens** and **Max history messages**.
- If running LM Studio on a GPU, ensure drivers and runtime are configured
  correctly in LM Studio.

## Reconfiguring the integration

To change settings after setup, go to **Settings** > **Devices & Services**,
find the LM Studio integration entry, and choose **Options** or **Reconfigure**.
When you reconfigure the `Base URL` or `API Key`, Home Assistant will test the
connection and refresh the available model list.

## Advanced notes for power users

- You can run multiple LM Studio config entries with different prompts or
  permissions (for example, one for casual chat and another that can control
  Home Assistant).
- When enabling control for an assistant, prefer larger models that support
  stable function calling behavior.
- For headless deployments (LM Studio as a service), see the
  [LM Studio headless documentation](https://lmstudio.ai/docs/app/api/headless) OR this announcement for the new headless only instance [https://lmstudio.ai/blog/0.4.0#deploy-on-servers-deploy-in-ci-deploy-anywhere](https://lmstudio.ai/blog/0.4.0#deploy-on-servers-deploy-in-ci-deploy-anywhere)

## Controlling Home Assistant

If you want to experiment with local LLMs using Home Assistant, we recommend exposing fewer than 25 entities. Note that smaller models are more likely to make mistakes than larger models.

Only models that support function calling/tools may control Home Assistant. Most modern instruction-tuned models support this functionality, but check your specific model's capabilities.

## Setting up LM Studio

1. Download and install [LM Studio](https://lmstudio.ai/) for your operating system (Windows, macOS, or Linux).
2. Launch LM Studio and download your preferred model from the built-in model browser.
3. Go to the **Local Server** tab in LM Studio. If you do not see this option, select **Power User** at the bottom left of the window.
4. Configure the server settings:
   - Set the port (default is 1234)
   - Choose your model
   - Select "Serve on Local Network" if accessing from different machines
   - Optionally set up CORS settings if accessing from different machines
5. Select **Start Server** to begin the local API server.
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

## Removing the integration

1. Go to Settings > Devices & services.
2. Select LM Studio.
3. Select the entry you want to remove, then select Delete.
