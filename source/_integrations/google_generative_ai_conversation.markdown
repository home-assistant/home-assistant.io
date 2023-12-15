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

The Google Generative AI integration adds a conversation agent powered by [Google Generative AI](https://developers.generativeai.google/) in Home Assistant.

This conversation agent is unable to control your house. The Google Generative AI conversation agent can be used in automations, but not as a [sentence trigger](/docs/automation/trigger/#sentence-trigger). It can only query information that has been provided by Home Assistant. To be able to answer questions about your house, Home Assistant will need to provide Google Generative AI with the details of your house, which include areas, devices and their states.

This integration requires an API key to use, [which you can generate here](https://makersuite.google.com/app/apikey).

{% include integrations/config_flow.md %}

### Generate an API Key

The Google Generative AI API key is used to authenticate requests to the Google Generative AI API. To generate an API key take the following steps:

- Join the PaLM API and MakerSuite [waitlist](https://makersuite.google.com/waitlist).
- Wait several days for an email with subject "It’s your turn to use the PaLM API and MakerSuite".
- Visit the [API Keys page](https://makersuite.google.com/app/apikey) to retrieve the API key you'll use to configure the integration.

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

{% endconfiguration_basic %}

## Services

### Service `google_generative_ai_conversation.generate_content`

Allows you to ask Gemini Pro or Gemini Pro Vision to generate content from a prompt consisting of text and optionally images.
This service populates [Response Data](/docs/scripts/service-calls#use-templates-to-handle-response-data) with the generated content.

| Service data attribute | Optional | Description                                    | Example             |
| ---------------------- | -------- | ---------------------------------------------- | ------------------- |
| `prompt`               | no       | The prompt for generating the content.         | Describe this image |
| `image_filename`       | yes      | Filenames for images to include in the prompt. | /tmp/image.jpg      |

{% raw %}
```yaml
service: google_generative_ai_conversation.generate_content
data:
  prompt: >-
    Very briefly describe what you see in this image from my doorbell camera.
    Your message needs to be short to fit in a phone notification. Don't
    descrive stationary objects or buildings.
  image_filename: /tmp/doorbell_snapshot.jpg
response_variable: generated_content
```
{% endraw %}

The response data field `text` will contain the generated content.
