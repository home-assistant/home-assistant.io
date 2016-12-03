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
ha_release: 0.12
ha_iot_class: "Local Push"
logo: home-assistant.png
---

The `template` platform supports sensors which break out `state_attributes` from other entities.

To enable Template sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: template
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
  - **value_template** (*Required*): Defines a [template](/topics/templating/) to extract a value from the event bus.
  - **entity_id** (*Optional*): Add a list of entity IDs so the sensor only reacts to state changes of these entities. This will reduce the number of times the sensor will try to update it's state.


## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Sun angle %}

This example shows the sun angle in the frontend.

```yaml
sensor:
  - platform: template
    sensors:
      solar_angle:
        value_template: {% raw %}'{{ "%+.1f"|format(states.sun.sun.attributes.elevation) }}'{% endraw %}
        friendly_name: 'Sun Angle'
        unit_of_measurement: '°'
```

### {% linkable_title Renaming sensor output %}

If you don't like the wording of a sensor output then the template sensor can help too. Let's rename the output of the [Sun component](/components/sun/) as a simple example:

```yaml
sensor:
  - platform: template
    sensors:
      sun_state:
        value_template: {% raw %}'{% if is_state("sun.sun", "above_horizon") %}up{% else %}down{% endif %}'{% endraw %}
        friendly_name: 'Sun state'
```

Processes monitored by the [System Monitor sensor](/components/sensor.systemmonitor/) show `on` or `off` if they are running or not. This example shows how the output of a monitored `glances` process can be renamed.

```yaml
sensor:
  - platform: template
    sensors:
      glances:
        value_template: {% raw %}'{% if is_state("sensor.process_glances", "off") %}not running{% else %}running{% endif %}'{% endraw %}
        friendly_name: 'Glances'
```

By comparing the details published on the [template](/topics/templating/) page the same can be achieved with a different approach: 

```yaml
value_template: {% raw %}"{%if states.sensor.ENTITY_ID.state == 'on' %}running{%elif states.switch.ENTITY_ID.state == 'off' %}not running{% endif %}"{% endraw %}
```

The [Binary template sensor](/components/binary_sensor.template/) is the one in similar cases if you prefer to see an icon instead of text.

### {% linkable_title Multiline example with an if test %}

This example shows a multiple line template with an if test. It looks at a sensing switch and shows on/off in the frontend.

```yaml
sensor:
  - platform: template
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

      next_sensor:
      [...]
```

<p class='note'>
Please note the blank line to close the multi-line template.
</p>

### {% linkable_title Change the unit of measurement %}

With a template sensor it's easy to convert given values into others if the unit of measurement doesn't fit your needs.

```yaml
sensor:
  - platform: template
    sensors:
      transmission_down_speed_kbps:
        value_template: {% raw %}'{{ states.sensor.transmission_down_speed.state | multiply(1024) }}'{% endraw %}
        friendly_name: 'Transmission Down Speed'
        unit_of_measurement: 'kB/s'
      transmission_up_speed_kbps:
        value_template: {% raw %}'{{ states.sensor.transmission_up_speed.state | multiply(1024) }}'{% endraw %}
        friendly_name: 'Transmission Up Speed'
        unit_of_measurement: 'kB/s'
```

