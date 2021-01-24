---
title: Met Office
description: Instructions on how to integrate Met Office weather conditions into Home Assistant.
ha_category:
  - Weather
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_codeowners:
  - "@MrHarcombe"
ha_domain: metoffice
ha_config_flow: true
---

The `metoffice` weather platform uses the Met Office's [DataPoint API](https://www.metoffice.gov.uk/datapoint) for weather data.

## Configuration

To add the Met Office weather platform to your installation, you'll need to register for a free API key at the link above and then go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Met Office**. Multiple entries can be configured, but a unique set of latitude and longitude must be supplied for each.

This integration creates a number of weather entities for each entry created in the configuration by location: one weather entity with a summary and a forecast, and twelve sensor entities for individual reporting on each of the individual measurements, for both 3-hourly and daily updates (to a grand total of 26 entities available). Note that only one of the two summary entities and the 3-hourly sensor entities flagged below are enabled by default, so your system isn't overrun on initial configuration. The time supplied for each forecast is the start time for the forecast.

The weather entities are named by concatenating `weather.m̀et_office_` with the site name and the frequency. The available sensor entities; "feels like" temperature, humidity, probability of precipitation, station name, temperature, uv index, visibility, visibility distance, weather, wind direction, wind gust and wind speed are named by concatenating `sensor.` with the site name, the entity and the frequency. Only probability of precipitation, temperature, weather and wind speed are enabled by default.

Details about the API are available in the [DataPoint API documentation](https://www.metoffice.gov.uk/services/data/datapoint/api-reference). The [DataPoint](https://github.com/EJEP/datapoint-python) library is used to retrieve data.
