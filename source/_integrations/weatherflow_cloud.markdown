---
title: WeatherflowCloud
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

The **WeatherFlow Cloud** integration provides access to cloud provided Weather Forecast of a user's Tempest Weather Stations. In order to access the station, you will need to configure the integration with an [Api Key](https://weatherflow.github.io/Tempest/api/).

### Which integration(s) should I use

There are two integrations for WeatherFlow devices, and you are not limited to selecting just one.

- [WeatherFlow](/integrations/weatherflow) is a *local only* `UDP`-based integration that will read data directly from the device. This integration does require the Home Assistant server and the WeatherFlow device to be on the same subnet.

- [WeatherFlow Cloud](/integrations/weatherflow_cloud) is a *cloud*-based integration that closely mirrors the data available via the Weatherflow Tempest mobile applications and is likely a good starting place for most users as it provides both **Forecast** and **Sensor** data. 
{% include integrations/config_flow.md %}

### Temperature sensors

| Sensor | Description |
| --- | --- |
| Dew point | The temperature to which air must be cooled to become saturated with water vapor. |
| Feels like | An index that combines temperature and humidity to determine the apparent temperature. |
| Heat index | A measure of how hot it feels when relative humidity is factored in with the actual air temperature. |
| Temperature | The degree or intensity of heat present in the area. |
| Wet bulb globe temperature | A composite temperature used to estimate the effect of temperature, humidity, wind speed, and solar radiation on humans. |
| Wet bulb temperature | The lowest temperature that can be reached under current ambient conditions by the evaporation of water only. |
| Wind chill | The lowering of body temperature due to the passing-flow of lower-temperature air. |

### Air sensors

| Sensor | Description |
| --- | --- |
| Air density | The mass per unit volume of Earth's atmosphere. |
| Pressure barometric | The pressure exerted by the atmosphere at the earth's surface. |
| Pressure sea level | The atmospheric pressure at mean sea level. |
| Pressure station | The atmospheric pressure at the station level. |

### Lightning sensors

| Sensor | Description |
| --- | --- |
| Lightning count | The total number of lightning strikes. |
| Lightning count last 1 hr | The number of lightning strikes in the last hour. |
| Lightning count last 3 hr | The number of lightning strikes in the last three hours. |
| Lightning last | The most recent lightning strike. |
| Lightning last distance | The distance of the most recent lightning strike. |

## Weather icons

There is not a straight 1-1 mapping between the Home Assistant supported weather conditions and what tempest provides - as such you may see a difference between what is displayed in the tempest app and what is displayed in Home Assistant.

| Weather Flow icon | Home Assistant icon |
|-------------------|----------------------|
| clear-day | sunny |
| clear-night | clear-night |
| cloudy | cloudy |
| foggy | fog |
| partly-cloudy-day | partlycloudy |
| partly-cloudy-night | partlycloudy |
| possibly-rainy-day | rainy |
| possibly-rainy-night | rainy |
| possibly-sleet-day | snowy-rainy |
| possibly-sleet-night | snowy-rainy |
| possibly-snow-day | snowy |
| possibly-snow-night | snowy |
| possibly-thunderstorm-day | lightning-rainy |
| possibly-thunderstorm-night | lightning-rainy |
| rainy | rainy |
| sleet | snowy-rainy |
| snow | snowy |
| thunderstorm | lightning |
| windy | windy |
