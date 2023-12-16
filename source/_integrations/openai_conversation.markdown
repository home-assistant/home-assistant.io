---
title: OpenAI Conversation
description: Instructions on how to integrate OpenAI as a conversation agent
ha_category:
  - Voice
ha_release: 2023.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@balloob'
ha_domain: openai_conversation
ha_integration_type: service
---

The OpenAI integration adds a conversation agent powered by [OpenAI](https://www.openai.com) in Home Assistant.

This conversation agent is unable to control your house at the moment. The OpenAI conversation agent can be used in automations, but not as a [sentence trigger](/docs/automation/trigger/#sentence-trigger). It can only query information that is provided by Home Assistant. To be able to answer questions about your house, Home Assistant will provide OpenAI with the details of your house, which include areas, entities and their states. Only entities [exposed for `Assist`](https://www.home-assistant.io/voice_control/voice_remote_expose_devices/) or included into the prompt template will be accessible. The result of the coversation is not deterministic, and you may need several attempts to get what you need. At the same time, it has the capabilities of processing a large variety of queries, such as "Which room is the warmest?" and "Is it dark in the living room?" (for the latter, it would probably check both luminosity sensors and lights).

This integration requires an API key to use, [which you can generate here.](https://platform.openai.com/account/api-keys). This is a paid service, we advise you to monitor your costs in the [OpenAI portal](https://platform.openai.com/account) closely and configure [usage limits](https://platform.openai.com/account/billing/limits) to avoid unwanted costs associated with using the service.

{% include integrations/config_flow.md %}

## Generate an API Key

The OpenAI key is used to authenticate requests to the OpenAI API. To generate an API key take the following steps:

- Log in to the [OpenAI portal](https://platform.openai.com/account) or sign up for an account.
- Enable billing with a valid credit card
- Configure [usage limits](https://platform.openai.com/account/billing/limits).
- Visit the [API Keys page](https://platform.openai.com/account/api-keys) to retrieve the API key you'll use to configure the integration.

{% include integrations/option_flow.md %}
{% configuration_basic %}
Prompt Template:
  description: The starting text for the AI language model to generate new text from. This text can include information about your Home Assistant instance, devices, and areas and is written using [Home Assistant Templating](/docs/configuration/templating/). You can add your home location, current time, your name, your preferences, and custom instructions to get more personalized responces. It also helps to list here Entity IDs of frequently accessed devices. Three additional variables are available for this template: `ha_name` (the Home Assistant location), `device_id` (the device initiated the conversation, if available), and `user_id`.

Completion Model:
  description: The GPT language model is used for text generation. You can find more details on the available models in the [OpenAI GPT-3 Documentation](https://platform.openai.com/docs/models/gpt-3), [OpenAI GPT-3.5 Documentation](https://platform.openai.com/docs/models/gpt-3-5), or [OpenAI GPT-4 and GPT-4 Turbo Documentation](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo). The default is "gpt-3.5-turbo". The latest available model at the time of writing this text is [GPT-4 Turbo](https://help.openai.com/en/articles/8555510-gpt-4-turbo)

Maximum Tokens to Return in Response:
  description: The maximum number of words or "tokens" that the AI model should generate in its completion of the prompt. For more information, see the [OpenAI Completion Documentation](https://platform.openai.com/docs/guides/completion/introduction).

Temperature:
  description: A value that determines the level of creativity and risk-taking the model should use when generating text. A higher temperature means the model is more likely to generate unexpected results, while a lower temperature results in more deterministic results. See the [OpenAI Completion Documentation](https://platform.openai.com/docs/guides/completion/introduction) for more information.

Top P:
  description: An alternative to temperature, top_p determines the proportion of the most likely word choices the model should consider when generating text. A higher top_p means the model will only consider the most likely words, while a lower top_p means a wider range of words, including less likely ones, will be considered. For more information, see the [OpenAI Completion API Reference](https://platform.openai.com/docs/api-reference/completions/create#completions/create-top_p).

{% endconfiguration_basic %}

## Talking to Super Mario over the phone

You can use an OpenAI Conversation integration to [talk to Super Mario over a classic landline phone](/voice_control/worlds-most-private-voice-assistant/).

## Services

### Service `openai_conversation.generate_image`

Allows you to ask OpenAI to generate an image based on a prompt. This service
populates [Response Data](/docs/scripts/service-calls#use-templates-to-handle-response-data)
with the requested image.

| Service data attribute | Optional | Description                                            | Example          |
| ---------------------- | -------- | ------------------------------------------------------ | ---------------- |
| `config_entry`         | no       | Integration entry ID to use.                           |                  |
| `prompt`               | no       | The text to turn into an image.                        | Picture of a dog |
| `size`                 | yes      | Size of the returned image in pixels. Must be one of `1024x1024`, `1792x1024`, or `1024x1792`, defaults to `1024x1024`. | 1024x1024        |
| `quality`              | yes      | The quality of the image that will be generated. `hd` creates images with finer details and greater consistency across the image. | standard         |
| `style`                | yes      | The style of the generated images. Must be one of `vivid` or `natural`. Vivid causes the model to lean towards generating hyper-real and dramatic images. Natural causes the model to produce more natural, less hyper-real looking images. | vivid            |

{% raw %}
```yaml
service: openai_conversation.generate_image
data:
  config_entry: abce6b8696a15e107b4bd843de722249
  prompt: "Cute picture of a dog chasing a herd of cats"
  size: 1024x1024
  quality: standard
  style: vivid
response_variable: generated_image
```
{% endraw %}

The response data field `url` will contain a URL to the generated image and `revised_prompt` will contain the updated prompt used.

#### Example using a generated image entity

The following example shows an automation that generates an image and displays
it in a image template entity. The prompt uses the state of the weather entity
to generate a new image of New York in the current weather state.

The resulting image entity can be used in, for example, a card on your dashboard.

The *config_entry* is installation specific. To get the value, make sure the integration has been installed.
Then, go to {% my developer_services title="**Developer Tools** > **Services**" %}. Ensure you are in UI mode and enter the following below:

![Open AI Conversation UI Mode](/images/integrations/openai_conversation/openai_developer_tools_ui.png)

Select **YAML Mode** to reveal the *config_entry* value to be used in the below example automation.

![Open AI Conversation YAML Mode](/images/integrations/openai_conversation/openai_developer_tools_yaml.png)

{% raw %}
```yaml
automation:
  - alias: "Update image when weather changes"
    trigger:
      - platform: state
        entity_id: weather.home
    action:
      - alias: "Ask OpenAI to generate an image"
        service: openai_conversation.generate_image
        response_variable: generated_image
        data:
          config_entry: abce6b8696a15e107b4bd843de722249
          size: "1024x1024"
          prompt: >-
            New York when the weather is {{ states("weather.home") }}"

      - alias: "Send out a manual event to update the image entity"
        event: new_weather_image
        event_data:
          url: '{{ generated_image.url }}'

template:
  - trigger:
      alias: "Update image when a new weather image is generated"
      platform: event
      event_type: new_weather_image
    image:
      name: "AI generated image of New York"
      url: "{{ trigger.event.data.url }}"
```

{% endraw %}
