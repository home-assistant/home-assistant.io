---
title: Allpowers
description: Instructions on how to set up Allpowers Devices.
ha_category:
  - Energy
  - Plug
  - Switch
ha_release: 0.78
ha_iot_class: Local Push
ha_codeowners:
  - '@madninjaskillz'
ha_domain: switchbot
ha_bluetooth: true
ha_platforms:
  - light
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: integration
---

The Allpowers integration allows you to control and interogate Allpowers [devices](http://iallpowers.com/).

## Prerequisites

In order to use this integration, it is required to have working [Bluetooth](/integrations/bluetooth) set up on the device running Home Assistant. 

Please note, device names configured in the Allpowers app are not transferred into Home Assistant.

{% include integrations/config_flow.md %}

## Supported Devices

- [S300 Portable Power Station](https://uk.iallpowers.com/products/allpowers-300w-288wh-portable-power-station-s300)
All other S series Powerstations should be supported but have not been tested.