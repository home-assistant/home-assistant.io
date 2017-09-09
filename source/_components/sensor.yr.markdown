---
layout: page
title: "YR"
description: "Instructions how to integrate Yr.no within Home Assistant."
date: 2016-01-04 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: yr.png
ha_category: Weather
ha_release: 0.11
ha_iot_class: "Cloud Polling"
---


The `yr` platform uses [YR.no](http://www.yr.no/) as an source for current meteorological data for your location. The
weather forecast is delivered by the Norwegian Meteorological Institute and the NRK.

To add YR to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: yr
```

Configuration variables:

- **name** (*Optional*): Additional name for the sensors. Default to platform name.
- **forecast** integer (*Optional*): If you want to get forecast data instead of the current weather data, set this to the number of hours that you want to look into the future.
- **monitored_conditions** array (*Optional*): Conditions to display in the frontend.
  - **symbol**: A symbol for the current weather.
  - **temperature**: The current temperature.
  - **humidity**: The relative humidity.
  - **fog**: Fog.
  - **pressure**: The sea-level air pressure in millibars.
  - **precipitation**: The precipitation.
  - **dewpointTemperature**: The dew point temperature.
  - **windSpeed**: The wind speed.
  - **windDirection**: Where the wind is coming from in degrees, with true north at 0° and progressing clockwise.
  - **cloudiness**: The cloudiness.
  - **lowClouds**: Low cloud level.
  - **mediumClouds**: Medium cloud level.
  - **highClouds**: High cloud level.

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
