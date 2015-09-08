---
layout: page
title: "Forecast.io support"
description: "Instructions how to integrate Forecast.io within Home Assistant."
date: 2015-04-25 9:06
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/weather-few-clouds.png' class='brand pull-right' />
The forecast platform uses the [Forecast.io](https://forecast.io/) web service as a source for meteorological data for your location. 

You need an API key which is free but requires a [registration](https://developer.forecast.io/register).

To add Forecast.io to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: forecast
  api_key: YOUR_APP_KEY
  monitored_conditions:
    - summary
    - precip_type
    - precip_intensity
    - temperature
    - dew_point
    - wind_speed
    - wind_bearing
    - cloud_cover
    - humidity
    - pressure
    - visibility
    - ozone
```

Configuration variables:

- **api_key** (*Required*): To retrieve this value log into your account at http://forecast.io/. You can make 1000 requests per day. This means that you could create approximately every 1.4 minute one.
- **password** (*Optional*): Password for your online wallet.
- **currency** (*Optional*): The currency to exchange to, eg. CHF, USD, EUR, etc. Default is USD.
- **display_conditions** array: Conditions to display in the frontend.
  - **summary**: A human-readable text summary.
  - **precip_type**: The type of precipitation occurring.
  - **precip_intensity**: The average expected intensity of precipitation occurring.
  - **temperature**: The current temperature.
  - **dew_point**: The dew point.
  - **wind_speed**: The wind speed.
  - **wind_bearing**: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise.
  - **cloud_cover**: The percentage of sky occluded by clouds.
  - **humidity**: The relative humidity.
  - **pressure**: The sea-level air pressure in millibars.
  - **visibility**: The average visibility.
  - **ozone**: The columnar density of total atmospheric ozone in Dobson.

Details about the API are available in the [Forecast.io documentation](https://developer.forecast.io/docs/v2).
