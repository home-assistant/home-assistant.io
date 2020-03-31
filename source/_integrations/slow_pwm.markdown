---
title: Slow PWM
description: Instructions on how to integrate a slow PWM device within Home Assistant.
ha_category:
  - Analog Output
  - Switch
ha_release: '0.109'
ha_iot_class: Local Push
ha_domain: slow_pwm
---

The Slow PWM integration provides a virtual device that converts a [Switch](#switch) to an [Analog output](#analog_output). The PWM cycle is slow, typically > 1 minute. This integration is particularly helpful when controlling slow processes, like floor-heating valves or hot-water boiler heating elements. Using this device allows you to control them in a PID regulator or other modulating regulation systems.

## Configuration

To add the slow-PWM output to your installation, add the following to your `configuration.yaml` file:
 

# Example configuration.yaml entry
analog_output:
  - platform: slow_pwm
    name: PWM heater living
    device: heater.living


{% configuration %}
name:
  description: Name of the analog-output (slow-PWM) device
  required: true
  type: string
device:
  description: Name of the switch that should be switched in the PWM loop.
  required: true
  type: string
minimum: 
  description: Minimum value of the analog output.
  required: false
  type: float
  default: 0
maximum: 
  description: Maximum value of the analog output.
  required: false
  type: float
  default: 100
cycletime: 
  description: Duration of the PWM loop in the format 'HH:MM:SS'. Recommended duration depends on the hardware controlled. Generally, it should be > 30 s.
  required: false
  type: string
  default: '00:30:00' (30 minutes)
icon:
  description: Set a custom icon for the state card.
  required: false
  type: icon
initial_value: 
  description: Initial output value on startup (independend from if the output is activated or not). It is recommended to not set this to 0, as this will switch off the analog output immedeatly after switching it on.
  required: false
  type: float
  default: 100
initial_state: 
  description: Initial output state on startup (value not equal to 0 will switch the output on at startup)
  required: false
  type: float
  default: 0
upper_threshold:
  description: Upper threshold of the analog output. Above this value the PWM cycle will be de-activated, and the output will be switched on. This function can be useful to lower the amount of switching without reducing the resolution in the working area.
  required: false
  type: float
  default: 100
lower_threshold:
  description: Lower threshold of the analog output. Below this value the PWM cycle will be de-activated, and the output will be switched off.  This function can be useful to lower the amount of switching without reducing the resolution in the working area.
  required: false
  type: float
  default: 100
step:
  description: Step value. Smallest value `0.001`.
  required: false
  type: float
  default: 1  
mode:
  description: Can specify `box` or `slider`, for definition of state card.
  required: false
  type: string
  default: slider
{% endconfiguration %}
