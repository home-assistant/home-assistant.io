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

You need an API key which is free but requires a [registration](http://home.openweathermap.org/users/sign_up).

To add OpenWeatherMap to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: openweathermap
  api_key: YOUR_API_KEY
  monitored_conditions
    - type: 'weather'
    - type: 'temperature'
    - type: 'wind_speed'
    - type: 'humidity'
    - type: 'pressure'
    - type: 'clouds'
    - type: 'rain'
    - type: 'snow'
```
Details about the API are available in the (OpenWeatherMap documentation)[http://bugs.openweathermap.org/projects/api/wiki].
