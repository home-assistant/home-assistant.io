---
type: card
title: "Entity filter card"
sidebar_label: Entity filter
description: "The entity filter card allows you to define a list of entities that you want to track only when in a certain state. Very useful for showing lights that you forgot to turn off or show a list of people only when they're at home. "
---

The entity filter card allows you to define a list of entities that you want to track only when in a certain state. Very useful for showing lights that you forgot to turn off or show a list of people only when they're at home.

<p class='img'>
<img src='/images/dashboards/entity_filter.png' alt='Screenshot of the entity filter card'>
Screenshot of the entity filter card.
</p>

This type of card can also be used together with other cards that allow multiple entities, allowing you to use [glance](/dashboards/glance/) or [picture-glance](/dashboards/picture-glance/). By default, it uses the [entities](/dashboards/entities/) card model.

{% include dashboard/edit_dashboard.md %}

## YAML configuration

This card can only be configured in YAML.

{% configuration %}
type:
  required: true
  description: "`entity-filter`"
  type: string
entities:
  required: true
  description: A list of entity IDs or `entity` objects, see below.
  type: list
conditions:
  required: false
  description: List of conditions to check. See [available conditions](#conditions-options).*
  type: list
state_filter:
  required: false
  description: (legacy) List of strings representing states or filters to check. See [available legacy filters](#legacy-state-filters).*
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

*one is required (`conditions` or `state_filter`)

### Options for entities

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
  description: Overwrites icon or entity picture. You can use any icon from [Material Design Icons](https://pictogrammers.com/library/mdi/). Prefix the icon name with `mdi:`, ie `mdi:home`.
  type: string
  default: Entity domain icon
secondary_info:
  required: false
  description: "Show additional info. Values: `entity-id`, `last-changed`."
  type: string
format:
  required: false
  description: "How the state should be formatted. Currently only used for timestamp sensors. Valid values are: `relative`, `total`, `date`, `time` and `datetime`."
  type: string
conditions:
  required: false
  description: List of conditions to check. See [available conditions](#conditions-options).*
  type: list
state_filter:
  required: false
  description: (legacy) List of strings representing states or filters to check. See [available legacy filters](#legacy-state-filters).*
  type: list
{% endconfiguration %}

*only one filter will be applied: `conditions` or `state_filter` if `conditions` is not present

## Conditions options

You can specify multiple `conditions`, in which case the entity will be displayed if it matches every condition.

### State

Tests if an entity has a specified state.

```yaml
type: entity-filter
entities:
  - climate.thermostat_living_room
  - climate.thermostat_bed_room
conditions:
  - condition: state
    state: heat
```

```yaml
type: entity-filter
entities:
  - climate.thermostat_living_room
  - climate.thermostat_bed_room
conditions:
  - condition: state
    state_not: "off"
```

```yaml
type: entity-filter
entities:
  - sensor.gas_station_1
  - sensor.gas_station_2
  - sensor.gas_station_3
conditions:
  - condition: state
    state: sensor.gas_station_lowest_price
```

{% configuration condition_state %}
condition:
  required: true
  description: "`state`"
  type: string
state:
  required: false
  description: Entity state or ID to be equal to this value. Can contain an array of states.*
  type: [list, string]
state_not:
  required: false
  description: Entity state or ID to not be equal to this value. Can contain an array of states.*
  type: [list, string]
entity:
  required: false
  description: An optional entity ID to be used for testing the state condition. If not provided, the state of the entity being displayed is tested.
  type: string
{% endconfiguration %}

*one is required (`state` or `state_not`)

### Numeric state

Tests if an entity state matches the thresholds.

```yaml
type: entity-filter
entities:
  - sensor.outside_temperature
  - sensor.living_room_temperature
  - sensor.bed_room_temperature
conditions:
  - condition: numeric_state
    above: 10
    below: 20
```

{% configuration condition_numeric_state %}
condition:
  required: true
  description: "`numeric_state`"
  type: string
above:
  required: false
  description: Entity state or ID to be above this value.*
  type: string
below:
  required: false
  description: Entity state or ID to be below this value.*
  type: string
entity:
  required: false
  description: An optional entity ID to be used for testing the numeric state condition. If not provided, the numeric state of the entity being displayed is tested.
  type: string
{% endconfiguration %}

*at least one is required (`above` or `below`), both are also possible for values between.

### Screen

Specify the visibility of the entity per screen size. Some screen size presets are available in the UI but you can use any CSS media query you want in YAML.

```yaml
type: entity-filter
entities:
  - sensor.outside_temperature
  - sensor.living_room_temperature
  - sensor.bed_room_temperature
conditions:
  - condition: screen
    media_query: "(min-width: 1280px)"
```

{% configuration condition_screen %}
condition:
  required: true
  description: "`screen`"
  type: string
media_query:
  required: true
  description: Media query to check which screen size are allowed to display the entity.
  type: string
{% endconfiguration %}

### User

Specify the visibility of the entity per user.

```yaml
type: entity-filter
entities:
  - sensor.outside_temperature
  - sensor.living_room_temperature
  - sensor.bed_room_temperature
conditions:
  - condition: user
    users:
      - 581fca7fdc014b8b894519cc531f9a04
```

{% configuration condition_user %}
condition:
  required: true
  description: "`user`"
  type: string
users:
  required: true
  description: User ID that can see the entity (unique hex value found on the Users configuration page).
  type: list
{% endconfiguration %}

### And

Specify that both conditions must be met.

```yaml
type: entity-filter
entities:
  - sensor.outside_temperature
  - sensor.living_room_temperature
  - sensor.bed_room_temperature
conditions:
  - condition: and
    conditions:
      - condition: numeric_state
        above: 0
      - condition: user
        users:
          - 581fca7fdc014b8b894519cc531f9a04
```

{% configuration condition_and %}
condition:
  required: true
  description: "`and`"
  type: string
conditions:
  required: false
  description: List of conditions to check. See [available conditions](#conditions-options).
  type: list
{% endconfiguration %}

### Or

Specify that at least one of the conditions must be met.

```yaml
type: entity-filter
entities:
  - sensor.outside_temperature
  - sensor.living_room_temperature
  - sensor.bed_room_temperature
conditions:
  - condition: or
    conditions:
      - condition: numeric_state
        above: 0
      - condition: user
        users:
          - 581fca7fdc014b8b894519cc531f9a04
```

{% configuration condition_or %}
condition:
  required: true
  description: "`or`"
  type: string
conditions:
  required: false
  description: List of conditions to check. See [available conditions](#conditions-options).
  type: list
{% endconfiguration %}

## Legacy state filters

### String filter

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

You can also specify multiple `state_filter` conditions, in which case the entity will be displayed if it matches any condition.

If you define `state_filter` as objects instead of strings, you can add more customization to your filter, as described below.

### Operator filter

Tests if an entity state correspond to the applied `operator`.

{% configuration condition_operator %}
value:
  required: true
  description: String representing the state.
  type: string
operator:
  required: true
  description: Operator to use in the comparison. Can be `==`, `<=`, `<`, `>=`, `>`, `!=`, `in`, `not in`, or `regex`.
  type: string
attribute:
  required: false
  description: Attribute of the entity to use instead of the state.
  type: string
{% endconfiguration %}

#### Examples

Displays everyone who is at home or at work.

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
type: entity-filter
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
