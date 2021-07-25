---
title: Leviton Decora Wi-Fi
description: Instructions on how to setup Leviton Decora Smart Wi-Fi switches/dimmers within Home Assistant.
ha_category:
  - Light
ha_iot_class: Cloud Polling
ha_release: 0.51
ha_domain: decora_wifi
ha_platforms:
  - light
---

Support for [Leviton Decora Wi-Fi](https://www.leviton.com/en/products/lighting-controls/decora-smart-with-wifi) dimmers/switches via the MyLeviton API.

Supported devices (tested):

- [DW6HD1-BZ](https://www.leviton.com/en/products/dw6hd-1bz) (Decora Smart Wi-Fi 600W Dimmer)
- [DW15S-1BZ](https://www.leviton.com/en/products/dw15s-1bz) (Decora Smart Wi-Fi 15A Switch)
- [DW15P-1BW](https://www.leviton.com/en/products/dw15p-1bw) (Decora Smart Wi-Fi Plug-in Outlet)
- [DW4SF-1BW](https://www.leviton.com/en/products/dw4sf-1bw) (Decora Smart Wi-Fi Fan Speed Controller)

## Setup

You will need your MyLeviton login information (username, which is usually your email address, and password) to use this module.

## Configuration

The preferred method for setting this integration up is by using the configuration flow. Go to the integrations page in your configuration and click on new integration -> Leviton Decora Wifi. Enter your credentials in the dialog and the integration will then set up. Once Home Assistant authenticates access, the `decora-wifi` integration will create the following platforms:

- A `light` for each device linked to your MyLeviton account.

The integration reads the capabilities of each device (dimming, etc.) from the API, so devices with dimming or speed control capabilities will provide those controls in the Home Assitant UI.
