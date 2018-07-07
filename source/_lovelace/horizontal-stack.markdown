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
### Horizontal stack

Horizontal stack card will allow you to stack together multiple cards so they always sit next to each other in the space of one column.

**Options**

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `horizontal-stack`
| cards | list | **Required** | List of cards

**Example**

Basic example

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
<img src='/images/lovelace/lovelace_horizontal_stack.PNG' alt='Screenshot of the 2 cards in a horizontal stack card>
Screenshot of the 2 cards in a horizontal stack card.
</p>
