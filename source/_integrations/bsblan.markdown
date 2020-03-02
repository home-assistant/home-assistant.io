---
title: BSBLan
description: Instructions on how to integrate BSBLan device into Home Assistant.
logo: bsblan.png
ha_category: Climate
ha_release: 0.106.2
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@liudger'
---

Integrates [BSBLan](https://github.com/fredlcore/bsb_lan) device into Home Assistant.

## Configuration

This integration can be configured using the integrations in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **BSBLan**.
Fill in the IP address of the device in your network and if needed
the port number. The default value should be 80.
If you use a passkey or other authentication method on BSBLan device, you can't use the integration yet.

After completing the configuration flow, the BSBLan Climate integration will be
available.

For more documentation of the BSBLan device check the [manual](https://1coderookie.github.io/BSB-LPB-LAN_EN/).
The device support quite a few controllers from different manufacturers.

The integration is tested with firmware version `v0.42`.
