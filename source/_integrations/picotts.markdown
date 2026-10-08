---
title: Pico TTS
description: Instructions on how to set up Pico text-to-speech with Home Assistant.
ha_category:
  - Text-to-speech
ha_iot_class: Local Push
ha_release: 0.36
ha_domain: picotts
ha_platforms:
  - tts
ha_integration_type: service
ha_codeowners:
  - '@rrooggiieerr'
ha_config_flow: true
---

The **Pico TTS** {% term integration %} uses [Pico TTS library](https://github.com/naggety/picotts) to read out text with natural sounding voices.
Pico TTS is a powerful open-source engine that runs locally (cloudless) so it can work even without an internet connection.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Language:
  description: "The language to use. Supported languages are `en-US`, `en-GB`, `de-DE`, `es-ES`, `fr-FR`, and `it-IT`."
{% endconfiguration_basic %}

## Supported functionality

The **Pico TTS** integration provides the following entities.

### Text-to-speech

The **Pico TTS** {% term integration %} adds a text-to-speech entity for your configured language. To convert text to speech, you can use the [**Text-to-speech (TTS): Speak** (`tts.speak`)](/actions/tts.speak) {% term action %}.

{% example %}
action: |
  action: tts.speak
  target:
    entity_id: tts.pico_tts_en_us
  data:
    media_player_entity_id: media_player.living_room
    message: "The frogs have escaped from their containment!"
{% endexample %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
