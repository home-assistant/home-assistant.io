---
title: Manual Alarm control panel
description: Instructions on how to integrate manual alarms into Home Assistant.
ha_category:
  - Alarm
  - Helper
ha_release: 0.7.6
ha_quality_scale: internal
ha_domain: manual
ha_iot_class: Calculated
ha_platforms:
  - alarm_control_panel
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `manual` alarm control panel {% term integration %} enables you to create an alarm system in Home Assistant.

## Configuration

To enable this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual
```

{% configuration %}
name:
  description: The name of the alarm.
  required: false
  type: string
  default: HA Alarm
unique_id:
  description: Create a unique id for the entity.
  required: false
  type: string
code:
  description: >
    If defined, specifies a code to enable or disable the alarm in the frontend.
    Only one of **code** and **code_template** can be specified.
  required: exclusive
  type: string
code_template:
  description: >
    If defined, returns a code to enable or disable the alarm in the frontend; an empty string disables checking the code.
    Inside the template, the variables **from_state** and **to_state** identify the current and desired state.
    Only one of **code** and **code_template** can be specified.
  required: exclusive
  type: string
code_arm_required:
  description: If true, the code is required to arm the alarm.
  required: false
  type: boolean
  default: true
delay_time:
  description: The time in seconds of the 'pending' state before triggering the alarm.
  required: false
  type: integer
  default: 60
arming_time:
  description: The time in seconds of the 'arming' state before effecting a state change.
  required: false
  type: integer
  default: 60
trigger_time:
  description: The time in seconds of the 'triggered' state in which the alarm is firing.
  required: false
  type: integer
  default: 120
disarm_after_trigger:
  description: If true, the alarm will automatically disarm after it has been triggered instead of returning to the previous state.
  required: false
  type: boolean
  default: false
arming_states:
  description: Limit the supported arming states.
  required: false
  type: list
  default: armed_away, armed_home, armed_night, armed_vacation, armed_custom_bypass
armed_custom_bypass/armed_home/armed_away/armed_night/armed_vacation/disarmed/triggered:
  description: State specific settings
  required: false
  type: list
  keys:
    delay_time:
      description: State specific setting for **delay_time** (all states except **triggered**)
      required: false
      type: integer
    arming_time:
      description: State specific setting for **arming_time** (all states except **disarmed** and **triggered**)
      required: false
      type: integer
    trigger_time:
      description: State specific setting for **trigger_time** (all states except **triggered**)
      required: false
      type: integer
{% endconfiguration %}

## State machine

The state machine of the manual alarm integration is complex but powerful. The
transitions are timed according to three values, **delay_time**, **arming_time**
and **trigger_time**. The values in turn can come from the default configuration
variable or from a state-specific override.

When the alarm is armed, its state first goes to **arming** for a number
of seconds equal to the destination state's **arming_time**, and then
transitions to one of the "armed" states. Note that **code_template**
never receives "arming" in the **to_state** variable; instead,
**to_state** contains the state which the user has requested.  However,
**from_state** *can* contain "arming".

When the alarm is triggered, its state goes to **pending** for a number of
seconds equal to the previous state's **delay_time**. Then the alarm transitions to the "triggered"
states. The code is never checked when triggering the alarm, so the
**to_state** variable of **code_template** cannot ever contain "triggered"
either; again, **from_state** *can* contain "triggered".

The alarm remains in the "triggered" state for a number of seconds equal to the
previous state's **trigger_time**. Then, depending on **disarm_after_trigger**,
it goes back to either the previous state or **disarmed**. If the previous
state's **trigger_time** is zero, the transition to "triggered" is entirely
blocked and the alarm remains in the armed state.

Each of the settings is useful in different scenarios. **arming_time** gives
you some time to leave the building (for "armed" states).

**delay_time** can be used to allow some time to disarm the alarm, with
flexibility. For example, you could specify a delay time for the
"armed away" state, in order to avoid triggering the alarm while the
garage door opens, but not for the "armed home" state.

**trigger_time** is useful to disable the alarm when disarmed, but it can also
be used for example to sound the siren for a shorter time during the night.

## Examples

In the configuration example below:

- The only arming states allowed are `armed_away` and `armed_home`.
- The `disarmed` state never triggers the alarm.
- The `armed_home` state will leave no time to leave the building or disarm the alarm.
- The other states will give 30 seconds to leave the building before triggering the alarm, and 20 seconds to disarm the alarm when coming back.

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual
    name: Home Alarm
    unique_id: a_very_unique_id
    code: "1234"
    arming_time: 30
    delay_time: 20
    trigger_time: 4
    arming_states:
      - armed_away
      - armed_home
    disarmed:
      trigger_time: 0
    armed_home:
      arming_time: 0
      delay_time: 0
```

In the rest of this section, you find some real-life examples on how to use this panel.

### Sensors

Using sensors to trigger the alarm.

```yaml
automation:
- alias: 'Trigger alarm while armed away'
  triggers:
    - trigger: state
      entity_id: sensor.pir1
      to: "active"
    - trigger: state
      entity_id: sensor.pir2
      to: "active"
    - trigger: state
      entity_id: sensor.door
      to: "open"
    - trigger: state
      entity_id: sensor.window
      to: "open"
  conditions:
    - condition: state
      entity_id: alarm_control_panel.home_alarm
      state: armed_away
  actions:
    - action: alarm_control_panel.alarm_trigger
      target:
        entity_id: alarm_control_panel.home_alarm
```

Sending a notification when the alarm is triggered.

```yaml
automation:
  - alias: 'Send notification when alarm triggered'
    triggers:
      - trigger: state
        entity_id: alarm_control_panel.home_alarm
        to: "triggered"
    actions:
      - action: notify.notify
        data:
          message: "ALARM! The alarm has been triggered"
```

Disarming the alarm when the door is properly unlocked.

```yaml
automation:
  - alias: 'Disarm alarm when door unlocked by keypad'
    triggers:
      - trigger: state
        entity_id: sensor.front_door_lock_alarm_type
        to: "19"
        # many z-wave locks use Alarm Type 19 for 'Unlocked by Keypad'
    actions:
      - action: alarm_control_panel.alarm_disarm
        target:
          entity_id: alarm_control_panel.home_alarm
```

Sending a Notification when the Alarm is Armed (Away/Home), Disarmed and in Pending Status

{% raw %}

```yaml
- alias: 'Send notification when alarm is Disarmed'
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: "disarmed"
  actions:
    - action: notify.notify
      data:
        message: "ALARM! The alarm is Disarmed at {{ states('sensor.date_time') }}"
```

```yaml
- alias: 'Send notification when alarm is in pending status'
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: "pending"
  actions:
    - action: notify.notify
      data:
        message: "ALARM! The alarm is in pending status at {{ states('sensor.date_time') }}"
```

```yaml
- alias: 'Send notification when alarm is Armed in Away mode'
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: "armed_away"
  actions:
    - action: notify.notify
      data:
        message: "ALARM! The alarm is armed in Away mode {{ states('sensor.date_time') }}"
```

```yaml
- alias: 'Send notification when alarm is Armed in Home mode'
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home_alarm
      to: "armed_home"
  actions:
    - action: notify.notify
      data:
        # Using multi-line notation allows for easier quoting
        message: >
          ALARM! The alarm is armed in Home mode {{ states('sensor.date_time') }}
```

{% endraw %}
