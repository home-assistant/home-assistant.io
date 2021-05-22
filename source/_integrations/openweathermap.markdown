---
title: OpenWeatherMap
description: Instructions on how to integrate OpenWeatherMap within Home Assistant.
ha_release: 0.32
ha_category:
  - Weather
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
  - '@freekode'
  - '@nzapponi'
ha_domain: openweathermap
ha_platforms:
  - sensor
  - weather
---

The OpenWeatherMap weather integrations uses [OpenWeatherMap](https://openweathermap.org/) as a source for current meteorological data for your location.

There is currently support for the following device types within Home Assistant:

- Sensor
- Weather

You need an API key, which is free, but requires a [registration](https://home.openweathermap.org/users/sign_up).

<div class='note'>
If you register an new API key with OpenWeatherMap, it will be activated automatically, this typically takes between 10 minutes and 2 hours
after your successful registration. Keep in mind when configuring this integration, that you new API key might
not be activated yet.
</div>

{% include integrations/config_flow.md %}

| Parameter            | Value                                                                                                                                                                                                                                      |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Key              | API Key from the website                                                                                                                                                                                                                   |
| Name                 | Name of the integration                                                                                                                                                                                                                    |
| Latitude             | Latitude for weather forecast and sensor                                                                                                                                                                                                   |
| Longitude            | Longitude for weather forecast and sensor                                                                                                                                                                                                  |
| Mode                 | Forecast mode, `hourly` for a three-hour forecast, `daily` for daily forecast using a paid API tier, `onecall_hourly` for an hourly forecast up to 2 days, or `onecall_daily` for a daily forecast up to 7 days (ideal for the free tier). |
| Language             | Language for receiving data (only for `sensor`)                                                                                                                                                                                            |

The integration creates a weather entity as well as sensors for supported weather conditions.
Selecting a `onecall` forecast mode with the free tier leverages the One Call API, resulting in updates every 5 minutes and is recommended for both hourly and daily forecast.

A `sensor` entity will be created for each supported condition. Their ids will follow the format: 

`sensor.<integration name>_<monitored condition>`

Sensors provide data in the language that was selected when configuring the integration.

<div class='note'>

The Weather entity provides data only in English. Home Assistant automatically translates it to the language configured for the frontend.

</div>

## Supported Weather Conditions

### Current Weather Conditions

| Condition                | Description                                                                                                                       |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------   |
| `cloud_coverage`         | Cloudiness, %.                                                                                                                    |
| `condition`              | [Weather condition](https://developers.home-assistant.io/docs/core/entity/weather/#recommended-values-for-state-and-condition).   |
| `dew_point`              | Atmospheric temperature below which water droplets begin to condense and dew can form, ºC.                                        |
| `feels_like_temperature` | Temperature accounting for the human perception of weather, ºC.                                                                   |
| `humidity`               | Humidity, %.                                                                                                                      |
| `precipitation_kind`     | The kind of precipitation (Rain, Snow, Snow and Rain, None) for the last hour.                                                    |
| `pressure`               | Atmospheric pressure at sea level, hPa.                                                                                           |
| `rain`                   | Rain volume for the last hour, mm.                                                                                                |
| `snow`                   | Snow volume for the last hour, mm.                                                                                                |
| `temperature`            | Temperature, ºC.                                                                                                                  |
| `uv_index`               | UV Index.                                                                                                                         |
| `weather`                | A human-readable description of the [weather condition](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2). |
| `weather_code`           | ID of the [weather condition](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2).                           |
| `wind_bearing`           | Wind direction, degrees (meteorological).                                                                                         |
| `wind_speed`             | Wind speed, metre/sec.                                                                                                            |

### Forecast Weather Conditions

<div class='note'>

The time period these sensors use depends on the forecast mode selected when configuring the integration: `hourly` or `onecall_hourly` will show conditions for the current hour of the day, while `daily` or `onecall_daily` will show conditions for the current day.

</div>

| Condition                            | Description                                                                                                                                                    |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
| `forecast_cloud_coverage`         | Cloudiness, %.                                                                                                                    |
| `forecast_condition`                 | [Weather condition](https://developers.home-assistant.io/docs/core/entity/weather/#recommended-values-for-state-and-condition) for the forecast's time period. |
| `forecast_precipitation`             | Combined Rain and Snow volume for the forecast's time period, mm.                                                                                              |
| `forecast_precipitation_probability` | Probability of precipitation for the forecast's time period.                                                                                                   |
| `forecast_pressure`                  | Atmospheric pressure at sea level for the forecast's time period, hPa.                                                                                         |
| `forecast_temperature`               | Maximum temperature for the day.                                                                                                                               |
| `forecast_temperature_low`           | Minimum temperature for the day.                                                                                                                               |
| `forecast_time`                      | Time of the forecasted data.                                                                                                                                   |
| `forecast_wind_bearing`              | Wind direction for the forecast's time period, degrees (meteorological).                                                                                       |
| `forecast_wind_speed`                | Wind speed for the forecast's time period, metre/sec.                                                                                                          |

Details about the API are available in the [OpenWeatherMap documentation](https://openweathermap.org/api).
