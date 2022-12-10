---
type: card
title: "Vertical Stack Card"
sidebar_label: Vertical Stack
description: "The Vertical Stack card allows you to group multiple cards so they always sit in the same column."
---

The Vertical Stack card allows you to group multiple cards so they always sit in the same column.

To add the Vertical Stack card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Vertical Stack** from the card picker. All options for this card can be configured via the user interface.

{% configuration %}
type:
  required: true
  description: "`vertical-stack`"
  type: string
title:
  required: false
  description: Title of stack.
  type: string
cards:
  required: true
  description: List of cards.
  type: list
{% endconfiguration %}

## Examples

Alternatively, the card can be configured using YAML:

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
  <img src="/images/dashboards/vertical-stack.png" alt="Picture- and entities-card in a stack">
  Picture and entities-card in a stack.
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
  <img src="/images/dashboards/vertical-horizontal-stack.png" alt="Create a grid layout using vertical and horizontal stack">
  Create a grid layout using vertical and horizontal stack.
</p>
