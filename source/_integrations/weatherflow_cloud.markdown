---
title: WeatherFlow Cloud
description: Instructions on the Cloud based WeatherFlow integration
ha_release: 2024.3
ha_category:
  - Environment
  - Weather
ha_platforms:
  - weather
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jeeftor'
ha_domain: weatherflow_cloud
ha_integration_type: integration
---

The **WeatherFlow Cloud** integration provides access to cloud provided Weather Forecast of a user's Tempest Weather Stations. In order to access the station you will need to configure the integration with an [Api Key](https://weatherflow.github.io/Tempest/api/).

{% include integrations/config_flow.md %}


## Sensors

Additionally this integration provides access to the following sensors

| Sensor                        | Description                                                                                   |
|-----------------------------|-----------------------------------------------------------------------------------------------|
| Air Temperature             | The measure of the hotness or coldness of the air in a particular environment, usually reported in degrees Celsius (°C) or Fahrenheit (°F). |
| Feels Like                  | A calculated temperature that factors in the humidity and wind to estimate how the air temperature feels to the human body. |
| Heat Index                  | A measure that combines air temperature and humidity to determine the human-perceived equivalent temperature, indicating how hot it feels. |
| Wet Bulb Temperature        | The lowest temperature that can be reached by evaporating water into the air at constant pressure, which is a measure of moisture in the air. |
| Wet Bulb Globe Temperature | A composite temperature used to estimate the effect of temperature, humidity, wind speed, and solar radiation on humans. It's used to assess environmental heat stress in direct sunlight. |
