---
title: AccuWeather
description: Instructions on how to integrate AccuWeather within Home Assistant.
ha_category:
  - Weather
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

## Setup

To generate an AccuWeather API key, go to [AccuWeather APIs](https://developer.accuweather.com/) page, register, subscribe to one of the available plans and create application in **Subscriptions & Keys** section.

You can test your newly created API key [here](https://developer.accuweather.com/core-weather/location-key-locations#location-search-by-location-key)

{% include integrations/config_flow.md %}

## Data updates

By default, the integration {% term polling polls %} the current weather condition data from the AccuWeather API every 10 minutes, daily forecast data every 6 hours and hourly forecast data every 30 minutes. If you want to configure the integration for more than two locations, you need a plan higher than **Starter**.
