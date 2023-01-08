---
title: "WeatherFlow Local"
description: "Instructions on how to integrate your WeatherFlow tempest into Home Assistant."
ha_release: 2023.2
ha_category: 
  - Sensor
ha_platforms:
 - sensor
 - enviornment
ha_iot_class: "Local Polling"
ha_config_flow: true
ha_codeowners:
  - '@natekspencer'
  - '@jeeftor'
ha_domain: weatherflow
---

## Overview

This integration is a local-only WeatherFlow integration that reads UDP data from a [WeatherFlow Tempest](https://weatherflow.com/tempest-weather-system/) compatible weather station.

## Installation Notes

When you add this integration to Home Assistant it will detect and decode any valid UDP packets sent from a valid weather station. Sensors will only be created in Home Assistant once it has received a valid reading for that particular sensor type.

<div class='note'>
It possible you will may see slight deviations between some of the values in your WeatherFlow app and Home Assistant. This only applies to sensors with calculated values, as there may be slight differences between how Home Assistant and WeatherFlow choose to calculate these values.
</div>

{% include integrations/config_flow.md %}

## Sensors

This integration will expose the following sensors:

- Air Density
- Dew Point
- Feels Like
- Humidity
- Illuminance
- Lightning Average Distance
- Lightning Count
- Precipitation Type
- Rain Amount
- Rain Rate
- Solar Radiation
- Station Pressure
- Temperature
- UV
- Vapor Pressure
- Wet Bulb Temperature
- Wind Average
- Wind Direction
- Wind Direction Average
- Wind Gust
- Wind Lull
- Wind Speed
- Wind Speed Average
- Up Since
- Battery Voltage
- RSSI
