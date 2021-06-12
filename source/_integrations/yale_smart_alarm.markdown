---
title: Yale Smart Living
description: Instructions on how to integrate Yale Smart Alarms into Home Assistant.
ha_category:
  - Alarm
ha_release: 0.78
ha_iot_class: Cloud Polling
ha_domain: yale_smart_alarm
ha_platforms:
  - alarm_control_panel
ha_codeowners:
  - '@gjohansson-ST'
---

The `yale_smart_alarm` platform provides connectivity with the Yale Smart Alarm systems and Smart Hub through Yale's API.

This platform supports the following services: `alarm_arm_away`, `alarm_arm_home`, `alarm_arm_night` (duplicate of home) and `alarm_disarm`.
Currently only one alarm is supported.

## Configuration

To enable, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: yale_smart_alarm
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
name:
  description: Name of device in Home Assistant.
  required: false
  type: string
username:
  description: Username used to sign into the Yale app/web client.
  required: true
  type: string
password:
  description: Password used to sign into the Yale app/web client.
  required: true
  type: string
area_id:
  description: Area ID of the device when talking to Yale's API if required.
  required: false
  type: integer
  default: 1
{% endconfiguration %}

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
