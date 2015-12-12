---
layout: page
title: "Templating"
description: "Instructions how to use the templating feature of Home Assistant."
date: 2015-12-12 12:00
sidebar: false
comments: false
sharing: true
footer: true
---

The template helper enables one to mathematically manipulate values and use variables to extract values from JSON.

For a complete overview, check the [Jinja2 Template documentation](http://jinja.pocoo.org/docs/dev/templates/).

### {% linkable_title `states` variable %}

The template support has a special `states` variable:

 - Iterating `states` will yield each state sorted alphabetically by entity id
 - Iterating `states.domain` will yield each state of that domain sorted alphabetically by entity id
 - `states.sensor.temperature` returns state object for `sensor.temperature`

Example templates and what they could result in:

| Template | Output |
| ------------ | ---------- |
| `{{ states.device_tracker.paulus.state }}` | home |
| `{% for state in states.sensor %}{{ state.entity_id }}={{ state.state }}, {% endfor %}` | senor.thermostat=24, sensor.humidity=40,  |


### {% linkable_title Mathematical functions %}

The mathematical methods convert strings to numbers automatically before they are doing their job. This could be useful if you recieve data in the wrong unit of measurement and want to convert it.

| Method         | description |
| -------------- | ---------- |
| `multiply(x)`  | Multiplies the value with `x` |
| `round(x)`     | Maximau number `x` of decimal places for the value |

A sample entry in your `configuration.yaml` file for a sensor could look like this:

```yaml
# Example configuration.yaml entry
sensor:
  platform: dweet
  device: temp-sensor012
  value_template: '{{ value_json.temperature | multiply(1.02) | round(2) }}'
  unit_of_measurement: "°C"
```

