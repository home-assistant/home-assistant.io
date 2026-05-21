---
title: "Lawn mower is returning"
condition: lawn_mower.is_returning
domain: lawn_mower
description: "Tests if one or more lawn mowers are returning to the dock."
---

The **Lawn mower is returning** condition passes when one or more targeted mowers are on their way back to the dock.
Use it when an automation should continue only during the return trip, like keeping a path light on or waiting to start another yard task.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Lawn mower is returning**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area where your mower is used. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the mower must stay in the returning state before the condition passes. Leave it at zero to check the current state only.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple lawn mowers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted mower is returning, or **All** to pass only when every targeted mower is returning.
For at least:
  description: How long the mower must stay in the returning state before the condition passes. Leave it at zero to check the current state only.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `lawn_mower.is_returning`. A basic example looks like this:

{% example %}
condition: |
  condition: lawn_mower.is_returning
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This passes when `lawn_mower.backyard` is currently returning to the dock.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple lawn mowers are targeted, controls how results combine.
    Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the mower must stay in the returning state before the condition
    passes. Accepts a duration like `00:01:00` for one minute.
  required: false
  type: time
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Mowers in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- Use **For at least** if you want the condition to pass only after the mower has been returning for a short time.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: Keep the path light on while the mower returns

If the dock is in a darker part of the yard, this automation checks whether the mower is returning before it turns on the path light.

- **Trigger**: Time pattern: Every 5 minutes
- **Condition**: Lawn mower is returning
  - **Target**: Backyard mower
  - **For at least**: 00:00:30
- **Condition**: Sun: after sunset
- **Action**: Turn on light

{% details "YAML example for keeping the path lit" %}

{% example %}
automation: |
  alias: "Keep the path lit while the mower returns"
  triggers:
    - trigger: time_pattern
      minutes: "/5"
  conditions:
    - condition: lawn_mower.is_returning
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:00:30"
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.garden_path
{% endexample %}

{% enddetails %}

### Automation: Wait to lock the side gate until the mower is on its way home

If you use a gate during the mowing run, only lock it after the mower is returning and the yard work is almost done.

- **Trigger**: Time: 20:30
- **Condition**: Lawn mower is returning
  - **Target**: Backyard mower
  - **For at least**: 00:01:00
- **Action**: Lock lock

{% details "YAML example for locking the side gate" %}

{% example %}
automation: |
  alias: "Lock the side gate when the mower returns"
  triggers:
    - trigger: time
      at: "20:30:00"
  conditions:
    - condition: lawn_mower.is_returning
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:01:00"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.side_gate
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
