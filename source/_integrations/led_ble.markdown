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
- Dream
- QHM
- AP

These devices have been sold under many brands, including:

- ALED
- AVERYSHOP
- BLE-LED
- EPBOWPT
- HaoDeng (some models)
- Happy Lighting
- hun hun
- ILC
- LEDBlue
- LED BLE
- Magic Blue
- MCWOFI
- PHOPOLLO
- RESHAKE
- REYSURPIUS
- SUPERNIGHT
- Triones
- [Zengge](http://www.zengge.com/sy)
- YONEDA
- Zerproc
