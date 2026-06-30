---
title: "Alarm armed"
trigger: alarm_control_panel.armed
domain: alarm_control_panel
description: "Triggers when one or more alarms become armed, regardless of the mode."
related_triggers:
  - alarm_control_panel.armed_away
  - alarm_control_panel.armed_home
  - alarm_control_panel.armed_night
  - alarm_control_panel.armed_vacation
---

The **Alarm armed** trigger fires after an alarm control panel {% term entity %} becomes armed, regardless of the arming mode. It covers away, home, night, vacation, and any other armed state your alarm supports. Use it when you want a single automation to respond the moment the house is secured, like turning off all the lights, locking the front door, or sending a quick confirmation to your phone that the alarm is set.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Alarm armed**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple alarm panels are targeted.
7. Under **For at least**, set how long the alarm must stay armed before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple alarm panels are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted panel arms, **First** to fire only when the first panel in a group arms, or **All** to fire only after every targeted panel is armed.
For at least:
  description: How long the alarm must stay armed before the trigger fires. Set to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `alarm_control_panel.armed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: alarm_control_panel.armed
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This fires every time `alarm_control_panel.home_alarm` transitions to any armed state.

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
- This trigger responds to _any_ armed mode. If you only want to react to a specific mode, use [Alarm armed away](/triggers/alarm_control_panel.armed_away/), [Alarm armed home](/triggers/alarm_control_panel.armed_home/), [Alarm armed night](/triggers/alarm_control_panel.armed_night/), or [Alarm armed vacation](/triggers/alarm_control_panel.armed_vacation/) instead.
- Pair this trigger with a notification action to confirm that the alarm is set whenever anyone arms it, no matter the mode.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: lock the front door and turn off the living room lights when the alarm is armed

When someone arms the alarm in any mode, the house locks down. The front door locks, the living room lights turn off, and you get a quick confirmation that everything is secured.

- **Trigger**: Alarm armed
- **Target**: Home alarm panel
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Lock the front door
- **Action**: Turn off the living room lights

{% details "YAML example for locking down on arm" %}

{% example %}
automation: |
  alias: "Lock down when alarm is armed"
  triggers:
    - trigger: alarm_control_panel.armed
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.front_door
    - action: light.turn_off
      target:
        area_id: living_room
{% endexample %}

{% enddetails %}

### Automation: send a confirmation notification when any alarm is armed

You want to know the alarm is set, especially when someone else in the household arms it. This automation sends a quick notification to your phone the instant any alarm panel in the house becomes armed.

- **Trigger**: Alarm armed
  - **Target**: All alarm panels (by label)
  - **Trigger when**: Each
  - **For at least**: 00:00:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for arm confirmation notification" %}

{% example %}
automation: |
  alias: "Confirm alarm armed"
  triggers:
    - trigger: alarm_control_panel.armed
      target:
        label_id: alarm_panels
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The alarm has been armed."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
