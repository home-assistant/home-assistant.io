---
title: Slow PWM
description: Convert switches to numeric input using slow Pulse-Width-Modulation
ha_category:
  - Number
ha_release: '2023.01'
ha_iot_class: Local Polling
ha_domain: slow_pwm
ha_platforms:
  - number
ha_integration_type: integration
---

The `slow_pwm` platform is a `number`. It can be used to control one or multiple digital switches in an analog control algorithm. 
The switches will be controlled by Pulse-Width-Manipulation (PWM, See https://en.wikipedia.org/wiki/Pulse-width_modulation). 
This enables the usage of digital switches in modulated modes. This is typically usefull in slow systems like floorheater or boiler heater controller systems. The [PID controller](/integrations/pid) can use this number as regulated output. 

## Configuration
{% include integrations/config_flow.md %}
{% configuration_basic %}
Name:
  description: The name the sensor should have. You can change it again later.
Output switch entities:
  description: One or more output switches. When multiple outputs are selected, the range of 0..100% will be shared over the multiple switches. For example, with 2 switches at 50% output only the first switch will be on full time, at 75% the first switch will be on 100% of the time, and the second 50%.
Minimum:
  description: Minimal value of the number. On this value, all switches will be switched off continously.
Maximum:
  description: Maximal value of the number. On this value, all switches will be switched on continously.
Cycle time:
  description: Duration to execute a single controller cycle.
Minimal switch time:
  description: Shortest possible time a switch should be on- or off. This parameter is typically usefull in slow switching applications like the wax-valve of domestic heater systems.
Step:
  description: Step size of the number.
Mode: 
  description: Mode of user interface elements.
{% endconfiguration_basic %}
