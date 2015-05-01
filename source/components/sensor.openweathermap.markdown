---
layout: page
title: "OpenWeatherMap support"
description: "Instructions how to integrate OpenWeatherMap within Home Assistant."
date: 2015-04-25 9:06
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/openweathermap.png' class='brand pull-right' />
The openweathermap platform uses [OpenWeatherMap](http://openweathermap.org/) as a source for meteorological data for your location. 

```yaml
# Example configuration.yaml entry
sensor:
  platform: openweathermap
  api_key: YOUR_API_KEY
  monitored_variables:
    - type: 'weather'
    - type: 'temperature'
    - type: 'wind_speed'
    - type: 'humidity'
    - type: 'pressure'
    - type: 'clouds'
    - type: 'rain'
    - type: 'snow'
```

