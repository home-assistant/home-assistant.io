---
title: LD2410 BLE
description: Instructions on how to integrate LD2410 BLE devices into Home Assistant.
ha_category:
  - Sensor
  - Presence Detection
ha_bluetooth: true
ha_release: 2023.2
ha_iot_class: Local Push
ha_codeowners:
  - '@930913'
ha_domain: ld2410_ble
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates LD2410B sensors from [Hi-Link](http://www.hlktech.net/) into Home Assistant using Bluetooth.

{% include integrations/config_flow.md %}

It currently provides the motion and static value.

You can currently configure the settings for motion/static triggers by USB with either the [desktop software](https://drive.google.com/drive/folders/1p4dhbEJA3YubyIjIIC7wwVsSo8x29Fq-?usp=sharing) or the Bluetooth [mobile app](https://www.pgyer.com/Lq8p).
