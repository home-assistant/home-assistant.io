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
    api_key: "my-api-key"
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

- **api_key** (*Required*): Your personal API key from the [Datapoint website][datapoint].

<p class='note'>
This sensor is an alternative to the [`metoffice`](/components/weather.metoffice/) weather platform.
The weather platform is easier to configure but less customizable.
</p>

[datapoint]: http://www.metoffice.gov.uk/datapoint
