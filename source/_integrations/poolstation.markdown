---
title: Poolstation
description: Instructions on how to integrate Poolstation devices within Home Assistant.
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 2021.11
ha_category:
  - Sensor
ha_codeowners:
  - '@cibernox'
ha_domain: poolstation
ha_platforms:
  - sensor
ha_quality_scale: silver
---

The Poolstation integration allows you to control and monitor your pool equipment, like Idegis and AstralPool chlorinators, that connect to the [Poolstation](https://poolstation.net) cloud platform.
It provides sensors for current pH level, temperature, electrolysis production and salt concentration.

{% include integrations/config_flow.md %}
