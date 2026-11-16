---
title: "Repeat multiple times"
building_block: repeat_count
category: repeating
description: "Run a group of actions a set number of times."
related_building_blocks:
  - repeat_for_each
  - repeat_while
  - repeat_until
---

The **Repeat multiple times** building block runs a group of actions a set number of times. Use it when you know in advance how often the actions should run, for example, to flash a light 3 times.

## Using this building block from the user interface

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select an automation. To edit a script, go to the **Scripts** tab and select the script.
2. In the **Then do** section of an automation, or the **Sequence** section of a script, select **Add action**.
3. Select **Blocks**, then select **Repeat multiple times**.
4. In **Count**, enter how many times to run the actions.
5. Under **Actions**, select **Add action**, and add the actions to repeat.
6. Select **Save**.

### Options in the UI

{% options_ui %}
Count:
  description: How many times to run the actions.
  required: true
Actions:
  description: The actions to repeat.
  required: true
{% endoptions_ui %}

## Using this building block in YAML

In YAML, use `repeat` with `count` and `sequence`. The count can be a template. The template is rendered when the repeat starts. This example has two scripts. The second script calls the first one to flash the hallway light 3 times:

{% example %}
script: |
  flash_light:
    mode: restart
    sequence:
      - action: light.turn_on
        target:
          entity_id: "light.{{ light }}"
      - alias: "Cycle light 'count' times"
        repeat:
          count: "{{ count | int * 2 - 1 }}"
          sequence:
            - delay: 2
            - action: light.toggle
              target:
                entity_id: "light.{{ light }}"
  flash_hallway_light:
    sequence:
      - alias: "Flash hallway light 3 times"
        action: script.flash_light
        data:
          light: hallway
          count: 3
{% endexample %}

### Options in YAML

{% options_yaml %}
repeat:
  description: The repeat settings.
  required: true
  type: map
  keys:
    count:
      description: How many times to run the actions. Can be a template.
      required: true
      type: [integer, template]
    sequence:
      description: The actions to repeat.
      required: true
      type: list
{% endoptions_yaml %}

### Repeat variable

While the actions repeat, the `repeat` variable shows which round is running:

- `repeat.index`: The number of the round: `1`, `2`, `3`, and so on.
- `repeat.first`: `true` during the first round.
- `repeat.last`: `true` during the last round.

## Good to know

- You can use any building block inside the repeat, including another repeat.
