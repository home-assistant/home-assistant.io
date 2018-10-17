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
  description: "Set to `toggle` or `call-service` for direct actions."
  type: string
  default: more-info
service:
  required: false
  description: "For `call-service`, e.g., `media_player.media_play_pause`"
  type: string
service_data:
  required: false
  description: The service data to use.
  type: object
  default: "entity_id: entity_id"
theme:
  required: false
  description: "Set to any theme within `themes.yaml`"
  type: string
{% endconfiguration %}

## {% linkable_title Examples %}

Title and Script Service Example:

```yaml
- type: entity-button
  title: Turn Off Lights
  entity: script.turn_off_lights
  service: script.turn_on
```

<p class='img'>
<img src='/images/lovelace/lovelace_entity_button_complex_card.png' alt='Screenshot of the entity button card'>
Screenshot of the Entity Button card with Title and Script Service.
</p>
