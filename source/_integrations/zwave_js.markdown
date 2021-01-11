---
title: Z-Wave JS
description: Instructions on how to integrate Z-Wave with Home Assistant via Z-Wave JS.
ha_category:
  - Hub
  - Light
  - Sensor
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

- Platform support is currently limited to basic `sensor` and `light` entities.
- You will need to use another tool, such as [zwavejs2mqtt](https://github.com/zwave-js/zwavejs2mqtt), to include/exclude devices and manage device configuration.
