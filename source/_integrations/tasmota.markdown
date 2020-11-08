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

This integration allows you to control Tasmota devices over MQTT.

## Requirements

- MQTT server and the [MQTT integration](/integrations/mqtt/) set up in Home Assistant.
- Tasmota devices flashed with 9.0.0.3 or later
- Tasmota devices configured for native discovery (`SetOption19 0`)

## Limitations

Lights, relays, sensors and switches are supported.

- Lights will be added as Home Assistant `light` entities.
- Relays will be added as Home Assistant `switch` entities, if `SetOption30 = 0`. If `SetOption30 = 1`, relays will be added as `light` entities.
- Sensors will be added as Home Assistant `sensor` entities.
- Switches will be added as Home Assistant `binary_sensor` entities or `automation triggers` depending by the `switchmode` used. To enable them, `switchtopic` needs to be set. If there are no corresponding power device (light, relay, etc.) the `switch` will be added automatically.
- Buttons will be added as Home Assistant `automation triggers` when `SetOption73` is enabled.

## Configuration

This integration can be configured using the integrations in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Tasmota (beta)**.
After completing the configuration flow, the Tasmota integration will be
available.
