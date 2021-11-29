---
title: Moonraker
description: Integration between Moonraker and Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Sensor
ha_config_flow: true
ha_release: 2021.11
ha_codeowners:
  - '@cmroche'
ha_iot_class: Local Push
ha_domain: moonraker
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - sensor
---

[Moonraker](https://moonraker.readthedocs.io/en/latest/) is an HTTP and websocket interface for your 3D printer. This is the main integration to integrate Moonraker sensors.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Button](#button)
- [Sensor](#sensor)

{% include integrations/config_flow.md %}

### API Key

If you've configured an API key in Moonraker, you will be required to use that API key. The API key can usually be requested by an UIs you are using with Moonraker, such as [Fluidd](https://docs.fluidd.xyz) or [Mainsail](https://docs.mainsail.xyz). You may also request or change the API key directly with Moonraker, see the Moonraker [documentation](https://moonraker.readthedocs.io/en/latest/web_api/#get-the-current-api-key).

## Binary Sensor

The Moonraker integration provides the following binary sensors:

- Print Status, indicating if the printer is currently printing.

## Button

The Moonraker integration provides the following buttons to control the printer:

- Emergency Stop, stops the printer immediately and cancels the current print.
- Host Restart, equivalent to running the `RESTART` command in Klipper
- Firmware Restart, equivalent to running the `FIRMWARE_RESTART` command in Kipper
- Cancel Print, equivalent to running the `CANCEL_PRINT` macro in Klipper. This macro will need to be defined in your Klipper configuration to work.

## Sensor

The Moonraker integration provides the follow sensors for monitoring print progress.

- Extruder Temperature
- Extruder Target Temperature
- Bed Temperature
- Bed Target Temperature
- Print Progress
- Print Duration
- Print File
