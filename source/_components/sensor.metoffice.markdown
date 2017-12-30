---
layout: page
title: "Met Office Sensor"
description: "Instructions on how to integrate Met Office weather conditions into Home Assistant."
date: 2017-03-23 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: metoffice.jpg
ha_category: Weather
ha_release: 0.42
ha_iot_class: "Cloud Polling"
---

The `metoffice` sensor platform uses the Met Office's [DataPoint API][datapoint] for weather data.

- Each sensor will be given the `device_id` of "Met Office [condition]"
- The sensor checks for new data every minute, starting 30 minutes after the timestamp of the most recent data as the data is updated every half-hour.

To add the Met Office weather to your installation you'll need to register for a free api key at the link above and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: metoffice
    api_key: YOUR_API_KEY
    monitored_conditions:
      - weather
      - temperature
      - feels_like_temperature
      - wind_speed
      - wind_direction
      - wind_gust
      - visibility
      - visibility_distance
      - uv
      - precipitation
      - humidity
```

Your location will be detected from your home `latitude` and `longitude` settings.

Configuration variables:

- **api_key** (*Required*): Your personal API key from the [Datapoint website](http://www.metoffice.gov.uk/datapoint).
- **name** (*Optional*): Additional name for the sensors. Default to platform name.
- **latitude** (*Optional*): Latitude coordinate to monitor weather of (required if **longitude** is specified), defaults to coordinates defined in your `configuration.yaml`.
- **longitude** (*Optional*): Longitude coordinate to monitor weather of (required if **latitude** is specified), defaults to coordinates defined in your `configuration.yaml`.
- **monitored_conditions** array (*Required*): Conditions to display in the frontend.
  - **weather**: A human-readable text summary of the current conditions.
  - **temperature**: The current temperature.
  - **feels_like_temperature**: A numerical value representing the apparent (or "feels like") temperature.
  - **wind_speed**: The wind speed.
  - **wind_direction**: Where the wind is coming from.
  - **wind_gust**: If there are wind gusts.
  - **visibility**: The average visibility.
  - **visibility_distance**: The visibility distance.
  - **uv**: The UV index.
  - **precipitation**: The average expected intensity of precipitation occurring.
  - **humidity**: The relative humidity.

<p class='note'>
This sensor is an alternative to the [`metoffice`](/components/weather.metoffice/) weather platform.
The weather platform is easier to configure but less customizable.
</p>

