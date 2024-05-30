---
title: Google Generative AI Conversation
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
---

The Google Generative AI integration adds a conversation agent powered by [Google Generative AI](https://ai.google.dev/) in Home Assistant.

This conversation agent is unable to control your house. The Google Generative AI conversation agent can be used in automations, but not as a [sentence trigger](/docs/automation/trigger/#sentence-trigger). It can only query information that has been provided by Home Assistant. To be able to answer questions about your house, Home Assistant will need to provide Google Generative AI with the details of your house, which include areas, devices and their states.

This integration requires an API key to use, [which you can generate here](https://aistudio.google.com/app/apikey), and to be in one of the [available regions](https://ai.google.dev/gemini-api/docs/available-regions).

{% include integrations/config_flow.md %}

### Generate an API Key

The Google Generative AI API key is used to authenticate requests to the Google Generative AI API. To generate an API key take the following steps:

- Visit the [API Keys page](https://aistudio.google.com/app/apikey) to retrieve the API key you'll use to configure the integration.

On the same page, you can see your plan: *free of charge* if the associated Google Cloud project doesn't have billing, or *pay-as-you-go* if the associated Google Cloud project has billing enabled.
Comparison of the plans is available [at this pricing page](https://ai.google.dev/pricing). The major differences include: the free of charge plan is rate limited, free prompts/responses are used for product improvement, and the free plan is not available in all [regions](https://ai.google.dev/gemini-api/docs/available-regions).

{% include integrations/option_flow.md %}
{% configuration_basic %}
Prompt Template:
  description: The starting text for the AI language model to generate new text from. This text can include information about your Home Assistant instance, devices, and areas and is written using [Home Assistant Templating](/docs/configuration/templating/).

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

{% endconfiguration_basic %}

## Services

### Service `google_generative_ai_conversation.generate_content`

<div class='note info'>

  This service isn't tied to any integration entry, so it won't use the model, prompt, or any of the other settings in your options. If you only want to pass text, you should use the `conversation.process` service.
  
</div>

Allows you to ask Gemini Pro or Gemini Pro Vision to generate content from a prompt consisting of text and optionally images.
This service populates [response data](/docs/scripts/service-calls#use-templates-to-handle-response-data) with the generated content.

| Service data attribute | Optional | Description                                    | Example             |
| ---------------------- | -------- | ---------------------------------------------- | ------------------- |
| `prompt`               | no       | The prompt for generating the content.         | Describe this image |
| `image_filename`       | yes      | File names for images to include in the prompt. | /tmp/image.jpg      |

{% raw %}
```yaml
service: google_generative_ai_conversation.generate_content
data:
  prompt: >-
    Very briefly describe what you see in this image from my doorbell camera.
    Your message needs to be short to fit in a phone notification. Don't
    describe stationary objects or buildings.
  image_filename: /tmp/doorbell_snapshot.jpg
response_variable: generated_content
```
{% endraw %}

The response data field `text` will contain the generated content.

Another example with multiple images:

{% raw %}
```yaml
service: google_generative_ai_conversation.generate_content
data:
  prompt: >-
    Briefly describe what happened in the following sequence of images
    from my driveway camera.
  image_filename:
    - /tmp/driveway_snapshot1.jpg
    - /tmp/driveway_snapshot2.jpg
    - /tmp/driveway_snapshot3.jpg
    - /tmp/driveway_snapshot4.jpg
response_variable: generated_content
```
{% endraw %}
