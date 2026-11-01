---
title: AccuWeather
description: Instructions on how to integrate AccuWeather within Home Assistant.
ha_categories:
  - weather_alerts.forecasts
  - weather_alerts.air_quality_pollen
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: accuweather
ha_platforms:
  - diagnostics
  - sensor
  - weather
ha_integration_type: service
---

The **AccuWeather** {% term integration %} uses the [AccuWeather](https://accuweather.com/) web service as a source for weather data for your location. A paid subscription is required to use this integration.

## Prerequisites

To use this integration, you need an AccuWeather API key.

1. Go to the [AccuWeather APIs](https://developer.accuweather.com/) page and register an account.
2. Subscribe to one of the available plans. If you want to configure the integration for more than two locations, you need a plan higher than **Starter**.
3. In the **Subscriptions & Keys** section, create an application to generate an API key.

You can test your newly created API key on the [AccuWeather location search](https://developer.accuweather.com/core-weather/location-key-locations#location-search-by-location-key) page.

{% include integrations/config_flow.md %}

## Data updates

By default, the integration {% term polling polls %} the current weather condition data from the AccuWeather API every 10 minutes, daily forecast data every 6 hours, and hourly forecast data every 30 minutes.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
