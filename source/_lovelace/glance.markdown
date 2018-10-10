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

Glance cards are very compact. Very useful to group together multiple sensors for a quick and easy overview. Keep in mind that this can be used together with [entity-filter](/lovelace/entity-filter/) cards to create dynamic cards.

<p class='img'>
<img src='/images/lovelace/lovelace_glance_card.png' alt='Screenshot of the glance card'>
Screenshot of the glance card.
</p>

{% configuration %}
type:
  required: true
  description: glance
  type: string
entities:
  required: true
  description: "A list of entity IDs or `entity` objects, see below."
  type: list
title:
  required: false
  description: Card title
  type: string
show_name:
  required: false
  description: Show entity names.
  type: boolean
  default: "true"
show_state:
  required: false
  description: Show entity state-text.
  type: boolean
  default: "true"
column_width:
  required: false
  description: "Column width as CSS length like `100px` or `calc(100% / 7)`. This controls how many entities appear in a row - at the default 20% you have 5 entities in a row. Use `calc(100% / 7)` for 7 entities in a row, and so on."
  type: string
  default: 20%
theming:
  required: false
  description: "Set to `primary` to style the card with the background and text color of the header bar."
  type: string
{% endconfiguration %}

## {% linkable_title Options For Entities %}

If you define entities as objects instead of strings, you can add more customization and configuration:

{% configuration %}
entity:
  required: true
  description: Home Assistant entity ID.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
icon:
  required: false
  description: Overwrites icon or entity picture.
  type: string
tap_action:
  required: false
  description: "Set to `toggle` or `call-service` for direct actions."
  type: string
  default: more-info
service:
  required: false
  description: "For `call-service`, e.g. `media_player.media_play_pause`"
  type: string
service_data:
  required: false
  description: The service data to use.
  type: object
  default: "entity_id: entity_id"
{% endconfiguration %}

## {% linkable_title Examples %}

Basic example:

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

Define entities as objects and apply a custom name:

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
