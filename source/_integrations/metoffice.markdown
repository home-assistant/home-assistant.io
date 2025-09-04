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

## Prerequisites

1. Register for a [Met Office DataHub](https://datahub.metoffice.gov.uk/) account.
2. After registration, [subscribe](https://datahub.metoffice.gov.uk/profile/subscriptions) to [Site Specific Global Spot](https://datahub.metoffice.gov.uk/pricing/site-specific) dataset to obtain your API key. Free tier subscription gives 360 calls per day, which is enough for using this integration

{% include integrations/config_flow.md %}

## Entities

This integration creates a number of weather entities for each entry created in the configuration by location: one weather entity with a summary and a forecast (daily, hourly, and twice-daily), and sensor entities for individual reporting on each of the individual measurements. Note that only some of the sensor entities flagged below are enabled by default, so your system isn't overrun on initial configuration.

The available sensor entities:

- "feels like" temperature
- humidity
- probability of precipitation
- station name
- temperature
- UV index
- visibility
- weather
- wind direction
- wind gust
- wind speed

Only probability of precipitation, temperature, weather and wind speed are enabled by default.

Details about the API are available in the [DataHub API documentation](https://datahub.metoffice.gov.uk/docs/f/category/site-specific/overview). The [datapoint-python](https://github.com/EJEP/datapoint-python) library is used to retrieve data.
