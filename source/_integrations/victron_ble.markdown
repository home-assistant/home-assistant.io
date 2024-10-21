---
title: Victron BLE
description: Instructions on how to integrate Victron BLE devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: '2024.11'
ha_iot_class: Local Push
ha_codeowners:
  - '@rajlaud'
ha_domain: victron_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates Victron Energy devices that support the BLE protocol into Home Assistant.

{% include integrations/config_flow.md %}

The Victron BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

To configure a discovered device, you will need to supply the per-device encryption key, which you can retrieve using these [instructions](https://github.com/keshavdv/victron-ble/tree/main#fetching-keys).
