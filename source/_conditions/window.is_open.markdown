---
title: "Window is open"
condition: window.is_open
domain: window
description: "Tests if one or more windows are open."
related_conditions:
  - window.is_closed
---

The **Window is open** condition passes when a targeted window is currently open. Use it when you want an automation to continue only if fresh air is coming in, or when you want to warn someone before leaving the house with a window still open.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area the window is in, like your bedroom or kitchen. You can also select a floor, a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Window is open**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple windows are targeted.
7. Under **For at least**, set how long the window must have been open before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple windows are targeted, controls how results combine. Pick **Any** to pass if at least one targeted window is open, or **All** to pass only when every targeted window is open.
  required: true
For at least:
  description: How long the window must have been open before the condition passes. Set to zero to pass immediately.
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `window.is_open`. A basic example looks like this:

{% example %}
condition: |
  condition: window.is_open
  target:
    entity_id: binary_sensor.kitchen_window
{% endexample %}

This passes when `binary_sensor.kitchen_window` is currently open.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple windows are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
for:
  description: >
    Duration the window must have been open before the condition passes. Accepts a duration string like `00:05:00` for five minutes.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Windows that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as open. Home Assistant skips them and evaluates the condition using the remaining targeted windows.
- This condition works with binary sensors and covers that use the `window` device class.
- To check the opposite state, use [Window is closed](/conditions/window.is_closed/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: get reminder if any downstairs window is still open at bedtime

At bedtime, a reminder can help you notice an open window before you lock up for the night.

- **Trigger**: Time: 22:30
- **Condition**: Window is open
- **Target**: Downstairs windows label
- **Condition passes if**: Any
- **Action**: Send a mobile notification

{% details "YAML example for a bedtime open-window reminder" %}

{% example %}
automation: |
  alias: "Remind me if a downstairs window is open at bedtime"
  triggers:
    - trigger: time
      at: "22:30:00"
  conditions:
    - condition: window.is_open
      target:
        label_id: downstairs_windows
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "Window still open"
        message: "At least one downstairs window is still open."
{% endexample %}

{% enddetails %}

### Automation: turn off heater if roof window has been open for 10 minutes

If a motorized roof window has been open for a while, turning off the heater can help avoid wasting energy.

- **Trigger**: Time pattern: Every 10 minutes
- **Condition**: Window is open
- **Target**: Bedroom roof window cover
- **Condition passes if**: Any
- **For at least**: 00:10:00
- **Action**: Climate: Turn off

{% details "YAML example for turning off heating when a roof window stays open" %}

{% example %}
automation: |
  alias: "Turn off heating if the roof window stays open"
  triggers:
    - trigger: time_pattern
      minutes: "/10"
  conditions:
    - condition: window.is_open
      target:
        entity_id: cover.bedroom_roof_window
      options:
        behavior: any
        for: "00:10:00"
  actions:
    - action: climate.turn_off
      target:
        entity_id: climate.bedroom
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
