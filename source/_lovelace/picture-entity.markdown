---
layout: page
title: Picture Entity Card
sidebar_label: Picture Entity
description: Displays the entity in form of an image. Instead of images from URL it can also show the picture of `camera` entities.
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

Displays the entity in form of an image. Instead of images from URL it can also show the picture of `camera` entities.

<p class='img'>
  <img src='/images/lovelace/lovelace_picture_entity.gif' alt='Picture entity card'>
  Background changes according to the entity state.
</p>

{% configuration %}
type:
  required: true
  description: picture-entity
  type: string
entity:
  required: true
  description: "An `entity_id` used for the picture."
  type: string
camera_image:
  required: false
  description: "Camera `entity_id` to use. (not required if `entity` is already a camera-entity)."
  type: string
image:
  required: false
  description: URL of an image.
  type: string
state_image:
  required: false
  description: "Map entity states to images (`state: image URL`, check the example below)."
  type: object
aspect_ratio:
  required: false
  description: "Forces the height of the image to be a ratio of the width. You may enter a value such as: `16x9`, `16:9`, `1.78`."
  type: string
name:
  required: false
  description: Overwrite entity name.
  type: string
show_name:
  required: false
  description: Shows name in footer.
  type: boolean
  default: true
show_state:
  required: false
  description: Shows state in footer.
  type: boolean
  default: true
tap_action:
  required: false
  description: "Set to `toggle` for turning entity on/off."
  type: string
  default: more-info
{% endconfiguration %}

## {% linkable_title Examples %}

Basic example:

```yaml
- type: picture-entity
  entity: light.bed_light
  image: /local/bed_light.png
```

Different images for each state:

```yaml
- type: picture-entity
  entity: light.bed_light
  state_image:
    "on": /local/bed_light_on.png
    "off": /local/bed_light_off.png
```
