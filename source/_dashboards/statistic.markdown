---
type: card
title: "Statistic card"
sidebar_label: Statistic
description: "The statistic card allows you to display a statistical value for an entity."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The statistic card allows you to display a statistical value for an entity.

Statistics are gathered every 5 minutes for sensors that support it. It will either keep the `min`, `max` and `mean` of a sensors value for a specific period, or the `sum` for a metered entity.

If your sensor doesn't work with statistics, check [this](/more-info/statistics/).

<p class='img'>
<img src='/images/dashboards/statistic.png' alt='Screenshot of the statistic card for a temperature sensor'>
Screenshot of the statistic card for a temperature sensor.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface, but if you want more options for the period, you will have to define them in `yaml`.

{% configuration %}
type:
  required: true
  description: statistic
  type: string
entity:
  required: true
  description: "A entity ID of a sensor with statistics, or an external statistic id"
  type: string
stat_type:
  required: true
  description: The statistics types to render. `min`, `max`, `mean`, `change`
  type: string
name:
  required: false
  description: Name of entity.
  type: string
  default: Entity name.
icon:
  required: false
  description: Overwrites icon.
  type: string
unit:
  required: false
  description: Unit of measurement given to data.
  type: string
  default: Unit of measurement given by entity.
period:
  required: true
  description: The period to use for the calculation. [See below](#options-for-period).
  type: map
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
footer:
  required: false
  description: Footer widget to render. See [footer documentation](/dashboards/header-footer/).
  type: map
collection_key:
  required: false
  description: "If using `period: energy_date_selection`, you can set a custom key to match the optional key of an `energy-date-selection` card. This is not typically required, but can be useful if multiple date selection cards are used on the same view. See [energy documentation](/dashboards/energy/#using-multiple-collections)."
  type: string
{% endconfiguration %}

## Example

Alternatively, the card can be configured using YAML:

```yaml
type: statistic
entity: sensor.energy_consumption
period:
  calendar:
    period: month
stat_type: change
```

## Options for period

Periods can be configured in 4 different ways:

### Calendar

Use a fixed period with an offset from the current period.

{% configuration %}
period:
  required: true
  description: The period to use. `day`, `week`, `month`, `year`
  type: string
offset:
  required: false
  description: The offset of the current period, so 0 means the current period, -1 is the previous period.
  type: integer
{% endconfiguration %}

Example, the change of the energy consumption during last month:

```yaml
type: statistic
entity: sensor.energy_consumption
period:
  calendar:
    period: month
    offset: -1
stat_type: change
```

### Fixed period

Specify a fixed period, the start and end are optional.

{% configuration %}
start:
  required: false
  description: The start of the period
  type: string
end:
  required: false
  description: The end of the period
  type: string
{% endconfiguration %}

Example, the change in 2022:

```yaml
type: statistic
entity: sensor.energy_consumption
period:
  fixed_period:
    start: 2022-01-01
    end: 2022-12-31
stat_type: change
```

Example, all time change, without a start or end:

```yaml
type: statistic
entity: sensor.energy_consumption
period:
  fixed_period:
stat_type: change
```

### Rolling window

{% configuration %}
duration:
  required: true
  description: The duration of the period
  type: map
offset:
  required: false
  description: The offset of the current time, 0 means the current period, -1 is the previous period.
  type: map
{% endconfiguration %}

Example, a period of 1 hour, 10 minutes and 5 seconds ending 2 hours, 20 minutes and 10 seconds before now:

```yaml
type: statistic
entity: sensor.energy_consumption
period:
  rolling_window:
    duration:
      hours: 1
      minutes: 10
      seconds: 5
    offset:
      hours: -2
      minutes: -20
      seconds: -10
stat_type: change
```

### Dynamic date selection

When placed on a view with an Energy date selection card, the statistic card can be linked to show data from the period selected on the date selection card.

Example of a period from the date selector:

```yaml
type: statistic
entity: sensor.energy_consumption
period: energy_date_selection
stat_type: change
```
