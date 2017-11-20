---
layout: page
title: "Camera"
description: "Instructions how to integrate cameras within Home Assistant."
date: 2015-11-09 08:36
sidebar: true
comments: false
sharing: true
footer: true
---


The camera component allows you to use IP cameras with Home Assistant. With a little additional work you could use [USB cameras](/blog/2016/06/23/usb-webcams-and-home-assistant/) as well.

### {% linkable_title Service %}

Once loaded, the `camera` platform will expose services that can be called to perform various actions.

Available services: `enable_motion_detection`, `disable_motion_detection`, and `snapshot`.

#### {% linkable_title Service `enable_motion_detection` %}

Enable the motion detection in a camera.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name(s) of entities to enable motion detection, e.g., `camera.living_room_camera`. |

#### {% linkable_title Service `disable_motion_detection` %}

Disable the motion detection in a camera.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name(s) of entities to disable motion detection, e.g., `camera.living_room_camera`. |

#### {% linkable_title Service `snapshot` %}

Take a snapshot from a camera.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name(s) of entities to create a snopshot from, e.g., `camera.living_room_camera`. |
| `filename `            |      no  | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/snapshot_{{ entity_id }}`{% endraw %}. |

The path part of `filename` must be an entry in the `whitelist_external_dirs` in your [`homeassistant:`](/docs/configuration/basic/) section of your `configuration.yaml` file.

### {% linkable_title Test if it works %}

A simple way to test if you have set up your `camera` platform correctly, is to use <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services** from the **Developer Tools**. Choose your service from the dropdown menu **Service**, enter something like the sample below into the **Service Data** field, and hit **CALL SERVICE**.

```json
{
  "entity_id": "camera.living_room_camera"
}
```

