---
title: Elexa Guardian
description: Instructions on how to integrate SimpliSafe into Home Assistant.
ha_iot_class: Local Polling
ha_release: '0.111'
ha_category:
  - Binary Sensor
  - Sensor
  - Switch
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: guardian
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - sensor
  - switch
---

The `guardian` integration integrates
[Elexa Guardian water valve controllers](https://getguardian.com) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- **Binary Sensor**: reports the status of the onboard leak detector and access point
- **Sensor**: reports on the device's detected temperature and uptime
- **Switch**: allows the user to open and close the valve

{% include integrations/config_flow.md %}

## Services

### `guardian.disable_ap`

Disable the device's onboard access point.

### `guardian.enable_ap`

Enable the device's onboard access point.

### `guardian.pair_sensor`

Add a new paired sensor to the valve controller.

| Service Data Attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `uid`                    | yes      | The unique device ID on the bottom of the sensor.|

### `guardian.reboot`

Reboot the device.

### `guardian.reset_valve_diagnostics`

Fully (and irrecoverably) reset all valve diagnostics.

### `guardian.unpair_sensor`

Remove a paired sensor from the valve controller.

| Service Data Attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `uid`                    | yes      | The unique device ID on the bottom of the sensor.|

### `guardian.upgrade_firmware`

Upgrade the device firmware.

| Service Data Attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `url`                    | yes      | The URL of the server hosting the firmware file. |
| `port`                   | yes      | The port on which the firmware file is served.   |
| `filename`               | yes      | The firmware filename.                           |

*Note:* not all service calls are available on all Guardian valve controller firmwares.
Please ensure you upgrade your valve controller to the latest firmware before opening
bugs related to non-working service calls.

## Paired Sensor Notes

When a paired sensor is first added to the valve controller, it may return inaccurate or
nonsensical values for several of its attributes, such as `battery` and `temperature`. This
is due to the sensor never having communicated its data to the valve controller and can
be fixed by moving the sensor around (so that it beeps, indicating that data has been
sent to the valve controller).
