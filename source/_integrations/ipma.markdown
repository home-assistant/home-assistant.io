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
---

The `ipma` weather platform uses the [Instituto Português do Mar e Atmosfera](https://www.ipma.pt/) as a source for current and forecast meteorological data.

{% include integrations/config_flow.md %}
