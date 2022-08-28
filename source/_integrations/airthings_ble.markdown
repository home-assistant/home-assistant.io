---
title: Airthings BLE
description: Instructions on how to set up Airthings Devices over Bluetooth LE.
ha_category:
  - Environment
  - Sensor
ha_release: '2022.9'
ha_iot_class: Local Push
ha_codeowners:
  - '@vincegio'
ha_domain: airthings_ble
ha_bluetooth: true
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

Integrates Airthings BLE sensors into Home Assistant.

## Prerequisites

In order to use this integration, it is required to have working Bluetooth set up on the device running Home Assistant.

It is good if you know the MAC address of your Airthings Device. As of writing, the Airthings app does not show you the address of a device. 

There are some apps and scripts to find the MAC address of BLE devices. A hands-on approach to find which one it is is to add the device to Home Assistant and:
- remove the battery or move it out of range to see if it becomes unavailable, or
- alter the sensors (lux or co2)

Please note, device names configured in the Airthings app are not transferred into Home Assistant.

{% include integrations/config_flow.md %}

## Supported Devices

- Wave
- Wave+
- Wave mini