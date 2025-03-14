---
title: Google Generative AI
description: Instructions on how to integrate Google Generative AI as a conversation agent
ha_category:
  - Voice
ha_release: 2023.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@tronikos'
ha_domain: google_generative_ai_conversation
ha_integration_type: service
ha_platforms:
  - conversation
  - diagnostics
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://aistudio.google.com/app/apikey
    title: Google Generative AI API key
  - url: https://ai.google.dev/
    title: Google Generative AI
---

The Google Generative AI integration adds a conversation agent powered by [Google Generative AI](https://ai.google.dev/) in Home Assistant. It can optionally be allowed to control Home Assistant.

Controlling Home Assistant is done by providing the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI is able to provide you information about your devices and control them.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

This integration requires an API key to use, [which you can generate here](https://aistudio.google.com/app/apikey), and to be in one of the [available regions](https://ai.google.dev/gemini-api/docs/available-regions).

{% include integrations/config_flow.md %}

## Generate an API Key

The Google Generative AI API key is used to authenticate requests to the Google Generative AI API. To generate an API key take the following steps:

- Visit the [API Keys page](https://aistudio.google.com/app/apikey) to retrieve the API key you'll use to configure the integration.

On the same page, you can see your plan: *free of charge* if the associated Google Cloud project doesn't have billing, or *pay-as-you-go* if the associated Google Cloud project has billing enabled.
Comparison of the plans is available [at this pricing page](https://ai.google.dev/pricing). The major differences include: the free of charge plan is rate limited, and free prompts/responses are used for product improvement.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/configuration/templating/).
Control Home Assistant:
  description: If the model is allowed to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/voice_control/voice_remote_expose_devices/) to it.
Recommended settings:
  description: If enabled, the recommended model and settings are chosen.
{% endconfiguration_basic %}

If you choose to not use the recommended settings, you can configure the following options:

{% configuration_basic %}
Model:
  description: Model used to generate response.
Temperature:
  description: Creativity allowed in the responses. Higher values produce a more random and varied response. A temperature of zero will be deterministic.
Top P:
  description: Probability threshold for top-p sampling.
Top K:
  description: Number of top-scored tokens to consider during generation.
Maximum Tokens to Return in Response:
  description: The maximum number of words or "tokens" that the AI model should generate.
Safety settings:
  description: Thresholds for different [harmful categories](https://ai.google.dev/gemini-api/docs/safety-settings).
{% endconfiguration_basic %}

## Talking to Super Mario

You can use this integration to [talk to Super Mario and, if you want, have him control devices in your home](/voice_control/assist_create_open_ai_personality/).

The tutorial is using OpenAI, but this could also be done with the Google Generative AI integration.

## Actions

### Generate content

{% tip %}
This action isn't tied to any integration entry, so it won't use the model, prompt, or any of the other settings in your options. If you only want to pass text, you should use the `conversation.process` action.
{% endtip %}

Allows you to ask Gemini Pro or Gemini Pro Vision to generate content from a prompt consisting of text and optionally attachments (images, PDFs, etc.).
This action populates [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data) with the generated content.

| Data attribute | Optional | Description                                     | Example             |
| ---------------------- | -------- | ----------------------------------------------- | ------------------- |
| `prompt`               | no       | The prompt for generating the content.          | Describe this image |
| `filenames`            | yes      | File names for attachments to include in the prompt. | /tmp/image.jpg      |

{% raw %}

```yaml
action: google_generative_ai_conversation.generate_content
data:
  prompt: >-
    Very briefly describe what you see in this image from my doorbell camera.
    Your message needs to be short to fit in a phone notification. Don't
    describe stationary objects or buildings.
  filenames: /tmp/doorbell_snapshot.jpg
response_variable: generated_content
```

{% endraw %}

The response data field `text` will contain the generated content.

Another example with multiple images:

{% raw %}

```yaml
action: google_generative_ai_conversation.generate_content
data:
  prompt: >-
    Briefly describe what happened in the following sequence of images
    from my driveway camera.
  filenames:
    - /tmp/driveway_snapshot1.jpg
    - /tmp/driveway_snapshot2.jpg
    - /tmp/driveway_snapshot3.jpg
    - /tmp/driveway_snapshot4.jpg
response_variable: generated_content
```

{% endraw %}

## Video tutorial

This video tutorial explains how Google Generative AI can be set up, how you can send an AI-generated message to your smart speaker when you arrive home, and how you can analyze an image taken from your doorbell camera as soon as someone rings the doorbell.

<lite-youtube videoid="ivoYNd2vMR0" videotitle="AI in Home Assistant - A Complete Guide!" posterquality="maxresdefault"></lite-youtube>

## Troubleshooting

- To aid in diagnosing issues it may help to turn up verbose logging by adding these to your {% term "`configuration.yaml`" %}:

```yaml
logger:
  logs:
    homeassistant.components.conversation: debug
    homeassistant.components.google_generative_ai_conversation: debug
```
