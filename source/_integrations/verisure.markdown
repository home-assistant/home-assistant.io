---
title: Verisure
description: Instructions on how to setup Verisure devices within Home Assistant.
ha_category:
  - Alarm
  - Binary Sensor
  - Camera
  - Hub
  - Lock
  - Sensor
  - Switch
ha_release: pre 0.7
ha_iot_class: Cloud Polling
ha_domain: verisure
ha_codeowners:
  - '@frenck'
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - camera
  - diagnostics
  - lock
  - sensor
  - switch
ha_config_flow: true
ha_dhcp: true
ha_integration_type: integration
---

Home Assistant has support to integrate your [Verisure](https://www.verisure.com/) devices.

There is currently support for the following device types within Home Assistant:

- Alarm
- Camera
- Switch (Smartplug)
- Sensor (Thermometers, Hygrometers and Mouse detectors)
- Lock
- Binary Sensor (Door & Window)

{% include integrations/config_flow.md %}

## Alarm Control Panel

The Verisure alarm control panel platform allows you to control your [Verisure](https://www.verisure.com/) Alarms.

The requirement is that you have setup your Verisure hub first, with the instruction above.

The `changed_by` attribute enables one to be able to take different actions depending on who armed/disarmed the alarm in [automation](/getting-started/automation/).

{% raw %}

```yaml
automation:
  - alias: "Alarm status changed"
    trigger:
      - platform: state
        entity_id: alarm_control_panel.alarm_1
    action:
      - service: notify.notify
        data:
          message: >
            Alarm changed from {{ trigger.from_state.state }}
            to {{ trigger.to_state.state }}
            by {{ trigger.to_state.attributes.changed_by }}
```

{% endraw %}

## Services

| Service | Description |
| ------- | ----------- |
| disable_autolock | Disables autolock function for a specific lock. |
| enable_autolock | Enables autolock function for a specific lock. |
| smartcam_capture | Capture a new image from a specific smartcam. |

## Lock

| method state attribute | Description |
| ------- | ----------- |
| thumb | Lock was locked/unlocked by interior thumb switch |
| star | Lock was locked by exterior star button |
| code | Lock was unlocked by exterior code |
| auto | Lock was locked/unlocked automatically by Verisure rule |
| remote | Lock was locked/unlocked automatically by Verisure App |
