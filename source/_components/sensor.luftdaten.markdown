---
layout: page
title: "Luftdaten Sensor"
description: "Instructions how to setup Luftdaten sensor in Home Assistant."
date: 2017-11-01 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
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

Configuration variables:

- **sensorid** (*Required*): The ID of the sensor.
- **monitored_conditions** (*Required*): A list of conditions you want to monitor. The following conditions can be monitored:
  - `P1` for particle sensors (particles 10 microns and below).
  - `P2` for particle sensors (particles 2.5 microns and below).
  - `temperature` for weather sensors.
  - `humidity` for weather sensors.
- **name** (*Optional*): Name of the sensor to use in the frontend. Defaults to `Luftdaten Sensor`.
- **resource** (*Optional*): The URL of the API endpoint. Usually this has not to be changed. The default is `https://api.luftdaten.info/v1/sensor/`.
- **verify_ssl** (*Optional*): Verify SSL connection. Defaults to `true`.
