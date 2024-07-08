---
title: WeatherFlow
description: Instructions on how to integrate your WeatherFlow tempest into Home Assistant.
ha_release: '2023.10'
ha_category:
  - Environment
  - Sensor
ha_platforms:
  - sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@natekspencer'
  - '@jeeftor'
ha_domain: weatherflow
ha_integration_type: hub
---

The **WeatherFlow** {% term integration %} is a local-only {% term integration %} that reads weather data from all [WeatherFlow Tempest](https://weatherflow.com/tempest-weather-system/) compatible weather station on the local network.

{% note %}
You may see slight deviations between the values reported in Home Assistant and the values in the WeatherFlow App. This is because the WeatherFlow app considers both forecasts and neighboring weather stations in addition to the local data used in this {% term integration %}.
{% endnote %}

{% include integrations/config_flow.md %}

## Sensors

This {% term integration %} will expose the following sensors:

- Air density
- Air pressure
- Dew point
- Feels like
- Humidity
- Illuminance
- Irradiance
- Lightning average distance
- Lightning count
- Precipitation (accumulated over the previous minute)
- Precipitation intensity ([extrapolated](https://weatherflow.github.io/Tempest/api/derived-metric-formulas.html#rain-rate) from the accumulation over the previous minute)
- Precipitation type
- Temperature
- UV index
- Vapor pressure
- Wet bulb temperature
- Wind direction
- Wind direction average
- Wind gust
- Wind lull
- Wind speed

## Diagnostic sensors

Additionally the following diagnostic sensors are available:

- Battery voltage
- Signal strength
- Uptime

## Networking notes

This {% term integration %} relies on the ability of Home Assistant to receive `UDP` traffic on port `50222`. You may run into trouble if you have a more complex network setup utilizing either VLANs or multiple subnets.
