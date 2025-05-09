---
title: iotty
description: Instructions on how to connect iotty Smart Devices to Home Assistant.
ha_release: '2024.8'
ha_category:
  - Cover
  - Switch
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@shapournemati-iotty'
ha_domain: iotty
ha_platforms:
  - cover
  - switch
ha_integration_type: device
---

The iotty {% term integration%} lets you integrate iotty devices into Home Assistant. The iotty family includes the smart switch for lights and gates, the smart shades switch for blinds and shutters, and the smart outlet.

## Prerequisites

In order to use this integration, you must have an iotty account, and enter its credentials during account pairing.
To create an iotty account, you need to get the App from the [App Store](https://apps.apple.com/it/app/iotty-smart-home/id1230937401) or [Play Store](https://play.google.com/store/apps/details?id=com.dynamicait.iotty&hl=en).

{% include integrations/config_flow.md %}

## Supported devices

This integration currently supports the following iotty devices:

### iotty Smart Switch

US version:

- [1-Switch Controller](https://iottysmarthome.com/products/1-switch-controller?variant=43630747058389)
- [2-Switch Controller](https://iottysmarthome.com/products/2-switch-controller?variant=43630751219925)
- [3-Switch Controller](https://iottysmarthome.com/products/3-switch-controller?variant=43630760493269)
- [4-Switch Controller](https://iottysmarthome.com/products/4-switch-controller?variant=43630774386901)

EU version:

- [E1 PLUS Smart Switch - for lights and gates](https://iotty.uk/collections/prodotti-singoli/products/e1-e2-plus-smart-switch-for-lights-and-gates)
- [E2 PLUS Smart Switch - for lights and gates](https://iotty.uk/collections/prodotti-singoli/products/e1-e2-plus-smart-switch-for-lights-and-gates?variant=48626603032911)
- [i3 PLUS Smart Switch - for lights and gates](https://iotty.it/collections/prodotti-singoli/products/i3-plus-interruttore-intelligente-per-luci-e-cancelli)

### iotty Shutter

- [E2S PLUS Smart Shades Switch - for shutters and blinds](https://iotty.uk/collections/frontpage/products/e2s-plus-smart-shades-switch-for-shutters-and-blinds)
- [i3S PLUS Smart Shades Switch - for shutters and blinds](https://iotty.it/collections/prodotti-singoli/products/i3s-plus-interruttore-intelligente-per-tende-e-tapparelle)

### iotty Outlet

- [OiT PLUS Smart Outlet](https://iotty.it/collections/prodotti-singoli/products/oit-plus-presa-intelligente)
- [ODE PLUS Smart Outlet](https://iotty.de/collections/prodotti-singoli/products/ode-plus-smarte-steckdose)
- [OFR PLUS Smart Outlet](https://iotty.fr/collections/prodotti-singoli/products/ofr-plus-prise-intelligente)

### iotty Outlet

- [iotty Smart Outlet - Italy](https://iotty.it/collections/prodotti-singoli/products/oit-plus-presa-intelligente)
- [iotty Smart Outlet - Germany](https://iotty.de/collections/prodotti-singoli/products/ode-plus-smarte-steckdose)
- [iotty Smart Outlet - France](https://iotty.fr/collections/prodotti-singoli/products/ofr-plus-prise-intelligente)

## Supported entities

Each iotty device gets mapped into one Home Assistant device per gang, each with its own Switch entity.

### Switches

The main, unnamed, switch entity controls the light switch or the outlet switch, turning it on or off the gang related to it.

### Covers

The main, unnamed, cover entity controls the shutter, opening, closing, stopping, and moving to a specific position the target.
