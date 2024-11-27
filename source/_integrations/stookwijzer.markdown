---
title: Stookwijzer
description: Instructions on how to use Stookwijzer data within Home Assistant
ha_category:
  - Environment
  - Sensor
ha_release: 2023.2
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fwestenberg'
ha_domain: stookwijzer
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The **Stookwijzer** {% term integration %} queries the [Atlas Leefomgeving Stookwijzer](https://www.atlasleefomgeving.nl/stookwijzer) API for windspeed and air quality index. Based on these values, Stookwijzer advises people not to burn pallets or wood or use barbecues. This can help prevent health issues for people in the area.

The state can provide three different levels of recommendations:

- **Code Yellow**: Please note: burning wood causes discomfort and air pollution.
- **Code Orange**: It is recommended not to burn wood now.
- **Code Red**: Do not burn wood now.

Additionally, various sensor entities are provided:

- **Windspeed**: Sensor containing the current windspeed at the selected location.
- **Air Quality Index**: Sensor containing the air quality index at the selected location.

{% include integrations/config_flow.md %}
