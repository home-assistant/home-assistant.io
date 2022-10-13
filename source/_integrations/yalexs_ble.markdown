---
title: Yale Access Bluetooth
description: Instructions on how to integrate Yale Access Bluetooth devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Lock
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: yalexs_ble
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - lock
  - sensor
ha_integration_type: integration
---

Integrates [Yale Access](https://www.yalehome.com/us/en/products/smart-technology/yale-access) Bluetooth devices into Home Assistant.

{% include integrations/config_flow.md %}

The Yale Access Bluetooth integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

Devices must have a Yale Access module installed to function with this integration if one is not already built-in.

## Supported devices

- YRD216 (Yale Assure Lock Keypad with Physical Key)
- YRL216 (Yale Assure Door Lever Lock with Push Button Keypad)
- YRD226 (Yale Assure Lock Touchscreen Deadbolt with Physical Key)
- YRL226 (Yale Assure Door Lever Lock Keypad)
- YRD256 (Yale Assure Lock Keypad)
- YRD420 (Yale Assure Lock 2)
- YRD450 (Yale Assure Lock 2 Key Free)
- ASL-05 (August WiFi Smart Lock - Gen 4)
- ASL-03 (August Smart Lock Pro - Gen 3)
- ASL-02 (August Smart Lock Pro - Gen 2)

## Limited support devices

These devices do not send updates, but can be locked and unlocked.

- MD-04I (Yale Conexis L1)
- YRCB-490 (Yale Smart Cabinet Lock)

## Push updates

Some locks only send push updates when they have an active HomeKit pairing. If your lock is not sending push updates, ensure it's paired with a HomeKit using an iOS device or the HomeKit controller integration. The lock cannot be paired via HomeKit Controller and the Yale Access Bluetooth integration on the same Home Assistant instance as they will both try to access the lock simultaneously and fail.

One easy way to fix this is to create a new/second home in the Apple Home app and add the lock to that new home. Push updates should occur as intended after the lock is added.

Alternatively, call the `homeassistant.update_entity` service to force the integration to update the lock state.

## Door Sensors

The lock must be calibrated in the Yale Access App for the door sensors to function correctly. If the door sensor has an unknown state or is not updating, try recalibrating the lock in the app.


## Obtaining the offline key

The offline key and slot number are required to operate the lock. These credentials can be found in multiple places depending on the lock brand and model.

### Yale Access or August Cloud

The [August](/integrations/august) integration will automatically provision the offline key if the configured account has the key loaded. You may need to create or use a non-primary existing account with owner-level access to the lock, as not all accounts will have the key loaded.

Most Yale branded locks can use the August cloud to obtain the keys. Accessing the August cloud to receive the key may not work unless the lock was purchased in a market that sells under both brands.

### iOS - Yale Access App or August App

The iOS app will only save the offline key to your device's filesystem if Auto-Unlock has been enabled and used at least once. Auto-Unlock can be disabled once the key has been loaded.

- Using [iMazing](https://imazing.com/) or [iPhone Backup Extractor](https://www.iphonebackupextractor.com/), find the backup files for the Yale Access app.
- Look in the `Library/Preferences` `.plist` files for the Yale Access app and find the one with the value of `key` and `slot` using `Xcode` or any binary `plist` viewer.

### Android - Yale Access App or August App

The Android app will only save the offline key to your device's filesystem if Auto-Unlock has been enabled and used at least once. Auto-Unlock can be disabled once the key has been loaded.

Root access is required to read the `key` and `slot` stored in `/data/data/com.august.luna/shared_prefs/PeripheralInfoCache.xml`
