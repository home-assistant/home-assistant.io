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

The `statistics` sensor platform consumes the state from other sensors. It exports the `mean` value as state and the following values as attributes: `count`, `mean`, `median`, `stdev`, `variance`, `total`, `min_value`, `max_value`, `min_age`, `max_age`, `change`, `average_change` and `change_rate`. If the source is a binary sensor then only state changes are counted.

Assuming the [`recorder`](/integrations/recorder/) integration is running (either configured explicitly or as part of a meta-integration/dependency, e.g., [`default_config`](/integrations/default_config/), [`history`](/integrations/history/), etc.), historical sensor data is read from the database on startup and is available immediately after a restart of the platform. If the [`recorder`](/integrations/recorder/) integration is *not* running, it can take time for the sensor to start reporting data because some attribute calculations require more than one value.

## Configuration

To enable the statistics sensor, add the following lines to your `configuration.yaml`:

```yaml
# enable the recorder integration (optional)
recorder:

# Example configuration.yaml entry
sensor:
  - platform: statistics
    entity_id: sensor.cpu
  - platform: statistics
    entity_id: binary_sensor.movement
```

{% configuration %}
entity_id:
  description: The entity to monitor. Only [sensors](/integrations/sensor/) and [binary sensor](/integrations/binary_sensor/).
  required: true
  type: string
name:
  description: Name of the sensor to use in the frontend.
  required: false
  default: Stats
  type: string
sampling_size:
  description: Size of the sampling. If the limit is reached then the values are rotated.
  required: false
  default: 20
  type: integer
max_age:
  description: Maximum age of measurements. Setting this to a time interval will cause older values to be discarded. Please note that you might have to increase the [sampling_size](/integrations/statistics#sampling_size) parameter. If you e.g., have a sensor value updated every second you will, by default, only get a max_age of 20s. Furthermore the sensor gets `unkown` if the entity is not updated within the time interval.
  required: false
  type: time
precision:
  description: Defines the precision of the calculated values, through the argument of round().
  required: false
  default: 2
  type: integer
{% endconfiguration %}

<p class='img'>
  <img src='/images/screenshots/stats-sensor.png' />
</p>
