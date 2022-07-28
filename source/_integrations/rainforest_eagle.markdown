---
title: Rainforest Eagle
description: Instructions on how to setup the Rainforest Eagle with Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.97
ha_iot_class: Local Polling
ha_codeowners:
  - '@gtdiehl'
  - '@jcalbert'
  - '@hastarin'
ha_domain: rainforest_eagle
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
ha_dhcp: true
ha_integration_type: integration
---

Integrate energy usage and price from the Rainforest Automation's [Eagle-200](https://rainforestautomation.com/rfa-z114-eagle-200/)
and [Legacy Eagle](https://rainforestautomation.com/support/rfa-z109-eagle-support/) energy gateways. The price will only be included if it is provided by the electricity meter. If you picked an electricity plan in the app, the price data will not be available.

{% include integrations/config_flow.md %}
