---
title: Yale Access Bluetooth
description: Instructions on how to integrate Yale Access Bluetooth devices into Home Assistant.
ha_category:
  - Binary sensor
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
ha_integration_type: device
---

Integrates [Yale Access](https://www.yalehome.com/us/en/products/smart-technology/yale-access) Bluetooth devices into Home Assistant.

{% include integrations/config_flow.md %}

The **Yale Access Bluetooth** {% term integration %} will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

Devices must have a Yale Access module installed to function with this {% term integration %} if one is not already built-in.

## Supported devices

- YRD216 (Yale Assure Lock Keypad with Physical Key)
- YRL216 (Yale Assure Door Lever Lock with Push Button Keypad)
- YRD226 (Yale Assure Lock Touchscreen Deadbolt with Physical Key)
- YRL226 (Yale Assure Door Lever Lock Keypad)
- YRD256 (Yale Assure Lock Keypad)
- YRD420 (Yale Assure Lock 2)
- YRD450 (Yale Assure Lock 2 Key Free)
- YUR/SSDL/1/SIL and MBK (Yale Unity Screen Door Lock - Australia)
- YUR/DEL/1/SIL and MBK (Yale Unity Entrance Lock - Australia)
- IES-D210W-G0 (Yale Smart Safe)
- YRSM-1 (Yale Smart Safe)
- ASL-05 (August WiFi Smart Lock - Gen 4)
- ASL-03 (August Smart Lock Pro - Gen 3)
- ASL-02 (August Smart Lock Pro - Gen 2)

## Limited support devices

These devices do not send updates, but can be locked and unlocked.

- MD-04I (Yale Conexis L1 (requires yale access module), Yale Conexis L2)
- YRCB-490 (Yale Smart Cabinet Lock)

## Deadlock support

Some Yale locks support a deadlock function (secure mode) for locking both the inside and outside. A secure mode lock entity (initially disabled) is exposed for all locks and can be enabled where the lock is known to support this capability.

## Keypad PIN codes

If your lock has a keypad, you can manage its PIN codes from Home Assistant. Each PIN is stored in a numbered slot on the lock, from 1 to 250. Use the [Set lock credential](/actions/yalexs_ble.set_lock_credential/) action to add or change a PIN, the [Clear lock credential](/actions/yalexs_ble.clear_lock_credential/) action to remove one, and the [Get lock credential status](/actions/yalexs_ble.get_lock_credential_status/) action to check whether a slot is in use.

### Slot names

When you set a PIN, you can give its slot a name, such as "Dog walker". Home Assistant shows this name whenever the PIN is used, so you can see who operated the lock. The lock itself does not store names. Home Assistant stores them for each lock you set up, so if you remove the integration and add it again, you need to set the names again.

### Master code

The lock's master code (also called the programming code) is set at the keypad. It cannot be read or changed over Bluetooth, but Home Assistant recognizes when it is used to operate the lock. By default, Home Assistant shows it as "Master code". To show a different name, set the **Master code name** option. See [Options](#options).

### PIN codes and the Yale app

PIN codes you manage in Home Assistant are not shown in the Yale app. When the Yale app or a Yale Connect bridge syncs with the lock, it can overwrite or remove them. To avoid lost or duplicate PINs, manage your PIN codes in one place.

## Who operated the lock

When the lock is locked or unlocked outside Home Assistant, the lock's **Changed by** attribute shows who or what operated it. The logbook shows the same cause for the lock's state change. The possible values are:

- **The slot name**: A keypad PIN in a named slot was used.
- **Keypad slot** followed by the slot number: A keypad PIN in a slot without a name was used, for example **Keypad slot 10**.
- **Keypad**: The lock button on the keypad was used.
- **The master code name or Master code**: The master code was used.
- **Manual**: The lock was turned by hand, using the thumb turn or a key.
- **Auto lock**: The lock locked itself with its auto lock feature.
- **Remote**: The lock was operated remotely, for example from the Yale app.

When you lock or unlock the lock from Home Assistant, the logbook shows the Home Assistant user who did it, as before.

To find out the cause, Home Assistant waits briefly, up to about 2 seconds, for the lock to report what happened before it records the new state. If the lock does not report a cause in time, the new state is recorded without one.

## Lock activity events

When the lock is operated outside Home Assistant and the cause is known, Home Assistant fires a `yalexs_ble_lock_activity` event. You can use this event to trigger automations, for example to send a notification when a specific PIN unlocks the door. The event never contains a PIN.

The event includes the following data:

- `device_id`: The ID of the lock device.
- `entity_id`: The entity ID of the lock, such as `lock.front_door`.
- `source`: What operated the lock: `pin` for the keypad or a PIN, `manual` for the thumb turn or a key, `auto_lock` for the auto lock feature, or `remote` for remote operation.
- `slot`: The keypad slot number of the PIN that was used, or `null` if no numbered slot was used.
- `name`: The slot name or master code name, or `null` if no name is set.
- `master_code`: `true` if the master code was used, otherwise `false`.

The event does not say whether the lock was locked or unlocked. To act only when the lock is unlocked, use a state trigger on the lock and check its **Changed by** attribute instead.

Example event data when the PIN in slot 10, named "Dog walker", unlocks the door:

```yaml
device_id: 0123456789abcdef0123456789abcdef
entity_id: lock.front_door
source: pin
slot: 10
name: Dog walker
master_code: false
```

{% include integrations/actions.md %}

## Yale Access Bluetooth automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: get notified when the dog walker arrives

If you gave someone their own PIN and named the slot, you can get a notification each time they use it. This automation sends a notification when the PIN named "Dog walker" is used on the front door keypad.

- **Trigger**: Manual event received
  - **Event type**: `yalexs_ble_lock_activity`
  - **Event data**: `entity_id: lock.front_door` and `name: Dog walker`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a dog walker notification" %}

{% example %}
automation: |
  alias: "Notify when the dog walker uses their PIN"
  triggers:
    - trigger: event
      event_type: yalexs_ble_lock_activity
      event_data:
        entity_id: lock.front_door
        name: "Dog walker"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The dog walker used their PIN on the front door."
{% endexample %}

{% enddetails %}

## Known limitations

- On some Yale Access modules, the lock does not announce keypad or manual changes over Bluetooth. This is the case, for example, for the Yale Assure Lock SL (YRD256) with the Yale Access Bluetooth module (model MD-01, firmware 2.2.5). With these locks, Home Assistant only notices keypad or manual changes right away when the **Always connected** option is enabled. Without it, the new state and its cause are picked up the next time Home Assistant connects to the lock. Always connected uses more of the lock's battery. See [Options](#options).

## Troubleshooting

Lock operation requires setting up an encrypted connection highly sensitive to latency. It is recommended to use a [High-Performance Bluetooth adapter](/integrations/bluetooth/#known-working-high-performance-adapters) or [ESPHome Bluetooth proxy](/integrations/bluetooth/#remote-adapters-bluetooth-proxies) for stable operation.

## Push updates

Some locks only send push updates when they have an active HomeKit pairing. If your lock is not sending push updates, ensure it's paired with a HomeKit using an iOS device or the HomeKit controller {% term integration %}. The lock cannot be paired via HomeKit Controller and the Yale Access Bluetooth {% term integration %} on the same Home Assistant instance as they will both try to access the lock simultaneously and fail.

One easy way to fix this is to create a new/second home in the Apple Home app and add the lock to that new home. Push updates should occur as intended after the lock is added.

Alternatively, call the `homeassistant.update_entity` action to force the {% term integration %} to update the lock state, or enable the always connected option.

{% include integrations/option_flow.md %}

The following options are available:

- **Always connected**: Keeps the lock connected to Home Assistant over Bluetooth. Enable this if the lock does not support push updates via advertisements or you want lock operation to be more responsive. Always connected uses more of the lock's battery.
- **Master code name**: The name Home Assistant shows when the lock's master code is used, for example in the **Changed by** attribute and the logbook. Leave empty to show "Master code". See [Master code](#master-code).

## Door sensors

The lock must be calibrated in the Yale Access App for the door sensors to function correctly. If the door sensor has an unknown state or is not updating, try recalibrating the lock in the app.

## Obtaining the offline key

The offline key and slot number are required to operate the lock. These credentials can be found in multiple places depending on the lock brand and model.

### Yale Access, Yale Home, or August Cloud

The [Yale](/integrations/yale) or [August](/integrations/august) cloud {% term integration %} can automatically provision the offline key if the configured account has the key loaded. You may need to create or use a non-primary existing account with owner-level access to the lock, as not all accounts will have the key loaded. If the lock was not discovered by Home Assistant when the cloud {% term integration %} was loaded, reload the cloud {% term integration %} once the lock has been discovered.

If the offline key can automatically be provisioned, you will not be asked to enter it and the {% term integration %} should be automatically added, configured and running.

Most Yale branded locks can use the cloud {% term integration %} to obtain the offline key. Accessing the August cloud to receive the key may only work if the lock was purchased in a market that sells under both brands and the Yale cloud should be tried for other markets.

### iOS - Yale Access App or August App

The iOS app will only save the offline key to your device's filesystem if Auto-Unlock has been enabled and used at least once. Auto-Unlock can be disabled once the key has been loaded.

- Using [iMazing](https://imazing.com/) or [iPhone Backup Extractor](https://www.iphonebackupextractor.com/), find the backup files for the Yale Access app.
- Look in the `Library/Preferences` `.plist` files for the Yale Access app and find the one with the value of `key` and `slot` using `Xcode` or any binary `plist` viewer.

### Android - Yale Access App or August App

The Android app will only save the offline key to your device's filesystem if Auto-Unlock has been enabled and used at least once. Auto-Unlock can be disabled once the key has been loaded.

Root access is required to copy the `ModelDatabase.db` from `/data/data/com.august.bennu/databases`. Once copied, you can use [DB Browser for SQLite](https://sqlitebrowser.org/) to open the `ModelDatabase.db`, navigate to the table `LockData` and find the column `offlineKeys`. There, you will find a JSON that includes the `key` and `slot` properties.

### Android - Yale Home

The Android app will only save the offline key to your device's filesystem if Auto-Unlock has been enabled and used at least once. Auto-Unlock can be disabled once the key has been loaded.

Root access is required to copy the `ModelDatabase.sql` from `/data/data/com.assaabloy.yale/databases`. Once copied, you can use [DB Browser for SQLite](https://sqlitebrowser.org/) to open the `ModelDatabase.sql`, navigate to the table `LockData` and find the column `offlineKeys`. There, you will find a JSON that includes the `key` and `slot` properties.

## Troubleshooting

### Lock frequently requires re-authentication

If you use the key from an iOS or Android device that you also frequently use to operate the lock, you may find that the key is rotated, and the integration can no longer authenticate. If you are using the [Yale](/integrations/yale) or [August](/integrations/august) integration to keep the key up to date, it may need to be reloaded to update the key. 

To avoid the problem, create a second owner account in the Yale Home or August app, log in to it once on your iOS or Android device, operate the locks, log out of the account, remove the Yale or August integration from Home Assistant, and set up the integration again with the secondary owner account. This method avoids the problem because there is no longer an iOS or Android device logged into the secondary owner account that can rotate the key unexpectedly.
