---
description: Use OpenAI models in Home Assistant as conversation agents, AI tasks, speech-to-text, and text-to-speech.
ha_release: 2023.2
ha_domain: openai_conversation
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://platform.openai.com/account/api-keys
    title: OpenAI API key
  - url: https://www.openai.com
    title: OpenAI
---

The **OpenAI** {% term integration %} adds conversation agents, AI tasks, speech-to-text, and text-to-speech powered by [OpenAI](https://www.openai.com) to Home Assistant.

Controlling Home Assistant is done by providing the AI access to the **Device control** set of tools. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI can provide you information about your devices and control them.

This integration does not integrate with [sentence triggers](/triggers/conversation/).

This integration requires an API key to use, [which you can generate here.](https://platform.openai.com/account/api-keys). This is a paid service, we advise you to monitor your costs in the [OpenAI portal](https://platform.openai.com/account) closely and configure [usage limits](https://platform.openai.com/account/billing/limits) to avoid unwanted costs associated with using the service.

## Prerequisites

{% important %}
This integration works only with the official OpenAI API endpoint and does not support OpenAI-API-compatible third-party services, proxies, or alternative backends. If you need support for other providers, consider using the [OpenRouter integration](/integrations/open_router/) as an alternative.
{% endimportant %}

The OpenAI key is used to authenticate requests to the OpenAI API. To generate an API key take the following steps:

- Log in to the [OpenAI portal](https://platform.openai.com/account) or sign up for an account.
- Enable billing with a valid credit card
- Configure [usage limits](https://platform.openai.com/account/billing/limits).
- Visit the [API Keys page](https://platform.openai.com/account/api-keys) to retrieve the API key you'll use to configure the integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "API key from OpenAI for authentication."
{% endconfiguration_basic %}

To change the API key after setup, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the three dots {% icon "mdi:dots-vertical" %} menu on the OpenAI integration entry, then select **Reconfigure**.

{% include integrations/option_flow.md %}

The integration provides the following types of services. Each type has its own button on the integration page, for example, **Add conversation agent**.

- [Conversation agent](/integrations/conversation/)
- [AI task](/integrations/ai_task/)
- AI task evaluation
- [Speech-to-text (STT)](/integrations/stt/)
- [Text-to-speech (TTS)](/integrations/tts/)

Conversation agents and AI tasks have the following configuration options. Some options are only available for one of them, or for some models.

{% configuration_basic %}
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/templating/). Only available for conversation agents.
AI tools:
  description: "**Device control** only accesses the entities you [expose](/voice_control/voice_remote_expose_devices/) to voice assistants. **Home Assistant** accesses everything and only works for administrators, not voice assistant devices. Only available for conversation agents."
Recommended model settings:
  description: If enabled, the recommended model and settings are chosen. Enabled by default.
{% endconfiguration_basic %}

If you turn off **Recommended model settings**, you can configure the following options:

{% configuration_basic %}
Model:
  description: The GPT language model is used for text generation. You can find more details on the available models in the [ChatGPT Documentation](https://platform.openai.com/docs/models). The default is "gpt-4o-mini".
Maximum tokens to return in response:
  description: The maximum number of tokens that the AI model can generate in its response. The default is 3000. For more information, see the [OpenAI Completion Documentation](https://platform.openai.com/docs/guides/completion/introduction).
Temperature:
  description: A value that determines the level of creativity and risk-taking the model should use when generating text. A higher temperature means the model is more likely to generate unexpected results, while a lower temperature results in more deterministic results. Accepts values between 0 and 2. The default is 1. For `gpt-5` and `gpt-6` models, it only applies when **Reasoning effort** is set to **None**. See the [OpenAI Completion Documentation](https://platform.openai.com/docs/guides/completion/introduction) for more information.
Top P:
  description: An alternative to temperature. Top P limits the model to the most likely words, whose probabilities add up to the Top P value. A lower Top P means the model only considers the most likely words. A higher Top P means it also considers less likely words. Accepts values between 0 and 1. The default is 1. For `gpt-5` and `gpt-6` models, it only applies when **Reasoning effort** is set to **None**. For more information, see the [OpenAI Completion API Reference](https://platform.openai.com/docs/api-reference/completions/create#completions/create-top_p).
Store requests and responses in OpenAI:
  description: If enabled, OpenAI stores requests and responses and you can view them in your OpenAI dashboard logs. Disabled by default.
Service tier:
  description: The available service tiers are Auto, Standard, Flex, and Priority. Flex tier offers lower costs in exchange for slower response times, which can be useful for background automations. [Priority processing](https://openai.com/api-priority-processing/) delivers significantly lower and more consistent latency than the Standard tier at a higher price. Auto is the default value, which uses the [project settings](https://platform.openai.com/settings/organization/projects). See the [Pricing](https://developers.openai.com/api/docs/pricing) for details on the supported models. When the selected tier is unavailable due to capacity or ramp rate limits, the request is processed at the Standard tier, and you are charged the Standard tier price.
Pro mode:
  description: Perform more model work to improve reliability on difficult tasks and return a single final answer. Enable it when quality matters more than latency and token usage. Pro mode aggregates the model work performed to produce the final answer and bills those tokens at the selected model’s standard token rates. Pro mode performs more model work than standard mode, increasing token usage and cost. This parameter is only applicable to GPT-5.6 and above; existing Pro model IDs keep their current behavior and pricing.
Enable web search:
  description: Enable the OpenAI-provided [web search tool](https://openai.com/index/new-tools-for-building-agents/#web-search). Conversation and AI Task subentries offer this option for supported models. Web search and code interpreter can be enabled together for AI tasks, including tasks with structured output. Not available when the **Reasoning effort** option is set to **Minimal**.
Search context size:
  description: The search is performed with a separate fine-tuned model with its own context and its own [pricing](https://platform.openai.com/docs/pricing#built-in-tools). This parameter controls how much context is retrieved from the web to help the tool formulate a response. The tokens used by the search tool do not affect the context window of the main model. These tokens are also not carried over from one turn to another — they're simply used to formulate the tool response and then discarded. This parameter would affect the search quality, cost, and latency.
Include home location:
  description: This parameter allows using the location of your Home Assistant instance during search to provide more relevant search results.
Include links in web search results:
  description: If enabled, answers can include links to the web pages that the search used. If disabled, the model is asked not to include source citations. Disabled by default.
Enable code interpreter tool:
  description: Allows the model to run Python code to answer questions. Disabled by default. Not available for some models, for example, `gpt-5-pro` and the Codex models. Also not available when the **Reasoning effort** option is set to **Minimal**.
Reasoning effort:
  description: How much the model reasons before it answers. More reasoning can improve answers to difficult questions, but takes longer and uses more tokens. Only available for reasoning models, such as the `o` series, `gpt-5`, and `gpt-6`, but not for `gpt-5-pro`. The choices depend on the model, and include **None**, **Minimal**, **Low**, **Medium**, **High**, **X-High**, and **Max**. The default is **Low**.
Reasoning summary:
  description: How long and detailed the summaries of the model's reasoning are. The choices are **Off**, **Auto**, **Concise**, and **Detailed**. **Concise** is not available for `o` series models. The default is **Auto**. Only available for reasoning models.
Image generation model:
  description: The model that the AI task uses to generate images. Only available for AI tasks, and only with models that support image generation. The default is `gpt-image-2.5-flare`.
{% endconfiguration_basic %}

Most of these options are in the second step of the dialog, **Model-specific options**. Which options appear depends on the model you selected.

The Speech-to-text (STT) subentries have the following configuration options:

{% configuration_basic %}
Instructions:
  description: Instructions that can be used to improve the quality of the transcripts by giving the model additional context similarly to how you would prompt other LLMs. The model will try to match the style, language, and context of the prompt. You can also use it to pass a dictionary of the correct spellings of common misunderstood words. Check the [OpenAI guide on prompting STT models](https://developers.openai.com/api/docs/guides/speech-to-text#prompting) for additional hints. Templates are not supported here.
Model:
  description: The Speech-to-text model for audio transcription. Select `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, or `whisper-1`, or enter the name of another model. The default is `gpt-4o-mini-transcribe`.
{% endconfiguration_basic %}

The Text-to-speech (TTS) subentries have the following configuration options:

{% configuration_basic %}
Instructions:
  description: Instructions for the AI on how it should read your text. You can prompt the model to control aspects of speech, including accent, emotional range, intonation, impressions, speed of speech, tone, whispering, and more. Templates are not supported here.
Speed:
  description: Additionally adjust the speed of the generated speech. Accepts values between 0.25 and 4.0, where 1.0 is the default speed.

{% endconfiguration_basic %}

Text-to-speech always uses the `gpt-4o-mini-tts` model.

The AI task evaluation subentries have the following configuration options:

{% configuration_basic %}
Model:
  description: The model that evaluates the AI task. The default is `gpt-6-luna`. You can also enter the name of another model.
{% endconfiguration_basic %}

## Talking to Super Mario over the phone

You can use the OpenAI integration to [talk to Super Mario and, if desired, have it control devices](/voice_control/assist_create_open_ai_personality/) in your home.

## Known limitations

- Some older models are not supported, for example, `o1-mini`, `o1-preview`, and the realtime preview models. If you select one of them, Home Assistant shows **This model is not supported, please select a different model**.

## Troubleshooting

{% details "OpenAI asks for the API key again" %}

### Symptom: "Reauthentication required. Please enter your updated API key."

In {% my integrations title="**Settings** > **Devices & services**" %}, OpenAI is listed under **Attention required**. When you select **Reconfigure**, the dialog shows the message "Reauthentication required. Please enter your updated API key."

#### Description

OpenAI rejected the API key when Home Assistant started the integration. For example, this happens when the key was deleted in the OpenAI portal.

#### Resolution

1. On the [API Keys page](https://platform.openai.com/account/api-keys), create a new API key.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
3. Under **Attention required**, on the OpenAI card, select **Reconfigure**.
4. Enter the new API key, and select **Submit**.
   - Result: The integration is set up again, and OpenAI is no longer listed under **Attention required**.

{% enddetails %}

{% details "Repair issue: Organization verification required" %}

### Symptom: "Your organization must be verified to use this model."

In {% my repairs title="**Settings** > **System** > **Repairs**" %}, the repair issue **Organization verification required** appears. It appears when a conversation agent or AI task uses a model that needs a verified organization.

#### Description

OpenAI only allows verified organizations to use some models. The model that you selected is one of them. For details, refer to the [OpenAI help article on organization verification](https://help.openai.com/en/articles/10910291-api-organization-verification).

#### Resolution

1. In the [OpenAI organization settings](https://platform.openai.com/settings/organization/general), select **Verify Organization**, and follow the steps.
2. Wait up to 15 minutes. It can take that long until OpenAI gives you access to the model.
3. Talk to the conversation agent again, or run the AI task again.
   - Result: The model answers. The repair issue stays in the list until Home Assistant restarts.
   - If you don't want to verify your organization, select another model instead. To do so, on the OpenAI integration page, in the row of the conversation agent or AI task, select **Reconfigure conversation agent** or **Reconfigure AI task** {% icon "mdi:cog-outline" %}.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
