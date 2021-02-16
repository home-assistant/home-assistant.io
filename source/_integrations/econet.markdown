---
title: Rheem EcoNet Products
description: Instructions on how to integrate Rheem EcoNet water heaters into Home Assistant.
ha_category:
  - Water Heater
ha_release: 0.61
ha_iot_class: Cloud Push
ha_domain: econet
ha_codeowners:
  - '@vangorra'
  - '@w1ll1am23'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
  - water_heater
---

The `econet` water heater platform is consuming the information provided by a [EcoNet enabled Rheem water heater](https://www.rheem.com/EcoNet/Home). This platform allows you to set the temperature, the operation mode, and away mode. It also provides access to several device sensors depending on your model of water heater.

{% include integrations/config_flow.md %}
