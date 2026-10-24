---
title: Azure OpenAI
description: Instructions on how to integrate Azure OpenAI with Home Assistant
ha_category:
  - AI
  - Voice
ha_release: 2026.10
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: azure_openai
ha_integration_type: service
ha_platforms:
  - ai_task
  - conversation
  - stt
  - tts
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://ai.azure.com/
    title: Microsoft Foundry
  - url: https://learn.microsoft.com/azure/ai-foundry/openai/
    title: Azure OpenAI documentation
ha_quality_scale: bronze
ha_codeowners:
  - '@bexelbie'
---

The **Azure OpenAI** {% term integration %} adds Azure-hosted conversation, AI task, speech-to-text, and text-to-speech services to Home Assistant.

Controlling Home Assistant is done by providing the AI access to the Assist API of Home Assistant. You can control which devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

Azure OpenAI is a paid service. Monitor usage and costs in the Azure portal and configure appropriate spending controls for your Azure subscription.

If you are new to Azure OpenAI deployment names, model families, or endpoint formats, see [Azure OpenAI concepts and terminology](#azure-openai-concepts-and-terminology).

## Prerequisites

Before configuring the integration:

1. Create an Azure OpenAI resource in [Microsoft Foundry](https://ai.azure.com/).
2. If you want to create a service while adding the integration, create at least one model deployment in that resource.
3. Copy the resource endpoint and an API key.
4. For each service you want to create, record the deployment name you chose and the underlying model deployed in it.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: API key for your Azure OpenAI resource.
Base URL:
  description: Endpoint for your Azure OpenAI resource. You can enter a bare Azure resource endpoint, such as `https://my-resource.openai.azure.com`, or a full API base URL.
{% endconfiguration_basic %}

The setup form also has optional sections for Conversation, AI Task, Speech-to-text, and Text-to-speech. Open a section to create that service while adding the integration:

- **Conversation** requires an Azure deployment name and its model family.
- **AI Task** requires an Azure deployment name and its model family.
- **Speech-to-text** requires an Azure deployment name and its model. Its API version is optional.
- **Text-to-speech** requires an Azure deployment name and its model.

Leave every optional section empty to add only the Azure OpenAI connection. You can add services later from the integration page.

Only one configuration entry can use a given normalized Azure endpoint. Add more Conversation, AI Task, Speech-to-text, or Text-to-speech services as subentries under that connection.

## Subentries

The integration provides the following types of subentries:

- [Conversation](/integrations/conversation/)
- [AI Task](/integrations/ai_task/)
- [Speech-to-text (STT)](/integrations/stt/)
- [Text-to-speech (TTS)](/integrations/tts/)

Open the integration and select **Add conversation agent**, **Add AI task**, **Add speech-to-text service**, or **Add text-to-speech service**. You can add multiple subentries of the same type and point each one at a different deployment.

The same Azure deployment can be used by multiple subentries when its capabilities support those services, for example Conversation and AI Task.

Conversation, AI Task, Speech-to-text, and Text-to-speech subentries each require an Azure deployment name and the underlying model:

- **Azure deployment name** is the name assigned when the model was deployed in Azure. It is sent with each API request.
- **Model family** or **Model** identifies the model behind that deployment. Home Assistant uses it locally to select supported settings, request parameters, or routing. It is not sent to Azure as the deployment name.

You can enter a model that is not listed. Unrecognized Conversation and AI Task model families use basic chat settings only. Unrecognized Speech-to-text models use the integration's default request routing and API version. Unrecognized Text-to-speech models use the nine-voice `tts` profile and default to `alloy`. Model families that the integration explicitly marks as unsupported are rejected instead of using the basic settings. Open an issue or pull request in the [Home Assistant Core repository](https://github.com/home-assistant/core) to add full support for an unlisted model.

{% include integrations/option_flow.md %}

## Conversation and AI Task

Conversation and AI Task subentries have the following configuration options. Availability depends on the subentry type and declared model family.

{% configuration_basic %}
Instructions:
  description: (Conversation Only) Instructions for how the AI should respond. Instructions support [Home Assistant templating](/docs/templating/).
Control Home Assistant:
  description: Allows the model to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
Recommended model settings:
  description: Uses recommended request settings for the declared model family. The deployment name and model family are still required.
Maximum output tokens to return in response:
  description: Maximum number of tokens available for internal reasoning and visible response output.
{% endconfiguration_basic %}

### Model-specific settings

If you disable **Recommended settings**, the integration groups settings supported by the declared model family into Response, Reasoning, Tools, Web search, and Image generation sections. Which sections and settings appear depends on the subentry type and declared model family.

Sampling controls appear on a following screen when supported. For some models, they are available only when **Reasoning effort** is set to **None**. Adjusting either Temperature or Top P is recommended instead of adjusting both because their interaction is difficult to predict.

The available model-specific options are:

- **Maximum tokens to return in response** limits the tokens available for internal reasoning and visible output.
- **Reasoning effort** controls how much reasoning the model performs before responding. Available levels depend on the model family.
- **Reasoning summary** controls whether the response includes a summary of the model's reasoning. Available summary types depend on the model family.
- **Pro mode** enables the model family's more intensive reasoning mode when Azure and the model support it.
- **Verbosity** controls how concise or detailed the response is.
- **Code interpreter** allows the model to write and run code for calculation and data processing.
- **Web search** allows the model to search the web. Its options control search context size, whether to include an approximate Home location, and whether to include inline citations.
- **Image generation** configures the optional Azure image deployment and its underlying image model for AI Task image requests.
- **Temperature** and **Top P** control sampling when the model family supports it.

Web search and Code interpreter cannot be enabled when **Reasoning effort** is set to **Minimal**.

#### Web search location

When **Use home location for web search** is enabled, Home Assistant asks the configured Azure chat deployment to convert the Home zone coordinates into an approximate city and region. The integration also includes the Home Assistant country and time zone. This approximate location is sent with web search requests.

#### Code interpreter

Enable **Code interpreter** to let the model write and run code to answer requests that need calculation or data processing. No Azure-specific configuration is required beyond enabling it.

#### Image generation

AI Task subentries can optionally use an additional Azure deployment and model for image generation tasks when the declared chat model supports the image generation tool. Enter the Azure image deployment name and select its underlying image model. Leaving the image deployment empty disables image generation for that AI Task entity. Changing the selected model in Home Assistant does not change the model deployed in Azure.

Conversation and data-generation responses are not stored as retrievable Responses API objects. Image-generation responses are stored so follow-up image requests can refer to the image-generation call ID without resending the image data. This response storage is unrelated to model training.

## Speech-to-text

Speech-to-text subentries require the Azure deployment name and the underlying Azure model. The selected model identifies the model behind the deployment; requests always use Azure's classic per-deployment endpoint and the configured API version. The built-in model suggestions are `whisper` and `gpt-4o-transcribe`, and custom model values are accepted.

{% configuration_basic %}
Azure deployment name:
  description: Name of the Azure transcription deployment.
Model:
  description: Underlying Azure transcription model. The suggested values are `whisper` and `gpt-4o-transcribe`; you can also enter a custom value.
API version:
  description: Optional Azure API version override. Leave empty to use the latest version known to the integration for the selected model.
Instructions:
  description: Optional context that can improve transcription quality, such as expected words or spellings. Write it in the pipeline language. Templates are not supported.
{% endconfiguration_basic %}

## Text-to-speech

Text-to-speech subentries require the Azure deployment name and underlying model of a supported speech deployment. Home Assistant uses the model to offer compatible voices.

Azure's v1 speech API does not publish model-specific voice lists, so Home Assistant follows the [voice availability documented for the underlying OpenAI models](https://developers.openai.com/api/docs/guides/text-to-speech#voice-options). For `tts` and `tts-hd`, it offers nine voices and defaults to `alloy`. For `gpt-4o-mini-tts`, it offers 13 voices and defaults to `marin`. Custom model values use the nine-voice `tts` profile and default to `alloy`. Service calls can provide another voice identifier supported by the configured Azure deployment.

{% configuration_basic %}
Azure deployment name:
  description: Name of the Azure speech deployment.
Model:
  description: Underlying Azure speech model. The suggested values are `gpt-4o-mini-tts`, `tts`, and `tts-hd`; you can also enter a custom value.
Instructions:
  description: Optional instructions controlling characteristics such as accent, emotional range, intonation, speed, and tone. Only steerable models such as `gpt-4o-mini-tts` apply these instructions. Older models such as `tts` and `tts-hd` ignore them. Templates are not supported.
Speed:
  description: Additional speech-speed adjustment from 0.25 to 4.0. The default is 1.0.
{% endconfiguration_basic %}

## Use cases

- Use an Azure-hosted conversation model as an Assist conversation agent, with optional access to exposed Home Assistant entities.
- Generate text or structured data for scripts, automations, and blueprints with an AI Task entity.
- Generate images with an AI Task entity by configuring a separate Azure image deployment.
- Use Azure OpenAI transcription and speech models in an Assist voice pipeline.

## Known limitations

- This integration does not configure or control Azure OpenAI itself. It only calls the deployed model endpoints you already set up in Microsoft Foundry.
- Home Assistant does not verify the model family you select against Azure. Changing the model behind an existing Azure deployment does not update the model family stored in Home Assistant, and changing the model family here does not change what is deployed in Azure. Reconfigure the subentry after changing the Azure deployment.
- The speech-to-text and text-to-speech services this integration provides are specifically Azure OpenAI's own transcription and speech models. They are unrelated to Azure AI Speech or other non-OpenAI speech services offered elsewhere in Azure.

## Troubleshooting

{% details "Authentication fails" %}

### Symptom: the integration reports invalid authentication

The API key is not valid for the configured Azure OpenAI resource.

Update the connection through the reauthentication flow with a current API key for that resource. If the resource endpoint also changed, use **Reconfigure** to update both values.

{% enddetails %}

{% details "A deployment rejects model-specific settings" %}

### Symptom: a request fails after enabling a model-specific option

Azure feature availability can depend on the model, region, resource, deployment type, and API version. The model family selected in Home Assistant may also differ from the model currently assigned to the Azure deployment.

Confirm the deployment's model in Microsoft Foundry, then reconfigure the subentry with the same model family. Disable settings that Azure does not support for that deployment.

{% enddetails %}

{% details "Speech-to-text rejects the API version" %}

### Symptom: transcription requests fail with an API-version error

Speech-to-text uses Azure's per-deployment API and requires an `api-version`. The integration supplies the latest version it knows for supported models.

Clear a custom API-version override to use the integration default, or enter an API version supported by the configured Azure transcription model and resource.

{% enddetails %}

{% details "Home location lookup fails" %}

### Symptom: saving web search settings reports an authentication, connection, rate-limit, or location lookup error

Enabling **Include home location** makes a live request to the configured Azure chat deployment to convert the Home zone coordinates into an approximate city and region.

For an authentication error, complete the reauthentication flow and try again. For connection or rate-limit errors, retry after the Azure service is reachable. You can also disable **Include home location** to save the other web search settings without performing the lookup.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Azure OpenAI concepts and terminology

Azure OpenAI routes requests to deployments rather than directly to model IDs. You create each deployment in [Microsoft Foundry](https://ai.azure.com/), choose its name, and select the model behind it. Multiple deployments can use the same underlying model, but Azure treats them as separate endpoints. This differs from OpenAI's own API, where models are addressed directly by model ID. Azure OpenAI therefore requires a resource endpoint and API key, plus a deployment name for each service. The integration also asks for the underlying model where that information affects available settings or request routing.

The deployment name and underlying model are independent values:

- **Deployment name** is the name you chose in Microsoft Foundry. Azure uses it to route the request.
- **Model family** or **Model** is the model backing that deployment. Home Assistant uses it locally to select compatible settings and request behavior.

Azure does not provide Home Assistant with the model behind a deployment. Naming a deployment after its model does not make the model detectable. If you change the model behind a deployment in Azure, reconfigure the corresponding Home Assistant subentry.

For supported endpoints, Azure OpenAI's `v1` API is compatible with OpenAI's API after Azure-specific authentication and routing are configured. The integration accepts multiple Azure endpoint formats:

- A bare Azure resource endpoint ending in `.openai.azure.com`, `.openai.azure.us`, `.openai.azure.cn`, `.cognitiveservices.azure.com`, or `.services.ai.azure.com` is normalized to its `/openai/v1/` API base URL. The same endpoint ending in `/` or `/openai/v1` is normalized in the same way. Query parameters and fragments are removed.
- A URL containing another path retains that path. A non-Azure proxy or gateway URL is used as a complete API base URL and is not given an `/openai/v1/` suffix.

Azure's `v1` API does not currently route the transcription endpoint used by this integration. Speech-to-text requests therefore use Azure's older per-deployment URL format and require an `api-version`. The integration removes a trailing `/openai/v1` from the configured base URL, retains any preceding path, and appends `/openai/deployments/{deployment}/audio/transcriptions`. A proxy or gateway path must route both the configured `v1` base URL and this classic deployment path. The integration selects the latest API version it knows for the chosen transcription model unless you provide an override.

Model and feature availability varies by Azure region, subscription, resource, and deployment type. The integration's model lists describe the Azure models it knows how to handle. They do not guarantee that a model is available to your Azure resource.
