---
title: Amcrest
description: Integrate your Amcrest or Dahua IP camera or doorbell with Home Assistant for live video, motion detection, PTZ control, and more.
ha_category:
  - Binary sensor
  - Camera
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.49
ha_domain: amcrest
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - camera
  - sensor
  - switch
ha_codeowners:
  - '@flacjacket'
ha_integration_type: device
---

The **Amcrest** {% term integration %} connects your [Amcrest](https://amcrest.com/) or Dahua IP camera or doorbell to Home Assistant. Once set up, you can watch a live video stream, receive motion and audio alerts, manage recording, control <abbr title="pan, tilt, and zoom">PTZ</abbr> cameras, and toggle privacy mode.

To check whether your specific camera model is supported, visit the [supportability matrix](https://github.com/tchellomello/python-amcrest#supportability-matrix) in the `python-amcrest` project.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of your camera. If you use a hostname, make sure DNS resolves correctly.
Username:
  description: The username for your camera. Most Amcrest cameras use `admin` as the username, even if you have set a different name in the app.
Password:
  description: The password for your camera.
Port:
  description: The HTTP port of the camera's web interface.
  default: 80
{% endconfiguration_basic %}

## Supported functionality

### Entities

After setup, the following entities are created for each camera.

#### Camera

- **Camera**
  - Provides a live video stream, still image snapshots, and on/off control.
  - Supports MJPEG streaming, snapshot-based streaming, and WebRTC (via go2rtc, if configured).

#### Binary sensors

- **Motion detected**: turns on when motion is detected. Make sure motion detection is enabled in your camera under **Settings** > **Events** > **Video Detection**.
- **Audio detected**: turns on when audio is detected. Enable this in your camera under **Settings** > **Events** > **Audio Detection**.
- **Crossline detected**: turns on when a virtual tripwire crossing is detected.
- **Online**: reflects whether your camera is currently reachable. Updates approximately every minute.

The motion, audio, and crossline sensors are event-driven — they update instantly when the camera sends a notification rather than polling on a schedule. The online sensor actively tests connectivity.

#### Sensors

- **PTZ preset**: Shows the number of <abbr title="pan, tilt, and zoom">PTZ</abbr> preset positions saved on your camera. Disabled by default.
- **SD used**: Shows SD card usage as a percentage. Total and used space are available as extra attributes. Disabled by default.

#### Switches

- **Privacy mode** — when turned on, the camera's lens is covered and no video or audio is captured. Turn it off to return to normal operation.

## Events

The Amcrest integration fires Home Assistant {% term events %} whenever the camera sends an event notification over its event stream. The event type is `amcrest` and the data looks like this:

```json
{
  "camera": "<name of the camera that triggered the event>",
  "event": "<amcrest-specific event code>",
  "payload": {
    "<json-encoded content sent by the camera>"
  }
}
```

The event code (for example, `CallNoAnswered` for a doorbell press) is included at the top-level `event` field for easy matching in automations.

## Actions

The **Amcrest** integration provides the following {% term actions %}. Each action targets one or more cameras by `entity_id`. You can pass a single entity ID, a list of entity IDs, or `all` to target every configured Amcrest camera.

### Action: Enable audio / disable audio

`amcrest.enable_audio` and `amcrest.disable_audio` — enable or disable the camera's audio stream.

- **`entity_id`** (required): The entity ID of the camera. May be a list of multiple entity IDs. Use `all` to target every Amcrest camera.

### Action: Enable motion recording / disable motion recording

`amcrest.enable_motion_recording` and `amcrest.disable_motion_recording` — enable or disable motion-triggered recording to the camera's configured storage.

- **`entity_id`** (required): The entity ID of the camera. May be a list of multiple entity IDs. Use `all` to target every Amcrest camera.

### Action: Enable recording / disable recording

`amcrest.enable_recording` and `amcrest.disable_recording` — enable or disable continuous recording to the camera's configured storage.

- **`entity_id`** (required): The entity ID of the camera. May be a list of multiple entity IDs. Use `all` to target every Amcrest camera.

### Action: Go to preset

`amcrest.goto_preset` — move a <abbr title="pan, tilt, and zoom">PTZ</abbr> camera to a saved preset position.

- **`entity_id`** (required): The entity ID of the camera. May be a list of multiple entity IDs. Use `all` to target every Amcrest camera.
- **`preset`** (required): The preset number, starting from 1.

### Action: Set color mode

`amcrest.set_color_bw` — set the camera's day/night color mode.

- **`entity_id`** (required): The entity ID of the camera. May be a list of multiple entity IDs. Use `all` to target every Amcrest camera.
- **`color_bw`** (required): One of `auto`, `bw`, or `color`.

### Action: Start tour / stop tour

`amcrest.start_tour` and `amcrest.stop_tour` — start or stop the camera's <abbr title="pan, tilt, and zoom">PTZ</abbr> tour.

- **`entity_id`** (required): The entity ID of the camera. May be a list of multiple entity IDs. Use `all` to target every Amcrest camera.

### Action: PTZ control

`amcrest.ptz_control` — pan, tilt, or zoom a compatible camera in real time.

- **`entity_id`** (required): The entity ID of the camera. May be a list of multiple entity IDs. Use `all` to target every Amcrest camera.
- **`movement`** (required): Direction of movement. Allowed values: `zoom_in`, `zoom_out`, `up`, `down`, `left`, `right`, `right_up`, `right_down`, `left_up`, `left_down`.
- **`travel_time`** (optional): Duration of movement in fractional seconds, between `0` and `1`. Defaults to `0.2`.

## Examples

### Doorbell button press automation

Use the `amcrest` event to trigger an automation when someone presses the call button on an AD110 or AD410 doorbell:

```yaml
alias: "Doorbell pressed"
description: "Trigger when someone presses the Amcrest doorbell"
triggers:
  - trigger: event
    event_type: amcrest
    event_data:
      event: "CallNoAnswered"
      payload:
        action: "Start"
actions:
  - type: flash
    entity_id: light.living_room
    domain: light
```

### PTZ camera card with controls

You can display a live video feed with on-screen <abbr title="pan, tilt, and zoom">PTZ</abbr> controls using a picture-elements card:

<p class='img'>
  <img src='/images/integrations/amcrest/amcrest_ptz.jpg' alt='Screenshot using a picture-elements card with PTZ controls.'>
  Example showing an Amcrest IP2M-841 PT camera with pan and tilt controls.
</p>

```yaml
type: picture-elements
entity: camera.lakehouse
camera_image: camera.lakehouse
camera_view: live
elements:
  - type: icon
    icon: "mdi:arrow-up"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 25px
      bottom: 50px
    tap_action:
      action: perform-action
      perform_action: amcrest.ptz_control
      service_data:
        entity_id: camera.lakehouse
        movement: up
  - type: icon
    icon: "mdi:arrow-down"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 25px
      bottom: 0px
    tap_action:
      action: perform-action
      perform_action: amcrest.ptz_control
      service_data:
        entity_id: camera.lakehouse
        movement: down
  - type: icon
    icon: "mdi:arrow-left"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 50px
      bottom: 25px
    tap_action:
      action: perform-action
      perform_action: amcrest.ptz_control
      service_data:
        entity_id: camera.lakehouse
        movement: left
  - type: icon
    icon: "mdi:arrow-right"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 0px
      bottom: 25px
    tap_action:
      action: perform-action
      perform_action: amcrest.ptz_control
      service_data:
        entity_id: camera.lakehouse
        movement: right
  - type: icon
    icon: "mdi:arrow-top-left"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 50px
      bottom: 50px
    tap_action:
      action: perform-action
      perform_action: amcrest.ptz_control
      service_data:
        entity_id: camera.lakehouse
        movement: left_up
  - type: icon
    icon: "mdi:arrow-top-right"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 0px
      bottom: 50px
    tap_action:
      action: perform-action
      perform_action: amcrest.ptz_control
      service_data:
        entity_id: camera.lakehouse
        movement: right_up
  - type: icon
    icon: "mdi:arrow-bottom-left"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 50px
      bottom: 0px
    tap_action:
      action: perform-action
      perform_action: amcrest.ptz_control
      service_data:
        entity_id: camera.lakehouse
        movement: left_down
  - type: icon
    icon: "mdi:arrow-bottom-right"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 0px
      bottom: 0px
    tap_action:
      action: perform-action
      perform_action: amcrest.ptz_control
      service_data:
        entity_id: camera.lakehouse
        movement: right_down
  - type: icon
    icon: "mdi:magnify"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      bottom: 25px
      right: 25px
    tap_action:
      action: perform-action
      perform_action: amcrest.ptz_control
      service_data:
        entity_id: camera.lakehouse
        movement: zoom_in
    hold_action:
      action: perform-action
      perform_action: amcrest.ptz_control
      data:
        entity_id: camera.lakehouse
        movement: zoom_out
```

## Known limitations

- Camera settings such as resolution and stream source cannot be changed after initial setup. Support for editing these options will be added in a future update.
- If you need to change your camera's IP address or login credentials, you must remove and re-add the integration.
- Only single-channel cameras are supported at this time. Multi-channel camera support will be added in a future update.
- On first startup, Home Assistant may log SSL initialization warnings related to the underlying camera library. These appear only once per startup and have no functional impact.
- <abbr title="pan, tilt, and zoom">PTZ</abbr> zoom control does not adjust varifocal lenses.
- There can be a few seconds of lag before the video stream reflects camera movement.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

---

{% details "YAML configuration (deprecated)" %}

{% important %}
YAML-based configuration for Amcrest is deprecated and will be removed in a future version of Home Assistant. Use the UI-based setup described at the top of this page instead.
{% endimportant %}

Existing YAML-configured cameras continue to work alongside any cameras added through the UI. To migrate, add your camera through the UI and remove its entry from {% term "`configuration.yaml`" %}.

To configure via {% term "`configuration.yaml`" %}, add the following:

{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
amcrest:
  - host: IP_ADDRESS_CAMERA
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: >
    The IP address or hostname of your camera.
    If using a hostname, make sure the DNS works as expected.
  required: true
  type: string
username:
  description: >
    The username for accessing your camera. Most Amcrest devices use
    "admin" for the username, even if you have configured another
    username in their app.
  required: true
  type: string
password:
  description: The password for accessing your camera.
  required: true
  type: string
name:
  description: >
    A friendly name for your camera. In multi-camera setups, setting a
    name is strongly recommended, as the camera ID number may change at
    each reboot if no name is set.
  required: false
  type: string
  default: Amcrest Camera
port:
  description: The port that the camera is running on.
  required: false
  type: integer
  default: 80
resolution:
  description: >
    The camera stream resolution. Use `high` for 1080p/720p or `low`
    for 640×480.
  required: false
  type: string
  default: high
stream_source:
  description: >
    The data source for the live stream. `mjpeg` uses the camera's
    native MJPEG stream, `snapshot` creates a stream from still images,
    and `rtsp` streams via the RTSP protocol.
  required: false
  type: string
  default: snapshot
ffmpeg_arguments:
  description: Extra options to pass to FFmpeg, such as image quality or video filter options.
  required: false
  type: string
  default: -pred 1
authentication:
  description: >
    The authentication method to use when `stream_source` is `mjpeg`.
    Only `basic` is currently supported.
  required: false
  type: string
  default: basic
scan_interval:
  description: Update interval in seconds.
  required: false
  type: integer
  default: 10
binary_sensors:
  description: Binary sensors to enable.
  required: false
  type: list
  default: None
  keys:
    audio_detected:
      description: "On when audio is detected (event-driven streaming method)."
    audio_detected_polled:
      description: "On when audio is detected (polled method)."
    motion_detected:
      description: "On when motion is detected (event-driven streaming method)."
    motion_detected_polled:
      description: "On when motion is detected (polled method)."
    crossline_detected:
      description: "On when a virtual tripwire crossing is detected (event-driven streaming method)."
    crossline_detected_polled:
      description: "On when a virtual tripwire crossing is detected (polled method)."
    online:
      description: "On when the camera is reachable and responding to commands."
sensors:
  description: Sensors to enable.
  required: false
  type: list
  default: None
  keys:
    sdcard:
      description: Reports SD card usage with total and used space as attributes.
    ptz_preset:
      description: Reports the number of PTZ preset positions configured on the camera.
switches:
  description: Switches to enable.
  required: false
  type: list
  default: None
  keys:
    privacy_mode:
      description: Controls the camera's privacy mode feature, if supported.
control_light:
  description: >
    Automatically control the camera's indicator light, turning it on
    when the audio or video stream is active and off when both are
    disabled.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

### Streaming vs. polled binary sensors

YAML configuration lets you choose between event-driven (streaming) and polled binary sensors. Event-driven sensors are more responsive and generate less network traffic — the camera pushes state changes to Home Assistant the moment they occur. Polled sensors query the camera every five seconds instead.

Event-driven streaming is the recommended option. However, some camera models or firmware versions do not implement the event stream reliably. If you see persistent errors with a streaming sensor (for example, `motion_detected`), switch to its polled variant (`motion_detected_polled`).

### MJPEG and RTSP notes

Amcrest cameras with newer firmware may no longer support high-definition MJPEG streams. If you use `stream_source: mjpeg` and the quality is poor, try `resolution: low` or switch to `stream_source: snapshot`. If your camera does not support `Basic` HTTP authentication, use `stream_source: rtsp` instead.

When using `stream_source: rtsp`, make sure FFmpeg is installed by following the [FFmpeg integration](/integrations/ffmpeg/) instructions.

### Advanced YAML configuration example

```yaml
# Example configuration.yaml entry
amcrest:
  - host: IP_ADDRESS_CAMERA_1
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    binary_sensors:
      - motion_detected
      - crossline_detected
      - online
    sensors:
      - sdcard

  # Add a second camera
  - host: IP_ADDRESS_CAMERA_2
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    name: Amcrest Camera 2
    resolution: low
    stream_source: snapshot
    sensors:
      - ptz_preset
```

{% enddetails %}
