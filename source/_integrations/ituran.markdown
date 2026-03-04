---
title: Ituran
description: Instructions on how to add Ituran to Home Assistant.
ha_category:
  - Car
  - Device Tracker
  - Presence detection
ha_release: '2025.1'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@shmuelzon'
ha_domain: ituran
ha_platforms:
  - binary_sensor
  - device_tracker
  - sensor
ha_integration_type: hub
ha_quality_scale: silver
---

The **Ituran** {% term integration %} allows you to retrieve information from your Ituran-equipped vehicle using the [Ituran APP service](https://www.ituran.co.il/ituranfront/comfort-services-2/ituran-app-comfort). It pulls information from the Ituran web service regarding the vehicle's location.

## Prerequisites

You must have an Ituran account for use with the Ituran APP ([Android](https://play.google.com/store/apps/details?id=com.ituran.forall)/[iOS](https://apps.apple.com/app/id1227756834)). All devices that work with the app, should work with this integration as well.

{% include integrations/config_flow.md %}

{% configuration_basic %}
ID or passport number:
  description: Your government ID or passport number used to sign-up with Ituran.
Mobile phone number:
  description: The mobile phone number used to sign-up with Ituran. A one-time-password will be sent to this number.
Mobile ID (Password):
  description: "Optional. The mobile ID from your Ituran mobile app. Does not require a one-time password and allows using both this integration and the mobile app simultaneously."
{% endconfiguration_basic %}

{% important %}
To be able to provide the `Mobile ID (Password)` on integration setup, you need to enable [advanced mode](/blog/2019/07/17/release-96/#advanced-mode).
{% endimportant %}

### Finding the Mobile ID on Android

To find the Mobile ID on an Android device, you must enable Developer Options and USB Debugging on your phone. Then, connect your phone to a computer with ADB installed, open the Ituran app, and run the following command in your terminal:

```bash
adb logcat --pid=$(adb shell pidof -s com.ituran.forall) --regex="Password\s="
```

## Data updates

The information is pulled every 5 minutes from the Ituran web service; however, the data is updated at intervals determined by Ituran based on whether the vehicle is stationary or not.

## Supported functionality

### Binary sensor

The Ituran {% term integration %} exposes the following binary sensors for each registered vehicle:

- **Charging** - Only for EV's. The charging state of the vehicle

### Device tracker

The Ituran {% term integration %} will track the location of each vehicle registered to your account.

### Sensor

The Ituran {% term integration %} also exposes the following sensors for each registered vehicle:

- **Address** - The address that corresponds with the vehicle's location, as determined by Ituran
- **Battery level** - Only for EV's. The battery level (%) of the vehicle
- **Battery voltage** - The measured voltage (V) of the car battery. If not supported by the installation, the value will be set to `-1`
- **Heading** - The direction (0-359°) that the vehicle is pointing to
- **Last update from vehicle** - The time from when the vehicle last published its information to the Ituran cloud
- **Mileage** - The distance (km) the vehicle has traveled
- **Remaining range** - The distance (km) the vehicle can travel until the battery is depleted
- **Speed** - The current speed (km/h) of the vehicle

## Known limitations

- By default, while this integration is configured using a one-time password, you won't be able to use the official app, as only one connection at a time is supported.
  - To solve this, you can configure the `Mobile ID (Password)` option (requires advanced mode) to allow using both the integration and the mobile app simultaneously.
  - Alternatively, it's possible to add another user from the app, with a different ID and mobile phone number that will be dedicated for Home Assistant use.
- The vehicle's heading value is unreliable when it's not in motion
- The mileage value is not read from the vehicle's odometer but is calculated from GPS, which may result in slight variations from the actual odometer reading

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
