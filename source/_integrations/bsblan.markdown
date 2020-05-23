---
title: BSB-Lan
description: Instructions on how to integrate BSBLan device into Home Assistant.
logo: bsblan.png
ha_category: Climate
ha_release: "0.110"
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - "@liudger"
ha_domain: bsblan
---

This integration integrates [BSBLan](https://github.com/fredlcore/bsb_lan) device into Home Assistant.

BSBLan is a device that is made by `Frederik Holst` and `Ulf Dieckmann` for documentation and with
the help of many other contributors.
The new board v3 is designed for an Arduino Due with an Ethernet-Shield for web-based controlling
of heating systems such as `Elco Thision`, `Brötje` and similar systems.

It can interface with the heating system over Boiler-System-Bus, Local Process Bus and PPS (Punkt-zu-Punkt Schnittstelle)
For more information of which system it supports, have a look at their [documentation](https://1coderookie.github.io/BSB-LPB-LAN_EN/).

## Configuration

This integration can be configured using the integrations in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **BSBLan**.
Fill in the IP address of the device in your network and, if needed,
the port number. The default value should be 80.
For authentication now only passkey is supported.
Username and password are not supported yet. This will be supported in the next release.

After completing the configuration flow, the BSBLan Climate integration will be
available.

For more documentation of the BSBLan device, check the [manual](https://1coderookie.github.io/BSB-LPB-LAN_EN/).

**_To see a more detailed listing of the reported systems which are successfully used with BSB-LAN please follow the corresponding link:_**

- **[`Brötje`](https://1coderookie.github.io/BSB-LPB-LAN_EN/chap03.html#311-broetje)**
- **[`Elco`](https://1coderookie.github.io/BSB-LPB-LAN_EN/chap03.html#312-elco)**
- **[`Other Manufacturers (e.g. Fujitsu, Atlantic, Weishaupt)`](https://1coderookie.github.io/BSB-LPB-LAN_EN/chap03.html#313-other-manufacturers)**

The integration is tested with firmware the stable version `v0.43`.
