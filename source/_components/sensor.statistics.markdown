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


The `statistics` sensor platform consumes the state from other sensors. Besides the maximum and the minimum values, the total, mean, median, variance and the standard deviation are also available as attributes. If it's a binary sensor then only state changes are counted.

If you are running the [recorder](/components/recorder/) component, on startup the data is read from the database. So after a restart of the platform, you will immediately have data available. If you're using the [history](/components/history/) component, this will automatically also start the recoder component on startup.
If you are *not* running the `recorder` component, it can take time till the sensor starts to work because a couple of attributes need more than one value to do the calculation. 

To enable the statistics sensor, add the following lines to your `configuration.yaml`:

```yaml
# enable the recorder component (optional)
recorder:

# Example configuration.yaml entry
sensor:
  - platform: statistics
    entity_id: sensor.cpu
  - platform: statistics
    entity_id: binary_sensor.movement
    max_age:
      minutes: 30
```

Configuration variables:

- **entity_id** (*Required*): The entity to monitor. Only [sensors](/components/sensor/) and [binary sensor](/components/binary_sensor/).
- **name** (*Optional*): Name of the sensor to use in the frontend. Defaults to `Stats`.
- **sampling_size** (*Optional*): Size of the sampling. If the limit is reached then the values are rotated. Defaults to `20`.
- **max_age** (*Optional*): Maximum age of measurements. Setting this to a time interval will cause older values to be discarded.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/stats-sensor.png' />
</p>
