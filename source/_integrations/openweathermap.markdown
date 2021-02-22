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

The `openweathermap` weather platform uses [OpenWeatherMap](https://openweathermap.org/) as a source for current meteorological data for your location.

There is currently support for the following device types within Home Assistant:

- Sensor
- Weather

You need an API key, which is free, but requires a [registration](https://home.openweathermap.org/users/sign_up).

{% include integrations/config_flow.md %}

| Parameter            | Value                                                                                                                                                                                                                                      |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Key              | API Key from the website                                                                                                                                                                                                                   |
| Name                 | Name of the integration                                                                                                                                                                                                                    |
| Latitude             | Latitude for weather forecast and sensor                                                                                                                                                                                                   |
| Longitude            | Longitude for weather forecast and sensor                                                                                                                                                                                                  |
| Mode                 | Forecast mode, `hourly` for a three-hour forecast, `daily` for daily forecast using a paid API tier, `onecall_hourly` for an hourly forecast up to 2 days, or `onecall_daily` for a daily forecast up to 7 days (ideal for the free tier). |
| Language             | Language for receiving data (only for `sensor`)                                                                                                                                                                                            |

The integration creates weather entity and also sensors for all available conditions.
Selecting a `onecall` mode with the free tier leverages the One Call API, resulting in updates every 5 minutes and is recommended for both hourly and daily forecast.

For each condition `sensor` entity will be created with id: 

`sensor.<integration name>_<monitored condition>`

Sensor prints information in language which was selected for integration.

All conditions:

| Condition      | Description                          |
| :------------- | :----------------------------------- | 
| `weather`      | A human-readable text summary.       |
| `temperature`  | Current temperature.                 |
| `wind_speed`   | Wind speed.                          |
| `wind_bearing` | Wind bearing.                        |
| `humidity`     | Relative humidity.                   |
| `pressure`     | Sea-level air pressure in millibars. |
| `clouds`       | Description of cloud coverage.       |
| `rain`         | Rain volume.                         |
| `snow`         | Snow volume.                         |
| `condition`    | Current weather condition code.      |
| `weather_code` | Current weather code.                |

<div class='note'>

Weather entity always will have English language. Home Assistant translate it to user language automatically.

</div>

Details about the API are available in the [OpenWeatherMap documentation](https://openweathermap.org/api).
