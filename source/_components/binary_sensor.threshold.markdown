---
layout: page
title: "Threshold Binary Sensor"
description: "Instructions how to integrate threshold binary sensors into Home Assistant."
date: 2016-11-26 12:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Binary Sensor
ha_iot_class: "Local Polling"
ha_release: 0.34
---


The `threshold` binary sensor platform observes the state of another sensor. If the value is below (`lower`) or higher (`upper`) than the given threshold then state of the threshold sensor is changed.

If the sensor is configured with no hysteresis and the sensor value is equal to the threshold, the sensor is turned off since it is not `lower` or `upper` with respect to the threshold.

It's an alternative to the template binary sensor's `value_template:` to get the abnormal/too high/too low states.

```yaml
{% raw %}{{ states.sensor.furnace.state > 2.5 }}{% endraw %}
```

To enable the threshold sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: threshold
    threshold: 15
    type: lower
    entity_id: sensor.random
```

Configuration variables:

- **entity_id** (*Required*): The entity to monitor. Only [sensors](/components/sensor/) are supported.
- **threshold** (*Required*): The threshold which the observed value is compared against.
- **type** (*Required*): `lower` if the value needs to be below the threshold or `upper` if higher.
- **hysteresis** (*Optional*): The distance the observed value must be from the threshold before the state is changed. Defaults to `0.0`
- **name** (*Optional*): Name of the sensor to use in the frontend. Defaults to `Stats`.
