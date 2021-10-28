---
title: Weather Underground (WUnderground)
description: Instructions on how to integrate Weather Underground (WUnderground) Weather within Home Assistant.
ha_category:
  - Weather
ha_release: 2021.11
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

To add WUnderground to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: wunderground
    api_key: YOUR_API_KEY
    pws_id: YOUR_STATION_ID
    numeric_precision: none
    monitored_conditions:
      - temp
      - weather_1d
```

{% configuration %}
api_key:
  description: The API key for Weather Underground. See above for details.
  required: true
  type: string
pws_id:
  description: "A Personal Weather Station ID. A map of WUnderground PWS stations is available [here](https://www.wunderground.com/wundermap)."
  required: true
  type: string
numeric_precision:
  description: Show PWS data as integer or decimal - Value of 'none' or 'decimal'
  required: true
  type: string
lang:
  description: Specify the language that the API returns. The current list of all WUnderground language codes is available [here](https://ibm.co/APICom). If not specified, it defaults to English (en-US).
  required: false
  type: string
  default: en-US
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
  keys:
    stationID:
      description: Your personal weather station (PWS) ID
    solarRadiation:
      description: Current levels of solar radiation
    neighborhood:
      description: WU PWS reference name
    obsTimeLocal:
      description: Text summary of local observation time
    uv:
      description: Current levels of UV radiation.
    winddir:
      description: Wind direction in degrees
    humidity:
      description: Relative humidity
    dewpt:
      description: Temperature below which water droplets begin to condense and dew can form
    heatIndex:
      description: Heat index (combined effects of the temperature and humidity of the air)
    windChill:
      description: Wind Chill (combined effects of the temperature and wind)
    elev:
      description: Elevation
    precipTotal:
      description: Today Total precipitation
    precipRate:
      description: Rain intensity
    pressure:
      description: Atmospheric air pressure
    temp:
      description: Current temperature
    windGust:
      description: Wind gusts speed
    windSpeed:
      description: Current wind speed
    precip_1d:
      description: "[<sup>[1d]</sup>](#1d): Forecasted precipitation intensity"
    precip_chance_1d:
      description: "[<sup>[1d]</sup>](#1d): Forecasted precipitation probability in %"
    temp_high_1d:
      description: "[<sup>[1d]</sup>](#1d): Forecasted high temperature"
    temp_low_1d:
      description: "[<sup>[1d]</sup>](#1d): Forecasted low temperature"
    wind_1d:
      description: "[<sup>[1d]</sup>](#1d): Forecasted wind speed"
    weather_1d:
      description: "[<sup>[12h]</sup>](#12h): A human-readable weather forecast of Day"
    weather_1n:
      description: "[<sup>[12h]</sup>](#12h): A human-readable weather forecast of Night"
{% endconfiguration %}

All the conditions listed above will be updated every 5 minutes.

## Forecasts

### 12 hour forecasts

Monitored conditions marked above with <a name="12h">[12h]</a> are 12 hour forecasts. To get a forecast for different period/daytime replace the `_1d_` part of the sensor name.  e.g., `weather_2n` will give you forecast for tomorrow night. Valid values for day are `1` to `4` and valid values for daytime are `d` or `n`.

### Daily forecasts

Conditions above marked with <a name="1d">[1d]</a> are daily forecasts. To get forecast for different day, replace the number
in `_1d_` part of the sensor name. Valid values are from `1` to `4`.

## Additional examples

### Daily forecast

```yaml
sensor:
  - platform: wunderground
    api_key: YOUR_API_KEY
    pws_id: YOUR_STATION_ID
    numeric_precision: decimal
    monitored_conditions:
      - weather_1d
      - weather_1n
      - weather_2d
      - weather_2n
      - weather_3d
      - weather_3n
      - weather_4d
      - weather_4n

group:
  daily_forecast:
    name: Daily Forecast
    entities:
      - sensor.wu_weather_1d
      - sensor.wu_weather_1n
      - sensor.wu_weather_2d
      - sensor.wu_weather_2n
      - sensor.wu_weather_3d
      - sensor.wu_weather_3n
      - sensor.wu_weather_4d
      - sensor.wu_weather_4n
```

![Daily Forecast](/images/screenshots/wunderground_daily_forecast.png)

<div class='note warning'>
Note: While the platform is called “wunderground” the sensors will show up in Home Assistant as “WU” (eg: sensor.wu_weather).
</div>

Additional details about the API are available [here](https://docs.google.com/document/d/1eKCnKXI9xnoMGRRzOL1xPCBihNV2rOet08qpE_gArAY/edit).
