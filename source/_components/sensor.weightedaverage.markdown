---
layout: page
title: "Weighted Average Sensor"
description: "Instructions on how to add weighted average sensors within Home Assistant."
date: 2019-06-01 01:00
sidebar: true
comments: false
sharing: true
footer: true
<<<<<<< HEAD
ha_category:
  - Sensor
ha_release: 0.95
ha_iot_class: Local Push
ha_qa_scale: internal
---

The `weightedaverage` sensor calculates an average value from another sensor, that is weighted according to the duration for each individual sensor value.
This is useful when the source sensor state is updated at uneven intervals, typically a temperature sensor that is only updated when the temperature changes. The weighted average takes into account the 'weight' (i.e. the duration) for each temperature.
The sensor also records the maximum and minimum sensor values for the given duration, as well as the top rates at which the sensor value has ascended or descended.


## {% linkable_title Configuration %}

To add the weighted average sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

sensor:
  - platform: weightedaverage
    name: weighted_average_sensor
    entity_id: sensor.source_sensor
```

{% configuration %}
name:
  description: The name of the weighted average sensor
  required: true
  type: string
entity_id:
  description: The entity id of the the sensor from which the weighted average is calculated.
  required: true
  type: string
device_class:
  description: The device class for the weighted average sensor.
  required: false
  type: string
unit_of_measurement:
  description: The unit of measurement for the weighted average sensor (e.g. °C or °F).
  required: false
  type: string
icon_template:
  description: The icon to be used for the weighted average sensor.
  required: false
  type: string
friendly_name:
  description: The friendly (display) name for the weighted average sensor.
  required: false
  type: string
sample_time:
  description: The time period to sample when calculating the weighted average. Days, Hours and Minutes are supported.
  required: false
  type: list
update_interval:
  description: At what time interval the weighted average should be updated. Days, Hours and Minutes are supported.
  required: false
  type: list
round_values:
  description: The number of digits to which the weighted average value should be rounded.
  required: false
  type: int
round_rates:
  description: The number of digits to which the top ascending/descening rates should be rounded.
  required: false
  type: int
at_even_timestamps:
  description: Whether the weighted average sensor should be updated only at even timestamps (e.g. at the beginning of each hour if the update interval is one hour).
  required: false
  type: bool
{% endconfiguration %}


Example of how a daily average temperature configuration can look:

```yaml
# Example configuration.yaml entry

=======
logo: home-assistant.png
ha_category:
  - Sensor
ha_release: 0.95
ha_iot_class: Local Push
ha_qa_scale: internal
---

The `weightedaverage` sensor calculates an average value from another sensor, that is weighted according to the duration for each individual sensor value.
This is useful when the source sensor state is updated at uneven intervals, typically a temperature sensor that is only updated when the temperature changes. The weighted average takes into account the 'weight' (i.e. the duration) for each temperature.
The sensor also records the maximum and minimum sensor values for the given duration, as well as the top rates at which the sensor value has ascended or descended.


## {% linkable_title Configuration %}

To add the weighted average sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
>>>>>>> branch 'weighted-average' of https://github.com/stafbulp/home-assistant.io.git
sensor:
  - platform: weightedaverage
    name: daily_average_temperature
    friendly_name: 'Daily Average Temperature'
    entity_id: sensor.temperature
    unit_of_measurement: '°C'
    device_class: temperature
    round_values: 1
    round_rates: 5
    at_even_timestamps: True
    sample_time:
      - days: 1
    update_interval:
      - hours: 1
```
