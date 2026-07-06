---
title: "Remote is on"
condition: remote.is_on
domain: remote
description: "Tests if one or more remotes are on."
related_conditions:
  - remote.is_off
---

The **Remote is on** condition passes when a remote {% term entity %} is currently on. Use it to gate an automation so it only runs when a specific remote (or every targeted remote) is already active.

When you target more than one remote, the condition's **behavior** option controls how the check combines results. You can require any targeted remote to be on, or demand that all of them are.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the remote you want to check. You can also select an area, a floor, a device, or a label.
5. From the conditions shown for that target, select **Remote is on**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the remote must have been on.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple remotes are targeted, controls how results combine. Pick **Any** to pass if at least one targeted remote is on, or **All** to pass only when every targeted remote is on.
For at least:
  description: How long the remote must have been on for the condition to pass. Default is zero (no minimum duration).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `remote.is_on`. A basic example looks like this:

{% example %}
condition: |
  condition: remote.is_on
  target:
    entity_id: remote.living_room
{% endexample %}

This passes when the living room remote is currently on.

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
    How long the remote must have been on for the condition to pass. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` requires the remote to have been on for at least five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Remotes that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped and do not count as on. With **Any** behavior, if all targeted remotes are unavailable or have an unknown state, the condition fails. With **All** behavior, if all targeted remotes are unavailable or have an unknown state, the condition passes.
- To gate an automation on a remote being off instead, use [Remote is off](/conditions/remote.is_off/).
- Pair with the [Remote turned on](/triggers/remote.turned_on/) trigger to react only when a transition to on happens.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only send a media command when the living room remote is on

When you press a button on a dashboard, only forward a media command if the living room remote is currently on so the command does not get lost.

- **Trigger**: State: Dashboard button pressed
- **Condition**: Remote is on
  - **Target**: Living room remote
- **Action**: Send a remote command

{% details "YAML example for a guarded media command" %}

{% example %}
automation: |
  alias: "Send media command only if remote is on"
  triggers:
    - trigger: state
      entity_id: input_button.send_play
  conditions:
    - condition: remote.is_on
      target:
        entity_id: remote.living_room
  actions:
    - action: remote.send_command
      target:
        entity_id: remote.living_room
      data:
        command: play
{% endexample %}

{% enddetails %}

### Automation: warn at bedtime if a remote is still on

At bedtime, send a phone notification if any remote in the house has been on for at least 10 minutes.

- **Trigger**: Time: 23:00
- **Condition**: Remote is on
  - **Target**: All remotes (by label)
  - **Condition passes if**: Any
  - **For at least**: 00:10:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a bedtime remote reminder" %}

{% example %}
automation: |
  alias: "Warn at bedtime if a remote is still on"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: remote.is_on
      target:
        label_id: all_remotes
      options:
        for: "00:10:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "A remote is still on. Tap to power it off."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
