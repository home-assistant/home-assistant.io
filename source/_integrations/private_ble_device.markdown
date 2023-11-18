---
title: Private BLE Device
description: Instructions on how to integrate private BLE devices into Home Assistant.
ha_category:
  - Device tracker
ha_release: '2023.10'
ha_iot_class: Local Push
ha_domain: private_ble_device
ha_platforms:
  - device_tracker
  - sensor
ha_config_flow: true
ha_integration_type: integration
ha_codeowners:
  - '@Jc2k'
---

Some BLE devices use a privacy feature called Resolvable Private Addresses to stop businesses from tracking you when you are out with your smart devices. Instead of having a single static address that can be used to track you, its Bluetooth address changes frequently. If you have [Bluetooth](/integrations/bluetooth) enabled and functioning and know your device's Identity Resolving Key, you can add it to Home Assistant as a Private BLE Device. We can then work out which random MAC addresses are related to the IRK and track those.

In addition to telling you if your device is home or away, it can also tell you an estimated distance to the nearest Bluetooth dongle or proxy and its signal strength.

{% include integrations/config_flow.md %}

Your device must be on and broadcasting in range before adding it to Home Assistant - we check that it's visible to validate that your IRK is correct.

There are two common representations for encoding an IRK - base64 encoding or hex encoding. This integration supports both.

## Getting your Identity Resolving Key (IRK)

### On macOS

If you are trying to get the IRK for your iPhone or Apple Watch, you must be logged in to the Mac with the same iCloud account on those devices. This procedure should also work for devices that you pair with macOS.

1. Start the **Keychain Access** application.
2. In the left sidebar, make sure iCloud is selected.
3. In the search bar in the upper right, type Bluetooth.
4. A list of GUIDs is shown.
5. Double-click on a record. As part of the **Account** field, it will say `Public: XX:XX:XX:XX:XX:XX`. This MAC address should match the device you are trying to work with.
6. Click on show password
7. You will have to enter your password, then enter your username and password.
8. macOS will show some XML. You are looking for the "Remote IRK" field. After there is a data field that contains a base64 encoded version of your Identity Resolving Key.

## ESPresense

If you already use Identity Resolving Key tracking with ESPresence then you already have a hex-encoded version of your Identity Resolving Key. Home Assistant can use the key in this format directly.
