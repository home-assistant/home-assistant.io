---
title: UniFi Protect
description: Instructions on how to configure the Ubiquiti UniFi Protect integration.
ha_category:
  - Alarm
  - Binary sensor
  - Button
  - Camera
  - Doorbell
  - Event
  - Hub
  - Light
  - Media player
  - Media source
  - Number
  - Select
  - Sensor
  - Siren
  - Switch
ha_release: 2022.2
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: unifiprotect
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - camera
  - diagnostics
  - event
  - light
  - media_player
  - number
  - select
  - sensor
  - siren
  - switch
  - text
ha_integration_type: hub
ha_codeowners:
  - '@RaHehl'
ha_quality_scale: platinum
---

The **UniFi Protect** {% term integration %} adds support for retrieving camera feeds and sensor data from a [UniFi Protect application](https://ui.com/camera-security) by [Ubiquiti Networks, inc.](https://www.ui.com/) that is running on a UniFi OS Console.

## Prerequisites

### Hardware support

This {% term integration %} supports all UniFi OS Consoles that can run UniFi Protect.

### Software support

The minimum supported software version for UniFi Protect is `v6.0.0`. If you have an older version, you will get errors trying to set up the integration.

### Public API features

Some entities depend on features that were added to the UniFi Protect public API in a specific version. If your UniFi Protect version is older than the version that introduced a given feature, the corresponding entity will not be available. You can look up which features were introduced in which version on the [UniFi Protect developer portal](https://developer.ui.com/protect/).

### No EA support
{% important %}
**Early Access and Release Candidate versions are not supported by Home Assistant.**

Using Early Access Release Candidate versions of UniFi Protect or UniFi OS will likely cause your UniFi Protect {% term integration %} to break unexpectedly. If you choose to opt into either the Early Access or the Release Candidate release channel and anything breaks in Home Assistant, you will need to wait until that version goes to the official Stable Release channel before it is expected to work.

It is OK to open Early Access (EA) issues—it's actually encouraged as an early warning that something might soon break. However, it is very important to understand:
This does not mean that everything reported from EA channels will be fixed immediately. Please, before opening a new issue, check thoroughly if there is already an open or closed issue or pull request regarding your problem.
Also, make sure your report is reproducible and provides all necessary context: always include the Protect version, and if your issue concerns specific cameras, please mention the model(s) as well. Whenever possible, also provide relevant excerpts from the error log.
{% endimportant %}

### Local user

You will need a local user created in your UniFi OS Console to log in with. Ubiquiti SSO Cloud Users will **not** work.
It is recommended you use the Administrator or a user with full read/write access to get the most out of the integration,
but it is not required. The entities that are created will automatically adjust based on the permissions of the user you
use has.

1. Log in to your _Local Portal_ on your UniFi OS device, and click on _Users_.  
**Note**: This **must** be done from the UniFi OS by accessing it directly by IP address (for example _192.168.1.1_), not via `unifi.ui.com` or within the UniFi Protect app.
2. Go to **Admins & Users** from the left hand side menu and select the **Admins** tab or go to [IP address]/admins/ (for example _192.168.1.1/admins/_).
3. Click on **+** in the top right corner and select **Add Admin**.
4. Select **Restrict to local access only** and enter a new _username_ and _password_.
5. Select **Full Management** for the _Protect_ role.
6. Click **Add** in the bottom right.

![UniFi OS User Creation](/images/integrations/unifiprotect/user.png)

In addition to the username and password, you now need to create an API key for Home Assistant.

1. Log in to your _Local Portal_ on your UniFi OS device with an administrator account.
2. Go to **Settings** > **Control Plane** > **Integrations** or go to [IP address]/network/default/integrations/ (for example _192.168.1.1/network/default/integrations/_).
3. Enter a new name for the API key, like "Home Assistant".
4. Select **Create API Key** and copy the generated key.
5. Use this API key together with your username and password when setting up the UniFi Protect integration in Home Assistant.

{% tip %}
Currently, creating an API key requires you to be logged in as an administrator.
{% endtip %}

### Camera streams

Live camera feeds use the <abbr title="real-time streaming protocol secure">RTSPS</abbr> streams provided by the UniFi Protect public API. Home Assistant reads the streams that are active on each camera and uses the highest-quality one as the default live feed.

If a camera does not have a stream available yet, Home Assistant creates a repair that can enable one for you in a single step. Until a stream is available, the live feed falls back to repeatedly refreshing camera snapshots, which can put extra load on your UniFi Protect console.

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

- **Camera** - A camera {% term entity %} for each active RTSPS quality (up to four: high, medium, low, and package). Only the highest-quality stream is enabled by default.
  - If your camera is a G4 Doorbell Pro, an additional camera {% term entity %} is added for the package camera. The package camera has a very low frame rate, so its live feed can be choppy, but it works the same way as the other streams.
- **Media Player** - If your camera has a speaker, you will get a media player {% term entity %} that allows you to play audio to your camera's speaker. Any audio file URI that is playable by FFmpeg will be able to be played to your speaker, including via the [TTS Say action](/integrations/tts/#action-say).
- **Privacy Mode** - If your camera allows for Privacy Masks, there will be a configuration switch to toggle a "Privacy Mode" that disables recording, microphone, and a black privacy zone over the whole camera.
- **Sensors** - Sensors include "Is Dark", "Motion Detected", detected object sensors (if the camera supports smart detections), and "Doorbell Chime" (if the camera has a chime). Several diagnostics sensors are added including sensors on uptime, network connection stats, and storage stats. Doorbells will also have a "Voltage" sensor for troubleshooting electrical issues.
  - There is one detected object sensor per Smart Detection supported by the camera and a combined sensor for if _any_ object is detected. Package detection is the exception: it is exposed as an event {% term entity %} (see **Events**) rather than a binary sensor.
- **Events** - Cameras with Smart Detections expose event {% term entity %} entities for momentary detections. Package detection is provided as an event entity (`event.*_package`) rather than a binary sensor, because UniFi Protect reports it as a single, already-ended detection that a sustained binary sensor cannot represent.
- **Device Configuration** - Cameras will get various configuration controls based on the features available to the camera. Currently provided configuration controls:
  - configuration sliders for Chime Type, Zoom Level, Microphone Sensitivity, and WDR Level
  - configuration switches Overlay Information, Smart Detections types, Status Light, HDR, High FPS mode, System Sounds
  - configuration text and select for LCD Screen for doorbells to either set custom messages or use predefined messages
- **Button** - A disabled by default button is added for each camera device. The button will let you reboot your camera device.

#### PTZ cameras

If your camera supports <abbr title="pan, tilt, and zoom">PTZ</abbr>, the following additional entities and functionality are available:

- **PTZ patrol** - A select entity that lets you start or stop patrols that are configured in UniFi Protect. The state reflects the currently active patrol. Select **Stopped** to stop the current patrol.
- **PTZ presets** - Use the [PTZ go to preset action](#action-ptz-go-to-preset) (`unifiprotect.ptz_goto_preset`) to move your PTZ camera to a saved preset position, including the home position. Presets must be configured in the UniFi Protect app first.

### UniFi Protect floodlights

Each UniFi Protect floodlight will get a device in Home Assistant with the following:

- **Light** - A light {% term entity %} will be added for each floodlight device. The light {% term entity %} will let you control turning on or off your light as well as adjust the brightness of your floodlight.
- **Sensors** - Sensors are provided for data provided from floodlight devices. Sensors include "Is Dark" and "Motion Detected".
- **Device Configuration** - Floodlights will get configuration controls for the PIR Motion Sensitivity, the Auto-shutoff Duration after detected motion, and Status Light switch
- **Button** - A disabled by default button is added for each floodlight device. The button will let you reboot your floodlight device.

### UniFi Protect smart sensors

UniFi Protect smart sensors are a bit different than normal sensors. They are a multi-sensor that can act as a contact sensor (door/window), a motion detector, a light level detector, a humidity sensor, a temperature level sensor, an alarm sound sensor, and/or a leak detector. Each sensor function can be enabled or disabled dynamically. Disabled sensors will be marked as "unavailable".

On UniFi Protect versions newer than 7.1, UniFi Protect reports each sensor's capabilities, and entities are only created for the functions the device actually supports. This enables proper support for newer sensor models: for example, an entry sensor (USL Entry) gets contact and tamper entities, an environmental sensor (USL Environmental) gets temperature, humidity, light level, and leak entities, and a glass break sensor (USL GlassBreak) gets motion and tamper entities. On older versions, an entity is created for every function, matching the behavior of the original UniFi Protect Smart Sensor (UP Sense).

- **Sensors** - A sensor is provided for each major function of the smart sensor device:
  - **Contact** - A contact sensor will be available if the mount type is set as "Door", "Window" or "Garage".
  - **Motion Detection** - A motion detection sensor will be available if the mount type is not set to "Leak" and motion detection is enabled.
  - **Light Level** - A light level sensor will be available if the mount type is not set to "Leak" and the light sensor is enabled.
  - **Humidity** - A humidity sensor will be available if the mount type is not set to "Leak" and the humidity sensor is enabled.
  - **Temperature** - A temperature sensor will be available if the mount type is not set to "Leak" and the temperature sensor is enabled.
  - **Alarm Sound** - An alarm sensor will be available if the mount type is not set to "Leak" and the alarm sound sensor is enabled. The Alarm Sound sensor can have the values "none", "smoke" and "co". More values may be added over time automatically as UniFi Protect adds support for detecting more alarms.
  - **Leak** - A moisture sensor will be available if the mount type is set to "Leak", or (on UniFi Protect versions newer than 7.1) if the sensor supports water leak detection and leak detection is enabled.
  - **Tamper** - A binary sensor to detect tampering.
- **Device Configuration** - Smart sensors will get configuration controls for the Status Light, enabling/disabling all of the main sensors, selecting the Paired Camera, and changing the Mount Type of the sensor.
- **Button** - A button to clear the tampered state as well as a disabled by default button to restart the device.

#### Tamper sensor

Once the tamper sensor is triggered, it stays active until manually cleared. A button {% term entity %} is available to clear the tampered state.

### UniFi Protect viewers

Each UniFi Protect viewer will get a device in Home Assistant with the following:

- **Liveview Select** - A select control will be added for each viewer device that will allow you to select which liveview is being displayed on the viewer.
- **Button** - A disabled by default button is added for each viewer device. The button will let you reboot your viewer device.

### UniFi Protect Smart Chime

Each UniFi Protect smart chime will get a device in Home Assistant with the following:

- **Button** - A button to trigger the chime manually for each smart chime device. Also, a disabled by default button is added to let you reboot your smart chime device.
- **Device Configuration** - Smart chimes will get a volume slider to adjust the chime's loudness and a sensor for the last time the chime rang.

### UniFi Protect relays

Each UniFi Protect relay is added as a separate device in Home Assistant, linked to the <abbr title="Network Video Recorder">NVR</abbr>. This requires UniFi Protect 7.1 or later. See [Public API features](#public-api-features).

- **Switch**: A switch entity is added for each relay output channel to turn the output on or off.

{% note %}
Relay input channels are not yet supported.
{% endnote %}

### UniFi Protect sirens

Each UniFi Protect siren is added as a separate device in Home Assistant, linked to the NVR. This requires UniFi Protect 7.1 or later. See [Public API features](#public-api-features).

- **Siren**: A siren entity to trigger and stop the siren. You can also set the volume level and the duration before triggering. The default duration is 5 seconds. Running the siren indefinitely is not supported.

### UniFi Protect key fobs

Each UniFi Protect key fob (USL-FOB) is added as a separate device in Home Assistant, linked to the NVR. This requires UniFi Protect 7.1 or later. See [Public API features](#public-api-features).

- **Button**: An event entity that fires when a button on the fob is pressed. The pressed button is reported as the event type. See [Key Fob Button Event](#key-fob-button-event).
- **Battery**: A diagnostic sensor with the remaining battery percentage.
- **Battery low**: A diagnostic binary sensor that turns on when the fob reports a low battery.
- **Signal strength**: A diagnostic sensor with the fob's signal strength in dBm. Disabled by default.
- **Status**: A diagnostic sensor reporting the fob's presence as _Online_, _Recently seen_, _No recent heartbeat_, or _Device lost_.

{% note %}
A key fob that is paired after Home Assistant has already started is not picked up until the integration is reloaded.
{% endnote %}

### NVR

Your main UniFi Protect <abbr title="Network Video Recorder">NVR</abbr> device also gets several entities that can be used for tracking and controlling your UniFi Protect system:

- **Alarm Manager**: An alarm control panel entity to arm and disarm the NVR Alarm Manager. It arms using the currently selected alarm profile and always reports the generic _armed away_ state. The name of the active profile is shown by the **Alarm profile** entity instead. This requires UniFi Protect 7.1 or later. See [Public API features](#public-api-features).
- **Alarm profile**: A select entity that lets you switch between the alarm profiles configured in UniFi Protect. The state reflects the currently active alarm profile. You can only change the profile while the alarm is disarmed. To switch profiles while armed, disarm first, select the new profile, and arm again. This requires UniFi Protect 7.1 or later. See [Public API features](#public-api-features).
- **Disk Health**: Each disk installed in your <abbr title="Network Video Recorder">NVR</abbr> will have a disk health sensor. These are simple good/bad sensors, and the order is not promised to match the order in UniFi OS. The disk model number is provided as a state attribute to help map the sensor to the disk.
- **Utilization and Storage Sensors**: Several other sensors are also added for uptime, hardware utilization, and distribution details of the video on disk.

{% important %}
The **Alarm Manager** and **Alarm profile** entities are only available when the UniFi Protect Alarm Manager is set to _Local_ mode. While it is in _Global_ mode, these entities do not appear, because arm profiles are currently not exposed by the public API in that mode.

UniFi Protect automatically switches the Alarm Manager to _Global_ mode when you adopt sensors, relays, fobs, or an Alarm Hub, so the alarm entities are currently unavailable if you use any of those devices.
{% endimportant %}

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

{% include integrations/actions.md %}

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

`nvr_id` can either be the UniFi Protect ID of your NVR or the config entry ID for your UniFi Protect {% term integrations %}. `camera_id` can either be the UniFi Protect ID of your camera or an entity ID of any {% term entity %} provided by the UniFi Protect {% term integrations %} that can be reversed to a UniFi Protect camera (for example, an entity ID of a detected object sensor).

The easiest way to find the `nvr_id`, `camera_id`, `start`, and `end` times is by viewing one of the videos from UniFi Protect in the Media browser. If you open the video in a new browser tab, you will see all these values in the URL. The `start` time is close to the last_changed timestamp of the event when the sensor started detecting motion. The `end` time is close to the last_changed timestamp of the event when the sensor stopped detecting motion. Similarly, to see the `event_id` of the image, go to {% my developer_states title="**Settings** > **Developer tools** > **States**" %} and find the event when the sensor started detecting motion.

### Example notification automation with thumbnail

This example sends a notification with a camera thumbnail when motion is detected. The short delay ensures that the thumbnail is available before the notification is sent.

```yaml
alias: "Motion detection with image"
description: "Sends a notification with camera snapshot when motion is detected."
triggers:
  - entity_id: binary_sensor.g4_instant_motion # Replace with your camera entity
    trigger: state
    from: off
    to: on
actions:
  - delay:
      seconds: 2
  - data:
      message: "Motion detected"
      data:
        image: >-
          {% raw %}/api/unifiprotect/thumbnail/{{ config_entry_id(trigger.entity_id) }}/{{ trigger.to_state.attributes.event_id }}{% endraw %}
    action: notify.mobile_app_your_device # Replace with your notification target
```

### Example notification automation with video

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

{% note %}
The iOS Companion App does not support video attachments via local URLs. Images work with relative paths, but for video attachments you need to use an externally accessible URL or a different delivery method.
{% endnote %}

## Event Entities Support

The UniFi Protect integration provides support for various event types triggered by connected devices. Below are the descriptions for each supported event type:

### Doorbell Ring Event

- **Event Name**: Doorbell
- **Event Attributes**:
  - **event_type**: `ring`
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
    value_template: >
      {% raw %}{{
        trigger.event.data.old_state is not none and
        not trigger.event.data.old_state.state == 'unavailable' and
        trigger.event.data.new_state is not none and
        not trigger.event.data.new_state.state == 'unavailable' and
        trigger.event.data.new_state.attributes.event_type == 'ring'
      }}{% endraw %}
actions:
  - data:
      message: Someone is at the door!
      title: Doorbell Notification
    action: notify.mobile_app_your_device # Replace with your notification target
```

The condition ensures the notification is only sent for actual doorbell rings and not during startup or power-cycle state restoration, when the entity may temporarily transition through the `unavailable` state (such as during a UniFi Protect restart).

### NFC Card Scanned Event

- **Event Name**: NFC
- **Event Attributes**:
  - **event_type**: `scanned`
  - **event_id**: A unique ID that identifies the NFC card scan event.
  - **nfc_id**: The ID of the scanned NFC card.
- **Description**: This event is triggered when an NFC card is scanned at a compatible device (for example, a smart doorbell). It contains information such as the `nfc_id` of the scanned card.

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

You can obtain the `nfc_id` using the [Action unifiprotect.get_user_keyring_info](#action-get-user-keyring-info).

{% warning %}
When processing NFC scans, always validate the scanned ID. Unknown NFC cards also trigger the scan event. Additionally, this event was developed using third-party cards, as the developer did not have access to official UniFi cards at the time. With third-party cards, the scan relies on the card's serial number. While this approach is not uncommon, it is essential to note that the card's serial number is generally not considered a secure identifier and can be duplicated relatively easily. When the device becomes unavailable and becomes available again in Home Assistant, repeated event processing can occur. The state change is not an issue with the integration but should be considered, mainly if the device is used for actions such as unlocking doors.
{% endwarning %}

### Fingerprint Identified Event

- **Event Name**: Fingerprint
- **Event Attributes**:
  - **event_type**: Either `identified` or `not_identified`
  - **event_id**: A unique ID that identifies the fingerprint event.
  - **ulp_id**: The ID used to identify the person. If no fingerprint match is found, the `ulp_id` will be empty and the `event_type` will be `not_identified`.
- **Description**: This event is triggered when a fingerprint is scanned by a compatible device. If the fingerprint is recognized, it provides a `ulp_id`, which represents the internal user ID. If the fingerprint is not recognized, the `event_type` will be set to `not_identified`, and no `ulp_id` will be provided.

You can obtain the `ulp_id` using the [Action unifiprotect.get_user_keyring_info](#action-get-user-keyring-info).

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
actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      {% raw %}message: "Fingerprint identified with ID: {{ trigger.event.data.new_state.attributes.ulp_id }}"{% endraw %}
      title: "Fingerprint Scan Notification"
```

{% warning %}
Similar to NFC, an event is triggered when a fingerprint is recognized and not recognized. However, unlike NFC, at the time of implementation, no fingerprint ID is included in the event if the fingerprint is unknown. When the device becomes unavailable and becomes available again in Home Assistant, repeated event processing can occur. The state change is not an issue with the integration but should be considered, mainly if the device is used for actions such as unlocking doors.
{% endwarning %}

### Vehicle Detection Event

- **Event Name**: Vehicle
- **Event Attributes**:
  - **event_type**: `detected`
  - **event_id**: A unique ID that identifies the vehicle detection event.
  - **thumbnail_count**: The number of thumbnails received for this event.
  - **confidence**: Detection confidence score (0-100, optional).
  - **clock_best_wall**: Timestamp of the best detection frame in ISO 8601 format (optional).
  - **license_plate**: Detected license plate (optional, requires License Plate Recognition).
  - **attributes**: Additional detection metadata from UniFi Protect (optional), including:
    - **trackerId**: Internal tracking ID for the detected vehicle.
    - **vehicleType**: Detected vehicle type (for example, car, truck or bus) with confidence score.
    - **color**: Detected vehicle color with confidence score.
    - **zone**: List of zone IDs where the vehicle was detected.
- **Description**: This event is triggered when a camera with Smart Detection capabilities detects a vehicle. Unlike other event types that fire immediately, vehicle detection uses a 3-second delay to allow optimal thumbnail and License Plate Recognition (LPR) data to arrive. The delay ensures Home Assistant receives the thumbnail with the highest confidence LPR data before firing the event.

#### How Vehicle Detection Works

The vehicle detection event uses a delayed firing mechanism to optimize data quality:

1. When a vehicle is detected, the camera starts sending thumbnail data via WebSocket.
2. A 3-second timer starts waiting for additional thumbnails.
3. If new thumbnails arrive for the same event, the timer resets to 3 seconds.
4. After the timer expires, the event fires with the best available thumbnail based on:
   - License plate detection (highest priority)
   - Confidence score (higher is better)
   - Timestamp (most recent)
5. If a new vehicle event starts while a timer is pending, the old event fires immediately, then a new timer starts for the new event.
6. In rare cases, if UniFi Protect sends updated data after the event has already fired, an additional event will be triggered with the new information.

#### Requirements

- Camera with Smart Detection support (`feature_flags.has_smart_detect = true`)
- Vehicle detection must be enabled on the camera
- License Plate Recognition is optional

#### Example Vehicle Detection Automation

```yaml
alias: Vehicle Detected at Driveway
description: Automation that triggers when any vehicle is detected
triggers:
  - event_type: state_changed
    event_data:
      entity_id: event.driveway_camera_vehicle # Replace with your camera entity
    trigger: event
conditions:
  - condition: template
    value_template: >
      {% raw %}{{ 
         trigger.event.data.old_state is not none and
         not trigger.event.data.old_state.attributes.get('restored', false) and
         trigger.event.data.old_state.state != 'unavailable' and
         trigger.event.data.new_state is not none and
         trigger.event.data.new_state.attributes.event_type == 'detected'
       }}{% endraw %}
actions:
  - data:
      message: >-
        {% raw %}Vehicle detected{% if trigger.event.data.new_state.attributes.confidence is defined %} with {{ trigger.event.data.new_state.attributes.confidence }}% confidence{% endif %}.
        {% if trigger.event.data.new_state.attributes.license_plate is defined %}
        License plate: {{ trigger.event.data.new_state.attributes.license_plate }}
        {% endif %}{% endraw %}
      title: Vehicle Detection
    action: notify.mobile_app_your_device # Replace with your notification target
```

#### Example Specific License Plate Automation

```yaml
alias: Garage Door Open for Known Vehicle
description: Opens garage door when a specific license plate is detected
triggers:
  - event_type: state_changed
    event_data:
      entity_id: event.driveway_camera_vehicle # Replace with your camera entity
    trigger: event
conditions:
  - condition: template
    value_template: >
      {% raw %}{{ 
         trigger.event.data.old_state is not none and
         not trigger.event.data.old_state.attributes.get('restored', false) and
         trigger.event.data.old_state.state != 'unavailable' and
         trigger.event.data.new_state is not none and
         trigger.event.data.new_state.attributes.event_type == 'detected' and
         trigger.event.data.new_state.attributes.license_plate in ['ABC123', 'XYZ789']
       }}{% endraw %}
actions:
  - action: cover.open
    target:
      entity_id: cover.garage_door
  - data:
      message: >-
        {% raw %}Garage door opened for vehicle {{ trigger.event.data.new_state.attributes.license_plate }}.{% endraw %}
      title: Garage Door Notification
    action: notify.mobile_app_your_device # Replace with your notification target
```

{% note %}
Vehicle detection events are fired even if no license plate is detected. The `license_plate` attribute will only be present when License Plate Recognition successfully identifies a plate. The 3-second delay ensures that if LPR data is available, it will be included in the event.
{% endnote %}

{% warning %}
License Plate Recognition can be triggered by various sources, including images or printed materials showing license plates. Always use caution when creating automations based on license plate detection, especially for security-sensitive actions like opening garage doors or unlocking gates. Consider implementing additional verification methods or time-based restrictions to prevent unwanted triggering. Use at your own risk.
{% endwarning %}

### Key Fob Button Event

- **Event Name**: Button
- **Event Attributes**:
  - **event_type**: The pressed button, one of `arm`, `disarm`, `night`, `panic`, `function`, `left`, `right`, `input1`, `input2`, or `alarm_hub_button`.
  - **event_id**: A unique ID that identifies the button press event.
- **Description**: This event is triggered when a button on a UniFi Protect key fob (USL-FOB) is pressed. Each fob has a single **Button** entity, and the button that was pressed is reported as the event type.

{% note %}
A key fob does not report which buttons it physically has, so every fob exposes the full list of button types above. Only the buttons your fob actually has can fire.
{% endnote %}

#### Example Key Fob Panic Button Automation

```yaml
alias: Key Fob Panic Button Automation
description: Automation that triggers when the panic button on a key fob is pressed
triggers:
  - event_type: state_changed
    event_data:
      entity_id: event.front_door_fob_button # Replace with your key fob entity
    trigger: event
conditions:
  - condition: template
    value_template: >
      {% raw %}{{
        trigger.event.data.old_state is not none and
        not trigger.event.data.old_state.state == 'unavailable' and
        trigger.event.data.new_state is not none and
        not trigger.event.data.new_state.state == 'unavailable' and
        trigger.event.data.new_state.attributes.event_type == 'panic'
      }}{% endraw %}
actions:
  - data:
      message: Panic button pressed on the key fob!
      title: Key Fob Alert
    action: notify.mobile_app_your_device # Replace with your notification target
```

The condition ensures the automation only runs for actual button presses and not during startup or power-cycle state restoration, when the entity may temporarily transition through the `unavailable` state.

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
