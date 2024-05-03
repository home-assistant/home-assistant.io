---
title: IKEA SYMFONISK
description: Connect and control your IKEA SYMFONISK devices using the Sonos integration
ha_category:
  - Media player
  - Sensor
ha_domain: symfonisk
ha_release: 0.7.3
ha_integration_type: virtual
ha_supporting_domain: sonos
ha_supporting_integration: Sonos
ha_codeowners:
  - '@jjlawren'
  - '@peterager'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - media_player
  - number
  - sensor
  - switch
ha_iot_class: Local Push
ha_ssdp: true
ha_zeroconf: true
---

{% include integrations/supported_brand.md %}
