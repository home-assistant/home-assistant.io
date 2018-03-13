---
layout: page
title: "Trend Binary Sensor"
description: "Instructions how to integrate Trend binary sensors into Home Assistant."
date: 2016-09-05 10:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Binary Sensor
logo: home-assistant.png
ha_release: 0.28
ha_iot_class: "Local Push"
---

The `trend` platform allows you to create sensors which show the trend of numeric `state` or`state_attributes` from other entities. This sensor requires at least two updates of the underlying sensor to establish a trend. Thus it can take some time to show an accurate state. It can be useful as part of automations, where you want to base an action on a trend.

To enable Trend binary sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: trend
    sensors:
      solar_angle:
        entity_id: sensor.cpu_speed
```

Configuration variables:

- **sensors** array (*Required*): List of your sensors.
  - **entity_id** (*Required*): The entity that this sensor tracks.
  - **attribute** (*Optional*): The attribute of the entity that this sensor tracks. If no attribute is specified then the sensor will track the state.
  - **device_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
  - **friendly_name** (*Optional*): Name to use in the Frontend.
  - **invert** (*Optional*): Invert the result (so `true` means descending rather than ascending). Defaults to `False`
  - **max_samples** (*Optional*): Limit the maximum number of stored samples. Defaults to `2`.
  - **min_gradient** (*Optional*): The minimum rate at which the observed value must be changing for this sensor to switch on. Defaults to `0.0`
  - **sample_duration** (*Optional*): The duration **in seconds** to store samples for. Samples older than this value will be discarded. Defaults to `0`

## {% linkable_title Using Multiple Samples %}

If the optional `sample_duration` and `max_samples` parameters are specified then multiple samples can be stored and used to detect long-term trends.

Each time the state changes, a new sample is stored along with the sample time. Samples older than `sample_duration` seconds will be discarded.

A trend line is then fitted to the available samples, and the gradient of this line is compared to `min_gradient` to determine the state of the trend sensor. The gradient is measured in sensor units per second - so if you want to know when the temperature is falling by 2 degrees per hour, use a gradient of (-2) / (60 x 60) = -0.00055

The current number of stored samples is displayed on the States page.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

This example indicates `true` if the sun is still rising:

```yaml
binary_sensor:
  - platform: trend
    sensors:
      sun_rising:
        entity_id: sensor.cpu_speed
```

This example creates two sensors to indicate whether the temperature is rising or falling at a rate of at least 3 degrees an hour, and collects samples over a two hour period:

```yaml
binary_sensor:
  - platform: trend
    sensors:
      temp_falling:
        entity_id: sensor.outside_temperature
        sample_duration: 7200
        min_gradient: -0.0008
        device_class: cold

      temp_rising:
        entity_id: sensor.outside_temperature
        sample_duration: 7200
        min_gradient: 0.0008
        device_class: heat
```
