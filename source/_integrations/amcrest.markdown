---
title: Amcrest
description: Instructions on how to integrate Amcrest (or Dahua) IP cameras within Home Assistant.
ha_category:
  - Binary sensor
  - Camera
  - Hub
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.49
ha_domain: amcrest
ha_platforms:
  - binary_sensor
  - camera
  - sensor
  - switch
ha_codeowners:
  - '@flacjacket'
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `amcrest` camera platform allows you to integrate your [Amcrest](https://amcrest.com/) or Dahua IP camera or doorbell in Home Assistant.

There is currently support for the following {% term device %} types within Home Assistant:

- Binary sensor
- Camera
- Sensor

## Configuration

To enable your camera in your installation, add the following to your {% term "`configuration.yaml`" %} file.
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
  description: The username for accessing your camera. Most Amcrest devices use "admin" for the username, even if you've configured another username in their app.
  required: true
  type: string
password:
  description: The password for accessing your camera.
  required: true
  type: string
name:
  description: >
    This parameter allows you to override the name of your camera. In the case of multi-camera setups,
    this is highly recommended as camera id number will be randomly changed at each reboot if a name is not allocated.
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
    This parameter allows you to specify the camera resolution.
    For a high resolution (1080/720p), specify the option `high`.
    For VGA resolution (640x480p), specify the option `low`.
  required: false
  type: string
  default: high
stream_source:
  description: >
    The data source for the live stream. `mjpeg` will use the camera's native
    MJPEG stream, whereas `snapshot` will use the camera's snapshot API to
    create a stream from still images. You can also set the `rtsp` option to
    generate the streaming via RTSP protocol.
  required: false
  type: string
  default: snapshot
ffmpeg_arguments:
  description: >
    Extra options to pass to FFmpeg, e.g.,
    image quality or video filter options.
  required: false
  type: string
  default: -pred 1
authentication:
  description: >
    Defines which authentication method to use only when `stream_source`
    is `mjpeg`. Currently, `aiohttp` only support `basic`.
  required: false
  type: string
  default: basic
scan_interval:
  description: Defines the update interval of the sensor in seconds.
  required: false
  type: integer
  default: 10
binary_sensors:
  description: >
    Conditions to display in the frontend.
    The following conditions can be monitored:
  required: false
  type: list
  default: None
  keys:
    audio_detected:
      description: "Return `on` when audio is detected, `off` when not. In order to use this feature you must enable it in your cameras interface under Settings > Events > Audio Detection. Uses streaming method (see [below](#streaming-vs-polled-binary-sensors))."
    audio_detected_polled:
      description: "Return `on` when audio is detected, `off` when not. In order to use this feature you must enable it in your cameras interface under Settings > Events > Audio Detection. Uses polled method (see [below](#streaming-vs-polled-binary-sensors))."
    motion_detected:
      description: "Return `on` when a motion is detected, `off` when not. Motion detection is enabled by default for most cameras, if this functionality is not working check that it is enabled in Settings > Events > Video Detection. Uses streaming method (see [below](#streaming-vs-polled-binary-sensors))."
    motion_detected_polled:
      description: "Return `on` when a motion is detected, `off` when not. Motion detection is enabled by default for most cameras, if this functionality is not working check that it is enabled in Settings > Events > Video Detection. Uses polled method (see [below](#streaming-vs-polled-binary-sensors))."
    crossline_detected:
      description: "Return `on` when a tripwire tripping is detected, `off` when not. Uses streaming method (see [below](#streaming-vs-polled-binary-sensors))."
    crossline_detected_polled:
      description: "Return `on` when a tripwire is tripping is detected, `off` when not. Uses polled method (see [below](#streaming-vs-polled-binary-sensors))."
    online:
      description: "Return `on` when camera is available (i.e., responding to commands), `off` when not."
sensors:
  description: >
    Conditions to display in the frontend.
    The following conditions can be monitored:
  required: false
  type: list
  default: None
  keys:
    sdcard:
      description: Return the SD card usage by reporting the total and used space.
    ptz_preset:
      description: >
        Return the number of PTZ preset positions
        configured for the given camera.
switches:
  description: Switches to control certain aspects of the cameras.
  required: false
  type: list
  default: None
  keys:
    privacy_mode:
      description: Controls the camera's Privacy Mode feature, if supported.
control_light:
  description: >
    Automatically control the camera's indicator light, turning it on if the audio or video streams are enabled, and turning it off if both streams are disabled.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

**Note:** Amcrest cameras with newer firmware no longer have the ability to
stream `high` definition video with MJPEG encoding. You may need to use `low`
resolution stream or the `snapshot` stream source instead.  If the quality seems
too poor, lower the `Frame Rate (FPS)` and max out the `Bit Rate` settings in
your camera's configuration manager. If you defined the `stream_source` to
`mjpeg`, make sure your camera supports `Basic` HTTP authentication.
Newer Amcrest firmware may not work, then `rtsp` is recommended instead.

**Note:** If you set the `stream_source` option to `rtsp`,
make sure to follow the steps mentioned at [FFmpeg](/integrations/ffmpeg/)
documentation to install the `ffmpeg`.

### Streaming vs polled binary sensors

Some binary sensors provide two choices for method of operation: streaming or polled. Streaming is more responsive and causes less network traffic because the camera will tell Home Assistant when the sensor's state has changed. Polled mode queries the camera periodically (every five seconds) to check the state of the sensor. Therefore streaming is the better option. However, some camera models and versions of camera firmware do not seem to implement the streaming method properly. Therefore the polled mode is also available. It is recommended to use the streaming mode (e.g., `motion_detected`) first, and if that doesn't work (e.g., results in constant errors), then try the polled mode instead (e.g., `motion_detected_polled`.)

## Events

Once loaded, the Amcrest integration will generate (Home Assistant) {% term events %} when it receives event notifications in the stream sent by the camera. This is only possible if the camera model and firmware implement the streaming method (see [above](#streaming-vs-polled-binary-sensors)). The event type is `amcrest` and the data is as follows:

```json
{
  "camera": "<name of the camera that triggered the event>",
  "event": "<amcrest-specific code of the event>",
  "payload": {
    <json-encoded content sent by the device
     through the streaming protocol>
  }
 }
```

The event code is sent by Amcrest or Dahua devices in the payload as a "Code" member. To ease event matching in automations, this code is replicated in a more top-level `event` member in `data`.

## Actions

Once loaded, the `amcrest` integration will expose {% term actions %} that can be called to perform various actions. The `entity_id` action attribute can specify one or more specific cameras, or `all` can be used to specify all configured Amcrest cameras.

Available {% term actions %}:
`enable_audio`, `disable_audio`,
`enable_motion_recording`, `disable_motion_recording`,
`enable_recording`, `disable_recording`,
`goto_preset`, `set_color_bw`,
`start_tour`, `stop_tour`, and
`ptz_control`

### Action `enable_audio`/`disable_audio`

These {% term actions %} enable or disable the camera's audio stream.

| Data attribute | Optional | Description                                                                                                                  |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`. |

### Action `enable_motion_recording`/`disable_motion_recording`

These {% term actions %} enable or disable the camera to record a clip to its configured storage location when motion is detected.

| Data attribute | Optional | Description                                                                                                                  |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`. |

### Action `enable_recording`/`disable_recording`

These actions enable or disable the camera to continuously record to its configured storage location.

| Data attribute | Optional | Description                                                                                                                  |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`. |

### Action `goto_preset`

This action will cause the camera to move to one of the <abbr title="pan, tilt, and zoom">PTZ</abbr> locations configured within the camera.

| Data attribute | Optional | Description                                                                                                                  |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`. |
| `preset`               | no       | Preset number, starting from 1.                                                                                              |

### Action `set_color_bw`

This action will set the color mode of the camera.

| Data attribute | Optional | Description                                                                                                                  |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`. |
| `color_bw`             | no       | One of `auto`, `bw` or `color`.                                                                                              |

### Action `start_tour`/`stop_tour`

These actions start or stop the camera's <abbr title="pan, tilt, and zoom">PTZ</abbr> tour function.

| Data attribute | Optional | Description                                                                                                                  |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`. |

### Action `ptz_control`

If your Amcrest or Dahua camera supports <abbr title="pan, tilt, and zoom">PTZ</abbr>, you will be able to pan, tilt or zoom your camera.  

| Data attribute | Optional | Description                                                                                                                                        |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`.                       |
| `movement`             | no       | Direction of the movement. Allowed values: `zoom_in`, `zoom_out`, `up`, `down`, `left`, `right`, `right_up`, `right_down`, `left_up`,  `left_down` |
| `travel_time`          | yes      | Travel time in fractional seconds. Allowed values: `0` to `1`. Default: `0.2`.                                                                     |

## Notes

- PTZ zoom capability does not control VariFocal lens adjustments.
- There can be several seconds of lag before the video (snapshot or live) reflects the camera movement.

## Example card with controls

<p class='img'>
  <img src='/images/integrations/amcrest/amcrest_ptz.jpg' alt='Screenshot using a picture-elements with PTZ controls.'>
  Example showing an Amcrest IP2M-841 PT camera with controls for Pan and Tilt.
</p>

Using the following picture-elements card code, you can display a live video feed from an Amcrest camera with controls for moving or zooming the camera.

```yaml
type: picture-elements
entity: camera.lakehouse
camera_image: camera.lakehouse
camera_view: live   # or auto for snapshot view
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

## Advanced configuration

You can also use this more advanced configuration example:

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

  # Add second camera
  - host: IP_ADDRESS_CAMERA_2
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    name: Amcrest Camera 2
    resolution: low
    stream_source: snapshot
    sensors:
      - ptz_preset
```

## Example automation to detect button presses on AD110 and AD410 doorbells

Using this {% term trigger %} in an {% term automation %} will allow you to detect the press of the doorbell call button and create automations based upon it.

```yaml
# Example automations.yaml entry
alias: "Doorbell Pressed"
description: "Trigger when Amcrest Button Press Event Fires"
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

To check if your Amcrest camera is supported/tested, visit the [supportability matrix](https://github.com/tchellomello/python-amcrest#supportability-matrix) link from the `python-amcrest` project.
