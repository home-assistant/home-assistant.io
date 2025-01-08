---
title: Ambient Weather Network
description: How to integrate Ambient Weather Network station within Home Assistant.
ha_category:
  - Weather
ha_release: 2024.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@thomaskistler'
ha_domain: ambient_network
ha_platforms:
  - sensor
ha_integration_type: service
---

The **Ambient Weather Network** {% term integration %} retrieves local weather station information
via the [Ambient Weather Network](https://ambientweather.net).

Similar to the [Ambient Weather Station](https://www.home-assistant.io/integrations/ambient_station/)
integration, this integration gathers sensor data from individual weather stations.
However, in contrast to the [Ambient Weather Station](https://www.home-assistant.io/integrations/ambient_station/)
integration, which exclusively enables owners to fetch data solely from their owned stations, this
integration directly pulls public data from <https://ambientweather.net> without requiring an API key,
albeit with a reduced dataset (for example, excluding indoor sensors).

{% include integrations/config_flow.md %}
