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
The openweathermap platform uses [OpenWeatherMap](http://openweathermap.org/) as an source for current meteorological data for your location. The `forecast` will show you the condition in 3 h. 

You need an API key which is free but requires a [registration](http://home.openweathermap.org/users/sign_up).

To add OpenWeatherMap to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: openweathermap
  api_key: YOUR_API_KEY
  forecast: 0 or 1
  monitored_conditions:
    - weather
    - temperature
    - wind_speed
    - humidity
    - pressure
    - clouds
    - rain
    - snow
```

Details about the API are available in the [OpenWeatherMap documentation](http://bugs.openweathermap.org/projects/api/wiki).

