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

The current release supports the following sensor measurement types. More (binary) sensor types will be added in a future release.

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

## Encryption

BThome optionally supports AES encryption to protect the sensor data that are broadcasted. You will need to set a 32 character hexadecimal (16 bytes) key to decrypt the data, when using encryption. This key is called the bindkey.

## ATC pvvx firmware support

Temperature / humidity sensors like the Xiaomi LYWSD03MMC and MHO-C401 and the Qinping CGG1-Mijia and CGDK2 support custom [ATC pvvx firmware](https://github.com/pvvx/ATC_MiThermometer#readme), which can broadcast data via BThome.

Use their [TelinkMiFlasher](https://pvvx.github.io/ATC_MiThermometer/TelinkMiFlasher.html) tool to upgrade your device directly from your browser. Once installed, change the advertising type to "HA BLE" and click "Send Config". Optionally, you can set a bindkey to protect your data.
