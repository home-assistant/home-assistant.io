---
title: Z-Wave JS
description: Instructions on how to integrate Z-Wave with Home Assistant via Z-Wave JS.
ha_category:
  - Binary Sensor
  - Climate
  - Cover
  - Fan
  - Hub
  - Light
  - Lock
  - Sensor
  - Switch
ha_release: '2021.2'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@home-assistant/z-wave'
ha_domain: zwave_js
---

This integration allows you to control a Z-Wave network via Z-Wave JS.

## Requirements

### Core installation

- The [zwave-js-server](https://github.com/zwave-js/zwave-js-server) installed and running in your network.

### Hardware requirements

- [Supported Z-Wave dongle](/docs/z-wave/controllers/#supported-z-wave-usb-sticks--hardware-modules). The Z-Wave controller dongle should be connected to the same host as where the Z-Wave JS server is running.

## Configuration

This integration can be configured using the integrations in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Z-Wave JS**.
After completing the configuration flow, the Z-Wave JS integration will be
available.

## Current Limitations

As this integration is still in the early stages there are some important limitations to be aware of.

- You will need to use another tool, such as [zwavejs2mqtt](https://github.com/zwave-js/zwavejs2mqtt), to include/exclude devices and manage device configuration.

## Services

### Service `zwave_js.set_lock_usercode`

This service will set the usercode of a lock to X at code slot Y.
Valid usercodes are at least 4 digits.

| Service Data Attribute | Required | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            | no       | Lock entity or list of entities to set the usercode. |
| `code_slot`            | yes      | The code slot to set the usercode into.              |
| `usercode`             | yes      | The code to set in the slot.                         |

### Service `zwave_js.clear_lock_usercode`

This service will clear the usercode of a lock in code slot X.
Valid code slots are between 1-254.

| Service Data Attribute | Required | Description                                            |
| ---------------------- | -------- | ------------------------------------------------------ |
| `entity_id`            | no       | Lock entity or list of entities to clear the usercode. |
| `code_slot`            | yes      | The code slot to clear the usercode from.              |
