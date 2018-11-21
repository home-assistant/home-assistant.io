---
layout: page
title: "Météo-France Sensor"
description: "Show 1hr rain forecast from Météo-France."
date: 2018-10-18 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: meteo-france.png
ha_category: Sensor
ha_release: 0.82
ha_iot_class: "Cloud Polling"
---

The `meteo_france` platform uses the [Météo-France](http://www.meteofrance.com/) web service as a source for meteorological data for your location. The location is based on the `postal_code` configured in your `configuration.yaml` file.

## {% linkable_title Configuration %}

To add Météo-France to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: meteo_france
    postal_code: '76000'
    monitored_conditions:
      - temperature
      - weather
      - wind_speed
      - uv
      - next_rain
      - freeze_chance
      - rain_chance
      - snow_chance
      - thunder_chance
```

{% configuration %}
  postal_code:
    description: Postal code of the city.
    required: true
    type: string
  monitored_conditions:
    description: The conditions types to monitor.
    required: true
    type: list
    keys:
      temperature:
        description: The current temperature.
      weather:
        description: A human-readable text summary of the current conditions.
      wind_speed:
        description: The wind speed.
      uv:
        description: The current UV index.
      next_rain:
        description: Time to the next rain if happening for the next hour. (see note below)
      freeze_chance:
        description: Probability of temperature below 0°C for the day.
      rain_chance:
        description: Probability of rain for the day.
      snow_chance:
        description: Probability of snow for the day.
      thunder_chance:
        description: Probability of thunderstorm for the day.        
{% endconfiguration %}


### {% linkable_title About `next_rain` condition sensor %}

<p class='note warning'>
  The 1 hour rain forecast is supported for more than 75% of metropolitan France.<br/>
  You can check if your city is covered on the [Météo-France website](http://www.meteofrance.com/previsions-meteo-france/previsions-pluie)
</p>

The `next_rain` sensor value is the time to next rain, from 0 to 55min.
If no rain is forecasted for the next hour, value will be "No rain".

Attributes also give the forecast for the next hour in 5min intervals.
Possible value for each intervals attributes are :
- 1 No rain
- 2 Light rain
- 3 Moderate rain
- 4 Heavy rain
