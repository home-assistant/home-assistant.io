---
title: "Alarm armed away"
trigger: alarm_control_panel.armed_away
domain: alarm_control_panel
description: "Triggers when one or more alarms become armed in away mode."
related_triggers:
  - alarm_control_panel.armed
  - alarm_control_panel.disarmed
---

The **Alarm armed away** trigger fires after an alarm control panel {% term entity %} switches to the armed away state. Away mode is typically the full-protection mode you set when everyone leaves the house. Use this trigger to automate tasks that should only happen when the home is completely empty, like turning off the HVAC to save energy, closing the garage door, or starting a security camera recording schedule.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Alarm armed away**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple alarm panels are targeted.
7. Under **For at least**, set how long the alarm must stay armed away before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple alarm panels are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted panel arms away, **First** to fire only when the first panel in a group arms away, or **All** to fire only after every targeted panel is armed away.
For at least:
  description: How long the alarm must stay armed away before the trigger fires. Set to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `alarm_control_panel.armed_away`. A basic example looks like this:

{% example %}
trigger: |
  trigger: alarm_control_panel.armed_away
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This fires every time `alarm_control_panel.home_alarm` transitions to the armed away state.

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
- Away mode typically means all sensors are active, including interior motion sensors. If you only want perimeter protection while you are home, look at [Alarm armed home](/triggers/alarm_control_panel.armed_home/) instead.
- To react when the alarm is disarmed after being away, use [Alarm disarmed](/triggers/alarm_control_panel.disarmed/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn off the HVAC and close the garage when armed away

When the alarm is armed in away mode, nobody is home. Save energy by turning off the climate system and make sure the garage door is closed.

- **Trigger**: Alarm armed away
- **Target**: Home alarm panel
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Turn off the thermostat
- **Action**: Close the garage door

{% details "YAML example for energy saving on away arm" %}

{% example %}
automation: |
  alias: "Save energy when armed away"
  triggers:
    - trigger: alarm_control_panel.armed_away
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: climate.turn_off
      target:
        entity_id: climate.thermostat
    - action: cover.close_cover
      target:
        entity_id: cover.garage_door
{% endexample %}

{% enddetails %}

### Automation: start security camera recording when everyone leaves

When the alarm switches to away mode, start recording on all security cameras so you have footage of everything that happens while the house is empty.

- **Trigger**: Alarm armed away
- **Target**: Home alarm panel
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Turn on security cameras

{% details "YAML example for camera recording on away" %}

{% example %}
automation: |
  alias: "Record cameras when armed away"
  triggers:
    - trigger: alarm_control_panel.armed_away
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: switch.turn_on
      target:
        label_id: security_cameras
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
