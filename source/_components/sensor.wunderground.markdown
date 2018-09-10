---
layout: page
title: "Weather Underground (WUnderground)"
description: "Instructions on how to integrate Weather Underground (WUnderground) Weather within Home Assistant."
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
Obtain a WUnderground API key [here](https://www.wunderground.com/weather/api). They no longer offer free API keys, and all keys must be paid for. At this time existing free keys will continue to work, but will be disabled Dec 31, 2018.  As of Sept 6, 2018 Weather Underground states they are declaring the [End of Service for the Weather Underground API](https://apicommunity.wunderground.com/weatherapi/topics/end-of-service-for-the-weather-underground-api). They say they will develop new plans for non-commercial users.  No timeline for this has been announced.

Please consider this when using the following information.
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
```

Configuration variables:

- **api_key** (*Required*): The API key for Weather Underground. See above for details.
- **pws_id** (*Optional*): You can enter a Personal Weather Station ID. The current list of Wunderground PWS stations is available [here](https://www.wunderground.com/weatherstation/ListStations.asp). If you do not enter a PWS ID, the current location information (latitude and longitude) from your `configuration.yaml` will be used to display weather conditions. 
- **lang** (*Optional*): Specify the language that the API returns. The current list of all Wunderground language codes is available [here](https://www.wunderground.com/weather/api/d/docs?d=language-support). If not specified, it defaults to English (EN).
- **latitude** (*Optional*): Latitude coordinate to monitor weather of (required if **longitude** is specified). Defaults to coordinates defined in your `configuration.yaml`.
- **longitude** (*Optional*): Longitude coordinate to monitor weather of (required if **latitude** is specified). Defaults to coordinates defined in your `configuration.yaml`.
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
  - **precip_1d_mm** [<sup>[1d]</sup>](#1d): Forecasted precipitation intensity in millimeters
  - **precip_1d_in** [<sup>[1d]</sup>](#1d): Forecasted precipitation intensity in inches
  - **precip_1d** [<sup>[1d]</sup>](#1d): Forecasted precipitation probability in %
  - **pressure_in**: Atmospheric air pressure in inches
  - **pressure_mb**: Atmospheric air pressure in millibars
  - **pressure_trend**: Atmospheric air pressure trend signal (+/-)
  - **relative_humidity**: Relative humidity
  - **station_id**: Your personal weather station (PWS) ID
  - **solarradiation**: Current levels of solar radiation
  - **temperature_string**: Temperature text combining Fahrenheit and Celsius
  - **temp_c**: Current temperature in Celsius
  - **temp_f**: Current temperature in Fahrenheit
  - **temp_high_record_c**: Maximum temperature measured in Celsius
  - **temp_high_record_f**: Maximum temperature measured in Fahrenheit
  - **temp_low_record_c**: Minimal temperature measured in Celsius
  - **temp_low_record_f**: Minimal temperature measured in Fahrenheit
  - **temp_high_avg_c**: Average high for today in Celsius
  - **temp_high_avg_f**: Average high for today in Fahrenheit
  - **temp_low_avg_c**: Average low for today in Celsius
  - **temp_low_avg_f**: Average low for today in Fahrenheit
  - **temp_high_1d_c** [<sup>[1d]</sup>](#1d): Forecasted high temperature in Celsius
  - **temp_high_1d_f** [<sup>[1d]</sup>](#1d): Forecasted high temperature in Fahrenheit
  - **temp_low_1d_c** [<sup>[1d]</sup>](#1d): Forecasted low temperature in Celsius
  - **temp_low_1d_f** [<sup>[1d]</sup>](#1d): Forecasted low temperature in Fahrenheit
  - **UV**: Current levels of UV radiation. See [here](https://www.wunderground.com/resources/health/uvindex.asp) for explanation.
  - **visibility_km**: Average visibility in km
  - **visibility_mi**: Average visibility in miles
  - **weather**: A human-readable text summary with picture from Wunderground.
  - **weather_1d** [<sup>[12h]</sup>](#12h): A human-readable weather forecast using imperial units.
  - **weather_1d_metric** [<sup>[12h]</sup>](#12h): A human-readable weather forecast using metric units.
  - **weather_1h** [<sup>[1h]</sup>](#1h): Weather conditions in 1 hour. (e.g., "Thunderstorm" etc.)
  - **wind_degrees**: Wind degrees
  - **wind_dir**: Wind direction
  - **wind_gust_kph**: Wind gusts speed in kph
  - **wind_gust_mph**: Wind gusts speed in mph
  - **wind_gust_1d_kph** [<sup>[1d]</sup>](#1d): Max. forecasted Wind in kph
  - **wind_gust_1d_mph** [<sup>[1d]</sup>](#1d): Max. forecasted Wind in mph
  - **wind_kph**: Current wind speed in kph
  - **wind_mph**: Current wind speed in mph
  - **wind_1d_kph** [<sup>[1d]</sup>](#1d): Forecasted wind speed in kph
  - **wind_1d_mph** [<sup>[1d]</sup>](#1d): Forecasted wind speed in mph
  - **wind_string**: Text summary of current wind conditions

All the conditions listed above will be updated every 5 minutes.

### {% linkable_title Forecasts %}

_12 hour forecasts_

Monitored conditions marked above with <a name="12h">[12h]</a> are 12 hour forecasts. To get a forecast for different period/daytime replace the `_1d_` part of the sensor name.  e.g., `weather_2n` will give you forecast for tomorrow night. Valid values for day are `1` to `4` and valid values for daytime are `d` or `n`.

_Daily forecasts_

Conditions above marked with <a name="1d">[1d]</a> are daily forecasts. To get forecast for different day, replace the number
in `_1d_` part of the sensor name. Valid values are from `1` to `4`.

_Hourly forecasts_

Conditions marked with <a name="1h">[1h]</a> are hourly forecasts. To get forecast for different hour, replace the number
in the `_1h_` part of the sensor name with `1` to `36`. e.g., `weather_24h` will give you weather in 24 hours.

### {% linkable_title Additional examples %}

#### {% linkable_title Daily forecast %}

```yaml
sensor:
  - platform: wunderground
    api_key: your_api_key
    monitored_conditions:
      - weather_1d_metric
      - weather_1n_metric
      - weather_2d_metric
      - weather_2n_metric
      - weather_3d_metric
      - weather_3n_metric
      - weather_4d_metric
      - weather_4n_metric

group:
  daily_forecast:
    name: Daily Forecast
    entities:
      - sensor.pws_weather_1d_metric
      - sensor.pws_weather_1n_metric
      - sensor.pws_weather_2d_metric
      - sensor.pws_weather_2n_metric
      - sensor.pws_weather_3d_metric
      - sensor.pws_weather_3n_metric
      - sensor.pws_weather_4d_metric
      - sensor.pws_weather_4n_metric
```

![Daily Forecast](/images/screenshots/wunderground_daily_forecast.png)

#### {% linkable_title Weather overview %}

```yaml
sensor:
  - platform: wunderground
    api_key: your_api_key
    monitored_conditions:
      - temp_high_record_c
      - temp_high_1d_c
      - temp_c
      - temp_low_1d_c
      - temp_low_record_c
      - precip_1d
      - precip_1d_mm
      - wind_kph
      - wind_1d_kph
      - alerts

group:
  weather_overview:
    name: Weather overview
    entities:
      - sensor.pws_weather_1d_metric
      - sensor.pws_temp_high_record_c
      - sensor.pws_temp_high_1d_c
      - sensor.pws_temp_c
      - sensor.pws_temp_low_1d_c
      - sensor.pws_temp_low_record_c
      - sensor.pws_precip_1d
      - sensor.pws_precip_1d_mm
      - sensor.pws_wind_kph
      - sensor.pws_wind_1d_kph
      - sensor.pws_alerts
```

![Weather overview](/images/screenshots/wunderground_weather_overview.png)

<p class='note warning'>
Note: While the platform is called “wunderground” the sensors will show up in Home Assistant as “PWS” (eg: sensor.pws_weather).
</p>

Note that the Weather Underground sensor is added to the entity_registry, so second and subsequent Personal Weather Station ID (pws_id) will have their monitored conditions suffixed with an index number e.g.

- sensor.pws_weather_1d_metric_2

Additional details about the API are available [here](https://www.wunderground.com/weather/api/d/docs).
