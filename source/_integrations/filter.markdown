---
title: Filter
description: Instructions on how to integrate Data Filter Sensors into Home Assistant.
ha_category:
  - Helper
  - Sensor
  - Utility
ha_release: 0.65
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@dgomes'
ha_domain: filter
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `filter` {% term integration %} enables sensors that process the states of other entities.

`filter` applies a signal processing algorithm to a sensor, previous and current states, and generates a `new state` given the chosen algorithm. The next image depicts an original sensor and the filter sensor of that same sensor using the [History Graph](/dashboards/history-graph/) integration.

<p class='img'>
  <img src='/images/screenshots/filter-sensor.png' />
</p>

{% include integrations/config_flow.md %}

{% note %}
The UI configuration only supports setting one filter. For more advanced configurations where multiple filters are needed, please use the YAML configuration option to configure your filter sensor.
{% endnote %}

Further information about these configuration options can be found under the [YAML configuration](#yaml-configuration)

{% configuration_basic %}
Name:
  description: The name the sensor should have.
Entity:
  description: The entity that provides the input. Only `sensor` entities are supported.
Filter:
  description: Algorithm to be used to filter data. Available filters are  "Lowpass", "Outlier", "Range", "Throttle", "Time throttle" and "Moving Average (Time based)".
Precision:
  description: Defines the precision of the filtered state.
Window size:
  description: Size of the window of previous states. Time-based filters require a time period, while other filters require an integer.
Time constant:
  description: Loosely relates to the amount of time it takes for a state to influence the output.
Radius:
  description: Band radius from median of previous states.
Type:
  description: Defines the type of Simple Moving Average.
Lower bound:
  description: Lower bound for filter range.
Upper bound:
  description: Upper bound for filter range.
{% endconfiguration_basic %}

## YAML Configuration

To enable Filter Sensors in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
  - platform: filter
    name: "filtered realistic temperature"
    entity_id: sensor.realistic_temperature
    filters:
      - filter: outlier
        window_size: 4
        radius: 2.0
      - filter: lowpass
        time_constant: 10
      - filter: time_simple_moving_average
        window_size: "00:05"
        precision: 2
```

Filters can be chained and are applied according to the order present in the configuration file.

{% configuration %}
entity_id:
  description: The entity ID of the sensor to be filtered.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies the filter sensor. Set this to a unique value to allow customization through the UI.
  required: false
  type: string
filters:
  description: Filters to be used.
  required: true
  type: list
  keys:
    filter:
      description: Algorithm to be used to filter data. Available filters are  `lowpass`, `outlier`, `range`, `throttle`, `time_throttle` and `time_simple_moving_average`.
      required: true
      type: string
    precision:
      description: Defines the precision of the filtered state, through the argument of round().
      required: false
      type: integer
      default: 2
    window_size:
      description: Size of the window of previous states. Time based filters such as `time_simple_moving_average` will require a time period (size in time), while other filters such as `outlier` will require an integer (size in number of states). Time periods are in _hh:mm_ format and must be quoted.
      required: false
      type: [integer, time]
      default: 1
    time_constant:
      description: See [_lowpass_](#low-pass) filter. Loosely relates to the amount of time it takes for a state to influence the output.
      required: false
      type: integer
      default: 10
    radius:
      description: See [_outlier_](#outlier) filter. Band radius from median of previous states.
      required: false
      type: float
      default: 2.0
    type:
      description: See [_time_simple_moving_average_](#time-simple-moving-average) filter. Defines the type of Simple Moving Average.
      required: false
      type: string
      default: last
    lower_bound:
      description: See [_range_](#range) filter. Lower bound for filter range.
      required: false
      type: float
      default: negative infinity
    upper_bound:
      description: See [_range_](#range) filter. Upper bound for filter range.
      required: false
      type: float
      default: positive infinity
{% endconfiguration %}

{% warning %}
When configuring a `window_size` that is not a time and with a value larger than the default of `1`, the database must examine nearly every stored state for that entity during Home Assistant startup. If you have modified the [Recorder `purge_keep_days`](/integrations/recorder/#purge_keep_days) value or have many states stored in the database for the filtered entity, this can cause your Home Assistant instance to respond poorly during startup.
{% endwarning %}

## Filters

### Low-pass

The Low-pass filter (`lowpass`) is one of signal processing most common filters, as it smooths data by shortcutting peaks and valleys.

The included Low-pass filter is very basic and is based on [exponential smoothing](https://en.wikipedia.org/wiki/Exponential_smoothing), in which the previous data point is weighted with the new data point.

```python
B = 1.0 / time_constant
A = 1.0 - B
LowPass(state) = A * previous_state + B * state
```

### Outlier

The Outlier filter (`outlier`) is a basic Band-pass filter, as it cuts out any value outside a specific range.

The included Outlier filter will discard any value beyond a band centered on the median of the previous values, replacing it with the median value of the previous values. If inside the band, the current state is returned.

```python
distance = abs(state - median(previous_states))

if distance > radius:
    median(previous_states)
else:
    state
```

### Throttle

The Throttle filter (`throttle`) will only update the state of the sensor for the first state in the window. This means the filter will skip all other values.

To adjust the rate you need to set the window_size. To throttle a sensor down to 10%, the `window_size` should be set to 10, for 50% should be set to 2.

This filter is relevant when you have a sensor which produces states at a very high-rate, which you might want to throttle down for storing or visualization purposes.

### Time throttle

The Time Throttle filter (`time_throttle`) will only update the state of the sensor for the first state in the window. This means the filter will skip all other values.

To adjust the rate you need to set the window_size. To throttle a sensor down to 1 value per minute, the `window_size` should be set to "00:01".

This filter is relevant when you have a sensor which produces states at a very high inconstant rate, which you might want to throttle down to some constant rate for storing or visualization purposes.

### Time Simple Moving Average

The Time SMA filter (`time_simple_moving_average`) is based on the paper [Algorithms for Unevenly Spaced Time Series: Moving Averages and Other Rolling Operators](http://www.eckner.com/papers/Algorithms%20for%20Unevenly%20Spaced%20Time%20Series.pdf) by Andreas Eckner.

The paper defines three types/versions of the Simple Moving Average (SMA): *last*, *next* and *linear*. Currently only *last* is implemented.

Theta, as described in the paper, is the `window_size` parameter, and can be expressed using time notation (e.g., "00:05" for a five minutes time window).

### Range


The Range filter (`range`) restricts incoming data to a range specified by a lower and upper bound.

All values greater then the upper bound are replaced by the upper bound and all values lower than the lower bound are replaced by the lower bound.
Per default there are neither upper nor lower bound.

```python
if new_state > upper_bound:
    upper_bound
if new_state < lower_bound:
    lower_bound
new_state
```
