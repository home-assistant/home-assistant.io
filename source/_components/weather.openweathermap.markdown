---
layout: page
title: "OpenWeatherMap"
description: "Instructions how to integrate OpenWeatherMap within Home Assistant."
date: 2016-09-29 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: openweathermap.png
ha_category: Weather
ha_release: 0.32
---

The `openweathermap` weather platform uses [OpenWeatherMap](http://openweathermap.org/) as an source for current meteorological data for your location.

You need an API key which is free but requires a [registration](http://home.openweathermap.org/users/sign_up).

To add OpenWeatherMap to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: openweathermap
    api_key: YOUR_API_KEY
    latitude: 46.1234
    longitude: 7.1234
```

Configuration variables:

- **api_key** (*Required*): Your API key for http://openweathermap.org/.
- **latitude** (*Optional*): Latitude of the location to display the weather. Defaults to the latitude in your your `configuration.yaml` file. 
- **longitude** (*Optional*): Longitude of the location to display the weather. Defaults to the longitude in your `configuration.yaml` file.

<p class='note'>
This platform is an alternative to the [`openweathermap`](/components/sensor.openweathermap/) sensor. 
</p>
