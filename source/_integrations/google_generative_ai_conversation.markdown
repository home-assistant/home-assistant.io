---
title: Google Gemini
description: Instructions on how to integrate Google Gemini as a conversation agent
ha_category:
  - AI
  - Speech-to-text
  - Text-to-speech
  - Voice
ha_release: 2023.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@tronikos'
  - '@ivanlh'
ha_domain: google_generative_ai_conversation
ha_integration_type: service
ha_platforms:
  - conversation
  - diagnostics
  - stt
  - tts
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://aistudio.google.com/app/apikey
    title: Google Gemini API key
  - url: https://ai.google.dev/
    title: Google AI
---

The **Google Gemini** {% term integration %} adds a conversation agent, speech-to-text, and text-to-speech entities powered by [Google Gemini](https://ai.google.dev/) to Home Assistant. The conversation agent can optionally be allowed to control Home Assistant.

Controlling Home Assistant is done by providing the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the {% my voice_assistants title="exposed entities page" %}. The AI can provide you information about your devices and control them.

This integration does not integrate with [sentence triggers](/docs/automation/trigger/#sentence-trigger).

This integration requires an API key to use, [which you can generate here](https://aistudio.google.com/app/apikey), and to be in one of the [available regions](https://ai.google.dev/gemini-api/docs/available-regions).

{% include integrations/config_flow.md %}

## Generate an API Key

The API key is used to authenticate requests to the Google Gemini API. To generate an API key take the following steps:

- Visit the [API Keys page](https://aistudio.google.com/app/apikey) to retrieve the API key you'll use to configure the integration.

On the same page, you can see your plan: *free of charge* if the associated Google Cloud project doesn't have billing, or *pay-as-you-go* if the associated Google Cloud project has billing enabled.
Comparison of the plans is available [at this pricing page](https://ai.google.dev/pricing). The major differences include: the free of charge plan is rate limited, and free prompts/responses are used for product improvement.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Instructions:
  description: Instructions for the AI on how it should respond to your requests. It is written using [Home Assistant Templating](/docs/templating/).
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
Thinking budget:
  description: The token budget for internal reasoning before the model generates a response (Gemini 2.5 models only). Set this to `-1` to let the model decide automatically, `0` to disable reasoning (not available for Gemini 2.5 Pro), or a positive number for a custom budget.
Thinking level:
  description: The level of internal reasoning for Gemini 3 models. For Gemini Flash series models, you can choose **Minimal**, **Auto**, **Low**, **Medium**, or **High**. For Gemini 3.1 Pro, you can choose **Auto**, **Low**, **Medium**, or **High**. This setting is ignored for Gemini 2.5 models, which use the thinking budget instead.
Safety settings:
  description: Thresholds for different [harmful categories](https://ai.google.dev/gemini-api/docs/safety-settings).
Enable Google Search tool:
  description: Enables the model to [query Google Search](https://ai.google.dev/gemini-api/docs/grounding). This can only be enabled when the "Control Home Assistant" setting is set to "No control". See below for a workaround using it with "Assist".
{% endconfiguration_basic %}

## Google Search

Due to an API limitation we cannot have the [Google Search tool](https://ai.google.dev/gemini-api/docs/grounding) together with other tools. Request fails with `400 INVALID_ARGUMENT. {'error': {'code': 400, 'message': 'Tool use with function calling is unsupported', 'status': 'INVALID_ARGUMENT'}}`.
But you can do the following workaround that exposes a script to voice assistants. The script calls a Google Gemini Conversation that only has the Google Search tool enabled.

{% details "Workaround for Google Search tool" %}

1. Add a second Google Gemini conversation agent.
2. Select **Configure**
3. In the **Control Home Assistant** section, uncheck **Assist** and any other options.
4. Uncheck **Recommended model settings**
5. Select **Submit**
6. Check **Enable Google Search tool**
7. Increase **Maximum tokens to return in response**
8. Select **Submit**
9. Create a script (**Settings** > **Automations & scenes** > **Scripts** > **Create script**)
10. Select 3 dots > **Edit in YAML** and enter the following (edit the `conversation.google_generative_ai_2` to match the entity created from the 1st step):

    ```yaml
    sequence:
      - action: conversation.process
        metadata: {}
        data:
          agent_id: conversation.google_generative_ai_2
          text: "{{ query }}"
        response_variable: result
      - variables:
          result:
            response: "{{ result.response.speech.plain.speech }}"
      - stop: ""
        response_variable: result
    alias: "Assist: Search Google"
    description: >-
      Uses Google Search to answer questions that are completely unrelated to
      the smart home, and focus on current events or information in real time,
      such as the current president, last night's game results, or release
      dates.
    fields:
      query:
        selector:
          text: null
        name: Query
        description: The query to search Google for
        required: true
    ```

11. Select **Save script**
12. Select 3 dots > **Settings** > **Voice assistants**
13. Check **Expose** **Assist**

{% enddetails %}

## Using Google Gemini text-to-speech in automations

The **Google Gemini** integration adds a text-to-speech entity. To play a spoken message from an automation or script, use the [**Speak**](/actions/tts.speak/) action and select your Google Gemini text-to-speech entity as the target.

To speak a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you are setting up a new automation, add a trigger in the **When** section. Scripts do not need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target**, select your Google Gemini text-to-speech entity.
6. From the actions shown for that target, select **Speak**. To choose a Gemini voice, set `voice` in **Options**. For supported options, see [Google Gemini text-to-speech action options](#google-gemini-text-to-speech-action-options).
7. Select the **Media player entity** to play the message on, set the **Message**, and set any other options you want to use.
8. Select **Save**.

{% details "Example YAML configuration" %}

```yaml
action: tts.speak
target:
  entity_id: tts.google_ai_tts
data:
  media_player_entity_id: media_player.living_room
  message: "Say cheerfully: Have a wonderful day!"
  options:
    voice: achernar
```

{% enddetails %}

### Google Gemini text-to-speech action options

{% configuration %}
voice:
  description: "The voice name to use for the generated speech. The default is `zephyr`. For available voices, see the [Google AI speech generation documentation](https://ai.google.dev/gemini-api/docs/speech-generation#voices)."
  required: false
  type: string
{% endconfiguration %}

Google Gemini detects the input language automatically. For supported languages, see the [Google AI speech generation documentation](https://ai.google.dev/gemini-api/docs/speech-generation#languages).

## Talking to Super Mario

You can use Google Gemini to follow the [Super Mario voice assistant tutorial](/voice_control/assist_create_open_ai_personality/) and let him control devices in your home.

The tutorial uses OpenAI, but you can follow the same approach with the Google Gemini integration.

## Video tutorial

This video tutorial explains how Google Gemini can be set up, how you can send an AI-generated message to your smart speaker when you arrive home, and how you can analyze an image taken from your doorbell camera as soon as someone rings the doorbell.

<lite-youtube videoid="ivoYNd2vMR0" videotitle="AI in Home Assistant - A Complete Guide!" posterquality="maxresdefault"></lite-youtube>

## Troubleshooting

- To aid in diagnosing issues it may help to turn up verbose logging by adding these to your {% term "`configuration.yaml`" %}:

```yaml
logger:
  logs:
    homeassistant.components.conversation: debug
    homeassistant.components.conversation.chat_log: debug
    homeassistant.components.google_generative_ai_conversation: debug
```

## Removing the integration

{% include integrations/remove_device_service.md %}
