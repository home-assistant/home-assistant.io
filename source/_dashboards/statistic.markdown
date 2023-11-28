---
type: card
title: "Statistic Card"
sidebar_label: Statistic
description: "The Statistic card allows you to display a statistical value for an entity."
---

The Statistic card allows you to display a statistical value for an entity.

Statistics are gathered every 5 minutes for sensors that support it. It will either keep the `min`, `max` and `mean` of a sensors value for a specific period, or the `sum` for a metered entity.

If your sensor doesn't work with statistics, check [this](/more-info/statistics/).

<p class='img'>
<img src='/images/dashboards/statistic.png' alt='Screenshot of the statistic card for a temperature sensor'>
Screenshot of the statistic card for a temperature sensor.
</p>

To add the Statistic card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Statistic** from the card picker. All options for this card can be configured via the user interface, but if you want more options for the period, you will have to define them in `yaml`.

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

## Options For Period

Periods can be configured in 3 different ways:

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

### Rolling Window

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