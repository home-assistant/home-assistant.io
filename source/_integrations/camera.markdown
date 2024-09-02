---
title: Camera
description: Instructions on how to integrate cameras within Home Assistant.
ha_category:
  - Camera
  - Media source
ha_release: 0.7
ha_quality_scale: internal
ha_domain: camera
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
ha_platforms:
  - diagnostics
---

The camera integration allows you to use IP cameras with Home Assistant.

{% include integrations/building_block_integration.md %}

### Streaming video

If your camera supports it, and the [`stream`](/integrations/stream) integration is setup, you will be able to stream your cameras in the frontend and on supported media players.

The `Preload stream` option will start the camera feed on Home Assistant startup and continue to keep the stream alive. This will result in reduced latency when opening the stream in the frontend, as well as when using the `play_stream` action or Google Assistant integration. It does, however, utilize more resources on your machine, so it is recommended to check CPU usage if you plan to use this feature.

<p class='img'>
  <img src='/images/integrations/camera/preload-stream.png' alt='Screenshot showing Preload Stream option in Home Assistant front end.'>
  Example showing the Preload Stream option in the camera dialog.
</p>

### Actions

Once loaded, the `camera` platform will expose actions that can be called to perform various actions.

Available actions: `enable_motion_detection`, `disable_motion_detection`, `play_stream`, `record`, `snapshot`, `turn_off` and `turn_on`.

#### Action `enable_motion_detection`

Enable the motion detection in a camera.

| Data attribute | Optional | Description                                                                        |
| ---------------------- | -------- | ---------------------------------------------------------------------------------- |
| `entity_id`            | yes      | Name(s) of entities to enable motion detection, e.g., `camera.living_room_camera`. |

#### Action `disable_motion_detection`

Disable the motion detection in a camera.

| Data attribute | Optional | Description                                                                         |
| ---------------------- | -------- | ----------------------------------------------------------------------------------- |
| `entity_id`            | yes      | Name(s) of entities to disable motion detection, e.g., `camera.living_room_camera`. |

#### Action `play_stream`

Play a live stream from a camera to selected media player(s). Requires [`stream`](/integrations/stream) integration to be set up.

| Data attribute | Optional | Description                                                                                 |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | Name of entity to fetch stream from, e.g., `camera.living_room_camera`.                     |
| `media_player`         | no       | Name of media player to play stream on, e.g., `media_player.living_room_tv`.                |
| `format`               | yes      | Stream format supported by `stream` integration and selected `media_player`. Default: `hls` |

For example, the following action in an automation would send an `hls` live stream to your chromecast.

```yaml
action:
  action: camera.play_stream
  target:
    entity_id: camera.yourcamera
  data:
    media_player: media_player.chromecast
```

#### Action `record`

Make a `.mp4` recording from a camera stream. Requires `stream` integration to be set up.

Both `duration` and `lookback` options are suggestions, but should be consistent per camera.  The actual length of the recording may vary. It is suggested that you tweak these settings to fit your needs.

| Data attribute | Optional | Description                                                                                                                                    |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | Name(s) of entities to create a snapshot from, e.g., `camera.living_room_camera`.                                                              |
| `filename`             | no       | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/{{ entity_id.name }}.mp4`{% endraw %}.                                  |
| `duration`             | yes      | Target recording length (in seconds). Default: 30                                                                                              |
| `lookback`             | yes      | Target lookback period (in seconds) to include in addition to duration.  Only available if there is currently an active HLS stream. Default: 0 |

The path part of `filename` must be an entry in the `allowlist_external_dirs` in your [`homeassistant:`](/integrations/homeassistant/#allowlist_external_dirs) section of your {% term "`configuration.yaml`" %} file.

For example, the following action in an automation would take a recording from "yourcamera" and save it to /tmp with a timestamped filename.

{% raw %}

```yaml
action:
  action: camera.record
  target:
    entity_id: camera.yourcamera
  data:
    filename: '/tmp/{{ entity_id.name }}_{{ now().strftime("%Y%m%d-%H%M%S") }}.mp4'
```

{% endraw %}

#### Action `snapshot`

Take a snapshot from a camera.

| Data attribute | Optional | Description                                                                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `entity_id`            | no       | Name(s) of entities to create a snapshot from, e.g., `camera.living_room_camera`.                                  |
| `filename`             | no       | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/snapshot_{{ entity_id.name }}`{% endraw %}. |

The path part of `filename` must be an entry in the `allowlist_external_dirs` in your [`homeassistant:`](/integrations/homeassistant/) section of your {% term "`configuration.yaml`" %} file.

For example, the following action in an automation would take a snapshot from "yourcamera" and save it to /tmp with a timestamped filename.

{% raw %}

```yaml
action:
  action: camera.snapshot
  target:
    entity_id: camera.yourcamera
  data:
    filename: '/tmp/yourcamera_{{ now().strftime("%Y%m%d-%H%M%S") }}.jpg'
```

{% endraw %}

#### Action `turn_off`

Turn off camera. Not all camera models support this action, please consult individual camera page.

| Data attribute | Optional | Description                                                         |
| ---------------------- | -------- | ------------------------------------------------------------------- |
| `entity_id`            | yes      | Name(s) of entities to turn off, e.g., `camera.living_room_camera`. |

#### Action `turn_on`

Turn on camera. Not all camera models support this action, please consult individual camera page.

| Data attribute | Optional | Description                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------ |
| `entity_id`            | yes      | Name(s) of entities to turn on, e.g., `camera.living_room_camera`. |

### Test if it works

A way to test if you have set up your `camera` platform correctly, is to use **Actions** from the **Developer Tools**. Choose your action from the dropdown menu **Action**, enter something like the sample below into the **data** field, and select **Perform action**.

```yaml
entity_id: camera.living_room_camera
```
