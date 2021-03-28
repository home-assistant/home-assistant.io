---
title: Workday
description: Steps to configure the binary workday sensor.
ha_category:
  - Utility
  - Binary Sensor
ha_iot_class: Local Polling
ha_release: 0.41
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: workday
ha_platforms:
  - binary_sensor
---

The `workday` binary sensor indicates, whether the current day is a workday or not. It allows specifying, which days of the week will count as workdays and also
uses the Python module [holidays](https://pypi.python.org/pypi/holidays) to incorporate information about region-specific public holidays. 

## Setup

Check the [country list](https://github.com/dr-prodigy/python-holidays#available-countries) for available province.

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
  description: Province/State code according to [holidays](https://pypi.org/project/holidays/) notation.
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
  description: "Remove holidays (treat holiday as workday). Needs to formatted as `YYYY-MM-DD`."
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

One other thing to watch is how the `holiday` keyword is used. Your first instinct might be to add it to the `exclude` configuration, thinking that it means to skip the holidays. Actually it means to exclude the days in the holidays’ list from the workdays. So when you exclude `holiday` and a workday falls on that day, then that workday is excluded. Meaning the sensor will be off. If you want the workday flagged without regarding holidays, make sure that there is something in your `Excludes` configuration other than `holiday`.

</div>

## Full examples

This example excludes Saturdays, Sundays but not a holiday. Two custom holidays are added.
Even though `sat` and `sun` was not included in `workdays` and in theory, it would not need to be excluded, but because we do not what holidays excluded, we add them so exclude would not default and skip the holidays. Therefore as the note above, 2/17/2020 in the US would still be a workday.

```yaml
# Example 1 configuration.yaml entry
binary_sensor:
  - platform: workday
    country: US
    workdays: [mon, tue, wed, thu, fri]
    excludes: [sat, sun]
```

This example excludes Saturdays, Sundays and holidays. Two custom holidays are added.
The date February 24th, 2020 is a Monday but will be excluded because it was added to the `add_holidays` configuration.

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

<div class='note'>

Please remember that [as explained here](/docs/configuration/devices/) you can only have a single `automation:` entry. Add the automation to your existing automations.

</div>
