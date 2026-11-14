---
description: Instructions on how to integrate Yale Smart Alarms into Home Assistant.
ha_release: 0.78
ha_domain: yale_smart_alarm
---

The **Yale Smart Living** {% term integration %} provides connectivity with the Yale Smart Alarm systems and Smart Hub through Yale's API.

There is currently support for the following device types within Home Assistant:

- Alarm
- Binary sensor
- Button
- Lock
- Select
- Sensor
- Switch

{% include integrations/config_flow.md %}

## Alarm control panel

Actions provided are `armed_away`, `armed_home`, and `disarmed`.

No code is required to operate the alarm.

## Binary sensors

Provides support for contact sensors for doors/windows

- Door/window is open or closed.
- Battery is low on contact sensor

## Button

Provides support for pressing the panic button to trigger the alarm. Be careful as another press does not reset/turn off panic mode.

## Lock

The lock platform requires a code for unlocking but no code for locking.

## Select

Provides support for setting the volume on locks, available options are "High", "Low" and "Off". The entity is only available for supported door locks.

## Sensor

Provides support for smoke detector temperature sensors.

## Switch

Provides support for enable/disable autolock on locks. Entity is only available for supported door locks.

The {% term integration %} can be configured to provide a default code that is used if no code is supplied and the number of digits required.
