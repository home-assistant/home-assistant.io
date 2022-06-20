---
title: RIVM Stookalert
description: Instructions on how to use Stookalert data within Home Assistant
ha_category:
  - Binary Sensor
  - Environment
ha_release: 0.104
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fwestenberg'
  - '@frenck'
ha_domain: stookalert
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
ha_integration_type: integration
---

The Stookalert integration queries the [RIVM Stookalert](https://www.rivm.nl/stookalert) API for unfavorable weather conditions or poor air quality. With a Stookalert, the RIVM calls on people not to burn wood. This can prevent health problems in people in the area.

{% include integrations/config_flow.md %}
