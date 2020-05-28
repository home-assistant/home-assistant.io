---
title: "Met Office Sensor"
description: "Instructions on how to integrate Met Office weather conditions into Home Assistant."
ha_category:
  - Weather
ha_release: 0.42
ha_iot_class: Cloud Polling
ha_domain: metoffice
---

The `metoffice` sensor platform uses the Met Office's [DataPoint API](https://www.metoffice.gov.uk/datapoint) for weather data.

- Each sensor will be given the `device_id` of "Met Office [condition]" if `name:` is not set.
- The sensor checks for new data every minute, starting 30 minutes after the timestamp of the most recent data as the data is updated every half hour.

To add the Met Office weather to your installation you'll need to register for a free API key at the link above and then add the following to your `configuration.yaml` file:

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

{% configuration %}
api_key:
  description: "Your personal API key from the [Datapoint website](https://www.metoffice.gov.uk/datapoint)."
  required: true
  type: string
name:
  description: Additional name for the sensors.
  required: false
  defaults: Met Office
  type: string
latitude:
  description: "Latitude coordinate to monitor weather of (required if **longitude** is specified), defaults to coordinates defined in your `configuration.yaml`."
  required: inclusive
  type: float
longitude:
  description: "Longitude coordinate to monitor weather of (required if **latitude** is specified), defaults to coordinates defined in your `configuration.yaml`."
  required: inclusive
  type: float
monitored_conditions:
  description: Conditions to display in the frontend.
  required: true
  type: list
  keys:
    weather:
      description: A human-readable text summary of the current conditions.
    temperature:
      description: The current temperature.
    feels_like_temperature:
      description: A numerical value representing the apparent (or "feels like") temperature.
    wind_speed:
      description: The wind speed.
    wind_direction:
      description: Where the wind is coming from.
    wind_gust:
      description: If there are wind gusts.
    visibility:
      description: The average visibility.
    visibility_distance:
      description: The visibility distance.
    uv:
      description: The UV index.
    precipitation:
      description: The average expected intensity of precipitation occurring.
    humidity:
      description: The relative humidity.
{% endconfiguration %}

<div class='note'>

This sensor is an alternative to the [`metoffice`](/integrations/metoffice/) weather platform.
The weather platform is easier to configure but less customizable however it also provides a five-day forecast.

</div>
