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

The **WeatherFlow Cloud** integration provides access to cloud provided Weather Forecast of a user's Tempest Weather Stations. In order to access the station, you will need to configure the integration with an [Api Key](https://weatherflow.github.io/Tempest/api/).

{% include integrations/config_flow.md %}


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

