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
ha_integration_type: integration
ha_platforms:
  - stt
  - tts
  - wake_word
ha_config_flow: true
---

The **Wyoming** {% term integration %} connects external voice services to Home Assistant using a [small protocol](https://github.com/rhasspy/rhasspy3/blob/master/docs/wyoming.md). This enables [Assist](/voice_control/) to use a variety of local [speech-to-text](/integrations/stt/), [text-to-speech](/integrations/tts/), and [wake-word-detection](/integrations/wake_word/) systems, such as:

- Whisper {% my supervisor_addon badge addon="core_whisper" %}
- Piper {% my supervisor_addon badge addon="core_piper" %}
- openWakeWord {% my supervisor_addon badge addon="core_openwakeword" %}

### Note on automatic discovery of Piper and Whisper
If you are using the Piper and/or Whisper add-ons, they should be automatically discovered by Home Assistant. If they are not, check if the add-ons are already started. 

{% include integrations/config_flow.md %}

## Satellites

[Remote voice satellites](https://github.com/rhasspy/wyoming-satellite) can be connected to Home Assistant using the Wyoming protocol. These satellites typically run on Raspberry Pi's, and are automatically discovered by Home Assistant through [Zeroconf](/integrations/zeroconf).
