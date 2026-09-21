---
title: OpenGarage
description: Instructions on how to integrate OpenGarage.io covers within Home Assistant.
ha_category:
  - Cover
  - DIY
ha_iot_class: Local Polling
ha_release: 0.44
ha_domain: opengarage
ha_config_flow: true
ha_codeowners:
  - '@danielhiversen'
ha_platforms:
  - binary_sensor
  - button
  - cover
  - light
  - lock
  - sensor
ha_integration_type: device
---

The **OpenGarage** {% term integration %} lets you control the open-source [OpenGarage.io](https://opengarage.io/) device through Home Assistant.

## Administration

The {% term integration %} supports an administrator only action to reset the WiFi of an OpenGarage device.
**Warning**: the device _will go offline immediately_, and remain offline until it's WiFi is reconfigured.


{% include integrations/config_flow.md %}
