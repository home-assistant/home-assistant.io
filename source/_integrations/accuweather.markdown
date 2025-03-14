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

The **AccuWeather** {% term integration %} uses the [AccuWeather](https://accuweather.com/) web service as a source for weather data for your location.

## Setup

To generate an AccuWeather API key, go to [AccuWeather APIs](https://developer.accuweather.com/) page, register and create application with the following settings:
- Products
  - Core Weather
    - **Core Weather Limited Trial**
  - Minute Cast
    - **None**
- Where will the API be used? 
  - **Other**
- What will you be creating with this API?
  - **Internal App**
- What programming language is your APP written in? 
  - **Python**
- Is this for Business to Business or Business to Consumer use?
  - **Business to Business**
- Is this Worldwide or Country specific use?
  - **Worldwide**

You can test your newly created API key [here](https://developer.accuweather.com/accuweather-current-conditions-api/apis)

{% include integrations/config_flow.md %}

{% important %}
Due to limitations of the terms of use of AccuWeather free API key, it is possible to configure only one integration instance.
The Limited Trial account only allows 50 API calls per day.
{% endimportant %}
