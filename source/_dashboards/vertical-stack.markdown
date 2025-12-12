---
type: card
title: "Vertical stack card"
sidebar_label: Vertical stack
description: "The vertical stack card allows you to group multiple cards so they always sit in the same column."
related:
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The vertical stack card allows you to group multiple cards so they always sit in the same column.

<p class='img'>
<img src='/images/dashboards/edit-dashboard.webp' alt='Screencast showing how to edit a dashboard customize a vertical stack card'>
Screencast showing how to edit a dashboard and customize a vertical stack card.
</p>

{% include dashboard/edit_dashboard.md %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

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

