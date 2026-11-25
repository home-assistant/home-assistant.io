---
description: Instructions on how to set up Microsoft text-to-speech with Home Assistant.
ha_release: 0.57
ha_domain: microsoft
related:
  - docs: /actions/tts.speak/
    title: Speak action
  - docs: /voice_control/
    title: Voice assistants
  - url: https://learn.microsoft.com/azure/ai-services/speech-service/text-to-speech
    title: Microsoft Azure text-to-speech documentation
---

The **Microsoft Text-to-speech** {% term integration %} uses the [text-to-speech service of Azure AI Speech](https://learn.microsoft.com/azure/ai-services/speech-service/text-to-speech) to turn text into natural-sounding speech.

You can use it to have Home Assistant read out announcements and notifications on your media players, or as the text-to-speech engine of your [voice assistant](/voice_control/).

## Prerequisites

To use this integration, you need an API key for an Azure Speech resource. The **Free (F0)** pricing tier of the Speech resource includes 500,000 characters of text-to-speech per month at no cost. For current limits and prices, see [Azure AI Speech pricing](https://azure.microsoft.com/pricing/details/cognitive-services/speech-services/).

1. Sign in to the [Azure portal](https://portal.azure.com) with your Microsoft account. If you don't have an Azure subscription yet, [create one](https://azure.microsoft.com).
2. [Create an Azure Speech resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesSpeechServices).
   - To use the free tier, select **Free F0** as the **Pricing tier**.
   - Write down the **Region** you select for the resource. You need it during setup.
3. When the resource is created, open it and go to **Resource Management** > **Keys and Endpoint**.
4. Copy one of the keys. This is your API key.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The key of your Azure Speech resource. For details, see [Prerequisites](#prerequisites)."
Region:
  description: "The region of your Azure Speech resource, for example **East US**. It must match the region you selected when creating the resource."
Language:
  description: "The default language of the speech, for example **English (United States)**."
Gender:
  description: "The gender of the voice. Choose **Female** or **Male**."
Voice:
  description: "The name of the voice without the language prefix, for example `JennyNeural` or `RyanNeural`. The voice must be available for the selected language. For a list of voices, see the [Microsoft language and voice support documentation](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts)."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

The options let you adjust how the voice sounds. When you change them, the integration reloads and uses the new settings for all new messages.

{% configuration_basic %}
Speaking rate:
  description: "Speed up or slow down the speech, in percent. Ranges from -100 to 100. The default is 0."
Volume:
  description: "Raise or lower the volume of the speech, in percent. Ranges from -100 to 100. The default is 0."
Pitch:
  description: "The pitch of the voice, for example `default`, `high`, or `+10%`. The default is `default`."
Pitch contour:
  description: "Changes of the pitch over the course of the speech, in SSML `contour` format, for example `(0%, -1st) (100%, +10st)`. This overrides the **Pitch** setting. For details, see the [W3C SSML specification](https://www.w3.org/TR/speech-synthesis/#pitch_contour). Leave empty to not change the pitch contour."
{% endconfiguration_basic %}

## Supported functionality

The **Microsoft Text-to-speech** integration provides the following entity.

### Text-to-speech

- **Text-to-speech**
  - **Description**: Turns text into speech using the language, gender, and voice from your configuration. You can select it as the text-to-speech engine of a voice assistant under {% my voice_assistants title="**Settings** > **Voice assistants**" %}.
  - **Entity ID**: `tts.microsoft_text_to_speech` by default

## Using Microsoft text-to-speech in automations

To play a message from an automation or script, use the [**Speak**](/actions/tts.speak/) action and select your Microsoft text-to-speech entity as the target.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you are setting up a new automation, add a trigger in the **When** section. Scripts do not need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target**, select your Microsoft text-to-speech entity.
6. From the actions shown for that target, select **Speak**.
7. Select the **Media player entity** to play the message on, and enter the **Message**.
8. Optionally, set the **Language** and **Options** for this message. For the supported options, see [Options of the Speak action](#options-of-the-speak-action).
9. Select **Save**.

{% details "YAML example for the Speak action" %}

{% example %}
action: |
  action: tts.speak
  target:
    entity_id: tts.microsoft_text_to_speech
  data:
    media_player_entity_id: media_player.living_room
    message: "There is a person at the front door."
{% endexample %}

{% enddetails %}

### Options of the Speak action

To use a different voice for a single message, set these options in the **Options** field of the **Speak** action. If you don't set them, the integration uses the values from your configuration.

- `gender`: The gender of the voice, either `female` or `male`.
- `type`: The name of the voice without the language prefix, for example `RyanNeural`. The voice must be available for the language of the message.

{% details "YAML example with a different language and voice" %}

{% example %}
action: |
  action: tts.speak
  target:
    entity_id: tts.microsoft_text_to_speech
  data:
    media_player_entity_id: media_player.living_room
    message: "There is a person at the front door."
    language: en-gb
    options:
      gender: male
      type: RyanNeural
{% endexample %}

{% enddetails %}

## Known limitations

- The voice you select must be available for the language of the message. If you change the language, also select a matching voice.
- If your API key changes, remove the integration and add it again with the new key.

## Troubleshooting

{% details "The API key is rejected during setup" %}

### Symptom: "The API key was rejected"

When you set up the integration, the form shows that the API key was rejected.

#### Resolution

1. Make sure you copied the full key from **Resource Management** > **Keys and Endpoint** of your Azure Speech resource.
2. Make sure the **Region** you selected matches the region of your Azure Speech resource. A key only works in the region of its resource.

{% enddetails %}

{% details "Speech synthesis fails with error 400" %}

### Symptom: The message is not spoken and the logs show error 400

When Home Assistant sends a message to the Microsoft Text-to-speech service, nothing is played. The logs show an error with HTTP status code 400 (Bad Request).

#### Description

The voice must be available for the language of the message. If the voice doesn't match the language, the service can't synthesize the speech and rejects the request. This can happen when you set a different **Language** in the **Speak** action, or set a different voice with the `type` option, without changing the other one as well.

#### Resolution

1. Check which voices are available for your language in the [Microsoft language and voice support documentation](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts).
2. Make sure the voice matches the language:
   - If the error happens for all messages, check the **Language** and **Voice** of the integration. To change them, remove the integration and add it again.
   - If the error happens only for a specific **Speak** action, check the **Language** and the `type` option of that action.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, you can also delete the Azure Speech resource in the Azure portal if you no longer need it.
