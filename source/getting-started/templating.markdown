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

The template helper enables one to mathematically manipulate values, use variables to extract values from JSON, and create customized messages to send with the [notification component](components/notify/). If the entity has template support then the `value_template` key can be set and used (eg. `message:` in `data:` of an automation rule) in the `configuration.yaml` file.

```yaml
value_template: '{% raw %}{{ value.x }}{% endraw %}'
```

To check your templates on-the-fly checkout the **Template Editor** from the **Developer Tools**.

For a complete overview, check the [Jinja2 documentation](http://jinja.pocoo.org/docs/dev/templates/).

### {% linkable_title Accessing variables %}

The [variables](http://jinja.pocoo.org/docs/dev/templates/#variables) are handled the same way as in Python.

| Method         | description |
| -------------- | ---------- |
| `{% raw %}{{ value.x }}{% endraw %}` or `{% raw %}{{ value.['x'] }}{% endraw %}` | Normal value |
| `{% raw %}{{ value_json.x }}{% endraw %}` | JSON value |

The evaluation leads to an empty string if it's unsuccessful and printed or iterated over.

### {% linkable_title The `states` variable %}

The template support has a special `states` variable:

 - Iterating `states` will yield each state sorted alphabetically by entity id
 - Iterating `states.domain` will yield each state of that domain sorted alphabetically by entity id
 - `states.sensor.temperature` returns state object for `sensor.temperature`

Example templates and what they could result in:

| Template | Output |
| ------------ | ---------- |
| `{% raw %}{{ states.device_tracker.paulus.state }}{% endraw %}` | home |
| `{% raw %}{% for state in states.sensor %}{{ state.entity_id }}={{ state.state }}, {% endfor %}{% endraw %}`| senor.thermostat=24, sensor.humidity=40,  |

### {% linkable_title Mathematical functions %}

The mathematical methods convert strings to numbers automatically before they are doing their job. This could be useful if you recieve data in the wrong unit of measurement and want to convert it. They are used like the standard [Jinja2 filters](http://jinja.pocoo.org/docs/dev/templates/#filters).

| Method         | description |
| -------------- | ---------- |
| `multiply(x)`  | Multiplies the value with `x` |
| `round(x)`     | Maximal number `x` of decimal places for the value |

A sample sensor entry for your `configuration.yaml` file could look like this:

```yaml
# Example configuration.yaml entry
sensor:
  platform: dweet
  device: temp-sensor012
  value_template: '{% raw %}{{ value_json.temperature | multiply(1.02) | round(2) }}{% endraw %}'
  unit_of_measurement: "°C"
```

