---
title: "Glance Card"
sidebar_label: Glance
description: "The Glance card allows you to see a list of entities at a glance."
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
  description: Show entity name.
  type: boolean
  default: "true"
show_icon:
  required: false
  description: Show entity icon.
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

## Options For Entities

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
  description: Overwrites icon.
  type: string
image:
  required: false
  description: Overwrites entity picture.
  type: string
show_last_changed:
  required: false
  description: Overwrites the state display with the relative time since last changed.
  type: boolean
  default: false
show_state:
  required: false
  description: Show entity state-text.
  type: boolean
  default: true
tap_action:
  required: false
  description: Action to take on tap
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g. `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g. `https://www.home-assistant.io`) when `action` defined as `url`"
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
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below"
      type: [boolean, map]
      default: "false"
hold_action:
  required: false
  description: Action to take on tap-and-hold
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g. `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g. `https://www.home-assistant.io`) when `action` defined as `url`"
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
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below"
      type: [boolean, map]
      default: "false"
double_tap_action:
  required: false
  description: Action to take on double tap
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g. `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g. `https://www.home-assistant.io`) when `action` defined as `url`"
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
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below"
      type: [boolean, map]
      default: "false"
{% endconfiguration %}

## Options For Confirmation

If you define confirmation as an object instead of boolean, you can add more customization and configurations:
{% configuration %}
text:
  required: false
  description: Text to present in the confirmation dialog.
  type: string
exemptions:
  required: false
  description: "List of `exemption` objects. See below"
  type: list
{% endconfiguration %}

## Options For Exemptions

{% configuration badges %}
user:
  required: true
  description: User id that can see the view tab.
  type: string
{% endconfiguration %}

## Examples

Basic example:

```yaml
type: glance
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
type: glance
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
