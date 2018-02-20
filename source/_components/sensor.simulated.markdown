---
layout: page
title: "Simulated sensor"
description: "Component for simulating a numerical sensor."
date: 2018-02-20 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.64
---

This component provides a simulated sensor that generates a time-varying signal ```V(t)``` given by the [function](https://en.wikipedia.org/wiki/Sine_wave):

 ```
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

A simulated sensor with default values can be added to home-assistant using the following config:

```yaml
sensor:
  - platform: simulated
```

To give an example of simulating real world data, a simulated relative humidity sensor (in %) can be added using the following config:

```yaml
- platform: simulated
  name: 'simulated relative humidity'
  unit: '%'
  amplitude: 0 # Turns off the periodic contribution
  mean: 50
  spread: 10
  seed: 999
```

Configuration variables:
{% configuration %}
name:
  description: The name of the sensor
  required: false
  default: Defaults to 'simulated'
  type: string
unit:
  description: The unit to apply
  required: false
  default: Defaults to 'value'
  type: string
amplitude:
  description: The amplitude of periodic contribution
  required: false
  default: 1
  type: float
mean:
  description: The mean level of the sensor
  required: false
  default: 0
  type: float
period:
  description: The time in seconds for one complete oscillation of the periodic contribution
  required: false
  default: 0
  type: seconds
phase:
  description: The phase offset (in degrees) to apply to the periodic component
  required: false
  default: 0
  type: float
seed:
  description: The [seed](https://docs.scipy.org/doc/numpy/reference/generated/numpy.random.seed.html) value for the random noise component
  required: false
  default: None
  type: int
{% endconfiguration %}
