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
ha_integration_type: integration
---

The Meteoclimatic integration uses the [Meteoclimatic](https://www.meteoclimatic.net/) web service as a source for meteorological data for your location. The location is based on the Meteoclimatic station code (e.g., `ESCAT4300000043206B`) and the weather data reported is based on the capabilities of each station.

There is currently support for the following platforms within Home Assistant:

- Weather
- [Sensor](#sensor)

It displays the current weather along with individual sensors that include daily maximum and minimum values.

{% include integrations/config_flow.md %}

## Sensor

This integration provides the following sensors:

|Name|Description|
|----|-----------|
|Daily Max Humidity|Maximum humidity for the past 24 hours in %|
|Daily Max Pressure|Maximum pressure for the past 24 hours in hPa|
|Daily Max Temperature|Maximum temperature for the past 24 hours in °C|
|Daily Max Wind Speed|Maximum wind speed for the past 24 hours in km/h|
|Daily Min Humidity|Minimum humidity for the past 24 hours in %|
|Daily Min Pressure|Minimum pressure for the past 24 hours in hPa|
|Daily Min Temperature|Minimum temperature for the past 24 hours in °C|
|Daily Precipitation|Precipitation cumulation for past 24 hours in mm|
|Humidity|The current humidity in %|
|Pressure|The current pressure in hPa|
|Temperature|The current temperature in °C|
|Wind Bearing|The current wind bearing in °|
|Wind Speed|The current wind speed in km/h|

Warning: As not all weather stations have the same capabilities, some sensors might not be available for certain weather stations. Sensors are only added if data is available and provided by Meteoclimatic.
