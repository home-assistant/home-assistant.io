---
title: BM2 battery monitor
description: Read a BM2 battery monitor over Bluetooth.
ha_category: Sensor
ha_platforms: Sensor
ha_iot_class: Local Push
ha_quality_scale: bronze
ha_config_flow: true
ha_bluetooth: true
ha_codeowners: '@andystewart999'
ha_domain: bmx_monitor
ha_integration_type: device
ha_release: 2026.11
---

The BM2 battery monitor integration brings readings from a BM2 Bluetooth battery monitor into Home Assistant. It provides battery voltage, percentage, and status sensors. It can also show the selected battery chemistry, signal strength, and the detected BM2 advertisement generation.

The integration uses a Bluetooth connection for readings when one is available. Depending on the device's firmware version it can continue to use passive readings from Bluetooth advertisements if an active connection is unavailable. The measurements available in that situation depend on what the device broadcasts.

## Supported devices

This integration supports all known variants of the BM2 battery monitor. It checks the BM2 protocol when adding a device, so a Bluetooth name by itself is not enough to identify a supported monitor. The BM6 is not yet supported.

## Before you begin

Make sure the monitor is powered and within range of a Bluetooth adapter or proxy connected to Home Assistant. A passive Bluetooth scanner can receive supported advertisements; an adapter or proxy that supports connections is needed for active Bluetooth readings.

## Configuration

The integration should be discovered automatically. To add a monitor manually, go to **Settings** > **Devices & services**, select **Add integration**, and search for **BM2 battery monitor**. Select the monitor from the list of discovered Bluetooth devices. The integration validates the device before completing setup.

We recommend choosing the chemistry of the monitored battery from one of the predefined types. You can also select **Automatic (via BM2)** to use the monitor's own percentage calculations or **Custom** to enter voltage thresholds for your specific battery type.

{% configuration_basic %}
Bluetooth device:
  description: For manual setup, select the discovered BM2 monitor. A device without a Bluetooth name may appear by its address.
Battery chemistry:
  description: Select Automatic (via BM2), a predefined battery chemistry, or Custom. The selected chemistry determines how the integration interprets percentage and battery status.
{% endconfiguration_basic %}

If the monitor is not shown during manual setup, check its power and Bluetooth range and try again. The monitor must be heard or reached to validate it. Note that an active connection, required to positively confirm the specific BM2 variant, requires a reasonable signal strength. 

## Sensors

The integration can create these sensors as readings become available:
- **Voltage**: Battery voltage.
- **Percent**: Estimated or device-reported battery percentage, depending on the selected battery chemistry and available readings.
- **Status**: Battery condition, such as low, charging, or floating.
- **Signal strength**: Bluetooth signal strength; disabled by default.
- **Battery chemistry**: Selected battery chemistry; disabled by default.
- **BM2 generation**: Recognized advertisement generation; disabled by default.

## Options

You can change the battery chemistry and the sensor update rate limit in the integration's options. Sensor updates are triggered by Bluetooth advertisements. The rate limit sets the minimum number of seconds between updates when limiting is enabled; the default is 60 seconds. It can be applied while charging, while not charging, always, or never. The default is never.

For a custom battery, provide its name and voltage thresholds. The integration interpolates between the values when calculating the percentage from the observed voltage.

{% configuration_basic %}
Battery chemistry:
  description: Select Automatic (via BM2), a predefined battery chemistry, or Custom. The selected chemistry determines how the integration interprets percentage and battery status.
Custom battery name:
  description: A name for your custom battery type. Available when Custom is selected.
Custom voltage thresholds:
  description: Enter increasing voltage values for 0%, 20%, 50%, and 100% charge, plus the floating and charging voltages. Available when Custom is selected.
Sensor update rate limit type:
  description: Allows you to limit how often sensor updates are applied, if desired.  
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
