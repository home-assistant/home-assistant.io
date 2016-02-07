---
layout: component
title: "OpenWeatherMap"
description: "Instructions how to integrate OpenWeatherMap within Home Assistant."
date: 2015-04-25 9:06
sidebar: true
comments: false
sharing: true
footer: true
logo: openweathermap.png
ha_category: Weather
---


The `openweathermap` platform uses [OpenWeatherMap](http://openweathermap.org/) as an source for current meteorological data for your location. The `forecast` will show you the condition in 3 h. 

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

Configuration variables:

- **api_key** (*Required*): Your API key for http://openweathermap.org/.
- **forecast** (*Optional*): Enables the forecast. The default is to display the current conditions.
- **display_conditions** array (*Required*): Conditions to display in the frontend.
  - **weather**: A human-readable text summary.
  - **temperature**: The current temperature.
  - **wind_speed**: The wind speed.
  - **humidity**: The relative humidity.
  - **pressure**: The sea-level air pressure in millibars.
  - **clouds**: Description about cloud coverage.
  - **rain**: The rain volume.
  - **snow**: The snow volume

Details about the API are available in the [OpenWeatherMap documentation](http://bugs.openweathermap.org/projects/api/wiki).

Only metric measurements are supported at the moment.


