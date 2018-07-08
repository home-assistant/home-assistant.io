---
layout: page
title: "Glance Card"
sidebar_label: Glance
description: "The Glance card allows you to see a list of entities at a glance."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

### Glance

Glance cards are a very compact. Very useful to group together multiple sensors for a quick and easy to use view. Keep in mind that this can be used together with [entity-filter](/lovelace/entity-filter/) cards to create dynamic cards.

<p class='img'>
<img src='/images/lovelace/lovelace_glance_card.png' alt='Screenshot of the glance card'>
Screenshot of the glance card.
</p>

**Options**

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `glance`
| entities | list | **Required** | Entity id's or an `entity` object (see structure below).
| title | string | Optional | Card title

`entity` object type

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| entity | string | **Required** | An entity_id. Example: 'device_tracker.demo_paulus'.
| name | string | **Required** | A new name for the entity_id

**Examples**

Basic example

```yaml
- type: glance
  title: Glance card sample
  entities:
    - binary_sensor.movement_backyard
    - light.bed_light
    - binary_sensor.basement_floor_wet
    - sensor.outside_temperature
    - light.ceiling_lights
    - switch.ac
    - lock.kitchen_door
```

<p class='img'>
<img src='/images/lovelace/lovelace_glance_card.png' alt='Screenshot of the glance card with custom title'>
Screenshot of the glance card with custom title.
</p>

Example with custom name

```yaml
- type: glance
  title: Better names
  entities:
    - entity: binary_sensor.movement_backyard
      name: Movement?
    - light.bed_light
    - binary_sensor.basement_floor_wet
    - sensor.outside_temperature
    - light.ceiling_lights
    - switch.ac
    - lock.kitchen_door
```
