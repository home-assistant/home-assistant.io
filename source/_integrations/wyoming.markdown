---
title: Wyoming Protocol
description: Connect remote voice services to Home Assistant.
ha_category:
  - Voice
ha_iot_class: Local Push
ha_release: '2023.5'
ha_codeowners:
  - '@synesthesiam'
ha_domain: wyoming
ha_integration_type: service
ha_platforms:
  - assist_satellite
  - binary_sensor
  - conversation
  - number
  - select
  - stt
  - switch
  - tts
  - wake_word
ha_config_flow: true
ha_zeroconf: true
---

The **Wyoming** {% term integration %} connects external voice services to Home Assistant using a [small protocol](https://github.com/rhasspy/rhasspy3/blob/master/docs/wyoming.md). This enables [Assist](/voice_control/) to use a variety of local [speech-to-text](/integrations/stt/), [text-to-speech](/integrations/tts/), and [wake-word-detection](/integrations/wake_word/) systems, such as:

- Speech-to-Phrase {% my supervisor_addon badge addon="core_speech-to-phrase" %}
- Whisper {% my supervisor_addon badge addon="core_whisper" %}
- Piper {% my supervisor_addon badge addon="core_piper" %}
- openWakeWord {% my supervisor_addon badge addon="core_openwakeword" %}

### Installing a local voice pipeline

The Wyoming, Piper, and Whisper apps for Home Assistant (formerly known as add-ons) are used to create a fully local voice pipeline. To learn how to do this, follow the procedure on [installing a local voice pipeline](/voice_control/voice_remote_local_assistant/).

{% include integrations/config_flow.md %}
