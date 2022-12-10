---
title: Slow PWM
description: Convert switches to numeric input using slow Pulse-Width-Modulation
ha_category:
  - Number
ha_release: 2023.01
ha_iot_class: Local Polling
ha_domain: slow_pwm
ha_platforms:
  - number
ha_integration_type: integration
---

The `slow_pwm` platform is a `number` implemented in Home Assistant. It can be used to control one or multiple digital switches in an analog control algorithm. 
The switches will be controlled by Pulse-Width-Manipulation (PWM, See https://en.wikipedia.org/wiki/Pulse-width_modulation). 
This enables the usage of digital switches in more advanded controller systems like PID controllers or thermostats.

```yaml
# Example configuration.yaml entry
number:
  - platform: slow_pwm
    numbers:
      - name: Floorheater living room
        outputs:
          - entity_id: "switch.living_room_group1"
          - entity_id: "switch.living_room_group2"
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
  default: 00:30:00
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
{% endconfiguration %}

## Full configuration example

```yaml
number:
  - platform: slow_pwm
    numbers:
      - name: Floorheater living room
        outputs:
          - entity_id: "switch.living_room_group1"
          - entity_id: "switch.living_room_group2"
         minimum: 10
         maximum: 200
         cycle_time: 00:10:00
         step: 3
         mode: "auto"
```
