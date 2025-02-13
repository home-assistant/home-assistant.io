---
title: Foscam
description: Instructions on how to integrate Foscam IP cameras within Home Assistant.
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 0.7.3
ha_codeowners:
  - '@krmarien'
ha_domain: foscam
ha_config_flow: true
ha_platforms:
  - camera
  - switch
ha_integration_type: integration
---

The `foscam` platform allows you to watch the live stream of your [Foscam](https://www.foscam.com) IP camera in Home Assistant.

{% include integrations/config_flow.md %}

{% note %}
There seems to be some issues within Foscam with lengthy passwords and passwords containing certain symbols. Be sure to check your camera's documentation.
{% endnote %}

### Controllable Features

If your camera supports it, a switch "Sleep" will be added to put the camera in sleep mode.

### Streams

Most Foscam IP Cameras supports two video streams, by default the `Main` stream is the high quality stream while the `Sub` stream is a lower quality stream. These streams can be configured in your camera preferences.

### Action `foscam.ptz`

If your Foscam camera supports <abbr title="pan, tilt, and zoom">PTZ</abbr>, you will be able to pan or tilt your camera.

| Data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `movement` | 	Direction of the movement. Allowed values: `up`, `down`, `left`, `right`, `top_left`, `top_right`, `bottom_left`, `bottom_right` |
| `travel_time` | (Optional) Travel time in seconds. Allowed values: float from 0 to 1. Default: 0.125 |

### Action `foscam.ptz_preset`

If your Foscam camera supports <abbr title="pan, tilt, and zoom">PTZ</abbr> presets, you will be able to move the camera to a predefined preset using the preset name.

| Data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `preset_name` | The name of the preset to move to. Presets can be created from within the official Foscam apps. |

### Example card with controls

<p class='img'>
  <img src='/images/integrations/foscam/example-card.png' alt='Screenshot showing a foscam camera using a picture-elements with PTZ controls.'>
  Example showing a Foscam camera with controls for Pan and Tilt.
</p>


Using the following card code you can achieve a card displaying the live video feed from a Foscam camera with controls for moving the camera at the bottom right corner.

```yaml
type: picture-elements
image: camera.bedroom
camera_image: camera.bedroom
camera_view: live
elements:
  - type: icon
    icon: "mdi:arrow-up"
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 25px
      bottom: 50px
    tap_action:
      action: perform-action
      perform_action: foscam.ptz
      target:
        entity_id: camera.bedroom
      data:
        movement: up
  - type: icon
    icon: "mdi:arrow-down"
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 25px
      bottom: 0px
    tap_action:
      action: perform-action
      perform_action: foscam.ptz
      target:
        entity_id: camera.bedroom
      data:
        movement: down
  - type: icon
    icon: "mdi:arrow-left"
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 50px
      bottom: 25px
    tap_action:
      action: perform-action
      perform_action: foscam.ptz
      target:
        entity_id: camera.bedroom
      data:
        movement: left
  - type: icon
    icon: "mdi:arrow-right"
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 0px
      bottom: 25px
    tap_action:
      action: perform-action
      perform_action: foscam.ptz
      target:
        entity_id: camera.bedroom
      data:
        movement: right
  - type: icon
    icon: "mdi:arrow-top-left"
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 50px
      bottom: 50px
    tap_action:
      action: perform-action
      perform_action: foscam.ptz
      target:
        entity_id: camera.bedroom
      data:
        movement: top_left
  - type: icon
    icon: "mdi:arrow-top-right"
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 0px
      bottom: 50px
    tap_action:
      action: perform-action
      perform_action: foscam.ptz
      target:
        entity_id: camera.bedroom
      data:
        movement: top_right
  - type: icon
    icon: "mdi:arrow-bottom-left"
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 50px
      bottom: 0px
    tap_action:
      action: perform-action
      perform_action: foscam.ptz
      target:
        entity_id: camera.bedroom
      data:
        movement: bottom_left
  - type: icon
    icon: "mdi:arrow-bottom-right"
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 0px
      bottom: 0px
    tap_action:
      action: perform-action
      perform_action: foscam.ptz
      target:
        entity_id: camera.bedroom
      data:
        movement: bottom_right
```

### Extra CGI Commands

Foscam Webcams which support CGI Commands can be controlled by Home Assistant ([Source](https://www.foscam.es/descarga/Foscam-IPCamera-CGI-User-Guide-AllPlatforms-2015.11.06.pdf)).
