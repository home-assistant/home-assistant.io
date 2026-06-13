---
title: "Alarm armed vacation"
trigger: alarm_control_panel.armed_vacation
domain: alarm_control_panel
description: "Triggers after one or more alarms become armed in vacation mode."
related_triggers:
  - alarm_control_panel.armed
  - alarm_control_panel.disarmed
---

The **Alarm armed vacation** trigger fires after an alarm control panel {% term entity %} switches to the armed vacation state. Vacation mode is for extended absences when you want maximum protection and the appearance that someone is still home. Use this trigger to start routines that simulate occupancy, like cycling lights on and off on a random schedule, pausing mail delivery notifications, or lowering the thermostat to save energy while you are away for days or weeks.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Alarm armed vacation**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple alarm panels are targeted.
7. Under **For at least**, set how long the alarm must stay armed vacation before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple alarm panels are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted panel arms vacation, **First** to fire only when the first panel in a group arms vacation, or **All** to fire only after every targeted panel is armed vacation.
For at least:
  description: How long the alarm must stay armed vacation before the trigger fires. Set to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `alarm_control_panel.armed_vacation`. A basic example looks like this:

{% example %}
trigger: |
  trigger: alarm_control_panel.armed_vacation
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This fires every time `alarm_control_panel.home_alarm` transitions to the armed vacation state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple alarm panels are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: >
    Duration the state must hold before firing. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when an alarm panel transitions from a known, valid state. If an alarm panel comes back from being unavailable (`unavailable`) or having an unknown state (`unknown`), the trigger does not fire for that recovery.
- Vacation mode is designed for extended absences. For day-to-day departures, [Alarm armed away](/triggers/alarm_control_panel.armed_away/) is usually the right choice.
- Pair this with automations that simulate occupancy to deter break-ins while you are traveling.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: simulate occupancy when vacation mode is armed

When you arm the alarm in vacation mode, turn on a helper that your other automations use for vacation-mode behavior. The house looks lived in even when you are hundreds of miles away.

- **Trigger**: Alarm armed vacation
- **Target**: Home alarm panel
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Turn on the vacation mode helper

{% details "YAML example for occupancy simulation" %}

{% example %}
automation: |
  alias: "Simulate occupancy on vacation"
  triggers:
    - trigger: alarm_control_panel.armed_vacation
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: input_boolean.turn_on
      target:
        entity_id: input_boolean.vacation_mode
{% endexample %}

{% enddetails %}

### Automation: lower the thermostat and notify the household when leaving for vacation

When vacation mode activates, drop the thermostat to save energy and send a message to every family member confirming that the house is in vacation lockdown.

- **Trigger**: Alarm armed vacation
- **Target**: Home alarm panel
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Set the thermostat to 15 degrees
- **Action**: Notify all household members

{% details "YAML example for vacation energy saving" %}

{% example %}
automation: |
  alias: "Vacation energy saving"
  triggers:
    - trigger: alarm_control_panel.armed_vacation
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.thermostat
      data:
        temperature: 15
    - action: notify.notify
      data:
        message: >
          Vacation mode activated. The thermostat
          is set to 15 degrees and the alarm is
          fully armed.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
