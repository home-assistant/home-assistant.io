---
layout: page
title: "Horizontal Stack Card"
sidebar_label: Horizontal Stack
description: "Horizontal stack card allows you to stack together multiple cards, so they always sit next to each other in the space of one column."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

Horizontal stack card allows you to stack together multiple cards, so they always sit next to each other in the space of one column.

{% configuration %}
type:
  required: true
  description: horizontal-stack
  type: string
cards:
  required: true
  description: List of cards.
  type: list
{% endconfiguration %}

## {% linkable_title Example %}

```yaml
- type: horizontal-stack
  cards:
    - type: picture-entity
      image: /local/bed_1.png
      entity: light.ceiling_lights
    - type: picture-entity
      image: /local/bed_2.png
      entity: light.bed_light
```

<p class='img'>
  <img src='/images/lovelace/lovelace_horizontal_stack.PNG' alt='Two picture cards in a horizontal stack card'>
  Two picture cards in a horizontal stack card.
</p>
