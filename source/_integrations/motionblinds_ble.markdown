---
title: Motionblinds Bluetooth
description: Instructions on how to integrate Motionblinds Bluetooth motors into Home Assistant.
ha_category:
  - Cover
ha_iot_class: Assumed State
ha_release: 2024.4
ha_domain: motionblinds_ble
ha_codeowners:
  - '@LennP'
  - '@jerrybboy'
ha_config_flow: true
ha_platforms:
  - button
  - cover
  - diagnostics
  - select
  - sensor
ha_integration_type: device
---

This {% term integration %} adds support for [Motionblinds](https://motionblinds.com/) Bluetooth motors. Want to motorize your existing blinds? This can be done with Motionblinds motor CMD-03. Made-to-measure window coverings with Motionblinds are available through a worldwide reseller network.
Beware that this integration does not work with Eve Motionblinds motors. Eve Motionblinds can be added to Home Assistant using the [HomeKit Device](https://www.home-assistant.io/integrations/homekit_controller/) integration or the [Matter](https://www.home-assistant.io/integrations/matter/) integration.

{% include integrations/config_flow.md %}

## Setup

During the setup of a Motionblinds Bluetooth motor, you will be asked what kind of blind you have. There are 8 different blind types:

- **Roller blind**: has the ability to change position and speed.
- **Honeycomb blind**: has the ability to change position and speed.
- **Roman blind**: has the ability to change position and speed.
- **Venetian blind**: has the ability to change position, tilt, and speed.
- **Venetian blind (tilt-only)**: has the ability to change tilt and speed.
- **Double Roller blind**: has the ability to change position, tilt, and speed.
- **Curtain blind**: has the ability to change position. May need to be calibrated if the end positions are lost, which can be done by using the open/close cover button or the set cover position slider. This will trigger a calibration which will first make the curtain find the end positions after which it will run to the position as indicated by the command that was given.
- **Vertical blind**: has the ability to change position and tilt. May need to be calibrated if the end positions are lost, which must be done using the Motionblinds Bluetooth app.

## Entities

The following entities are available for a Motionblinds Bluetooth device:

- [Cover](https://www.home-assistant.io/integrations/cover/) entity: depending on the blind that was chosen during the setup, this entity has a slider that makes it possible to change position and tilt, and buttons that allow you to open the blind, close the blind, tilt it open, tilt it closed and stop it.
- [Button](https://www.home-assistant.io/integrations/button/) entities:
  -  Connect button: allows you to connect to the blind.
  -  Disconnect button: allows you to disconnect the blind.
  -  Favorite button: allows you to move the blind to the favorite position.
- [Select](https://www.home-assistant.io/integrations/select/) entities:
  -  Speed select: allows you to change the speed of the motor to low, medium, or high. Available for all blinds except curtain blinds and vertical blinds.
- [Sensor](https://www.home-assistant.io/integrations/sensor/) entities:
  -  Battery sensor: shows the battery percentage. The icon also reflects whether the motor is currently charging and/or whether the motor is wired and, therefore, does not have a battery.
  Calibration sensor: shows whether the blind is still calibrated. The motor can move to an uncalibrated state when it has been moved to a different position while not powered. This sensor is available for curtain blinds and vertical blinds, as these can be moved while not powered.
  -  Connection sensor: shows whether the blind is connected, disconnected, connecting, or disconnecting.
  -  Signal strength sensor: shows the signal strength in dBm.

## Actions

Since Motionblinds Bluetooth motors require a Bluetooth connection to control them, Home Assistant does not get automatic updates of the motor's state by default. Therefore, you can use the [homeassistant.update_entity](https://www.home-assistant.io/docs/scripts/perform-actions/#homeassistant-actions) action on any entity belonging to a Motionblinds Bluetooth device, which will connect to your Motionblinds Bluetooth motor and update the state of all entities belong to that device. However, be aware that doing so may impact battery life.

This can also be automated using a YAML automation. For instance, the following automation connects to your Motionblind every 24 hours to update its state in Home Assistant:

```yaml
alias: "Motionblinds Bluetooth polling automation"
triggers:
  - trigger: time_pattern
    hours: "/24"
actions:
  - action: homeassistant.update_entity
    target:
      entity_id: cover.motion_shade
```
