---
title: UniFi Protect
description: Instructions on how to configure the Ubiquiti UniFi Protect integration.
ha_category:
  - Binary Sensor
  - Button
  - Camera
  - Hub
  - Light
  - Lock
  - Media Player
  - Number
  - Select
  - Sensor
  - Switch
ha_dhcp: true
ha_ssdp: true
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
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The UniFi Protect integration adds support for retrieving Camera feeds and Sensor data from a [UniFi Protect application](https://ui.com/camera-security) by [Ubiquiti Networks, inc.](https://www.ui.com/) that is running on a UniFi OS Console.

## Prerequisites

### Hardware Support

This Integration supports all UniFi OS Consoles that can run UniFi Protect. Currently, this includes:

* Any UniFi Protect Network Video Recorder (**UNVR** or **UNVRPRO**)
* Any UniFi "Dream" device (**UDMPRO**, **UDR**, or **UDMSE**), _except the base UniFi Dream Machine/UDM_
* UniFi Cloud Key Gen2 Plus (**UCKP**) firmware version v2.0.24+

UCKP with Firmware v1.x **do NOT run UniFi OS**, you must upgrade to firmware v2.0.24 or newer.

### Software Support

The absolute **minimal** software version is `1.20.0` for UniFi Protect. If you have an older version, you will get errors trying to set up the integration. However, the general advice is the latest 2 minor versions of UniFi Protect and hardware supported by those are supported. Since UniFi Protect has its own release cycle, you should only upgrade UniFi Protect _after_ the next Home Assistant release comes out to ensure the new version is fully supported.

Example: as of `2022.2.0` of Home Assistant, UniFi Protect `1.21.0` is the newest UniFi Protect version. So the recommended versions of UniFi Protect to run for a `2022.2.0` version of Home Assistant are `1.20.0`, `1.20.1`, `1.20.2`, `1.20.3`, `1.21.0`.

### Local User

You will need a local user created in your UniFi OS Console to log in with. Ubiquiti Cloud Users will **not** work.

1. Login to your *Local Portal* on your UniFi OS device, and click on *Users*
1. In the upper right corner, click on *Add User*
1. Click *Add Admin*, and fill out the form. Specific Fields to pay attention to:
    * Role: Must be *Limited Admin*
    * Account Type: *Local Access Only*
    * CONTROLLER PERMISSIONS - Under UniFi Protect, select Administrators. **NOTE**: Other roles may work, but only the default Administrators role is fully tested.
1. Click *Add* in the bottom Right.

![ADMIN_UNIFIOS](/images/integrations/unifiprotect/unifi_os_admin.png)

### Camera Streams

The Integration uses the RTSP(S) Streams as the Live Feed source, so this needs to be enabled on each camera to ensure you can stream your camera in Home Assistant. This may already be enabled by default, but it is recommended to just check that this is done. To check and enable the feature:

1. Open UniFi Protect and click on *Devices*
1. Select *Manage* in the Menu bar at the top
1. Click on the + sign next to RTSP
1. Enable a minimum 1 stream out of the 3 available. The Stream with the Highest resolution is the default enabled one.

{% include integrations/config_flow.md %}

## Features

All known UniFi Protect devices should be supported. Each UniFi Protect device will get a variety of entities added for each of the different entity platforms.

### UniFi Protect Cameras

<div class='note'>

**Smart Detections**: The following cameras have Smart Detections:

* All "AI" series cameras. This includes the AI 360 and the AI Bullet.
* All "G4" series cameras _except_ the G4 Instant. This includes the G4 Doorbell, G4 Bullet and G4 Pro.

G3 Series cameras do _not_ have Smart detections.

</div>

Each UniFi Protect camera will get a device in Home Assistant with the following:

* **Camera** - A camera for each camera channel and RTSP(S) combination found for each camera (up to 7). Only the highest resolution RTSPS camera entity will be enabled by default.
  * If your camera is a G4 Doorbell Pro, an additional camera entity will be added for the Package Camera. The Package Camera entity will _not_ have streaming capabilities regardless of whether RTSPS is enabled on the channel or not. This is due to the Package Camera having a very low FPS that does not make it compatible with HLS streaming.
* **Media Player** - If your camera has a speaker, you will get a media player entity that allows you to play audio to your camera's speaker. Any audio file URI that is playable by FFmpeg will be able to be played to your speaker, including via the [TTS Say Service](/integrations/tts/#service-say).
* **Privacy Mode** - If your camera allows for Privacy Masks, there will be a configuration switch to toggle a "Privacy Mode" that disables recording, microphone, and a black privacy zone over the whole camera.
* **Sensors** - Sensors include "Is Dark", "Motion Detected", "Detected Object" (if the camera supports smart detections), and "Doorbell Chime" (if the camera has a chime). Several diagnostics sensors are added including sensors on uptime, network connection stats, and storage stats. Doorbells will also have a "Voltage" sensor for troubleshooting electrical issues.
  * The Detected Object sensor will have the values of "none", "person", or "vehicle" based on object UniFi Protect detected.
* **Device Configuration** - Cameras will get various configuration controls based on the features available to the camera. Currently provided configuration controls:
  * configuration sliders for Chime Type, Zoom Level, Microphone Sensitivity, and WDR Level
  * configuration switches Overlay Information, Smart Detections types, Status Light, HDR, High FPS mode, System Sounds.
* **Button** - A disabled by default button is added for each camera device. The button will let you reboot your camera device.

### UniFi Protect Floodlights

Each UniFi Protect floodlight will get a device in Home Assistant with the following:

* **Light** - A light entity will be added for each floodlight device. The light entity will let you control turning on or off your light as well as adjust the brightness of your floodlight.
* **Sensors** - Sensors are provided for data provided from floodlight devices. Sensors include "Is Dark" and "Motion Detected".
* **Device Configuration** - Floodlights will get configuration controls for the PIR Motion Sensitivity, the Auto-shutoff Duration after detected motion, and Status Light switch
* **Button** - A disabled by default button is added for each floodlight device. The button will let you reboot your floodlight device.

### UniFi Protect Smart Sensors

UniFi Protect smart sensors are a bit different than normal sensors. They are a multi-sensor that can act as a contact sensor (door/window), a motion detector, a light level detector, a humidity sensor, a temperature level sensor, an alarm sound sensor, and/or a leak detector. Each sensor function can be enabled or disabled dynamically. Disabled sensors will be marked as "unavailable".

* **Sensors** - A sensor is provided for each major function of the smart sensor device:
  * **Contact** - A contact sensor will be available if the mount type is set as "Door", "Window" or "Garage".
  * **Motion Detection** - A motion detection sensor will be available if the mount type is not set to "Leak" and motion detection is enabled.
  * **Light Level** - A light level sensor will be available if the mount type is not set to "Leak" and the light sensor is enabled.
  * **Humidity** - A humidity sensor will be available if the mount type is not set to "Leak" and the humidity sensor is enabled.
  * **Temperature** - A temperature sensor will be available if the mount type is not set to "Leak" and the temperature sensor is enabled.
  * **Alarm Sound** - An alarm sensor will be available if the mount type is not set to "Leak" and the alarm sound sensor is enabled. The Alarm Sound sensor can have the values "none", "smoke" and "co". More values may be added over time automatically as UniFi Protect adds support for detecting more alarms.
* **Device Configuration** - Smart sensors will get configuration controls for the Status Light, enabling/disabling all of the main sensors, selecting the Paired Camera, and changing the Mount Type of the sensor.
* **Button** - A disabled by default button is added for each smart sensor device. The button will let you reboot your smart sensor device.

### UniFi Protect Viewers

Each UniFi Protect viewer will get a device in Home Assistant with the following:

* **Liveview Select** - A select control will be added for each viewer device that will allow you to select which liveview is being displayed on the viewer.
* **Button** - A disabled by default button is added for each viewer device. The button will let you reboot your viewer device.

### UniFi Protect DoorLock

Each UniFi Protect door lock will get a device in Home Assistant with the following:

* **Lock** - A lock control will be added to lock and unlock your door lock device.
* **Device Configuration** - Door locks will get configuration controls for the Auto-Lock Timeout, selecting the Paired Camera, and Status Light switch
* **Button** - A disabled by default button is added for each door lock device. The button will let you reboot your door lock device.

### UniFi Protect Smart Chime

Each UniFi Protect smart chime will get a device in Home Assistant with the following:

* **Button** - A button to trigger the chime manually for each smart chime device. Also a disabled by default button is added that will let you reboot your smart chime device.
* **Device Configuration** - Smart chimes will get a volume slider to adjust the chime's loudness and a sensor for the last time the chime rang.

### NVR

Your main UniFi Protect NVR device also gets a number of diagnostics sensors that can be used for tracking the state of your UniFi Protect system:

* **Disk Health**: Each disk installed in your NVR will have a disk health sensor. These are simple good/bad sensors and the order is not promised to match the order in UniFi OS. Disk model number is provided as a state attribute though to help map sensor to disk.
* **Utilization and Storage Sensors**: Several other sensors are also added for uptime, hardware utilization, and distribution details of the video on disk.

## Services

### Service unifiprotect.set_default_doorbell_text

Sets the default doorbell message. This will be the message that is automatically selected when a message "expires".

| Service data attribute | Optional | Description                                                                                                  |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `device_id`            | No       | Any device from the UniFi Protect instance you want to change. In case you have multiple Protect instances.  |
| `message`              | No       | The default message for your Doorbell. Must be less than 30 characters.                                      |

### Service unifiprotect.add_doorbell_text

Adds a new custom message for Doorbells.

| Service data attribute | Optional | Description                                                                                                  |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `device_id`            | No       | Any device from the UniFi Protect instance you want to change. In case you have multiple Protect instances.  |
| `message`              | No       | New custom message to add for Doorbells. Must be less than 30 characters.                                    |

### Service unifiprotect.remove_doorbell_text

Removes an existing message for Doorbells.

| Service data attribute | Optional | Description                                                                                                  |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `device_id`            | No       | Any device from the UniFi Protect instance you want to change. In case you have multiple Protect instances.  |
| `message`              | No       | Existing custom message to remove for Doorbells.                                                             |

### Service unifiprotect.set_doorbell_message

Use to dynamically set the message on a Doorbell LCD screen. This service should only be used to set dynamic messages (i.e. setting the current outdoor temperature on your Doorbell). Static messages should still be set using the Select entity and can be added/removed using the `add_doorbell_text`/`remove_doorbell_text` services.

| Service data attribute | Optional | Description                                                                                                  |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `entity_id`            | No       | The Doorbell Text select entity for your Doorbell.                                                           |
| `message`              | No       | The message you would like to display on the LCD screen of your Doorbell. Must be less than 30 characters.   |
| `duration`             | Yes      | Number of minutes to display the message for before returning to the default message. The default is to not expire. |

### Service unifiprotect.set_chime_paired_doorbells

Use to set the paired doorbell(s) with a smart chime.

| Service data attribute | Optional | Description                                                                                                  |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `device_id`            | No       | The device ID of the Chime you want to pair or unpair doorbells to.                                          |
| `doorbells`            | Yes      | A target selector for any number of doorbells you want to pair to the chime. No value means unpair all.      |

## Troubleshooting

### Enabling Debug Logging

Both the UniFi Protect integration and the Python library it uses provide debug logging that can help you with troubleshooting connectivity issues. To enable debug logging for both, add the following to your `configuration.yaml` file:

```yaml
logger:
  logs:
    pyunifiprotect: debug
    homeassistant.components.unifiprotect: debug
```

### Delay in Video Feed

The default settings on the stream integration will give you a 5-15+ second delay. You can reduce this delay to 1-3 seconds, by enabling [LL-HLS in the stream integration](/integrations/stream/#ll-hls). You will also want to put an HTTP/2 reserve proxy in front of Home Assistant so you can have connection pooling. If you do not add a reverse proxy, you may start to get "Waiting for Websocket..." messages while trying to view too many camera streams at once. One way to do this is using the official NGINX Proxy Add-on:

{% my supervisor_addon addon="core_nginx_proxy" badge %}

### Cannot Play Audio to Speakers

Unlike with many other things, playing audio to your speakers requires your Home Assistant to be able to reach your camera directly. Specifically via port `tcp/7004`. You can [enable debug logging](#enabling-debug-logging) and it will output the full FFmpeg command that will be run and the output from FFmpeg to help you troubleshoot why audio is not playing to the device.

### Liveview Options for Viewer Missing Options or Out of Date

Main control selects currently cannot have dynamic options since the options are exported out to voice assistants. After you add/remove/change a Liveview in UniFi Protect, you must restart Home Assistant to get the new options for your Viewer.

### NvrErrors with "404 - Reason: Not Found" or "502 - Reason: Bad Gateway"

If you get errors while authenticating or fetching data for `NvrError... 404 - Reason: Not Found`, there is a good chance that your UniFi Protect application has crashed. UniFi Protect runs in a supervised way on UniFi OS (similar to Home Assistant OS + Home Assistant Core). Getting a 404 for a URL that should not produce a 404 means UniFi Protect is probably not running. You may want to check the health of your disks or look into debugging UniFi Protect to see why it is crashing.

Similarly, a `502 Bad Gateway` also means that your UniFi Protect application may not be running.

```log
pyunifiprotect.NvrError: Fetching Camera List failed: 404 - Reason: Not Found
```
