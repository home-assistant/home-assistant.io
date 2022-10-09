---
title: EZVIZ
description: Integrate EZVIZ camera within Home Assistant.
ha_release: 0.107
ha_category:
  - Camera
ha_iot_class: Cloud Polling
ha_domain: ezviz
ha_codeowners:
  - '@RenierM26'
  - '@baqs'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - camera
  - sensor
  - switch
ha_integration_type: integration
---

The `ezviz` sensor platform uses the ezvizlife.com API to interact with the devices.
It also exposes an RTSP stream, by using the local camera IPs (so the device hosting Home Assistant has to be able to access the local IP of the cameras).

As there is no official documentation for the API, the component retrieves data from the API used in the EZVIZ mobile app, [hosted here](https://apiieu.ezvizlife.com).

The password for each camera is usually written near the QR code. This could be underneath the device or in the user manual. It is usually referred to as the camera "verification code".

{% include integrations/config_flow.md %}

Your cameras will now show under integration options as "discovered devices". Please complete the setup for each camera to see the video stream within Home Assistant.

You can also change the camera options should you need to access a high or low res stream. Generally, though it will just work without any modification to options.

### Service `ezviz.alarm_sound`

If your EZVIZ camera supports warning sounds, you can use this service to set the intensity.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `level` | 	Set the sound level to 0 for Soft, 1 for Intensive or 2 to disable |

### Service `ezviz.ptz`

If your EZVIZ camera supports PTZ, you will be able to pan or tilt your camera.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `direction` | 	Direction of the movement. Allowed values: `up`, `down`, `left`, `right` |
| `speed` | (Optional) Speed to in which to move the camera. Allowed values: int from 1 to 9. Default: 5 |

### Service `ezviz.set_alarm_detection_sensibility`

If your EZVIZ camera supports motion detection, you will be able to set the sensitivity level using this service.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `level` | Sensibility level (1-6) for type 0 (Normal camera) or (1-100) for type 3 (PIR sensor camera). |
| `type_value` | Type of detection. Options : 0 - Camera or 3 - PIR Sensor Camera. |

### Service `ezviz.sound_alarm`

If your EZVIZ camera has a built-in siren, you can use this service to make a noise.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `enable` | Sound the alarm by setting this to 1 or stop the siren by setting this to 0. |

### Service `ezviz.wake_device`

If you have "sleep" mode enabled on your camera, you can use this service to wake it. Especially useful for battery cameras.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |

To enable/disable motion detection, use the Home Assistant built in services. 

### Service `camera.enable_motion_detection'

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |

### Service `camera.disable_motion_detection'

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
