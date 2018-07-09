---
layout: page
title: "Horizontal Stack Card"
sidebar_label: Horizontal Stack
description: "Horizontal stack card will allow you to stack together multiple cards so they always sit next to each other in the space of one column."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

Horizontal stack card will allow you to stack together multiple cards, so they always sit next to each other in the space of one column.

{% configuration %}
type:
  required: true
  description: horizontal-stack
  type: string
cards:
  required: true
  description: List of cards.
  type: list
  keys:
    type:
      required: true
      description: The type of the card to stack.
      type: string
    entity:
      required: true
      description: "An `entity_id` to use in the frontend."
      type: string
    image:
      required: true
      description: The URL to an image.
      type: string
{% endconfiguration %}

## {% linkable_title Example %}

```yaml
- type: horizontal-stack
  cards:
    - type: picture-entity
      image: https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=240&w=495
      entity: light.ceiling_lights
    - type: picture-entity
      image: https://images.pexels.com/photos/545012/pexels-photo-545012.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=240&w=495
      entity: light.bed_light
```

<p class='img'>
<img src='/images/lovelace/lovelace_horizontal_stack.PNG' alt='Screenshot of the 2 cards in a horizontal stack card'>
Screenshot of the 2 cards in a horizontal stack card.
</p>
