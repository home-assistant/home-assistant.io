---
title: Dremel 3D Printer
description: Instructions on how to integrate a Dremel 3D Printer into Home Assistant.
ha_category:
  - 3D Printing
  - Sensor
ha_iot_class: Local Polling
ha_release: 2023.2
ha_config_flow: true
ha_domain: dremel_3d_printer
ha_platforms:
  - Sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: device
---

The [Dremel 3D Printer](https://www.dremel.com/gn/en/digilab) can be added by knowing its Host IP address.

.

{% include integrations/config_flow.md %}

Supported models are 3D20, 3D40 and 3D45.
