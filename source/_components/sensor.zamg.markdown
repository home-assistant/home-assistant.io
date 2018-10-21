---
layout: page
title: "ZAMG Sensor"
description: "Instructions on how to integrate ZAMG sensors within Home Assistant."
date: 2016-12-06 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: zamg.png
ha_category: Weather
ha_release: 0.35
ha_iot_class: "Cloud Polling"
---

The `zamg` platform uses meteorological details published by the Austrian weather service [Zentralanstalt für Meteorologie und Geodynamik (ZAMG)](https://www.zamg.ac.at).

Only observations for capital cities are publicly available. You can check the list of stations in [CSV format](http://www.zamg.ac.at/ogd).

To add ZAMG to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zamg
```

{% configuration %}
station_id:
  required: false
  description: The ID number for a supported ZAMG station.
  type: string
name:
  required: false
  description: Additional name for the sensors. Defaults to platform name.
  default: zamg
  type: string
latitude:
  required: false
  description: "Latitude coordinate to monitor weather of (required if **longitude** is specified)."
  default: "Defaults to coordinates defined in your `configuration.yaml` file."
  type: float
longitude:
  required: false
  description: "Longitude coordinate to monitor weather of (required if **latitude** is specified)."
  default: "Defaults to coordinates defined in your `configuration.yaml` file."
  type: float
monitored_conditions:
  required: false
  description: Conditions to display in the frontend.
  type: list
  default: temperature
  keys:
    pressure:
      description: Pressure at station level
    pressure_sealevel:
      description: Pressure at sea Level
    humidity:
      description: Humidity
    wind_speed:
      description: Wind speed
    wind_bearing:
      description: Wind bearing
    wind_max_speed:
      description: Top wind speed
    wind_max_bearing:
      description: Top wind bearing
    sun_last_hour:
      description: Sun last hour percentage
    temperature:
      description: Temperature
    precipitation:
      description: Precipitation
    dewpoint:
      description: Dew point
{% endconfiguration %}

A full configuration example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zamg
    station_id: 11035
    name: Wien
    monitored_conditions:
      - temperature
      - humidity
```

<p class='note'>
This sensor is an alternative to the [`zamg`](/components/weather.zamg/) weather platform. The `zamg` weather platform is easier to configure but less customizable.
</p>
