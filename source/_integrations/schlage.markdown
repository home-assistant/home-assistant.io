---
title: Schlage
description: Instructions on how to integrate Schlage WiFi smart locks into Home Assistant.
ha_category:
  - Lock
  - Sensor
  - Switch
ha_release: 2023.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@dknowles2'
ha_platforms:
  - binary_sensor
  - diagnostics
  - lock
  - select
  - sensor
  - switch
ha_integration_type: integration
ha_domain: schlage
---

The Schlage integration provides connectivity with Schlage WiFi smart locks through Schlage's cloud API.

{% include integrations/config_flow.md %}

There is currently support for the following device types within Home Assistant:

- Binary sensor
- Lock
- Sensor
- Switch

## Binary sensor

Once you have enabled the Schlage integration, you should see the following binary sensor:

- **Keypad disabled** - Indicates that the keypad has been disabled, typically due to too many incorrect lock codes being attempted.

## Select

Once you have enabled the Schlage integration, you should see the following selects:

- **Auto Lock Time** - Configure the time until the deadbolt automatically locks, or disable the auto-lock feature entirely. For example, `0`: auto-lock is disabled, `15`: auto-lock after 15 seconds, `300`: auto-lock after 5 minutes.

## Sensor

Once you have enabled the Schlage integration, you should see the following sensors:

- Lock Battery

## Switch

Once you have enabled the Schlage integration, you should see the following switches:

- **1-Touch Locking** - When enabled, locks the lock with a press of the Schlage button.
- **Keypress Beep** - Controls whether the lock will emit beeping tones on use.
