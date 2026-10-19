---
title: "Repeat until"
building_block: repeat_until
category: repeating
description: "Run a group of actions until conditions are met."
related_building_blocks:
  - repeat_while
  - repeat_count
  - repeat_for_each
---

The **Repeat until** building block runs a group of actions until its conditions are met. The conditions are checked after each round, so the actions always run at least once. Use it when you want to try something again until it works, for example, until a device reports that it turned on.

## Using this building block from the user interface

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Repeat until**.
4. Under **Until conditions**, select **Add condition**, and add the conditions that end the repeat.
5. Under **Actions**, select **Add action**, and add the actions to repeat.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Until conditions:
  description: The [conditions](/conditions/) that are checked after each round. The repeat ends when all conditions are met.
  required: true
Actions:
  description: The actions to repeat.
  required: true
{% endoptions_ui %}

## Using this building block in YAML

In YAML, use `repeat` with `sequence` and `until`. `until` also accepts a [shorthand notation of a template condition](/conditions/template/#shorthand-notation):

{% example %}
action: |
  repeat:
    until: "{{ is_state('device_tracker.iphone', 'home') }}"
    sequence:
      - action: script.something
{% endexample %}

### Options in YAML

{% options_yaml %}
repeat:
  description: The repeat settings.
  required: true
  type: map
  keys:
    until:
      description: The conditions that are checked after each round. The repeat ends when all conditions are met. You can also use a template.
      required: true
      type: [list, template]
    sequence:
      description: The actions to repeat.
      required: true
      type: list
{% endoptions_yaml %}

### Repeat variable

While the actions repeat, the `repeat` variable shows which round is running. You can also use it in the conditions:

- `repeat.index`: The number of the round: `1`, `2`, `3`, and so on.
- `repeat.first`: `true` during the first round.

## Good to know

- The actions always run at least once, because the conditions are only checked after each round.
- The repeat ends when all **Until conditions** are met. To also end it after a number of rounds, put the conditions in an **Or** condition, together with a condition on `repeat.index`, for example, `{{ repeat.index >= 5 }}`. The repeat then ends when the actions work, or after 5 rounds.

## Examples

### Automation: Repeat a command until it works

When `binary_sensor.xyz` turns on, this automation runs a shell command, and repeats it until `binary_sensor.something` is on.

- **Trigger**: State changed
  - **Entity**: `binary_sensor.xyz`
  - **To**: On
- **Condition**: State
  - **Entity**: `binary_sensor.something`
  - **State**: Off
- **Action**: Repeat until
  - **Actions**:
    - **Action**: `shell_command.turn_something_on`
    - **Action**: Wait for time to pass (delay)
      - **Duration**: `200` milliseconds
  - **Until conditions**:
    - **Condition**: State
      - **Entity**: `binary_sensor.something`
      - **State**: On

{% details "YAML example" %}

{% example %}
automation: |
  triggers:
    - trigger: state
      entity_id: binary_sensor.xyz
      to: "on"
  conditions:
    - condition: state
      entity_id: binary_sensor.something
      state: "off"
  actions:
    - alias: "Repeat the sequence UNTIL the conditions are true"
      repeat:
        sequence:
          # Run command that for some reason doesn't always work
          - action: shell_command.turn_something_on
          # Give it time to complete
          - delay:
              milliseconds: 200
        until:
          # Did it work?
          - condition: state
            entity_id: binary_sensor.something
            state: "on"
{% endexample %}

{% enddetails %}
