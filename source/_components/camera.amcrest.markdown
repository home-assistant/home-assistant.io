---
layout: page
title: "Amcrest IP Camera"
description: "Instructions on how to integrate Amcrest IP cameras within Home Assistant."
date: 2016-11-24 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: amcrest.png
ha_category: Camera
ha_iot_class: "Local Polling"
ha_release: 0.34
---

To get your [Amcrest](https://amcrest.com/) cameras working within Home Assistant, please follow the instructions for the general [Amcrest component](/components/amcrest).

## {% linkable_title Configuration %}

Once you have enabled the [Amcrest component](/components/amcrest), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: amcrest
```

To check if your Amcrest camera is supported/tested, visit the [supportability matrix](https://github.com/tchellomello/python-amcrest#supportability-matrix) link from the `python-amcrest` project.

### {% linkable_title Service `amcrest_enable_recording` %}

Enable recording.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String of the `entity_id` of the camera. |

### {% linkable_title Service `amcrest_disable_recording` %}

Disable recording.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String of the `entity_id` of the camera. |

### {% linkable_title Service `amcrest_goto_preset` %}

Go to a preset.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String of the `entity_id` of the camera. |
| `preset` | Preset id. |

### {% linkable_title Service `amcrest_set_color_bw` %}

Set color mode.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String of the `entity_id` of the camera. |
| `color_bw` | True or Talse. |

### {% linkable_title Service `amcrest_audio_on` %}

Turn on audio.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String of the `entity_id` of the camera. |

### {% linkable_title Service `amcrest_audio_off` %}

Turn off audio.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String of the `entity_id` of the camera. |

### {% linkable_title Service `amcrest_mask_on` %}

Turn on mask.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String of the `entity_id` of the camera. |

### {% linkable_title Service `amcrest_mask_off` %}

Turn off mask.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String of the `entity_id` of the camera. |

### {% linkable_title Service `amcrest_tour_on` %}

Turn on touring.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String of the `entity_id` of the camera. |

### {% linkable_title Service `amcrest_tour_off` %}

Turn off touring.

| Service data attribute | Description |
| -----------------------| ----------- |
| `entity_id` | String of the `entity_id` of the camera. |
