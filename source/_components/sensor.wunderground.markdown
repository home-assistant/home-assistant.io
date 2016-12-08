---
layout: page
title: "Weather Underground (WUnderground)"
description: "Instructions how to integrate Weather Underground (WUnderground) Weather within Home Assistant."
date: 2016-08-18
sidebar: true
comments: false
sharing: true
footer: true
logo: wunderground.png
ha_category: Weather
ha_release: 0.27
ha_iot_class: "Cloud Polling"
---


The `wunderground` platform uses [Weather Underground](http://www.wunderground.com) as a source for current weather information. 

<p class='note warning'>
Obtain a WUnderground API key [here](https://www.wunderground.com/weather/api). A free account allows 500 requests per day or 10 per minute.
</p>

To add Wunderground to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: wunderground
    api_key: your_api_key
    monitored_conditions:
      - alerts
      - dewpoint_c
      - dewpoint_f
      - dewpoint_string
      - feelslike_c
      - feelslike_f
      - feelslike_string
      - heat_index_c
      - heat_index_f
      - heat_index_string
      - elevation
      - location
      - observation_time
      - precip_1hr_in
      - precip_1hr_metric
      - precip_1hr_string
      - precip_today_in
      - precip_today_metric
      - precip_today_string
      - pressure_in
      - pressure_mb
      - pressure_trend
      - relative_humidity
      - station_id
      - solarradiation
      - temperature_string
      - temp_c
      - temp_f
      - UV
      - visibility_km
      - visibility_mi
      - weather
      - wind_degrees
      - wind_dir
      - wind_gust_kph
      - wind_gust_mph
      - wind_kph
      - wind_mph
      - wind_string

```

Configuration variables:
- **api_key** (Required): See above.
- **pws_id** (Optional): You can enter a Personal Weather Station ID. The current list of Wunderground PWS stations is available [here](https://www.wunderground.com/weatherstation/ListStations.asp). If you do not enter a PWS ID, the current location information (latitude and longitude) from your `configuration.yaml` will be used to display weather conditions. 
- **lang** (Optional): Specify the language that the API returns. The current list of all Wunderground language codes is available [here](https://www.wunderground.com/weather/api/d/docs?d=language-support). If not specified, it defaults to English (EN).
- **monitored_conditions** array (*Required*): Conditions to display in the frontend. The following conditions can be monitored.
  - **alerts**: Current severe weather advisories
  - **dewpoint_c**: Temperature in Celsius below which water droplets begin to condense and dew can form
  - **dewpoint_f**: Temperature in Fahrenheit below which water droplets begin to condense and dew can form
  - **dewpoint_string**: Text summary of dew point
  - **feelslike_c**: Feels like (or apparent) temperature in Celsius
  - **feelslike_f**: Feels like (or apparent) temperature in Fahrenheit
  - **feelslike_string**: Text summary of how the current temperature feels like
  - **heat_index_c**: Heat index (combined effects of the temperature and humidity of the air) in Celsius
  - **heat_index_f**: Heat index (combined effects of the temperature and humidity of the air) in Fahrenheit
  - **heat_index_string**: Text summary of current heat index
  - **elevation**: Elevation in feet
  - **location**: City and State
  - **observation_time**: Text summary of observation time
  - **precip_today_in**: Total precipitation in inches
  - **precip_today_metric**: Total precipitation in metric units
  - **precip_today_string**: Text summary of precipitation today
  - **pressure_in**: Atmospheric air pressure in inches
  - **pressure_mb**: Atmospheric air pressure in millibars
  - **pressure_trend**: Atmospheric air presure trend signal (+/-)
  - **relative_humidity**: Relative humidity
  - **station_id**: Your personal weather station (PWS) ID
  - **solarradiation**: Current levels of solar radiation
  - **temperature_string**: Temperature text combinding Fahrenheit and Celsius
  - **temp_c**: Current temperature in Celsius
  - **temp_f**: Current temperature in Fahrenheit
  - **UV**: Current levels of UV radiation. See [here](https://www.wunderground.com/resources/health/uvindex.asp) for explanation.
  - **visibility_km**: Average visibility in km
  - **visibility_mi**: Average visibility in miles
  - **weather**: A human-readable text summary with picture from Wunderground.
  - **wind_degrees**: Wind degrees
  - **wind_dir**: Wind direction
  - **wind_gust_kph**: Wind gusts speed in kph
  - **wind_gust_mph**: Wind gusts speed in mph
  - **wind_kph**: Current wind speed in kph
  - **wind_mph**: Current wind speed in mph
  - **wind_string**: Text summary of current wind conditions

All the conditions listed above will be updated each 5 minutes with exception of `alerts` that will be updated each 15 minutes by default.

Additional details about the API are available [here](https://www.wunderground.com/weather/api/d/docs).

