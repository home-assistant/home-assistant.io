---
layout: page
title: "Pilight Sensor"
description: "Instructions on how to integrate pilight sensors within Home Assistant."
date: 2016-10-08 23:21
sidebar: true
comments: false
sharing: true
footer: true
logo: pilight.png
ha_category: DIY
ha_release: 0.31
ha_iot_class: depends
---


This `pilight` sensor platform for 433 MHz devices uses a value in the message payload as the sensor value. Unique identifiers (e.g., _uuid_) can be set to distinguish between multiple pilight devices. To use a pilight sensor the pilight Home Assistant hub has to be set up.

## {% linkable_title Configuration %}

To use your sensor via pilight, make sure it is [supported](https://wiki.pilight.org/doku.php/protocols) and add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pilight
    variable: temperature
    payload:
      uuid: '0000-b8-27-eb-f447d3'
```

Configuration variables:

- **variable** (*Required*): The variable name in the data stream that defines the sensor value.
- **payload** (*Required*): Message payload identifiers. Only if all identifiers are matched the sensor value is set.
- **name** (*Optional*): Name of the sensor.
- **unit_of_measurement** (*Optional*): Defines the units of measurement of the sensor, if any.

## {% linkable_title Example: Weather station %}

This section shows a real life example how to use values of a weather station.


```yaml
# Example configuration.yaml entry
sensor:
  - platform: pilight
    name: 'Temperature'
    variable: 'temperature'
    payload:
      uuid: 0000-b8-27-eb-f1f72e
    unit_of_measurement: '°C'
  - platform: pilight
    name: 'Humidity'
    variable: 'humidity'
    payload:
      uuid: 0000-b8-27-eb-f1f72e
    unit_of_measurement: '%'
  - platform: pilight
    name: 'Battery'
    variable: 'battery'
    payload:
      uuid: 0000-b8-27-eb-f1f72e
    unit_of_measurement: '%'
```
