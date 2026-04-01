---
title: Anthropic
description: Instructions on how to integrate Anthropic Claude with Home Assistant
ha_category:
  - AI
  - Voice
ha_release: 2024.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Shulyaka'
ha_domain: anthropic
ha_integration_type: service
ha_platforms:
  - conversation
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://console.anthropic.com/settings/keys
    title: Anthropic API key
  - url: https://www.anthropic.com
    title: Anthropic
  - url: https://claude.ai
    title: Claude
ha_quality_scale: bronze
---

The **Anthropic** {% term integrations %} adds a conversation agent powered by [Anthropic](https://www.anthropic.com), such as Claude 3.5 Sonnet, in Home Assistant.

Controlling Home Assistant is done by providing the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI can provide you information about your devices and control them.

Legal note: Individuals and hobbyists are welcome to use the Anthropic API [for personal use](https://support.anthropic.com/en/articles/8987200-can-i-use-the-claude-api-for-individual-use), however, please note that the use of the API is subject to their [Commercial Terms of Service](https://www.anthropic.com/legal/commercial-terms), regardless of whether you are an individual or representing a company.

## Prerequisites

- This integration requires an API key to use, [which you can generate here.](https://console.anthropic.com/settings/keys). 
- This is a paid service, we advise you to monitor your costs in the [Anthropic portal](https://console.anthropic.com/settings/cost) closely.

### Generating an API Key

The Anthropic API key is used to authenticate requests to the Anthropic API. To generate an API key, take the following steps:

1. Log in to the [Anthropic portal](https://console.anthropic.com) or sign up for an account.
2. Enable billing with a valid credit card on the [plans page](https://console.anthropic.com/settings/plans).
3. Visit the [API Keys page](https://console.anthropic.com/settings/keys) to retrieve the API key you'll use to configure the integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "API key from Anthropic for authentication."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

The integration provides the following types of subentries:

- [Conversation](/integrations/conversation/)
- [AI Task](/integrations/ai_task/)

{% configuration_basic %}
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/configuration/templating/).
Control Home Assistant:
  description: If the model is allowed to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
Recommended settings:
  description: If enabled, the recommended model and settings are chosen.
{% endconfiguration_basic %}

If you choose not to use the recommended settings, you can configure the following options:

{% configuration_basic %}
Model:
  description: The model that will complete your prompt. See [models](https://docs.anthropic.com/en/docs/about-claude/models#model-names) for additional details and options.
Maximum Tokens to Return in Response:
  description: The maximum number of tokens to generate before stopping. Note that our models may stop _before_ reaching this maximum. This parameter only specifies the absolute maximum number of tokens to generate. Different models have different maximum values for this parameter. See [models](https://docs.anthropic.com/en/docs/models-overview) for details.
Temperature:
  description: Amount of randomness injected into the response. Use `temperature` closer to `0.0` for analytical / multiple choice, and closer to `1.0` for creative and generative tasks. Note that even with `temperature` of `0.0`, the results will not be fully deterministic. This parameter is ignored if extended thinking is enabled (see below).
Thinking budget:
  description: For models with [extending thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) support, such as Claude 3.7 Sonnet, this parameter determines the maximum number of tokens Claude is allowed use for its internal reasoning process. Larger budgets can improve response quality by enabling more thorough analysis for complex problems, although Claude may not use the entire budget allocated, especially at ranges above 32K. Anthropic suggests starting at the minimum and increasing the thinking budget incrementally to find the optimal range for Claude to perform well for your use case. Higher token counts may allow you to achieve more comprehensive and nuanced reasoning, but there may also be diminishing returns depending on the task. Be prepared for potentially longer response times due to the additional processing required for the reasoning process. The value must always be less than the `Maximum Tokens` specified. If the value is below `1024`, then extended thinking is disabled. This parameter is ignored if the model does not support extended thinking.
Thinking effort:
  description: Newer models (starting from Claude 4.6) use the [effort](https://platform.claude.com/docs/en/build-with-claude/effort) parameter, instead of the thinking budget, to control how many tokens Claude uses when responding, trading off between response thoroughness and token efficiency.
Code execution:
  description: Enable the server-side [Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool). With this tool, the model can analyze data, perform complex calculations, run system commands, including writing code, in a secure, sandboxed environment.
Enable web search:
  description: Enable the server-side [Web search tool](https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool) for direct access to real-time web content, allowing it to answer questions with up-to-date information beyond its knowledge cutoff. Please note that this tool has its own [pricing](https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool#usage-and-pricing). With Claude Sonnet 4.5, Claude Opus 4.5, and newer, it is recommended to also enable **Code execution** to take advantage of [dynamic filtering](https://claude.com/blog/improved-web-search-with-dynamic-filtering).
Maximum web searches:
  description: Limits the number of web searches that can be performed per user request. Once the limit is reached, no additional searches will be executed during that conversation.
Include home location:
  description: The parameter allows you to localize search results based on the Home Assistant location.
{% endconfiguration_basic %}

## Use cases

The integration provides `conversation` and `ai_task` entities powered by Anthropic API. Please refer to the corresponding integrations for more details and examples:

- [Conversation](/integrations/conversation/)
- [AI Task](/integrations/ai_task/)

A few examples:

### Assist pipeline

Set up and configure Claude as a conversation agent in an [Assist pipeline](/integrations/assist_pipeline/) as described in the [voice guide](/voice_control/assist_create_open_ai_personality/). You can then use this pipeline to chat through the Home Assistant web interface, on [Android](/voice_control/android/) or [Apple](/voice_control/apple/) devices using the [Home Assistant Companion App](https://companion.home-assistant.io/docs/getting_started/), or by voice using an [Assist satellite](/integrations/assist_satellite/).

[Expose entities](/voice_control/voice_remote_expose_devices/) and configure aliases for the entities you want the model to control.

### Home Assistant interface

You can set the Claude AI Task entity as the default AI Task entity. To do this, go to {% my config_ai_task title="**Settings** > **System** > **AI tasks**" %} and select the Claude AI Task entity. This makes the Claude AI Task entity the default for blueprints, and for the **Suggest with AI** button in various places in the interface.

### Automation

You can use `conversation.process` and `ai_task.generate_data` actions in your scripts and automations.
Here is a simple automation that implements a Claude Telegram chatbot using [Telegram bot integration](/integrations/telegram_bot):

{% raw %}

```yaml
triggers:
  - trigger: state
    entity_id:
      - event.bot_update_event # Replace with your Telegram bot event entity
conditions: "{{ trigger.to_state.attributes.event_type == 'telegram_text' }}"
actions:
  - action: conversation.process
    data:
      agent_id: conversation.claude_conversation # Replace with your Claude conversation entity
      conversation_id: "telegram_{{ trigger.to_state.attributes.chat_id }}"
      text: "{{ trigger.to_state.attributes.text }}"
    response_variable: response
  - action: telegram_bot.send_message
    data:
      chat_id: "{{ trigger.to_state.attributes.chat_id }}"
      message: "{{ response.response.speech.plain.speech }}"
      parse_mode: plain_text
      config_entry_id: "{{ trigger.to_state.attributes.bot.config_entry_id }}"
```

{% endraw %}

## Troubleshooting

### The response is truncated mid-sentence, or the model said it would do an action to control a device but didn't do it

This may happen when the **Maximum Tokens to Return in Response** integration option value is too small. A small conservative limit is good to keep the cost lower, but it may be suboptimal in certain cases.

### Integration fails to set up, the logs show ImportError or AttributeError

This may happen if the Python anthropic client had failed to upgrade to the correct version. If you know how to log into the Home Assistant container and manually reinstall the client, try that. Otherwise, downgrading and re-upgrading Home Assistant should help.

## Known limitations

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
