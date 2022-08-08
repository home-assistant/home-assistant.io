---
title: UniFi Protect
description: Instructions on how to configure the Ubiquiti UniFi Protect integration.
ha_category:
  - Binary Sensor
  - Button
  - Camera
  - Doorbell
  - Hub
  - Light
  - Lock
  - Media Player
  - Media Source
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
  - diagnostics
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

The absolute **minimal** software version is `1.20.0` for UniFi Protect. If you have an older version, you will get errors trying to set up the integration. However, the general advice is the latest 2 minor versions of UniFi Protect and hardware supported by those are supported.

#### About UniFi Early Access

Since UniFi Protect has its own release cycle, you should only upgrade UniFi Protect _after_ the next Home Assistant release to ensure the new version is fully supported. Most importantly, that means **do not use Early Access versions of UniFi Protect if you want your UniFi Protect integration to be stable**. Early Access versions can and will break the UniFi Protect Home Assistant integration unexpectedly. If you desire to use Early Access versions of UniFi Protect, you can disable automatic updates and wait for the next bugfix version of UniFi Protect to come out.

For example, the latest UniFi Protect Early Access version as of `2022.5.4` is UniFi Protect `2.0.0-beta.5` and the latest Early Access version of UniFi Protect is `2.0.0-beta.7`. So that means:

* **do not** upgrade to `2.0.0-beta.7` until `2022.5.5` or `2022.6.0` comes out
* the recommended version of UniFi Protect are any `1.21.x` version or `2.0.0-beta` version before `2.0.0-beta.7`

#### Downgrading UniFi Protect

In the event you accidentally upgrade to an Early Access version of UniFi Protect and it breaks your UniFi Protect Home Assistant integration, you can access your <a href="https://help.ui.com/hc/en-us/articles/204909374#h_01F8G1NSFWE9GWXMT977VQEP8V" target="_blank" rel="noopener">UniFi OS Console via SSH</a> and then do the following:

```bash
# run this command first _only_ if you are on a 1.x firmware of the UDM Pro
# it is not needed for the UDM SE, UNVR, etc.
unifi-os shell

# downgrade UniFi Protect
apt-get update
apt-get install --reinstall --allow-downgrades unifi-protect=2.0.0~beta.5 -y
```

You can replace `2.0.0-beta.5` with whatever version of UniFi Protect you want to downgrade to.

**Note**: if you want to downgrade to another Early Access version, you must have <a href="https://help.ui.com/hc/en-us/articles/115012240067-UniFi-How-to-enable-remote-access" target="_blank" rel="noopener">Remote Access enabled</a> and have the Early Access release channel enabled.

### Local User

You will need a local user created in your UniFi OS Console to log in with. Ubiquiti SSO Cloud Users will **not** work.
It is recommended you use the Administrator or a user with full read/write access to get the most out of the integration,
but it is not required. The entities that are created will automatically adjust based on the permissions of the user you
use has.

1. Login to your _Local Portal_ on your UniFi OS device, and click on _Users_. **Note**: This **must** be done from
    the UniFi OS by accessing it directly by IP address (i.e. _Local Portal_), not via `unifi.ui.com` or within the
    UniFi Protect app.
2. In the upper right corner, click on _Add User_.
3. Fill out the fields for your user. Be sure the role you assign to the user grants them access to at least one or
    more UniFi Protect devices.
4. Click _Add_ in the bottom Right.

![UniFi OS User Creation](/images/integrations/unifiprotect/user.png)

### Camera Streams

The Integration uses the RTSP(S) Streams as the Live Feed source, so this needs to be enabled on each camera to ensure
you can stream your camera in Home Assistant. This may already be enabled by default, but it is recommended to just
check that this is done. To check and enable the feature:

1. Open UniFi Protect and click on _Devices_.
1. Select the camera you want to ensure can stream in UniFi Protect.
1. Click the _Settings_ tab in the top right.
1. Expand the _Advanced_ section at the bottom.
1. Enable a minimum 1 stream out of the 3 available. The Stream with the Highest resolution is the default enabled one.

{% include integrations/config_flow.md %}

## Device Support

All known UniFi Protect devices should be supported. Each UniFi Protect device will get a variety of entities added for
each of the different entity platforms.

<div class='note'>

**Permissions**: The below sections on the features available to your Home Assistant instance assume you have full
write access to each device. If the user you are using has limited access to some devices, you will get fewer entities
and in many cases, get a read-only sensor instead of an editable switch/select/number entity.

</div>

### UniFi Protect Cameras

<div class='note'>

**Smart Detections**: The following cameras have Smart Detections:

* All "AI" series cameras. This includes the AI 360 and the AI Bullet.
* All "G4" series cameras. This includes the G4 Doorbell, G4 Bullet, G4 Pro and G4 Instant.

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
  * **Tamper** - A binary sensor to detect tampering.
* **Device Configuration** - Smart sensors will get configuration controls for the Status Light, enabling/disabling all of the main sensors, selecting the Paired Camera, and changing the Mount Type of the sensor.
* **Button** - A button to clear the tampered state as well as a disabled by default button to restart the device.

#### Tamper Sensor

Once the tamper sensor is triggered, it stays active until manually cleared. A button entity is available to clear the tampered state.

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

* **Button** - A button to trigger the chime manually for each smart chime device. Also, a disabled by default button is added to let you reboot your smart chime device.
* **Device Configuration** - Smart chimes will get a volume slider to adjust the chime's loudness and a sensor for the last time the chime rang.

### NVR

Your main UniFi Protect NVR device also gets a number of diagnostics sensors that can be used for tracking the state of your UniFi Protect system:

* **Disk Health**: Each disk installed in your NVR will have a disk health sensor. These are simple good/bad sensors and the order is not promised to match the order in UniFi OS. Disk model number is provided as a state attribute though to help map sensor to disk.
* **Utilization and Storage Sensors**: Several other sensors are also added for uptime, hardware utilization, and distribution details of the video on disk.

## Media Source

A media source is provided for your UniFi Protect cameras so you can fetch video clips and event thumbnails.

### Media Browser

The media source is split into 5 folders/levels:

1. NVR Console Selector - only appears if you have more then one Protect NVR Console. Allows you to select your NVR Console you want to view events for.
2. Camera Selector - either lets you select all cameras or a specific camera to view events for.
3. Event Selector - either lets you select all events or a specific event type to view events for.
4. Time Selector - filters events for a given time range:
   * Last 24 Hours
   * Last 7 Days
   * Last 30 Days
   * By Month since start of recording - selecting a month lets you either view the whole month or a specific date
5. Event Selector - lets you select the specific event for playback

Since the media browser does not have any pagination or filtering, all of the events must be loaded into memory. As a result, the number of events loaded at once is truncated to 10,000 by default. The number of events will be listed at "10000 (TRUNCATED)" if the event count was truncated. You can raise or lower the limit of the number of events that can be loaded using the Config Entry Options.

### Media Identifiers

Below are the accepted identifiers to resolve media. Since events do not necessarily map to any Home Assistant entity, all IDs are in reference to the UniFi Protect IDs, not Home Assistant ones.

| Identifier Format                | Description                        |
| -------------------------------- | ---------------------------------- |
| `{nvr_id}:event:{event_id}`      | MP4 video clip for specific event. |
| `{nvr_id}:eventthumb:{event_id}` | JPEG thumbnail for specific event. |

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

## Views

The integration provides two proxy views to proxy media content from your Home Assistant instance so you can access thumbnails and video clips from within the context of Home Assistant without having to expose your UniFi Protect NVR Console. As with the media identifiers, all IDs are UniFi Protect IDs as they may not map to specific Home Assistant entities depending on how you have configured your integration.

These URLs work great when trying to send notifications. Home Assistant will automatically sign the URLs and make them safe for external consumption if used in an automation or [notify service](/integrations/notify/).

| View URL                                                     | Description                                        |
| ------------------------------------------------------------ | -------------------------------------------------- |
| `/api/unifiprotect/thumbnail/{nvr_id}/{event_id}`            | Proxies a JPEG event thumbnail from UniFi Protect. |
| `/api/unifiprotect/video/{nvr_id}/{camera_id}/{start}/{end}` | Proxies a MP4 video clip from UniFi Protect for a specific camera. Start and end must be in [ISO 8601 format](https://www.iso.org/iso-8601-date-and-time-format.html). |

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
