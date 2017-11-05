---
layout: page
title: "Min/max Sensor"
description: "Instructions how to integrate min/max sensors into Home Assistant."
date: 2016-10-13 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: "0.31"
---


The `min_max` sensor platform consumes the state from other sensors to determine the minimum, maximum, and the mean of the collected states. The sensor will always show you the lowest/highest value which was received from all monitored sensors. If you have spikes in your values, it's recommended to filter/equalize your values with a [statistics sensor](/components/sensor.statistics/) first.

This sensor is an alternative to the [template sensor](/components/sensor.template/)'s `value_template:` to get the average of multiple sensors.

```yaml
{% raw %}{{ ((float(states.sensor.kitchen_temperature.state) + 
     float(states.sensor.living_room_temperature.state) +
     float(states.sensor.office_temperature.state)) / 3) | round(2)
}}{% endraw %}
```

Sensors with an unknown state will be ignored in the calculation. If the unit of measurement of the sensors differs, the `min_max` sensor will go to an error state where the value is `UNKNOWN` and unit of measurement is `ERR`.

To enable the `min_max` sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: min_max
    entity_ids:
      - sensor.kitchen_temperature
      - sensor.living_room_temperature
      - sensor.office_temperature
```

Configuration variables:

- **entity_ids** (*Required*): At least two entities to monitor. The unit of measurement of the first entry will be the one that's used. All entities must use the same unit of measurement.
- **type** (*Optional*): The type of sensor: `min`, `max` or `mean`. Defaults to `max`.
- **name** (*Optional*): Name of the sensor to use in the frontend.
- **round_digits** (*Optional*): Round mean value to specified number of digits. Defaults to 2.

