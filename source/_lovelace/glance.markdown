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
theme:
  required: false
  description: "Set to any theme within `themes.yaml`"
  type: string
columns:
  required: false
  description: Number of columns to show. If not specified the number will be set automatically.
  type: integer
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
  description: Action to take on tap
  type: object
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g. `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    service:
      required: false
      description: "Service to call (e.g. `media_player.media_play_pause`) when `action` defined as `call-service`"
      type: string
      default: none
    service_data:
      required: false
      description: "Service data to include (e.g. `entity_id: media_player.bedroom`) when `action` defined as `call-service`"
      type: string
      default: none
hold_action:
  required: false
  description: Action to take on tap-and-hold
  type: object
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g. `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    service:
      required: false
      description: "Service to call (e.g. `media_player.media_play_pause`) when `action` defined as `call-service`"
      type: string
      default: none
    service_data:
      required: false
      description: "Service data to include (e.g. `entity_id: media_player.bedroom`) when `action` defined as `call-service`"
      type: string
      default: none
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
    - entity: switch.wall_plug_switch
      tap_action:
        action: toggle
```
