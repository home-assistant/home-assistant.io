---
layout: page
title: "Map Card"
sidebar_label: Map
description: "A card that allows you to display entities on a map"
date: 2018-07-08 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

A card that allows you to display entities on a map.

<p class='img'>
<img src='/images/lovelace/lovelace_map_card.png' alt='Screenshot of the map card'>
Screenshot of the map card.
</p>

{% configuration %}
type:
  required: true
  description: map
  type: string
entities:
  required: true
  description: List of entity IDs.
  type: list
  keys:
    entity:
      required: true
      description: "An `entity_id` to use."
      type: string
title:
  required: false
  description: The card title.
  type: string
aspect_ratio: 
  required: false
  description: "The map's height:width ratio."
  type: string
  default: "100%"
default_zoom:
  required: false
  description: The default zoom level of the map.
  type: integer
  default: 14 (or whatever zoom level is required to fit all visible markers)
{% endconfiguration %}

<p class='note'>
  Only entities that have latitude and longitude attributes will be displayed on the map.
</p>

<p class="note">
  The `default_zoom` value will be ignored if it is set higher than the current zoom level
  after fitting all visible entity markers in the map window. In other words, this can only 
  be used to zoom the map _out_ by default.
</p>

## {% linkable_title Examples %}

```yaml
- type: map
  aspect_ratio: 100%
  default_zoom: 8
  entities:
    - device_tracker.demo_paulus
    - zone.home
```
