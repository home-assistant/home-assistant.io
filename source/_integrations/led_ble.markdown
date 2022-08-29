---
title: LED BLE
description: Instructions on how to integrate LED BLE devices into Home Assistant.
ha_category:
  - Light
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Polling
ha_codeowners:
  - '@bdraco'
ha_domain: led_ble
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: integration
---

Integrates multiple brands of Bluetooth Low Energy LED devices into Home Assistant.

{% include integrations/config_flow.md %}

This integration works with devices that identify with the following names:

- LEDnet (except LEDnetWF models)
- BLE-LED
- LEDBLE
- Triones
- LEDBlue

These devices have been sold under many brands, including:

- LED BLE
- BLE-LED
- Triones
- Happy Lighting
- Zengee
- LEDBlue
