---
title: Victron BLE
description: Instructions on how to integrate Victron BLE devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: '2025.12'
ha_iot_class: Local Push
ha_codeowners:
  - '@rajlaud'
ha_domain: victron_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **Victron BLE** {% term integration %} integrates [Victron Energy](https://www.victronenergy.com/) devices that support the BLE protocol into Home Assistant.

{% include integrations/config_flow.md %}

The Victron BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Adding a device

To configure a discovered device, you will need to supply the per-device encryption key. For more information, see these [instructions](https://github.com/keshavdv/victron-ble/tree/main#fetching-keys).

To get the encryption key, use the VictronConnect app ([Android](https://play.google.com/store/apps/details?id=com.victronenergy.victronconnect), [iOS](https://apps.apple.com/app/id943840744), [Linux](https://www.victronenergy.com/support-and-downloads/software#victronconnect-app), [macOS](https://apps.apple.com/app/id1084677271), [Windows](https://www.victronenergy.com/support-and-downloads/software#victronconnect-app)):

1. Install the **VictronConnect** app, ideally on the device you are using to set up this integration so you can simply cut and paste the key.
2. Open the app and pair with your device.
3. From the list, select the device that you want to monitor.
4. To open the **Settings** for that device, select the gear icon.
5. Open the menu and select **Product Info**.
6. Scroll down to **Instant Readout via Bluetooth** and enable the feature (if it is not already enabled).
7. To display the encryption key, next to **Instant Readout Details**, select **Show**.

## Data updates

This integration subscribes to passive Bluetooth updates and will update the sensors
as often as the updates are received.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
