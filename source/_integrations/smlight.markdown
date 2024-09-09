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
  - button
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
  
{% include integrations/config_flow.md %}

## Integration entities

The following sensors will be created:

- **Core Temperature** - Temperature of core ESP32
- **Zigbee Temperature** - Temperature of Zigbee CC2652 or EFR32 chip
- **Core Uptime** - Uptime of Core device
- **Zigbee Uptime** - Uptime of Zigbee connection to ZHA/Z2M
- **RAM Usage** - Monitor RAM Usage
- **FS Usage** - Monitor filesystem usage
- **Ethernet** - Ethernet connection status
- **Wi-Fi** - Wi-Fi connection status

The following buttons will be created:

- **Core restart** - Restart core ESP32
- **Zigbee restart** - Restart Zigbee CCCC2652 or EFR32 chip
- **Zigbee flash mode** - Trigger the Zigbee chip into bootloader flash mode so it can be flashed. It is possible to flash Zigbee firmware over a network socket once this is activated.

### Switches

The following switches will be created:

- **Disable LEDs** - Disable all LEDs on the SLZB-06x device.
- **LED night mode** - Enables night mode, which turns off the LEDs overnight, based on the times set in SLZB-06x web UI.
- **Auto Zigbee update** - This allows the core firmware on SLZB-06x to manage Zigbee firmware updates and it will automatically install updates when they are released.
