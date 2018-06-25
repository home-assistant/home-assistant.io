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
ha_release: "0.72"
ha_iot_class: "Cloud Polling"
---

The 'magicseaweed' platform uses the [Magicseaweed Forecast API](https://magicseaweed.com/developer/forecast-api) as a source for surf forecasting data for the surf spots of your choice.

You need an API key which is free but requires [registration](https://magicseaweed.com/developer/sign-up). Magicseaweed is limiting users of the API to 2 spots for the free plan.

To add Magicseaweed forecasts to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: magicseaweed
    name: Hurricane Spot
    api_key: YOUR_API_KEY
    spot_id: 1092
    hours:
      - 6AM
      - 9AM
      - 12PM
      - 3PM
      - 6PM
    monitored_conditions:
      - swell_forecast
      - min_breaking_swell
      - max_breaking_swell
```

Configuration variables:

- **api_key** (*Required*): Your API key.
- **name** (*Optional*): Spot nickname for the sensors. Default to platform name.
- **hours** array (*Optional*): List of hours you would like to receive data for. Defaults to the current forecast.
- **spot_id** (*Required*): Surf spot ID to monitor surf forecast of. Details for getting spot id available at [Magicseaweed](https://magicseaweed.com/developer/forecast-api)
- **monitored_conditions** array (*Required*): Conditions to display in the frontend.
  - **swell_forecast**: List of forecast summaries as attributes with current summary as state.
  - **min_breaking_swell**: The minimum wave height as the state with a detailed list of forecast attributes.
  - **max_breaking_swell**: The maximum wave height as the state with a detailed list of forecast attributes.
- **units** (*Optional*): Specify the unit system. Default to `uk` or `us` based on the temperature preference in Home Assistant. Other options are `uk`, `eu`, `us`.
- **update_interval** (*Optional*): Minimum time interval between updates. Default is 30 minutes. Supported formats:
  - `update_interval: 'HH:MM:SS'`
  - `update_interval: 'HH:MM'`
  - Time period dictionary, e.g.:
    <pre>update_interval:
        # At least one of these must be specified:
        days: 0
        hours: 0
        minutes: 3
        seconds: 30
        milliseconds: 0
    </pre>

Details about the API are available in the [Magicseaweed documentation](https://magicseaweed.com/developer/forecast-api).
