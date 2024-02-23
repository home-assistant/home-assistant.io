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
ha_integration_type: service
---

The Tomorrow.io integration allows you to obtain weather, air quality, pollen, and fire information from the [Tomorrow.io API](https://www.tomorrow.io/weather-api/).

## Obtain an API key

You can obtain a free API key by signing up with [Tomorrow.io](https://www.tomorrow.io/weather-api/). The integration assumes that your API key is associated with a free Tomorrow.io account. Free accounts include a limited number of daily API requests and the number of daily API requests included varies by account. Login to Tomorrow.io to view the number of daily API requests included with your account.

The refresh interval defaults to a time period that is compatible with an account limited to 100 daily API requests and this integration should use around 90% of the available daily requests.

When using a free account, the information provided by Tomorrow.io is limited to the [Core layer](https://docs.tomorrow.io/reference/data-layers-core). It does not include the Air Quality layer or other layers. A paid Tomorrow.io account is required to retrieve those layers.

## Supported Forecast Types

| Forecast Type | Description                                                                                                      |
|---------------|------------------------------------------------------------------------------------------------------------------|
| `nowcast`     | Up to the 1 minute predictions. Supports 300 minutes or a max of 30 forecasts depending on the chosen `timestep` |
| `hourly`      | Hourly forecasts for the next 24 hours                                                                           |
| `daily`       | Daily  forecasts for the next 14 days                                                                            |

{% include integrations/config_flow.md %}
