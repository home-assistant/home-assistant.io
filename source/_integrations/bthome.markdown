---
title: BTHome
description: Instructions on how to integrate BTHome BLE devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@Ernst79'
  - '@thecode'
ha_domain: bthome
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - event
  - sensor
ha_integration_type: integration
---

Integrates [BTHome](https://bthome.io/) BLE devices into Home Assistant.

{% include integrations/config_flow.md %}

The BTHome BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

BTHome is an energy effective but flexible BLE format to broadcast data with Bluetooth and allows you to create your own DIY BLE sensors. More information about the BTHome BLE format and projects that use the format can be found on the [BTHome website](https://bthome.io/).

## Bindkey

When using encryption for your BTHome sensor, you will be prompted to enter your 32 character hexadecimal (16 bytes) encryption key. This key is called the bindkey. More information about the bindkey can be found in the [specifications](https://bthome.io/#encryption).
