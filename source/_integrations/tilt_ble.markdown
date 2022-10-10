---
title: Tilt Hydrometer BLE
description: Instructions on how to integrate Tilt Hydrometer BLE devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: '2022.10'
ha_iot_class: Local Push
ha_codeowners:
  - '@apt-itude'
ha_domain: tilt_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [Tilt Hydrometer](https://tilthydrometer.com/) BLE devices into Home Assistant.

{% include integrations/config_flow.md %}

The Tilt Hydrometer BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [Tilt Hydrometer and Thermometer](https://tilthydrometer.com/products/copy-of-tilt-floating-wireless-hydrometer-and-thermometer-for-brewing) (all colors)
