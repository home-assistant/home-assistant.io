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

The `template` platform supports sensors which breaks out the `state` and `state_attributes` from other entities. The state of a template binary sensor can only be `on` or `off`.

To enable template binary sensors in your installation, add the following to your `configuration.yaml` file:

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
  - **device_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
  - **value_template** (*Optional*): Defines a [template](/topics/templating/) to extract a value from the payload.
  - **entity_id** (*Optional*): Add a list of entity IDs so the sensor only reacts to state changes of these entities. This will reduce the number of times the sensor will try to update it's state.
  - **on_delay** (*Optional*): The amount of time the template state must be met before this sensor will switch to on.
  - **off_delay** (*Optional*): The amount of time the template state must be not met before this sensor will switch to off.

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
        friendly_name: 'Furnace Running'
        device_class: heat
```

### {% linkable_title Switch as sensor %}

Some movement sensors and door/window sensors will appear as a switch. By using a template binary sensor, the switch can be displayed as a binary sensors. The original switch can then be hidden by [customizing.](/getting-started/customizing-devices/)

```yaml
binary_sensor:
  - platform: template
    sensors:
      movement:
        value_template: {% raw %}"{{ states.switch.movement.state == 'on' }}"{% endraw %}
        device_class: motion
      door:
        value_template: {% raw %}"{{ states.switch.door.state == 'on' }}"{% endraw %}
        device_class: opening
```


### {% linkable_title Combining multiple sensors, and using entity_id: %}

This example combines multiple CO sensors into a single overall
status. When using templates with binary sensors, you need to return
`True` or `False` explicitly. `entity_id` is used to limit which
sensors are being monitored to update the state, making computing this
sensor far more efficient.

```yaml
binary_sensor:
  - platform: template
    sensors:
      co:
        friendly_name: 'CO'
        device_class: 'gas'
        value_template: {% raw %}>-
          {%- if is_state("sensor.bedroom_co_status", "Ok")
              and is_state("sensor.kitchen_co_status", "Ok")
              and is_state("sensor.wardrobe_co_status", "Ok") -%}
          False
          {%- else -%}
          True
          {%- endif %}{% endraw %}
        entity_id:
          - sensor.bedroom_co_status
          - sensor.kitchen_co_status
          - sensor.wardrobe_co_status
```

### {% linkable_title Washing Machine Running %}

This example creates a washing machine "load running" sensor by monitoring an energy meter connected to the washer. During the washer's operation, the energy meter will fluctuate wildly, hitting zero frequently even before the load is finished. By utilizing `off_delay`, we can have this sensor only turn off if there has been no washer activity for 5 minutes.

```yaml
# Determine when the washing machine has a load running.
binary_sensor:
  - platform: template
    name: Washing Machine
    value_template: {% raw %}'{{ sensor.washing_machine_power > 0 }}'{% endraw %}
    off_delay:
      minutes: 5
```

### {% linkable_title Is anyone home? %}

This example is determining if anyone is home based on the combination
of device tracking and motion sensors. It's extremely useful if you
have kids / baby sitter / grand parrents who might still be in your
house that aren't represented by a trackable device in home
assistant. This is providing a composite of wifi based device tracking
and z-wave multisensor presence sensors.

```yaml
binary_sensor:
  - platform: template
    sensors:
      people_home:
        value_template: {% raw %}>-
          {%- if is_state("device_tracker.sean", "home")
          or is_state("device_tracker.susan", "home")
          or is_state("binary_sensor.office_124", "on")
          or is_state("binary_sensor.hallway_134", "on")
          or is_state("binary_sensor.living_room_139", "on")
          or is_state("binary_sensor.porch_ms6_1_129", "on")
          or is_state("binary_sensor.family_room_144", "on")
              -%}
          True
          {%- else -%}
          False
          {%- endif %}{% endraw %}
        entity_id:
          - device_tracker.sean
          - device_tracker.susan
          - binary_sensor.office_124
          - binary_sensor.hallway_134
          - binary_sensor.living_room_139
          - binary_sensor.porch_ms6_1_129
          - binary_sensor.family_room_144
```
