---
title: IoTorero
description: Connect and control your IoTorero devices using the ESPHome integration
ha_release: 0.85
ha_category:
  - Alarm
  - DIY
  - Update
ha_domain: iotorero
ha_integration_type: virtual
ha_supporting_domain: esphome
ha_supporting_integration: ESPHome
works_with:
  - local
ha_codeowners:
  - '@jesserockz'
  - '@kbx81'
  - '@bdraco'
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - assist_satellite
  - binary_sensor
  - button
  - camera
  - climate
  - cover
  - date
  - datetime
  - diagnostics
  - event
  - fan
  - light
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
  - text
  - time
  - update
  - valve
  - water_heater
ha_iot_class: Local Push
ha_dhcp: true
ha_zeroconf: true
ha_brand: true
---

{% include integrations/wwha.md url="https://www.athom.tech/" %}

{% include integrations/supported_brand.md %}

## Supported devices

{% include integrations/device_list.html brand="iotorero" %}
