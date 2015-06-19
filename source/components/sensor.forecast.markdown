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
Details about the API are available in the (Forecast.io documentation)[https://developer.forecast.io/docs/v2].
