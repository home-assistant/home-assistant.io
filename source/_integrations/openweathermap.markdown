---
title: OpenWeatherMap
description: Instructions on how to integrate OpenWeatherMap within Home Assistant.
ha_release: 0.32
ha_categories:
  - weather_alerts.forecasts
  - weather_alerts.air_quality_pollen
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
  - '@freekode'
  - '@nzapponi'
  - '@wittypluck'
ha_domain: openweathermap
ha_platforms:
  - sensor
  - weather
ha_integration_type: service
related:
  - docs: /common-tasks/general/#defining-a-custom-polling-interval
    title: Defining a custom polling interval
---

The **OpenWeatherMap** {% term integration %} uses [OpenWeatherMap](https://openweathermap.org/) as a source for meteorological and air quality data for your location.

There is currently support for the following device types within Home Assistant:

- Sensor
- Weather

You need to register for an API key: [Sign up here](https://home.openweathermap.org/users/sign_up).

## Supported modes

This integration supports the following OpenWeatherMap services and modes.

### [One Call API 4.0](https://openweathermap.org/api/one-call-4)

- `v4.0`: current weather, hourly forecast for up to 48 hours, daily forecast for up to 8 days, and a [minute-by-minute precipitation forecast](/actions/openweathermap.get_minute_forecast/) for up to 60 minutes

### [One Call API 3.0](https://openweathermap.org/api/one-call-3)

- `v3.0`: current weather, hourly forecast for 48 hours, daily forecast for 8 days, and a [minute-by-minute precipitation forecast](/actions/openweathermap.get_minute_forecast/) for 60 minutes

Both One Call API versions use the same One Call subscription, which is separate from the free services below. You do not need an additional subscription to switch from `v3.0` to `v4.0`. The [One Call pricing plan](https://openweathermap.org/price) includes 1,000 free API calls per day shared across both versions, with charges for additional calls. You can set a daily call limit on the [Billing plans](https://home.openweathermap.org/subscriptions) page, under **Calls per day**. See [Data updates](#data-updates) for how this integration uses API calls.

### [Free](https://openweathermap.org/price#freeaccess)

- `current` : current weather 
- `forecast` : weather forecast, in 3-hour steps for 5 days
- `air_pollution` : current air pollution

The Free services require a registration but no subscription. Once signed up, the API key can be found from your profiles' [My API keys](https://home.openweathermap.org/api_keys) page. 

{% important %}
If you register a new API key with OpenWeatherMap, it will be activated automatically. This typically takes between 10 minutes and 2 hours.  
Keep in mind when configuring this integration that your new API key might not be active yet.  
Invalid API-key errors can also occur if your API key or subscription does not support the selected mode (`v3.0`, `v4.0`, or a free mode).
{% endimportant %}

{% include integrations/config_flow.md %}

New setups use `v4.0` by default. Existing configurations keep their selected mode, including `v3.0`. To switch an existing configuration, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **OpenWeatherMap**, and change **Mode** in the integration options. Before switching, review [Data updates](#data-updates), as `v4.0` uses more API calls per update.

| Parameter | Value                                                     |
| :-------- | :-------------------------------------------------------- |
| API Key   | API Key from the website                                  |
| Name      | Name of the integration                                   |
| Latitude  | Latitude for weather forecast and sensor                  |
| Longitude | Longitude for weather forecast and sensor                 |
| Mode      | <li>`v4.0` (default for new setups) current weather plus daily forecast for up to 8 days, hourly forecast for up to 48 hours, and minute forecast for up to 60 minutes</li><li>`v3.0` current weather plus daily forecast for 8 days, hourly forecast for 48 hours, and minute forecast for 60 minutes</li><li>`current` current weather data only, no forecast</li><li>`forecast` weather forecast only, in 3-hour steps for 5 days, no current weather data</li><li>`air_pollution` current air quality data</li> |
| Language  | Language for receiving data (only for `sensor`)           |

A `sensor` entity will be created for each supported condition. Their IDs will follow the format:

`sensor.<integration name>_<monitored condition>`

Sensors provide data in the language that was selected when configuring the integration.

{% note %}
The Weather entity provides data only in English. Home Assistant automatically translates it to the language configured for the frontend.
{% endnote %}

If you want to change the weather location, you will need to delete and re-add the integration.

## Data updates

Home Assistant updates OpenWeatherMap data every 10 minutes by default.

In `v4.0` mode, each update makes separate requests for current weather and minute, hourly, and daily forecasts. The hourly API returns up to 20 records per page, so a complete 48-hour forecast normally needs three hourly requests. Together with the other forecasts and current weather, this totals six API calls per update, or approximately 864 calls per day for each location at the default interval. Each request, including each additional forecast page, counts toward your subscription usage.

Setup, restarts, retries, multiple locations, and other uses of the same subscription can increase your total usage beyond this estimate and the free daily allowance. Check your usage and daily call limit on the [Billing plans](https://home.openweathermap.org/subscriptions) page.

## Supported Weather Conditions

### Current Weather Conditions

| Condition                | Description                                                                                                                       |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `cloud_coverage`         | Cloudiness, %.                                                                                                                    |
| `condition`              | [Weather condition](https://contributors.home-assistant.io/core/entities/weather/#conditions).   |
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
| `wind_speed`             | Wind speed, meter/sec.                                                                                                            |

Details about the API are available in the [OpenWeatherMap documentation](https://openweathermap.org/api).

{% include integrations/actions.md %}

## Supported Air Quality Sensors

### Current Air Quality Sensors

| Sensor              | Description                                                                             |
| :------------------ | :-------------------------------------------------------------------------------------- |
| `air_quality_index` | Air Quality Index, where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, and 5 = Very Poor. |
| `carbon_monoxide`   | Concentration of CO (Carbon monoxide), µg/m³.                                           |
| `nitrogen_monoxide` | Concentration of NO (Nitrogen monoxide), µg/m³.                                         |
| `nitrogen_dioxide`  | Concentration of NO2 (Nitrogen dioxide), µg/m³.                                         |
| `ozone`             | Concentration of O3 (Ozone), µg/m³.                                                     |
| `sulphur_dioxide`   | Concentration of SO2 (Sulphur dioxide), µg/m³.                                          |
| `pm2_5`             | Concentration of PM2.5 (Fine particulate matter), µg/m³.                                |
| `pm10`              | Concentration of PM10 (Coarse particulate matter), µg/m³.                               |

More details can be found at the OpenWeatherMap [Air Pollution API documentation](https://openweathermap.org/api/air-pollution).
