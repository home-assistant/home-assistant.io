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
uses the Python module [holidays](https://pypi.org/project/holidays/) to incorporate information about region-specific public holidays.

This can be used to make automations that act differently on weekdays vs weekends. For example, you could make your bedroom lights turn on (gently) at 7 in the morning if it is a weekday, but wait until 11 if it is a weekend day.

## Setup

Check the [country list](https://github.com/dr-prodigy/python-holidays#available-countries) for available provinces (and other subdivisions, like states and territories) for each country.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Name:
  description: A name for this sensor.
Country:
  description: >-
    Country code according to [holidays](https://pypi.org/project/holidays/) notation.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Province/State:
  description: >-
    Subdivision code according to [holidays](https://pypi.org/project/holidays/) notation. Limited to what is available for the chosen country.
"Working Days":
  description: List of workdays. Any day chosen will cause the sensor to be "on" for that day.
"Non-Working Days":
  description: List of workday excludes. Any day chosen will cause the sensor to be "off" for that day. Overrides "Working Days".
"Offset Days":
  description: Set days offset (e.g., -1 for yesterday, 1 for tomorrow).
"Add Holiday Days":
  description: >-
    Add custom holidays (such as company, personal holidays or vacations). Needs to be formatted as `YYYY-MM-DD`.
  required: false
  type: list
"Remove Holidays":
  description: >-
    Remove holidays (treat holiday as workday). Can be formatted as `YYYY-MM-DD` or by name for a partial string match (e.g. Thanksgiving).
{% endconfiguration_basic %}

Days are specified as follows: `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`.
The keyword `holiday` is used for public holidays identified by the holidays module.

<div class='note warning'>

One thing to watch is how the `holiday` keyword is used. Your first instinct might be to add it to the `Non-Working Days` configuration, thinking that it means to skip the holidays. Actually it means to exclude the days in the holidays list from the workdays. So, when you add `holiday` to `Non-Working Days` and a workday falls on that day, then that workday is excluded, and the sensor will be **off**. If you want every workday flagged with no regard to holidays, make sure that there is something in your `Non-Working Days` configuration _other_ than `holiday`.

</div>

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
