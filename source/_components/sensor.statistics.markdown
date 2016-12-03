---
layout: page
title: "Statistics Sensor"
description: "Instructions how to integrate statistical sensors into Home Assistant."
date: 2016-09-28 12:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: "0.30"
---


The `statistics` sensor platform is consuming the state from other sensors. Beside the maximal and the minimal value also the total, the mean, the median, the variance, and the standard deviation are as attributes available. If it's a binary sensor then only the state changes are counted.

It can take time till the sensor starts to work because a couple of attributes need more than one value to do the calculation.

To enable the statistics sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: statistics
    entity_id: sensor.cpu
  - platform: statistics
    entity_id: binary_sensor.movement
```

Configuration variables:

- **entity_id** (*Required*): The entity to monitor. Only [sensors](/components/sensor/) and [binary sensor](/components/binary_sensor/).
- **name** (*Optional*): Name of the sensor to use in the frontend. Defaults to `Stats`.
- **sampling_size** (*Optional*): Size of the sampling. If the limit is reached then the values are rotated. Defaults to `20`.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/stats-sensor.png' />
</p>
