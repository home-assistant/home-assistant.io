---
layout: page
title: "Yale Smart Alarm Control"
description: "Instructions on how to integrate Yale Smart Alarms into Home Assistant."
date: 2018-09-01 11:11
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Alarm
ha_release: 0.78
---

The `yale_smart_alarm` platform provides connectivity with the Yale Smart Alarm systems and Smart Hub through Yale's API.

This platform supports the following services: `alarm_arm_away`, `alarm_arm_home`, `alarm_arm_night` (duplicate of home) and `alarm_disarm`.
Currently only one alarm is supported.


To enable, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: yale_smart_alarm
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration variables:

- **name** (*Optional*): Name of device in Home Assistant.
- **username** (*Required*): Username used to sign into the Yale app/web client.
- **password** (*Required*): Password used to sign into the Yale app/web client.
- **area_id** (*Optional*): Area ID of the device when talking to Yale's API if required ('1' by default).

Automation example:

```yaml
automation:
  - alias: "Alarm: Disarmed Daytime"
    trigger:
      platform: state
      entity_id: alarm_control_panel.yale_smart_alarm
      to: 'disarmed'
    condition:
      condition: sun
      before: sunset
    action:
      service: scene.turn_on
      entity_id: scene.OnDisarmedDaytime
  - alias: "Alarm: Armed Away"
    trigger:
      platform: state
      entity_id: alarm_control_panel.yale_smart_alarm
      to: 'armed_away'
    action:
      service: scene.turn_on
      entity_id: scene.OnArmedAway 
```
