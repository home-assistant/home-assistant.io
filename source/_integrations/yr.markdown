---
title: Yr
description: Instructions on how to integrate Yr.no within Home Assistant.
ha_category:
  - Weather
ha_release: 0.11
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@danielhiversen'
ha_domain: yr
---

The `yr` platform uses [YR.no](https://www.yr.no/) as a source for current
meteorological data for your location. The weather forecast is delivered by the
Norwegian Meteorological Institute and the NRK.

To add YR to your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: yr
```

{% configuration %}
name:
  description: Additional name for the sensors.
  required: false
  type: string
  default: yr
forecast:
  description: If you want to get forecast data instead of the current weather data, set this to the number of hours that you want to look into the future.
  required: false
  type: integer
monitored_conditions:
  description: Conditions to display in the frontend.
  required: false
  type: list
  default: symbol
  keys:
    symbol:
      description: A symbol for the current weather.
    temperature:
      description: The current temperature.
    humidity:
      description: The relative humidity.
    fog:
      description: Fog.
    pressure:
      description: The sea-level air pressure in millibars.
    precipitation:
      description: The precipitation.
    dewpointTemperature:
      description: The dew point temperature.
    windSpeed:
      description: The wind speed.
    windDirection:
      description: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise.
    cloudiness:
      description: The cloudiness.
    lowClouds:
      description: Low cloud level.
    mediumClouds:
      description: Medium cloud level.
    highClouds:
      description: High cloud level.
latitude:
  description: Manually specify latitude.
  required: false
  type: float
  default: Provided by Home Assistant configuration.
longitude:
  description: Manually specify longitude.
  required: false
  type: float
  default: Provided by Home Assistant configuration.
altitude:
  description: Manually specify altitude.
  required: false
  type: float
  default: Provided by Home Assistant configuration.
{% endconfiguration %}

A full configuration example can be found below:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: yr
    name: Weather
    forecast: 24
    monitored_conditions:
      - temperature
      - symbol
      - precipitation
      - windSpeed
      - pressure
      - windDirection
      - humidity
      - fog
      - cloudiness
      - lowClouds
      - mediumClouds
      - highClouds
      - dewpointTemperature
```
