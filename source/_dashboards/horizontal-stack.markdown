---
type: card
title: "Horizontal stack card"
sidebar_label: Horizontal stack
description: "The horizontal stack card allows you to stack together multiple cards, so they always sit next to each other in the space of one column."
related:
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The horizontal stack card allows you to stack together multiple cards, so they always sit next to each other in the space of one column.

{% include dashboard/edit_dashboard.md %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`horizontal-stack`"
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

### Example

```yaml
type: horizontal-stack
title: Lights
cards:
  - type: picture-entity
    image: /local/bed_1.png
    entity: light.ceiling_lights
  - type: picture-entity
    image: /local/bed_2.png
    entity: light.bed_light
```

<p class='img'>
  <img src='/images/dashboards/horizontal_stack.png' alt='Two picture cards in a horizontal stack card'>
  Two picture cards in a horizontal stack card.
</p>
