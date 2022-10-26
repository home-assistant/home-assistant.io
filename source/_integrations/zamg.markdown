---
title: Zentralanstalt für Meteorologie und Geodynamik (ZAMG)
description: Instructions on how to integrate ZAMG within Home Assistant.
ha_category:
  - Sensor
  - Weather
ha_release: 0.35
ha_iot_class: Cloud Polling
ha_domain: zamg
ha_config_flow: true
ha_platforms:
  - sensor
  - weather
ha_integration_type: integration
---

The `zamg` platform uses meteorological details published by the Austrian weather service [Zentralanstalt für Meteorologie und Geodynamik (ZAMG)](https://www.zamg.ac.at).

Only observations for capital cities are publicly available. You can check the list of stations in [CSV format](https://www.zamg.ac.at/ogd).

{% include integrations/config_flow.md %}

There is currently support for the following device types within Home Assistant:

- **Weather** - It displays the current temperature, humidity, pressure and wind speed, but it doesn't have support for conditions which is a key feature of the `weather` platforms.
- **[Sensor](#sensor)**

## Sensor

This integration provides the following sensors:

|Name|Description|
|----|-----------|
|Temperature|Temperature in °C|
|Humidity|Humidity in %|
|Dew Point|Dew point in °C|
|Pressure|Station pressure in hPa|
|Pressure at Sea Level|Sea level pressure in hPa|
|Wind Speed|Wind speed in km/h|
|Top Wind Speed|Max wind speed in km/h|
|Wind Bearing|Wind bearing in °|
|Top Wind Bearing|Wind bearing at max speed in °|
|Sun Last Hour|Sunshine in the last hour in %|
|Precipitation|Precipitation in 1/m²|
|Station Name|Station name|
|Station Elevation|The station elevation in m|
|Update Date|Update date of last read data|
|Update Time|Update time of last read data|
|Station id|The station id|
