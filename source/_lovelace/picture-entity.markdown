---
title: Picture Entity Card
sidebar_label: Picture Entity
description: The Picture Entity card displays an entity in the form of an image. Instead of images from URL, it can also show the picture of camera entities.
---

The Picture Entity card displays an entity in the form of an image. Instead of images from URL, it can also show the picture of `camera` entities.

<p class='img'>
  <img src='/images/lovelace/lovelace_picture_entity.gif' alt='Picture entity card'>
  Background changes according to the entity state.
</p>

{% configuration %}
type:
  required: true
  description: "`picture-entity`"
  type: string
entity:
  required: true
  description: "An `entity_id` used for the picture."
  type: string
camera_image:
  required: false
  description: "Camera `entity_id` to use. (not required if `entity` is already a camera-entity)."
  type: string
camera_view:
  required: false
  description: '"live" will show the live view if `stream` is enabled.'
  default: auto
  type: string
image:
  required: false
  description: URL of an image. To use a locally hosted image, see [Hosting](/integrations/http#hosting-files).
  type: string
state_image:
  required: false
  description: "Map entity states to images (`state: image URL`, check the example below)."
  type: map
state_filter:
  required: false
  description: '[State-based CSS filters](#how-to-use-state_filter)'
  type: map
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
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/lovelace/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/lovelace/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/lovelace/actions/#double-tap-action).
  type: map
{% endconfiguration %}

## How to use state_filter

Specify different [CSS filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

```yaml
state_filter:
  "on": brightness(110%) saturate(1.2)
  "off": brightness(50%) hue-rotate(45deg)
```

## Examples

Basic example:

```yaml
type: picture-entity
entity: light.bed_light
image: /local/bed_light.png
```

Different images for each state:

```yaml
type: picture-entity
entity: light.bed_light
state_image:
  "on": /local/bed_light_on.png
  "off": /local/bed_light_off.png
```

Displaying a live feed from an FFmpeg camera:

{% raw %}

```yaml
type: picture-entity
entity: camera.backdoor
camera_view: live
tap_action:
  action: call-service
  service: camera.snapshot
  service_data:
    entity_id: camera.backdoor
    filename: '/shared/backdoor-{{ now().strftime("%Y-%m-%d-%H%M%S") }}.jpg'
```

{% endraw %}

The filename needs to be a path that is writable by Home Assistant in your system. You may need to configure `allowlist_external_dirs` ([documentation](/docs/configuration/basic/)).
