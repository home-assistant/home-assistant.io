---
title: "Alarm disarmed"
trigger: alarm_control_panel.disarmed
domain: alarm_control_panel
description: "Triggers after one or more alarms become disarmed."
related_triggers:
  - alarm_control_panel.armed
  - alarm_control_panel.triggered
---

The **Alarm disarmed** trigger fires after an alarm control panel {% term entity %} switches to the disarmed state. Use it to start welcome-home routines the moment the alarm is turned off: turn on the entryway lights, set the thermostat to a comfortable temperature, unlock the front door, or play your favorite playlist. Whether you disarm from a keypad, the app, or an automation, this trigger responds instantly.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Alarm disarmed**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple alarm panels are targeted.
7. Under **For at least**, set how long the alarm must stay disarmed before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple alarm panels are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted panel disarms, **First** to fire only when the first panel in a group disarms, or **All** to fire only after every targeted panel is disarmed.
  required: true
For at least:
  description: How long the alarm must stay disarmed before the trigger fires. Set to zero to fire immediately.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `alarm_control_panel.disarmed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: alarm_control_panel.disarmed
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This fires every time `alarm_control_panel.home_alarm` transitions to the disarmed state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple alarm panels are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: true
  type: string
  default: any
for:
  description: >
    Duration the state must hold before firing. Accepts a duration string like `00:05:00` for five minutes.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when an alarm panel transitions from a known, valid state. If an alarm panel comes back from being unavailable (`unavailable`) or having an unknown state (`unknown`), the trigger does not fire for that recovery.
- This trigger fires regardless of which armed mode the alarm was previously in. It responds when the alarm changes to disarmed from another valid state, including armed away, armed custom bypass, armed home, armed night, armed vacation, and triggered.
- To react when the alarm is armed instead of disarmed, use [Alarm armed](/triggers/alarm_control_panel.armed/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: welcome home with lights and comfortable temperature

When the alarm is disarmed, someone just walked in. Turn on the entryway light and set the thermostat to a comfortable temperature so the house feels warm and inviting from the first step through the door.

- **Trigger**: Alarm disarmed
- **Target**: Home alarm panel
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Turn on entryway lights
- **Action**: Set the thermostat to 21 degrees

{% details "YAML example for a welcome-home routine" %}

{% example %}
automation: |
  alias: "Welcome home routine"
  triggers:
    - trigger: alarm_control_panel.disarmed
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: light.turn_on
      target:
        area_id: entryway
    - action: climate.set_temperature
      target:
        entity_id: climate.thermostat
      data:
        temperature: 21
{% endexample %}

{% enddetails %}

### Automation: stop occupancy simulation when disarming after vacation

When you arrive home from vacation and disarm the alarm, turn off the occupancy simulation helper so lights stop cycling randomly. Your house returns to normal operation.

- **Trigger**: Alarm disarmed
- **Target**: Home alarm panel
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Turn off the vacation mode helper

{% details "YAML example for ending vacation simulation" %}

{% example %}
automation: |
  alias: "End vacation mode on disarm"
  triggers:
    - trigger: alarm_control_panel.disarmed
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: input_boolean.turn_off
      target:
        entity_id: input_boolean.vacation_mode
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
