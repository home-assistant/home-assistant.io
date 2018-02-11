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

The `workday` binary sensor indicates, whether the current day is a workday or not. It allows specifying, which days of the week counts as workdays and also uses the python module [holidays](https://pypi.python.org/pypi/holidays) to incorporate information about region-specific public holidays.

To enable the `workday` sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: workday
    country: DE
    workdays: [ mon, wed, fri ]
```

Configuration variables:

- **name** (*Optional*): A name for this sensor. Defaults to *Workday Sensor*
- **country** (*Required*): Country code according to [holidays](https://pypi.python.org/pypi/holidays/0.9.3) notation.
- **province** (*Optional*): Province code according to [holidays](https://pypi.python.org/pypi/holidays/0.9.3) notation. Defaults to None.
- **workdays** (*Optional*): List of workdays. Defaults to `mon`, `tue`, `wed`, `thu`, `fri`.
- **excludes** (*Optional*): List of workday excludes. Defaults to `sat`, `sun`, `holiday`.
- **days_offset** (*Optional*): Set days offset. Defaults to `0`.

Days are specified as follows: `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`. The keyword `holiday` is used for public holidays identified by the holidays module.

<p class='note warning'>
If you use the sensor for Norway (`NO`) you need to wrap `NO`in quotes or write the name in full. Otherwise the value is evaluated as `False`.
If you use the sensor for Canada (`CA`) with Ontario (`ON`) as `province:` then you need to wrap `ON` in quotes. Otherwise the value is evaluated as `True` (check the YAML documentation for further details) and the sensor will not work.
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
