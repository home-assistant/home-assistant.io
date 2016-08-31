---
layout: page
title: "Template Binary Sensor"
description: "Instructions how to integrate Template binary sensors into Home Assistant."
date: 2016-02-25 15:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Binary Sensor
logo: home-assistant.png
---

The `template` platform supports sensors which breaks out the state and `state_attributes` from other entities.

To enable Template binary sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: template
    sensors:
      sun_up:
        value_template: {% raw %}'{{ states.sun.sun.attributes.elevation > 0}}'{% endraw %}
        friendly_name: 'Sun is up'
```

Configuration variables:

- **sensors** array (*Required*): List of your sensors.
  - **friendly_name** (*Optional*): Name to use in the Frontend.
  - **sensor_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
  - **value_template** (*Optional*): Defines a [template](/topics/templating/) to extract a value from the payload.
  - **entity_id** (*Optional*): Add a list of entity IDs so the sensor only reacts to state changes of these entities. This will reduce the number of times the sensor will try to update it's state.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Sensor threshold %}

This example indicates true if a sensor is above a given threshold. Assuming a sensor of `furnace` that provides a current reading for the fan motor, we can determine if the furnace is running by checking that it is over some threshold:

```yaml
sensor:
  - platform: template
    sensors:
      furnace_on:
        value_template: {% raw %}{{ states.sensor.furnace.state > 2.5 }}{% endraw %}
        friendly_name: 'Furnace Running
        sensor_class: heat
```

### {% linkable_title Switch as sensor %}

Some movement sensors and door/window sensors will appear as a switch. By using a template binary sensor, the switch can be displayed as a binary sensors. The original switch can then be hidden by [customizing.](/getting-started/customizing-devices/)

```yaml
binary_sensor: 
  - platform: template 
    sensors:
      movement:
        value_template: {% raw %}"{{ states.switch.movement.state == 'on' }}"{% endraw %}
        sensor_class: motion
      door:
        value_template: {% raw %}"{{ states.switch.door.state == 'on' }}"{% endraw %} 
        sensor_class: opening
```


### {% linkable_title Combining multiple sensors, and using entity_id: %}

This example combines multiple CO sensors into a single overall status. It also shows how to use `entity_id`

```yaml
binary_sensor: 
  - platform: template 
    sensors:
      co:
        friendly_name: 'CO'
        sensor_class: 'gas'
        value_template: {% raw %}>-
          {%- if is_state("sensor.bedroom_co_status", "Ok") 
              and is_state("sensor.kitchen_co_status", "Ok")
              and is_state("sensor.wardrobe_co_status", "Ok") -%}
          Off
          {%- else -%}
          On
          {%- endif %}{% endraw %}
        entity_id:
          - sensor.bedroom_co_status
          - sensor.kitchen_co_status
          - sensor.wardrobe_co_status
```
