---
layout: page
title: "Template Sensor"
description: "Instructions how to integrate Template Sensors into Home Assistant."
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

The `template` platform supports sensors which break out `state_attributes`
from other entities.

To enable Template Sensors in your installation, add the following to your
`configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: template
    sensors:
      solar_angle:
        friendly_name: "Sun angle"
        entity_id: sun.sun
        unit_of_measurement: 'degrees'
        value_template: "{{ states.sun.sun.attributes.elevation }}"

      sunrise:
        value_template: "{{ states.sun.sun.attributes.next_rising }}"
```
{% endraw %}

{% configuration %}
  sensors:
    description: List of your sensors.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      unit_of_measurement:
        description: Defines the units of measurement of the sensor, if any.
        required: false
        type: string
      value_template:
        description: Defines a template to get the state of the sensor.
        required: true
        type: template
      icon_template:
        description: Defines a template for the icon of the sensor.
        required: false
        type: template
      icon_template:
        description: Defines a template for the entity picture of the sensor.
        required: false
        type: template
{% endconfiguration %}

## {% linkable_title Considerations %}

If you are using the state of a platform that takes extra time to load, the
Template Sensor may get an `unknown` state during startup. To avoid this (and the resulting
error messages in your log file), you can use `is_state()` function in your template.
For example, you would replace
{% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %}
with this equivalent that returns `true`/`false` and never gives an `unknown`
result:
{% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Sun Angle %}

This example shows the sun angle in the frontend.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      solar_angle:
        friendly_name: "Sun Angle"
        unit_of_measurement: '°'
        value_template: "{{ '%+.1f'|format(states.sun.sun.attributes.elevation) }}"
```
{% endraw %}

### {% linkable_title Renaming Sensor Output %}

If you don't like the wording of a sensor output then the Template Sensor can
help too. Let's rename the output of the [Sun component](/components/sun/) as
a simple example:

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      sun_state:
        friendly_name: "Sun State"
        value_template: >-
          {% if is_state('sun.sun', 'above_horizon') %}
            up
          {% else %}
            down
          {% endif %}
```
{% endraw %}

Processes monitored by the [System Monitor sensor](/components/sensor.systemmonitor/)
show `on` or `off` if they are running or not. This example shows how the
output of a monitored `glances` process can be renamed.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      glances:
        friendly_name: "Glances"
        value_template: >-
          {% if is_state('sensor.process_glances', 'on') %}
            running
          {% else %}
            not running
          {% endif %}
```
{% endraw %}

The [Template Binary Sensor](/components/binary_sensor.template/) is the one in
similar cases if you prefer to see an icon instead of text.

### {% linkable_title Multiline Example With an `if` Test %}

This example shows a multiple line template with an `if` test. It looks at a
sensing switch and shows `on`/`off` in the frontend.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      kettle:
        friendly_name: "Kettle"
        value_template: >-
          {% if is_state('switch.kettle', 'off') %}
            off
          {% elif states.switch.kettle.attributes.kwh|float < 1000 %}
            standby
          {% elif is_state('switch.kettle', 'on') %}
            on
          {% else %}
            failed
          {% endif %}

      next_sensor:
        ...
```
{% endraw %}

### {% linkable_title Change The Unit of Measurement %}

With a Template Sensor it's easy to convert given values into others if the
unit of measurement doesn't fit your needs.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      transmission_down_speed_kbps:
        friendly_name: "Transmission Down Speed"
        unit_of_measurement: 'kB/s'
        value_template: "{{ states('sensor.transmission_down_speed')|float * 1024 }}"

      transmission_up_speed_kbps:
        friendly_name: "Transmission Up Speed"
        unit_of_measurement: 'kB/s'
        value_template: "{{ states('sensor.transmission_up_speed')|float * 1024 }}"
```
{% endraw %}

### {% linkable_title Change The Icon %}

This example shows how to change the icon based on the day/night cycle.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      day_night:
        friendly_name: "Day/Night"
        value_template: >-
          {% if is_state('sun.sun', 'above_horizon') %}
            Day
          {% else %}
            Night
          {% endif %}
        icon_template: >-
          {% if is_state('sun.sun', 'above_horizon') %}
            mdi:weather-sunny
          {% else %}
            mdi:weather-night
          {% endif %}
```
{% endraw %}

### {% linkable_title Change The Entity Picture %}

This example shows how to change the entity picture based on the day/night cycle.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      day_night:
        friendly_name: "Day/Night"
        value_template: >-
          {% if is_state('sun.sun', 'above_horizon') %}
            Day
          {% else %}
            Night
          {% endif %}
        entity_picture_template: >-
          {% if is_state('sun.sun', 'above_horizon') %}
            /local/daytime.png
          {% else %}
            /local/nighttime.png
          {% endif %}
```
{% endraw %}
