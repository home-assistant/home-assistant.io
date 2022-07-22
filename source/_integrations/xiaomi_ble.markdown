---
title: Xiaomi MiBeacon
description: Instructions on how to integrate Xiaomi MiBeacon devices into Home Assistant.
ha_category:
  - Sensor
ha_zeroconf: true
ha_release: 2022.8
ha_iot_class: Local Push
ha_codeowners:
  - '@Jc2k'
  - '@Ernst79'
ha_domain: xiaomi_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates Xiaomi BLE devices into Home Assistant.

## Supported devices

- Flower care (HHCCJCY01)
- Temperature and humidity sensor (LYWSDCGQ)

The integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

{% include integrations/config_flow.md %}
