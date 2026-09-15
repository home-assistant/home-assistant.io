---
title: Foscam
description: Instructions on how to integrate Foscam IP cameras within Home Assistant.
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 0.7.3
ha_codeowners:
  - '@Foscam-wangzhengyu'
ha_domain: foscam
ha_config_flow: true
ha_platforms:
  - camera
  - number
  - switch
ha_integration_type: device
---

The **Foscam** {% term integration %} allows you to watch the live stream of your [Foscam](https://www.foscam.com) IP camera in Home Assistant.

{% include integrations/config_flow.md %}

{% note %}
There seems to be some issues within Foscam with lengthy passwords and passwords containing certain symbols. Be sure to check your camera's documentation.
{% endnote %}

## Supported functionality

### Entities
The Foscam integration provides the following entities.

#### Camera
- **Streams**
  - **Description**: Most Foscam IP Cameras support two video streams, by default the `Main` stream is the high quality stream while the `Sub` stream is a lower     quality stream. These streams can be configured in your camera preferences.
  - **Available for machines**: all.
    
#### Switch
- **Infrared**
  - **Description**: Control the camera’s infrared illuminator.
  - **Available for machines**: all.

- **Device indicator light**
  - **Description**: Control the camera’s status indicator.
  - **Available for machines**: all.

- **White light**
  - **Description**: Control the camera’s white light illuminator.
  - **Available for machines**: Cameras equipped with white light illumination.
  - **Remarks**: Since there is currently no mechanism to determine device capabilities for conditionally displaying the white light switch, unsupported models will still show the switch — but in a disabled state. This will be refined in a future update.

- **Siren alarm**
  - **Description**: Control the device’s alarm.
  - **Available for machines**: all.

- **Image flip/mirror**
  - **Description**: Toggle image flip/mirror on the device.
  - **Available for machines**: all.

- **Sleep**
  - **Description**: Toggle sleep mode, when enabled, the device enters sleep state.
  - **Available for machines**: all.

- **HDR**
  - **Description**: Toggle the camera’s HDR, when enabled, the image will reveal more detail in shadows and highlights.
  - **Available for machines**: all.

- **WDR**
  - **Description**: Toggle the camera’s WDR, when enabled, the image will reveal more detail in shadows and highlights.
  - **Available for machines**: all.
    
#### Number
- **Device volume**
  - **Description**: Adjust the volume of device alert sounds, such as alarms and power on/off tones.
  - **Available for machines**: all.

- **Speak volume**
  - **Description**: Adjust the device’s intercom volume.
  - **Available for machines**: all.

{% include integrations/actions.md %}

## Examples

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

## Extra CGI commands

Foscam Webcams which support CGI Commands can be controlled by Home Assistant ([Source](https://community.jeedom.com/uploads/short-url/2A5aSBcCyoVZOdpiFC8HRDAOxqG.pdf)).
