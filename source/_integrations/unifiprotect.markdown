---
title: UniFi Protect
description: Instructions on how to configure the Ubiquiti UniFi Protect integration.
ha_category:
  - Binary sensor
  - Button
  - Camera
  - Doorbell
  - Event
  - Hub
  - Light
  - Lock
  - Media player
  - Media source
  - Number
  - Select
  - Sensor
  - Switch
ha_dhcp: true
ha_ssdp: true
ha_release: 2022.2
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: unifiprotect
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - event
  - light
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
  - text
ha_integration_type: hub
ha_codeowners:
  - '@RaHehl'
---

The **UniFi Protect** {% term integration %} adds support for retrieving camera feeds and sensor data from a [UniFi Protect application](https://ui.com/camera-security) by [Ubiquiti Networks, inc.](https://www.ui.com/) that is running on a UniFi OS Console.

## Prerequisites

### Hardware support

This {% term integration %} supports all UniFi OS Consoles that can run UniFi Protect. Currently, this includes:

- Any UniFi Protect Network Video Recorder (**[UNVR](https://store.ui.com/collections/unifi-protect-nvr/products/unvr)** or **[UNVRPRO](https://store.ui.com/collections/unifi-protect-nvr/products/unvr-pro)**)
- Any UniFi "Dream" device (**[UDMPRO](https://store.ui.com/collections/unifi-network-unifi-os-consoles/products/udm-pro)**, **[UDR](https://store.ui.com/collections/unifi-network-unifi-os-consoles/products/dream-router)**, or **[UDMSE](https://store.ui.com/collections/unifi-network-unifi-os-consoles/products/dream-machine-se)**), _except the base UniFi Dream Machine/UDM_
- UniFi Cloud Key Gen2 Plus (**[UCKP](https://store.ui.com/collections/unifi-protect-nvr/products/unifi-cloudkey-plus)**) firmware version v2.0.24+

UCKP with Firmware v1.x **do NOT run UniFi OS**, you must upgrade to firmware [`v2.0.24`](https://community.ui.com/releases/UniFi-Cloud-Key-Firmware-2-0-24/b6684f1e-8542-4660-bc0b-74e0634448e8) or newer.

### Software support

The absolute **minimal** software version is [`v1.20.0`](https://community.ui.com/releases/UniFi-Protect-Application-1-20-0/d43c0905-3fb4-456b-a7ca-73aa830cb011) for UniFi Protect. If you have an older version, you will get errors trying to set up the integration. However, the general advice is the latest 2 minor versions of UniFi Protect and hardware supported by those are supported.

{% important %}
**Early Access and Release Candidate versions are not supported by Home Assistant.**

Using Early Access Release Candidate versions of UniFi Protect or UniFi OS will likely cause your UniFi Protect {% term integration %} to break unexpectedly. If you choose to opt into either the Early Access or the Release Candidate release channel and anything breaks in Home Assistant, you will need to wait until that version goes to the official Stable Release channel before it is expected to work.
{% endimportant %}

### Local user

You will need a local user created in your UniFi OS Console to log in with. Ubiquiti SSO Cloud Users will **not** work.
It is recommended you use the Administrator or a user with full read/write access to get the most out of the integration,
but it is not required. The entities that are created will automatically adjust based on the permissions of the user you
use has.

1. Login to your _Local Portal_ on your UniFi OS device, and click on _Users_.  
**Note**: This **must** be done from the UniFi OS by accessing it directly by IP address (e.g. _192.168.1.1_), not via `unifi.ui.com` or within the UniFi Protect app.
2. Go to **Admins & Users** from the left hand side menu and select the **Admins** tab or go to [IP address]/admins/ (e.g. _192.168.1.1/admins/_).
3. Click on **+** in the top right corner and select **Add Admin**.
4. Select **Restrict to local access only** and enter a new _username_ and _password_.
5. Select **Full Management** for the _Protect_ role. 
6. Click **Add** in the bottom right.

![UniFi OS User Creation](/images/integrations/unifiprotect/user.png)

### Camera streams

The integration uses the RTSP(S) Streams as the Live Feed source, so this needs to be enabled on each camera to ensure
you can stream your camera in Home Assistant. This may already be enabled by default, but it is recommended to just
check that this is done. To check and enable the feature:

1. Open UniFi Protect and click on _Devices_.
2. Select the camera you want to ensure can stream in UniFi Protect.
3. Click the _Settings_ tab in the top right.
4. Expand the _Advanced_ section at the bottom.
5. Enable a minimum 1 stream out of the 3 available. The Stream with the Highest resolution is the default enabled one.

{% include integrations/config_flow.md %}

## Device support

All known UniFi Protect devices should be supported. Each UniFi Protect device will get a variety of entities added for
each of the different {% term entity %} platforms.

{% note %}
**Permissions**: The below sections on the features available to your Home Assistant instance assume you have full
write access to each device. If the user you are using has limited access to some devices, you will get fewer entities
and in many cases, get a read-only sensor instead of an editable switch/select/number {% term entity %}.
{% endnote %}

### UniFi Protect cameras

{% note %}
**Smart Detections**: The following cameras have Smart Detections:

- All "AI" series cameras. This includes the [AI 360](https://store.ui.com/collections/unifi-protect/products/unifi-protect-ai-360) and the [AI Bullet](https://store.ui.com/collections/unifi-protect/products/uvc-ai-bullet).
- All "G4" series cameras. This includes the [G4 Doorbell](https://store.ui.com/collections/unifi-protect/products/uvc-g4-doorbell), [G4 Bullet](https://store.ui.com/collections/unifi-protect/products/uvc-g4-bullet), [G4 Pro](https://store.ui.com/collections/unifi-protect/products/uvc-g4-pro) and [G4 Instant](https://store.ui.com/collections/unifi-protect/products/camera-g4-instant).

G3 Series cameras do _not_ have Smart detections.
{% endnote %}

Each UniFi Protect camera will get a device in Home Assistant with the following:

- **Camera** - A camera for each camera channel and RTSP(S) combination found for each camera (up to 7). Only the highest resolution RTSPS camera {% term entity %} will be enabled by default.
  - If your camera is a G4 Doorbell Pro, an additional camera {% term entity %} will be added for the Package Camera. The Package Camera {% term entity %} will _not_ have streaming capabilities regardless of whether RTSPS is enabled on the channel or not. This is due to the Package Camera having a very low FPS that does not make it compatible with HLS streaming.
- **Media Player** - If your camera has a speaker, you will get a media player {% term entity %} that allows you to play audio to your camera's speaker. Any audio file URI that is playable by FFmpeg will be able to be played to your speaker, including via the [TTS Say action](/integrations/tts/#action-say).
- **Privacy Mode** - If your camera allows for Privacy Masks, there will be a configuration switch to toggle a "Privacy Mode" that disables recording, microphone, and a black privacy zone over the whole camera.
- **Sensors** - Sensors include "Is Dark", "Motion Detected", detected object sensors (if the camera supports smart detections), and "Doorbell Chime" (if the camera has a chime). Several diagnostics sensors are added including sensors on uptime, network connection stats, and storage stats. Doorbells will also have a "Voltage" sensor for troubleshooting electrical issues.
  - There is one detected object sensor per Smart Detection supported by the camera and a combined sensor for if _any_ object is detected.
- **Device Configuration** - Cameras will get various configuration controls based on the features available to the camera. Currently provided configuration controls:
  - configuration sliders for Chime Type, Zoom Level, Microphone Sensitivity, and WDR Level
  - configuration switches Overlay Information, Smart Detections types, Status Light, HDR, High FPS mode, System Sounds
  - configuration text and select for LCD Screen for doorbells to either set custom messages or use predefined messages
- **Button** - A disabled by default button is added for each camera device. The button will let you reboot your camera device.

### UniFi Protect floodlights

Each UniFi Protect floodlight will get a device in Home Assistant with the following:

- **Light** - A light {% term entity %} will be added for each floodlight device. The light {% term entity %} will let you control turning on or off your light as well as adjust the brightness of your floodlight.
- **Sensors** - Sensors are provided for data provided from floodlight devices. Sensors include "Is Dark" and "Motion Detected".
- **Device Configuration** - Floodlights will get configuration controls for the PIR Motion Sensitivity, the Auto-shutoff Duration after detected motion, and Status Light switch
- **Button** - A disabled by default button is added for each floodlight device. The button will let you reboot your floodlight device.

### UniFi Protect smart sensors

UniFi Protect smart sensors are a bit different than normal sensors. They are a multi-sensor that can act as a contact sensor (door/window), a motion detector, a light level detector, a humidity sensor, a temperature level sensor, an alarm sound sensor, and/or a leak detector. Each sensor function can be enabled or disabled dynamically. Disabled sensors will be marked as "unavailable".

- **Sensors** - A sensor is provided for each major function of the smart sensor device:
  - **Contact** - A contact sensor will be available if the mount type is set as "Door", "Window" or "Garage".
  - **Motion Detection** - A motion detection sensor will be available if the mount type is not set to "Leak" and motion detection is enabled.
  - **Light Level** - A light level sensor will be available if the mount type is not set to "Leak" and the light sensor is enabled.
  - **Humidity** - A humidity sensor will be available if the mount type is not set to "Leak" and the humidity sensor is enabled.
  - **Temperature** - A temperature sensor will be available if the mount type is not set to "Leak" and the temperature sensor is enabled.
  - **Alarm Sound** - An alarm sensor will be available if the mount type is not set to "Leak" and the alarm sound sensor is enabled. The Alarm Sound sensor can have the values "none", "smoke" and "co". More values may be added over time automatically as UniFi Protect adds support for detecting more alarms.
  - **Tamper** - A binary sensor to detect tampering.
- **Device Configuration** - Smart sensors will get configuration controls for the Status Light, enabling/disabling all of the main sensors, selecting the Paired Camera, and changing the Mount Type of the sensor.
- **Button** - A button to clear the tampered state as well as a disabled by default button to restart the device.

#### Tamper sensor

Once the tamper sensor is triggered, it stays active until manually cleared. A button {% term entity %} is available to clear the tampered state.

### UniFi Protect viewers

Each UniFi Protect viewer will get a device in Home Assistant with the following:

- **Liveview Select** - A select control will be added for each viewer device that will allow you to select which liveview is being displayed on the viewer.
- **Button** - A disabled by default button is added for each viewer device. The button will let you reboot your viewer device.

### UniFi Protect DoorLock

Each UniFi Protect door lock will get a device in Home Assistant with the following:

- **Lock** - A lock control will be added to lock and unlock your door lock device.
- **Device Configuration** - Door locks will get configuration controls for the Auto-Lock Timeout, selecting the Paired Camera, and Status Light switch
- **Button** - A disabled by default button is added for each door lock device. The button will let you reboot your door lock device.

### UniFi Protect Smart Chime

Each UniFi Protect smart chime will get a device in Home Assistant with the following:

- **Button** - A button to trigger the chime manually for each smart chime device. Also, a disabled by default button is added to let you reboot your smart chime device.
- **Device Configuration** - Smart chimes will get a volume slider to adjust the chime's loudness and a sensor for the last time the chime rang.

### NVR

Your main UniFi Protect NVR device also gets a number of diagnostics sensors that can be used for tracking the state of your UniFi Protect system:

- **Disk Health**: Each disk installed in your NVR will have a disk health sensor. These are simple good/bad sensors and the order is not promised to match the order in UniFi OS. Disk model number is provided as a state attribute though to help map sensor to disk.
- **Utilization and Storage Sensors**: Several other sensors are also added for uptime, hardware utilization, and distribution details of the video on disk.

## Media source

A media source is provided for your UniFi Protect cameras so you can fetch video clips and event thumbnails.

### Media browser

The media source is split into 5 folders/levels:

1. NVR Console Selector - only appears if you have more then one Protect NVR Console. Allows you to select your NVR Console you want to view events for.
2. Camera Selector - either lets you select all cameras or a specific camera to view events for.
3. Event Selector - either lets you select all events or a specific event type to view events for.
4. Time Selector - filters events for a given time range:
   - Last 24 Hours
   - Last 7 Days
   - Last 30 Days
   - By Month since start of recording - selecting a month lets you either view the whole month or a specific date
5. Event Selector - lets you select the specific event for playback

Since the media browser does not have any pagination or filtering, all of the events must be loaded into memory. As a result, the number of events loaded at once is truncated to 10,000 by default. The number of events will be listed at "10000 (TRUNCATED)" if the event count was truncated. You can raise or lower the limit of the number of events that can be loaded using the Config Entry Options.

### Media identifiers

Below are the accepted identifiers to resolve media. Since events do not necessarily map to any Home Assistant {% term entity %}, all IDs are in reference to the UniFi Protect IDs, not Home Assistant ones.

| Identifier Format                | Description                        |
| -------------------------------- | ---------------------------------- |
| `{nvr_id}:event:{event_id}`      | MP4 video clip for specific event. |
| `{nvr_id}:eventthumb:{event_id}` | JPEG thumbnail for specific event. |

## Actions

### Action unifiprotect.add_doorbell_text

Adds a new custom message for Doorbells.

| Data attribute | Optional | Description                                                                                                 |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `device_id`            | No       | Any device from the UniFi Protect instance you want to change. In case you have multiple Protect instances. |
| `message`              | No       | New custom message to add for Doorbells. Must be less than 30 characters.                                   |

### Action unifiprotect.remove_doorbell_text

Removes an existing message for Doorbells.

| Data attribute | Optional | Description                                                                                                 |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `device_id`            | No       | Any device from the UniFi Protect instance you want to change. In case you have multiple Protect instances. |
| `message`              | No       | Existing custom message to remove for Doorbells.                                                            |

### Action unifiprotect.set_chime_paired_doorbells

Use to set the paired doorbell(s) with a smart chime.

| Data attribute | Optional | Description                                                                                             |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `device_id`            | No       | The device ID of the Chime you want to pair or unpair doorbells to.                                     |
| `doorbells`            | Yes      | A target selector for any number of doorbells you want to pair to the chime. No value means unpair all. |

### Action unifiprotect.remove_privacy_zone

Use to remove a privacy zone from a camera.

| Data attribute | Optional | Description                                                                                             |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `device_id`            | No       | Camera you want to remove privacy zone from.                                                            |
| `name`                 | No       | The name of the zone to remove.                                                                         |

### Action unifiprotect.get_user_keyring_info

| Data attribute | Optional | Description                                                                                                 |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `device_id`    | No       | Any device from the UniFi Protect instance you want to retrieve keyring information for.                    |

#### Example Usage

```yaml
service: unifiprotect.get_user_keyring_info
data:
  device_id: your_device_id_here
```

The response will include a list of users with their full names, statuses, and associated keys (fingerprint or NFC).

#### Example Response

```yaml
users:
  - full_name: User One
    user_status: ACTIVE
    ulp_id: d23e27e0-a32a-41e5-9424-be646330c2d5
    keys: []
  - full_name: User Two
    user_status: ACTIVE
    ulp_id: a243ffdb-3ab2-4186-b2fe-0b53ccb29f24
    keys:
      - key_type: nfc
        nfc_id: ABCDEF12
      - key_type: fingerprint
        fingerprint_id: "1"
```

## Views

The {% term integrations %} provides four proxy views to proxy media content from your Home Assistant instance so you can access thumbnails and video clips from within the context of Home Assistant without having to expose your UniFi Protect NVR Console. As with the media identifiers, all IDs are UniFi Protect IDs as they may not map to specific Home Assistant entities depending on how you have configured your {% term integrations %}.

These URLs work great when trying to send notifications. Home Assistant will automatically sign the URLs and make them safe for external consumption if used in an {% term automation %} or [notify action](/integrations/notify/).

Four URLs for proxy API endpoints:

`/api/unifiprotect/thumbnail/{nvr_id}/{event_id}`

- Proxies a JPEG event thumbnail from UniFi Protect.

`/api/unifiprotect/video/{nvr_id}/{event_id}`

- Proxies a MP4 video clip from UniFi Protect for a specific event. To get the video, the event needs to be finished. If it's still ongoing, use the camera endpoint defined below.

`/api/unifiprotect/snapshot/{nvr_id}/{camera_id}/{timestamp}`

- Proxies a JPEG from UniFi Protect for a specific camera at the specified timestamp. timestamp must be in [ISO 8601 format](https://www.iso.org/iso-8601-date-and-time-format.html).

`/api/unifiprotect/video/{nvr_id}/{camera_id}/{start}/{end}`

- Proxies a MP4 video clip from UniFi Protect for a specific camera. Start and end must be in [ISO 8601 format](https://www.iso.org/iso-8601-date-and-time-format.html).

`nvr_id` can either be the UniFi Protect ID of your NVR or the config entry ID for your UniFi Protect {% term integrations %}. `camera_id` can either be the UniFi Protect ID of your camera or an entity ID of any {% term entity %} provided by the UniFi Protect {% term integrations %} that can be reversed to a UniFi Protect camera (i.e., an entity ID of a detected object sensor).

The easiest way to find the `nvr_id`, `camera_id`, `start`, and `end` times is by viewing one of the videos from UniFi Protect in the Media browser. If you open the video in a new browser tab, you will see all these values in the URL. The `start` time is close to the last_changed timestamp of the event when the sensor started detecting motion. The `end` time is close to the last_changed timestamp of the event when the sensor stopped detecting motion. Similarly, to see the `event_id` of the image, go to {% my developer_states title="**Developer Tools** > **States**" %} and find the event when the sensor started detecting motion.

### Example Notification Automation with Video

```yaml
alias: "Security: Camera Motion Notification"
description: "Sends a notification with video upon motion detection."
triggers:
  - entity_id:
      - binary_sensor.g5_bullet_motion # Replace with your camera entity
    trigger: state
    from: "on"
    to: "off"
actions:
  - data:
      message: "Motion detected at Camera XXX"
      data:
        image: >-
          {% raw %}/api/unifiprotect/thumbnail/{{ config_entry_id(trigger.entity_id) }}/{{ trigger.from_state.attributes.event_id }}{% endraw %}
        video: >-
          {% raw %}/api/unifiprotect/video/{{ config_entry_id(trigger.entity_id) }}/{{ trigger.from_state.attributes.event_id }}{% endraw %}
    action: notify.mobile_app_your_device # Replace with your notification target
mode: single
max_exceeded: silent
```

Waiting for the motion sensor to change from `on` to `off` before sending the notification is essential. Waiting ensures that the event has ended and the video is accessible; otherwise, you may get an error instead of the video link.

## Event Entities Support

The UniFi Protect integration provides support for various event types triggered by connected devices. Below are the descriptions for each supported event type:

### Doorbell Ring Event

- **Event Name**: Doorbell
- **Event Attributes**:
  - **event_type**: `doorbell`
  - **event_id**: A unique ID that identifies the doorbell event.
- **Description**: This event is triggered when someone rings the doorbell. It provides an `event_id`, which can be used to fetch related media, such as a thumbnail of the event. For instance, you can use `event.g4_doorbell_pro_doorbell` to get the thumbnail image when a ring occurs.

#### Example G4 Doorbell Ring Triggered Automation

```yaml
alias: G4 Doorbell Ring Triggered Automation
description: Automation that triggers when the G4 Doorbell Pro rings
triggers:
  - event_type: state_changed
    event_data:
      entity_id: event.g4_doorbell_pro_poe_doorbell # Replace with your doorbell entity
    trigger: event
conditions:
  - condition: template
    value_template: |
      {% raw %}{{ 'ring' in trigger.event.data.new_state.attributes.event_types }}{% endraw %}
actions:
  - data:
      message: Someone is at the door!
      title: Doorbell Notification
    action: notify.mobile_app_your_device # Replace with your notification target
```

The condition is required to prevent the notification from being triggered by events of type 'unknown', for example, during a restart.

### NFC Card Scanned Event

- **Event Name**: NFC
- **Event Attributes**:
  - **event_type**: `scanned`
  - **event_id**: A unique ID that identifies the NFC card scan event.
  - **nfc_id**: The ID of the scanned NFC card.
- **Description**: This event is triggered when an NFC card is scanned at a compatible device (e.g., a smart doorbell). It contains information such as the `nfc_id` of the scanned card.

#### Example G4 Doorbell NFC Scanned Automation

```yaml
alias: G4 Doorbell NFC Scanned Automation
description: >-
  Automation that triggers when a specific NFC card is scanned on the G4
  Doorbell Pro
triggers:
  - event_type: state_changed
    event_data:
      entity_id: event.g4_doorbell_pro_poe_nfc  # Replace with your doorbell entity
    trigger: event
conditions:
  - condition: template
    value_template: >
      {% raw %}{{ 
         not trigger.event.data.old_state.attributes.get('restored', false) and
         not trigger.event.data.old_state.state == 'unavailable' and
         trigger.event.data.new_state is not none and
         trigger.event.data.new_state.attributes.event_type == 'scanned' and
         trigger.event.data.new_state.attributes.nfc_id in ['ABCDEF1234', 'OTHER_ALLOWED_ID']
       }}{% endraw %}
actions:
  - data:
      message: >-
        {% raw %}The NFC card with ID {{ trigger.event.data.new_state.attributes.nfc_id }} has been scanned at the doorbell.{% endraw %}
      title: NFC Scan Notification
    action: notify.mobile_app_your_device # Replace with your notification target
```

You can obtain the `nfc_id` using the [Action unifiprotect.get_user_keyring_info](#action-unifiprotectget_user_keyring_info).

**Warning:**

When processing NFC scans, always validate the scanned ID. Unknown NFC cards also trigger the scan event. Additionally, this event was developed using third-party cards, as the developer did not have access to official UniFi cards at the time. With third-party cards, the scan relies on the card's serial number. While this approach is not uncommon, it is essential to note that the card's serial number is generally not considered a secure identifier and can be duplicated relatively easily. When the device becomes unavailable and becomes available again in Home Assistant, repeated event processing can occur. The state change is not an issue with the integration but should be considered, mainly if the device is used for actions such as unlocking doors.

### Fingerprint Identified Event

- **Event Name**: Fingerprint
- **Event Attributes**:
  - **event_type**: Either `identified` or `not_identified`
  - **event_id**: A unique ID that identifies the fingerprint event.
  - **ulp_id**: The ID used to identify the person. If no fingerprint match is found, the `ulp_id` will be empty and the `event_type` will be `not_identified`.
- **Description**: This event is triggered when a fingerprint is scanned by a compatible device. If the fingerprint is recognized, it provides a `ulp_id`, which represents the internal user ID. If the fingerprint is not recognized, the `event_type` will be set to `not_identified`, and no `ulp_id` will be provided.

You can obtain the `ulp_id` using the [Action unifiprotect.get_user_keyring_info](#action-unifiprotectget_user_keyring_info).

#### Example G4 Doorbell Fingerprint Identified Automation

```yaml
alias: G4 Doorbell Fingerprint Identified Automation
description: Automation that triggers when a fingerprint is successfully identified on the G4 Doorbell Pro
trigger:
  - platform: event
    event_type: state_changed
    event_data:
      entity_id: event.g4_doorbell_pro_poe_fingerprint # Replace with your doorbell entity
condition:
  - condition: template
    value_template: >
      {% raw %}{{ 
         not trigger.event.data.old_state.attributes.get('restored', false) and
         not trigger.event.data.old_state.state == 'unavailable' and
         trigger.event.data.new_state is not none and
         trigger.event.data.new_state.attributes.event_type == 'identified' and
         (trigger.event.data.new_state.attributes.ulp_id|default('')) != '' and
         trigger.event.data.new_state.attributes.ulp_id in ['ALLOWED_ID1', 'ALLOWED_ID2']
       }}{% endraw %}
action:
  - service: notify.mobile_app_your_device # Replace with your notification target
    data:
      {% raw %}message: "Fingerprint identified with ID: {{ trigger.event.data.new_state.attributes.ulp_id }}"{% endraw %}
      title: "Fingerprint Scan Notification"
```

**Warning:**

Similar to NFC, an event is triggered when a fingerprint is recognized and not recognized. However, unlike NFC, at the time of implementation, no fingerprint ID is included in the event if the fingerprint is unknown. When the device becomes unavailable and becomes available again in Home Assistant, repeated event processing can occur. The state change is not an issue with the integration but should be considered, mainly if the device is used for actions such as unlocking doors.

#### Example G4 Doorbell Fingerprint Identified Automation

```yaml
alias: G4 Doorbell Fingerprint Identified Automation
description: Automation that triggers when a fingerprint is successfully identified on the G4 Doorbell Pro
trigger:
  - platform: event
    event_type: state_changed
    event_data:
      entity_id: event.g4_doorbell_pro_poe_fingerprint # Replace with your doorbell entity
condition:
  - condition: template
    value_template: >
      {% raw %}{{ 
         trigger.event.data.new_state is not none and
         trigger.event.data.new_state.attributes.event_type == 'identified' and
         (trigger.event.data.new_state.attributes.ulp_id|default('')) != '' and
         trigger.event.data.new_state.attributes.ulp_id in ['ALLOWED_ID1', 'ALLOWED_ID2']
       }}{% endraw %}
action:
  - service: notify.mobile_app_your_device # Replace with your notification target
    data:
      {% raw %}message: "Fingerprint identified with ID: {{ trigger.event.data.new_state.attributes.ulp_id }}"{% endraw %}
      title: "Fingerprint Scan Notification"
```

**Warning:**

Similar to NFC, an event is triggered when a fingerprint is recognized and not recognized. However, unlike NFC, at the time of implementation, no fingerprint ID is included in the event if the fingerprint is unknown.

## Troubleshooting

### Delay in video feed

The default settings on the stream integration will give you a 5-15+ second delay. You can reduce this delay to 1-3 seconds, by enabling [LL-HLS in the stream integration](/integrations/stream/#ll-hls). You will also want to put an HTTP/2 reverse proxy in front of Home Assistant so you can have connection pooling. If you do not add a reverse proxy, you may start to get "Waiting for WebSocket..." messages while trying to view too many camera streams at once. One way to do this is using the official NGINX Proxy Add-on:

{% my supervisor_addon addon="core_nginx_proxy" badge %}

### Cannot play audio to speakers

Unlike with many other things, playing audio to your speakers requires your Home Assistant to be able to reach your camera directly. Specifically via port `tcp/7004`. You can [enable debug logging](/docs/configuration/troubleshooting/#enabling-debug-logging) and it will output the full FFmpeg command that will be run and the output from FFmpeg to help you troubleshoot why audio is not playing to the device.

### Liveview options for viewer missing options or out of date

Main control selects currently cannot have dynamic options since the options are exported out to voice assistants. After you add/remove/change a Liveview in UniFi Protect, you must restart Home Assistant to get the new options for your Viewer.

### NvrErrors with "404 - Reason: Not Found" or "502 - Reason: Bad Gateway"

If you get errors while authenticating or fetching data for `NvrError... 404 - Reason: Not Found`, there is a good chance that your UniFi Protect application has crashed. UniFi Protect runs in a supervised way on UniFi OS (similar to Home Assistant OS + Home Assistant Core). Getting a 404 for a URL that should not produce a 404 means UniFi Protect is probably not running. You may want to check the health of your disks or look into debugging UniFi Protect to see why it is crashing.

Similarly, a `502 Bad Gateway` also means that your UniFi Protect application may not be running.

```log
uiprotect.NvrError: Fetching Camera List failed: 404 - Reason: Not Found
```
