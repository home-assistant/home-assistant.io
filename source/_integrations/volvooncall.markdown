---
title: Volvo On Call
description: Instructions for how to integrate Volvo On Call into Home Assistant.
ha_category:
  - Car
ha_release: 0.39
ha_iot_class: Cloud Polling
ha_domain: volvooncall
ha_platforms:
  - binary_sensor
  - device_tracker
  - lock
  - sensor
  - switch
ha_codeowners:
  - '@molobrakos'
  - '@decompil3d'
ha_integration_type: integration
---

The `volvooncall` integration offers integration with the [Volvo On Call](https://www.volvocars.com/intl/why-volvo/human-innovation/future-of-driving/connectivity/volvo-on-call) cloud service and offers presence detection as well as sensors such as odometer and fuel level.

{% include integrations/config_flow.md %}
