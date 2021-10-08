---
title: BSB-Lan
description: Instructions on how to integrate BSBLan device into Home Assistant.
logo: bsblan.png
ha_category: Climate
ha_release: '0.110'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@liudger'
ha_domain: bsblan
ha_platforms:
  - climate
---

This integration integrates [BSBLan](https://github.com/fredlcore/bsb_lan) device into Home Assistant.

BSBLan is a device that is made by `Frederik Holst` and `Ulf Dieckmann` for documentation and with
the help of many other contributors.
The new board v3 is designed for an Arduino Due with an Ethernet-Shield for web-based controlling
of heating systems such as `Elco Thision`, `Brötje` and similar systems.

It can interface with the heating system over Boiler-System-Bus, Local Process Bus and PPS (Punkt-zu-Punkt Schnittstelle)
For more information of which system it supports, have a look at their [documentation](https://1coderookie.github.io/BSB-LPB-LAN_EN/).

{% include integrations/config_flow.md %}

For authentication HTTP authentication using a username and password,
or using a passkey is supported. Use either one.

For more documentation of the BSBLan device, check the [manual](https://1coderookie.github.io/BSB-LPB-LAN_EN/).

To see a more detailed listing of the reported systems which are successfully used with BSB-LAN please follow the corresponding link:

- [`Brötje`](https://1coderookie.github.io/BSB-LPB-LAN_EN/chap03.html#311-broetje)
- [`Elco`](https://1coderookie.github.io/BSB-LPB-LAN_EN/chap03.html#312-elco)
- [`Other Manufacturers (e.g. Fujitsu, Atlantic, Weishaupt)`](https://1coderookie.github.io/BSB-LPB-LAN_EN/chap03.html#313-other-manufacturers)

The integration is tested with the stable firmware version `1.00`. A newer firmware versions will not work, because the parameters are changed of the specific info that is needed.
Please use the latest release. [release 1.0](https://github.com/fredlcore/bsb_lan/releases/tag/v1.0)
