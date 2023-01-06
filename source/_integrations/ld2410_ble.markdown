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

You can currently configure the settings for motion/static triggers by USB with either the [desktop software](https://drive.google.com/drive/folders/1p4dhbEJA3YubyIjIIC7wwVsSo8x29Fq-?usp=sharing) or the Bluetooth [mobile app](https://www.pgyer.com/Lq8p).

## Sensors Provided

The following sensors are provided:

- Motion detected
- Occupancy detected
- Moving target distance & energy*
- Static target distance & energy*
- Detection distance*

\* Denotes entity is hidden by default, but can be enabled in the UI.

## Purchasing

<div class='note'>
There are multiple similar versions of the board. Make sure to buy the -B versions as these are the ones with Bluetooth and have been tested.
</div>

You can buy this module bareboard or in a devkit from [AliExpress](https://www.aliexpress.com/item/1005004351593073.html).
