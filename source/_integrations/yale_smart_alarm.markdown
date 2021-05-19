---
title: Yale Smart Living
description: Instructions on how to integrate Yale Smart Alarms into Home Assistant.
ha_category:
  - Alarm
ha_release: 0.78
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: yale_smart_alarm
ha_platforms:
  - alarm_control_panel
---

The `yale_smart_alarm` platform provides connectivity with the Yale Smart Alarm systems and Smart Hub through Yale's API.

This platform supports the following services: `alarm_arm_away`, `alarm_arm_home`, and `alarm_disarm`.
Currently only one alarm is supported.

## Configuration

{% include integrations/config_flow.md %}

## Automation example

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
