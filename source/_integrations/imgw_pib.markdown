---
title: IMGW-PIB
description: Instructions on how to integrate IMGW-PIB (Polish Institute of Meteorology and Water Management - National Research Institute) hydrological service within Home Assistant.
ha_category:
  - Environment
ha_release: 2024.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: imgw_pib
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

IMGW-PIB integration uses hydrological data from [Institute of Meteorology and Water Management - National Research Institute](https://hydro.imgw.pl) to present information about rivers and water reservoirs in Poland.

## Sensors

Sensor entities added to Home Assistant:

- Water level
- Water temperature (if a given hydrological station supports it)

## Setup

{% include integrations/config_flow.md %}
