---
title: Guardian
description: Instructions on how to integrate SimpliSafe into Home Assistant.
ha_release: "0.110"
ha_category:
  - Binary Sensor
  - Sensor
  - Switch
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: guardian
---

The `guardian` integration integrates
[Elexa Guardian water valve controllers](https://getguardian.com) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- **Binary Sensor**: reports the status of the onboard leak detector and access point
- **Sensor**: reports on the device's detected temperature and uptime
- **Switch**: allows the user to open and close the valve

## Configuration

This integration can be configured via the Home Assistant UI by navigating to
**Configuration** -> **Integrations**. If you have the `zeroconf` integration enabled,
Home Assistant will automatically discover any Guardian devices already connected to the
network.

## Services

### `guardian.disable_ap`

Disable the device's onboard access point.

### `guardian.enable_ap`

Enable the device's onboard access point.

### `guardian.reboot`

Reboot the device.

### `guardian.reset_valve_diagnostics`

Fully (and irrecoverably) reset all valve diagnostics.

### `guardian.upgrade_firmware`

Upgrade the device firmware.

| Service Data Attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `url`                    | yes      | The URL of the server hosting the firmware file. |
| `port`                   | yes      | The port on which the firmware file is served.   |
| `filename`               | yes      | The firmware filename.                           |
