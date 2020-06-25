---
title: ClimaCell
description: Instructions on how to integrate the ClimaCell Weather and Air Quality API into Home Assistant.
ha_category:
  - Weather
  - Air Quality
ha_release: 0.113
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_quality_scale: silver
ha_codeowners:
  - '@raman325'
ha_domain: climacell
---

The `climacell` integration allows you to obtain weather and air quality information from the [ClimaCell API](https://www.climacell.co/weather-api/).

## Obtain an API key

You can obtain a free API key by signing up with [ClimaCell](https://developer.climacell.co/sign-up?_ga=2.137889264.1908484805.1591592950-510691096.1591288729).

The integration will automatically set the refresh interval based on the number of `climacell` integrations that are using the same API key for a given Home Assistant instance. The integration currently assumes you are using a free account so the max requests per day is 1000. If you want to use a paid account to increase the number of max requests and increase the update frequency, please open a Home Assistant issue for the integration.

## Supported Forecast Types
| Forecast Type | Description                                                                                                      |
|---------------|------------------------------------------------------------------------------------------------------------------|
| `nowcast`     | Up to the 1 minute predictions. Supports 300 minutes or a max of 30 forecasts depending on the chosen `timestep` |
| `hourly`      | Hourly forecasts for the next 24 hours                                                                           |
| `daily`       | Daily  forecasts for the next 14 days                                                                            |

## Configure the integration

The integration can be configured via the Integrations menu in the Home Assistant frontend, or it can be configured via `configuration.yaml`

### Configuration via the Integrations menu

Go to the Integrations menu and search for ClimaCell. Fill out the form with a valid API key to set up the integration. To configure the `timestep` or `aqi_country` parameters (described below), access the options menu for the ClimaCell integration in the Integrations menu.

### Configuration via `configuration.yaml`

To add ClimaCell to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climacell:
  - api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: "A valid ClimaCell API key"
  required: true
  type: string
name:
  description: Nickname for the integration that will be used to generate the entity ID. If you want to track weather for multiple locations, each name must be unique.
  required: false
  type: string
  default: ClimaCell
latitude:
  description: Latitude for the location being tracked.
  required: inclusive
  type: float
  default: The latitude of your Home Assistant instance
longitude:
  description: Longitude for the location being tracked.
  required: inclusive
  type: float
  default: The longitude of your Home Assistant instance
forecast_type:
  description: The kind of forecast you want. Valid options are `nowcast`, `hourly`, `daily`, or `disable`. Choose `disable` to exclude forecasts.
  required: false
  type: string
  default: daily
timestep:
  description: The number of minutes (1 - 60) between forecasts when `forecast_type` is `nowcast`. The number of forecasts provided will be dependent on the number of minutes chosen between forecasts, but the maximum number of forecasts is 30 and the maximum overall forecast period is 5 hours.
  required: false
  type: integer
  default: 15
aqi_country:
  description: The country whose standard is being used to measure the Air Quality Index. Valid options are `usa` for US EPA standards and `china` for China MEP standards.
  required: false
  type: string
  default: usa
{% endconfiguration %}

```yaml
# Complete configuration.yaml entry
climacell:
  - api_key: YOUR_API_KEY
    name: MY_CLIMACELL_DEVICE
    latitude: -23.22960
    longitude: -108.27803
    forecast_interval: daily
    timestep: 15
    aqi_country: usa
```
