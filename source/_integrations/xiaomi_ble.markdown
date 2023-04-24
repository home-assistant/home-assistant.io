---
title: Xiaomi BLE
description: Instructions on how to integrate Xiaomi BLE devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
ha_bluetooth: true
ha_release: 2022.8
ha_iot_class: Local Push
ha_codeowners:
  - '@Jc2k'
  - '@Ernst79'
ha_domain: xiaomi_ble
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

Integrates devices that implement the Xiaomi Mijia BLE MiBeacon protocol and other Xiaomi BLE devices that support passive collection. It listens to Bluetooth broadcasts that the device makes by itself, allowing us to track the latest sensor values without needing to wake it up from deep sleep to poll and conserving its battery power.

The integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

{% include integrations/config_flow.md %}

## Supported device classes

It is possible that we detect your device because it uses the MiBeacon protocol but don't yet support any or all of its sensors. We currently actively test devices with the following sensor classes.

- Temperature
- Humidity
- Moisture
- Illumination
- Conductivity
- Formaldehyde
- Consumable
- Voltage
- Battery

It also supports the following classes of binary sensors:

- Light
- Smoke
- Moisture

The entities for the sensor classes are added after the values are first received. This means entities for values that are broadcasted at a lower interval (e.g., battery) might show up later.

## Encryption

Some devices use AES encryption to protect the sensor values they are broadcasting.

* MiBeacon v2/v3 use unauthenticated AES with a 24 character hexadecimal (12 byte) key
* MiBeacon v4/v5 use authenticated AES with a 32 character hexadecimal (16 byte) key

This key is called the bindkey or beaconkey.

There are a few ways to obtain a bindkey for your device:

* Set your own. The [Telink Flasher](https://atc1441.github.io/TelinkFlasher.html) allows you to generate new bindkeys for devices it supports. The new bind key will work with Home Assistant, but the Mi Home app will not recognize the sensor anymore once the device has been activated by the TeLink flasher application. To use the sensor again with the Xiaomi Mi Home app, the device needs to be removed and then re-added inside the Mi Home app.
* Extract the keys from Xiaomi Cloud using a [token extractor](https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor) tool.

## Devices

### Plant sensor: Flower Care / MiFlora (HHCCJCY01)

HHCCJCY01, also known as MiFlora or "Flower Care", should be automatically discovered. However, if the firmware is too old, it won't send the right BLE beacons and an update via the app is required. The lowest confirmed working firmware version is 3.2.1 (a lower 3.x version could also be alright).

Flower Care firmware update steps:

* Install the official "Flower Care" app by HHCC:
  * [Google Play](https://play.google.com/store/apps/details?id=com.huahuacaocao.flowercare) (requires location and storage permission)
  * [Apple App Store](https://apps.apple.com/us/app/flower-care/id1095274672)
* Place the device with the app within 10cm of the plant sensor
* Press the "+" button on the top right in the devices tab of the app
* Add the plant sensor to the app and select an arbitrary plant
* Wait for the synchronization of the sensor to finish, and a dialog asking for a firmware update should appear (this might take a few minutes)
* The installed and latest firmware version can be verified by selecting the plant -> three-dot menu -> Hardware settings -> Hardware update
* The Flower Care account and app are not required any further for this integration to work
