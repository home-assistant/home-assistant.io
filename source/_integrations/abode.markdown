---
title: Abode
description: Instructions on integrating Abode home security with Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Camera
  - Cover
  - Hub
  - Light
  - Lock
  - Sensor
  - Switch
ha_release: 0.52
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@shred86'
ha_domain: abode
ha_homekit: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - camera
  - cover
  - light
  - lock
  - sensor
  - switch
ha_integration_type: integration
---

The **Abode** {% term integration %} allows you to integrate your Abode Home Security systems into Home Assistant and use its alarm system and sensors to trigger automations.

Please visit the [Abode website](https://goabode.com/) for further information about Abode Security.

There is currently support for the following {% term device %} types within Home Assistant:

- **Alarm control panel**: Reports on the current alarm status and can be used to arm and disarm the system.
- **Binary sensor**: Reports on `Quick Actions`, `Door Contacts`, `Connectivity` {% term sensors %} (remotes, keypads, and status indicators), `Moisture` sensors, and `Motion` or `Occupancy` sensors.
- **Camera**: Reports on `Camera` devices and will download and show the latest captured still image. Can be turned off and on using the [`camera.turn_off`](/integrations/camera/#action-turn_off) and [`camera.turn_on`](/integrations/camera/#action-turn_on) {% term actions %}.
- **Cover**: Reports on `Secure Barriers` and can be used to open and close the cover.
- **Lock**: Reports on `Door Locks` and can be used to lock and unlock the door.
- **Light**: Reports on `Dimmer` lights and can be used to dim or turn the light on and off.
- **Switch**: Reports on `Power Switch` and `Water Valve` devices which can be turned on and off. Also reports on `Automations` set up in the Abode system and allows you to activate or deactivate them.
- **Sensor**: Reports on `Temperature`, `Humidity`, and `Light` sensors.

{% include integrations/config_flow.md %}

## Events

There are a number of {% term events %} that can be triggered from Abode.
They are grouped into the below events:

- **abode_alarm**: Fired when an alarm event is triggered from Abode. This includes Smoke, CO, Panic, and Burglar alarms.
- **abode_alarm_end**: Fired when an alarm end event is triggered from Abode.
- **abode_automation**: Fired when an Automation is triggered from Abode.
- **abode_panel_fault**: Fired when there is a fault with the Abode hub. This includes events like loss of power, low battery, tamper switches, polling failures, and signal interference.
- **abode_panel_restore**: Fired when the panel fault is restored.
- **abode_disarm**: Fired when the alarm is disarmed.
- **abode_arm**: Fired when the alarm is armed (home or away).
- **abode_arm_fault**: Fired when the alarm is armed (home or away) and has a fault. This includes open door/windows, low battery, backup connection. abode_arm is not fired if a fault is present.
- **abode_test**: Fired when a sensor is in test mode.
- **abode_capture**: Fired when an image is captured.
- **abode_device**: Fired for device changes/additions/deletions.

All {% term events %} have the fields:

| Field | Description |
| ----- | ----------- |
| `device_id` | The Abode device ID of the event. |
| `device_name` | The Abode device name of the event. |
| `device_type` | The Abode device type of the event. |
| `event_code` | The event code of the event. |
| `event_name` | The name of the event. |
| `event_type` | The type of the event. |
| `event_utc` | The UTC timestamp of the event. |
| `user_name` | The Abode user that triggered the event, if applicable. |
| `app_type` | The Abode app that triggered the event (e.g.,  web app, iOS app, etc.). |
| `event_by` | The keypad user that triggered the event. |
| `date` | The date of the event in the format `MM/DD/YYYY`. |
| `time` | The time of the event in the format `HH:MM AM`. |

There is a unique list of known event_codes are defined in
[events.csv](https://github.com/jaraco/jaraco.abode/blob/main/jaraco/abode/helpers/events.csv)
and the inferred groups and their ranges of event codes are defined in
[timeline.py](https://github.com/jaraco/jaraco.abode/blob/main/jaraco/abode/helpers/timeline.py).

## Actions

Available {% term actions %}: `change_setting`, `capture_image`, `trigger_automation`

### Action `change_setting`

Change settings on your Abode system.
For a full list of settings and valid values, consult the
[`jaraco.abode` settings section](https://github.com/jaraco/jaraco.abode/blob/main/README.rst#settings).

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `setting` | No | The setting you wish to change. |
| `value` | No | The value you wish to change the setting to. |

### Action `capture_image`

Request a new still image from your Abode camera.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | String or list of strings that point at `entity_id`s of Abode cameras. |

### Action `trigger_automation`

Trigger an automation on your Abode system.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | No | String or list of strings that point at `entity_id`s of switches that represent your Abode automations. |
