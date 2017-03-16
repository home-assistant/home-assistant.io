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
ha_release: 0.40.1
---

The `workday` binary sensor indicates, whether the current day is a workday or not. It allows specifying, which days of the week counts as workdays and also uses the python module [holidays](https://pypi.python.org/pypi/holidays) to incorporate information about region-specific public holidays.

```yaml
# Example configuation.yaml entry
binary_sensor:
  - platform: workday
    country: DE
    province: BW
```

Configuration variables:

- **country** (*Required*): Country code according to [holidays](https://pypi.python.org/pypi/holidays/0.8.1) notation.
- **province** (*Optional*): Province code according to [holidays](https://pypi.python.org/pypi/holidays/0.8.1) notation (defaults to None).
- **workdays** (*Optional*): List of workdays (defaults to mon, tue, wed, thu, fri).
- **excludes** (*Optional*): List of workday excludes (defaults to sat, sun, holiday).

Days are specified as follows: `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`. The keyword `holiday` is used for public holidays identified by the holidays module.


Example usage for automation:
```yaml
automation:
  alias: Turn on heater on workdays
  trigger:
    platform: time
    after: '08:00:00'
  condition:
    condition: state
    entity_id: 'binary_sensor.workday_sensor'
    state: 'off'
  action:
    service: switch.turn_on
    entity_id: switch.heater
```
