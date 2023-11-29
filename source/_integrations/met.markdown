---
title: Meteorologisk institutt (Met.no)
description: Instructions on how to integrate Met.no within Home Assistant.
ha_category:
  - Weather
ha_release: 0.79
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@danielhiversen'
ha_domain: met
ha_platforms:
  - weather
ha_integration_type: integration
---

The `met` platform uses the [Met.no](https://met.no/) web service as a source for meteorological data for your location. The weather forecast is delivered by the Norwegian Meteorological Institute and the NRK.

{% include integrations/config_flow.md %}
