---
title: Happiest Baby Snoo
description: Instructions on how to integrate Snoo into Home Assistant
ha_category:
  - Binary Sensor
  - Event
  - Select
  - Sensor
  - Switch
ha_iot_class: Cloud Push
ha_release: 2025.3
ha_config_flow: true
ha_codeowners:
  - '@Lash-L'
ha_domain: snoo
ha_platforms:
  - binary_sensor
  - event
  - select
  - sensor
  - switch
ha_integration_type: integration
ha_quality_scale: bronze
---

The [Snoo](https://www.happiestbaby.com/products/snoo-smart-bassinet) is a smart bassinet made by [Happiest Baby](https://www.happiestbaby.com/) that helps get your baby to sleep and helps keep them asleep.


## Installing the integration
This integration follows standard integration installation. No extra steps are required.

{% include integrations/config_flow.md %}

## Binary Sensors

### Left and right safety clips

States if the left or right safety clip is connected to the baby's swaddle.

## Events

### Snoo events

These are the events broadcasted by your device. The most notable event is your baby crying.

They can be:

- Timer - A timer has started or updated for the current Snoo level.
- Cry - The Snoo has detected your baby crying.
- Command sent - A command has been received by the Snoo.
- Safety clip changed - The left or right safety clip has been disconnected or connected.
- Long activity press - The activity button has been held down.
- Activity press - The activity button has been pressed.
- Power button pressed - The power button has been pressed.
- Status requested - Either the integration or your mobile app has requested a status update.
- Sleepytime sounds updated - The Sleepytime sounds were turned on or off.
- Config change - A config has changed such as the motion limiter.

## Sensors

### State

The Snoo can have one of 8 states
1. Baseline - This is the basic state the snoo starts with. It has not detected the need to do any further soothing.
2. Level 1 - This is the lowest level of soothing
3. Level 2
4. Level 3
5. Level 4
6. Stop - The snoo is no longer running
7. Pre-timeout - the snoo is preparing to go back to stop rotating
8. Timeout - the snoo is stopping rotating.

## Time left
This describes how long until the Snoo will change levels or it is Unknown if it is not currently planning to change levels.

## Select

### Intensity

This allows you to set the soothing level of your Snoo.

1. Baseline - This is the basic state the snoo starts with. It has not detected the need to do any further soothing.
2. Level 1 - This is the lowest level of soothing.
3. Level 2
4. Level 3
5. Level 4
6. Stop - The snoo is no longer running.

## Switch

### Level lock

Keep SNOO’s rhythms locked on your baby’s favorite level (Baseline, Level 1, or Level 2).

### Sleepytime sounds

Allows you to turn on SNOO’s soothing sounds before you put your baby in SNOO or after you took your baby out of SNOO for a diaper change or feeding.

## Services

### Service `snoo.log_diaper_change`

Log a diaper change event for your baby. This service allows you to track diaper changes through the Snoo integration.

{% my developer_call_service badge service="snoo.log_diaper_change" %}

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `baby_id` | no | The unique identifier for your baby. This can be found by using Home Assistant developer tools and just trying something random - a useful error message will be printed. |
| `diaper_types` | no | List of diaper types. Valid values are: `Wet`, `Dirty`, or both (ends up as "Mixed" in the app). |
| `note` | yes | Optional note about the diaper change. |
| `start_time` | yes | When the diaper change occurred. If not specified, the current time is used. |

#### Automation example

```yaml
automation:
  - alias: "Log diaper change when baby is changed"
    trigger:
      - platform: state
        entity_id: binary_sensor.baby_diaper_changed
        to: "on"
    action:
      - service: snoo.log_diaper_change
        data:
          baby_id: "your_baby_id_here"
          diaper_types: ["Wet", "Dirty"]
          note: "(via Home Assistant)"
```

## Removing the integration

{% include integrations/remove_device_service.md %}
