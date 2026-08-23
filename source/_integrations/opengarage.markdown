---
title: OpenGarage
description: Instructions on how to integrate OpenGarage.io devices with Home Assistant.
ha_category:
  - Cover
  - DIY
  - Light
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
  - sensor
ha_integration_type: device
---

The **OpenGarage** {% term integration %} lets you control the open-source [OpenGarage.io](https://opengarage.io/) device through Home Assistant.

On supported devices, the integration also provides a light entity for controlling the garage door opener light. The light entity is created only when OpenGarage reports light support.

{% include integrations/config_flow.md %}
