---
title: Statistics
description: Instructions on how to integrate statistical sensors into Home Assistant.
logo: home-assistant.png
ha_category:
  - Utility
ha_iot_class: Local Polling
ha_release: '0.30'
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
---

The `statistics` sensor platform observes the state of a source sensor and provides statistical characteristics about its recent past. This integration can be quite useful in automations, e.g., to trigger an action when the number of brewed coffee over a day gets too high (see `total`) or when the air humidity in the bathroom settles after a hot shower (see `change`).

The created sensor presents one characteristic as its state (the `mean` value by default) and many more as attributes, see below. The period or number of recent state changes to be considered is defined as part of the sensor configuration. The sensor and its characteristics update with every source sensor update.

If the source sensor is a binary sensor, then only state changes are counted.

Assuming the [`recorder`](/integrations/recorder/) integration is running (either configured explicitly or as part of a meta-integration/dependency, e.g., [`default_config`](/integrations/default_config/), [`history`](/integrations/history/), etc.), historical sensor data is read from the database on startup and is available immediately after a restart of the platform. If the [`recorder`](/integrations/recorder/) integration is *not* running, it can take time for the sensor to start reporting data because some attribute calculations require more than one value.

## Characteristics

The following statistical characteristics are provided for the collected source sensor. Pay close attention to the right configuration of `sampling_size` and `max_age`, as most characterists are directly related to the count or time period of processed historic data.

| Identifier | Description |
| ---------- | ----------- |
| `count` | The number of stored source sensor readings. This number is limited by `sampling_size` and can be low within the bounds of `max_age`.
| `total` | The sum of all source sensor measurements within the given time and sampling size limits.
| `mean` | The average value computed for all measurements. Be aware that this does not take into account uneven time periods.
| `median` | The [median](https://en.wikipedia.org/wiki/Mode_(statistics)#Comparison_of_mean,_median_and_mode) value computed for all measurements.
| `standard_deviation` | The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of an assumed normal distribution from all measurements. 
| `variance` | The [variance](https://en.wikipedia.org/wiki/Standard_deviation) of an assumed normal distribution from all measurements.
| `min_value` | The smallest value within the number of measurements.
| `max_value` | The biggest value within the number of measurements.
| `min_age` | The timestamp of the oldest measurement stored.
| `max_age` | The timestamp of the newest measurement stored.
| `change` | The difference between the oldest and newest measurement stored.
| `average_change` | The difference between the oldest and newest measurement stored, divided by the number of in-between measurements.
| `change_rate` | The difference between the oldest and newest measurement stored, divided by seconds between them.


## Configuration

To enable the statistics sensor, add the following lines to your `configuration.yaml`:

```yaml
sensor:
  - platform: statistics
    name: Bathroom humidity change over 5 minutes
    entity_id: sensor.bathroom_humidity
    max_age:
      minutes: 5
    state_characteristic: change
  - platform: statistics
    entity_id: binary_sensor.movement
    max_age:
      minutes: 30
```

{% configuration %}
entity_id:
  description: The source sensor to observe. Only [sensors](/integrations/sensor/) and [binary sensor](/integrations/binary_sensor/) are supported.
  required: true
  type: string
name:
  description: Name of the sensor to use in the frontend.
  required: false
  default: Stats
  type: string
state_characteristic:
  description: The characteristic that should be used as the state of the statistics sensor. All other characteristics are provided as attributes.
  required: false
  default: mean
  type: string
sampling_size:
  description: Maximum number of source sensor readings stored. Be sure to choose a reasonably high number if the limit should be driven by `max_age` instead.
  required: false
  default: 20
  type: integer
max_age:
  description: Maximum age of measurements. Setting this to a time interval will cause older values to be discarded. Please note that you might have to increase the [sampling_size](/integrations/statistics#sampling_size) parameter. If you e.g., have a sensor value updated every second you will, by default, only get a max_age of 20s. Furthermore the sensor gets `unkown` if the entity is not updated within the time interval.
  required: false
  type: time
precision:
  description: Defines the number of decimal places of the calculated values.
  required: false
  default: 2
  type: integer
{% endconfiguration %}

<p class='img'>
  <img src='{{site_root}}/images/screenshots/stats-sensor.png' />
</p>
