---
title: Workday
description: Steps to configure the binary workday sensor.
ha_category:
  - Binary Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: 0.41
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: workday
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

The `workday` binary sensor indicates whether the current day is a workday or not. It allows specifying which days of the week will count as workdays and also
uses the Python module [holidays](https://pypi.python.org/pypi/holidays) to incorporate information about region-specific public holidays. 

This can be used to make automations that act differently on weekdays vs weekends. For example, you could make your bedroom lights turn on (gently) at 7 in the morning if it is a weekday, but wait until 11 if it is a weekend day.

## Setup

Check the [country list](https://github.com/dr-prodigy/python-holidays#available-countries) for available provinces (and other subdivisions, like states and territories) for each country.

## Configuration
To enable the `workday` sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: workday
    country: DE
```

{% configuration %}
name:
  description: A name for this sensor.
  required: false
  type: string
  default: Workday Sensor
country:
  description: >
    Country code according to [holidays](https://pypi.org/project/holidays/) notation.
  required: true
  type: string
province:
  description: Subdivision code according to [holidays](https://pypi.org/project/holidays/) notation.
  required: false
  type: string
workdays:
  description: List of workdays.
  required: false
  type: list
  default: "[mon, tue, wed, thu, fri]"
excludes:
  description: List of workday excludes.
  required: false
  type: list
  default: "[sat, sun, holiday]"
days_offset:
  description: Set days offset (e.g., -1 for yesterday, 1 for tomorrow).
  required: false
  type: integer
  default: 0
add_holidays:
  description: "Add custom holidays (such as company, personal holidays or vacations). Needs to formatted as `YYYY-MM-DD`."
  required: false
  type: list
remove_holidays:
  description: "Remove holidays (treat holiday as workday). Can be formatted as `YYYY-MM-DD` or by name for a partial string match (e.g. Thanksgiving)."
  required: false
  type: list
{% endconfiguration %}

Days are specified as follows: `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`.
The keyword `holiday` is used for public holidays identified by the holidays module.

<div class='note warning'>

If you use the sensor for Norway (`NO`) you need to wrap `NO` in quotes or write the name in full.
Otherwise, the value is evaluated as `false`.
If you use the sensor for Canada (`CA`) with Ontario (`ON`) as `province:` then you need to wrap `ON` in quotes.
Otherwise, the value is evaluated as `true` (check the YAML documentation for further details) and the sensor will not work.

One other thing to watch is how the `holiday` keyword is used. Your first instinct might be to add it to the `exclude` configuration, thinking that it means to skip the holidays. Actually it means to exclude the days in the holidays list from the workdays. So, when you exclude `holiday` and a workday falls on that day, then that workday is excluded, and the sensor will be **off**. If you want every workday flagged with no regard to holidays, make sure that there is something in your `Excludes` configuration _other_ than `holiday`.

</div>

## Full examples

This example excludes Saturdays and Sundays but not pre-configured holidays. Two custom holidays are added.

```yaml
# Example 1 configuration.yaml entry
binary_sensor:
  - platform: workday
    country: US
    workdays: [mon, tue, wed, thu, fri]
    excludes: [sat, sun]
    add_holidays:
      - "2020-02-24"
      - "2020-04-25"
```

This example excludes Saturdays, Sundays and holidays. One custom holiday is added.
The date February 24th, 2020 is a Monday, but will be excluded (the sensor will be **off**) because it was added to the `add_holidays` configuration.

```yaml
# Example 2 configuration.yaml entry
binary_sensor:
  - platform: workday
    country: DE
    workdays: [mon, tue, wed, thu, fri]
    excludes: [sat, sun, holiday]
    add_holidays:
      - '2020-02-24'
```

This example excludes Saturdays, Sundays and holidays. Two holidays are removed: November 26, 2020 and December 25, 2020.

```yaml
# Example 3 configuration.yaml entry
binary_sensor:
  - platform: workday
    country: US
    workdays: [mon, tue, wed, thu, fri]
    excludes: [sat, sun, holiday]
    remove_holidays:
      - '2020-11-26'
      - '2020-12-25'
```

This example excludes Saturdays, Sundays and holidays. Two holidays are removed by name: Thanksgiving and Christmas Day.

```yaml
# Example 4 configuration.yaml entry
binary_sensor:
  - platform: workday
    country: US
    workdays: [mon, tue, wed, thu, fri]
    excludes: [sat, sun, holiday]
    remove_holidays:
      - 'Thanksgiving'
      - 'Christmas Day'
```

## Automation example

Example usage for automation:

```yaml
automation:
  alias: "Turn on heater on workdays"
  trigger:
    platform: time
    at: "08:00:00"
  condition:
    condition: state
    entity_id: binary_sensor.workday_sensor
    state: "on"
  action:
    service: switch.turn_on
    target:
      entity_id: switch.heater
```
