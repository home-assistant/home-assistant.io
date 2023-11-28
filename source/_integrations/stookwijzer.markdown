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

The Stookwijzer integration queries the [Atlas Leefomgeving Stookwijzer](https://www.atlasleefomgeving.nl/stookwijzer) API for air quality index and windspeed. Combining these values, Stookwijzer advises people not to burn pallets or wood, or to use the barbecue. This can prevent health problems for people in the area.

The Stookwijzer can provide three different advices:

- Code Yellow: Please note: heating causes nuisance and air pollution.
- Code Orange: It is better not to burn wood now.
- Code Red: Do not burn wood.

{% include integrations/config_flow.md %}
