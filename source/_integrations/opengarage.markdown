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

{% include integrations/config_flow.md %}

## Supported functionality

This {% term integration %} provides entities to control and monitor your garage door. On devices that support it, it also adds a **Light** entity and **Remote control lock** entity.

### Administration

The {% term integration %} supports an administrator-only action to reset the device to Wi-Fi access point mode. This allows you to reconfigure Wi-Fi without losing settings and log data.

{% warning %}
The device goes offline immediately and stays offline until [Wi-Fi configuration](https://opengarage.github.io/OpenGarage-Firmware/1.2.5/manual/#step-1-power-up-and-ap-mode) is completed.
{% endwarning %}
