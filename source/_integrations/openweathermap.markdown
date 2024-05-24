---
title: OpenWeatherMap
description: Instructions on how to integrate OpenWeatherMap within Home Assistant.
ha_release: 0.32
ha_category:
  - Sensor
  - Weather
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
ha_integration_type: integration
---

The OpenWeatherMap weather integrations uses [OpenWeatherMap](https://openweathermap.org/) as a source for current meteorological data for your location.

There is currently support for the following device types within Home Assistant:

- Sensor
- Weather

You need an API key, it requires a [subscription](https://openweathermap.org/api/one-call-3). The subscription has a free tier with 1000 calls/day. Consider setting the limit on the OpenWeatherMap website to stay under the threshold where API usage incurs a cost.

## ⚠️ Important Deprecation Notice

### OpenWeatherMap API V2.5 Deprecation

OpenWeatherMap API V2.5 will be closed in June 2024. After this date, you will need to use API V3.0.

To continue using the service:

- Visit the OpenWeatherMap website and activate the One Call subscription.
- During activation, you will be prompted for a credit card, but you will not be charged unless you exceed the free tier limits.
- Configure your OWM integration to select mode `v3.0`.
- Note: Subscription activation may take up to 2 hours.

For more details, set limits on your usage to avoid charges at [OpenWeatherMap Subscriptions](https://home.openweathermap.org/subscriptions).

<div class='note'>

If you register an new API key with OpenWeatherMap, it will be activated automatically, this typically takes between 10 minutes and 2 hours
after your successful registration. Keep in mind when configuring this integration, that you new API key might
not be activated yet. Recent policy changes limit the API access for new registered users with a free plan, they should select the `hourly` mode. The other modes require a paid subscription plan. Invalid API-key errors might occur if your API key is used with the other modes.

</div>

{% include integrations/config_flow.md %}

| Parameter | Value                                                     |
| :-------- | :-------------------------------------------------------- |
| API Key   | API Key from the website                                  |
| Name      | Name of the integration                                   |
| Latitude  | Latitude for weather forecast and sensor                  |
| Longitude | Longitude for weather forecast and sensor                 |
| Mode      | API version, `v2.5` (deprecated), `v3.0` new API version. |
| Language  | Language for receiving data (only for `sensor`)           |

A `sensor` entity will be created for each supported condition. Their ids will follow the format:

`sensor.<integration name>_<monitored condition>`

Sensors provide data in the language that was selected when configuring the integration.

<div class='note'>

The Weather entity provides data only in English. Home Assistant automatically translates it to the language configured for the frontend.

</div>

## Supported Weather Conditions

### Current Weather Conditions

| Condition                | Description                                                                                                                       |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `cloud_coverage`         | Cloudiness, %.                                                                                                                    |
| `condition`              | [Weather condition](https://developers.home-assistant.io/docs/core/entity/weather/#recommended-values-for-state-and-condition).   |
| `dew_point`              | Atmospheric temperature below which water droplets begin to condense and dew can form, ºC.                                        |
| `feels_like_temperature` | Temperature accounting for the human perception of weather, ºC.                                                                   |
| `humidity`               | Humidity, %.                                                                                                                      |
| `precipitation_kind`     | The kind of precipitation (Rain, Snow, Snow and Rain, None) for the last hour.                                                    |
| `pressure`               | Atmospheric pressure at sea level, hPa.                                                                                           |
| `rain`                   | Rain precipitation, mm/h.                                                                                                         |
| `snow`                   | Snow precipitation, mm/h.                                                                                                         |
| `temperature`            | Temperature, ºC.                                                                                                                  |
| `uv_index`               | UV Index.                                                                                                                         |
| `visibility`             | Average visibility, m.                                                                                                            |
| `weather`                | A human-readable description of the [weather condition](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2). |
| `weather_code`           | ID of the [weather condition](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2).                           |
| `wind_bearing`           | Wind direction, degrees (meteorological).                                                                                         |
| `wind_speed`             | Wind speed, metre/sec.                                                                                                            |

### Forecast Weather Conditions

| Condition                            | Description                                                                                                                                                    |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `forecast_cloud_coverage`            | Cloudiness, %.                                                                                                                                                 |
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
