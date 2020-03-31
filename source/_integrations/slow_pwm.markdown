---
title: Slow PWM
description: Instructions on how to integrate a slow PWM device within Home Assistant.
ha_category:
  - Analog Output
  - Switch
ha_release: 0.109
ha_iot_class: Local Push
ha_domain: slow_pwm
---
The Slow PWM integration provides a virtual device that converts a [Switch](#switch) to an [Analog output](#analog_output). The PWM cycle is slow, typically > 1 minute. This integration is particularly helpful when controlling slow processes, like floor-heating valves or hot-water boiler heating elements. Using this device allows you to control them in a PID regulator or other modulating regulation systems.

## Configuration

To add the slow-PWM output to your installation, add the following to your `configuration.yaml` file:
 
```yaml
# Example configuration.yaml entry
analog_output:
  - platform: slow_pwm
    name: PWM heater living
    device: heater.living
```

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
  description: Duration of the PWM loop in the format `HH:MM:SS`. Recommended duration depends on the hardware controlled. Generally, it should be > 30 s.
  required: false
  type: string
  default: `00:30:00` (30 minutes)
{% endconfiguration %}
