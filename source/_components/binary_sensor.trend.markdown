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

The `trend` platform allows you to create sensors which show the trend of numeric `state` or`state_attributes` from other entities. This sensor requires two updates of the underlying sensor to establish a trend. Thus it can take some time to show an accurate state. It can be useful as part of automations, where you want to base an action on a trend.

To enable Trend binary sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: trend
    sensors:
      solar_angle:
        entity_id: sun.sun
```

Configuration variables:

- **sensors** array (*Required*): List of your sensors.
  - **friendly_name** (*Optional*): Name to use in the Frontend.
  - **sensor_class** (*Optional*): The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
  - **entity_id** (*Required*): The entity that this sensor tracks.
  - **attribute** (*Optional*): The attribute of the entity that this sensor tracks. If no attribute is specified then the sensor will track the state.
  - **invert** (*Optional*): Invert the result (so `true` means descending rather than ascending)

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Temperature trend %}

This example indicates `true` if the temperature is rising:

```yaml
binary_sensor:
  - platform: trend
    sensors:
      temperature_up:
        friendly_name: 'Temp increasing'
        entity_id: sensor.skylight_temperature
        sensor_class: heat
```

And this one indicates `true` if the temperature is falling:

```yaml
binary_sensor:
  - platform: trend
    sensors:
      temperature_down:
        friendly_name: 'Temp decreasing'
        entity_id: sensor.skylight_temperature
        sensor_class: cold
        invert: Yes
```
