---
title: ElevenLabs
description: Instructions on how to setup ElevenLabs text-to-speech with Home Assistant.
ha_category:
  - Text-to-speech
ha_release: 2024.8
ha_iot_class: Cloud Polling
ha_domain: elevenlabs
ha_platforms:
  - stt
  - tts
ha_config_flow: true
ha_integration_type: service
ha_codeowners:
  - '@sorgfresser'
---

The **ElevenLabs** {% term integrations %} adds support for [ElevenLabs](https://elevenlabs.io/) as text-to-speech to read a text with natural sounding voices and speech-to-text to convert speech into text.

## Prerequisites

- You need an ElevenLabs account to use this integration. A free account suffices for basic usage.
- For custom voices or more quota you need a subscription.
- You need your API key from the ElevenLabs website.
- Your API key requires the following permissions:
  - Text to Speech
  - Speech to Text
  - Voices (Read only)
  - Models (Read only)

{% include integrations/config_flow.md %}

### Text-to-speech

For an overview of which languages can be used, check the [complete list of supported languages](https://elevenlabs.io/languages).

For a description of which voices are available for use, check your VoiceLab voices.

To see the available models and their benefits, check the [models documentation](https://elevenlabs.io/docs/speech-synthesis/models).

### Speech-to-text

An overview of supported languages is available at [complete list of supported languages](https://elevenlabs.io/docs/capabilities/speech-to-text#supported-languages).

List of models and their capabilities can be determined at [models documentation](https://elevenlabs.io/docs/capabilities/speech-to-text#models).

## Action speak

The `tts.speak` action is the modern way to use TTS. Add the `speak` action, select the entity for your ElevenLabs TTS (it's named ElevenLabs by default), select the media player entity or group to send the TTS audio to, and enter the message to speak.

For more options about `speak`, see the Speak section on the main [TTS](/integrations/tts/#service-speak) building block page.

In YAML, your action will look like this:

```yaml
action: tts.speak
target:
  entity_id: tts.elevenlabs
data:
  media_player_entity_id: media_player.giant_tv
  message: Hello, can you hear me now?
  options:
    voice: <voice-id>
    model: <model-id>
```

### Configuration

Below settings can be configured in the options of the integration and in the `options` parameter of the `tts.speak` service.

{% configuration %}

voice:
  description: "Voice ID for the ElevenLabs voice to use. Will override the default voice of the entity!"
  required: false
  type: string
model:
  description: "Model ID for the text-to-speech model to use. Will override the default model of the entity!"
  required: false
  type: string
Speech-to-text model:
  description: "Model ID for the speech-to-text model to use. Will override the default model of the entity!"
  required: false
  type: string
Auto-detect language:
  description: "Should speech-to-text auto-detect the language spoken, overrides the language selected in voice assistant!"
  required: false
  type: boolean
  default: false

{% endconfiguration %}

For more information about using text-to-speech with Home Assistant and more details on all the options it provides, see the [TTS documentation](/integrations/tts/).

For more information about using speech-to-text with Home Assistant and more details on all the options it provides, see the [STT documentation](/integrations/stt/).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
