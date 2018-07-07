---
layout: page
title: "Entity Filter Card"
sidebar_label: Entity Filter
description: "This card allows you to define a list of entities that you want to track only when in a certain state. Very useful for showing lights that you forgot to turn off or show a list of people only when they're at home. "
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

### Entity filter

This card allows you to define a list of entities that you want to track only when in a certain state. Very useful for showing lights that you forgot to turn off or show a list of people only when they're at home. 

This type of card can also be used together with rest of cards that allow multiple entities, allowing you to use [glance](/lovelace/glance/) or [picture-glance](/lovelace/picture-glance/). By default it uses [entities](/lovelace/entities/) card model.

<p class='img'>
<img src='/images/lovelace/lovelace_entity_filter.png' alt='Screenshot of the entity filter card'>
Screenshot of the entity filter card.
</p>

**Options**

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `entity-filter`
| entities | array | **Required** | Array of entity_ids
| state_filter | array | **Required** | Array of strings representing states
| card | object | `entities` type | Extra options to pass down to the card rendering the result.
| show_empty | boolean | true | Allows hiding of card when no entities returned by filter.

**Examples**

Show only active switches or lights in the house
```yaml
- type: entity-filter
  entities:
    - entity: light.bed_light
      name: Bed
    - light.kitchen_lights
    - light.ceiling_lights
  state_filter:
    - 'on'
  card:
    title: Eating power
```

Show only people that are at home using [glance](/lovelace/glance/):

```yaml
- type: entity-filter
  entities:
    - device_tracker.demo_paulus
    - device_tracker.demo_anne_therese
    - device_tracker.demo_home_boy
  state_filter:
    - 'home'
  card: 
    type: glance
    title: People at home
```

<p class='img'>
<img src='/images/lovelace/lovelace_entity_filter_glance.png' alt='Screenshot of the entity filter used on a Glance card'>
Screenshot of the entity filter used on a Glance card.
</p>
