---
title: "Selection changed"
trigger: select.selection_changed
domain: select
description: "Triggers after the selected option of one or more dropdowns changes."
---

The **Selection changed** trigger fires after the selected option of a dropdown {% term entity %} changes. It works with both **Select** entities provided by integrations and the **Dropdown helper** ({% term "input_select" %}) you create yourself. Use it to react when someone switches modes, scenes, presets, or any other choice you have set up as a dropdown.

This trigger fires on any change of the selected option. To run only when the dropdown is set to a specific option, combine it with the [Option is selected](/conditions/select.is_option_selected/) condition.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Selection changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the dropdown entity you want to watch. You can also select an area, a device, or a label.
5. From the triggers shown for that target, select **Selection changed**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple dropdowns are targeted.
7. Under **For at least**, set how long the dropdown must stay on the new option before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple dropdowns are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted dropdown changes.
    - **First**: fires only on the first change.
    - **All**: fires only after every targeted dropdown has changed.
  required: false
For at least:
  description: How long the dropdown must stay on the new option before the trigger fires. The default is `0` (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `select.selection_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: select.selection_changed
  target:
    entity_id: select.washing_machine_program
{% endexample %}

This fires every time the selected option of the washing machine program dropdown changes.

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple dropdowns are targeted, controls when the trigger fires:

    - `any` (**Each** in the UI, default): fires every time any targeted dropdown changes.
    - `first` (**First** in the UI): fires only on the first change.
    - `last` (**All** in the UI): fires only after every targeted dropdown has changed.
  required: false
  type: string
  default: any
for:
  description: How long the dropdown must stay on the new option before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes, and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger works with both **Select** entities provided by integrations (domain `select`) and **Dropdown helpers** you create yourself (domain `input_select`).
- The trigger does not filter by which option was selected. To run only on a specific option, add an [Option is selected](/conditions/select.is_option_selected/) condition, or use a [State trigger](/docs/automation/trigger/#state-trigger) with the `to` option.
- Changes from `unknown` or `unavailable` to a real option also count as a selection change.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: announce the soundbar's sound mode

Some media players expose their sound mode as a select entity, for example `select.living_room_soundbar_sound_mode` with options like **Music**, **Movie**, and **Night**. When the sound mode changes, announce the new mode on the living room speaker so everyone knows what the soundbar is set to.

- **Trigger**: Selection changed
  - **Target**: Living room soundbar sound mode
- **Action**: Send TTS message
  - **Target**: Living room speaker

{% details "YAML example for announcing the sound mode" %}

{% example %}
automation: |
  alias: "Announce soundbar sound mode"
  triggers:
    - trigger: select.selection_changed
      target:
        entity_id: select.living_room_soundbar_sound_mode
  actions:
    - action: tts.speak
      target:
        entity_id: tts.home_assistant_cloud
      data:
        media_player_entity_id: media_player.living_room
        message: >-
          Soundbar sound mode set to
          {{ states('select.living_room_soundbar_sound_mode') }}.
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
