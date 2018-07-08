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

**Options**

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `map`
| entities | list | **Required** | A list of entities to display on the map. Can be entity_ids or entity objects (see structure below).
| title | string | Optional | Card title
| aspect_ratio | string | `"100%"` | Map height:width ratio

`entity` object

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| entity | string | **Required** | An entity_id. Example: 'device_tracker.demo_paulus'.

<p class='note'>
  Only entities that have latitude and longitude attributes will be displayed on the map
</p>


**Examples**

Basic map example:

```yaml
- type: map
  aspect_ratio: 100%
  entities:
    - entity: device_tracker.demo_paulus
    - group.home
```
