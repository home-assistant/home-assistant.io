---
title: Ambient Weather Network
description: How to integrate Ambient Weather Network station within Home Assistant.
ha_category:
  - Weather
ha_release: 2023.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@thomaskistler'
ha_domain: ambient_network
ha_platforms:
  - sensor
ha_integration_type: hub
---

The **Ambient Weather Network** {% term integration %} retrieves local weather station information
via the [Ambient Weather Network](https://ambientweather.net).

Similar to the [Ambient Weather Station](https://www.home-assistant.io/integrations/ambient_station/)
integration, this integration gathers sensor data from individual weather stations.
However, in contrast to the [Ambient Weather Station](https://www.home-assistant.io/integrations/ambient_station/)
integration, which exclusively enables owners to fetch data solely from their owned stations, the new
integration directly pulls public data from <https://ambientwether.net/> without requiring an API key,
albeit with a reduced dataset (e.g., excluding indoor sensors).

## Virtual Weather Stations

This integration enables the creation of virtual weather stations by aggregating data from multiple physical stations.
To establish virtual stations, users can easily choose several physical stations during the setup process. The data
for these virtual stations undergoes automatic cleansing, which involves removing information from offline stations
and filtering out data outliers through the use of a [median absolute deviation (MAD)](https://en.wikipedia.org/wiki/Median_absolute_deviation) 
algorithm.

{% include integrations/config_flow.md %}
