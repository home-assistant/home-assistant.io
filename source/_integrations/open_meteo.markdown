---
title: Open-Meteo
description: Instructions on how to integrate Open-Meteo within Home Assistant.
ha_category:
  - Weather
ha_release: 2022.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: open_meteo
ha_platforms:
  - diagnostics
  - weather
ha_integration_type: service
---

The Open-Meteo integration integrates the free weather forecast from
[Open-Meteo](https://open-meteo.com) with Home Assistant.

Open-Meteo offers free weather forecast APIs for open-source developers and
non-commercial use. No account or API key is required to use this service.

Open-Meteo collaborates with National Weather Services providing Open Data
with 11 to 2 km resolution. Their high-performance APIs select the best
weather model for your location.

{% include integrations/config_flow.md %}
