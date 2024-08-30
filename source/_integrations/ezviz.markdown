---
title: EZVIZ
description: Integrate EZVIZ camera within Home Assistant.
ha_release: 0.107
ha_category:
  - Camera
  - Update
ha_iot_class: Cloud Polling
ha_domain: ezviz
ha_codeowners:
  - '@RenierM26'
  - '@baqs'
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - camera
  - image
  - light
  - number
  - select
  - sensor
  - siren
  - switch
  - update
ha_integration_type: integration
related:
  - docs: /dashboards/picture-glance/#creating-a-card-to-control-the-camera
    title: Controlling the camera from the dashboard
---

The `ezviz` sensor platform uses the ezvizlife.com API to interact with the devices.
It also exposes an RTSP stream, by using the local camera IPs (so the device hosting Home Assistant has to be able to access the local IP of the cameras).

As there is no official documentation for the API, the integration retrieves data from the API used in the EZVIZ mobile app, [hosted here](https://apiieu.ezvizlife.com).

The password for each camera is usually written near the QR code. This could be underneath the device or in the user manual. It is usually referred to as the camera "verification code".

The local RTSP server on your camera needs to be enabled. To do that:

- Open the EZVIZ mobile app.
- Select the profile icon.
- Navigate to **Settings** > **LAN Live View** > **Start Scanning**.
- Select your camera.
- Select the gear-like icon in the top-right corner > **Local Server Settings** > **enable RTSP**.

{% include integrations/config_flow.md %}

Your cameras will now show under integration options as "discovered devices". Please complete the setup for each camera to see the video stream within Home Assistant.

You can also change the camera options should you need to access a high or low res stream. Generally, though it will just work without any modification to options.

### Integration entity options

`Request Timeout (seconds)`:

- This option determines the duration Home Assistant waits for data from the EZVIZ API before giving up. This timeout is specified in seconds. If the API response takes longer than the specified timeout, Home Assistant will stop waiting and assume the request has failed. Adjust this value according to your network conditions and the responsiveness of the EZVIZ API. A higher timeout may be necessary for slower connections.

- Example: If you set the **Request Timeout** to 30 seconds (default option), Home Assistant will wait up to 30 seconds for a response from the EZVIZ API before timing out.

- Please note this only works on the main EZVIZ cloud entity.

`Arguments passed to ffmpeg for cameras`:

- This option allows you to define additional parameters for capturing footage from your EZVIZ cameras. While camera resolution and codec settings are typically configured in the "Ezviz Studio" desktop application, you can use this option to select the desired stream or substream for capturing the footage.

- To choose the appropriate stream or substream, specify the corresponding channel path in the `Arguments passed to ffmpeg for cameras` field. The channel path identifies the specific stream or substream of the camera.

- Example: If you want to use the camera's substream, you can specify the channel path as `/Streaming/Channels/102`. Alternatively, if you prefer the main stream, use `/Streaming/Channels/101`. You can also configure multiple stream/substream options based on your camera's capabilities and resource requirements.

- Cameras typically default to the main stream if this is invalid or not specified.

- Please note this only works on the camera entities.

### Action `ezviz.alarm_sound`

If your EZVIZ camera supports warning sounds, you can use this action to set the intensity.

| Data attribute | Description                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`            | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `level`                | Set the sound level to 0 for Soft, 1 for Intensive or 2 to disable                                   |

### Action `ezviz.ptz`

If your EZVIZ camera supports <abbr title="pan, tilt, and zoom">PTZ</abbr>, you will be able to pan or tilt your camera.

| Data attribute | Description                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`            | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `direction`            | Direction of the movement. Allowed values: `up`, `down`, `left`, `right`                             |
| `speed`                | (Optional) Speed to in which to move the camera. Allowed values: int from 1 to 9. Default: 5         |

### Action `ezviz.set_alarm_detection_sensibility`

If your EZVIZ camera supports motion detection, you will be able to set the sensitivity level using this action.

| Data attribute | Description                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`            | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `level`                | Sensibility level (1-6) for type 0 (Normal camera) or (1-100) for type 3 (PIR sensor camera).        |
| `type_value`           | Type of detection. Options : 0 - Camera or 3 - PIR Sensor Camera.                                    |

### Action `ezviz.sound_alarm`

If your EZVIZ camera has a built-in siren, you can use this action to make a noise.

| Data attribute | Description                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`            | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |
| `enable`               | Sound the alarm by setting this to 1 or stop the siren by setting this to 0.                         |

### Action `ezviz.wake_device`

If you have "sleep" mode enabled on your camera, you can use this action to wake it. Especially useful for battery cameras.

| Data attribute | Description                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`            | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |

To enable/disable motion detection, use the Home Assistant built in actions. 

### Action `camera.enable_motion_detection`

| Data attribute | Description                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`            | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |

### Action `camera.disable_motion_detection`

| Data attribute | Description                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `entity_id`            | String or list of strings that point at `entity_id`s of cameras. Use `entity_id: all` to target all. |

### Alarm control panel entity

The Alarm control panel entity in the EZVIZ platform allows users to manage and control the armed status of all their EZVIZ devices. With this entity, users can choose between three options: **Arm Away**, **Arm Sleep**, and **Disarm**.

### OTA update

Trigger device OTA firmware update process for latest stable version.

### Motion detection sensitivity

The motion detection sensitivity can be adjusted using the "Detection sensitivity" Number entity. It's important to note that this entity fetches information from the device and will not update if your battery-powered camera is in sleep mode, as this measure is implemented to preserve battery life and prevent excessive drainage.

### Siren

The Siren entity allows you to activate the Alarm function on the device. In most cameras, the Alarm function incorporates a strobe light and/or an audible siren that is designed to deter potential intruders.
Once triggered, the siren will automatically deactivate after 60 seconds (EZVIZ does this, not done via integration). Alternatively, you can manually deactivate the siren by using the entity.

### PTZ

<abbr title="pan, tilt, and zoom">PTZ</abbr> up/down/left/right buttons are available on supported <abbr title="pan, tilt, and zoom">PTZ</abbr> cameras for pan and tilt control.

### Warning sound

If your camera supports motion detection warning sounds, you can use this entity to select the level.

### Light entity

A light entity will be added to cameras + light combos. You can turn it on/off and set the brightness.

### Image entity

The image entity represents the last detected event from a camera and visually represents the event within Home Assistant.

## Troubleshooting

- `authentication failed`: The authentication requires an EZVIZ account with two-step verification disabled. Google, Facebook, TikTok, or other Oauth-based accounts will not work.
