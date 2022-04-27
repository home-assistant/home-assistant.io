---
title: Yale Smart Living
description: Instructions on how to integrate Yale Smart Alarms into Home Assistant.
ha_category:
  - Alarm
  - Binary Sensor
  - Button
  - Lock
ha_release: 0.78
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: yale_smart_alarm
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - diagnostics
  - lock
ha_integration_type: integration
---

The Yale Smart Living integration provides connectivity with the Yale Smart Alarm systems and Smart Hub through Yale's API.

There is currently support for the following device types within Home Assistant:

- Alarm
- Binary Sensor
- Button
- Lock

{% include integrations/config_flow.md %}

## Alarm Control Panel

Services provided are `armed_away`, `armed_home`, and `disarmed`.

No code is required to operate the alarm.

## Binary Sensors

Provides support for contact sensors for doors showing if door is open or closed.

## Button

Provides support for pressing the panic button to trigger the alarm. Be careful as another press does not reset/turn off panic mode.

## Lock

The lock platform requires a code for unlocking but no code for locking.

The integration can be configured to provide a default code that is used if no code is supplied and the number of digits required.
