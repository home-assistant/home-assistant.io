---
title: Simulated
description: Component for simulating a numerical sensor.
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: 0.65
ha_quality_scale: internal
ha_domain: simulated
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `simulated` sensor platform provides a simulated sensor that generates a time-varying signal `V(t)` given by the [function](https://en.wikipedia.org/wiki/Sine_wave):

```text
V(t) = M + A sin((2 pi (t - t_0) / w) + P) + N(s)
```

where:

- **M** = the [mean](https://en.wikipedia.org/wiki/Mean) value of the sensor
- **A** = the [amplitude](https://en.wikipedia.org/wiki/Amplitude) of the periodic contribution
- **t** = the time when a value is generated
- **t_0** = the time when the sensor is started
- **w** = the time [period](https://en.wikipedia.org/wiki/Periodic_function) in seconds for a single complete cycle of the periodic contribution
- **P** = the [phase](https://en.wikipedia.org/wiki/Phase_(waves)) offset to add to the periodic contribution, in units of degrees
- **N(s)** = the random [Gaussian noise](https://en.wikipedia.org/wiki/Gaussian_noise) with spread **s**

The output will be limited to 3 decimals.

## Configuration

To add a simulated sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
sensor:
  - platform: simulated
```

{% configuration %}
name:
  description: The name of the sensor.
  required: false
  default: simulated
  type: string
unit:
  description: The unit to apply.
  required: false
  default: value
  type: string
amplitude:
  description: The amplitude of periodic contribution.
  required: false
  default: 1
  type: float
mean:
  description: The mean level of the sensor.
  required: false
  default: 0
  type: float
period:
  description: The time in seconds for one complete oscillation of the periodic contribution.
  required: false
  default: 0
  type: integer
phase:
  description: The phase offset (in degrees) to apply to the periodic component.
  required: false
  default: 0
  type: float
seed:
  description: The [seed](https://docs.python.org/3.6/library/random.html#random.seed) value for the random noise component.
  required: false
  default: 999
  type: integer
spread:
  description: The spread is the range of the randomly distributed values about their mean. This is sometimes referred to as the Full Width at Half Maximum ([FWHM](https://en.wikipedia.org/wiki/Full_width_at_half_maximum)) of the random distribution.
  required: false
  default: None
  type: float
relative_to_epoch:
  description: Whether to simulate from epoch time (00:00:00, 1970-01-01), or relative to when the sensor was started.
  required: false
  default: true
  type: boolean
{% endconfiguration %}

## Example

To give an example of simulating real world data, a simulated relative humidity sensor (in %) can be added using the following configuration:

```yaml
sensor:
  - platform: simulated
    name: "simulated relative humidity"
    unit: "%"
    amplitude: 0 # Turns off the periodic contribution
    mean: 50
    spread: 10
    seed: 999
    relative_to_epoch: false
```
