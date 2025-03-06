---
title: SMLIGHT SLZB
description: The SMLIGHT SLZB integration allows users to monitor and manage their SMLIGHT SLZB-06x devices from directly within Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Sensor
  - Switch
  - Update
ha_release: 2024.9
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: smlight
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
  - switch
  - update
ha_codeowners:
  - '@tl-sl'
ha_integration_type: device
ha_dhcp: true
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
  
Core firmware on your SLZB-06x device must be `v2.3.6` or newer. If you have an older `v2.x.x` version, you can update from within Home Assistant. If you have `v0.9.9`, update using the [SMLIGHT web flasher](https://smlight.tech/flasher/#SLZB-06) before installing this integration.

{% include integrations/config_flow.md %}

## Integration entities

### Sensors

The following sensors will be created:

- **Core temperature** - Temperature of core ESP32
- **Zigbee temperature** - Temperature of Zigbee CC2652 or EFR32 chip
- **Core uptime** - Uptime of Core device
- **Zigbee uptime** - Uptime of Zigbee connection to ZHA/Z2M
- **RAM usage** - Monitor RAM Usage
- **FS usage** - Monitor filesystem usage
- **Connection mode** -  Connection mode - Ethernet, Wi-Fi, or USB
- **Ethernet** - Ethernet connection status
- **Internet** - Internet connection status
- **VPN** - WireGuard VPN client connection status
- **Wi-Fi** - Wi-Fi connection status
- **Firmware channel** - Channel for updates, stable, or development firmware or currently installed firmware.
- **Zigbee type** - Current mode of Zigbee chip. Coordinator, router, or Thread. Only works with official firmware installed via OTA in SMLIGHT web UI.

### Buttons

The following buttons will be created:

- **Core restart** - Restart core ESP32
- **Zigbee restart** - Restart Zigbee CCCC2652 or EFR32 chip
- **Zigbee flash mode** - Trigger the Zigbee chip into bootloader flash mode so it can be flashed. It is possible to flash Zigbee firmware over a network socket once this is activated.
- **Reconnect Zigbee router** - Place the router into pairing mode to join a new Zigbee network. This is only created if the SLZB-06x device is in Zibgee router mode.

### Switches

The following switches will be created:

- **Auto Zigbee update** - This allows the core firmware on SLZB-06x to manage Zigbee firmware updates and it will automatically install updates when they are released.
- **Disable LEDs** - Disable all LEDs on the SLZB-06x device.
- **LED night mode** - Enables night mode, which turns off the LEDs overnight, based on the times set in SLZB-06x web UI.
- **Enable VPN** - Enable WireGuard VPN client (requires configuration via the SMLIGHT web UI).

### Updates

The following update entities will be created:

- **Core firmware** - Core firmware updates of SLZB-06x firmware
- **Zigbee firmware** - Firmware updates of Zigbee chip

The updates offered in Home Assistant will match your currently installed firmware. This is based on the firmware channel (dev, release) and for Zigbee also on the firmware type (coordinator, router, Thread). If you wish to switch channels, install the different firmware type in the SMLIGHT web UI. You will get notifications when new firmware updates are available to install.
