---
title: "Vertical Stack Card"
sidebar_label: Vertical Stack
description: "The Vertical Stack card allows you to group multiple cards so they always sit in the same column."
---

The Vertical Stack card allows you to group multiple cards so they always sit in the same column.

{% configuration %}
type:
  required: true
  description: vertical-stack
  type: string
title:
  required: false
  description: Title of Stack
  type: string
cards:
  required: true
  description: List of cards.
  type: list
{% endconfiguration %}

### Examples

Basic example:

```yaml
type: vertical-stack
title: Backyard
cards:
  - type: picture-entity
    entity: camera.demo_camera
    show_info: false
  - type: entities
    entities:
      - binary_sensor.movement_backyard
```

<p class="img">
  <img src="/images/lovelace/lovelace_vertical-stack.png" alt="Picture- and entities-card in a stack">
  Picture- and entities-card in a stack.
</p>

Combination of vertical and horizontal stack card:

```yaml
type: vertical-stack
cards:
  - type: picture-entity
    entity: group.all_lights
    image:  /local/house.png
  - type: horizontal-stack
    cards:
      - type: picture-entity
        entity: light.ceiling_lights
        image: /local/bed_1.png
      - type: picture-entity
        entity: light.bed_light
        image: /local/bed_2.png
```

<p class="img">
  <img src="/images/lovelace/lovelace_vertical-horizontal-stack.png" alt="Create a grid layout using vertical and horizontal stack">
  Create a grid layout using vertical and horizontal stack.
</p>
