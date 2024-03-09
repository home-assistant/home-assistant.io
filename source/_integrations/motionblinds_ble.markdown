---
title: MotionBlinds BLE
description: Instructions on how to integrate MotionBlinds Bluetooth motors into Home Assistant.
ha_category:
  - Cover
ha_iot_class: Assumed State
ha_release: 2024.03
ha_domain: motionblinds_ble
ha_codeowners:
  - '@LennP'
  - '@jerrybboy'
ha_config_flow: true
ha_platforms:
  - cover
ha_integration_type: integration
---

This integration adds support for [MotionBlinds](https://motionblinds.com/) Bluetooth motors. Beware that this integration does not work with *Eve MotionBlinds* motors. *Eve MotionBlinds* can be added to Home Assistant using the [HomeKit Device](https://www.home-assistant.io/integrations/homekit_controller/) integration.

{% include integrations/config_flow.md %}

## Setup

During the setup of a MotionBlinds BLE device, you will be asked what kind of blind your MotionBlind is. There are 8 different blind types:

- **Roller blind**: has the ability to change position and speed.
- **Honeycomb blind**: has the ability to change position and speed.
- **Roman blind**: has the ability to change position and speed.
- **Venetian blind**: has the ability to change position, tilt and speed.
- **Venetian blind (tilt-only)**: has the ability to change tilt and speed.
- **Double Roller blind**: has the ability to change position, tilt and speed.
- **Curtain blind**: has the ability to change position. May need to be calibrated if the end positions are lost, which can be done by using the open/close cover button or the set cover position slider. This will trigger a calibration which will first make the curtain find the end positions after which it will run to the position as indicated by the command that was given.
- **Vertical blind**: has the ability to change position and tilt. May need to be calibrated if the end positions are lost, which has to be done using the MotionBlinds BLE mobile app.

## Services

Since MotionBlinds BLE motors require a Bluetooth connection to control them, Home Assistant does not get automatic updates of the motor's state by default. Therefore, you can use the [homeassistant.update_entity](https://www.home-assistant.io/docs/scripts/service-calls/#homeassistant-services) service on a MotionBlinds BLE cover entity which will connect to your MotionBlind and update the state of all entities belonging to the device. **However, be aware that doing so may impact battery life.**

This can also be automated using a YAML automation. For instance, the following automation connects to your MotionBlind every 24 hours to update it's state in Home Assistant:

```yaml
alias: MotionBlinds BLE polling automation
mode: single
trigger:
  - platform: time_pattern
    hours: "/24"
action:
  - service: homeassistant.update_entity
    target:
      entity_id: cover.motion_shade
```
