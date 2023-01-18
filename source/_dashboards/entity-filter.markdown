---
type: card
title: "Entity Filter Card"
sidebar_label: Entity Filter
description: "The Entity Filter card allows you to define a list of entities that you want to track only when in a certain state. Very useful for showing lights that you forgot to turn off or show a list of people only when they're at home. "
---

The Entity Filter card allows you to define a list of entities that you want to track only when in a certain state. Very useful for showing lights that you forgot to turn off or show a list of people only when they're at home.

This type of card can also be used together with rest of cards that allow multiple entities, allowing you to use [glance](/dashboards/glance/) or [picture-glance](/dashboards/picture-glance/). By default it uses [entities](/dashboards/entities/) card model.

<p class='img'>
<img src='/images/dashboards/entity_filter.png' alt='Screenshot of the Entity Filter card'>
Screenshot of the Entity Filter card.
</p>

{% configuration %}
type:
  required: true
  description: "`entity-filter`"
  type: string
entities:
  required: true
  description: A list of entity IDs or `entity` objects, see below.
  type: list
state_filter:
  required: true
  description: List of strings representing states or `filter` objects, see below.
  type: list
card:
  required: false
  description: Extra options to pass down to the card rendering the result.
  type: map
  default: entities card
show_empty:
  required: false
  description: Allows hiding of card when no entities returned by filter.
  type: boolean
  default: true
{% endconfiguration %}

## Options for Entities

If you define entities as objects instead of strings (by adding `entity:` before entity ID), you can add more customization and configurations:

{% configuration %}
entity:
  required: true
  description: Entity ID.
  type: string
type:
  required: false
  description: "Sets a custom card type: `custom:my-custom-card`."
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
icon:
  required: false
  description: Overwrites icon or entity picture.
  type: string
secondary_info:
  required: false
  description: "Show additional info. Values: `entity-id`, `last-changed`."
  type: string
format:
  required: false
  description: "How the state should be formatted. Currently only used for timestamp sensors. Valid values are: `relative`, `total`, `date`, `time` and `datetime`."
  type: string
state_filter:
  required: false
  description: List of strings representing states or `filter` objects, see below.
  type: list
{% endconfiguration %}

## Options for state_filter

If you define `state_filter` as objects instead of strings (by adding `value:` before your state value), you can add more customization to your filter:

{% configuration %}
value:
  required: true
  description: String representing the state.
  type: string
operator:
  required: false
  description: Operator to use in the comparison. Can be `==`, `<=`, `<`, `>=`, `>`, `!=`, `in`, `not in`, or `regex`.
  type: string
attribute:
  required: false
  description: Attribute of the entity to use instead of the state.
  type: string
{% endconfiguration %}

## Examples

Show only active switches or lights in the house.

```yaml
type: entity-filter
entities:
  - entity: light.bed_light
    name: Bed
  - light.kitchen_lights
  - light.ceiling_lights
state_filter:
  - "on"
```

Show only people that are at home using [glance](/dashboards/glance/):

```yaml
type: entity-filter
entities:
  - device_tracker.demo_paulus
  - device_tracker.demo_anne_therese
  - device_tracker.demo_home_boy
state_filter:
  - home
card:
  type: glance
  title: People at home
```

<p class='img'>
  <img src='/images/dashboards/entity_filter_glance.png' alt='Entity filter combined with glance card'>
  Entity filter combined with glance card.
</p>

You can also specify multiple `state_filter` conditions, in which case the entity will be displayed if it matches any condition. This example will display everyone who is at home or at work.

```yaml
type: entity-filter
entities:
  - device_tracker.demo_paulus
  - device_tracker.demo_anne_therese
  - device_tracker.demo_home_boy
state_filter:
  - operator: "=="
    value: home
  - operator: "=="
    value: work    
card:
  type: glance
  title: Who's at work or home
```

Specify filter for a single entity.

```yaml
type: entity-filter
state_filter:
  - "on"
  - operator: ">"
    value: 90
entities:
  - sensor.water_leak
  - sensor.outside_temp
  - entity: sensor.humidity_and_temp
    state_filter:
      - operator: ">"
        value: 50
        attribute: humidity
```

Use a regex filter against entity attributes. This regex filter below looks for expressions that are 1 digit in length and where the number is between 0-7 (so show holidays today or in the next 7 days) and displays those holidays as entities in the Entity Filter card.

```yaml
  - type: entity-filter
    card:
      title: "Upcoming Holidays In Next 7 Days"
      show_header_toggle: false
    state_filter:
      - operator: regex
        value: "^([0-7]{1})$"
        attribute: eta
    entities:
      - entity: sensor.upcoming_ical_holidays_0
      - entity: sensor.upcoming_ical_holidays_1
      - entity: sensor.upcoming_ical_holidays_2
      - entity: sensor.upcoming_ical_holidays_3
      - entity: sensor.upcoming_ical_holidays_4
    show_empty: false
```
