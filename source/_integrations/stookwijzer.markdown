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

The Stookwijzer integration queries the [Stookwijzer](https://www.stookwijzer.nu) API for windspeed and gets the air quality index from [Luchtmeetnet](https://www.luchtmeetnet.nl). Using these parameters, Stookwijzer advises people not to burn pallets or wood, or to use the barbecue. This can prevent health problems for people in the area.

{% include integrations/config_flow.md %}
