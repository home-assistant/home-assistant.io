---
title: Xiaomi BLE
description: Instructions on how to integrate Xiaomi BLE devices into Home Assistant.
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

Integrates devices that implement the Xiaomi Mijia BLE MiBeacon protocol and other Xiaomi BLE devices that support passive collection. It listens to Bluetooth broadcasts that the device makes by itself, allowing us to track the latest sensor values without needing to wake it up from deep sleep to poll and conserving its battery power.

The integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported device classes

It is possible that we detect your device because it uses the MiBeacon protocol but don't yet support any or all of its sensors. We currently actively test devices with the following sensor classes.

- Temperature
- Humidity
- Battery


{% include integrations/config_flow.md %}
