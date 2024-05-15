---
title: Whisper
description: Connect and control your Whisper devices using the Wyoming Protocol integration
ha_category:
  - Voice
ha_domain: whisper
ha_release: '2023.5'
ha_integration_type: virtual
ha_supporting_domain: wyoming
ha_supporting_integration: Wyoming Protocol
ha_codeowners:
  - '@balloob'
  - '@synesthesiam'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - number
  - select
  - stt
  - switch
  - tts
  - wake_word
ha_iot_class: Local Push
ha_zeroconf: true
---

{% include integrations/supported_brand.md %}
