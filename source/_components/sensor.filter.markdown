---
layout: page
title: "Filter Sensor"
description: "Instructions how to integrate Data Filter Sensors into Home Assistant."
date: 2018-02-20
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.64
ha_iot_class: "Local Push"
logo: home-assistant.png
---

The `filter` platform enables sensors that process the states of other entities.

`filter` applies a signal processing algorithm to a sensor, previous and current states, and generates a `new state` given the chosen algorithm.

To enable Filter Sensors in your installation, add the following to your `configuration.yaml` file:


```yaml
# Example configuration.yaml entry
sensor:
  - platform: filter
    name: "filtered realistic humidity"
    entity_id: sensor.realistic_humidity
    filters:
      - filter: outlier
        window_size: 4
        radius: 4.0
      - filter: lowpass
        time_constant: 10
        precision: 2
```

{% configuration %}
entity_id:
  description: The entity ID of the sensor to be filtered.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
filters:
  description: Filters to be used.
  required: true 
  type: map
  keys:
    filter:
      description: Algorithm to be used to filter data. Available filters are `lowpass` and `outlier`.
      required: true
      type: string
    window_size:
      description: Size of the window of previous states.
      required: false
      type: int
      default: 5  
	precision:
      description: See [_lowpass_](#low-pass) filter. Defines the precision of the filtered state, through the argument of round().
	  required: false
	  type: int
	  default: None
    time_constant: 
      description: See [_lowpass_](#low-pass) filter. Loosely relates to the amount of time it takes for a state to influence the output.
      required: false
      type: int
      default: 10
    radius: 
      description: See [_outlier_](#outlier) filter. Band radius from median of previous states.
      required: false
      type: float
      default: 2.0 
{% endconfiguration %}

## {% linkable_title Filters %}

### {% linkable_title Low-pass %}

The Low-pass filter (`lowpass`) is one of signal processing most common filters, as it smooths data by shortcuting peaks and valleys.

The included Low-pass filter is very basic and is based on a moving average, in which the previous data point is weighted with the new data point.

```python
B = 1.0 / time_constant
A = 1.0 - B
LowPass(state) = A * previous_state + B * state
```

The returned value is rounded to the number of decimals defined in (`precision`).

### {% linkable_title Outlier %}

The Outlier filter (`outlier`) is a basic Band-stop filter, as it cuts out any value outside a specific range.

The included Outlier filter will discard any value beyond a band centered on the median of the previous values, replacing it with the median value of the previous values. If inside the band, the 

```python
distance = abs(state - median(previous_states))

if distance > radius:
    median(previous_states)
else:
    state
```
