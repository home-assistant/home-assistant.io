---
title: Yale Access Bluetooth
description: Instructions on how to integrate Yale Access Bluetooth devices into Home Assistant.
ha_category:
  - Lock
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: yalexs_ble
ha_config_flow: true
ha_platforms:
  - lock
ha_integration_type: integration
---

Integrates [Yale Access](https://www.yalehome.com/us/en/products/smart-technology/yale-access) Bluetooth devices into Home Assistant.

{% include integrations/config_flow.md %}

The Yale Access Bluetooth integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

Devices must have the Yale Access module installed.

- YRD216
- YRL216
- YRD226
- YRL226
- YRD256

## Push updates

Some locks only sends push updates when they have an active HomeKit pairing. If your lock is not getting push updates, make sure its paired with a HomeKit controller. The lock cannot be paired via HomeKit Controller and the Yale Access Bluetooth integration on the same Home Assistant instance as they will both try to access the lock at the same time and fail.

## Obtaining the offline key

The offline key and slot number are required to operate the lock. These credentials reside in the Yale Access app storage on iOS or Android devices with owner access to the lock.

The Yale Access app will only save the offline key to your device's filesystem if AutoUnlock has been enabled and used at least once.

### iOS

- Using [iMazing](https://imazing.com/) or [iPhone Backup Extractor](https://www.iphonebackupextractor.com/), find the backup files for the Yale Access app.
- Look in the `Library/Preferences` `.plist` files for the Yale Access app and find the one with the value of `key` and `slot` using `Xcode` or any binary `plist` viewer.

### Android

Root access is required to read the `key` and `slot` stored in `/data/data/com.august.luna/shared_prefs/PeripheralInfoCache.xml`
