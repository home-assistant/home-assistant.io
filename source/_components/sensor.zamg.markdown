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
---

The `zamg` platform uses meteorological details published by the Austrian weather service [Zentralanstalt für
 Meteorologie und Geodynamik (ZAMG)](https://www.zamg.ac.at/).

The following stations are available:

| `station_id` | Location         |
| :----------- |:-----------------|
| 11010        | Linz/Hörsching   |
| 11012        | Kremsmünster     |
| 11022        | Retz             |
| 11035        | Wien/Hohe Warte  |
| 11036        | Wien/Schwechat   |
| 11101        | Bregenz          |
| 11121        | Innsbruck        |
| 11126        | Patscherkofel    |
| 11130        | Kufstein         |
| 11150        | Salzburg         |
| 11155        | Feuerkogel       |
| 11157        | Aigen im Ennstal |
| 11171        | Mariazell        |
| 11190        | Eisenstadt       |
| 11204        | Lienz            |

To add ZAMG to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zamg
    station_id: 11035
    monitored_conditions:
      - temperature
      - humidity
```

Configuration variables:

- **station_id** (*Required*): Your API key for http://openweathermap.org/.
- **name** (*Optional*): Additional name for the sensors. Defaults to platform name.
- **monitored_conditions** array (*Required*): Conditions to display in the frontend.
  - **pressure**: Pressure at station level
  - **pressure_sealevel**: Pressure at sea Level
  - **humidity**: Humidity
  - **wind_speed**: Wind speed
  - **wind_bearing**: Wind bearing
  - **wind_max_speed**: Top wind speed
  - **wind_max_bearing**: Top wind bearing
  - **sun_last_hour**: Sun last hourpercentage
  - **temperature**: Temperature
  - **precipitation**: Precipitation
  - **dewpoint**: Dew point

