---
title: Workday
description: Steps to configure the binary workday sensor.
logo: home-assistant.png
ha_category:
  - Utility
ha_iot_class: Local Polling
ha_release: 0.41
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
---

The `workday` binary sensor indicates, whether the current day is a workday or not. It allows specifying, which days of the week counts as workdays and also
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
  description: Province code according to [holidays](https://pypi.org/project/holidays/) notation.
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
{% endconfiguration %}

Days are specified as follows: `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`.
The keyword `holiday` is used for public holidays identified by the holidays module.

<div class='note warning'>

If you use the sensor for Norway (`NO`) you need to wrap `NO` in quotes or write the name in full.
Otherwise the value is evaluated as `false`.
If you use the sensor for Canada (`CA`) with Ontario (`ON`) as `province:` then you need to wrap `ON` in quotes.
Otherwise the value is evaluated as `true` (check the YAML documentation for further details) and the sensor will not work.

> **_NOTE:_**
NOTE: When you add holiday keyword to excludes configuration, keep in mind that it is saying to exclude the holidays from a workday. You might think that would be excluding holidays from consideration, but any values in the exclude configuration will mean to skip that date even if it is a workday. For example, in the US every third Monday in February is Predesit's day, which happened to fall on February 17th in 2020. If Monday is a workday and `holiday` is excluded, then the sensor would be off even though normally Monday is a workday. If you do not want to exclude `holidays` or another way of saying "do not look at holidays" Then you can not just leave the excludes configuration blank. The reason is that `holiday` is the default. Same as `sat` and `sun`. In that case, you would need to define the excludes configuration with something. You can add `sat` and `sun` since they would have defaulted anyway. If you need something else excluded and you wanted holidays excluded, then you would just add the values, but since something was configured then you would have to add the holiday keyword to whatever else. Also, to use the add_holidays configuration, the keyword `holiday` must be excluded.


</div>

## Full examples

This example excludes Saturdays, Sundays but not a holiday. Two custom holidays are added.
Even though `sat` and `sun` was not included in `workdays` and in theory, it would not need to be excluded, but because we do not what holidays excluded, we add them so exclude would not default and skip the holidays. Therefore as the note above, 2/17/2020 in the US would still be a workday. But February 14th 2020 although it is a workday (Friday) it would be excluded and the sensor would be 'off'.

```yaml
# Example 1 configuration.yaml entry
binary_sensor:
  - platform: workday
    country: US
    workdays: [mon, tue, wed, thu, fri]
    excludes: [sat, sun]
    add_holidays:
      - '2020-02-14'
```


This examples excludes Saturdays, Sundays and holiday. Two custom holidays are added.

```yaml
# Example 2 configuration.yaml entry
binary_sensor:
  - platform: workday
    country: DE
    workdays: [mon, wed, fri]
    excludes: [sat, sun, holiday]
    add_holidays:
      - '2018-12-26'
      - '2018-12-31'
```

## Automation example

Example usage for automation:

```yaml
automation:
  alias: Turn on heater on workdays
  trigger:
    platform: time
    at: '08:00:00'
  condition:
    condition: state
    entity_id: 'binary_sensor.workday_sensor'
    state: 'on'
  action:
    service: switch.turn_on
    entity_id: switch.heater
```

<div class='note'>

Please remember that [as explained here](/docs/configuration/devices/) you can only have a single `automation:` entry. Add the automation to your existing automations.

</div>
