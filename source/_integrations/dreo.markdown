---
title: Dreo
description: Instructions on how to set up Dreo products within Home Assistant.
ha_category:
  - Fan
ha_release: 2026.5
ha_domain: dreo
ha_platforms:
  - fan
ha_integration_type: integration
ha_config_flow: true
---

The **Dreo** {% term integration %} enables you to control smart products connected to the [Dreo App](https://m.dreo.com/en) from [Dreo](https://www.dreo.com/).

## Prerequisites

Before you can use this integration, all devices must be registered with the
Dreo App. Once registration is complete, you can add the Dreo integration in Home Assistant through the UI.

{% include integrations/config_flow.md %}

## Configuration parameters

To add the Dreo integration, you need to provide the following credentials from your Dreo App account:

{% configuration_basic %}
Username / email:
  description: Your Dreo App account username or email address.
Password:
  description: Your Dreo App account password.
{% endconfiguration_basic %}

## Supported functionality

The Dreo integration provides the following entities:

### Fans

- **Fan**
  - **Description**: Control your Dreo fan device.
  - **Functionality**:
    - Turn on/off
    - Set fan speed
    - Toggle oscillation
    - Select preset modes
  - **Available for models**: DR-HTF001S, DR-HTF002S, DR-HTF004S, DR-HTF005S, DR-HTF007S, DR-HTF008S, DR-HTF009S, DR-HTF010S
  - **Attributes**:
    - `mode` - The current mode the device is in ("manual", "auto", "sleep")
    - `speed` - The current speed setting
    - `oscillate` - Whether oscillation is enabled (true/false)


## Troubleshooting

### Inability to control devices

- **Device State Sync**: Sometimes, the device state may not sync correctly between the Dreo App and Home Assistant. Try toggling the device on/off, changing the mode, or adjusting the speed from within the Dreo App to see if the state updates.
- **App Version Mismatch**: Ensure that the Dreo App is running an up-to-date version. An outdated version could lead to compatibility issues and control problems. Update the Dreo App from the official app store for your device.

### Dreo App credentials are invalid or expired

If your Dreo App credentials are invalid or expired, you can follow these steps:

1. Open the Dreo App. Go to the account settings section.
2. If you are currently logged in, select the **Log out** option.
3. Enter your correct username and password. If you have forgotten your password, use the **Forgot password** option in the app to reset it.
4. Once you have successfully logged in to the Dreo App, go back to Home Assistant. Navigate to the Dreo integration settings and re-enter your Dreo App credentials. Then save the settings.

### Device becomes unresponsive

If the device becomes unresponsive, try the following steps:

1. Power cycle the device:
   - Turn off the device using its power switch or unplug it from the power source.
   - Wait for about 10–15 seconds and then turn it back on or plug it back in.
2. Check the Wi-Fi connection:
   - Ensure that the device is connected to a stable Wi-Fi network.
   - You can try moving the device closer to the router to improve the signal strength.
3. Reset the device:
   - If the above steps do not work, you may need to reset the device to its factory settings.
   - Refer to the device's user manual for the specific reset procedure.
   - After resetting, re-add the device to the Dreo App and then to Home Assistant.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
