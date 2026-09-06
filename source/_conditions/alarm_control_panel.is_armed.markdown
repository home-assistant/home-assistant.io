---
title: "Alarm is armed"
condition: alarm_control_panel.is_armed
domain: alarm_control_panel
description: "Tests if one or more alarms are armed."
related_conditions:
  - alarm_control_panel.is_disarmed
  - alarm_control_panel.is_triggered
---

The **Alarm is armed** condition passes when one or more alarm control panel {% term entities %} are currently armed, regardless of the arming mode. Use it to ensure automations only run when the alarm is actually set, so your motion-triggered lights stay quiet when nobody is home to see them.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Alarm is armed**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple alarm panels are targeted.
7. Under **For at least**, set how long the alarm must have been armed before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple alarm panels are targeted, controls how results combine. Pick **Any** to pass if at least one targeted alarm is armed, or **All** to pass only when every targeted alarm is armed.
For at least:
  description: How long the alarm must have been armed before the condition passes. Set to zero to pass immediately.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `alarm_control_panel.is_armed`. A basic example looks like this:

{% example %}
condition: |
  condition: alarm_control_panel.is_armed
  target:
    entity_id: alarm_control_panel.hallway
{% endexample %}

This passes when the hallway alarm panel is currently armed in any mode.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple alarm panels are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    Duration the alarm must have been armed before the condition passes. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition matches any arming mode, including away, home, night, vacation, and custom bypass. If you need to check a specific mode, use the dedicated condition for that mode, such as [Alarm is armed away](/conditions/alarm_control_panel.is_armed_away/) or [Alarm is armed home](/conditions/alarm_control_panel.is_armed_home/).
- Alarm panels that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as armed. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted alarm is unavailable.
- To check the opposite state, use [Alarm is disarmed](/conditions/alarm_control_panel.is_disarmed/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn off idle appliances at midnight if the alarm is armed

At midnight, power off standby appliances like the TV and coffee maker, but only when the alarm is armed. If nobody bothered to arm the alarm, someone is probably still awake and using them.

- **Trigger**: Time: 00:00
- **Condition**: Alarm is armed
- **Target**: Hallway alarm panel
- **Condition passes if**: Any
- **Action**: Switch: Turn off (TV, coffee maker)

{% details "YAML example for turning off appliances when armed at midnight" %}

{% example %}
automation: |
  alias: "Turn off appliances at midnight when armed"
  triggers:
    - trigger: time
      at: "00:00:00"
  conditions:
    - condition: alarm_control_panel.is_armed
      target:
        entity_id: alarm_control_panel.hallway
      options:
        behavior: any
  actions:
    - action: switch.turn_off
      target:
        entity_id:
          - switch.tv_plug
          - switch.coffee_maker
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
