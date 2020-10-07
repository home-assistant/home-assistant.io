---
title: Tasmota (beta)
description: Instructions on how to integrate Tasmota with Home Assistant.
ha_category:
  - Binary Sensor
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
- Tasmota devices flashed with 8.5.1 or later
- Tasmota devices configured for native discovery (`SetOption19 0`)

## Limitations

- Only relays and switchedare supported. Relays will be added as Home Assistant `switch` entities. Switches will be added as Home Assistant `binary_sensor` entities.

## Configuration

This integration can be configured using the integrations in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Tasmota (beta)**.
After completing the configuration flow, the Tasmota integration will be
available.
