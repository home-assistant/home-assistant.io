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

The integration only supports measuring LPG (Liquefied petroleum gas). Other substances will produce incorrect readings.

- [Pro Plus](https://www.mopekaiot.com/product/mopeka-pro-plus-sensor) (M1015)
- [Pro Check](https://www.mopekaiot.com/product/mopeka-pro-check-sensor-aluminum-lpg-cylinders-w-collar) (M1017)
- Pro-200
- [Pro H2O](https://www.mopekaiot.com/product/mopeka-pro-check-water-sensor-bottom-mount-w-collar)
- [Lippert BottleCheck](https://store.lci1.com/lippert-propane-tank-sensor-2021130655)
- [TD40](https://www.mopekaiot.com/product/mopeka-td40)
- TD200
- [Pro Check Universal](https://www.mopekaiot.com/procheckuniversal)
