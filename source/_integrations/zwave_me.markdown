---
title: Z-Wave.Me
description: Instructions on how to integrate Z-Wave with Home Assistant via Z-Wave.Me Z-Way.
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Fan
  - Hub
  - Light
  - Lock
  - Number
  - Sensor
  - Siren
  - Switch
ha_release: 2022.3
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@lawfulchaos'
  - '@Z-Wave-Me'
  - '@PoltoS'
ha_domain: zwave_me
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - fan
  - light
  - lock
  - number
  - sensor
  - siren
  - switch
ha_zeroconf: true
ha_integration_type: hub
---

The **Z-Wave.Me** {% term integration %} allows you to control a Z-Wave network via the [Z-Wave.Me Z-Way](https://z-wave.me/z-way/). It combines the performance and power of the diagnostics tools built into Z-Way with the flexibility of Home Assistant. The integration brings all Z-Way devices into Home Assistant, including Z-Wave, Zigbee, EnOcean, HTTP-based, and others.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The IP address and port of the Z-Way server. You can prefix the address with `wss://` to use a secure WebSocket connection (for example, when using the `find.z-wave.me` remote access service or a public IP with TLS)."
API Token:
  description: "The API access token of the Z-Way server. To get the token, go to the Z-Way Smart Home UI and select **Menu** > **Settings** > **Users** > **Administrator** > **API token**."
{% endconfiguration_basic %}

When connecting via the [find.z-wave.me](https://find.z-wave.me) remote access service, you need to use a token with a global scope. To create one, sign in to Z-Way at [find.z-wave.me](https://find.z-wave.me).

Example of connecting to Z-Way in the local network:

- URL: `192.168.1.39:8083`
- API Token: `/112f7a4a-0051-cc2b-3b61-1898181b9950`

Example of connecting to Z-Way via the `find.z-wave.me` remote access service:

- URL: `wss://find.z-wave.me`
- API Token: `0481effe8a5c6f757b455babb678dc0e764feae279/112f7a4a-0051-cc2b-3b61-1898181b9950`

Example of connecting to Z-Way with a static public IP address:

- URL: `wss://87.250.250.242:8083`
- API Token: `/112f7a4a-0051-cc2b-3b61-1898181b9950`


{% warning %}
To grant access only to certain devices, create a new user and select the necessary devices from the list. Then use the API token of that user. Do not use the API token of the admin.
{% endwarning %}


{% tip %}
You can use Z-Wave.Me UI with its enhanced Z-Wave network diagnostics tools together with the Home Assistant UI.
{% endtip %}

## Hardware requirements

Z-Wave.Me Z-Way requires Z-Wave.Me hardware:

- [RaZberry 7](https://z-wave.me/products/razberry/) and [RaZberry 7 Pro](https://z-wave.me/products/razberry/)
- [Wiren Board 7](https://z-wave.me/products/wirenboard-7/)
- [Z-Station](https://z-wave.me/products/z-station/)
- [Z-Wave & Zigbee mPCIe](https://z-wave.me/products/mpcie/)
- [RaZberry (old)](https://z-wave.me/products/razberry-old/)
- [UZB1](https://z-wave.me/products/uzb/)
- [Hub1](https://z-wave.me/products/hub/)
- Any other Z-Wave.Me-based controller

## Installing Z-Way

Z-Wave.Me Z-Way runs on various platforms, including Raspberry Pi OS, Linux, and Windows. Follow the [Z-Way installation instructions](https://z-wave.me/z-way/download-z-way/) to set it up.

## Migration to Z-Way

To migrate from any other Z-Wave controller to Z-Way, include Z-Way as a secondary controller (with security to let Z-Way learn the network key). Use the Z-Way migration tool to make the controller primary in your network.
