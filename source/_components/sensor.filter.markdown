---
layout: page
title: "Filter"
description: "Instructions how to integrate Filter Sensors into Home Assistant."
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

The `filter` component enables sensors that process the **numeric states** of other entities.

`filter` applies a signal processing algorithm to a numerical sensor, previous and current states, and generates a `new state` given the chosen algorithm.

To enable Filter Sensors in your installation, add the following to your `configuration.yaml` file:


```yaml
# Example configuration.yaml entry
sensor:
  - platform: filter
    entity_id: sensor.relative_humidity
    name: filtered relative humidity 
    filter: lowpass
    options:
      time_constant: 10
  - platform: filter
    entity_id: sensor.temperature
    name: filtered temperature
    filter: outlier
    options:
      radius: 4 
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
filter:
  description: Algorithm to be used to filter data. Available filters are `lowpass` and `outlier`.
  required: true
  type: string
window_size:
  description: Size of the window of previous states.
  required: false
  type: int
  default: 5  
options:
  description: Filter specific arguments. These options depend on the filter choosen.
  required: false
  type: map
  keys:
    time_constant: 
      description: See [_lowpass_](#low-pass) filter. Loosely relates to the amount of time it takes for a state to influence the output.
      required: false
      type: int
      default: 10
    radius: 
      description: See [_outlier_](#outlier) filter. Band radius from median of previous states.
      required: false
      type: float
      default: 5 
{% endconfiguration %}

Notice that the various `options` keys are `filter` dependent, albeit all optional.

## {% linkable_title Filters %}

### {% linkable_title Low-pass %}

The Low-pass filter (`lowpass`) is one of signal processing most common filters, as it smooths data by shortcuting peaks and valleys.

The included Low-pass filter is very basic and is based on a moving average, in which the previous data point is weighted with the new data point.

```python
B = 1.0 / time_constant
A = 1.0 - B
LowPass(state) = A * previous_state + B * state
```

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
