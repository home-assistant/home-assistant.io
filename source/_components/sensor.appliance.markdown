---
layout: page
title: "Appliance Sensor"
description: "Instructions on how to add appliance sensors within Home Assistant."
date: 2019-06-02 01:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category:
  - Sensor
ha_release: 0.95
ha_iot_class: Local Push
ha_qa_scale: internal
---

The `appliance` sensor determines the state of an appliance (e.g. a dish washer) by analyzing the latest sequence of states of another sensor, typically a power consumtion sensor.
The state of the appliance is determined in two steps:
1. The power consumption is used to determine one of a number of pre-defined "power modes".
   A power mode is simply a label for a certain range of power consumption (e.g. from 100 to 500 W).
2. The latest sequence of power modes, is used to determine what state the appliance is currently in. 
   The state can be used in automations to e.g. trigger notifications.


## {% linkable_title Configuration %}

To add the appliance sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

sensor:
  - platform: appliance
    name: appliance_sensor
    entity_id: sensor.source_sensor
    power_modes:
      - name: 'Off'
        power_low: 0
    states: 
      - state: 'Off'
        sequence:
          - step: 1
            mode: 'Off'
            duration: 0
            duration_type: min
```

{% configuration %}
name:
  description: The name of the appliance sensor
  required: true
  type: string
entity_id:
  description: The entity id of the the (power consumption) sensor from which the appliance state is determined.
  required: true
  type: string
icon_template:
  description: The icon to be used for the appliance sensor.
  required: false
  type: string
power_modes:
  description: A list of one or several definied modes, where each mode is given a name and a lower threshold (power_low).
  required: true
  type: list
states:
  description: A list of the different states for the appliance.
  required: true
  type: list
state:
  description: A definied state for the appliance, given by a certain sequence.
  required: true
  type: string
sequence:
  description: The sequence of power modes that determine whether the appliance is in a certain state. The list should state a step, a mode, a duration and duration type (either 'min' or 'max').
  required: true
  type: list
{% endconfiguration %}


Example of how an appliance configuration can look:

```yaml
# Example configuration.yaml entry
- platform: appliance
  name: "Dishwasher Status"
  entity_id: sensor.dishwasher_power
  icon_template: mdi:application
  power_modes:
    - name: 'Off'
      power_low: 0
    - name: 'Resting'
      power_low: 0.5
    - name: 'Washing Low'
      power_low: 2
    - name: 'Washing High'
      power_low: 100
  states:
    - state: 'Off'
      sequence:
        - step: 1
          mode: 'Off'
          duration: 3
          duration_type: min
    - state: 'Started'
      sequence:
        - step: 1
          mode: 'Off'
          duration: 20
          duration_type: min
        - step: 2
          mode: 'Resting'
          duration: 1
          duration_type: min
    - state: 'Wash ongoing'
      sequence:
        - step: 1
          mode: 'Washing Low'
          duration: 60
          duration_type: min
    - state: 'Wash ongoing'
      sequence:
        - step: 1
          mode: 'Washin High'
          duration: 60
          duration_type: min
    - state: 'Done'
      sequence:
        - step: 1
          mode: 'Washing Low'
          duration: 900
          duration_type: min
        - step: 2
          mode: 'Resting'
          duration: 10
          duration_type: min
```
