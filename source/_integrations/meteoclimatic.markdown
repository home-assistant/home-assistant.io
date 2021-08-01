---
title: Meteoclimatic
description: Instructions on how to integrate Meteoclimatic within Home Assistant.
ha_release: 2021.6
ha_iot_class: Cloud Polling
ha_category:
  - Weather
ha_codeowners:
  - '@adrianmo'
ha_config_flow: true
ha_domain: meteoclimatic
ha_platforms:
  - weather
---

The Meteoclimatic integration uses the [Meteoclimatic](https://www.meteoclimatic.net/) web service as a source for meteorological data for your location. The location is based on the Meteoclimatic station code (e.g., `ESCAT4300000043206B`) and the weather data reported is based on the capabilities of each station.

There is currently support for the following platforms within Home Assistant:

- Weather

It displays the current weather reported by specific Meteoclimatic stations.

{% include integrations/config_flow.md %}
