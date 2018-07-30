---
layout: page
title: "Workday Binary Sensor"
description: "Steps to configure the binary workday sensor."
date: 2017-03-13 21:30
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Binary Sensor
ha_iot_class: "Local Polling"
ha_release: 0.41
---

The `workday` binary sensor indicates, whether the current day is a workday or
not. It allows specifying, which days of the week counts as workdays and also
uses the python module [holidays](https://pypi.python.org/pypi/holidays)
to incorporate information about region-specific public holidays.

## {% linkable_title Configuration %}

Check the
[country list](https://github.com/dr-prodigy/python-holidays#available-countries)
for available province.

To enable the `workday` sensor in your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: workday
    country: DE
    workdays: [mon, wed, fri]
```

{% configuration %}
name:
  description: A name for this sensor.
  required: false
  type: string
  default: Workday Sensor
country:
  description: >
    "Country code according to
    [holidays](https://pypi.python.org/pypi/holidays/0.9.4) notation."
  required: true
  type: string
province:
  description: >
    "Province code according to
    [holidays](https://pypi.python.org/pypi/holidays/0.9.4) notation."
  required: false
  type: string
  default: None
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
  description: Set days offset.
  required: false
  type: int
  default: 0
{% endconfiguration %}

Days are specified as follows: `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`.
The keyword `holiday` is used for public
holidays identified by the holidays module.

<p class='note warning'>
If you use the sensor for Norway (`NO`) you need to wrap `NO` in quotes or write the name in full.
Otherwise the value is evaluated as `false`.
If you use the sensor for Canada (`CA`) with Ontario (`ON`) as `province:` then you need to wrap `ON` in quotes.
Otherwise the value is evaluated as `true` (check the YAML documentation for further details) and the sensor will not work.
</p>

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
