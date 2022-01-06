---
title: UniFi Protect
description: Instructions on how to configure UniFi Protect integration by Ubiquiti.
ha_category:
  - Hub
  - Binary Sensor
  - Button
  - Camera
  - Light
  - Media Player
  - Number
  - Select
  - Sensor
  - Switch
ha_release: 2022.2
ha_iot_class: Local Push
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@briis'
  - '@AngellusMortis'
  - '@bdraco'
ha_domain: unifiprotect
ha_platforms:
  - binary_sensor
  - button
  - camera
  - light
  - media_player
  - number
  - select
  - sensor
  - switch
---

The UniFi Protect integration, adds support for retrieving Camera feeds and Sensor data from an [UniFi Protect application](https://ui.com/camera-security) by [Ubiquiti Networks, inc.](https://www.ui.com/) that is running on an UniFi OS Console.

## Prerequisites

### Hardware Support

This Integration supports all UniFi OS Consoles that can run UniFi Protect. Currently, this includes:

* UniFi Protect Network Video Recorder (**UNVR**)
* UniFi Protect Network Video Recorder Pro (**UNVRPRO**)
* UniFi Dream Machine Pro (**UDMP**)
* UniFi Cloud Key Gen2 Plus (**CKGP**) firmware version v2.0.24+

CKGP with Firmware v1.x **do NOT run UniFi OS**, you must upgrade to firmware v2.0.24 or newer.

### Software Support

The absolute **minimal** software version is `1.20.0` for UniFi Protect. If you have an older version, you will get errors trying to set up the integration. However, the general advice is the latest 2 minor versions of UniFi Protect and hardware supported by those are supported. Since UniFi Protect has its own release cycle, you should only upgrade UniFi Protect _after_ the next Home Assistant release comes out to ensure the new version is fully supported.

Example: as of `2022.2.0` of Home Assistant, UniFi Protect `1.21.0-beta.2` is the newest UniFi Protect version. So the recommended versions of UniFi Protect to run for a `2022.2.0` version of Home Assistant are `1.20.0`, `1.20.1`, `1.20.2`, `1.20.3`, `1.21.0-beta.1`, or `1.21.0-beta.2`.

### Local User

You will need a local user created in your UniFi OS Console to log in with. Ubiquiti Cloud Users will **not** work.

1. Login to your *Local Portal* on your UniFi OS device, and click on *Users*
1. In the upper right corner, click on *Add User*
1. Click *Add Admin*, and fill out the form. Specific Fields to pay attention to:
    * Role: Must be *Limited Admin*
    * Account Type: *Local Access Only*
    * CONTROLLER PERMISSIONS - Under UniFi Protect, select Administrators. **NOTE**: Other roles may work, but only the default Administrators rule is fully tested.
1. Click *Add* in at the bottom Right.

**HINT**: A few users have reported that they had to restart their UDMP device after creating the local user for it to work. So if you get some kind of *Error 500* when setting up the Integration, try restart the UDMP.

![ADMIN_UNIFIOS](/images/integrations/unifiprotect/unifi_os_admin.png)

### Camera Streams

The Integration uses the RTSP(S) Streams as the Live Feed source, so this needs to be enabled on each camera to ensure you can stream your camera in Home Assistant. This may already be enabled by default, but it is recommended to just check that this is done. To check and enable the feature:

1. Open UniFi Protect and click on *Devices*
1. Select *Manage* in the Menu bar at the top
1. Click on the + sign next to RTSP
1. Enable a minimum 1 stream out of the 3 available. The Stream with the Highest resolution is the default enabled one.

{% include integrations/config_flow.md %}

## Features

All known UniFi Protect devices are should be supported. Each UniFi Protect device will get a variety of entities added for each of the different entity platforms.

### Cameras

#### Smart Detections

A clarification about "Smart Detections" below and which cameras have them. The following cameras have Smart Detections:

* All "AI" series cameras. This includes the AI 360 and the AI Bullet.
* All "G4" series cameras _except_ the G4 Instant. This includes the G4 Doorbell, G4 Bullet and G4 Pro.

G3 Series cameras do _not_ have Smart detections.

#### Entities

Each UniFi Protect camera will get the following entities added:

* **Camera** - A camera entity for each camera channel and RTSP(S) combination found for each camera (up to 6). Only the highest resolution RTSPS camera entity will be enabled by default.
* **Media Player** - If your camera has a speaker, you will get a media player entity that allows you to play audio to your camera's speaker. Any audio file URI that is playable by FFmpeg will be able to be played to your speaker, including via the [TTS Say Service](https://www.home-assistant.io/integrations/tts/#service-say).
* **Number** - The following number entities will be added for each camera:
  * **Chime Duration** - If your camera has a chime (doorbell), a configuration number entity will be added to adjust the chime duration of your doorbell chime.
  * **Zoom Level** - If your camera has optical zoom, a configuration number entity will be added to adjust the zoom level.
  * **Microphone Level** - If your camera has a microphone, a configuration number entity will be added to adjust the camera's microphone sensitivity.
  * **WDR Level** - If your camera does not have HDR, a configuration number entity will be added to adjust the WDR level.
* **Switch** - The following switch entities will be added for each camera:
  * **Overlay (Show Name, Show Date, Show Logo, Show Bitrate)** - 4 configuration switches will be added to configuration the Overlay Information on your camera's video feed.
  * **Smart Detections (Person, Vehicle)** - If your camera has smart detections, there will be a switch added for each smart detection type to enable or disable that type.
  * **Status Light** - If your camera has a status light, there will be a configuration switch to turn it on and off.
  * **HDR Mode** - If your camera has HDR, there will be a configuration switch to turn it on and off.
  * **High FPS** - If your camera has a "High FPS" mode, there will be a configuration switch to toggle between Default and High FPS mode.
  * **Privacy Mode** - If your camera allows for Privacy Masks, there will be a configuration switch to toggle a "Privacy Mode" that disables recording, microphone, and a black privacy zone over the whole camera.
  * **System Sounds** - If your camera has a speaker, there will be a configuration switch to toggle system sounds.
  * **SSH Enabled** - A disabled by default switch entity will be added to let you toggle on and off SSH for your camera. Username is `ubnt` and password is your Device Password as configured in UniFi Protect.
* **Sensors** - Sensors are provided for data provided from the camera device. Sensors include "Is Dark" and "Doorbell Chime" (if camera has a chime). A number of diagnostics sensors are added including sensors on uptime, network connection stats, and storage stats. Doorbells will also have a "Voltage" sensor for troubleshooting electrical issues.
* **Button** - A disabled by default button entity is added for each camera device. The button will let you reboot your camera device.

### Floodlights

Each UniFi Protect floodlight will get the following entities added:

* **Light** - A light entity will be added for each floodlight device. The light entity will let you control turning on or off your light as well as adjust the brightness of your floodlight.
* **Number** - The following number entities will be added for each floodlight:
  * **Motion Sensitivity** - A configuration number entity to adjust the sensitivity of the PIR sensor for your floodlight.
  * **Auto-shutoff Duration** - A configuration number entity to adjust the the auto-shutoff timer after motion is detected.
* **Switch** - The following switch entities will be added for each floodlight:
  * **Status Light** - A configuration switch to turn it on and off to turn on and off the status light for your floodlight.
  * **SSH Enabled** - A disabled by default switch entity will be added to let you toggle on and off SSH for your floodlight. Username is `ubnt` and password is your Device Password as configured in UniFi Protect.
* **Sensors** - Sensors are provided for data provided from floodlight devices. Sensors include "Is Dark" and "Motion Detected".
* **Button** - A disabled by default button entity is added for each floodlight device. The button will let you reboot your floodlight device.

### Sensors

Each UniFi Protect smart sensor will get the following entities added:

* **Sensors** - Sensors are provided for data provided from smart sensor devices. Sensors include "Door", "Motion Detected" and "Battery Low".
* **Button** - A disabled by default button entity is added for each sensor device. The button will let you reboot your sensor device.
* **Switch** - A disabled by default switch entity will be added to let you toggle on and off SSH for your sensor. Username is `ubnt` and password is your Device Password as configured in UniFi Protect.

### Viewports

Each UniFi Protect viewport will get the following entities added:

* **Liveview Select** - A select control will be added for each viewport device that will allow you to select which liveview is being displayed on the viewport.
* **Button** - A disabled by default button entity is added for each viewport device. The button will let you reboot your viewport device.
* **Switch** - A disabled by default switch entity will be added to let you toggle on and off SSH for your viewport. Username is `ubnt` and password is your Device Password as configured in UniFi Protect.

### NVR

Your main UniFi Protect NVR device also gets a number of diagnostics sensors that can be used for tracking the state of your UniFi Protect system:

* **Disk Health**: Each disk installed in your NVR will have a disk health sensor. These are simple good/bad sensors and the order is not promised to match the order in UniFi OS. Disk model number is provided as a state attribute though to help map sensor to disk.
* **Utilization and Storage Sensors**: A number of other sensors are also added for uptime, hardware utilization and distribution details of the video on disk.

## Troubleshooting

### Enabling Debug Logging

Both the UniFi Protect integration and the Python library it uses provide a ton of debug logging that can help you with troubleshooting connectivity issues. To enable debug logging for both, add the following to your `configuration.yaml` file:

```yaml
logger:
  logs:
    pyunifiprotect: debug
    homeassistant.components.unifiprotect: debug
```

### Delay in Video Feed

The default settings on the stream integration will give you a 5-15+ second delay. You can reduce this delay to 1-3 seconds, by enabling [LL-HLS in the stream integration](/integrations/stream/#ll-hls). You will also want to put an HTTP/2 reserve proxy in front of Home Assistant so you can have connection pooling. If you do not add a reverse proxy, you may start to get "Waiting for Websocket..." messages while trying to view too many camera streams at once. One way to do this is using the official NGINX Proxy Add-on:

[![NGINX Proxy Add-on](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_nginx_proxy)

### Cannot Play Audio to Speakers

Unlike with many other things, playing audio to your speakers requires your Home Assistant to be able to reach your camera directly. Specifically via port `tcp/7004`. You can [enable debug logging](#enabling-debug-logging) and it will output the full FFmpeg command that will be run and the output from FFmpeg to help you troubleshoot why audio is not playing to the device.

### Liveview Options for Viewport Missing Options or Out of Date

Main control selects currently cannot have dynamic options since the options are exported out to voice assistants. After you add/remove/change a Liveview in UniFi Protect, you must restart Home Assistant to get the new options for your Viewport.
