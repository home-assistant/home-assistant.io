---
title: VIVOTEK
description: Instructions on how to integrate VIVOTEK cameras within Home Assistant.
ha_category:
  - Camera
ha_release: 0.99
ha_iot_class: Local Polling
ha_codeowners:
  - '@HarlemSquirrel'
ha_domain: vivotek
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **VIVOTEK** camera {% term integration %} allows you to integrate a VIVOTEK IP camera into Home Assistant.

Home Assistant will serve the images via its server, making it possible to view your IP cameras while outside of your network. The endpoint is `/api/camera_proxy/camera.[name]`.

## Configuration

To enable this camera in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
camera:
  - platform: vivotek
    ip_address: IP_ADDRESS
    username: USERNAME
    password: PASSWORD
```

{% configuration %}
ip_address:
  description: "The IP address of your camera, e.g., `192.168.1.2`."
  required: true
  type: string
name:
  description: This parameter allows you to override the name of your camera.
  required: false
  default: VIVOTEK Camera
  type: string
username:
  description: The username for accessing your camera.
  required: true
  type: string
password:
  description: The password for accessing your camera.
  required: true
  type: string
authentication:
  description: "Type for authenticating the requests `basic` or `digest`."
  required: false
  default: basic
  type: string
security_level:
  description: The security level of the user accessing your camera. This could be `admin` or `viewer`.
  required: false
  default: admin
  type: string
ssl:
  description: Enable or disable SSL. Set to false to use an HTTP-only camera.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Enable or disable SSL certificate verification. Set to false to use an HTTP-only camera, or you have a self-signed SSL certificate and haven't installed the CA certificate to enable verification.
  required: false
  default: true
  type: boolean
framerate:
  description: The number of frames-per-second (FPS) of the stream. Can cause heavy traffic on the network and/or heavy load on the camera.
  required: false
  default: 2
  type: integer
stream_path:
  description: This parameter allows you to override the stream path.
  required: false
  default: live.sdp
  type: string
{% endconfiguration %}

### Advanced configuration

```yaml
# Example configuration.yaml entry
camera:
  - platform: vivotek
    name: Front door camera
    ip_address: 192.168.1.2
    ssl: true
    username: !secret fd_camera_username
    password: !secret fd_camera_pwd
    authentication: digest
    security_level: admin
    verify_ssl: false
    framerate: 5
    stream_path: live2.sdp
```

### Actions

Once loaded, the `camera` platform will expose actions that can be called to perform various actions.

Available actions: `enable_motion_detection`, `disable_motion_detection`, `snapshot`, and `play_stream`.

#### Action `play_stream`

Play a live stream from a camera to selected media player(s). Requires [`stream`](/integrations/stream) {% term integration %} to be set up.

| Data attribute | Optional | Description                                                                                            |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `entity_id`            | no       | Name of {% term entity %} to fetch stream from, e.g., `camera.front_door_camera`.                      |
| `media_player`         | no       | Name of media player to play stream on, e.g., `media_player.living_room_tv`.                           |
| `format`               | yes      | Stream format supported by `stream` {% term integration %} and selected `media_player`. Default: `hls` |

For example, the following action in an automation would send an `hls` live stream to your chromecast.

```yaml
actions:
  - action: camera.play_stream
    target:
      entity_id: camera.yourcamera
    data:
      media_player: media_player.chromecast
```

#### Action `enable_motion_detection`

Enable motion detection in a camera. Currently, this will enable the first event configured on the camera.

| Data attribute | Optional | Description                                                                       |
| ---------------------- | -------- | --------------------------------------------------------------------------------- |
| `entity_id`            | yes      | Name(s) of entities to enable motion detection, e.g., `camera.front_door_camera`. |

#### Action `disable_motion_detection`

Disable the motion detection in a camera. Currently, this will disable the first event configured on the camera.

| Data attribute | Optional | Description                                                                        |
| ---------------------- | -------- | ---------------------------------------------------------------------------------- |
| `entity_id`            | yes      | Name(s) of entities to disable motion detection, e.g., `camera.front_door_camera`. |

#### Action `snapshot`

Take a snapshot from a camera.

| Data attribute | Optional | Description                                                                                                   |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | Name(s) of entities to create a snapshot from, e.g., `camera.front_door_camera`.                              |
| `filename`             | no       | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/snapshot_{{ entity_id }}`{% endraw %}. |

The path part of `filename` must be an entry in the `allowlist_external_dirs` in your [`homeassistant:`](/integrations/homeassistant/#allowlist_external_dirs) section of your `configuration.yaml` file.

For example, the following action is an automation that would take a snapshot from "front_door_camera" and save it to /tmp with a timestamped filename.

{% raw %}

```yaml
actions:
  - action: camera.snapshot
    target:
      entity_id: camera.front_door_camera
    data:
      filename: '/tmp/yourcamera_{{ now().strftime("%Y%m%d-%H%M%S") }}.jpg'
```

{% endraw %}
