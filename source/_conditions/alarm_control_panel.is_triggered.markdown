---
title: "Alarm is triggered"
condition: alarm_control_panel.is_triggered
domain: alarm_control_panel
description: "Tests if one or more alarms are triggered."
related_conditions:
  - alarm_control_panel.is_armed
  - alarm_control_panel.is_disarmed
---

The **Alarm is triggered** condition passes when one or more alarm control panel {% term entities %} are in a triggered state. Use it to gate your emergency response so sirens and notifications only fire while the alarm is genuinely going off, preventing false follow-up actions after the situation has been resolved.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Alarm is triggered**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All** to control how the check behaves when multiple alarm panels are targeted.
7. Under **For at least**, set how long the alarm must have been in the triggered state before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple alarm panels are targeted, controls how results combine. Pick **Each** to pass if at least one targeted alarm is triggered, or **All** to pass only when every targeted alarm is triggered.
For at least:
  description: How long the alarm must have been in the triggered state before the condition passes. Set to zero to pass immediately.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `alarm_control_panel.is_triggered`. A basic example looks like this:

{% example %}
condition: |
  condition: alarm_control_panel.is_triggered
  target:
    entity_id: alarm_control_panel.hallway
{% endexample %}

This passes when the hallway alarm panel is currently in a triggered state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple alarm panels are targeted, controls how results combine. Accepts `all` or `each`.
  required: false
  type: string
  default: each
for:
  description: >
    Duration the alarm must have been in the triggered state before the condition passes. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Alarm panels that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as triggered. With **Each** behavior, they are skipped. With **All** behavior, the condition fails if every targeted alarm is unavailable.
- To check whether the alarm is armed, use [Alarm is armed](/conditions/alarm_control_panel.is_armed/).
- To check the opposite state, use [Alarm is disarmed](/conditions/alarm_control_panel.is_disarmed/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send an emergency notification when a panic button is pressed

When a panic button is pressed, send an urgent push notification with the alarm status, but only if the alarm is genuinely triggered. This prevents false alerts from accidental button presses when the alarm is in a normal state.

- **Trigger**: State: Panic button pressed
- **Condition**: Alarm is triggered
  - **Target**: Hallway alarm panel
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an emergency notification gated on triggered alarm" %}

{% example %}
automation: |
  alias: "Emergency notification on panic button"
  triggers:
    - trigger: state
      entity_id: input_button.panic
  conditions:
    - condition: alarm_control_panel.is_triggered
      target:
        entity_id: alarm_control_panel.hallway
      options:
        behavior: each
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Alarm triggered"
        message: >
          The alarm has been triggered.
          Check the cameras immediately.
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
