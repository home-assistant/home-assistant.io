---
title: PID Controller
description: Creates a PID controller to regulate a sensor value with a number-entity output.
ha_category:
  - Number
ha_release: '2023.05'
ha_iot_class: Local Polling
ha_domain: pid_controller
ha_platforms:
  - number
ha_integration_type: integration
---

The `pid_controller` platform is a `number`. It can be used to control a number entity output to regulate a sensor value to a specific setpoint. The value of the number entity is the setpoint. As a sensor, any numerical sensor entity can be used. If two sensors are configured, the PID controller will act as a differential controller, using the difference between the two sensor values as input signal.
The value for the output number entity will be calculated using the Proportional–Integral–Derivative algorithm (PID, See [https://en.wikipedia.org/wiki/PID_controller]). The implementation of the PID controller contains bumpless operation, and is prevented against integral windup by clipping of the output value to the minimum and maximum of the corresponding output number entity. 
This controller is typically useful in regulated systems. For example to regulate the speed of a water pump in a heat collector to keep the temperature difference between the outgoing and incomming water stream on a certain level, so that the heat collector will perform optimally.
Setting up the optimal parameters for a PID controller can be a tough job. Depending on your particular job, you might already know more or less what the parameters should be. If required, you could use [manual tuning][https://en.wikipedia.org/wiki/PID_controller#Manual_tuning] to find optimal parameters. 
- For kp, start with a small number (1) and gradually make it bigger if you see that the direct reaction of the controller is too low. Increase the kp, until the output oscillates, then set it to half of this value.
- For ki, keep this number to 0 until kp is set. Than start with a very small number (0.01). If you see that the reaction over time is only slowly rising, than increase it, until the controller regulates to the sepoint in a reasonalble amount of time. 
- For kd, keep this number to 0 until kp and ki are set. Now you can use the kd to prevent the regulator from overshoot. Only increase in small steps.


## Configuration
{% include integrations/config_flow.md %}
{% configuration_basic %}
Name:
  description: The name that the PID controller should have. You can change it again later.
Output number entity:
  description: Output number entity. The output of the regulator will be clipped to the minimum and maximum value of this output number.
Input sensor entity:
  description: Numerical sensor entity, used for input signal.
Optional secondary input sensor entity:
  description: Secondary input sensor. If selected, the regulator will work in differential mode.
Proportional gain factor (Kp):
  description: Proportional gain factor, directly gaining the error to compensate the fault (Kp).
Integration factor (Ki):
  description: Integration factor, reducing offset fault over time (Ki).
Differential factor (Kd):
  description: Differential factor, damping the overshoot (Kd).
Controller direction: 
  description: When direct, output will increase to decrease fault, when reverse output will decrease to decrease fault.
Minimum:
  description: Minimum regulation setpoint value.
Maximum:
  description: Maximum regulation setpoint value.
Duration between controller cycles
  description: Cycle time that elapses between two controller cycles.
Step size:
  description: Step size of the number.
Mode:
  description: Mode of user interface elements.
{% endconfiguration_basic %}

## YAML Configuration

Alternatively, this integration can be configured and set up manually via YAML. 
To enable the PID controller number entity in your installation, add the
following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
number:
  - platform: pid_controller
    name: PID regulator for heat collector
    input1: sensor.water_temperature
    output: number.pwm_pump
``` 

{% configuration %}
name:
  description: Name of the PID controller.
  required: true
  type: string
output:
  description: `entity_id` for the output value. Must be a number device. The output will be limited to the minimum and maximum value of this number.
  required: true
  type: string
input1:
  description: `entity_id` for input sensor. Must be a numerical sensor.
  required: true
  type: string
input2:
  description: Optional secondary input sensor. If selected, the controller will work in differential mode.
  required: false
  default: 
  type: string
kp:
  description: Proportional gain factor, directly gaining the error to compensate the fault (Kp).
  required: false
  default: 1.0
  type: float
ki:
  description: Integration factor, reducing the offset fault over time (Ki).
  required: false
  default: 0.1
  type: float
kd:
  description: Differential factor, damping the overshoot (Kd).
  required: false
  default: 0.0
  type: float
direction:
  description: Regulation direction. When 'direct', the output will increase to decrease fault. When 'reverse', the output will decrease to decrease fault.
  required: false
  default: direct
  type: string ('direct' or 'reverse')
minimum:
  description: Minimal value of the pid_controller number setpoint.
  required: false
  default: 0
  type: float
maximum:
  description: Maximal value of the pid_controller number setpoint.
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
unique_id:
  description: Unique id to be able to configure the entity in the UI.
  required: false
  type: string
{% endconfiguration %}

## Full configuration example

```yaml
number:
  - platform: pid_controller
    name: PID regulator for heat collector
    input1: sensor.water_temperature_in
    input2: sensor.water_temperature_in
    output: number.pwm_pump
    kp: 2.0
    ki: 0.5
    kd: 0.01
    direction: reverse
    minimum: 10
    maximum: 200
    cycle_time:  {'hours':0, 'minutes':01, 'seconds': 00}
    step: 3
    mode: "auto"
    unique_id: "MyUniqueID_1234"
```
