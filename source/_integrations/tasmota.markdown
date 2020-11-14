---
title: Tasmota (beta)
description: Instructions on how to integrate Tasmota with Home Assistant.
ha_category:
  - Binary Sensor
  - Light
  - Sensor
  - Switch
ha_release: '0.117'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@emontnemery'
ha_domain: tasmota
---

This integration allows you to control [Tasmota](https://tasmota.github.io/docs/) devices over MQTT.

## Requirements

- MQTT server and the [MQTT integration](/integrations/mqtt/) set up in Home Assistant.
- Tasmota devices flashed with version 9.1, or later.
- Tasmota devices configured for native discovery (`SetOption19 0`)

## Supported Features

Lights, relays, sensors, switches and buttons are supported.

- Lights will be added as Home Assistant `light` entities. Single channel Dimmers, RGB lights, RGB lights with Color Temperature control and RGB lights with White control are supported.
- Relays will be added as Home Assistant `switch` entities, if `SetOption30 = 0`. If `SetOption30 = 1`, relays will be added as `light` entities.
- Sensors will be added as Home Assistant `sensor` entities.
- Switches will be added as Home Assistant `binary_sensor` entities or `automation triggers` depending by the `switchmode` used when `SetOption114` is enabled.
- Buttons will be added as Home Assistant `automation triggers` when `SetOption73` is enabled.
- The integration will also create up to eight Status Sensors, each one with a different information. Please note all the Status Sensors are disabled by default.

![iot](https://user-images.githubusercontent.com/7702766/99080146-a1d43980-259f-11eb-856b-addb53695381.png)

## Configuration

This integration can be configured using the integrations in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Tasmota (beta)**.
After completing the configuration flow, the Tasmota integration will be
available.
