---
title: Wyoming Protocol
description: Connect remote voice services to Home Assistant.
ha_category:
  - Voice
ha_iot_class: Local Push
ha_release: '2023.5'
ha_codeowners:
  - '@balloob'
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

- Whisper {% my supervisor_addon badge addon="core_whisper" %}
- Piper {% my supervisor_addon badge addon="core_piper" %}
- openWakeWord {% my supervisor_addon badge addon="core_openwakeword" %}

### Installing a local voice pipeline

The Wyoming, Piper, and Whisper add-ons are used to create a fully local voice pipeline. To learn how to do this, follow the procedure on [installing a local voice pipeline](/voice_control/voice_remote_local_assistant/).

{% include integrations/config_flow.md %}

## Satellites

[Remote voice satellites](https://github.com/rhasspy/wyoming-satellite) can be connected to Home Assistant using the Wyoming protocol. These satellites typically run on Raspberry Pi's, and are automatically discovered by Home Assistant through [Zeroconf](/integrations/zeroconf).


### Audio Settings

The following settings control audio processing of a satellite's microphone input:

- Noise suppression
    - Level of noise suppression (uses [webrtc]). Audio distortion may occur as the level increases.
- Auto gain
    - Automatically adjusts volume based on ambient noise (uses [webrtc]). The setting value is the target dBFS.
- Mic volume
    - Fixed multiplier applied to microphone audio samples. 2.0 doubles the volume, while 0.5 is halves it. Values above 1.0 may increase noise or cause audio distortion.

[webrtc]: https://github.com/rhasspy/webrtc-noise-gain
