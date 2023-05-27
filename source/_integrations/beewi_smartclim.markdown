---
title: BeeWi SmartClim BLE sensor
description: Instructions on how to integrate BeeWi SmartClim BLE sensor with Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2023.4
ha_iot_class: Local Push
ha_codeowners:
  - '@f-davin'
ha_domain: beewi_smartclim
ha_platforms:
  - sensor
ha_integration_type: device
---

Integrates BeeWi SmartClim devices into Home Assistant. This sensor permit to get the temperature and humidity of a room.

{% include integrations/config_flow.md %}

The BeeWi SmartClim integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.
