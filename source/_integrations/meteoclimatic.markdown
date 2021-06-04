---
title: Meteoclimatic
description: Instructions on how to integrate Meteoclimatic within Home Assistant.
ha_release: 2021.6
ha_iot_class: Cloud Polling
ha_category:
  - Sensor
  - Weather
ha_codeowners:
  - '@adrianmo'
ha_config_flow: true
ha_domain: meteoclimatic
ha_platforms:
  - sensor
  - weather
---

The Meteoclimatic integration uses the [Meteoclimatic](https://www.meteoclimatic.net/) web service as a source for meteorological data for your location. The location is based on the Meteoclimatic station code (e.g., `ESCAT4300000043206B`) and the weather data reported is based on the capabilities of each station.

There is currently support for the following platforms within Home Assistant:

- Weather
- [Sensor](#sensor-platforms)

It displays the current weather along with individual sensors that include daily maximum and minimum values.

{% include integrations/config_flow.md %}

## Sensor platforms

All the following sensors will be created:

|Entity|Description|
|------|-----------|
|`daily_max_humidity`|Maximum humidity for the past 24 hours in %|
|`daily_max_pressure`|Maximum pressure for the past 24 hours in hPa|
|`daily_max_temperature`|Maximum temperature for the past 24 hours in °C|
|`daily_max_wind_speed`|Maximum wind speed for the past 24 hours in km/h|
|`daily_min_humidity`|Minimum humidity for the past 24 hours in %|
|`daily_min_pressure`|Minimum pressure for the past 24 hours in hPa|
|`daily_min_temperature`|Minimum temperature for the past 24 hours in °C|
|`daily_precipitation`|Precipitation cumulation for past 24 hours in mm|
|`humidity`|The current humidity in %|
|`pressure`|The current pressure in hPa|
|`temperature`|The current temperature in °C|
|`wind_bearing`|The current wind bearing in °|
|`wind_speed`|The current wind speed in km/h|

Warning: As not all weather stations have the same capabilities, some entities might not be available for certain weather stations. Entities are only added if data is available and provided by Meteoclimatic.
