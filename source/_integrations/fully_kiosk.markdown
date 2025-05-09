---
title: Fully Kiosk Browser
description: Instructions on how to integrate Fully Kiosk Browser with Home Assistant
ha_category:
  - Binary sensor
  - Camera
  - Notifications
  - Sensor
  - Switch
ha_release: 2022.9
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@cgarwood'
ha_domain: fully_kiosk
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - image
  - media_player
  - notify
  - number
  - sensor
  - switch
ha_integration_type: integration
ha_dhcp: true
ha_quality_scale: bronze
---

[Fully Kiosk Browser](https://www.fully-kiosk.com) is a powerful kiosk browser for Android devices. It provides a number of features for monitoring and controlling your Android device. This integration gives you access to control your device and view the status in Home Assistant.

## Requirements

This integration requires the Fully Remote Admin feature to be enabled in the Fully Kiosk Browser app. This feature requires the paid Fully Plus license. You can test it out for free, but Fully Kiosk Browser will display a watermark on your device.

You will need the IP address of your device, and the Fully Remote Admin password you set in the Fully Kiosk Browser app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of your device.
Password:
  description: The Fully Remote Admin password from the Fully Kiosk Browser app.
Uses an SSL certificate:
  description: Whether Fully Kiosk Browser is configured to use an SSL certificate for connections.
Verify SSL certificate:
  description: Whether to verify the SSL certificate when connecting to Fully Kiosk Browser. This should be off for self-signed certificates.
{% endconfiguration_basic %}

## Capabilities

The following is available as sensors:

- Device plugged in
- Kiosk mode enabled/disabled
- Battery level
- Current page
- Current foreground app
- Device storage space available
- Device RAM available

The following controls are available:

- Bring Fully Kiosk to the foreground
- Send Fully Kiosk to the background
- Load the start URL
- Restart the Fully Kiosk Browser app
- Reboot your device (requires root)
- Maintenance mode on/off
- Lock/unlock kiosk mode
- Motion detection on/off
- Screensaver on/off
- Screensaver timer
- Screensaver brightness
- Screen on/off
- Screen off timer
- Screen brightness
- Play and stop media files
- Set device volume

The following is available as camera entity:

- Camera (the camera only works in Fully Kiosk if the **Motion detection** is set to **On**).

The following is available as image entity:

- Screenshot

The following notify entities that can be passed to `notify.send_message` action are available:

- Text-to-speech
- Overlay message

{% note %}
The Fully Kiosk Browser app does not provide feedback on the device volume or media playback status, so we are unable to display the current volume level or playback status.
{% endnote %}

## Actions

**Action `load_url`**

You can use the `fully_kiosk.load_url` action to have the tablet open the specified URL.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `device_id` | yes | Device ID (or list of device IDs) to load the URL on.
| `url` | yes | The URL to load.

Example:

```yaml
action: fully_kiosk.load_url
data:
  url: "https://home-assistant.io"
target:
  device_id: a674c90eca95eca91f6020415de07713
```

**Action `set_config`**

You can use the `fully_kiosk.set_config` action to change the many configuration parameters of Fully Kiosk Browser.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `device_id` | no | Device ID (or list of device IDs) to load the URL on.
| `key` | no | The configuration parameter key. The list of available keys can be found in the Fully Kiosk Browser remote admin panel by clicking the **Show keys** button.
| `value` | no | The value to set the configuration parameter to.

Example:

```yaml
action: fully_kiosk.set_config
data:
  key: "startURL"
  value: "https://home-assistant.io"
target:
  device_id: a674c90eca95eca91f6020415de07713
```

**Action `start_application`**

You can use the `fully_kiosk.start_application` action to have the tablet launch the specified app.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `device_id` | yes | Device ID (or list of device IDs) to load the URL on.
| `application` | yes | The package name of the app to load.

Example:

```yaml
action: fully_kiosk.start_application
data:
  application: "de.ozerov.fully"
target:
  device_id: a674c90eca95eca91f6020415de07713
```

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
