---
title: "Fan is on"
condition: fan.is_on
domain: fan
description: "Tests if one or more fans are on."
related_conditions:
  - fan.is_off
---

The **Fan is on** condition is useful when an automation should continue only if a fan is already running. Use it to avoid duplicate actions, wait for ventilation before doing something else, or branch your automation based on whether a room already has airflow.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the fan you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Fan is on**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the fan must have been on.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple fans are targeted, controls whether **Any** targeted fan must be on or **All** targeted fans must be on.
  required: false
For at least:
  description: How long the fan must have been on for the condition to pass.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `fan.is_on`. A basic example looks like this:

{% example %}
condition: |
  condition: fan.is_on
  target:
    entity_id: fan.office
  options:
    behavior: any
    for: "00:15:00"
{% endexample %}

This passes when `fan.office` has been on for 15 minutes.

### Options in YAML

{% options_yaml %}
behavior:
  description: When multiple fans are targeted, controls whether `any` or `all` targeted fans must be on.
  required: false
  type: string
  default: any
for:
  description: How long the fan must have been on for the condition to pass. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A fan in the `unknown` or `unavailable` state does not count as on.
- With **All**, every targeted fan must match. With **Any**, one matching fan is enough.
- To check for the opposite state, use [Fan is off](/conditions/fan.is_off/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: send a reminder if a window opens while the fan is running

If a window opens while the bedroom fan is running, you may want a reminder so you can decide whether to keep using the fan.

- **Trigger**: State: Window changes to open
- **Condition**: Fan is on
  - **Target**: Bedroom fan
  - **Condition passes if**: Any
  - **For at least**: 00:00:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a window and fan reminder" %}

{% example %}
automation: |
  alias: "Bedroom window opened while fan runs"
  triggers:
    - trigger: state
      entity_id: binary_sensor.bedroom_window
      to: "on"
  conditions:
    - condition: fan.is_on
      target:
        entity_id: fan.bedroom
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The bedroom window is open and the fan is still running."
{% endexample %}

{% enddetails %}

### Automation: lower the blinds only after the office fan has been running

If the office is already warm enough for the fan to be running, you can also lower the blinds when the sun gets strong.

- **Trigger**: Sun: Above horizon
- **Condition**: Fan is on
- **Target**: Office fan
- **Condition passes if**: Any
- **For at least**: 00:10:00
- **Action**: Close cover

{% details "YAML example for an office shade routine" %}

{% example %}
automation: |
  alias: "Lower office blinds when fan is already running"
  triggers:
    - trigger: sun
      event: sunrise
  conditions:
    - condition: fan.is_on
      target:
        entity_id: fan.office
      options:
        behavior: any
        for: "00:10:00"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.office_blinds
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
