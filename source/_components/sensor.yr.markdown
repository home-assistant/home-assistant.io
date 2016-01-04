---
layout: component
title: "YR"
description: "Instructions how to integrate Yr.no within Home Assistant."
date: 2016-01-04 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: yr.png
ha_category: Weather
---


The `yr` platform uses [YR](http://www.yr.no/) as an source for current meteorological data for your location.

To add YR to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: yr
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

- **monitored_conditions** array (*Required*): Conditions to display in the frontend.
  - **symbol**: A human-readable text summary.
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

