---
title: Met Office
description: Instructions on how to integrate Met Office weather conditions into Home Assistant.
ha_category:
  - Weather
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@MrHarcombe'
  - '@avee87'
ha_domain: metoffice
ha_config_flow: true
ha_platforms:
  - sensor
  - weather
ha_integration_type: integration
---

The **Met Office** weather {% term integration %} uses the Met Office's [DataHub API](https://www.metoffice.gov.uk/services/data/met-office-weather-datahub) for weather data.

Details about the API are available in the [DataHub API documentation](https://datahub.metoffice.gov.uk/docs/f/category/site-specific/overview). The [datapoint-python](https://github.com/EJEP/datapoint-python) library is used to retrieve data.

## Prerequisites

1. Register for a [Met Office DataHub](https://datahub.metoffice.gov.uk/) account.
2. After registration, [subscribe](https://datahub.metoffice.gov.uk/profile/subscriptions) to [Site Specific Global Spot](https://datahub.metoffice.gov.uk/pricing/site-specific) dataset to obtain your API key. Free tier subscription gives 360 calls per day, which is enough to use this integration for one weather site.

{% include integrations/config_flow.md %}

| Parameter | Value                                                      |
| :-------- | :--------------------------------------------------------- |
| API Key   | API Key for MetOffice DataHub                              |
| Latitude  | Latitude of the location, defaults to your home latitude   |
| Longitude | Longitude of the location, defaults to your home longitude |

## Entities

This integration creates the following entities:

| Entity type | Entity ID                                          | Description                                                                                                                     |
| :---------- | :------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| weather     | `weather.<integration name>`                       | Main weather entity for the given location. Daily, hourly and twice-daily forecasts are available                               |
| sensor      | `sensor.<integration name>.weather`                | [Weather condition](https://developers.home-assistant.io/docs/core/entity/weather/#recommended-values-for-state-and-condition). |
| sensor      | `sensor.<integration name>.temperature`            | Temperature, ºC.                                                                                                                |
| sensor      | `sensor.<integration name>.feels_like_temperature` | Temperature accounting for the human perception of weather, ºC.                                                                 |
| sensor      | `sensor.<integration name>.humidity`               | Relative humidity, %.                                                                                                           |
| sensor      | `sensor.<integration name>.wind_speed`             | Wind speed, m/s.                                                                                                                |
| sensor      | `sensor.<integration name>.wind_gust`              | Wind gust speed, m/s.                                                                                                           |
| sensor      | `sensor.<integration name>.wind_direction`         | Wind direction, degrees.                                                                                                        |
| sensor      | `sensor.<integration name>.visibility`             | Visibility distance in meters.                                                                                                  |
| sensor      | `sensor.<integration name>.uv         `            | UV index.                                                                                                                       |
| sensor      | `sensor.<integration name>.precipitation`          | Probability of precipitation, %.                                                                                                |
| sensor      | `sensor.<integration name>.name       `            | Name of the weather station.                                                                                                    |

Only the main weather entity, probability of precipitation, temperature, weather and wind speed sensors are enabled by default.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
