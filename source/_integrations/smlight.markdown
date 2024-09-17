---
title: SMLIGHT SLZB
description: The SMLIGHT SLZB integration allows users to monitor and manage their SMLIGHT SLZB-06x devices from directly within Home Assistant.
ha_category:
  - Sensor
ha_release: 2024.9
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: smlight
ha_zeroconf: true
ha_platforms:
  - sensor
ha_codeowners:
  - '@tl-sl'
ha_integration_type: device
---

The [SMLIGHT](https://smlight.tech) SLZB-06x Ethernet Zigbee coordinators
provide a convenient way to add Zigbee to your smart home setup.

The **SMLIGHT SLZB** {% term integration %} allows users to monitor and manage their SLZB-06x devices
directly from within Home Assistant and to directly access many of the
features found in the SMLIGHT web UI. You can also use these in your automations.

## Prerequisites

You need a supported SLZB-06 adapter.

 This integration has been tested with the following devices:

- [SLZB-06](https://smlight.tech/product/slzb-06)
- [SLZB-06M](https://smlight.tech/product/slzb-06m)
- [SLZB-06p7](https://smlight.tech/product/slzb-06p7)
- [SLZB-06p10](https://smlight.tech/product/slzb-06p10/)

Core firmware on your SLZB-06x device must be `2.3.6` or newer. If you have an older version, update using the SMLIGHT Web UI before installing this integration.
  
{% include integrations/config_flow.md %}

## Integration entities

The following sensors will be created:

- **Core Temperature** - Temperature of core ESP32
- **Zigbee Temperature** - Temperature of Zigbee CC2652 or EFR32 chip
- **Core Uptime** - Uptime of Core device
- **Zigbee Uptime** - Uptime of Zigbee connection to ZHA/Z2M
- **RAM Usage** - Monitor RAM Usage
- **FS Usage** - Monitor filesystem usage
