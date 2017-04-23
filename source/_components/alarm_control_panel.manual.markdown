---
layout: page
title: "Manual Alarm Control Panel"
description: "Instructions how to integrate manual alarms into Home Assistant."
date: 2015-10-13 19:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Alarm
ha_release: 0.7.6
---


This platform enables you to set manual alarms in Home Assistant.

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual
```

Configuration variables:

- **name** (*Optional*): The name of the alarm. Default is "HA Alarm".
- **code** (*Optional*): If defined, specifies a code to enable or disable the alarm in the frontend.
- **pending_time** (*Optional*): The time in seconds of the pending time before arming the alarm. Default is 60 seconds.
- **trigger_time** (*Optional*): The time in seconds of the trigger time in which the alarm is firing. Default is 120 seconds.
- **disarm_after_trigger** (*Optional*): If true, the alarm will automatically disarm after it has been triggered instead of returning to the previous state.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this panel.

### {% linkable_title Sensors %}

Using sensors to trigger the alarm.

```yaml
automation:
- alias: 'Trigger alarm while armed away'
  trigger:
    - platform: state
      entity_id: sensor.pir1
      state: 'active'
    - platform: state
      entity_id: sensor.pir2
      state: 'active'
    - platform: state
      entity_id: sensor.door
      state: 'open'
    - platform: state
      entity_id: sensor.window
      state: 'open'
  condition:
    - condition: state
      entity_id: alarm_control_panel.ha_alarm
      state: armed_away
  action:
    service: alarm_control_panel.alarm_trigger
    entity_id: alarm_control_panel.ha_alarm
```
