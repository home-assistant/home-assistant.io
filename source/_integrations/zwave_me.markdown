---
title: Z-Wave.Me
description: Instructions on how to integrate Z-Wave with Home Assistant via Z-Wave.Me Z-Way.
ha_category:
  - Binary Sensor
  - Button
  - Climate
  - Cover
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
ha_domain: zwave_me
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - light
  - lock
  - number
  - sensor
  - siren
  - switch
ha_zeroconf: true
---

This integration allows you to control a Z-Wave network via the [Z-Wave.Me Z-Way](https://z-wave.me/z-way/). It combines the performance and the power of the diagnostics tools built-in Z-Way with the flexibility of Home Assistant. The integration brings all Z-Way devices in Home Assistant (Z-Wave, EnOcean, HTTP based, and others).

{% include integrations/config_flow.md %}

In the URL field input the IP address with the port. The IP address can be prefixed with wss:// if HTTPS should be used instead of HTTP (when using find.z-wave.me remote access or public IP with SSL).

In the API Token field enter the access token of Z-Way server. To get the token go to the Z-Way user interface Smart Home UI > Menu > Settings > Users > Administrator > API token.

When connecting via find.z-wave.me you need to use a token with a global scope (log-in to Z-Way via find.z-wave.me for this).


    Example of connecting to Z-Way in the local network:
    URL: 192.168.1.39:8083
    API Token: /112f7a4a-0051-cc2b-3b61-1898181b9950

    Example of connecting to Z-Way via remote access find.z-wave.me:
    URL: wss://find.z-wave.me
    API Token: 0481effe8a5c6f757b455babb678dc0e764feae279/112f7a4a-0051-cc2b-3b61-1898181b9950

    Example of connecting to Z-Way with a static public IP address:
    URL: wss://87.250.250.242:8083
    API Token: /112f7a4a-0051-cc2b-3b61-1898181b9950


Note: To grant access only to certain devices, create a new user and select the necessary devices from the list. Then use API token of that user.

Note: You can use Z-Wave.Me UI with its enhanced diagnostics tools together with the Home Assistant UI.

## Hardware requirements

Z-Wave.Me Z-Way requires Z-Wave.Me RaZberry, RaZberry7, UZB1, Hub1 or any other Z-Wave.Me based controller.

## Installing Z-Way

Z-Wave.Me Z-Way runs on various platforms: Raspberry Pi OS, Linux, Windows. Installation instructions are available here: https://z-wave.me/z-way/download-z-way/

## Migration to Z-Way

To migrate from any other Z-Wave controller to Z-Way, include Z-Way as a secondary controller (with security to let Z-Way learn the network key). Use the Z-Way migration tool to make the controller primary in your network.
