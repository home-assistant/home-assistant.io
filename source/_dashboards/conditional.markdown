---
type: card
title: Conditional card
sidebar_label: Conditional
description: The Conditional card displays another card based on conditions.
related:
  - docs: /dashboards/cards/
    title: Dashboard cards
  - docs: /dashboards/cards/#showing-or-hiding-a-card-or-badge-conditionally
    title: Conditional settings on the card's visibility tab
---

The conditional card displays another card based on conditions.

![Screenshot of the conditional card](/images/dashboards/conditional_card.gif)

{% include dashboard/edit_dashboard.md %}
Note that while editing the dashboard, the card will always be shown, so be sure to exit editing mode to test the conditions.

The conditional card can still be used. However, it is now possible to define a setting to show or hide a card conditionally directly on each card type, on its [Visibility](/dashboards/cards/#showing-or-hiding-a-card-or-badge-conditionally) tab.

Most options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: conditional
  type: string
conditions:
  required: true
  description: List of conditions to check. See [available conditions](#conditions-options).
  type: list
card:
  required: true
  description: Card to display if all conditions match.
  type: map
{% endconfiguration %}

## Examples

Only show when all the conditions are met:

```yaml
type: conditional
conditions:
  - condition: state
    entity: light.bed_light
    state: "on"
  - condition: state
    entity: light.bed_light
    state_not: "off"
  - condition: user
    users:
      - 581fca7fdc014b8b894519cc531f9a04
card:
  type: entities
  entities:
    - device_tracker.demo_paulus
    - cover.kitchen_window
    - group.kitchen
    - lock.kitchen_door
    - light.bed_light
```

Example condition where only one of the conditions needs to be met:

```yaml
type: conditional
conditions:
  - condition: or
    conditions:
      - condition: state
        entity: binary_sensor.co_alert
        state: 'on'
      - condition: state
        entity: binary_sensor.rookmelder
        state: 'on'
card:
  type: entities
  entities:
    - binary_sensor.co_alert
    - binary_sensor.rookmelder
```

## Conditions options

### State

Tests if an entity has a specified state.

```yaml
condition: state
entity: climate.thermostat
state: heat
```

```yaml
condition: state
entity: climate.thermostat
state_not: "off"
```

{% configuration %}
condition:
  required: true
  description: "`state`"
  type: string
entity:
  required: true
  description: Entity ID.
  type: string
state:
  required: false
  description: Entity state or ID to be equal to this value. Can contain an array of states.*
  type: [list, string]
state_not:
  required: false
  description: Entity state or ID to not be equal to this value. Can contain an array of states.*
  type: [list, string]
{% endconfiguration %}

*one is required (`state` or `state_not`)

### Numeric state

Tests if an entity state matches the thresholds.

```yaml
condition: numeric_state
entity: sensor.outside_temperature
above: 10
below: 20
```

{% configuration %}
condition:
  required: true
  description: "`numeric_state`"
  type: string
entity:
  required: true
  description: Entity ID.
  type: string
above:
  required: false
  description: Entity state or ID to be above this value.*
  type: string
below:
  required: false
  description: Entity state or ID to be below this value.*
  type: string
{% endconfiguration %}

*at least one is required (`above` or `below`), both are also possible for values between.

### Screen

Specify the visibility of the card per screen size. Some screen size presets are available in the UI but you can use any CSS media query you want in YAML.

```yaml
condition: screen
media_query: "(min-width: 1280px)"
```

{% configuration %}
condition:
  required: true
  description: "`screen`"
  type: string
media_query:
  required: true
  description: Media query to check which screen size are allowed to display the card.
  type: string
{% endconfiguration %}

### User

Specify the visibility of the card per user.

```yaml
condition: user
users:
  - 581fca7fdc014b8b894519cc531f9a04
```

{% configuration %}
condition:
  required: true
  description: "`user`"
  type: string
users:
  required: true
  description: User ID that can see the card (unique hex value found on the Users configuration page).
  type: list
{% endconfiguration %}

### And

Specify that both conditions must be met.

```yaml
condition: and
conditions:
  - condition: numeric_state
    above: 0
  - condition: user
    users:
      - 581fca7fdc014b8b894519cc531f9a04
```

{% configuration %}
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
condition: or
conditions:
  - condition: numeric_state
    above: 0
  - condition: user
    users:
      - 581fca7fdc014b8b894519cc531f9a04
```

{% configuration %}
condition:
  required: true
  description: "`or`"
  type: string
conditions:
  required: false
  description: List of conditions to check. See [available conditions](#conditions-options).
  type: list
{% endconfiguration %}


