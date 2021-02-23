---
title: Ezviz
description: Integrate Ezviz camera within Home Assistant.
ha_release: 0.107
ha_category:
  - Camera
ha_iot_class: Cloud Polling
ha_domain: ezviz
ha_codeowners:
  - '@baqs'
ha_platforms:
  - camera
---

The `ezviz` sensor platform uses the EzvizLife API to interact with the devices.
It also exposes an RTSP stream, by using the local camera IPs (so the device hosting Home Assistant has to be able to access the local IP of the cameras).

As there is no official documentation for the API, the component retrieves data from the API used in the Ezviz mobile app, [hosted here](https://apiieu.ezvizlife.com).

## Configuration

The configuration (see below) needs your Ezviz username & password you use within the Ezviz mobile application.

Next, add the Ezviz camera to your `configuration.yaml` file like below:

```yaml
# Example configuration.yaml entry
camera:
  - platform: ezviz
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    cameras:
      D12345678:
        username: YOUR_CAMERA_USERNAME
        password: YOUR_CAMERA_PASSWORD
```

As you see, here is the way to describe the camera credentials.
The password for each camera is usually written underneath the device, near the QR code. It is also code "verification code".

{% configuration %}
username:
  description: The Ezviz account username.
  required: true
  type: string
password:
  description: The Ezviz account password.
  required: true
  type: string
cameras:
  description: A list of cameras
  required: false
  type: string
  serial:
    description: The Ezviz camera Serial, usually a letter followed by 8 digits.
    required: true
    type: string
    username:
      description: The Ezviz camera RTSP username.
      required: true
      type: string
    password:
      description: The Ezviz verification code.
      required: true
      type: string
{% endconfiguration %}

## Lovelace

If you want a shiny Lovelace card, with proper buttons, here is a snippet of a Lovelace card:

```yaml

camera_image: camera.c6n_d12345678
camera_view: live
elements:
  - icon: 'mdi:arrow-up'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      bottom: 50px
      right: 25px
    tap_action:
      action: call-service
      service: camera.ezviz_ptz
      service_data:
        direction: up
        entity_id: camera.c6n_d12345678
    type: icon
  - icon: 'mdi:arrow-down'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      bottom: 0px
      right: 25px
    tap_action:
      action: call-service
      service: camera.ezviz_ptz
      service_data:
        direction: down
        entity_id: camera.c6n_d12345678
    type: icon
  - icon: 'mdi:arrow-left'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      bottom: 25px
      right: 50px
    tap_action:
      action: call-service
      service: camera.ezviz_ptz
      service_data:
        direction: left
        entity_id: camera.c6n_d12345678
    type: icon
  - icon: 'mdi:arrow-right'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      bottom: 25px
      right: 0px
    tap_action:
      action: call-service
      service: camera.ezviz_ptz
      service_data:
        direction: right
        entity_id: camera.c6n_d12345678
    type: icon
  - icon: 'mdi:run-fast'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      top: 25px
      right: 25px
    tap_action:
      action: call-service
      service: camera.ezviz_switch_follow_move_on
      service_data:
        entity_id: camera.c6n_d12345678
      confirmation: true
    type: icon
  - icon: 'mdi:run'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      top: 25px
      right: 0px
    tap_action:
      action: call-service
      service: camera.ezviz_switch_follow_move_off
      service_data:
        entity_id: camera.c6n_d12345678
      confirmation: true
    type: icon
  - icon: 'mdi:eye'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 25px
      top: 50px
    tap_action:
      action: call-service
      service: camera.ezviz_switch_privacy_off
      service_data:
        entity_id: camera.c6n_d12345678
      confirmation: true
    type: icon
  - icon: 'mdi:eye-off'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 0px
      top: 50px
    tap_action:
      action: call-service
      service: camera.ezviz_switch_privacy_on
      service_data:
        entity_id: camera.c6n_d12345678
      confirmation: true
    type: icon
  - icon: 'mdi:volume-high'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 25px
      top: 75px
    tap_action:
      action: call-service
      service: camera.ezviz_switch_audio_off
      service_data:
        entity_id: camera.c6n_d12345678
      confirmation: true
    type: icon
  - icon: 'mdi:volume-off'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 0px
      top: 75px
    tap_action:
      action: call-service
      service: camera.ezviz_switch_audio_on
      service_data:
        entity_id: camera.c6n_d12345678
      confirmation: true
    type: icon
  - icon: 'mdi:led-on'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 25px
      top: 100px
    tap_action:
      action: call-service
      service: camera.ezviz_switch_state_off
      service_data:
        entity_id: camera.c6n_d12345678
      confirmation: true
    type: icon
  - icon: 'mdi:led-off'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 0px
      top: 100px
    tap_action:
      action: call-service
      service: camera.ezviz_switch_state_on
      service_data:
        entity_id: camera.c6n_d12345678
      confirmation: true
    type: icon
  - icon: 'mdi:brightness-4'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 25px
      top: 100px
    tap_action:
      action: call-service
      service: camera.ezviz_switch_ir_off
      service_data:
        entity_id: camera.c6n_d12345678
      confirmation: true
    type: icon
  - icon: 'mdi:brightness-5'
    style:
      background: "rgba(255, 255, 255, 0.5)"
      right: 0px
      top: 100px
    tap_action:
      action: call-service
      service: camera.ezviz_switch_ir_on
      service_data:
        entity_id: camera.c6n_d12345678
      confirmation: true
    type: icon
entity: camera.c6n_d12345678
type: picture-elements
```
