---
title: Kiosker
description: Instructions on how to integrate Kiosker with Home Assistant
ha_category:
  - Binary sensor
  - Button
  - Sensor
  - Switch
ha_release: 2026.5
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Claeysson'
ha_domain: kiosker
ha_platforms:
  - binary_sensor
  - button
  - sensor
  - switch
ha_integration_type: device
ha_zeroconf: true
ha_quality_scale: bronze
---

[Kiosker](https://kiosker.io) is a powerful yet easy-to-use web kiosk for iPad and iPhone. This integration gives you control over your Kiosker app via the Kiosker API.

## Requirements

This integration requires that you have bought Kiosker Pro or have a valid Kiosker subscription. You can try Kiosker, including this integration, free for 7 days.

You need to enable the API server in Kiosker settings. You also need to generate an access token, and find the IP address of the device. Please refer to the [Kiosker documentation](https://docs.kiosker.io/#/api) for further information on how to configure the Kiosker App.

## Supported devices

You need to run version 26.4.1 or later for this integration to be fully functional.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of the device.
API Token:
  description: The generated API token from the Kiosker App.
Use SSL:
  description: Connect to the Kiosker App using HTTPS. The Kiosker API has to be configured for SSL.
Verify certificate:
  description: Verify SSL certificate. Enable for valid certificates only.
{% endconfiguration_basic %}

## Capabilities

{% note %}
Due to Apple's restrictive approach to device control, it's not possible to control any physical features like the screen or device sleep through this integration.
{% endnote %}

This integration exposes all Kiosker API functionality to Home Assistant.

## Supported functionality

The **Kiosker** integration provides the following entities.

### Sensors

- **Battery level**
  - Shows the current battery percentage of your device.
- **Last interaction**
  - Shows when your device was last interacted with.
- **Last motion**
  - Shows when motion was last detected. This is available if a screensaver with motion detection is scheduled or if the camera sensor is enabled.
- **Ambient light**
  - Shows the current ambient light level. This is available if a screensaver with motion detection is scheduled or if the camera sensor is enabled.
- **Blackout text** (disabled by default)
  - Shows the text currently displayed on the blackout screen. Defaults to unknown if no visible blackout.
- **Blackout icon** (disabled by default)
  - Shows the SF Symbol icon name currently displayed on the blackout screen. Defaults to unknown if no visible blackout.
- **Blackout background color** (disabled by default)
  - Shows the background color of the blackout screen as a hex color string (e.g. #000000). Defaults to unknown if no visible blackout.
- **Blackout foreground color** (disabled by default)
  - Shows the text/icon color of the blackout screen as a hex color string (e.g. #FFFFFF). Defaults to unknown if no visible blackout.
- **Blackout expire** (disabled by default)
  - Shows the remaining time in seconds before the blackout expires. Defaults to unknown if no visible blackout.
- **Blackout button background color** (disabled by default)
  - Shows the background color of the dismiss button as a hex color string (e.g. #FFFFFF). Defaults to unknown if no visible blackout.
- **Blackout button foreground color** (disabled by default)
  - Shows the text color of the dismiss button as a hex color string (e.g. #000000). Defaults to unknown if no visible blackout.
- **Blackout button text** (disabled by default)
  - Shows the label on the dismiss button. Defaults to unknown if no visible blackout.
- **Blackout sound** (disabled by default)
  - Shows the SystemSoundID of the sound played when the blackout was displayed. Defaults to unknown if no visible blackout.

### Binary sensors

- **Charging state**
  - Shows whether the device is connected to a charger.
- **Screensaver state**
  - Shows whether the screensaver is currently active.
- **Blackout state**
  - Shows whether the screen is currently blacked out.
- **Blackout dismissible** (disabled by default)
  - Shows whether the current blackout is dismissible by the user. Defaults to unknown if no visible blackout.

### Switches

- **Disable screensaver**
  - Disables the currently active screensaver.

### Buttons

- **Ping**
  - Sends a ping to the device to verify it is reachable. A logbook entry is
  created when the device responds.
- **Refresh page**
  - Reloads the current page displayed on the device.
- **Go home**
  - Navigates the device to its configured home URL.
- **Go forward**
  - Navigates forward in the browser history.
- **Go back**
  - Navigates backward in the browser history.
- **Print page**
  - Triggers a print of the current page.
- **Clear cache**
  - Clears the browser cache on the device.
- **Clear cookies**
  - Clears all cookies on the device.
- **Dismiss screensaver**
  - Dismisses the currently active screensaver.
- **Clear blackout**
  - Clears the currently active blackout.

## Data updates

This integration fetches data from the device every 15 seconds.

## Troubleshooting

### Can’t set up the device

#### Symptom

When trying to set up the integration, the form shows an error message.

##### Description

This means that Home Assistant can't connect to the Kiosker App.

##### Resolution

1. Make sure that Kiosker is running in the foreground.
2. Make sure that the API is enabled in the settings.
3. Make sure that you have generated an API token.
4. Make sure that the host or IP is correct.
5. If you have enabled IP-filtering, make sure that your host IP is in the whitelist.
6. If you have enabled TLS, make sure that you have installed a valid certificate in the Kiosker App, typically a self-signed certificate.
7. If you have enabled `Verify certificate`, make sure that the certificate is valid and that the root certificate is marked as trusted on the host.

### Device went unavailable

#### Symptom

The device and entities are greyed out.

##### Description

This means that Home Assistant can't connect to the Kiosker App.

##### Resolution

1. Make sure that Kiosker is running in the foreground.
2. Make sure that the API is enabled in the settings.
3. Make sure that you have generated an API token and has not changed it.
4. Make sure that the host or IP is correct and that it has not changed.
5. If you have enabled IP-filtering, make sure that your host IP is in the whitelist.
6. If you have enabled TLS, make sure that you have installed a valid certificate in the Kiosker App, typically a self-signed certificate.
7. If you have enabled `Verify certificate`, make sure that the certificate is valid and that the root certificate is marked as trusted on the host.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
