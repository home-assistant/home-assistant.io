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
ha_iot_class: "Local Push"
ha_release: 0.34
---


The `threshold` binary sensor platform is consuming the state from another sensor. If the value is below (`lower`) or higher (`upper`) than the given threshold then state of this sensor change..

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

    # If present, sensor will only switch to on if the threshold is met for this amount of time.
    on_delay:
      hours: 1
      minutes: 10
      seconds: 5

    # Same as above, but for the sensor switching to off.
    off_delay:
      hours: 1
      minutes: 10
      seconds: 5
```

Configuration variables:

- **entity_id** (*Required*): The entity to monitor. Only [sensors](/components/sensor/) are supported.
- **threshold** (*Required*): The value which is the threshold.
- **type** (*Required*): `lower` if the value needs to be below the threshold or `upper` if higher.
- **name** (*Optional*): Name of the sensor to use in the frontend. Defaults to `Stats`.
- **on_delay** (*Optional*): The amount of time the threshold must be met before this sensor will switch to on.
- **off_delay** (*Optional*): The amount of time the threshold must be not met before this sensor will switch to off.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Washing Machine Running %}

This example creates a washing machine "load running" sensor by monitoring an energy meter connected to the washer. During the washer's operation, the energy meter will fluctuate wildly, hitting zero frequently even before the load is finished. By utilizing `off_delay`, we can have this sensor only turn off if there has been no washer activity for 5 minutes.

```yaml
# Determine when the washing machine has a load running.
binary_sensor:
  - platform: threshold
    name: Washing Machine
    threshold: 0
    type: upper
    entity_id: sensor.washing_machine_power
    off_delay:
      minutes: 5
```
