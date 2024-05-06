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
