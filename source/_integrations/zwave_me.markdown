---
title: Z-Wave.Me
description: Instructions on how to integrate Z-Wave with Home Assistant via Z-Wave.Me Z-Way.
ha_category:
  - Binary Sensor
  - Button
  - Climate
  - Hub
  - Light
  - Lock
  - Number
  - Sensor
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
  - light
  - lock
  - number
  - sensor
  - switch
ha_zeroconf: true
---

This integration allows you to control a Z-Wave network via the [Z-Wave.Me Z-Way](https://z-wave.me/z-way/). It combines the performance and the power of the diagnostics tools built-in Z-Way with the flexibility of Home Assistant. The integration brings all Z-Way devices in Home Assistant (Z-Wave, EnOcean, HTTP based, and others).

{% include integrations/config_flow.md %}

Note: You can use Z-Wave.Me UI with its enhanced diagnostics tools together with the Home Assistant UI.

## Hardware requirements

Z-Wave.Me Z-Way requires Z-Wave.Me RaZberry, RaZberry7, UZB1, Hub1 or any other Z-Wave.Me based controller.

## Installing Z-Way

Z-Wave.Me Z-Way runs on various platforms: Raspberry Pi OS, Linux, Windows. Installation instructions are available here: https://z-wave.me/z-way/download-z-way/

## Migration to Z-Way

To migrate from any other Z-Wave controller to Z-Way, include Z-Way as a secondary controller (with security to let Z-Way learn the network key). Use the Z-Way migration tool to make the controller primary in your network.
