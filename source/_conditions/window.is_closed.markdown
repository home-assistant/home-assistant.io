---
title: "Window is closed"
condition: window.is_closed
domain: window
description: "Tests if one or more windows are closed."
related_conditions:
  - window.is_open
---

The **Window is closed** condition passes when a targeted window is currently closed. Use it when you want to make sure the house is shut before you lock a door, arm an alarm, turn heating back on, or continue only if a window has stayed closed for a while.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area the window is in, like your bedroom or kitchen. You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Window is closed**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All** to control how the check behaves when multiple windows are targeted.
7. Under **For at least**, set how long the window must have been closed before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple windows are targeted, controls how results combine. Pick **Each** to pass if at least one targeted window is closed, or **All** to pass only when every targeted window is closed.
  required: true
For at least:
  description: How long the window must have been closed before the condition passes. Set to zero to pass immediately.
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `window.is_closed`. A basic example looks like this:

{% example %}
condition: |
  condition: window.is_closed
  target:
    entity_id: binary_sensor.bedroom_window
{% endexample %}

This passes when `binary_sensor.bedroom_window` is currently closed.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple windows are targeted, controls how results combine. Accepts `all` or `each`.
  required: true
  type: string
  default: each
for:
  description: >
    Duration the window must have been closed before the condition passes. Accepts a duration string like `00:05:00` for five minutes.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Windows that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as closed. Home Assistant skips them and evaluates the condition using the remaining targeted windows.
- This condition works with binary sensors and covers that use the `window` device class.
- To check the opposite state, use [Window is open](/conditions/window.is_open/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: lock front door at night only if all downstairs windows are closed

Before locking up for the night, you can check that every downstairs window is already shut.

- **Trigger**: Time: 23:00
- **Condition**: Window is closed
- **Target**: Downstairs windows label
- **Condition passes if**: All
- **Action**: Lock: Lock

{% details "YAML example for locking up after all windows are closed" %}

{% example %}
automation: |
  alias: "Lock the front door when all downstairs windows are closed"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: window.is_closed
      target:
        label_id: downstairs_windows
      options:
        behavior: all
        for: "00:00:00"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

### Automation: restart the bedroom air conditioner only if the window has been closed for 15 minutes

If you use a motorized bedroom window to cool the room naturally, you might only want to turn the bedroom air conditioner back on after the window has been closed for a while.

- **Trigger**: Time pattern: Every 15 minutes
- **Condition**: Window is closed
- **Target**: Bedroom roof window cover
- **Condition passes if**: Any
- **For at least**: 00:15:00
- **Action**: Climate: Turn on the bedroom air conditioner

{% details "YAML example for restarting the bedroom air conditioner after the window stays closed" %}

{% example %}
automation: |
  alias: "Restart bedroom air conditioner after the window stays closed"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: window.is_closed
      target:
        entity_id: cover.bedroom_roof_window
      options:
        behavior: each
        for: "00:15:00"
  actions:
    - action: climate.turn_on
      target:
        entity_id: climate.bedroom
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
