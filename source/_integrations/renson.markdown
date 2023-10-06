---
title: Renson
description: Instructions on how to integrate Renson Endura Delta sensors into Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Sensor
  - Number
  - Fan
ha_release: 2023.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@jimmyd-be'
ha_domain: renson
ha_platforms:
  - binary_sensor
  - button
  - sensor
  - number
  - fan
ha_integration_type: integration
---

The Renson integration pulls data from the Renson Endura delta or Healthbox 3 devices. Most of the sensors that can be monitored from inside the Android/iOS application can be monitored with this integration.

Not all features are supported for all the different devices.

Renson devices that are supported:

- Renson Endura Delta 330
- Renson Endura Delta 380
- Renson Endura Delta 450
- Renson Healthbox 3.0

{% include integrations/config_flow.md %}
