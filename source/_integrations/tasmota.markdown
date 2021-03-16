---
title: Tasmota
description: Instructions on how to integrate Tasmota with Home Assistant.
ha_category:
  - Binary Sensor
  - Cover
  - Fan
  - Light
  - Sensor
  - Switch
ha_release: '0.117'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@emontnemery'
ha_domain: tasmota
ha_platforms:
  - binary_sensor
  - cover
  - fan
  - light
  - sensor
  - switch
---

This integration allows you to control [Tasmota](https://tasmota.github.io/docs/) devices over MQTT.

## Requirements

- MQTT server and the [MQTT integration](/integrations/mqtt/) set up in Home Assistant.
- Tasmota devices flashed with version 9.2, or later.
- Tasmota devices configured for native discovery (`SetOption19 0`)

## Supported Features

Tasmota Buttons, Fans, Lights, relays, Sensors, Shutters and Switches are supported.

- Tasmota Buttons will be added as Home Assistant `automation triggers` when `SetOption73` is enabled.
- Tasmota Lights will be added as Home Assistant `light` entities. Single channel Dimmers, RGB lights, RGB lights with Color Temperature control and RGB lights with White control are supported.
- Tasmota Relays will be added as Home Assistant `switch` entities, if `SetOption30 0`. If `SetOption30 1`, relays will be added as `light` entities.
- Tasmota Sensors will be added as Home Assistant `sensor` entities.
- Tasmota Shutters will be added as Home Assistant `cover` entities. Currently only Shutter modes 1 to 4 are supported. Shutter mode 5 and Tuya shutters are not supported.
- Tasmota Switches will be added as Home Assistant `binary_sensor` entities or `automation triggers` depending by the `switchmode` used when `SetOption114` is enabled.
- The fan functionality in Tasmota devices with module configured as iFan02 or iFan03 will be added as Home Assistant `fan` entities. Tuya fans are not supported.
- The integration will also create up to eight Status Sensors, each one with a different information. Please note all the Status Sensors are disabled by default.
  ![iot](https://user-images.githubusercontent.com/7702766/99080146-a1d43980-259f-11eb-856b-addb53695381.png)

{% include integrations/config_flow.md %}
