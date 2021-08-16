---
title: ClimaCell
description: Instructions on how to integrate the ClimaCell Weather and Air Quality API into Home Assistant.
ha_category:
  - Environment
  - Health
  - Sensor
  - Weather
ha_release: 2021.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@raman325'
ha_domain: climacell
ha_platforms:
  - sensor
  - weather
---

<div class='note warning'>
As part of [ClimaCell's rebranding to Tomorrow.io](https://www.tomorrow.io/blog/my-last-day-as-ceo-of-climacell/), the ClimaCell integration has been deprecated in favor of the [Tomorrow.io integration](/integrations/tomorrowio). For existing users of the ClimaCell integration, Home Assistant will automatically migrate your configuration to Tomorrow.io or instruct you on how to finish setup if you need to upgrade your API key. This integration is no longer available to be setup for new users.
</div>

The ClimaCell integration allows you to obtain weather, air quality, pollen, and fire information from the [ClimaCell API](https://www.climacell.co/weather-api/).

## Supported Forecast Types

| Forecast Type | Description                                                                                                      |
|---------------|------------------------------------------------------------------------------------------------------------------|
| `nowcast`     | Up to the 1 minute predictions. Supports 300 minutes or a max of 30 forecasts depending on the chosen `timestep` |
| `hourly`      | Hourly forecasts for the next 24 hours                                                                           |
| `daily`       | Daily  forecasts for the next 14 days                                                                            |
