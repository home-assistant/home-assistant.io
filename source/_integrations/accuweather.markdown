---
title: AccuWeather
description: Instructions on how to integrate Accuweather within Home Assistant.
ha_category:
  - Weather
ha_release: 0.113
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: accuweather
---

The `accuweather` integration uses the [AccuWeather](https://accuweather.com/) web service as a source for weather data for your location.

## Setup

To generate an AccuWeather API key, go to [AccuWeather APIs](https://developer.accuweather.com) page, register and create application with product **Limited Trial**.

## Configuration

To add AccuWeather to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **AccuWeather**. By default, the values will be taken from the Home Assistant configuration. Weather forecast is not enabled by default. You can enable it in the integration options.

<div class="note warning">

Due to limitations of the terms of use of AccuWeather free API key, it is possible to configure only one integration instance.

</div>
