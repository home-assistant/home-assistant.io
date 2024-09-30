---
type: card
title: "Heading card"
sidebar_label: Heading
description: "The Heading card structures your dashboard by providing title, icon and navigation."
related:
  - docs: /dashboards/actions/
    title: Card actions
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The Heading card structures your dashboard by providing title, icon and navigation. This card supports [actions](/dashboards/actions/).

<p class='img'>
  <img src='/images/dashboards/heading_card.png' alt='Screenshot of heading cards'>
  Screenshot of heading cards.
</p>

```yaml
type: heading
heading: Living room
icon: mdi:sofa
badges:
  - type: entity
    entity_id: sensor.living_room_sensor_temperature
    color: red
  - type: entity
    entity_id: sensor.living_room_sensor_humidity
    color: deep-purple
```

{% configuration entity %}
type:
  required: true
  description: "`heading`"
  type: string
heading:
  required: false
  description: Heading text
  type: string
heading_style:
  required: false
  description: Style of the heading. Can be either  `title` or `subtitle`.
  type: string
  default: title
icon:
  required: false
  description: Icon displayed before the heading text.
  type: string
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action). By default, it will do nothing. If an action is configured, an arrow will appear next to the heading text.
  type: map
badges:
  required: false
  description: Additional small badges to display entity information. See [heading badges](/dashboards/heading/#heading-badges).
  type: list
{% endconfiguration %}

## Heading badges

Each heading card can contain small badges in addition of the heading text. These badges are similar to regular [badges](/dashboards/badges/) but they are smaller and without background. They are useful to display sensor information next the heading text in a compact and minimal style.

```yaml
type: entity
entity: light.living_room
```

{% configuration entity %}
type:
  required: true
  description: "`entity`"
  type: string
entity:
  required: true
  description: Entity ID.
  type: string
name:
  required: false
  description: Overwrites the entity name. The name will be only displayed if `state_content` includes `name` token.
  type: string
icon:
  required: false
  description: Overwrites the entity icon.
  type: string
color:
  required: false
  description: Set the color when the entity is active. By default it will not be colored. It can be set to the `state` special token to dynamically color the icon based on `state`, `domain`, and `device_class` of your entity. It also accepts [color token](/dashboards/tile/#available-colors) or hex color code.
  type: string
  default: none
show_icon:
  required: false
  description: Show the icon
  type: boolean
  default: "true"
show_state:
  required: false
  description: Show the state.
  type: boolean
  default: "false"
state_content:
  required: false
  description: >
    Content to display for the state. Can be `state`, `name`, `last_changed`, `last_updated`, or any attribute of the entity. Can be either a string with a single item, or a list of string items. Default depends on the entity domain.
  type: [string, list]
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action). By default, it will do nothing.
  type: map
{% endconfiguration %}
