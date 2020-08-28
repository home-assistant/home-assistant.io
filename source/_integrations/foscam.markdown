---
title: Foscam
description: Instructions on how to integrate Foscam IP cameras within Home Assistant.
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 0.7.3
ha_codeowners:
  - '@skgsergio'
ha_domain: foscam
---

The `foscam` platform allows you to watch the live stream of your [Foscam](https://www.foscam.com) IP camera in Home Assistant.

## Configuration

To enable your Foscam IP camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: foscam
    ip: IP_ADDRESS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
ip:
  description: The IP address your camera.
  required: true
  type: string
port:
  description: The port that the camera is running on.
  required: false
  default: 88
  type: integer
rtsp_port:
  description: The port that the camera uses for RTSP. This is normally auto-discovered but some models may need this set, such as the R2 and R2C.
  required: false
  default: None
  type: integer
username:
  description: The username for accessing your camera.
  required: true
  type: string
password:
  description: The password for accessing your camera.
  required: true
  type: string
name:
  description: This parameter allows you to override the name of your camera.
  required: false
  type: string
{% endconfiguration %}

<div class='note'>
There seems to be some issues within Foscam with lengthy passwords and passwords containing certain symbols. Be sure to check your camera's documentation.
</div>

### Service `foscam.ptz`

If your Foscam camera supports PTZ, you will be able to pan or tilt your camera.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `movement` | 	Direction of the movement. Allowed values: `up`, `down`, `left`, `right`, `top_left`, `top_right`, `bottom_left`, `bottom_right` |
| `travel_time` | (Optional) Travel time in seconds. Allowed values: float from 0 to 1. Default: 0.125 |

### Example card with controls

<p class='img'>
  <img src='/images/integrations/foscam/example-card.png' alt='Screenshot showing a foscam camera using a picture-elements with PTZ controls.'>
  Example showing a Foscam camera with controls for Pan and Tilt.
</p>


Using the following card code you can achieve a card displaying the live video feed from a Foscam camera with controls for moving the camera at the bottom right corner.

```yaml
type: picture-elements
entity: camera.bedroom
camera_image: camera.bedroom
camera_view: live
elements:
  - type: icon
    icon: 'mdi:arrow-up'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      right: 25px
      bottom: 50px
    tap_action:
      action: call-service
      service: foscam.ptz
      service_data:
        entity_id: camera.bedroom
        movement: up
  - type: icon
    icon: 'mdi:arrow-down'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      right: 25px
      bottom: 0px
    tap_action:
      action: call-service
      service: foscam.ptz
      service_data:
        entity_id: camera.bedroom
        movement: down
  - type: icon
    icon: 'mdi:arrow-left'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      right: 50px
      bottom: 25px
    tap_action:
      action: call-service
      service: foscam.ptz
      service_data:
        entity_id: camera.bedroom
        movement: left
  - type: icon
    icon: 'mdi:arrow-right'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      right: 0px
      bottom: 25px
    tap_action:
      action: call-service
      service: foscam.ptz
      service_data:
        entity_id: camera.bedroom
        movement: right
  - type: icon
    icon: 'mdi:arrow-top-left'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      right: 50px
      bottom: 50px
    tap_action:
      action: call-service
      service: foscam.ptz
      service_data:
        entity_id: camera.bedroom
        movement: top_left
  - type: icon
    icon: 'mdi:arrow-top-right'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      right: 0px
      bottom: 50px
    tap_action:
      action: call-service
      service: foscam.ptz
      service_data:
        entity_id: camera.bedroom
        movement: top_right
  - type: icon
    icon: 'mdi:arrow-bottom-left'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      right: 50px
      bottom: 0px
    tap_action:
      action: call-service
      service: foscam.ptz
      service_data:
        entity_id: camera.bedroom
        movement: bottom_left
  - type: icon
    icon: 'mdi:arrow-bottom-right'
    style:
      background: 'rgba(255, 255, 255, 0.5)'
      right: 0px
      bottom: 0px
    tap_action:
      action: call-service
      service: foscam.ptz
      service_data:
        entity_id: camera.bedroom
        movement: bottom_right
```

### Extra CGI Commands

Foscam Webcams which support CGI Commands can be controlled by Home Assistant ([Source](https://www.iltucci.com/blog/wp-content/uploads/2018/12/Foscam-IPCamera-CGI-User-Guide-V1.0.4.pdf)). For an example of how this can be done, see the [Foscam IP Camera Pan, Tilt, Zoom Control](/cookbook/foscam_away_mode_PTZ/) Cookbook entry.
