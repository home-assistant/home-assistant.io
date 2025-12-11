---
title: Dremel 3D Printer
description: Instructions on how to integrate a Dremel 3D Printer into Home Assistant.
ha_category:
  - 3D printing
  - Sensor
ha_iot_class: Local Polling
ha_release: 2023.7
ha_config_flow: true
ha_domain: dremel_3d_printer
ha_platforms:
  - binary_sensor
  - button
  - camera
  - sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: device
---

The [Dremel 3D Printer](https://www.dremel.com/gn/en/digilab) integration allow you to monitor your Dremel 3D printer and its progress with your Home Assistant installation. This integration is currently limited to the 3D20, 3D40 and 3D45.

{% include integrations/config_flow.md %}
