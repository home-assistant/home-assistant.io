---
title: IoTorero
description: Connect and control your IoTorero devices using the ESPHome integration
ha_release: 2026.7
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
---

[IoTorero](https://www.athom.tech/) devices work locally and integrate seamlessly with the [ESPHome](/integrations/esphome/) {% term integration %} in Home Assistant. As all connectivity is done locally, status updates and device control from Home Assistant happen instantly.

{% include integrations/supported_brand.md %}

