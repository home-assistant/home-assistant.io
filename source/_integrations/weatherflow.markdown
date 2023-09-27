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

This integration is a local-only WeatherFlow integration that reads weather data from [WeatherFlow Tempest](https://weatherflow.com/tempest-weather-system/) compatible weather station on the local network.

<div class='note'>
It possible you may see slight deviations between the values reported in Home Assistant and the values in the WeatherFlow App. This is because the WeatherFlow app takes into account both forecasts and neighboring weather stations in addition to the local data which is used in this integration.
</div>

{% include integrations/config_flow.md %}

## Sensors

This integration will expose the following sensors:

- Air Density
- Battery Voltage
- Dew Point
- Feels Like
- Humidity
- Illuminance
- Lightning Average Distance
- Lightning Count
- Precipitation Type
- RSSI
- Rain Amount
- Rain Rate
- Solar Radiation
- Station Pressure
- Temperature
- UV
- Up Since
- Vapor Pressure
- Wet Bulb Temperature
- Wind Average
- Wind Direction
- Wind Direction Average
- Wind Gust
- Wind Lull
- Wind Speed
- Wind Speed Average
