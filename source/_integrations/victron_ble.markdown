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

The **Victron BLE** {% term integration %} integrates [Victron Energy](https://www.victronenergy.com/) devices that support **Instant Readout via Bluetooth** (Bluetooth Low Energy, or BLE) into Home Assistant.

## Supported devices

The integration supports the following Victron device types:

- **AC Charger** (Blue Smart IP22, Blue Smart IP65)
- **Battery Monitor** (SmartShunt, BMV series)
- **Battery Sense**
- **DC-DC Converter** (Orion TR Smart)
- **DC Energy Meter**
- **Inverter/Charger** (MultiPlus, Quattro, Inverter RS via VE.Bus)
- **Smart Battery Protect**
- **Smart Lithium**
- **Solar Charger** (SmartSolar, BlueSolar MPPT)

## Unsupported devices

The following device types are not yet supported:

- **Inverter RS** (standalone, non-VE.Bus mode)
- **Lynx Smart BMS**
- **Multi RS**
- **Orion XS**

If your device advertises via BLE with Victron manufacturer data but is not in the supported list above, it may appear in Home Assistant with only a **Signal strength** sensor. This is because the integration can detect any Victron BLE device, but can only read sensor data from supported device types. Full sensor data will become available when support for that device type is added.

{% include integrations/config_flow.md %}

The Victron BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Adding a device

To configure a discovered device, you will need to supply the per-device encryption key.

To get the encryption key, use the VictronConnect app ([Android](https://play.google.com/store/apps/details?id=com.victronenergy.victronconnect), [iOS](https://apps.apple.com/app/id943840744), [Linux](https://www.victronenergy.com/support-and-downloads/software#victronconnect-app), [macOS](https://apps.apple.com/app/id1084677271), [Windows](https://www.victronenergy.com/support-and-downloads/software#victronconnect-app)):

1. Install the **VictronConnect** app, ideally on the device you are using to set up this integration so you can simply cut and paste the key.
2. Open the app and pair with your device.
3. From the list, select the device that you want to monitor.
4. To open the **Settings** for that device, select the gear icon.
5. Open the menu and select **Product Info**.
6. Scroll down to **Instant Readout via Bluetooth** and enable the feature (if it is not already enabled).
7. To display the encryption key, next to **Instant Readout Details**, select **Show**.

## Troubleshooting

### Device only shows signal strength

If your device appears in Home Assistant but only shows a signal strength sensor, this can mean:

- **Unsupported device type**: The device type is not yet supported by the integration. See the [supported devices](#supported-devices) list above.
- **Incorrect encryption key**: The key validation only performs a basic check. If the key is wrong but passes the initial check, the integration will be unable to decrypt the sensor data. Try removing the device and re-adding it with the correct encryption key from the VictronConnect app.

### Device is not discovered

1. Make sure **Instant Readout via Bluetooth** is enabled in the VictronConnect app for the device (see [Adding a device](#adding-a-device) above).
2. Make sure no other device (such as a phone running VictronConnect) is actively connected to the device via Bluetooth, as this can prevent BLE advertisements from being sent.
3. Make sure the [Bluetooth](/integrations/bluetooth) integration is set up and working.

## Data updates

This integration subscribes to passive Bluetooth updates and will update the sensors
as often as the updates are received.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
