---
layout: page
title: "Magicseaweed Sensor"
description: "How to integrate Magicseaweed within Home Assistant."
date: 2018-06-24 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: magicseaweed.png
ha_category: Sensor
featured: false
ha_release: "0.73"
ha_iot_class: "Cloud Polling"
---

The 'magicseaweed' platform uses the [Magicseaweed Forecast API](https://magicseaweed.com/developer/forecast-api) as a source for surf forecasting data for the surf spots of your choice.

You need an API key which is free but requires [registration](https://magicseaweed.com/developer/sign-up). Magicseaweed is limiting users of the API to 2 spots for the free plan.

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
hour:
  description: List of hours you would like to receive data for.
  required: false
  default: Defaults to current forecast.
  type: list
  keys:
    3AM:
    6AM:
    9AM:
    12PM:
    3PM:
    6PM:
    9PM:
    12AM:
spot_id:
  description: Surf spot ID to monitor surf forecast of.Details for getting spot id available at [Magicseaweed](https://magicseaweed.com/developer/forecast-api)
  required: true
  type: string
monitored_conditions:
  description: Conditions to display in the frontend.
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
  description: Specify the unit system.
  required: false
  default: Default to `uk` or `us` based on the temperature preference in Home Assistant.
  type: string
  keys:
    uk:
    eu:
    us:
update_interval:
  description: Minimum time interval between updates.
  required: false
  default: Default is 30 minutes.
  type: list
  keys:
    update_interval:
      description: `update_interval: 'HH:MM:SS'` or `update_interval: 'HH:MM'`
    days:
    hours:
    minutes:
    seconds:
    milliseconds:


{% endconfiguration %}


Details about the API are available in the [Magicseaweed documentation](https://magicseaweed.com/developer/forecast-api).
