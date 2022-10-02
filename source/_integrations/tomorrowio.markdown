---
title: Tomorrow.io
description: Instructions on how to integrate the Tomorrow.io Weather and Air Quality API into Home Assistant.
ha_category:
  - Environment
  - Health
  - Sensor
  - Weather
ha_release: 2022.4
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@raman325'
  - '@lymanepp'
ha_domain: tomorrowio
ha_platforms:
  - sensor
  - weather
ha_integration_type: integration
---

The Tomorrow.io integration allows you to obtain weather, air quality, pollen, and fire information from the [Tomorrow.io API](https://www.tomorrow.io/weather-api/).

## Obtain an API key

You can obtain a free API key by signing up with [Tomorrow.io](https://www.tomorrow.io/weather-api/).

The integration will automatically set the refresh interval based on the number of Tomorrow.io integrations that are using the same API key for a given Home Assistant instance. The integration currently assumes you are using a free account so the max requests per day is 100 (the refresh interval is calculated such that you should only use up around 90% of the quota).

## Supported Forecast Types

| Forecast Type | Description                                                                                                      |
|---------------|------------------------------------------------------------------------------------------------------------------|
| `nowcast`     | Up to the 1 minute predictions. Supports 300 minutes or a max of 30 forecasts depending on the chosen `timestep` |
| `hourly`      | Hourly forecasts for the next 24 hours                                                                           |
| `daily`       | Daily  forecasts for the next 14 days                                                                            |

{% include integrations/config_flow.md %}
