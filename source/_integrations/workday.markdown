---
title: Workday
description: Steps to configure the binary workday sensor.
ha_category:
  - Binary Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: 0.41
ha_quality_scale: internal
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
  - '@gjohansson-ST'
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

{% include integrations/config_flow.md %}

Days are specified as follows: `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`.
The keyword `holiday` is used for public holidays identified by the holidays module.

<div class='note warning'>

Watch how the `holiday` keyword is used. Your first instinct might be to add it to the `exclude` configuration, thinking that it means to skip the holidays. Actually it means to exclude the days in the holidays list from the workdays. So, when you exclude `holiday` and a workday falls on that day, then that workday is excluded, and the sensor will be **off**. If you want every workday flagged with no regard to holidays, make sure that there is something in your `Excludes` configuration _other_ than `holiday`.

</div>

## Specific field information

Country code must be given according to [holidays](https://pypi.org/project/holidays/) notation.

Subdivision code must be given according to [holidays](https://pypi.org/project/holidays/) notation.

Add holidays will only take dates formatted with YYYY-MM-DD.

Remove holidays will take dates formatted with YYYY-MM-DD or partial of name, as example `christmas` will exclude `Christmas Day`.

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
