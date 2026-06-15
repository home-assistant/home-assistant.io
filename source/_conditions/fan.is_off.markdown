---
title: "Fan is off"
condition: fan.is_off
domain: fan
description: "Tests if one or more fans are off."
related_conditions:
  - fan.is_on
---

The **Fan is off** condition is useful when an automation should continue only if a fan is not running. Use it to avoid repeated stop commands, prevent unnecessary noise at night, or start a fan only when it is currently off.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the fan you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Fan is off**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the fan must have been off.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple fans are targeted, controls whether **Any** targeted fan must be off or **All** targeted fans must be off.
  required: false
For at least:
  description: How long the fan must have been off for the condition to pass.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `fan.is_off`. A basic example looks like this:

{% example %}
condition: |
  condition: fan.is_off
  target:
    entity_id: fan.living_room
  options:
    behavior: any
    for: "00:30:00"
{% endexample %}

This passes when `fan.living_room` has been off for 30 minutes.

### Options in YAML

{% options_yaml %}
behavior:
  description: When multiple fans are targeted, controls whether `any` or `all` targeted fans must be off.
  required: false
  type: string
  default: any
for:
  description: How long the fan must have been off for the condition to pass. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A fan in the `unknown` or `unavailable` state does not count as off.
- With **All**, every targeted fan must match. With **Any**, one matching fan is enough.
- To check for the opposite state, use [Fan is on](/conditions/fan.is_on/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: start the bedroom fan only if it is currently off

This avoids sending the same command again when a bedtime automation runs.

- **Trigger**: Time: 22:00
- **Condition**: Fan is off
- **Target**: Bedroom fan
- **Condition passes if**: Any
- **For at least**: 00:00:00
- **Action**: Turn on fan

{% details "YAML example for a bedtime fan start" %}

{% example %}
automation: |
  alias: "Start bedroom fan at bedtime if needed"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: fan.is_off
      target:
        entity_id: fan.bedroom
      options:
        behavior: any
        for: "00:00:00"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom
{% endexample %}

{% enddetails %}

### Automation: close the patio door only after the fan has been off

If you use a whole-room fan in the evening, you may want to close the patio door only after the fan has been off for a while.

- **Trigger**: Time: 23:00
- **Condition**: Fan is off
- **Target**: Living room fan
- **Condition passes if**: Any
- **For at least**: 00:15:00
- **Action**: Close cover

{% details "YAML example for closing a patio door cover" %}

{% example %}
automation: |
  alias: "Close patio cover after fan stops"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: fan.is_off
      target:
        entity_id: fan.living_room
      options:
        behavior: any
        for: "00:15:00"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.patio_door
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
