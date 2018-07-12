---
layout: page
title: "OpenWeatherMap Sensor"
description: "Instructions on how to integrate OpenWeatherMap within Home Assistant."
date: 2015-04-25 9:06
sidebar: true
comments: false
sharing: true
footer: true
logo: openweathermap.png
ha_category: Weather
ha_release: pre 0.7
ha_iot_class: "Cloud Polling"
---


The `openweathermap` platform uses [OpenWeatherMap](http://openweathermap.org/) as a source for current meteorological data for your location. The `forecast` will show you the condition in 3 h. 

You need an API key which is free but requires a [registration](http://home.openweathermap.org/users/sign_up).

To add OpenWeatherMap to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: openweathermap
    api_key: YOUR_API_KEY
    monitored_conditions:
      - weather
```

{% configuration %}
  api_key:
    description: Your API key for OpenWeatherMap.
    required: true
    type: string
  name:
    description: Additional name for the sensors. Default to platform name.
    required: false
    default: OWM
    type: string
  forecast:
    description: Enables the forecast. The default is to display the current conditions.
    required: false
    default: false
    type: string
  language:
    description: The language in which you want text results to be returned. It's a two-characters string, eg. `en`, `es`, `ru`, `it`, etc.
    required: false
    default: en
    type: string
  monitored_conditions:
    description: Conditions to display in the frontend.
    required: true
    type: list
    keys:
      weather:
        description: A human-readable text summary.
      temperature:
        description: The current temperature.
      wind_speed:
        description: The wind speed.
      wind_bearing:
        description: The wind bearing.
      humidity:
        description: The relative humidity.
      pressure:
        description: The sea-level air pressure in millibars.
      clouds:
        description: Description about cloud coverage.
      rain:
        description: The rain volume.
      snow:
        description: The snow volume.
{% endconfiguration %}

Details about the API are available in the [OpenWeatherMap documentation](http://openweathermap.org/api).
