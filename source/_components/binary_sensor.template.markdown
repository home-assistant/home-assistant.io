---
layout: page
title: "Template Binary Sensor"
description: "Instructions on how to integrate Template Binary Sensors into Home Assistant."
date: 2016-02-25 15:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Binary Sensor
ha_release: 0.12
ha_iot_class: "Local Push"
logo: home-assistant.png
ha_qa_scale: internal
---

The `template` platform supports binary sensors which get their values from
other entities. The state of a Template Binary Sensor can only be `on` or
`off`.

## {% linkable_title Configuration %}

Here is an example of adding a Template Binary Sensor to the `configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: template
    sensors:
      sun_up:
        friendly_name: "Sun is up"
        value_template: >-
          {{ states.sun.sun.attributes.elevation|float > 0 }}
```
{% endraw %}

{% configuration %}
sensors:
  description: List of your sensors.
  required: true
  type: map
  keys:
    sensor_name:
      description: The slug of the sensor.
      required: true
      type: map
      keys:
        friendly_name:
          description: Name to use in the frontend.
          required: false
          type: string
        entity_id:
          description: A list of entity IDs so the sensor only reacts to state changes of these entities. This can be used if the automatic analysis fails to find all relevant entities.
          required: false
          type: string, list
        device_class:
          description: The type/class of the sensor to set the icon in the frontend.
          required: false
          type: device_class
          default: None
        value_template:
          description: Defines a template to set the state of the sensor.
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
        delay_on:
          description: The amount of time the template state must be ***met*** before this sensor will switch to `on`.
          required: false
          type: time
        delay_off:
          description: The amount of time the template state must be ***not met*** before this sensor will switch to `off`.
          required: false
          type: time
{% endconfiguration %}

## {% linkable_title Considerations %}

### Startup

If you are using the state of a platform that takes extra time to load, the
Template Binary Sensor may get an `unknown` state during startup. This results
in error messages in your log file until that platform has completed loading.
If you use `is_state()` function in your template, you can avoid this situation.
For example, you would replace
{% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %}
with this equivalent that returns `true`/`false` and never gives an unknown
result:
{% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}

### Entity IDs

The template engine will attempt to work out what entities should trigger an
update of the sensor. This can fail, for example if your template loops over
the contents of a group. In this case you can use `entity_id` to provide a
list of entity IDs that will cause the sensor to update or you can run the
service `homeassistant.update_entity` to update the sensor at will.

## {% linkable_title Examples %}

In this section you find some real-life examples of how to use this sensor.

### {% linkable_title Sensor Threshold %}

This example indicates true if a sensor is above a given threshold. Assuming a
sensor of `furnace` that provides a current reading for the fan motor, we can
determine if the furnace is running by checking that it is over some threshold:

{% raw %}
```yaml
binary_sensor:
  - platform: template
    sensors:
      furnace_on:
        friendly_name: "Furnace Running"
        device_class: heat
        value_template: "{{ states('sensor.furnace')|float > 2.5 }}"
```
{% endraw %}

### {% linkable_title Switch as Sensor %}

Some movement sensors and door/window sensors will appear as a switch. By using
a Template Binary Sensor, the switch can be displayed as a binary sensors. The
original switch can then be hidden by
[customizing](/getting-started/customizing-devices/).

{% raw %}
```yaml
binary_sensor:
  - platform: template
    sensors:
      movement:
        device_class: motion
        value_template: "{{ is_state('switch.movement', 'on') }}"
      door:
        device_class: opening
        value_template: "{{ is_state('switch.door', 'on') }}"
```
{% endraw %}

### {% linkable_title Combining Multiple Sensors %}

This example combines multiple CO sensors into a single overall
status. When using templates with binary sensors, you need to return
`true` or `false` explicitly.

{% raw %}
```yaml
binary_sensor:
  - platform: template
    sensors:
      co:
        friendly_name: "CO"
        device_class: gas
        value_template: >-
          {{ is_state('sensor.bedroom_co_status', 'Ok')
             and is_state('sensor.kitchen_co_status', 'Ok')
             and is_state('sensor.wardrobe_co_status', 'Ok') }}
```
{% endraw %}

### {% linkable_title Washing Machine Running %}

This example creates a washing machine "load running" sensor by monitoring an
energy meter connected to the washer. During the washer's operation, the energy
meter will fluctuate wildly, hitting zero frequently even before the load is
finished. By utilizing `delay_off`, we can have this sensor only turn off if
there has been no washer activity for 5 minutes.

{% raw %}
```yaml
# Determine when the washing machine has a load running.
binary_sensor:
  - platform: template
    sensors:
      washing_machine:
        friendly_name: "Washing Machine"
        delay_off:
          minutes: 5
        value_template: >-
          {{ states('sensor.washing_machine_power')|float > 0 }}
```
{% endraw %}

### {% linkable_title Is Anyone Home? %}

This example is determining if anyone is home based on the combination of device
tracking and motion sensors. It's extremely useful if you have kids/baby sitter/
grand parents who might still be in your house that aren't represented by a
trackable device in Home Assistant. This is providing a composite of WiFi based
device tracking and Z-Wave multisensor presence sensors.

{% raw %}
```yaml
binary_sensor:
  - platform: template
    sensors:
      people_home:
        value_template: >-
          {{ is_state('device_tracker.sean', 'home')
             or is_state('device_tracker.susan', 'home')
             or is_state('binary_sensor.office_124', 'on')
             or is_state('binary_sensor.hallway_134', 'on')
             or is_state('binary_sensor.living_room_139', 'on')
             or is_state('binary_sensor.porch_ms6_1_129', 'on')
             or is_state('binary_sensor.family_room_144', 'on') }}
```
{% endraw %}
