---
title: Vevor BLE Heater
description: Instructions on how to integrate Vevor BLE heaters into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: '2023.11'
ha_iot_class: Local Polling
ha_codeowners:
  - '@iotmaestro'
ha_domain: vevor_heater
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [Vevor](https://vevor.com/)'s BLE enabled independent heaters into Home Assistant.

{% include integrations/config_flow.md %}

The Vevor Heater integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled.

## Tested devices

- [Vevor 8 kW heater](https://eur.vevor.com/diesel-heater-c_10321/vevor-diesel-air-heater-all-in-one-12v-5kw-bluetooth-app-lcd-for-car-rv-indoors-p_010516094308)
