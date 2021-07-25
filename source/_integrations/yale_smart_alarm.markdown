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
  - '@gjohanssson-ST'
ha_domain: yale_smart_alarm
ha_platforms:
  - alarm_control_panel
  - lock
ha_codeowners:
  - '@gjohansson-ST'
---

The [Yale Smart Living](https://www.yalehome.com/) integration provides connectivity with the Yale Smart Living system and Smart Hub through Yale's API.

This platform supports the following services: `alarm_arm_away`, `alarm_arm_home`, `alarm_disarm` for alarm control panel and `lock`, `unlock` for doorlock.

{% include integrations/config_flow.md %}

## Automation example for Alarm

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
