---
title: "Repeat while"
building_block: repeat_while
category: repeating
description: "Run a group of actions as long as conditions are met."
related_building_blocks:
  - repeat_until
  - repeat_count
  - repeat_for_each
---

The **Repeat while** building block runs a group of actions as long as its conditions are met. The conditions are checked before each round. Use it when the actions should keep running while something is true, for example, while a mode is turned on.

## Using this building block from the user interface

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Repeat while**.
4. Under **While conditions**, select **Add condition**, and add the conditions that must be met for the next round.
5. Under **Actions**, select **Add action**, and add the actions to repeat.
6. Select **Save**.

### Options in the UI

{% options_ui %}
While conditions:
  description: The [conditions](/conditions/) that are checked before each round. The actions run as long as all conditions are met.
  required: true
Actions:
  description: The actions to repeat.
  required: true
{% endoptions_ui %}

## Using this building block in YAML

In YAML, use `repeat` with `while` and `sequence`. This example repeats a script as long as `input_boolean.do_something` is on, and at most 20 times:

{% example %}
script: |
  do_something:
    sequence:
      - action: script.get_ready_for_something
      - alias: "Repeat the sequence AS LONG AS the conditions are true"
        repeat:
          while:
            - condition: state
              entity_id: input_boolean.do_something
              state: "on"
            # Don't do it too many times
            - condition: template
              value_template: "{{ repeat.index <= 20 }}"
          sequence:
            - action: script.something
{% endexample %}

`while` also accepts a [shorthand notation of a template condition](/conditions/template/#shorthand-notation):

{% example %}
action: |
  repeat:
    while: "{{ is_state('sensor.mode', 'Home') and repeat.index < 10 }}"
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
    while:
      description: The conditions that are checked before each round. The actions run as long as all conditions are met. You can also use a template.
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

- The conditions are checked before each round. If they are not met at the start, the actions don't run at all.
- To make sure the repeat ends, add a condition on `repeat.index`, for example, `{{ repeat.index <= 20 }}`.
