---
layout: page
title: "ZAMG Sensor"
description: "Instructions how to integrate ZAMG sensors within Home Assistant."
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

Configuration variables:

- **station_id** (*Optional*): The ID number for a supported ZAMG station.
- **name** (*Optional*): Additional name for the sensors. Defaults to platform name.
- **latitude** (*Optional*): Latitude coordinate to monitor weather of (required if **longitude** is specified). Defaults to coordinates defined in your `configuration.yaml` file.
- **longitude** (*Optional*): Longitude coordinate to monitor weather of (required if **latitude** is specified). Defaults to coordinates defined in your `configuration.yaml` file.
- **monitored_conditions** array (*Optional*): Conditions to display in the frontend.
  - **pressure**: Pressure at station level
  - **pressure_sealevel**: Pressure at sea Level
  - **humidity**: Humidity
  - **wind_speed**: Wind speed
  - **wind_bearing**: Wind bearing
  - **wind_max_speed**: Top wind speed
  - **wind_max_bearing**: Top wind bearing
  - **sun_last_hour**: Sun last hour percentage
  - **temperature**: Temperature
  - **precipitation**: Precipitation
  - **dewpoint**: Dew point

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
