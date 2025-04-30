---
title: ElevenLabs
description: Instructions on how to setup ElevenLabs text-to-speech with Home Assistant.
ha_category:
  - Text-to-speech
ha_release: 2024.8
ha_iot_class: Cloud Polling
ha_domain: elevenlabs
ha_platforms:
  - tts
ha_config_flow: true
ha_integration_type: service
ha_codeowners:
  - '@sorgfresser'
---

The **ElevenLabs** text-to-speech {% term integrations %} adds support for [ElevenLabs](https://elevenlabs.io/) as text-to-speech to read a text with natural sounding voices.

## Prerequisites

- You need an ElevenLabs account to use this integration. A free account suffices for basic usage.
- For custom voices or more quota you need a subscription.
- You need your API key from the ElevenLabs website.

{% include integrations/config_flow.md %}

For an overview of which languages can be used, check the [complete list of supported languages](https://elevenlabs.io/languages).

For a description of which voices are available for use, check your VoiceLab voices.

To see the available models and their benefits, check the [models documentation](https://elevenlabs.io/docs/speech-synthesis/models).

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
  description: "Model ID for the model to use. Will override the default model of the entity!"
  required: false
  type: string

{% endconfiguration %}

For more information about using text-to-speech with Home Assistant and more details on all the options it provides, see the [TTS documentation](/integrations/tts/).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
