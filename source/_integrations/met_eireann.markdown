---
title: Met Éireann
description: Instructions on how to integrate Met Éireann with Home Assistant.
ha_category:
  - Weather
ha_release: 2021.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@DylanGore'
ha_domain: met_eireann
ha_platforms:
  - weather
ha_integration_type: integration
---

The Met Éireann integration uses the [Met Éireann](https://met.ie) (The Irish Meteorological Service) Public Weather Forecast API to provide current and forecasted weather data for a given location. This integration is in no way affiliated with or endorsed by Met Éireann.

{% note %}
The Met Éireann API will only provide data for Ireland, the UK and a small part of northern France. For specific coverage, please see the Notes on API document available [here](https://data.gov.ie/dataset/met-eireann-weather-forecast-api/resource/027da6d5-d819-48d1-9b16-331dba169bd1).
{% endnote %}

{% include integrations/config_flow.md %}

## Data license

The data provided by Met Éireann is licensed under the Met Éireann Open Data Custom License (similar to a Creative Commons CC BY 4.0 license). A license summary and the full license are available [here](https://data.gov.ie/dataset/met-eireann-weather-forecast-api/resource/027da6d5-d819-48d1-9b16-331dba169bd1). In short, if you distribute, broadcast or make Met Éireann data available on the public internet you must give credit to Met Éireann and display their weather warnings.

## Data changes

The only changes made to the data gathered from the API are the condition descriptions which are mapped to the weather conditions supported by Home Assistant.
