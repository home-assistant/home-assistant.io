---
title: Instituto Português do Mar e Atmosfera (IPMA)
description: Instructions on how to integrate Instituto Português do Mar e Atmosfera weather conditions into Home Assistant.
ha_category:
  - Weather
ha_release: 0.72
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@dgomes'
  - '@abmantis'
ha_domain: ipma
ha_platforms:
  - weather
ha_integration_type: integration
---

The `ipma` weather platform uses the [Instituto Português do Mar e Atmosfera](https://www.ipma.pt/) as a source for current and forecast meteorological data.

{% include integrations/config_flow.md %}

IPMA provides both *hourly* (72h) and *daily* (10 days) forecasts, but you must choose which one will be exposed by the weather entity during initial setup of the integration.
