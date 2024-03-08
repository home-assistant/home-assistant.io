---
title: WeatherFlow Cloud
description: Instructions on the Cloud based WeatherFlow integration
ha_release: 2024.3
ha_category:
  - Environment
  - Sensor
  - Weather
ha_platforms:
  - sensor
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

<!-- ## Sensors

Additionally, this integration provides access to the following sensors

| Sensor                        | Description                                                                                   |
|-----------------------------|-----------------------------------------------------------------------------------------------|
| Air Temperature             | The measure of the hotness or coldness of the air in a particular environment, usually reported in degrees Celsius (°C) or Fahrenheit (°F). |
| Feels Like                  | A calculated temperature that factors in the humidity and wind to estimate how the air temperature feels to the human body. |
| Heat Index                  | A measure that combines air temperature and humidity to determine the human-perceived equivalent temperature, indicating how hot it feels. |
| Wet Bulb Temperature        | The lowest temperature that can be reached by evaporating water into the air at constant pressure, which is a measure of moisture in the air. |
| Wet Bulb Globe Temperature | A composite temperature used to estimate the effect of temperature, humidity, wind speed, and solar radiation on humans. It's used to assess environmental heat stress in direct sunlight. | -->


### Temperature Sensors
| Sensor                        | Description                                                                                   |
|-------------------------------|-----------------------------------------------------------------------------------------------|
| Air Temperature               | The measure of the hotness or coldness of the air, usually reported in °C or °F.              |
| Feels Like                    | A calculated temperature factoring in humidity and wind to estimate how the air feels to the body. |
| Heat Index                    | A measure combining air temperature and humidity to indicate the human-perceived temperature.  |
| Wet Bulb Temperature          | The lowest temperature achievable by evaporating water into the air, indicating air moisture.  |
| Wet Bulb Globe Temperature    | A composite measure used to assess environmental heat stress in direct sunlight.               |
| Wind Chill                    | Estimates how cold the air feels on exposed skin due to wind speed combined with air temperature. |

### Air Sensors
| Sensor             | Description                                                                                   |
|--------------------|-----------------------------------------------------------------------------------------------|
| Air Density | The mass per unit volume of Earth's atmosphere. Air density decreases with higher altitude, warmer temperature, and increasing humidity. It's crucial for various calculations, including aircraft performance and weather prediction. |
| Barometric Pressure | The pressure exerted by the atmosphere at any given point. It's an essential measure in meteorology, influencing weather patterns and used for forecasting changes in the weather.   |


### Wind Sensors
| Sensor          | Description                                                                                         |
|-----------------|-----------------------------------------------------------------------------------------------------|
| Wind Speed      | The rate at which air is moving in the atmosphere at a specific location and time.                 |
| Wind Lull            | The minimum wind speed observed over a specific period, representing periods of minimal wind.      |
| Wind Gust            | A sudden, brief increase in wind speed, significantly higher than the average wind speed.           |
| Wind Direction       | The course along which the wind is blowing, typically reported from the direction it originates.   |
| Wind Cardinal Direction | The most commonly used forms of direction: North, East, South, and West.                             |