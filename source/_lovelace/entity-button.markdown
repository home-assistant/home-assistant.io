---
layout: page
title: "Entity Button Card"
sidebar_label: Entity Button
description: "The Entity Button card allows you to add buttons to perform tasks"
date: 2018-10-11 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

The Entity Button card allows you to add buttons to perform tasks.

<p class='img'>
<img src='/images/lovelace/lovelace_entity_button_card.png' alt='Screenshot of the entity button card'>
Screenshot of the Entity Button card.
</p>

```yaml
- type: entity-button
  entity: light.living_room
- type: entity-button
  entity: light.office
- type: entity-button
  entity: light.bedroom
```

{% configuration %}
type:
  required: true
  description: entity-button
  type: string
entity:
  required: true
  description: Home Assistant entity ID.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Name of Entity
icon:
  required: false
  description: Overwrites icon or entity picture.
  type: string
  default: Entity Domain Icon
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
theme:
  required: false
  description: "Set to any theme within `themes.yaml`"
  type: string
{% endconfiguration %}

## {% linkable_title Examples %}

Title and Script Service Example:

```yaml
- type: entity-button
  name: Turn Off Lights
  tap_action:
    action: call-service
    service: script.turn_on
    service_data:
      entity_id: script.turn_off_lights
  entity: script.turn_off_lights
```

<p class='img'>
<img src='/images/lovelace/lovelace_entity_button_complex_card.png' alt='Screenshot of the entity button card'>
Screenshot of the Entity Button card with Title and Script Service.
</p>
