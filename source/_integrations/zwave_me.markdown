---
title: Z-Wave.Me Z-Way
description: Instructions on how to integrate Z-Wave with Home Assistant via Z-Wave.Me Z-Way.
featured: true
ha_category:
  - Binary Sensor
  - Climate
  - Cover
  - Fan
  - Hub
  - Light
  - Lock
  - Number
  - Select
  - Sensor
  - Siren
  - Switch
ha_release: '2021.12'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@lawfulchaos, @Z-Wave-Me'
ha_domain: zwave_me
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - lock
  - number
  - sensor
  - select
  - siren
  - switch
---

This integration allows you to control a Z-Wave network via the [Z-Wave.Me Z-Way](https://z-wave.me/z-way/). This is the recommended Z-Wave integration for Home Assistant for owners of Z-Wave.Me controllers.

## Quick start (Home Assistant including Supervisor)

To add Z-Wave.Me to your installation, go to {% my integrations title="Configuration > Devices & Services" %} in the UI. Click the "Add integration" button in the bottom right and from the list of integrations, select "Z-Wave.Me" and follow the instructions shown.

Note: You can use Z-Wave.Me UI with it's enhanced diagnostics tools together with the Home Assistant UI.

## Hardware requirements

Z-Wave.Me Z-Way requires Z-Wave.Me RaZberry, RaZberry7, UZB1, Hub1 or any other Z-Wave.Me based controller.

## Installing Z-Way

Z-Wave.Me Z-Way runs on various platforms: Raspberry Pi OS, Linux, Windows. Installation instructions are available here: https://z-wave.me/z-way/download-z-way/

## Migration to Z-Way

To migrate from any Z-Wave controller to Z-Way, include Z-Way as a secondary controller (with security to let Z-Way learn the network key). Use Z-Way migration tool to make the controller primary in your network.
