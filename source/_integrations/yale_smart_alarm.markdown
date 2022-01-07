---
title: Yale Smart Living
description: Instructions on how to integrate Yale Smart Alarms into Home Assistant.
ha_category:
  - Alarm
  - Lock
ha_release: 0.78
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: yale_smart_alarm
ha_platforms:
  - alarm_control_panel
  - lock
---

The Yale Smart Living integration provides connectivity with the Yale Smart Alarm systems and Smart Hub through Yale's API.

There is currently support for the following device types within Home Assistant:

- Alarm
- Lock

{% include integrations/config_flow.md %}

## Alarm Control Panel

Services provided are `armed_away`, `armed_home` and `disarmed`

Example automation:
```yaml
automation:
  - alias: "Alarm: Disarmed Daytime"
    trigger:
      platform: state
      entity_id: alarm_control_panel.yale_smart_alarm
      to: "disarmed"
    condition:
      condition: sun
      before: sunset
    action:
      service: scene.turn_on
      target:
        entity_id: scene.OnDisarmedDaytime
  - alias: "Alarm: Armed Away"
    trigger:
      platform: state
      entity_id: alarm_control_panel.yale_smart_alarm
      to: "armed_away"
    action:
      service: scene.turn_on
      target:
        entity_id: scene.OnArmedAway
```
## Lock

Lock platform requires a code for unlocking but no code for locking.
The integration can be configured to provide a default code that is used if no code is supplied and the number of digits required for code.

Example automation:
```yaml
automation:
  - alias: "Unlock: Light Hallway"
    trigger:
      platform: state
      entity_id: lock.enter
      to: "unlocked"
    action:
      service: scene.turn_on
      target:
        entity_id: scene.LightHallway
```
