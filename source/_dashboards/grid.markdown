---
type: card
title: "Grid card"
sidebar_label: Grid
description: "The grid card allows you to show multiple cards in a grid."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The grid card allows you to show multiple cards in a grid. It will first fill the columns, automatically adding new rows as needed.

<p class='img'>
  <img src='/images/dashboards/grid.png' alt='Screenshot of the grid card'>
  Screenshot of the grid card.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`grid`"
  type: string
title:
  required: false
  description: Title of grid.
  type: string
square:
  required: false
  description: Should the cards be shown square.
  type: boolean
  default: true
columns:
  required: false
  description: Number of columns in the grid.
  type: integer
  default: 3
cards:
  required: true
  description: List of cards.
  type: list
{% endconfiguration %}

## Examples

Basic example:

```yaml
type: grid
cards:
  - type: picture-entity
    entity: camera.demo_camera
    show_info: false
  - type: entities
    entities:
      - binary_sensor.movement_backyard
```

Defining columns and disabling the square option:

```yaml
type: grid
title: Backyard
columns: 2
square: false
cards:
  - type: picture-entity
    entity: group.all_lights
    image: /local/house.png
  - type: horizontal-stack
    cards:
      - type: picture-entity
        entity: light.ceiling_lights
        image: /local/bed_1.png
      - type: picture-entity
        entity: light.bed_light
        image: /local/bed_2.png
```
