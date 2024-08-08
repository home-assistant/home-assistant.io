---
title: iotty
description: Instructions on how to connect iotty Smart Devices to Home Assistant.
ha_release: '2024.8'
ha_category:
  - Switch
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@pburgio'
ha_domain: iotty
ha_platforms:
  - switch
ha_integration_type: device
---

The iotty {% term integration%} lets you integrate iotty devices into Home Assistant. The iotty family includes the smart switch for lights and gates, the smart shades switch for blinds and shutters, and the smart outlet. 


{% include integrations/config_flow.md %}

## Prerequisites

In order to use this integration, you must have an iotty account, and enter its credentials during account pairing.
To create an iotty account, you need to get the App from the [App Store](https://apps.apple.com/it/app/iotty-smart-home/id1230937401) or [Play Store](https://play.google.com/store/apps/details?id=com.dynamicait.iotty&hl=en).

## Supported devices

This integration currently supports the following iotty devices:

- iotty Smart Switch \
  US version:
  - [1-Switch Controller](https://iottysmarthome.com/products/1-switch-controller?variant=43630747058389)
  - [2-Switch Controller](https://iottysmarthome.com/products/2-switch-controller?variant=43630751219925)
  - [3-Switch Controller](https://iottysmarthome.com/products/3-switch-controller?variant=43630760493269)
  - [4-Switch Controller](https://iottysmarthome.com/products/4-switch-controller?variant=43630774386901)
  EU version:
  - [iotty Smart Switch](https://iotty.uk/collections/frontpage/products/iotty-smart-switch)
  - [iotty Smart Switch (variant)](https://iotty.uk/collections/frontpage/products/iotty-smart-switch?variant=40820222460082)
  - [iotty Plus Interruttore Intelligente](https://iotty.it/collections/frontpage/products/iotty-plus-interruttore-intelligente-per-luci-e-cancelli)

## Supported entities

Each iotty device gets mapped into one Home Assistant device per gang, each with its own Switch entity.

### Switches

The main, unnamed, switch entity controls the light switch, turning it on or off the gang related to it.
