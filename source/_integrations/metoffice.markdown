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

The `metoffice` weather platform uses the Met Office's [DataPoint API](https://www.metoffice.gov.uk/datapoint) for weather data. 
## Getting started
Their website is not as straightforward so check the [getting started](https://www.metoffice.gov.uk/services/data/datapoint/getting-started).
1. Register for a [Met Office account](https://register.metoffice.gov.uk/WaveRegistrationClient/public/register.do?service=datapoint). 
2. After registration and verification of your account, [login](https://register.metoffice.gov.uk/MyAccountClient/account/view) to retrieve your API key.

{% include integrations/config_flow.md %}

## Entities

This integration creates a number of weather entities for each entry created in the configuration by location: one weather entity with a summary and a forecast, and twelve sensor entities for individual reporting on each of the individual measurements, for both 3-hourly and daily updates (to a grand total of 26 entities available). Note that only one of the two summary entities and the 3-hourly sensor entities flagged below are enabled by default, so your system isn't overrun on initial configuration. The time supplied for each forecast is the start time for the forecast.

The available sensor entities:

- "feels like" temperature
- humidity
- probability of precipitation
- station name
- temperature
- UV index
- visibility
- visibility distance
- weather
- wind direction
- wind gust
- wind speed

Only probability of precipitation, temperature, weather and wind speed are enabled by default.

Details about the API are available in the [DataPoint API documentation](https://www.metoffice.gov.uk/services/data/datapoint/api-reference). The [DataPoint](https://github.com/EJEP/datapoint-python) library is used to retrieve data.
