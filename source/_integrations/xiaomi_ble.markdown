---
title: Xiaomi BLE
description: Instructions on how to integrate Xiaomi BLE devices into Home Assistant.
ha_category:
  - Binary sensor
  - Event
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
  - event
  - sensor
ha_integration_type: integration
---

Integrates devices that use the Xiaomi Mijia BLE MiBeacon protocol and the BLE protocols implemented in the MiScales and the MiFora plant sensor. This integration does not support Xiaomi BLE Mesh devices. The integration listens to Bluetooth broadcasts that the device makes by itself, allowing it to track the latest sensor values or events without waking the device up for polling (except HHCCJCY01, see note below). This method conserves battery lifetime.

The integration automatically discovers devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional. The entities are added after the values are first received. This means that entities might show up later if the corresponding values are broadcasted at a lower interval (for example, battery).

{% include integrations/config_flow.md %}

## Encryption

Some devices use AES encryption to protect the sensor values they are broadcasting.

- MiBeacon v2/v3 use unauthenticated AES with a 24 character hexadecimal (12 byte) key
- MiBeacon v4/v5 use authenticated AES with a 32 character hexadecimal (16 byte) key

This key is called the bindkey or beaconkey.

There are a few ways to obtain a bindkey for your device:

- For v4 and v5 devices, you can provide your Xiaomi Cloud account login credentials for the account to which the device is bound. Home Assistant will import the appropriate bind key from your account.
- Extract the keys from Xiaomi Cloud using a [token extractor](https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor) tool.
- Set your own. The [Telink Flasher](https://pvvx.github.io/ATC_MiThermometer/TelinkMiFlasher.html) by pvvx allows you to generate new bindkeys for devices it supports (LYWSD03MMC, MJWSD05MMC, MHO-C401, CGG1, and CGDK2). This online flashing tool also allows you to upload alternative firmware, with some improvements compared to the stock firmware, like faster sensor updates. Note that the new bind key works with Home Assistant, but the Mi Home app does not recognize the sensor anymore once the device has been activated by the TeLink flasher application. To use the sensor again with the Xiaomi Mi Home app, the device needs to be removed and then re-added inside the Mi Home app.
- An alternative [Telink Flasher](https://atc1441.github.io/Temp_universal_mi_activate.html) by atc1441 also allows you to generate new bind keys, and supports even more Xiaomi devices compared to the Telink Flasher by pvvx.
- Yeelight Remote (YLYK01YL) and dimmers (YLKG07YL and YLKG08YL) can use V2/V3 MiBeacon encryption, although more recent devices seem to be supplied with V4/V5 encryption. For V2/V3 MiBeacon encryption, the bindkey can't be determined with the above methods. Instructions on how to get the bindkey for these devices can be found in the [BLE monitor FAQ](https://custom-components.github.io/ble_monitor/faq#how-to-get-the-mibeacon-v2v3-encryption-key).

## Devices

### Plant sensor: Flower Care / MiFlora (HHCCJCY01)

HHCCJCY01, also known as MiFlora or "Flower Care", should be automatically discovered. However, if the firmware is too old, it won't send the right BLE beacons and an update via the app is required. The lowest confirmed working firmware version is 3.2.1 (a lower 3.x version could also be alright).

Flower Care firmware update steps:

- Install the official "Flower Care" app by HHCC:
  - [Google Play](https://play.google.com/store/apps/details?id=com.huahuacaocao.flowercare) (requires location and storage permission)
  - [Apple App Store](https://apps.apple.com/app/flower-care/id1095274672)
- Place the device with the app within 10cm of the plant sensor
- Press the "+" button on the top right in the devices tab of the app
- Add the plant sensor to the app and select an arbitrary plant
- Wait for the synchronization of the sensor to finish, and a dialog asking for a firmware update should appear (this might take a few minutes)
- The installed and latest firmware version can be verified by selecting the plant -> three-dot menu -> Hardware settings -> Hardware update
- The Flower Care account and app are not required any further for this integration to work

Also note that the battery level of the plant sensor can only be retrieved by connecting to the device (reading characteristics), while the other sensor data is broadcasted passively. To prevent battery drainage, a connection is made only once a day. Connecting to the device also requires that the device has a good signal strength.
