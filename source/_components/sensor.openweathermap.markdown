---
layout: page
title: "OpenWeatherMap Sensor"
description: "Instructions how to integrate OpenWeatherMap within Home Assistant."
date: 2015-04-25 9:06
sidebar: true
comments: false
sharing: true
footer: true
logo: openweathermap.png
ha_category: Weather
ha_release: pre 0.7
---


The `openweathermap` platform uses [OpenWeatherMap](http://openweathermap.org/) as an source for current meteorological data for your location. The `forecast` will show you the condition in 3 h. 

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

Configuration variables:

- **api_key** (*Required*): Your API key for http://openweathermap.org/.
- **name** (*Optional*): Additional name for the sensors. Default to platform name.
- **forecast** (*Optional*): Enables the forecast. The default is to display the current conditions.
- **monitored_conditions** array (*Required*): Conditions to display in the frontend.
  - **weather**: A human-readable text summary.
  - **temperature**: The current temperature.
  - **wind_speed**: The wind speed.
  - **humidity**: The relative humidity.
  - **pressure**: The sea-level air pressure in millibars.
  - **clouds**: Description about cloud coverage.
  - **rain**: The rain volume.
  - **snow**: The snow volume

Details about the API are available in the [OpenWeatherMap documentation](http://openweathermap.org/api).

Only metric measurements are supported at the moment.

