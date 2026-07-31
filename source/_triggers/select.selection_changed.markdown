---
title: "Dropdown selection changed"
trigger: select.selection_changed
domain: select
description: "Triggers when the selected option of one or more dropdowns changes."
---

The **Dropdown selection changed** trigger fires when the selected option of a dropdown {% term entity %} changes. Use it to react when someone switches modes, scenes, presets, or any other choice you have set up as a dropdown.

This trigger fires when the selected option changes from one valid option to another. To run only when the dropdown is set to a specific option, combine it with the [Dropdown option is selected](/conditions/select.is_option_selected/) condition.

{% include triggers/ui_header.md %}

To use **Dropdown selection changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the dropdown entity you want to watch. You can also select an area, a device, or a label.
5. From the triggers shown for that target, select **Dropdown selection changed**.
6. Select **Save**.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `select.selection_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: select.selection_changed
  target:
    entity_id: select.washing_machine_program
{% endexample %}

This fires every time the selected option of the washing machine program dropdown changes.

{% include triggers/targets.md %}

## Good to know

- Have at least one dropdown entity to monitor, either a select entity provided by an integration or a dropdown helper (`input_select`).
- The trigger does not filter by which option was selected. To run only on a specific option, add a [Dropdown option is selected](/conditions/select.is_option_selected/) condition, or use a [State trigger](/docs/automation/trigger/#state-trigger) with the `to` option.
- The trigger only fires when switching between two valid options. It does not fire when the dropdown becomes `unknown` or `unavailable`, or when it changes from `unknown` or `unavailable` to a valid option. To react to those cases, use a [State trigger](/docs/automation/trigger/#state-trigger).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: announce the soundbar's sound mode

Some media players expose their sound mode as a select entity, for example `select.living_room_soundbar_sound_mode` with options like **Music**, **Movie**, and **Night**. When the sound mode changes, announce the new mode on the living room speaker so everyone knows what the soundbar is set to.

- **Trigger**: Dropdown selection changed
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
