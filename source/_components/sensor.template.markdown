---
layout: page
title: "Template Sensor"
description: "Instructions on how to integrate Template Sensors into Home Assistant."
date: 2016-01-27 07:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.12
ha_iot_class: "Local Push"
logo: home-assistant.png
ha_qa_scale: internal
---

The `template` platform supports sensors which break out `state_attributes` from other entities.

<p class='note'>
If you do not supply an `entity_id` in the configuration you will need to run the service `homeassistant.update_entity` to update the sensor.
</p>

## {% linkable_title Configuration %}

To enable Template Sensors in your installation, add the following to your `configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: template
    sensors:
      solar_angle:
        friendly_name: "Sun angle"
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
      friendly_name_template:
        description: Defines a template for the name to be used in the frontend (this overrides friendly_name).
        required: false
        type: template
      entity_id:
        description: The template engine will attempt to work out what entities should trigger an update of the sensor. If this fails to get the correct list (for example if your template loops over the contents of a group) then you can provide a list of entity IDs that will cause the sensor to update.
        required: false
        type: string, list
      unit_of_measurement:
        description: "Defines the units of measurement of the sensor, if any. This will also influence the graphical presentation in the history visualisation as continuous value. Sensors with missing `unit_of_measurement` are showing as discrete values."
        required: false
        type: string
        default: None
      value_template:
        description: Defines a template to get the state of the sensor.
        required: true
        type: template
      icon_template:
        description: Defines a template for the icon of the sensor.
        required: false
        type: template
      entity_picture_template:
        description: Defines a template for the entity picture of the sensor.
        required: false
        type: template
      device_class:
        description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below). It does not set the `unit_of_measurement`.
        required: false
        type: device_class
        default: None
{% endconfiguration %}

## {% linkable_title Considerations %}

If you are using the state of a platform that takes extra time to load, the Template Sensor may get an `unknown` state during startup. To avoid this (and the resulting error messages in your log file), you can use `is_state()` function in your template. For example, you would replace {% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an `unknown` result:
{% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}

## {% linkable_title Examples %}

In this section you find some real-life examples of how to use this sensor.

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

If you don't like the wording of a sensor output then the Template Sensor can help too. Let's rename the output of the [Sun component](/components/sun/) as
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

Processes monitored by the [System Monitor sensor](/components/sensor.systemmonitor/) show `on` or `off` if they are running or not. This example shows how the output of a monitored `glances` process can be renamed.

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

The [Template Binary Sensor](/components/binary_sensor.template/) is the one in similar cases if you prefer to see an icon instead of text.

### {% linkable_title Multiline Example With an `if` Test %}

This example shows a multiple line template with an `if` test. It looks at a sensing switch and shows `on`/`off` in the frontend.

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

With a Template Sensor it's easy to convert given values into others if the unit of measurement doesn't fit your needs.

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

### {% linkable_title Change the Friendly Name Used in the Frontend %}

This example shows how to change the `friendly_name` based on a date.
Explanation: We add a multiple of 86400 seconds (= 1 day) to the current unix timestamp to get a future date.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      forecast_1_day_ahead:
        friendly_name_template: >-
          {%- set date = as_timestamp(now()) + (1 * 86400 ) -%}
          {{ date|timestamp_custom("Tomorrow (%-m/%-d)") }}
        value_template: "{{ sensor.darksky_weather_forecast_1 }}"
      forecast_2_days_ahead:
        friendly_name_template: >-
          {%- set date = as_timestamp(now()) + (2 * 86400 ) -%}
          {{ date|timestamp_custom("%A (%-m/%-d)") }}
        value_template: "{{ sensor.darksky_weather_forecast_2 }}"
```
{% endraw %}

This example shows how to change the `friendly_name` based on a state.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      net_power:
        friendly_name_template: >-
          {% if states('sensor.power_consumption')|float < 0 %}
            Power Consumption
          {% else %}
            Power Production
          {% end %}
        value_template: "{{ states('sensor.power_consumption') }}"
        unit_of_measurement: 'kW'
```
{% endraw %}

### {% linkable_title Working with dates %}

The `template` sensors are not limited to use attributes from other entities but can also work with [Home Assistant's template extensions](/docs/configuration/templating/#home-assistant-template-extensions). This template contains no entities that will trigger an update, so either we need to use `homeassistant.update_entity` or add an `entity_id:` line for an entity that will force an update - here we're using `sun.sun`.

{% raw %}
```yaml
sensor:
- platform: template
  sensors:
    nonsmoker:
      value_template: '{{ (( as_timestamp(now()) - as_timestamp(strptime("06.07.2018", "%d.%m.%Y")) ) / 86400 ) | round(2) }}'
      entity_id: sun.sun
      friendly_name: 'Not smoking'
      unit_of_measurement: "Days"
```
{% endraw %}

### {% linkable_title Template tracking %}

This example shows how to add `entity_id` to a template to allow tracking of updates. Fixing an error caused in (81.0) 

{% raw %}
```yaml
sensor:
- platform: template
  sensors:
    nonsmoker:
      entity_id: now.strptime
      value_template: '{{ (( as_timestamp(now()) - as_timestamp(strptime("06.07.2018", "%d.%m.%Y")) ) / 86400 ) | round(2) }}'
      friendly_name: 'Not smoking'
      unit_of_measurement: "Days"
```
{% endraw %}

Note: If a template uses more than one sensor they can be listed


The alternative to this is to create an `Automation`using the new (81.0) service `homeassistant.update_entity` and list all entity's requiring updates and setting the interval based on time.

{% raw %}
```yaml
automation:
  - alias: 'nonsmoker_update'
    trigger:
      - platform: time
        minutes: '/1'
    action:
      - service: homeassistant.update_entity
        entity_id: sensor.nonsmoker
```
{% endraw %}
