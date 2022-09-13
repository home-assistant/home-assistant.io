---
title: Hatch Rest
description: Instructions on how to control a Hatch Rest Bluetooth device with Home Assistant
ha_category:
  - Switch
  - Light
  - Health
ha_bluetooth: true
ha_config_flow: true
ha_iot_class: Local Polling
ha_release: 2022.10
ha_codeowners:
  - '@vividboarder'
ha_domain: hatchrest
ha_platforms:
  - switch
  - light
  - media_player
ha_integration_type: integration
---

Integrates [Hatch Rest](https://www.hatch.co/rest) Bluetooth sound machine into Home Assistant.

{% include integrations/config_flow.md %}

The Hatch Rest will be automatically discovered after enabling the [Bluetooth](/integrations/bluetooth) integration.

## Features

The integration will add a light entity allowing full control of the light, a media player entity allowing control of the white noise, and a switch to control device power.

## Turning off entities

The Hatch Rest only really has one on/off state despite having a light and a sound element. This component is implemented so that turning off a particular entity, Light or Media Player, when the other entity is currently on will not power off the device. It will only turn off the light or sound on the device. If the entity you are turning off is the last remaining entity, it will power off the device.

In other words, powering off the device requires turning off both Light and Media Player or using the dedicated Switch entity controlling device power to turn off or on device power directly.
