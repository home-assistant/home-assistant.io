---
title: "Alarm armed home"
trigger: alarm_control_panel.armed_home
domain: alarm_control_panel
description: "Triggers after one or more alarms become armed in home mode."
related_triggers:
  - alarm_control_panel.armed
  - alarm_control_panel.disarmed
---

The **Alarm armed home** trigger fires after an alarm control panel {% term entity %} switches to the armed home state. Home mode typically activates perimeter sensors (doors and windows) while leaving interior motion sensors inactive, so you move around freely inside. Use this trigger to run automations that should start when you are home but want the exterior secured, like locking exterior doors, dimming the porch lights, or sending a confirmation that the perimeter is protected.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Alarm armed home**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple alarm panels are targeted.
7. Under **For at least**, set how long the alarm must stay armed home before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple alarm panels are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted panel arms home, **First** to fire only when the first panel in a group arms home, or **All** to fire only after every targeted panel is armed home.
For at least:
  description: How long the alarm must stay armed home before the trigger fires. Set to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `alarm_control_panel.armed_home`. A basic example looks like this:

{% example %}
trigger: |
  trigger: alarm_control_panel.armed_home
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This fires every time `alarm_control_panel.home_alarm` transitions to the armed home state.

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
- Home mode protects the perimeter while allowing interior movement. If you want full protection with all sensors active, use [Alarm armed away](/triggers/alarm_control_panel.armed_away/) instead.
- To react when the alarm is disarmed from home mode, use [Alarm disarmed](/triggers/alarm_control_panel.disarmed/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: lock exterior doors when armed home

When you arm the alarm in home mode for the evening, make sure every exterior door locks automatically. You settle in for the night knowing the perimeter is secure.

- **Trigger**: Alarm armed home
- **Target**: Home alarm panel
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Lock all exterior doors

{% details "YAML example for locking doors on home arm" %}

{% example %}
automation: |
  alias: "Lock doors when armed home"
  triggers:
    - trigger: alarm_control_panel.armed_home
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: lock.lock
      target:
        label_id: exterior_doors
{% endexample %}

{% enddetails %}

### Automation: dim the porch light when the perimeter is armed

When you arm the alarm in home mode, dim the porch light to a gentle glow. It stays on enough to light the walkway, but signals that the house is locked up for the evening.

- **Trigger**: Alarm armed home
- **Target**: Home alarm panel
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Dim porch light to 20%

{% details "YAML example for dimming porch lights" %}

{% example %}
automation: |
  alias: "Dim porch lights on home arm"
  triggers:
    - trigger: alarm_control_panel.armed_home
      target:
        entity_id: alarm_control_panel.home_alarm
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
      data:
        brightness_pct: 20
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
