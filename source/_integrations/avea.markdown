---
title: Elgato Avea
description: Instructions on how to integrate Elgato Avea with Home Assistant.
ha_category:
  - Light
ha_bluetooth: true
ha_release: 0.97
ha_iot_class: Local Polling
ha_codeowners:
  - '@pattyland'
ha_domain: avea
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: device
---

The **Elgato Avea** {% term integration %} allows you to control Avea Bluetooth light bulbs with Home Assistant.

## Supported devices

- Elgato Avea bulbs

{% include integrations/config_flow.md %}

The Elgato Avea integration automatically discovers bulbs once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional. If a bulb is not discovered automatically, you can add the integration manually and select it by Bluetooth address.
