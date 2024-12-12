---
title: LD2410 BLE
description: Instructions on how to integrate LD2410 BLE devices into Home Assistant.
ha_category:
  - Presence detection
  - Sensor
ha_bluetooth: true
ha_release: 2023.2
ha_iot_class: Local Push
ha_codeowners:
  - '@930913'
ha_domain: ld2410_ble
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: device
---

Integrates LD2410 BLE sensors from [Hi-Link](http://www.hlktech.net/) into Home Assistant.

{% include integrations/config_flow.md %}

You can currently configure the settings for motion/static triggers by USB with either the [desktop software](https://drive.google.com/drive/folders/1p4dhbEJA3YubyIjIIC7wwVsSo8x29Fq-?usp=sharing) via Bluetooth. Download HLKRadarTool on [Google Play](https://play.google.com/store/apps/details?id=com.hlk.hlkradartool) or the [App Store](https://apps.apple.com/app/hlkradartool/id1638651152).

(This integration may not work if you reconfigure the default password or the number of gates.)

## Sensors provided

The following sensors are provided:

- Motion detected
- Occupancy detected
- Moving target distance & energy*
- Static target distance & energy*
- Detection distance*
- Number of moving/static gates
- Moving energy at gates 0-8*
- Static energy at gates 0-8*

\* Denotes entity is hidden by default, but can be enabled in the UI.

## Purchasing

{% note %}
There are multiple similar versions of the board. Make sure to buy the LD2410B or LD2410C versions as these are the ones with Bluetooth and have been tested. The C variant has 2.54mm pitch pins which is the one used by Arduino type devices, whereas the B variant has half pitch pins.
{% endnote %}

You can buy this module bareboard or in a devkit from [AliExpress](https://www.aliexpress.com/item/1005004351593073.html).
