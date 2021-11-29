---
title: Statistics
description: Instructions on how to integrate statistical sensors into Home Assistant.
ha_category:
  - Utility
  - Sensor
ha_iot_class: Local Polling
ha_release: '0.30'
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: statistics
ha_platforms:
  - sensor
---

The `statistics` sensor platform observes the state of a source sensor and provides statistical characteristics about its recent past. This integration can be quite useful in automations, e.g., to trigger an action when the air humidity in the bathroom settles after a hot shower or when the number of brewed coffee over a day gets too high.

The created sensor presents one characteristic as its state (the `mean` value by default) and many more as attributes. The time period and/or number of recent state changes to be considered is defined as part of the sensor configuration. The sensor and its characteristics update with every source sensor update.

Both `sensor` and `binary_sensor` are supported as source sensor. In the case of a binary sensor only the state changes are counted.

Assuming the [`recorder`](/integrations/recorder/) integration is running, historical sensor data is read from the database on startup and is available immediately after a restart of the platform. If the [`recorder`](/integrations/recorder/) integration is *not* running, it can take some time for the sensor to start reporting data because some characteristics calculations require more than one source sensor value.

## Characteristics

The following statistical characteristics are provided for the collected source sensor. Pay close attention to the right configuration of `sampling_size` and `max_age`, as most characteristics are directly related to the count of samples or the age of processed samples.

| Identifier | Description |
| ---------- | ----------- |
| `count` | The number of stored source sensor readings. This number is limited by `sampling_size` and can be low within the bounds of `max_age`.
| `total` | The sum of all source sensor measurements within the given time and sampling size limits.
| `mean` | The average value computed for all measurements. Be aware that this does not take into account uneven time intervals between measurements.
| `median` | The [median](https://en.wikipedia.org/wiki/Mode_(statistics)#Comparison_of_mean,_median_and_mode) value computed for all measurements.
| `standard_deviation` | The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of an assumed normal distribution from all measurements. 
| `variance` | The [variance](https://en.wikipedia.org/wiki/Standard_deviation) of an assumed normal distribution from all measurements.
| `min_value` | The smallest value among the number of measurements.
| `max_value` | The biggest value among the number of measurements.
| `min_age` | The timestamp of the oldest measurement stored.
| `max_age` | The timestamp of the newest measurement stored.
| `change` | The difference between the oldest and newest measurement stored.
| `average_change` | The difference between the oldest and newest measurement stored, divided by the number of in-between measurements (n-1).
| `change_rate` | The difference between the oldest and newest measurement stored, divided by seconds between them.
| `quantiles` | Quantiles divide the range of a normal probability distribution of all considered source sensor measurements into continuous intervals with equal probabilities. Check the configuration parameters `quantile_intervals` and `quantile_method` for further details.

## Configuration

Define a statistics sensor by adding the following lines to your `configuration.yaml`:

```yaml
sensor:
  - platform: statistics
    name: "Bathroom humidity mean over last 24 hours"
    entity_id: sensor.bathroom_humidity
    max_age:
      hours: 24
  - platform: statistics
    name: "Bathroom humidity change over 5 minutes"
    entity_id: sensor.bathroom_humidity
    max_age:
      minutes: 5
    state_characteristic: change
    precision: 1
  - platform: statistics
    entity_id: binary_sensor.movement
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
  description: The characteristic that should be used as the state of the statistics sensor (see above). All other characteristics are provided as attributes.
  required: false
  default: mean
  type: string
sampling_size:
  description: Maximum number of source sensor measurements stored. Be sure to choose a reasonably high number if the limit should be driven by `max_age` instead.
  required: false
  default: 20
  type: integer
max_age:
  description: Maximum age of source sensor measurements stored. Setting this to a time period will cause older values to be discarded. If omitted, the number of considered source sensor measurements is limitted by `sampling_size` only. Set both parameters appropriately to create suited limits for your use case. The sensor value will become `unkown` if the source sensor is not updated within the time period.
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
{% endconfiguration %}

<p class='img'>
  <img src='/images/screenshots/stats-sensor.png' />
</p>
