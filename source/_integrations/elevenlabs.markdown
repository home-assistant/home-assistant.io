---
title: ElevenLabs
description: Instructions on how to set up ElevenLabs text-to-speech with Home Assistant.
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

## Using ElevenLabs text-to-speech in automations

To use ElevenLabs text-to-speech from an automation or a script, use the [**Speak**](/actions/tts.speak/) action and select your ElevenLabs text-to-speech entity as the target. The entity is named ElevenLabs by default.

You can set ElevenLabs-specific `voice` and `model` options in the action's **Options** field. For supported options, see [Configuration](#configuration).

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
