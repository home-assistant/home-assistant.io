---
title: Sensirion BLE
description: Instructions on how to integrate Sensirion BLE devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: '2022.12'
ha_iot_class: Local Push
ha_codeowners:
  - '@akx'
ha_domain: sensirion_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates sensors talking [Sensirion](https://sensirion.com/)'s BLE protocol into Home Assistant.

{% include integrations/config_flow.md %}

The Sensirion BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [Sensirion MyCO2 Gadget](https://sensirion.com/products/catalog/SCD4x-CO2-Gadget/)
- [Sensirion SHT4x Smart Gadget](https://www.sensirion.com/products/catalog/SHT4x-Smart-Gadget)
- [Sensirion SHT31 Gadget](https://developer.sensirion.com/archive/platforms/sht31-smart-gadget-development-kit/) (untested)
