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

{% include integrations/config_flow.md %}
