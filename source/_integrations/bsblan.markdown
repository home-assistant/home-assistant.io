---
title: BSB-Lan
description: Instructions on how to integrate BSBLan device into Home Assistant.
ha_category:
  - Climate
  - Sensor
  - Water heater
ha_release: '0.110'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@liudger'
ha_domain: bsblan
ha_platforms:
  - climate
  - diagnostics
  - sensor
  - water_heater
ha_integration_type: device
---

The **BSB-Lan** {% term integration %} integrates [BSBLan](https://github.com/fredlcore/BSB-LAN) devices into Home Assistant.

BSBLan is a device that is made by `Frederik Holst` and with
the help of many other contributors.
The board v3 is designed for an Arduino Due with an Ethernet-Shield for web-based controlling
of heating systems such as `Elco Thision`, `Brötje` and similar systems.
Also, available is an ESP32 version of the board.

It can interface with the heating system over Boiler-System-Bus, Local Process Bus and PPS (Punkt-zu-Punkt Schnittstelle)
For more information of which system it supports, take a look at their [documentation](https://docs.bsb-lan.de).

{% include integrations/config_flow.md %}

For authentication HTTP authentication using a username and password,
or using a passkey is supported. Use either one.

For more documentation of the BSBLan device, check the [manual](https://docs.bsb-lan.de).

To see a more detailed listing of the reported systems which are successfully used with BSB-LAN, please follow the corresponding link:

[Supported heating systems](https://docs.bsb-lan.de/supported_heating_systems.html)

The integration is tested with the stable firmware version `3.1.6-20230327101530`. A newer firmware version may not work because the API could have changed.
Please use this release. [release 3.1](https://github.com/fredlcore/BSB-LAN/releases/tag/v3.1)
