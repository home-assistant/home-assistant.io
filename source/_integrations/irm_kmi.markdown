---
title: IRM KMI Weather Belgium
description: Instructions on how to integrate IRM KMI weather within Home Assistant.
ha_release: '2025.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jdejaegh'
ha_domain: irm_kmi
ha_integration_type: service
related:
  - url: https://community.home-assistant.io/t/660421
    title: Community forum thread
ha_category: []
ha_quality_scale: bronze
ha_platforms:
  - weather
---

The **Royal Meteorological Institute of Belgium** {% term integration %} integrates the weather data from [IRM KMI (meteo.be)](https://www.meteo.be) with Home Assistant.

Although the provider is Belgian, the data is available for Belgium 🇧🇪, Luxembourg 🇱🇺, and The Netherlands 🇳🇱. 

The data provided by this integration is retrieved from their [mobile application](https://www.meteo.be/en/info/faq/products-services/the-rmi-weather-app). 


{% include integrations/config_flow.md %}

{% configuration_basic %}
Location:
    description: "The location for which you want to get weather data."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Language:
    description: "Override the Home Assistant language for the textual weather forecast. Useful if your Home Assistant language is not supported by the Royal Meteorological Institute of Belgium."
{% endconfiguration_basic %}

## Supported features

The integration provides a weather entity along with [weather forecast services](https://www.home-assistant.io/integrations/weather/#action-weatherget_forecasts).

## Limitations

1. The weather provider sometimes uses two weather conditions for the same day (see below). When this is the case, only the first weather condition is taken into account in this integration. <br/> <img src="/images/integrations/irm_kmi/monday.png" height="150" alt="Example of two weather conditions">

2. The trends for 14 days are not shown.

3. The provider only has data for Belgium, Luxembourg and The Netherlands. 

## Data updates

The integration {% term polling polls %} weather data every 7 minutes by default.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
