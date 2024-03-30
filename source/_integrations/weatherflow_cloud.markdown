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

### Which integration should I use

The [WeatherFlow](https://www.home-assistant.io/integrations/weatherflow) integration provides local communications with your weather station via UDP. It returns raw sensor data readings.
The [WeatherFlow Cloud](https://www.home-assistant.io/integrations/weatherflow_cloud) integration provides a data feed reflective of what is presented in the Tempest mobile application - including Forecast data. WeatherFlow explains the differences in their FAQ:

> Can I access data from the hardware locally? To ensure access to the best data, all third-party applications and integrations should use the remote interfaces (REST & Websockets) as their primary source for data, even if they are running on the same network as the local Tempest device. There is also a local UDP interface available for those applications that require completely off-grid applications, but this should only be used as a backup to the remote interfaces.

{% include integrations/config_flow.md %}

### Temperature Sensors

| Sensor | Description |
| --- | --- |
| Dew point | The temperature to which air must be cooled to become saturated with water vapor. |
| Feels like | An index that combines temperature and humidity to determine the apparent temperature. |
| Heat index | A measure of how hot it feels when relative humidity is factored in with the actual air temperature. |
| Temperature | The degree or intensity of heat present in the area. |
| Wet bulb globe temperature | A composite temperature used to estimate the effect of temperature, humidity, wind speed, and solar radiation on humans. |
| Wet bulb temperature | The lowest temperature that can be reached under current ambient conditions by the evaporation of water only. |
| Wind chill | The lowering of body temperature due to the passing-flow of lower-temperature air. |

### Wind Sensors

| Sensor | Description |
| --- | --- |
| Wind direction | The direction from which the wind is coming. |
| Wind direction (cardinal) | The cardinal direction from which the wind is coming. |
| Wind gust | A brief increase in the speed of the wind. |
| Wind lull | The lowest speed during a specified time period. |

### Air Sensors

| Sensor | Description |
| --- | --- |
| Air density | The mass per unit volume of Earth's atmosphere. |
| Pressure barometric | The pressure exerted by the atmosphere at the earth's surface. |
| Pressure sea level | The atmospheric pressure at mean sea level. |
| Pressure station | The atmospheric pressure at the station level. |

### Lightning Sensors

| Sensor | Description |
| --- | --- |
| Lightning count | The total number of lightning strikes. |
| Lightning count last 1 hr | The number of lightning strikes in the last hour. |
| Lightning count last 3 hr | The number of lightning strikes in the last three hours. |
| Lightning last | The most recent lightning strike. |
| Lightning last distance | The distance of the most recent lightning strike. |
