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

A card that allows you to display entities on a map

<p class='img'>
<img src='/images/lovelace/lovelace_map_card.png' alt='Screenshot of the map card'>
Screenshot of the map card.
</p>

## {% linkable_title Options %}

{% configuration %}
type:
  required: true
  description: "`map`"
  type: string
entities:
  required: true
  description: "Entity id's or an `entity` object (see structure below)."
  type: list
title:
  required: false
  description: Card title
  type: string
aspect_ratio: 
  required: false
  description: "Map height:width ratio"
  type: string
  default: 100%
{% endconfiguration %}

`entity` object:

{% configuration %}
entity:
  required: true
  description: "An entity_id. Example: 'device_tracker.demo_paulus'."
  type: string
{% endconfiguration %}

<p class='note'>
  Only entities that have latitude and longitude attributes will be displayed on the map
</p>


## {% linkable_title Examples %}

```yaml
- type: map
  aspect_ratio: 100%
  entities:
    - entity: device_tracker.demo_paulus
    - zone.home
```
