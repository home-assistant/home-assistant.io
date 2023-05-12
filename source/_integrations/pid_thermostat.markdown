---
title: PID Thermostat
description: Creates a PID thermostat to regulate the temperature in a room with PID algorithm.
ha_category:
  - Number
ha_release: '2023.05'
ha_iot_class: Local Polling
ha_domain: pid_thermostat
ha_platforms:
  - number
ha_integration_type: integration
---

The `pid_thermostat` climate platform is a thermostat implemented in Home Assistant. It uses a sensor and a number entity connected to a heater or air conditioning under the hood. A typical method to create a number to control a heater or cooler could be to use the [slow_pwm number integration][slow_pwm] . When in heater mode, if the measured temperature is cooler than the target temperature, the heater will be regulated to the required temperature is reached. When in air conditioning mode, if the measured temperature is hotter than the target temperature, the air conditioning will be regulated to the required temperature. One Generic Thermostat entity can only control one number output. If you need to activate two numbers, one for a heater and one for an air conditioner, you will need two Generic Thermostat entities. 
The value for the output number entity will be calculated using the Proportional–Integral–Derivative algorithm (PID, See [https://en.wikipedia.org/wiki/PID_controller]). The implementation of the PID controller contains bumpless operation, and is prevented against integral windup by clipping of the output value to the minimum and maximum of the corresponding output number entity. 

## Configuration
{% include integrations/config_flow.md %}
{% configuration_basic %}
Name:
  description: The name that the PID thermostat should have. You can change it again later.
Heater device entity:
  description: Heater- or cooler number entity. Typically, the [slow_pwm number entity][slow_pwm] can be used to create a number controlling a switch.
Heater device entity:
  description: Temperature sensor, used for input signal.
Proportional gain factor (Kp):
  description: Proportional gain factor, directly gaining the error to compensate the fault (Kp).
Integration factor (Ki):
  description: Integration factor, reducing offset fault over time (Ki).
Differential factor (Kd):
  description: Differential factor, damping the overshoot (Kd).
Thermostat mode: 
  description: Select if the thermostat should be a cooler or a heater.
Duration between controller cycles
  description: Cycle time that elapses between two controller cycles.
{% endconfiguration_basic %}

## YAML Configuration

Alternatlively, this integration can be configured and set up manually via YAML
instead. To enable the PID thermostat entity in your installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: pid_thermostat
    name: Kitchen thermostat
    heater: number.floor_heater
    sensor: sensor.kitchen_temperature
``` 

{% configuration %}
name:
  description: Name of the PID thermostat.
  required: true
  type: string
heater:
  description: `entity_id` for heater- or cooler, must be number device. Typically, the [slow_pwm number entity][slow_pwm] can be used to create a number controlling a switch.
  required: true
  type: string
sensor:
  description: `entity_id` for temperature sensor.
  required: true
  type: string
kp:
  description: Proportional gain factor, directly gaining the error to compensate the fault (Kp).
  required: false
  default: 100.0
  type: float
ki:
  description: Integration factor, reducing offset fault over time (Ki).
  required: false
  default: 0.1
  type: float
kd:
  description: Differential factor, damping the overshoot (Kd).
  required: false
  default: 0.0
  type: float
ac_mode:
  description: Thermostat mode. 
  required: false
  default: direct
  type: string ('cool' or 'heat')
min_temp:
  description: Minimal temperature setpoint.
  required: false
  default: 7
  type: float
max_temp:
  description: Maximal temperature setpoint.
  required: false
  default: 35
  type: float
cycle_time:
  description: Cycle time for the internal PID controller.
  required: false
  default: {"seconds": 30}
  type: time_period
target_temp:
  description: Target tempererature on startup.
  required: false
  default: 19
  type: float
initial_hvac_mode:
  description: Initial hvac mode. 
  required: false
  default: off
  type: string ('off', 'cool' or 'heat')
away_temp:
  description: Preset 'Away' temperature. Preset will only be available in the thermostat when set here.
  required: false
  type: float
  default: not set
unique_id:
  description: Unique id to be able to configure the entity in the UI.
  required: false
  type: string
{% endconfiguration %}

## Full configuration example

```yaml
climate:
  - platform: pid_thermostat
    name: Kitchen thermostat
    heater: number.floor_heater
    sensor: sensor.kitchen_temperature
    kp: 150.0
    ki: 0.5
    kd: 0.01
    ac_mode: heat
    min_temp: 10
    max_temp: 25
    cycle_time: {'hours':0, 'minutes':0, 'seconds': 30}
    target_temp: 21
    initial_hvac_mode: heat
    away_temp: 15
    unique_id: "MyUniqueID_1234"
```
