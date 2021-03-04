---
title: Weather Underground (WUnderground)
description: Instructions on how to integrate Weather Underground (WUnderground) Weather within Home Assistant.
ha_category:
  - Weather
ha_release: 0.27
ha_iot_class: Cloud Polling
ha_domain: wunderground
ha_platforms:
  - sensor
---

The `wunderground` platform uses [Weather Underground](https://www.wunderground.com/) as a source for current weather information.

<div class='note warning'>

Weather Underground API no longer offers API keys. The API is generally not available for use, except if you own a personal weather station and provide your data to WU (PWS Uploader).

Please consider this when using the following information.

</div>

Configuration

To add Wunderground to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: wunderground
    api_key: YOUR_API_KEY
    monitored_conditions:
      - alerts
      - dewpoint_c
```

{% configuration %}
api_key:
  description: The API key for Weather Underground. See above for details.
  required: true
  type: string
pws_id:
  description: "You can enter a Personal Weather Station ID. The current list of Wunderground PWS stations is available [here](https://www.wunderground.com/weatherstation/ListStations.asp). If you do not enter a PWS ID, the current location information (latitude and longitude) from your `configuration.yaml` will be used to display weather conditions."
  required: false
  type: string
lang:
  description: Specify the language that the API returns. The current list of all Wunderground language codes is available [here](https://www.wunderground.com/weather/api/d/docs?d=language-support). If not specified, it defaults to English (EN).
  required: false
  type: string
  default: EN
latitude:
  description: Latitude coordinate to monitor weather of (required if **longitude** is specified).
  required: false
  type: string
  default: Coordinates defined in your `configuration.yaml`
longitude:
  description: Longitude coordinate to monitor weather of (required if **latitude** is specified).
  required: false
  type: string
  default: Coordinates defined in your `configuration.yaml`
monitored_conditions:
  description: Conditions to display in the frontend. The following conditions can be monitored.
  required: true
  type: list
  default: symbol
  keys:
    alerts:
      description: Current severe weather advisories
    dewpoint_c:
      description: Temperature in Celsius below which water droplets begin to condense and dew can form
    dewpoint_f:
      description: Temperature in Fahrenheit below which water droplets begin to condense and dew can form
    dewpoint_string:
      description: Text summary of dew point
    feelslike_c:
      description: Feels like (or apparent) temperature in Celsius
    feelslike_f:
      description: Feels like (or apparent) temperature in Fahrenheit
    feelslike_string:
      description: Text summary of how the current temperature feels like
    heat_index_c:
      description: Heat index (combined effects of the temperature and humidity of the air) in Celsius
    heat_index_f:
      description: Heat index (combined effects of the temperature and humidity of the air) in Fahrenheit
    heat_index_string:
      description: Text summary of current heat index
    elevation:
      description: Elevation in feet
    location:
      description: City and State
    observation_time:
      description: Text summary of observation time
    precip_today_in:
      description: Total precipitation in inches
    precip_today_metric:
      description: Total precipitation in metric units
    precip_today_string:
      description: Text summary of precipitation today
    precip_1d_mm:
      description: "[<sup>[1d]</sup>](#1d): Forecasted precipitation intensity in millimeters"
    precip_1d_in:
      description: "[<sup>[1d]</sup>](#1d): Forecasted precipitation intensity in inches"
    precip_1d:
      description: "[<sup>[1d]</sup>](#1d): Forecasted precipitation probability in %"
    pressure_in:
      description: Atmospheric air pressure in inches
    pressure_mb:
      description: Atmospheric air pressure in millibars
    pressure_trend:
      description: "Atmospheric air pressure trend signal `(+/-)`"
    relative_humidity:
      description: Relative humidity
    station_id:
      description: Your personal weather station (PWS) ID
    solarradiation:
      description: Current levels of solar radiation
    temperature_string:
      description: Temperature text combining Fahrenheit and Celsius
    temp_c:
      description: Current temperature in Celsius
    temp_f:
      description: Current temperature in Fahrenheit
    temp_high_record_c:
      description: Maximum temperature measured in Celsius
    temp_high_record_f:
      description: Maximum temperature measured in Fahrenheit
    temp_low_record_c:
      description: Minimal temperature measured in Celsius
    temp_low_record_f:
      description: Minimal temperature measured in Fahrenheit
    temp_high_avg_c:
      description: Average high for today in Celsius
    temp_high_avg_f:
      description: Average high for today in Fahrenheit
    temp_low_avg_c:
      description: Average low for today in Celsius
    temp_low_avg_f:
      description: Average low for today in Fahrenheit
    temp_high_1d_c:
      description: "[<sup>[1d]</sup>](#1d): Forecasted high temperature in Celsius"
    temp_high_1d_f:
      description: "[<sup>[1d]</sup>](#1d): Forecasted high temperature in Fahrenheit"
    temp_low_1d_c:
      description: "[<sup>[1d]</sup>](#1d): Forecasted low temperature in Celsius"
    temp_low_1d_f:
      description: "[<sup>[1d]</sup>](#1d): Forecasted low temperature in Fahrenheit"
    UV:
      description: Current levels of UV radiation. See [here](https://api.wunderground.com/resources/health/uvindex.asp) for explanation.
    visibility_km:
      description: Average visibility in km
    visibility_mi:
      description: Average visibility in miles
    weather:
      description: A human-readable text summary with picture from Wunderground.
    weather_1d:
      description: "[<sup>[12h]</sup>](#12h): A human-readable weather forecast using imperial units."
    weather_1d_metric:
      description: "[<sup>[12h]</sup>](#12h): A human-readable weather forecast using metric units."
    weather_1h:
      description: "[<sup>[1h]</sup>](#1h): Weather conditions in 1 hour. (e.g., \"Thunderstorm\" etc.)"
    wind_degrees:
      description: Wind degrees
    wind_dir:
      description: Wind direction
    wind_gust_kph:
      description: Wind gusts speed in kph
    wind_gust_mph:
      description: Wind gusts speed in mph
    wind_gust_1d_kph:
      description: "[<sup>[1d]</sup>](#1d): Max. forecasted Wind in kph"
    wind_gust_1d_mph:
      description: "[<sup>[1d]</sup>](#1d): Max. forecasted Wind in mph"
    wind_kph:
      description: Current wind speed in kph
    wind_mph:
      description: Current wind speed in mph
    wind_1d_kph:
      description: "[<sup>[1d]</sup>](#1d): Forecasted wind speed in kph"
    wind_1d_mph:
      description: "[<sup>[1d]</sup>](#1d): Forecasted wind speed in mph"
    wind_string:
      description: Text summary of current wind conditions
{% endconfiguration %}

All the conditions listed above will be updated every 5 minutes.

## Forecasts

### 12 hour forecasts

Monitored conditions marked above with <a name="12h">[12h]</a> are 12 hour forecasts. To get a forecast for different period/daytime replace the `_1d_` part of the sensor name.  e.g., `weather_2n` will give you forecast for tomorrow night. Valid values for day are `1` to `4` and valid values for daytime are `d` or `n`.

### Daily forecasts

Conditions above marked with <a name="1d">[1d]</a> are daily forecasts. To get forecast for different day, replace the number
in `_1d_` part of the sensor name. Valid values are from `1` to `4`.

### Hourly forecasts

Conditions marked with <a name="1h">[1h]</a> are hourly forecasts. To get forecast for different hour, replace the number
in the `_1h_` part of the sensor name with `1` to `36`. e.g., `weather_24h` will give you weather in 24 hours.

## Additional examples

### Daily forecast

```yaml
sensor:
  - platform: wunderground
    api_key: YOUR_API_KEY
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

### Weather overview

```yaml
sensor:
  - platform: wunderground
    api_key: YOUR_API_KEY
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

<div class='note warning'>
Note: While the platform is called “wunderground” the sensors will show up in Home Assistant as “PWS” (eg: sensor.pws_weather).
</div>

Note that the Weather Underground sensor is added to the entity_registry, so second and subsequent Personal Weather Station ID (pws_id) will have their monitored conditions suffixed with an index number e.g.

```yaml
- sensor.pws_weather_1d_metric_2
```

Additional details about the API are available [here](https://www.wunderground.com/weather/api/d/docs).
