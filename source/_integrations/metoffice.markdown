---
title: Met Office
description: Instructions on how to integrate Met Office weather conditions into Home Assistant.
ha_category:
  - Weather
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@MrHarcombe'
ha_domain: metoffice
---

The `metoffice` weather platform uses the Met Office's [DataPoint API](https://www.metoffice.gov.uk/datapoint) for weather data.

## Configuration

To add the Met Office weather platform to your installation, you'll need to register for a free API key at the link above and then go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Met Office**. Multiple entries can be configured, but a unique set of latitude and longitude must be supplied for each.

A number of weather entities are created for each entry in the configuration: one weather entity with a summary of the 3-hourly forecasts and twelve sensor entities for individual reporting on each of the individual measurements. The time supplied for each forecast is the start time for the forecast.

Details about the API are available in the [DataPoint API documentation](https://www.metoffice.gov.uk/services/data/datapoint/api-reference). The [DataPoint](https://github.com/EJEP/datapoint-python) library is used to retrieve data.
