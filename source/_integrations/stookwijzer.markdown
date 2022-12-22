---
title: Stookwijzer
description: Instructions on how to use Stookwijzer data within Home Assistant
ha_category:
  - Binary Sensor
  - Environment
ha_release: 2022.12
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fwestenberg'
ha_domain: stookwijzer
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
ha_integration_type: service
---

The Stookwijzer integration queries the [Stookwijzer](https://www.stookwijzer.nu) API for windspeed, and gets the air quality index from [Luchtmeetnet](https://www.luchtmeetnet.nl). Using these parameters Stookwijzer advices people not to burn pallets, wood, or use the barbeque. This can prevent health problems for people in the area.

{% include integrations/config_flow.md %}
