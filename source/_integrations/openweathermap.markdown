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

There are currently two types of OpenWeatherMap services supported by this integration, with several corresponding modes.

### [One Call API 3.0](https://openweathermap.org/price#onecall)

- `v3.0` : current weather, hourly forecast for 48 hours, daily forecast for 8 days

The One Call API 3.0 services requires a [subscription](https://openweathermap.org/api/one-call-3). The subscription has a free tier with 1000 calls/day. Consider setting the limit on the OpenWeatherMap website to stay under the threshold where API usage incurs a cost. This is done in the [Billing plans](https://home.openweathermap.org/subscriptions) page, under "Calls per day".

### [Free](https://openweathermap.org/price#freeaccess)

- `current` : current weather 
- `forecast` : weather forecast, in 3-hour steps for 5 days
- `air_pollution` : current air pollution

The Free services require a registration but no subscription. Once signed up, the API key can be found from your profiles' [My API keys](https://home.openweathermap.org/api_keys) page. 

## ⚠️ Important Deprecation Notice

### OpenWeatherMap API V2.5 Deprecation

OpenWeatherMap API V2.5 has been deprecated and is no longer supported by this integration. You need to use API V3.0.

To continue using the service if you were previously using API V2.5:

- Visit the OpenWeatherMap website and activate the One Call subscription.
- During activation, you will be prompted for a credit card, but you will not be charged unless you exceed the free tier limits.
- Configure your OWM integration to select mode `v3.0`.
- Note: Subscription activation may take up to 2 hours.

For more details, set limits on your usage to avoid charges at [OpenWeatherMap Subscriptions](https://home.openweathermap.org/subscriptions).

{% important %}
If you register a new API key with OpenWeatherMap, it will be activated automatically. This typically takes between 10 minutes and 2 hours.  
Keep in mind when configuring this integration that your new API key might not be active yet.  
Invalid API-key errors can also occur if you use a key which doesn't match the corresponding service (One Call API 3.0 versus Free).
{% endimportant %}

{% include integrations/config_flow.md %}

| Parameter | Value                                                     |
| :-------- | :-------------------------------------------------------- |
| API Key   | API Key from the website                                  |
| Name      | Name of the integration                                   |
| Latitude  | Latitude for weather forecast and sensor                  |
| Longitude | Longitude for weather forecast and sensor                 |
| Mode      | <li>`v3.0` (new API version) current weather plus daily forecast for 8 days, and 1-hour steps for 48 hours</li><li>`current` current weather data only, no forecast</li><li>`forecast` weather forecast only, in 3-hour steps for 5 days, no current weather data</li><li>`air_pollution` current air quality data</li> |
| Language  | Language for receiving data (only for `sensor`)           |

A `sensor` entity will be created for each supported condition. Their IDs will follow the format:

`sensor.<integration name>_<monitored condition>`

Sensors provide data in the language that was selected when configuring the integration.

{% note %}
The Weather entity provides data only in English. Home Assistant automatically translates it to the language configured for the frontend.
{% endnote %}

If you want to change the weather location, you will need to delete and re-add the integration.

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
