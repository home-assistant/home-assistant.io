---
layout: page
title: "Manual Alarm Control Panel"
description: "Instructions on how to integrate manual alarms into Home Assistant."
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
- **code_template** (*Optional*): If defined, returns a code to enable or disable the alarm in the frontend; an empty string disables checking the code.  Inside the template, the variables **from_state** and **to_state** identify the current and desired state.  Only one of **code** and **code_template** can be specified.
- **delay_time** (*Optional*): The time in seconds of the pending time before triggering the alarm. Default is 0 seconds.
- **pending_time** (*Optional*): The time in seconds of the pending time before effecting a state change. Default is 60 seconds.
- **trigger_time** (*Optional*): The time in seconds of the trigger time in which the alarm is firing. Default is 120 seconds.
- **disarm_after_trigger** (*Optional*): If true, the alarm will automatically disarm after it has been triggered instead of returning to the previous state.
- **armed_custom_bypass/armed_home/armed_away/armed_night/disarmed/triggered** (*Optional*): State specific settings
  - **delay_time** (*Optional*): State specific setting for **delay_time** (all states except **triggered**)
  - **pending_time** (*Optional*): State specific setting for **pending_time** (all states except **disarmed**)
  - **trigger_time** (*Optional*): State specific setting for **trigger_time** (all states except **triggered**)

## {% linkable_title State machine %}

The state machine of the manual alarm component is complex but powerful.  The
transitions are timed according to three values, **delay_time**, **pending_time**
and **trigger_time**.  The values in turn can come from the default configuration
variable or from a state-specific override.

When the alarm is armed, its state first goes to **pending** for a number
of seconds equal to the destination state's **pending_time**, and then
transitions to one of the "armed" states.  Note that **code_template**
never receives "pending" in the **to_state** variable; instead,
**to_state** contains the state which the user has requested.  However,
**from_state** *can* contain "pending".

When the alarm is triggered, its state goes to **pending** for a number of
seconds equal to the previous state's **delay_time** plus the triggered
state's **pending_time**.  Then the alarm transitions to the "triggered"
states.  The code is never checked when triggering the alarm, so the
**to_state** variable of **code_template** cannot ever contain "triggered"
either; again, **from_state** *can* contain "triggered".

The alarm remains in the "triggered" state for a number of seconds equal to the
previous state's **trigger_time**.  Then, depending on **disarm_after_trigger**,
it goes back to either the previous state or **disarmed**.  If the previous
state's **trigger_time** is zero, the transition to "triggered" is entirely
blocked and the alarm remains in the armed state.

Each of the settings is useful in different scenarios.  **pending_time** gives
you some time to leave the building (for "armed" states) or to disarm the alarm
(for the "triggered" state).

**delay_time** can also be used to allow some time to disarm the alarm, but with
more flexibility.  For example, you could specify a delay time for the
"armed away" state, in order to avoid triggering the alarm while the
garage door opens, but not for the "armed home" state.

**trigger_time** is useful to disable the alarm when disarmed, but it can also
be used for example to sound the siren for a shorter time during the night.

In the config example below:

- the disarmed state never triggers the alarm;

- the armed_home state will leave no time to leave the building or disarm the alarm;

- while other states state will give 30 seconds to leave the building before triggering the alarm, and 20 seconds to disarm the alarm when coming back.

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual
    name: Home Alarm
    code: 1234
    pending_time: 30
    delay_time: 20
    trigger_time: 4
    disarmed:
      trigger_time: 0
    armed_home:
      pending_time: 0
      delay_time: 0
```

## {% linkable_title Examples %}

In this section, you find some real-life examples of how to use this panel.

### {% linkable_title Sensors %}

Using sensors to trigger the alarm.

```yaml
automation:
- alias: 'Trigger alarm while armed away'
  trigger:
    - platform: state
      entity_id: sensor.pir1
      to: 'active'
    - platform: state
      entity_id: sensor.pir2
      to: 'active'
    - platform: state
      entity_id: sensor.door
      to: 'open'
    - platform: state
      entity_id: sensor.window
      to: 'open'
  condition:
    - condition: state
      entity_id: alarm_control_panel.ha_alarm
      state: armed_away
  action:
    service: alarm_control_panel.alarm_trigger
    entity_id: alarm_control_panel.ha_alarm
```

Sending a notification when the alarm is triggered.

```yaml
automation:
  - alias: 'Send notification when alarm triggered'
    trigger:
      - platform: state
        entity_id: alarm_control_panel.ha_alarm
        to: 'triggered'
    action:
      - service: notify.notify
        data:
          message: "ALARM! The alarm has been triggered"
```

Disarming the alarm when the door is properly unlocked.

```yaml
automation:
  - alias: 'Disarm alarm when door unlocked by keypad'
    trigger:
      - platform: state
        entity_id: sensor.front_door_lock_alarm_type
        to: '19'
        # many z-wave locks use Alarm Type 19 for 'Unlocked by Keypad'
    action:
      - service: alarm_control_panel.alarm_disarm
        entity_id: alarm_control_panel.house_alarm
```
