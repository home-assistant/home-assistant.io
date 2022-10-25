---
title: IKEA SYMFONISK
description: Connect and control your IKEA SYMFONISK devices using the Sonos integration
ha_category:
  - Media Player
  - Sensor
ha_domain: symfonisk
ha_release: 0.7.3
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: sonos
ha_codeowners:
  - '@cgtobi'
  - '@jjlawren'
ha_ssdp: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - media_player
  - number
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: integration
ha_supporting_domain: sonos
ha_supporting_integration: Sonos
---

{% include integrations/supported_brand.md %}
