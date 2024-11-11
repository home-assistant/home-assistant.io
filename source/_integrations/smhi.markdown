---
title: SMHI
description: Instructions on how to integrate SMHI forecasts within Home Assistant.
ha_category:
  - Hub
  - Weather
ha_release: 0.81
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: smhi
ha_platforms:
  - weather
ha_codeowners:
  - '@gjohansson-ST'
ha_integration_type: integration
---

The `smhi` integration adds support for the [SMHI.se](https://www.smhi.se/) web service as a source for meteorological data for your location.

There is currently support for the following device types within Home Assistant:

- Weather

{% include integrations/config_flow.md %}


The SMHI weather service is free under the Creative Commons Attribution 4.0, international license. Weather data will be pulled once every 30 minutes.

{% important %}
Only location close to Sweden can be added. See [SMHI.se area](https://opendata.smhi.se/apidocs/metfcst/geographic_area.html) for more details what locations are supported.
{% endimportant %}

Details about the API are available in the [SMHI API documentation](https://opendata.smhi.se/apidocs/metfcst/index.html).
