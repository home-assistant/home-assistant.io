---
layout: page
title: "Luftdaten Sensor"
description: "Instructions on how to setup Luftdaten sensor in Home Assistant."
date: 2017-11-01 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: luftdaten.png
ha_category: Health
ha_release: 0.57
ha_iot_class: "Cloud Polling"
---

The `luftdaten` sensor platform will query the open data API of [luftdaten.info](http://luftdaten.info) to monitor air quality and other weather data from a specific (self build) sensor station.

- To get the ID of a particle sensor you need to select it on the [Feinstaub map](http://deutschland.maps.luftdaten.info/) and find it in the sidebar (Column "Sensor ID").
- To get the ID of a temperature/humidity sensor you need to find it on the map hosted on [Madavi](https://www.madavi.de/sensor/feinstaub-map-dht/).

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: luftdaten
    sensorid: 3123
    monitored_conditions:
      - P1
      - P2
  - platform: luftdaten
    sensorid: 155
    monitored_conditions:
      - temperature
      - humidity
```

{% configuration %}
  sensorid:
    description: The ID of the sensor.
    required: true
    type: string
  name:
    description: Name of the sensor to use in the frontend.
    required: false
    default: Luftdaten Sensor
    type: string
  monitored_conditions:
    description: A list of conditions you want to monitor.
    required: true
    type: list
    keys:
      P1:
        description: Show the particle sensors (particles 10 microns and below).
      P2:
        description: Show the particle sensors (particles 2.5 microns and below).
      temperature:
        description: Display the temperature from the sensor.
      humidity:
        description: Display the humidity from the sensor.
      pressure:
        description: Display the pressure from the sensor.
  show_on_map:
    description: Option to show the position of the sensor on the map.
    required: optional
    default: false
    type: boolean
{% endconfiguration %}

<p class='note warning'>
If you set `show_on_map` to `True` then the location attributes are named `latitude` and `longitude`. The default name of the location attributes is `lat` and `long` to avoid showing them on the map.
</p>

Not all sensors provide all conditions. Also, it's possible that the sensor values are not available all the time. To check what a sensor is publishing use `curl`:

```bash
$ curl https://api.luftdaten.info/v1/sensor/[sensorid]/
```
