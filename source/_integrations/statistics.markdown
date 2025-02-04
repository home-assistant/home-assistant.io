---
title: Statistics
description: Instructions on how to integrate statistical sensors into Home Assistant.
ha_category:
  - Helper
  - Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: '0.30'
ha_quality_scale: internal
ha_codeowners:
  - '@ThomDietrich'
  - '@gjohansson-ST'
ha_domain: statistics
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
---

The `statistics` integration observes the state of a source sensor and provides aggregated statistical characteristics about its recent past. This integration can be useful in automation, for example, to trigger an action when the air humidity in the bathroom settles after a hot shower or when the number of brewed coffees over a day gets too high.

The statistics sensor can use either the numeric sensor or binary_sensor as its input. The configuration must include the time period and/or a number of recent state changes that should be considered. Check the configuration section below for details.

Assuming the [`recorder`](/integrations/recorder/) integration is running, historical sensor data is read from the database on startup and is available immediately after a restart of the platform. If the [`recorder`](/integrations/recorder/) integration is *not* running, it can take some time for the sensor to start reporting data because some characteristics calculations require more than one source sensor value.

{% tip %}
The statistics integration is different from [Long-term Statistics](https://developers.home-assistant.io/docs/core/entity/sensor/#long-term-statistics). More details on the differences can be found in the [2021.8.0 release notes](/blog/2021/08/04/release-20218/#long-term-statistics).
{% endtip %}

The statistics sensor has an internal buffer that stores the values it needs for the computation of the various functions (for example, average step). The sensor is updated whenever new values are added to the buffer or when elements are removed. This is triggered either by a change of the source sensor (which may or may not change its actual value) or by values expiring (in cases where max age was specified). This means that the buffer can hold a sequence of identical values in cases where values are not changing over time.

When using a time-based buffer (by providing a max-age), it is recommended that the buffer contains at least a decent number of values spanning the full range of time. For sensors that don't change much, this can be achieved by using a template sensor with a time-based trigger as input. If the input values don't cover most of the time range, the computed output values could lead to unexpected results.
Example: To find out whether a switch was used in the last 5 minutes, "Count on" could be used. However, if there are no frequent readings a single "Off" (maybe only a second ago) in the buffer would produce 0 even though the sensor was "On" for most of the last five minutes.

{% include integrations/config_flow.md %}

Further information about these configuration options can be found under the [YAML configuration](#yaml-configuration)

{% configuration_basic %}
Name:
  description: The name the sensor should have.
Entity:
  description: The entity that provides the input. Numeric `sensor` and `binary_sensor` are supported.
State_characteristic:
  description: List of statistical characteristics to choose from.
Sampling size:
  description: Maximum number of source sensor measurements stored.
Max age:
  description: Maximum age of source sensor measurements stored.
Keep last sample:
  description: Defines whether the most recent sampled value should be preserved regardless of the "Max age" setting.
Percentile:
  description: Only relevant in combination with the percentile characteristic. Must be a value between 1 and 99.
Precision:
  description: Defines the number of decimal places of the calculated sensor value.
{% endconfiguration_basic %}

## Characteristics

The following options for the configuration parameter `state_characteristic` are available as staticical characteristics. Pay close attention to the correct configuration of `sampling_size` and/or `max_age`, as most characteristics are directly influenced by these settings.

### Numeric Source Sensor

The following are supported for `sensor` source sensors `state_characteristic`:

| State Characteristic | Description |
| -------------------- | ----------- |
| `average_linear` | The average value of stored measurements under consideration of the time distances between them. A linear interpolation is applied per measurement pair. Suited to observe a source sensor with frequent, non-periodic sensor updates and when continuous behavior is represented by the measurements (e.g. your electricity consumption). WARNING: This doesn't compute the exact average over the full interval defined by `max_age`. It will only consider the interval between the first and the last value in the buffer. |
| `average_step` | The average value of stored measurements under consideration of the time distances between them. LOCF (last observation carried forward weighting) is applied, meaning, that the old value is assumed between two measurements. This is a better fit to how Home Assistant deals with constant values (compared to the linear function) and it is also better fitting to sensors that are switching between stable phases (e.g. a heating level set to either 1, 2 or 3). WARNING: This doesn't compute the exact average over the full interval defined by `max_age`. It will only consider the interval between the first and the last value in the buffer. |
| `average_timeless` | The average value of stored measurements. This method assumes that all measurements are equally spaced and, therefore, time is ignored and a simple average of values is computed. Equal to `mean`. |
| `change_sample` | The average change per sample. The difference between the newest and the oldest measurement is divided by the number of in-between measurements (n-1). |
| `change_second` | The average change per second. The difference between the newest and the oldest measurement is divided by seconds between them. |
| `change` | The difference between the newest and the oldest measurement. |
| `count` | The number of stored source sensor readings. This number is limited by `sampling_size` and can be low within the bounds of `max_age`. |
| `datetime_newest` | The timestamp of the newest measurement. |
| `datetime_oldest` | The timestamp of the oldest measurement. |
| `datetime_value_max` | The timestamp of the numerically biggest measurement. |
| `datetime_value_min` | The timestamp of the numerically smallest measurement. |
| `distance_95_percent_of_values` | A statistical indicator derived from the standard deviation of an assumed normal distribution. 95% of all stored values fall into a range of returned size. |
| `distance_99_percent_of_values` | A statistical indicator derived from the standard deviation of an assumed normal distribution. 99% of all stored values fall into a range of returned size. |
| `distance_absolute` | The difference or "spread" between the extreme values of measurements. Equals `value_max` minus `value_min`. |
| `mean` | The average value computed for all measurements. Be aware that this does not consider uneven time intervals between measurements. |
| `mean_circular` | The [circular mean](https://en.wikipedia.org/wiki/Circular_mean) for angular measurements (_e.g._ wind direction). Assumes that measurements are expressed in degrees (_e.g._, 180° or -90°), and outputs the mean in positive degrees (0-360°). |
| `median` | The [median](https://en.wikipedia.org/wiki/Mode_(statistics)#Comparison_of_mean,_median_and_mode) value computed for all measurements. |
| `noisiness` | A simplified version of a signal-to-noise ratio. A high value indicates a quickly changing source sensor value, a small value will be seen for a steady source sensor. The absolute change between subsequent source sensor measurement values is summed up and divided by the number of intervals. |
| `percentile` | [Percentiles](https://en.wikipedia.org/wiki/Percentile) divide the range of a distribution of all considered source sensor measurements into 100 continuous intervals of equal probability. The characteristic calculates the value for which a given percentage of source sensor measurements are smaller in value. The 20th percentile is the value below which 20 percent of the measurements may be found. The additional configuration parameters `percentile` is needed, see below. |
| `standard_deviation` | The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of an assumed normal distribution from all measurements. |
| `sum` | The mathematical sum of all source sensor measurement values within the given time and sampling size limits. |
| `sum_differences` | The mathematical sum of differences between subsequent source sensor measurement values within the given time and sampling size limits. |
| `sum_differences_nonnegative` | The mathematical sum of non-negative differences between subsequent source sensor measurement values within the given time and sampling size limits. The characteristic assumes that the source sensor value can only increase, but might occasionally be reset to zero. If a value is smaller than the previous value, the function assumes the previous value should have been a zero. |
| `total` | The mathematical sum of all source sensor measurement values within the given time and sampling size limits. Equal to `sum`. |
| `value_max` | The largest value among the number of measurements. |
| `value_min` | The smallest value among the number of measurements. |
| `variance` | The [variance](https://en.wikipedia.org/wiki/Variance) of an assumed normal distribution from all measurements. |

### Binary Source Sensor

The following are supported for `binary_sensor` source sensors `state_characteristic`:

| State Characteristic | Description |
| -------------------- | ----------- |
| `average_step` | A percentage of time across all stored measurements, in which the binary source sensor was "On". If over the course of one hour, movement was detected for 6 minutes, the `average_step` is 10%.
| `average_timeless` | The percentage of stored measurements, for which the binary source sensor was "On". Time in on/off states is ignored. If over the course of one hour, a single movement was detected, the `average_timeless` is 33.3% (assuming the stored measurements "Off", "On", "Off"). Equal to `mean`.
| `count` | The number of stored source sensor readings.
| `count_on` | The number of stored source sensor readings with the value "On". Be aware that only value changes are registered by default, except if the source sensor has the property `force_update` set to true.
| `count_off` | The number of stored source sensor readings with the value "Off". Be aware that only value changes are registered by default, except if the source sensor has the property `force_update` set to true.
| `datetime_newest` | The timestamp of the newest measurement.
| `datetime_oldest` | The timestamp of the oldest measurement.
| `mean` | The percentage of stored measurements, for which the binary source sensor was "On". Time in on/off states is ignored. If over the course of one hour, a single movement was detected, the `average_timeless` is 33.3% (assuming the stored measurements "Off", "On", "Off").

## Attributes

A statistics sensor presents the following attributes for context about its internal status.

| Attribute | Description |
| --------- | ----------- |
| `age_coverage_ratio` | Only when `max_age` is defined. Ratio (0.0-1.0) of the configured age of source sensor measurements considered (time period `max_age`) covered in-between the oldest and newest stored values. A low number can indicate an unwanted mismatch between the configured limits and the source sensor behavior. The value 1.0 represents at least two values covering the full time period. Value 0 is the result of only one measurement considered. The sensor turns `Unknown` if no measurements are stored.
| `buffer_usage_ratio` | Only when `sampling_size` is defined. Ratio (0.0-1.0) of the configured buffer size used by the stored source sensor measurements. A low number can indicate an unwanted mismatch between the configured limits and the source sensor behavior. The value 1.0 represents a full buffer, value 0 stands for an empty one.
| `source_value_valid` | True/false indication whether the source sensor supplies valid values to the statistics sensor (judged by the last value received).

## YAML configuration

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
    entity_id: binary_sensor.movement
    state_characteristic: count_on
    sampling_size: 100

  - platform: statistics
    name: "Bathroom humidity change over 5 minutes"
    entity_id: sensor.bathroom_humidity
    state_characteristic: change
    max_age:
      minutes: 5
    sampling_size: 50
    precision: 1
```

{% configuration %}
entity_id:
  description: The source sensor to observe and compute statistical characteristics for. Only [sensors](/integrations/sensor/) and [binary sensors](/integrations/binary_sensor/) are supported.
  required: true
  type: string
name:
  description: Name of the new statistics sensor.
  required: false
  default: Stats
  type: string
state_characteristic:
  description: The characteristic that should be used as the state of the statistics sensor (see tables above).
  required: true
  type: string
sampling_size:
  description: Maximum number of source sensor measurements stored. Be sure to choose a reasonably high number or omit if the samples should be driven by `max_age` instead. A statistics sensor requires `sampling_size`, `max_age`, or both to be defined.
  required: false
  type: integer
max_age:
  description: Maximum age of source sensor measurements stored. Setting this to a time period will cause older values to be discarded. If omitted, the number of considered source sensor measurements is limited by `sampling_size` only. Set both parameters appropriately to create suited limits for your use case. The sensor value will become `unknown` if the source sensor is not updated within the time period. A statistics sensor requires `sampling_size`, `max_age`, or both to be defined.
  required: false
  type: time
keep_last_sample:
  description: Defines whether the most recent sampled value should be preserved regardless of the `max_age` setting. 
  required: false
  default: false
  type: boolean
percentile:
  description: Only relevant in combination with the `percentile` characteristic. Must be a value between 1 and 99. The value defines the percentile value to consider. The 25th percentile is also known as the first quartile, the 50th percentile as the median.
  required: false
  default: 50
  type: integer
precision:
  description: Defines the number of decimal places of the calculated sensor value.
  required: false
  default: 2
  type: integer
unique_id:
  description: An ID that uniquely identifies the statistics sensor. Set this to a unique value to allow customization through the UI. Change the unique ID after switching the `state_characteristic` of a previously configured sensor, to start with a fresh recorder history.
  required: false
  type: string
{% endconfiguration %}

### An important note on `max_age` and `sampling_size`

If both `max_age` and `sampling_size` are given, the considered samples are those within the `max_age` time window but limited to the number of `sampling_size` newest samples.  Specify a wide-enough `sampling_size` if using an extended `max_age` (e.g., when looking for `max_age` 1 hour, a sensor that produces one measurement per minute should have at least a `sampling_size` of 60 to use all samples within the `max_age` timeframe.)

If only `sampling_size` is given there is no time limit. If only `max_age` is given the considered number of samples is unlimited.
