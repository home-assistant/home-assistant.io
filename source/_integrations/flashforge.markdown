---
title: Flashforge
description: Integration between Flashforge and Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_release: 2022.2
ha_codeowners:
  - '@joseffallman'
ha_iot_class: Local Polling
ha_domain: flashforge
ha_platforms:
  - sensor
---

[Flashforge](https://www.flashforge.com/) is the brand of a 3D printer manufactory.
This is the integration to integrate your 3D printer to Home Assistant.
Communication with the printer is done locally over you network, thus it's
necessary to that your printer is connected to wifi/ethernet.

The following printers from Flashforge have been tested with this
integration:

- [Adventurer 4](https://www.flashforge.com/product-detail/64)

{% include integrations/config_flow.md %}

## Sensor

The Flashforge integration lets you monitor various states of your 3D printer
and its print jobs. Supported sensors:

- Current Printer State
- Job Completed Percentage
- Current bed temperature
- Current extruder temperature
- Target bed temperature
- Target extruder temperature
