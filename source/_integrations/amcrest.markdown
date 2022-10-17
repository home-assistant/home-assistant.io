---
title: Amcrest
description: Instructions on how to integrate Amcrest (or Dahua) IP cameras within Home Assistant.
ha_category:
  - Binary Sensor
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
ha_config_flow: true
---

The `amcrest` camera platform allows you to integrate your [Amcrest](https://amcrest.com/) or Dahua IP camera or doorbell in Home Assistant.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Camera
- Sensor

**Note:** Amcrest cameras with newer firmware no longer have the ability to
stream `high` definition video with MJPEG encoding. You may need to use `low`
resolution stream or the `snapshot` stream source instead.  If the quality seems
too poor, lower the `Frame Rate (FPS)` and max out the `Bit Rate` settings in
your camera's configuration manager. If you defined the `stream_source` to
`mjpeg`, make sure your camera supports `Basic` HTTP authentication.
Newer Amcrest firmware may not work, then `rtsp` is recommended instead.

{% include integrations/config_flow.md %}

## Streaming vs Polled Binary Sensors

Some binary sensors provide two choices for method of operation: streaming or polled. Streaming is more responsive and causes less network traffic because the camera will tell Home Assistant when the sensor's state has changed. Polled mode queries the camera periodically (every five seconds) to check the state of the sensor. Therefore streaming is the better option. However, some camera models and versions of camera firmware do not seem to implement the streaming method properly. Therefore the polled mode is also available. It is recommended to use the streaming mode (e.g., `motion_detected`) first, and if that doesn't work (e.g., results in constant errors), then try the polled mode instead (e.g., `motion_detected_polled`.)

## Events

Once loaded, the Amcrest integration will generate (Home Assistant) events when it receives event notifications in the stream sent by the camera. This is only possible if the camera model and firmware implement the streaming method (see [above](#streaming-vs-polled-binary-sensors)). The event type is `amcrest` and the data is as follows:

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

## Services

Once loaded, the `amcrest` integration will expose services that can be called to perform various actions. The `entity_id` service attribute can specify one or more specific cameras, or `all` can be used to specify all configured Amcrest cameras.

Available services:
`enable_audio`, `disable_audio`,
`enable_motion_recording`, `disable_motion_recording`,
`enable_recording`, `disable_recording`,
`goto_preset`, `set_color_bw`,
`start_tour`, `stop_tour`, and
`ptz_control`

#### Service `enable_audio`/`disable_audio`

These services enable or disable the camera's audio stream.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`.

#### Service `enable_motion_recording`/`disable_motion_recording`

These services enable or disable the camera to record a clip to its configured storage location when motion is detected.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`.

#### Service `enable_recording`/`disable_recording`

These services enable or disable the camera to continuously record to its configured storage location.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`.

#### Service `goto_preset`

This service will cause the camera to move to one of the PTZ locations configured within the camera.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`.
`preset` | no | Preset number, starting from 1.

#### Service `set_color_bw`

This service will set the color mode of the camera.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`.
`color_bw` | no | One of `auto`, `bw` or `color`.

#### Service `start_tour`/`stop_tour`

These services start or stop the camera's PTZ tour function.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`.

#### Service `ptz_control`

If your Amcrest or Dahua camera supports PTZ, you will be able to pan, tilt or zoom your camera.  

Service data attribute | Optional | Description
-|-|-
 `entity_id` | no| The entity ID of the camera to control. May be a list of multiple entity IDs. To target all cameras, set entity ID to `all`.
 `movement` | no | Direction of the movement. Allowed values: `zoom_in`, `zoom_out`, `up`, `down`, `left`, `right`, `right_up`, `right_down`, `left_up`,  `left_down`
 `travel_time` | yes |Travel time in fractional seconds. Allowed values: `0` to `1`. Default: `0.2`.

#### Notes

- PTZ zoom capability does not control VariFocal lens adjustments.
- There can be several seconds of lag before the video (snapshot or live) reflects the camera movement.

### Example card with controls

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
      action: call-service
      service: amcrest.ptz_control
      data:
        entity_id: camera.lakehouse
        movement: up
  - type: icon
    icon: "mdi:arrow-down"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 25px
      bottom: 0px
    tap_action:
      action: call-service
      service: amcrest.ptz_control
      data:
        entity_id: camera.lakehouse
        movement: down
  - type: icon
    icon: "mdi:arrow-left"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 50px
      bottom: 25px
    tap_action:
      action: call-service
      service: amcrest.ptz_control
      data:
        entity_id: camera.lakehouse
        movement: left
  - type: icon
    icon: "mdi:arrow-right"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 0px
      bottom: 25px
    tap_action:
      action: call-service
      service: amcrest.ptz_control
      data:
        entity_id: camera.lakehouse
        movement: right
  - type: icon
    icon: "mdi:arrow-top-left"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 50px
      bottom: 50px
    tap_action:
      action: call-service
      service: amcrest.ptz_control
      data:
        entity_id: camera.lakehouse
        movement: left_up
  - type: icon
    icon: "mdi:arrow-top-right"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 0px
      bottom: 50px
    tap_action:
      action: call-service
      service: amcrest.ptz_control
      data:
        entity_id: camera.lakehouse
        movement: right_up
  - type: icon
    icon: "mdi:arrow-bottom-left"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 50px
      bottom: 0px
    tap_action:
      action: call-service
      service: amcrest.ptz_control
      data:
        entity_id: camera.lakehouse
        movement: left_down
  - type: icon
    icon: "mdi:arrow-bottom-right"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      right: 0px
      bottom: 0px
    tap_action:
      action: call-service
      service: amcrest.ptz_control
      data:
        entity_id: camera.lakehouse
        movement: right_down
  - type: icon
    icon: "mdi:magnify"
    style:
      background: "rgba(255, 255, 255, 0.25)"
      bottom: 25px
      right: 25px
    tap_action:
      action: call-service
      service: amcrest.ptz_control
      data:
        entity_id: camera.lakehouse
        movement: zoom_in
    hold_action:
      action: call-service
      service: amcrest.ptz_control
      data:
        entity_id: camera.lakehouse
        movement: zoom_out
```

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

To check if your Amcrest camera is supported/tested, visit the [supportability matrix](https://github.com/tchellomello/python-amcrest#supportability-matrix) link from the `python-amcrest` project.
