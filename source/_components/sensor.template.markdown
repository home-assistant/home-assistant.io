---
layout: page
title: "Template Sensor"
description: "Instructions how to integrate Template sensors into Home Assistant."
date: 2016-01-27 07:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
---

The `template` platform supports sensors which breaks out `state_attributes` from other entities.

To enable Template sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: template
  sensors:
    solar_angle:
      value_template: {% raw %}'{{ states.sun.sun.attributes.elevation }}'{% endraw %}
      friendly_name: 'Sun angle'
      unit_of_measurement: 'degrees'
    sunrise:
      value_template: {% raw %}'{{ states.sun.sun.attributes.next_rising }}'{% endraw %}
```

Configuration variables:

- **sensors** array (*Required*): List of your sensors.
  - **friendly_name** (*Optional*): Name to use in the Frontend.
  - **unit_of_measurement** (*Optional*): Defines the units of measurement of the sensor, if any.
  - **value_template** (*Optional*): Defines a [template](/getting-started/templating/) to extract a value from the payload.


## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Sun angle %}

This example shows the sun angle in the frontend.

```yaml
sensor:
  platform: template
  sensors:
      solar_angle:
        value_template: {% raw %}'{{ "%+.1f"|format(states.sun.sun.attributes.elevation) }}'{% endraw %}
        friendly_name: 'Sun Angle'
        unit_of_measurement: '°'
```

### {% linkable_title Multi line example with an if test  %}

This example shows a multiple line template with and is test. It looks at a sensing switch and shows on/off in the frontend.

```yaml
sensor:
  platform: template
  sensors:
      kettle:
        friendly_name: 'Kettle'
        {% raw %}value_template: >-
            {%- if is_state("switch.kettle", "off") %}
                off
            {%  elif states.switch.kettle.attributes.kwh < 1000 %}
                standby
            {% elif is_state("switch.kettle", "on") %}
                on
            {% else %}
                failed
            {%- endif %}{% endraw %}

```
(please note the blank line to close the multi-line template)


