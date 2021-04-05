---
title: ClimaCell
description: Instructions on how to integrate the ClimaCell Weather and Air Quality API into Home Assistant.
ha_category:
  - Weather
ha_release: 2021.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@raman325'
ha_domain: climacell
ha_platforms:
  - weather
---

The ClimaCell integration allows you to obtain weather information from the [ClimaCell API](https://www.climacell.co/weather-api/).

## Obtain an API key

You can obtain a free API key by signing up with [ClimaCell](https://developer.climacell.co/sign-up?_ga=2.137889264.1908484805.1591592950-510691096.1591288729).

The integration will automatically set the refresh interval based on the number of ClimaCell integrations that are using the same API key for a given Home Assistant instance. The integration currently assumes you are using a free account so the max requests per day is 1000. If you want to use a paid account to increase the number of max requests and increase the update frequency, please open a Home Assistant issue for the integration.

## Supported Forecast Types

| Forecast Type | Description                                                                                                      |
|---------------|------------------------------------------------------------------------------------------------------------------|
| `nowcast`     | Up to the 1 minute predictions. Supports 300 minutes or a max of 30 forecasts depending on the chosen `timestep` |
| `hourly`      | Hourly forecasts for the next 24 hours                                                                           |
| `daily`       | Daily  forecasts for the next 14 days                                                                            |

{% include integrations/config_flow.md %}
