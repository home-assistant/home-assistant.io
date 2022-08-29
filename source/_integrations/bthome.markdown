---
title: BThome Bluetooth
description: Instructions on how to integrate BThome BLE devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@Ernst79'
ha_domain: bthome
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [BThome](https://bthome.io/) BLE devices into Home Assistant.

{% include integrations/config_flow.md %}

The BThome BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

BTHome is an energy effective but flexible BLE format to broadcast data with Bluetooth and allows you to create your own DIY BLE sensors. More information about the BThome BLE format and projects that use the format can be found on the [BThome website](https://bthome.io/).

## Supported sensor measurements

The current release supports the following sensor measurement types.

- Temperature
- Humidity
- Pressure
- Illuminance
- Energy
- Power
- PM2.5
- PM10
- CO2
- VOC

## Bindkey

When using encryption for your BThome sensor, you will promted to enter your 32 character hexadecimal (16 bytes) encryption key. This key is called the bindkey. More information about the bindkey can be found in the [specifications](https://bthome.io/#encryption).
