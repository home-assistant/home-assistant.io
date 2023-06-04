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
ha_config_flow: true
---

The Wyoming integration connects external voice services to Home Assistant using a [small protocol](https://github.com/rhasspy/rhasspy3/blob/master/docs/wyoming.md). This enables [Assist](/docs/assist) to use a variety of local [speech-to-text](/integrations/stt/) and [text-to-speech](/integrations/tts/) systems, such as:

* Whisper {% my supervisor_addon badge addon="core_whisper" %}
* Piper {% my supervisor_addon badge addon="core_piper" %}

{% include integrations/config_flow.md %}
