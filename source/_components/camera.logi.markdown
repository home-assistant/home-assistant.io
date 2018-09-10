---
layout: page
title: "Logi Camera"
description: "Instructions on how to integrate your Logi Circle cameras within Home Assistant."
date: 2018-09-08 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: logi.png
ha_category: Camera
ha_release: 0.78
ha_iot_class: "Cloud Polling"
---

The `logi` camera platform allows you to watch the still frames of your [Logi Circle](https://circle.logi.com/) camera's live stream in Home Assistant.

<p class='note'>
You must have the [Logi component](/components/logi/) configured to use this camera platform.
</p>

Logi Circle cameras support the `camera.turn_on` and `camera.turn_off` services. This will set the streaming mode property of your camera accordingly, controlling whether the live stream is available and automatic activity records are captured.

## {% linkable_title Configuration %}

Once you have enabled the [Logi component](/components/logi), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: logi
```

Configuration variables:

- **scan_interval**: (*Optional*): How frequently to query for new camera stills. Defaults to 60 seconds.

### {% linkable_title Service `camera.logi_livestream_record` %}

Initiates a recording of the camera's live stream. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to initiate a recording for, e.g., `camera.living_room_camera`. If blank, targets all logi cameras. |
| `filename `            |      no  | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/snapshot_{{ entity_id }}.mp4`{% endraw %}. |
| `duration`             |      no  | Duration of recording, in seconds.

The path part of `filename` must be an entry in the `whitelist_external_dirs` in your [`homeassistant:`](/docs/configuration/basic/) section of your `configuration.yaml` file.

### {% linkable_title Service `camera.logi_livestream_snapshot` %}

Take a snapshot from a camera's live stream. This differs from the generic [snapshot](/components/camera/#service-snapshot) service in that it sources the snapshot from the camera's live stream. For battery powered devices, this will wake your camera from sleep to perform this action.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to create a live stream snapshot from, e.g., `camera.living_room_camera`. If blank, targets all logi cameras. |
| `filename`             |      no  | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/snapshot_{{ entity_id }}.jpg`{% endraw %}. |

The path part of `filename` must be an entry in the `whitelist_external_dirs` in your [`homeassistant:`](/docs/configuration/basic/) section of your `configuration.yaml` file.

### {% linkable_title Service `camera.logi_set_config` %}

Sets an configuration property for your camera.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to set the operation mode for, e.g., `camera.living_room_camera`. If blank, targets all logi cameras. |
| `mode`                 |      no  | Configuration property to set. Allowed values: `BATTERY_SAVING`, `LED`, `PRIVACY_MODE` |
| `value`                |      no  | Mode value. Allowed values: `true`, `false` |