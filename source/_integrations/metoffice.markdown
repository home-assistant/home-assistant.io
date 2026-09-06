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
ha_integration_type: service
---

The Met Office is the United Kingdom's national meteorological service.

The **Met Office** weather {% term integration %} uses the Met Office's [DataHub API](https://www.metoffice.gov.uk/services/data/met-office-weather-datahub) to retrieve forecast data for the location you select. It provides a weather entity with hourly, twice-daily, and daily forecasts.

## Prerequisites

1. Register for a [Met Office DataHub](https://datahub.metoffice.gov.uk/) account.
2. After registration, [subscribe](https://datahub.metoffice.gov.uk/profile/subscriptions) to [Site Specific Global Spot](https://datahub.metoffice.gov.uk/pricing/site-specific) dataset to obtain your API key. Free tier subscription gives 360 calls per day, which is enough for using this integration

{% include integrations/config_flow.md %}

{% configuration_basic %}
API Key:
  description: The API key provided by the Met Office when subscribing to the Site Specific Global Spot dataset.
Latitude:
  description: The latitude of the weather forecast location.
Longitude:
  description: The longitude of the weather forecast location.
{% endconfiguration_basic %}

Details about the <abbr title="Application Programming Interface">API</abbr> are available in the [DataHub API documentation](https://datahub.metoffice.gov.uk/docs/f/category/site-specific/overview). The [datapoint-python](https://github.com/EJEP/datapoint-python) library is used to retrieve data.

### Multiple forecast locations

If adding multiple forecasts, it is important to note that there are restrictions of the number of API queries allowed on the free tier. Currently that restricts this integration to a single location. Multiple locations require a paid plan.

The Latitude and Longitude of the forecast location are used to generate the unique ID for a given forecast. Therefore if adding multiple forecasts, each must have a unique location.

## Supported functionality

The **Met Office** integration provides the following entities.

This integration creates several weather entities for each entry created in the configuration by location: one weather entity with a summary and a forecast (daily, hourly, and twice-daily), and sensor entities for individual reporting on each of the individual measurements

### Weather

The weather platform provides current conditions and forecasts that can be used with the weather dashboard card.

The integration supports three types of forecasts:

- **Hourly forecast**
  - **Description**: Detailed conditions including temperature, precipitation, wind, and cloud coverage.
  - **Remarks**: Provides information for next 3 days
- **Twice daily forecast**
  - **Description**: Shows expected conditions for day and night.
  - **Remarks**: Provides information for next 7 days
- **Daily forecast**
  - **Description**: Shows daily high/low temperatures and midday conditions.
  - **Remarks**: Provides information for next 7 days

### Sensors

The following current weather data is provided:

- **Weather**
  - **Description**: One word summary of current weather conditions
- **Temperature**
  - **Description**: Current air temperature
  - **Unit**: °C
- **Wind speed**
  - **Description**: Current wind speed
  - **Unit**: m/s
- **Probability of precipitation**
  - **Description**: Chance of rain for the next hour
  - **Unit**: %
- **UV index**
  - **Description**: UV index on standard international scale
  
The following sensors are also provided however are disabled by default:

- **Feels like temperature**
  - **Description**: Subjective temperature accounting for wind and humidity
  - **Unit**: °C
- **Humidity**
  - **Description**: Relative humidity
  - **Unit**: %
- **Pressure**
  - **Description**: Atmospheric pressure
  - **Unit**: Pa
- **Wind direction**
  - **Description**: Wind direction in degrees
  - **Unit**: ° (degrees)
- **Wind gust**
  - **Description**: Maximum wind gust speed
  - **Unit**: m/s
- **Visibility distance**
  - **Description**: Distance of visibility
  - **Unit**: m

#### Diagnostic sensors

The following diagnostic sensors are disabled by default.

- **Station Name**
  - **Description**: Closest weather station for the configured location

## Data updates

Weather data is automatically updated every 15 minutes from the Met Office DataHub.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, you can unsubscribe from the Site Specific Global Spot dataset in your Met Office DataHub account.
