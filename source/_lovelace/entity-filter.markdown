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

This type of card can also be used together with rest of cards that allow multiple entities, allowing you to use [glance](card-glance.md) or [picture-glance](card-picture-glance.md). By default it uses [entities](card-entities.md) card model.

![entity-filter-entity](https://user-images.githubusercontent.com/7738048/41776696-686e976e-7631-11e8-95bb-bb69a9494c7d.png)

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

Show only people that are at home using [glance](card-glance.md):
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

![entity-filter](https://user-images.githubusercontent.com/7738048/41775896-71d42556-762e-11e8-8b02-d75c7824300a.png)
