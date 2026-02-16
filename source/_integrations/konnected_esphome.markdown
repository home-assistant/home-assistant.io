---
title: Konnected
description: Connect and control your Konnected devices using the ESPHome integration
ha_release: 0.85
ha_category:
  - Alarm
  - DIY
  - Update
ha_domain: konnected_esphome
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
ha_iot_class: Local Push
ha_dhcp: true
ha_zeroconf: true
---

[Konnected](https://konnected.io/) is a member of the Made for ESPHome program.

Konnected devices work locally and integrate seamlessly with the [ESPHome](/integrations/esphome/) {% term integration %} in Home Assistant. As all connectivity is done locally, status updates and device control from Home Assistant happen instantly.

{% include integrations/supported_brand.md %}

## Supported devices

The following devices are known to be supported by the integration. They are certified under the [Works with Home Assistant](https://partner.home-assistant.io/) program.

- [Konnected Smart Garage Door Opener blaQ](https://konnected.io/products/smart-garage-door-opener-blaq-myq-alternative)
- [Konnected Smart Garage Door Opener White (v2)](https://konnected.io/products/smart-garage-door-opener)
- [Konnected Alarm Panel Pro](https://konnected.io/collections/smart-alarm-panels)
