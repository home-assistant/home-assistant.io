---
title: Statistics
description: Instructions on how to integrate statistical sensors into Home Assistant.
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: '0.30'
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
  - '@ThomDietrich'
ha_domain: statistics
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `statistics` sensor platform observes the state of a source sensor and provides statistical characteristics about its recent past. This integration can be useful in automations, e.g., to trigger an action when the air humidity in the bathroom settles after a hot shower or when the number of brewed coffee over a day gets too high.

The statistics sensor updates with every source sensor update. The value of the sensor represents one statistical characteristic, with `mean` being the default. The time period and/or number of recent state that should be considered is an important factor here. Check the configuration section below for options.

Both `sensor` and `binary_sensor` are supported as source sensor. A number of characteristics is supported by each, please check below.

Assuming the [`recorder`](/integrations/recorder/) integration is running, historical sensor data is read from the database on startup and is available immediately after a restart of the platform. If the [`recorder`](/integrations/recorder/) integration is *not* running, it can take some time for the sensor to start reporting data because some characteristics calculations require more than one source sensor value.

<div class='note tip'>

The `statistics` integration is different to a [Long-term Statistics](https://developers.home-assistant.io/docs/core/entity/sensor/#long-term-statistics). More details on the differences can be found in the [2021.8.0 release notes](/blog/2021/08/04/release-20218/#long-term-statistics).

</div>

## Characteristics

The following statistical characteristics are available. Pay close attention to the right configuration of `sampling_size` and `max_age`, as most characteristics are directly related to the count of samples or the age of processed samples.

### Numeric Source Sensor

The following characteristics are supported for `sensor` source sensors:

| State Characteristic | Description |
| -------------------- | ----------- |
| `average_linear` | The average value of stored measurements under consideration of the time distances between them. A linear interpolation is applied per measurement pair. Good suited to observe a source sensor with non-periodic sensor updates and when continuous behavior is represented by the measurements (e.g. outside temperature).
| `average_step` | The average value of stored measurements under consideration of the time distances between them. LOCF (last observation carried forward weighting) is applied, meaning, that the old value is assumed between two measurements. The resulting step function represents well the behavior of non-continuous behavior, like the set temperature of a boiler.
| `average_timeless` | The average value of stored measurements. This method assumes that all measurements are equally spaced and, therefore, time is ignored and a simple average of values is computed. Equal to `mean`.
| `change_sample` | The average change per sample. The difference between the newest and the oldest measurement is divided by the number of in-between measurements (n-1).
| `change_second` | The average change per second. The difference between the newest and the oldest measurement is divided by seconds between them.
| `change` | The difference between the newest and the oldest measurement.
| `count` | The number of stored source sensor readings. This number is limited by `sampling_size` and can be low within the bounds of `max_age`.
| `datetime_newest` | The timestamp of the newest measurement.
| `datetime_oldest` | The timestamp of the oldest measurement.
| `datetime_value_max` | The timestamp of the numerically biggest measurement.
| `datetime_value_min` | The timestamp of the numerically smallest measurement.
| `distance_95_percent_of_values` | A statistical indicator derived from the standard deviation of an assumed normal distribution. 95% of all stored values fall into a range of returned size.
| `distance_99_percent_of_values` | A statistical indicator derived from the standard deviation of an assumed normal distribution. 99% of all stored values fall into a range of returned size.
| `distance_absolute` | The difference between the extreme values of measurements. Equals `value_max` minus `value_min`.
| `mean` | The average value computed for all measurements. Be aware that this does not take into account uneven time intervals between measurements.
| `median` | The [median](https://en.wikipedia.org/wiki/Mode_(statistics)#Comparison_of_mean,_median_and_mode) value computed for all measurements.
| `noisiness` | A simplified version of a signal-to-noise ratio. A high value indicates a quickly changing source sensor value, a small value will be seen for a steady source sensor. The absolute change between consecutive stored values is summed up and divided by the number of intervals.
| `quantiles` | Quantiles divide the range of a normal probability distribution of all considered source sensor measurements into continuous intervals with equal probabilities. Check the configuration parameters `quantile_intervals` and `quantile_method` for further details.
| `standard_deviation` | The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of an assumed normal distribution from all measurements.
| `total` | The sum of all source sensor measurements within the given time and sampling size limits.
| `value_max` | The biggest value among the number of measurements.
| `value_min` | The smallest value among the number of measurements.
| `variance` | The [variance](https://en.wikipedia.org/wiki/Variance) of an assumed normal distribution from all measurements.

### Binary Source Sensor

The following characteristic are supported for `binary_sensor` source sensors:

| State Characteristic | Description |
| -------------------- | ----------- |
| `average_step` | A percentage of time across all stored measurements, in which the binary source sensor was "On". If over the course of one hour, movement was detected for 6 minutes, the `average_step` is 10%.
| `average_timeless` | The percentage of stored measurements, for which the binary source sensor was "On". Time in on/off states is ignored. If over the course of one hour, a single movement was detected, the `average_timeless` is 33.3% (assuming the stored measurements "Off", "On", "Off"). Equal to `mean`.
| `count` | The number of stored source sensor readings.
| `count_on` | The number of stored source sensor readings with the value "On". Be aware that only value changes are registered by default, except if the source sensor has the property `force_update`.
| `count_off` | The number of stored source sensor readings with the value "Off". Be aware that only value changes are registered by default, except if the source sensor has the property `force_update`.
| `datetime_newest` | The timestamp of the newest measurement.
| `datetime_oldest` | The timestamp of the oldest measurement.
| `mean` | The percentage of stored measurements, for which the binary source sensor was "On". Time in on/off states is ignored. If over the course of one hour, a single movement was detected, the `average_timeless` is 33.3% (assuming the stored measurements "Off", "On", "Off").

## Attributes

A statistics sensor presents the following attributes for context about its internal status.

| Attribute | Description |
| --------- | ----------- |
| `age_coverage_ratio` | Only when `max_age` is defined. Ratio (0.0-1.0) of the configured age of source sensor measurements considered (time period `max_age`) covered in-between the oldest and newest stored values. A low number can indicate an unwanted mismatch between the configured limits and the source sensor behavior. The value 1.0 represents at least two values covering the full time period. Value 0 is the result of only one measurement considered. The sensor turns `Unknown` if no measurements are stored.
| `buffer_usage_ratio` | Ratio (0.0-1.0) of the configured buffer size (`sampling_size`) used by the stored source sensor measurements. A low number can indicate an unwanted mismatch between the configured limits and the source sensor behavior. The value 1.0 represents a full buffer, value 0 stands for an empty one.
| `source_value_valid` | True/false indication whether the source sensor supplies valid values to the statistics sensor (judged by the last value received).

## Configuration

Define a statistics sensor by adding lines similar to the following examples to your `configuration.yaml`:

```yaml
sensor:
  - platform: statistics
    name: "Bathroom humidity mean over last 24 hours"
    entity_id: sensor.bathroom_humidity
    state_characteristic: mean
    max_age:
      hours: 24

  - platform: statistics
    name: "Bathroom humidity change over 5 minutes"
    entity_id: sensor.bathroom_humidity
    state_characteristic: change
    max_age:
      minutes: 5
    sampling_size: 50
    precision: 1

  - platform: statistics
    entity_id: binary_sensor.movement
    state_characteristic: count
```

{% configuration %}
entity_id:
  description: The source sensor to observe and compute statistical characteristics for. Only [sensors](/integrations/sensor/) and [binary sensor](/integrations/binary_sensor/) are supported.
  required: true
  type: string
name:
  description: Name of the new statistics sensor.
  required: false
  default: Stats
  type: string
state_characteristic:
  description: The characteristic that should be used as the state of the statistics sensor (see table above). **Beware** that this parameter will become mandatory in a future version. Include in your configuration. If currently omitted, the default characteristic for a `sensor` source sensor is "mean", for a `binary_sensor` "count".
  required: false
  default: mean / count
  type: string
sampling_size:
  description: Maximum number of source sensor measurements stored. Be sure to choose a reasonably high number if the limit should be driven by `max_age` instead.
  required: false
  default: 20
  type: integer
max_age:
  description: Maximum age of source sensor measurements stored. Setting this to a time period will cause older values to be discarded. If omitted, the number of considered source sensor measurements is limited by `sampling_size` only. Set both parameters appropriately to create suited limits for your use case. The sensor value will become `unknown` if the source sensor is not updated within the time period.
  required: false
  type: time
precision:
  description: Defines the number of decimal places of the calculated sensor value.
  required: false
  default: 2
  type: integer
quantile_intervals:
  description: Number of continuous intervals with equal probability. Value must be an integer higher than `1`. In addition, `quantiles` will be `unknown` unless the number of quantile intervals is *lower* than the number of data points (`count`). Set it to `4` for quartiles (default) or to `100` for percentiles, for example.
  required: false
  default: 4
  type: integer
quantile_method:
  description: Indicates whether quantiles are computed using the `exclusive` method (default) or `inclusive`. The `exclusive` method assumes the population data have more extreme values than the sample, and therefore, the part under the *i*-th of *m* sorted data points is computed as `i / (m + 1)`. The `inclusive` method assumes that the sample data includes the more extreme values from the population, and therefore, the part under the *i*-th of *m* sorted data points is computed as `(i - 1) / (m - 1)`.
  required: false
  default: exclusive
  type: string
unique_id:
  description: An ID that uniquely identifies the statistics sensor. Set this to a unique value to allow customization through the UI. Change the unique ID after switching the `state_characteristic` of a previously configured sensor, to start with a fresh recorder history.
  required: false
  type: string
{% endconfiguration %}
