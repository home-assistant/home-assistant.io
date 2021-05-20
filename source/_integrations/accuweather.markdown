---
title: AccuWeather
description: Instructions on how to integrate Accuweather within Home Assistant.
ha_category:
  - Weather
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: accuweather
ha_quality_scale: platinum
ha_platforms:
  - sensor
  - weather
---

The AccuWeather integration uses the [AccuWeather](https://accuweather.com/) web service as a source for weather data for your location.

## Setup

To generate an AccuWeather API key, go to [AccuWeather APIs](https://developer.accuweather.com/) page, register and create application with product **Limited Trial**.

{% include integrations/config_flow.md %}

<div class="note warning">

Due to limitations of the terms of use of AccuWeather free API key, it is possible to configure only one integration instance.
The Limited Trial account only allows 50 API calls per day.

</div>
