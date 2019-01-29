---
layout: page
title: "Luftdaten"
description: "Instructions on how to setup Luftdaten sensors in Home Assistant."
date: 2018-11-05 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: luftdaten.png
ha_category: Health
ha_release: 0.82
ha_iot_class: "Cloud Polling"
ha_qa_scale: gold
---

The `luftdaten` component will query the open data API of [luftdaten.info](http://luftdaten.info) to monitor air quality and other weather data from a specific (self build) sensor station.

## {% linkable_title Setup %}

- To get the ID of a particle sensor you need to select it on the [Feinstaub map](http://deutschland.maps.luftdaten.info/) and find it in the sidebar (Column "Sensor ID").
- To get the ID of a temperature/humidity sensor you need to find it on the map hosted on [Madavi](https://www.madavi.de/sensor/feinstaub-map-dht/).


## {% linkable_title COnfiguration via the frontend %}

Menu: **Configuration** -> **Integrations**
  
Configure the integration:

* Enter the **Sensor ID**
* Choose if you want to show the sensor's location on the map.

## {% linkable_title Manual Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
luftdaten:
```

{% configuration %}
sensor_id:
  description: The ID of the sensor.
  required: true
  type: string
show_on_map:
  description: Option to show the position of the sensor on the map.
  required: optional
  default: false
  type: boolean
scan_interval:
  description: the frequency (in seconds) between data updates.
  required: false
  type: integer
  default: 1800
sensors:
  description: The sensor-related configuration options.
  required: false
  type: map
  keys:
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
{% endconfiguration %}

<p class='note warning'>
If you set `show_on_map` to `true` then the location attributes are named `latitude` and `longitude`. The default name of the location attributes is `lat` and `long` to avoid showing them on the map.
</p>

Not all sensors provide all conditions. Also, it's possible that the sensor values are not available all the time. To check what a sensor is publishing use `curl`:

```bash
$ curl https://api.luftdaten.info/v1/sensor/[sensorid]/
```

## {% linkable_title Full example %}

This example would use the sensor with the ID 155, show it on the `map` and would monitor `temperature` and `humidity`.
 
```yaml
# Example configuration.yaml entry
luftdaten:
  sensor_id: 155
  show_on_map: true
  sensors:
    monitored_conditions:
      - temperature
      - humidity
```
