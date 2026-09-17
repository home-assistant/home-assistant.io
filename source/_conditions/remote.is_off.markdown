---
title: "Remote is off"
condition: remote.is_off
domain: remote
description: "Tests if one or more remotes are off."
related_conditions:
  - remote.is_on
---

The **Remote is off** condition passes when a remote {% term entity %} is currently off. Use it to gate an automation so it only runs when a specific remote (or every targeted remote) is already inactive.

When you target more than one remote, the condition's **behavior** option controls how the check combines results. You can require any targeted remote to be off, or demand that all of them are.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the remote you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Remote is off**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the remote must have been off.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple remotes are targeted, controls how results combine. Pick **Any** to pass if at least one targeted remote is off, or **All** to pass only when every targeted remote is off.
For at least:
  description: How long the remote must have been off for the condition to pass. Default is zero (no minimum duration).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `remote.is_off`. A basic example looks like this:

{% example %}
condition: |
  condition: remote.is_off
  target:
    entity_id: remote.living_room
{% endexample %}

This passes when the living room remote is currently off.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple remotes are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: |
    How long the remote must have been off for the condition to pass. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` requires the remote to have been off for at least five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Remotes that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped and do not count as off. With **Any** behavior, if all targeted remotes are unavailable or have an unknown state, the condition fails. With **All** behavior, if all targeted remotes are unavailable or have an unknown state, the condition passes.
- To gate an automation on a remote being on instead, use [Remote is on](/conditions/remote.is_on/).
- Pair with the [Remote turned off](/triggers/remote.turned_off/) trigger to react only when a transition to off happens.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only run the bedtime scene when every remote is off

When the bedtime scene runs, this skips it unless every remote in the house is already off, so the scene does not interrupt anyone still watching something.

- **Trigger**: Time: 23:00
- **Condition**: Remote is off
  - **Target**: All remotes (by label)
  - **Condition passes if**: All
- **Action**: Activate scene
  - **Target**: Bedtime scene

{% details "YAML example for a guarded bedtime scene" %}

{% example %}
automation: |
  alias: "Bedtime scene only if every remote is off"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: remote.is_off
      target:
        label_id: all_remotes
      options:
        behavior: all
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.bedtime
{% endexample %}

{% enddetails %}

### Automation: turn on the living room remote in the morning only if it is off

When your morning routine runs, this avoids sending another power-on command if the living room remote has not been off for at least one minute.

- **Trigger**: Time: 07:00
- **Condition**: Remote is off
  - **Target**: Living room remote
  - **For at least**: 00:01:00
- **Action**: Turn on via remote
  - **Target**: Living room remote

{% details "YAML example for a guarded morning power-on" %}

{% example %}
automation: |
  alias: "Power on living room remote at 07:00 if off"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: remote.is_off
      target:
        entity_id: remote.living_room
      options:
        for: "00:01:00"
  actions:
    - action: remote.turn_on
      target:
        entity_id: remote.living_room
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
