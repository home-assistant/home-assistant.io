---
layout: page
title: "Vertical Stack Card"
sidebar_label: Vertical Stack
description: "The Vertical Stack card allows you to stack multiple cards together"
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

Stack card will allow you to stack together multiple cards so they always sit together in the same column one on top of the other. Keep in mind this can be used with any cards and even used alongside a [horizontal-stack](/lovelace/horizontal-stack/).

## {% linkable_title Options %}

{% configuration %}
type:
  required: true
  description: vertical-stack
  type: string
cards:
  required: true
  description: List of cards
  type: list
{% endconfiguration %}

## {% linkable_title Example %}

Basic example

```yaml
- type: vertical-stack
  cards:
    - type: picture-entity
      entity: camera.demo_camera
      show_info: false
    - type: entities
      entities:
        - binary_sensor.movement_backyard
```

<p class='img'>
<img src='/images/lovelace/lovelace_vertical-stack.png' alt='Screenshot of the vertical stack card'>
Screenshot of the vertical stack card.
</p>

Example using both a vertical and horizontal stack card.

```yaml
- type: vertical-stack
  cards:
    - type: picture-entity
      entity: group.all_lights
      image:  https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
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
<img src='/images/lovelace/lovelace_vertical-horizontal-stack.png' alt='Screenshot of the vertical stack and horizontal stack combined in a card'>
Screenshot of the vertical stack and horizontal stack combined in a card.
</p>
