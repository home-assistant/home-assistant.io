---
title: Magicseaweed
description: How to integrate Magicseaweed within Home Assistant.
ha_category:
  - Sensor
ha_release: 0.75
ha_iot_class: Cloud Polling
ha_domain: magicseaweed
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `magicseaweed` platform uses the [Magicseaweed Forecast API](https://magicseaweed.com/docs/developers/59/) as a source for surf forecasting data for the surf spots of your choice.

## Setup

You need an API key which is free but requires [registration](https://magicseaweed.com/docs/developers/59/sign-up/9908/). Magicseaweed is limiting users of the API to 1 spot for the free plan.

## Configuration

To add Magicseaweed forecasts to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: magicseaweed
    api_key: YOUR_API_KEY
    spot_id: 1092
    monitored_conditions:
      - max_breaking_swell
```

{% configuration %}
api_key:
  description: The API key to access the service.
  required: true
  type: string
name:
  description: Spot nickname for the sensors.
  required: false
  default: MSW.
  type: string
hours:
  description: List of hours you would like to receive data for.
  required: false
  default: Defaults to current forecast.
  type: list
  keys:
    3AM:
      description: Display forecast for 3AM.
    6AM:
      description: Display forecast for 6AM.
    9AM:
      description: Display forecast for 9AM.
    12PM:
      description: Display forecast for 12PM.
    3PM:
      description: Display forecast for 3PM.
    6PM:
      description: Display forecast for 6PM.
    9PM:
      description: Display forecast for 9PM.
    12AM:
      description: Display forecast for 12AM.
spot_id:
  description: ID of the surf spot. Details for getting spot id available at [Magicseaweed](https://magicseaweed.com/docs/developers/59/)
  required: true
  type: string
monitored_conditions:
  description: Type of data to display.
  required: true
  type: list
  keys:
    swell_forecast:
      description: List of forecast summaries as attributes with current summary as state.
    min_breaking_swell:
      description: The minimum wave height as the state with a detailed list of forecast attributes.
    max_breaking_swell:
      description: The maximum wave height as the state with a detailed list of forecast attributes.
units:
  description: Specify the unit system. Either `uk`, `eu` or `us`.
  required: false
  default: Default to `uk` or `us` based on the temperature preference in Home Assistant.
  type: string
{% endconfiguration %}

Details about the API are available in the [Magicseaweed documentation](https://magicseaweed.com/docs/developers/59/).
