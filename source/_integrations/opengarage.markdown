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

## Supported functionality

This integration provides entities to control and monitor your garage door. On devices that support it, it also adds **Light** and **Lock** entities.

## Administration

The {% term integration %} supports an administrator-only action to reset the device to access point mode for Wi-Fi setup.

{% warning %}
The device goes offline immediately and stays offline until you finish setting up Wi-Fi again.
{% endwarning %}

{% include integrations/config_flow.md %}
