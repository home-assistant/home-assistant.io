---
title: "Alarm is armed home"
condition: alarm_control_panel.is_armed_home
domain: alarm_control_panel
description: "Tests if one or more alarms are armed in home mode."
related_conditions:
  - alarm_control_panel.is_armed
  - alarm_control_panel.is_disarmed
---

The **Alarm is armed home** condition passes when one or more alarm control panel {% term entities %} are armed in home mode. Use it to gate automations to your nighttime or stay-at-home routine, for example, keeping exterior motion lights active while interior motion sensors stay quiet.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Alarm is armed home**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple alarm panels are targeted.
7. Under **For at least**, set how long the alarm must have been in this state before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple alarm panels are targeted, controls how results combine. Pick **Any** to pass if at least one targeted alarm is armed home, or **All** to pass only when every targeted alarm is armed home.
For at least:
  description: How long the alarm must have been armed in home mode before the condition passes. Set to zero to pass immediately.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `alarm_control_panel.is_armed_home`. A basic example looks like this:

{% example %}
condition: |
  condition: alarm_control_panel.is_armed_home
  target:
    entity_id: alarm_control_panel.hallway
{% endexample %}

This passes when the hallway alarm panel is currently armed in home mode.

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
    Duration the alarm must have been armed in home mode before the condition passes. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Alarm panels that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as armed home. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted alarm is unavailable.
- If you want to check whether the alarm is armed in any mode (not just home), use [Alarm is armed](/conditions/alarm_control_panel.is_armed/).
- To check the opposite state, use [Alarm is disarmed](/conditions/alarm_control_panel.is_disarmed/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: activate exterior motion lights only when armed home

When an exterior motion sensor detects movement, turn on the porch and driveway lights, but only while the alarm is armed in home mode. During the day when the alarm is disarmed, you probably don't need those lights.

- **Trigger**: State: Exterior motion sensor detects motion
- **Condition**: Alarm is armed home
- **Target**: Hallway alarm panel
- **Condition passes if**: Any
- **Action**: Turn on light (porch, driveway)

{% details "YAML example for exterior motion lights when armed home" %}

{% example %}
automation: |
  alias: "Exterior motion lights when armed home"
  triggers:
    - trigger: state
      entity_id: binary_sensor.driveway_motion
      to: "on"
  conditions:
    - condition: alarm_control_panel.is_armed_home
      target:
        entity_id: alarm_control_panel.hallway
      options:
        behavior: any
  actions:
    - action: light.turn_on
      target:
        entity_id:
          - light.porch
          - light.driveway
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
