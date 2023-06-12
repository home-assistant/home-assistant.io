---
title: Hong Kong Observatory
description: Instructions on how to integrate the Hong Kong Observatory (HKO) Open Data API into Home Assistant.
ha_category:
  - Weather
ha_release: 2023.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@MisterCommand'
ha_domain: hko
ha_platforms:
  - weather
ha_integration_type: integration
---

The HKO integration retrieves weather data from the [Hong Kong Observatory Open Data API](https://www.hko.gov.hk/en/abouthko/opendata_intro.htm) for meteorological data in HKSAR.

The integration support the following platforms within Home Assistant:

- [Weather](#weather-platform)

It supports displaying the weather of your selected district and the 5-day weather forecast for Hong Kong.

{% include integrations/config_flow.md %}
