---
title: "Picture Glance Card"
sidebar_label: Picture Glance
description: "The Picture Glance card shows an image and corresponding entity states as an icon. The entities on the right side allow toggle actions, others show the more information dialog."
---

The Picture Glance card shows an image and corresponding entity states as an icon. The entities on the right side allow toggle actions, others show the more information dialog.

<p class='img'>
  <img src='/images/lovelace/lovelace_picture_glance.gif' alt='Picture glance card for a living room'>
  Picture glance card for a living room.
</p>

{% configuration %}
type:
  required: true
  description: "`picture-glance`"
  type: string
entities:
  required: true
  description: List of entities or entity objects.
  type: list
title:
  required: false
  description: The card title.
  type: string
image:
  required: true
  description: Background image URL.
  type: string
camera_image:
  required: false
  description: Camera entity as Background image.
  type: string
camera_view:
  required: false
  description: '"live" will show the live view if `stream` is enabled.'
  default: auto
  type: string
state_image:
  required: false
  description: Background image based on entity state.
  type: map
  keys:
    state:
      type: string
      required: false
      description: "`state: image-url`, check the example below."
state_filter:
  required: false
  description: '[State-based CSS filters](#how-to-use-state_filter)'
  type: map
aspect_ratio:
  required: false
  description: "Forces the height of the image to be a ratio of the width. You may enter a value such as: `16x9`, `16:9`, `1.78`."
  type: string
entity:
  required: false
  description: Entity to use for `state_image` and `state_filter`.
  type: string
show_state:
  required: false
  description: Show entity state text.
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
  description: Action taken on card double tap. See [action documentation](/lovelace/actions/).
  type: map
{% endconfiguration %}

## Options For Entities

If you define entities as objects instead of strings, you can add more customization and configuration:

{% configuration %}
entity:
  required: true
  description: Entity ID.
  type: string
attribute:
  required: false
  description: Attribute of the entity to display instead of the state.
  type: string
prefix:
  required: false
  description: Prefix to display before the attribute's value.
  type: string
suffix:
  required: false
  description: Suffix to display after the attribute's value.
  type: string
icon:
  required: false
  description: Overwrites default icon.
  type: string
show_state:
  required: false
  description: Show entity state text.
  type: boolean
  default: true
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

## Options For Exemptions

{% configuration badges %}
user:
  required: true
  description: User ID that can see the view tab.
  type: string
{% endconfiguration %}

## How to use state_filter

Specify different [CSS filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

```yaml
state_filter:
  "on": brightness(110%) saturate(1.2)
  "off": brightness(50%) hue-rotate(45deg)
entity: switch.decorative_lights
```

## Examples

```yaml
type: picture-glance
title: Living room
entities:
  - switch.decorative_lights
  - light.ceiling_lights
  - lock.front_door
  - binary_sensor.movement_backyard
  - binary_sensor.basement_floor_wet
image: /local/living_room.png
```

Display a camera image as background:

```yaml
type: picture-glance
title: Living room
entities:
  - switch.decorative_lights
  - light.ceiling_lights
camera_image: camera.demo_camera
```

Display a camera image without additional entities:

```yaml
type: picture-glance
title: Front garden
entities: []
camera_image: camera.front_garden_camera
```

Use different images based on entity state:

```yaml
type: picture-glance
title: Living room
entities:
  - switch.decorative_lights
  - light.ceiling_lights
state_image:
  "on": /local/living_room_on.png
  "off": /local/living_room_off.png
entity: group.living.room
```
