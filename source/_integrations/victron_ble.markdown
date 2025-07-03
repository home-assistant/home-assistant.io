---
title: Victron BLE
description: Instructions on how to integrate Victron BLE devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: '2025.8'
ha_iot_class: Local Push
ha_codeowners:
  - '@rajlaud'
ha_domain: victron_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates Victron Energy devices that support the BLE protocol into Home Assistant.

{% include integrations/config_flow.md %}

The Victron BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Prerequisites

To configure a discovered device, you will need to supply the per-device encryption key. For more information, see these [instructions](https://github.com/keshavdv/victron-ble/tree/main#fetching-keys).

The simplest method is to use the VictronConnect app ([Android](https://play.google.com/store/apps/details?id=com.victronenergy.victronconnect), [iOS](https://apps.apple.com/us/app/victron-connect/id943840744), [Linux](https://www.victronenergy.com/support-and-downloads/software#victronconnect-app), [macOS](https://apps.apple.com/us/app/victronconnect/id1084677271?ls=1&mt=12), [Windows](https://www.victronenergy.com/support-and-downloads/software#victronconnect-app)):
1. Install the **VictronConnect** app, ideally on the device you are using to set up this integration so you can simply cut and paste the key.
2. Open the app and pair with your device.
3. Locate the device that you want to monitor in the list shown by the app and click on it.
4. Click on the gear icon to open the **Settings** for that device.
5. Open the menu and select **Product Info**.
6. Scroll down to Instant Readout via Bluetooth and enable the feature if it is not already enabled.
7. Click the **Show** button next to Instant Readout Details to display the encryption key.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Data updates

This integration subscribes to passive Bluetooth updates and will update the sensors
as often as the updates are received.