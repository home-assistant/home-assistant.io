---
title: Mopeka
description: Instructions on how to integrate Mopeka devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2023.2
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: mopeka
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
---

Integrates [Mopeka](https://www.mopekaiot.com/) devices into Home Assistant.

{% include integrations/config_flow.md %}

The Mopeka integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [Pro Plus](https://www.mopekaiot.com/product/mopeka-pro-plus-sensor) (M1015)
- [Pro Check](https://www.mopekaiot.com/product/mopeka-pro-check-sensor-aluminum-lpg-cylinders-w-collar) (M1017)
