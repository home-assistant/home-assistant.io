---
title: Slow PWM
description: Convert one or multiple switches to a numeric input using slow pulse width modulation
ha_category:
  - Number
ha_release: '2023.05'
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@antonverburg'
ha_domain: slow_pwm
ha_platforms:
  - number
ha_integration_type: integration
---

The `slow_pwm` platform is a `number`. It can be used to control one or multiple digital switches in an analog control algorithm. 
The switches will be controlled by pulse width modulation (PWM, see https://en.wikipedia.org/wiki/Pulse-width_modulation). 
This enables the usage of digital switches in modulated modes. This is typically useful in slow systems like floor heater or boiler heater controller systems. The [PID controller](/integrations/pid_controller) and the [PID thermostat](/integrations/pid_thermostat)  can use this number as regulated output. 

## Configuration
{% include integrations/config_flow.md %}
{% configuration_basic %}
Name:
  description: The name the sensor should have. You can change it again later.
Output switch entities:
  description: One or more output switches. When multiple outputs are selected, the range of 0..100% will be shared over the multiple switches. For example, with 2 switches at 50% output, only the first switch will be on full time, at 75% the first switch will be on 100% of the time, and the second 50%.
Minimum:
  description: Minimal value of the number. On this value, all switches will be switched off continuously.
Maximum:
  description: Maximal value of the number. On this value, all switches will be switched on continuously.
Cycle time:
  description: Duration to execute a single controller cycle.
Minimal switch time:
  description: Shortest possible time a switch should be on or off. This parameter is typically useful in slow-switching applications like the wax valve of domestic heater systems.
Step:
  description: Step size of the number.
Mode: 
  description: Mode of user interface elements.
{% endconfiguration_basic %}

## YAML Configuration

Alternatlively, this integration can be configured and set up manually via YAML
instead. To enable the Integration sensor in your installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
number:
  - platform: slow_pwm
    name: Floorheater living room
    outputs:
      - "switch.living_room_group1"
``` 

{% configuration %}
name:
  description: Name of the slow_pwm.
  required: true
  type: string
outputs:
  description: `entity_id`'s for switches, must be toggle devices. When multiple outputs are selected, the range of 0..100% will be shared over the multiple switches. For example, with 2 switches at 50% output only the first switch will be on full time, at 75% the first switch will be on 100% of the time, and the second 50%.
  required: true
  type: multiple strings
minimum:
  description: Minimal value of the slow_pwm number. Timed output will be normalized between minimum and maximum.
  required: false
  default: 0
  type: float
maximum:
  description: Maximal value of the slow_pwm number. Timed output will be normalized between minimum and maximum.
  required: false
  default: 100
  type: float
cycle_time:
  description: Cycle time for the PWM cycle.
  required: false
  default: "{'minutes': 30}"
  type: time_period
step:
  description: Step value. Smallest value `0.001`.
  required: false
  type: float
  default: 1
mode:
  description: Control how the number should be displayed in the UI. Can be set to `box` or `slider` to force a display mode.
  required: false
  type: string
  default: '"auto"'
unique_id:
  description: Unique id to be able to configure the entity in the UI.
  required: false
  type: string
{% endconfiguration %}

## Full configuration example

```yaml
number:
  - platform: slow_pwm
    name: Floorheater living room
    outputs:
      - "switch.living_room_group1"
      - "switch.living_room_group2"
    minimum: 10
    maximum: 200
    cycle_time:  {'hours':0, 'minutes':20, 'seconds': 00}
    minimal_switch_time: {'hours':0, 'minutes':0, 'seconds': 30}
    step: 3
    mode: "auto"
    unique_id: "MyUniqueID_1234"
```
