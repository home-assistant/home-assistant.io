---
title: "Badges"
description: "Description of the various badges that are available."
---

Badges are widgets that sit at the top of a panel, above all the cards.

<p class="img">
  <img src="/images/dashboards/badges.png" alt="Badges">
  Badges at the top of a panel.
</p>

## Adding a badge to your dashboard

1. Go to {% my lovelace_dashboards title="**Settings** > **Dashboards**" %}.
2. If you have multiple [views](/dashboards/views/), open the view to which you want to add a badge.
3. In the top right of the screen, select the edit {% icon "mdi:edit" %} button.
4. To add a badge, select the plus {% icon "mdi:plus" %}button.

   ![Screenshot showing how to add a badge](/images/dashboards/badge_add.png)

5. Select the entity for which you want to display a badge.
6. Configure your badge.
   - The available options depend on the entity.
   - Add the states you want to see.
   - If you want, add a **Name**.

   ![Screenshot showing how to configure a badge](/images/dashboards/badge_configure.png)
7. Under **Interactions**, you can define the tap behavior.
8. If you want this badge to be visible only to specific users or under a certain condition, open the **Visibility** tab to [define those conditions](/dashboards/cards/#showing-or-hiding-a-card-or-badge-conditionally).
   - The [available conditions](/dashboards/conditional/#conditions-options) are the same as the ones for the conditional card.
9. Select **Save**.

<p class="img">
  <img src="/images/dashboards/adding_a_badge_to_a_dashboard.webp" alt="screencast showing how to add a badge to a dashboard">
  Adding a badge to a dashboard.
</p>

## Entity badge

The Entity badge allows you to display the state of an entity on a badge. This badge supports [actions](/dashboards/actions/).

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
  description: Overwrites the entity name.
  type: string
icon:
  required: false
  description: Overwrites the entity icon.
  type: string
color:
  required: false
  description: Set the color when the entity is active. By default, the color is based on `state`, `domain`, and `device_class` of your entity. It accepts [color token](/dashboards/tile/#available-colors) or hex color code.
  type: string
  default: state
show_entity_picture:
  required: false
  description: If your entity has a picture, it will replace the icon.
  type: boolean
  default: false
show_name:
  required: false
  description: Show the name
  type: boolean
  default: "false"
show_icon:
  required: false
  description: Show the icon
  type: boolean
  default: "true"
show_state:
  required: false
  description: Show the state.
  type: boolean
  default: "true"
state_content:
  required: false
  description: >
    Content to display for the state. Can be `state`, `last_changed`, `last_updated`, or any attribute of the entity. Can be either a string with a single item, or a list of string items. Default depends on the entity domain.
  type: [string, list]
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action). By default, it will show the "more-info" dialog.
  type: map
hold_action:
  required: false
  description: Action taken on tap-and-hold. See [action documentation](/dashboards/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on double tap. See [action documentation](/dashboards/actions/#double-tap-action).
  type: map
{% endconfiguration %}

## Entity Filter Badge

This badge allows you to define a list of entities that you want to track only when in a certain state. Very useful for showing lights that you forgot to turn off or show a list of people only when they're at home.

{% configuration filter_badge %}
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
{% endconfiguration %}

*one is required (`conditions` or `state_filter`)

### Options for entities

If you define entities as objects instead of strings (by adding `entity:` before entity ID), you can add more customization and configurations:

{% configuration entities %}
type:
  required: false
  description: "Sets a custom badge type: `custom:my-custom-badge`"
  type: string
entity:
  required: true
  description: Entity ID.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
icon:
  required: false
  description: Overwrites icon or entity picture. You can use any icon from [Material Design Icons](https://pictogrammers.com/library/mdi/). Prefix the icon name with `mdi:`, ie `mdi:home`.
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

You may also add any additional configuration options to an entity which are supported by the chosen badge type (`Entity` badge type if no type is chosen).

## Conditions options

You can specify multiple `conditions`, in which case the entity will be displayed if it matches all conditions.

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

Use a regex filter against entity attributes. This regex filter below looks for expressions that are 1 digit in length and where the number is between 0-7 (so show holidays today or in the next 7 days) and displays those holidays as entities in the Entity Filter badge.

```yaml
type: entity-filter
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
