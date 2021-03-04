---
title: "Grid Card"
sidebar_label: Grid
description: "The Grid card allows you to show multiple cards in a grid."
---

The Grid card allows you to show multiple cards in a grid. It will first fill the columns, automatically adding new rows as needed.

<p class='img'>
  <img src='/images/lovelace/lovelace_grid.png' alt='Screenshot of the grid card'>
  Screenshot of the Grid card.
</p>

To add the Grid card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Grid Card** from the card picker.

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

Alternatively, the card can be configured using YAML:

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
