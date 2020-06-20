---
title: Amcrest
description: Instructions on how to integrate Amcrest IP cameras within Home Assistant.
logo: amcrest.png
ha_category:
  - Hub
  - Binary Sensor
  - Camera
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.49
ha_codeowners:
  - '@pnbruckner'
---

The `amcrest` camera platform allows you to integrate your [Amcrest](https://amcrest.com/) IP camera in Home Assistant.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Camera
- Sensor

## Configuration

To enable your camera in your installation, add the following to your `configuration.yaml` file:

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
  description: The username for accessing your camera.
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
    Extra options to pass to ffmpeg, e.g.,
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
    motion_detected:
      description: "Return `on` when a motion is detected, `off` when not. Uses streaming method (see [below](#streaming-vs-polled-binary-sensors))."
    motion_detected_polled:
      description: "Return `on` when a motion is detected, `off` when not. Uses polled method (see [below](#streaming-vs-polled-binary-sensors))."
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

### Streaming vs Polled Binary Sensors

Some binary sensors provide two choices for method of operation: streaming or polled. Streaming is more responsive and causes less network traffic because the camera will tell Home Assistant when the sensor's state has changed. Polled mode queries the camera periodically (every five seconds) to check the state of the sensor. Therefore streaming is the better option. However, some camera models and versions of camera firmware do not seem to implement the streaming method properly. Therefore the polled mode is also available. It is recommended to use the streaming mode (e.g., `motion_detected`) first, and if that doesn't work (e.g., results in constant errors), then try the polled mode instead (e.g., `motion_detected_polled`.)

## Services

Once loaded, the `amcrest` integration will expose services that can be called to perform various actions. The `entity_id` service attribute can specify one or more specific cameras, or `all` can be used to specify all configured Amcrest cameras.

Available services:
`enable_audio`, `disable_audio`,
`enable_motion_recording`, `disable_motion_recording`,
`enable_recording`, `disable_recording`,
`goto_preset`, `set_color_bw`,
`start_tour` and `stop_tour`

#### Service `enable_audio`/`disable_audio`

These services enable or disable the camera's audio stream.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.

#### Service `enable_motion_recording`/`disable_motion_recording`

These services enable or disable the camera to record a clip to its configured storage location when motion is detected.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.

#### Service `enable_recording`/`disable_recording`

These services enable or disable the camera to continuously record to its configured storage location.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.

#### Service `goto_preset`

This service will cause the camera to move to one of the PTZ locations configured within the camera.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.
`preset` | no | Preset number, starting from 1.

#### Service `set_color_bw`

This service will set the color mode of the camera.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.
`color_bw` | no | One of `auto`, `bw` or `color`.

#### Service `start_tour`/`stop_tour`

These services start or stop the camera's PTZ tour function.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Name(s) of entities, e.g., `camera.living_room_camera`.

## Advanced Configuration

You can also use this more advanced configuration example:

```yaml
# Example configuration.yaml entry
amcrest:
  - host: IP_ADDRESS_CAMERA_1
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    binary_sensors:
      - motion_detected
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

To check if your Amcrest camera is supported/tested, visit the [supportability matrix](https://github.com/tchellomello/python-amcrest#supportability-matrix) link from the `python-amcrest` project.
