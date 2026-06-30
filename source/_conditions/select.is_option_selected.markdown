---
title: "Dropdown option is selected"
condition: select.is_option_selected
domain: select
description: "Tests if one or more dropdowns have a specific option selected."
---

The **Dropdown option is selected** condition passes when a dropdown {% term entity %} is currently set to a specific option. It works with both **Select** entities provided by integrations and the **Dropdown helper** ("input_select") you create yourself. Use it to gate automations on the current choice of a dropdown, such as only running a routine when **House mode** is set to "Home" or "Guest".

When you target more than one dropdown, the **Condition passes if** option controls how the check combines results. You can require any targeted dropdown to be on the selected option, or demand that all of them are.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Dropdown option is selected** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the dropdown entity you want to check. You can also select an area, a device, or a label.
5. From the conditions shown for that target, select **Dropdown option is selected**.
6. Under **Option**, select one or more options to check for. Only options available on the targeted dropdown are shown.
7. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple dropdowns are targeted.
8. Under **For at least**, set how long the dropdown must have been on the selected option before the condition passes. Leave it at zero to pass immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Option:
  description: The option or options to check for. Only the options available on the targeted dropdown are shown. The condition passes when the dropdown is set to any of the selected options.
Condition passes if:
  description: When multiple dropdowns are targeted, controls how results combine. Pick **Any** to pass if at least one targeted dropdown is on the selected option, or **All** to pass only when every targeted dropdown is on the selected option. Default is **Any**.
For at least:
  description: How long the dropdown must have been continuously on the selected option before the condition passes. Default is zero (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `select.is_option_selected`. A basic example looks like this:

{% example %}
condition: |
  condition: select.is_option_selected
  target:
    entity_id: select.living_room_soundbar_sound_mode
  options:
    option: "Movie"
{% endexample %}

This passes when the soundbar sound mode is set to "Movie".

To check for any one of several options:

{% example %}
condition: |
  condition: select.is_option_selected
  target:
    entity_id: select.living_room_soundbar_sound_mode
  options:
    option:
      - "Movie"
      - "Night"
{% endexample %}

### Options in YAML

{% options_yaml %}
option:
  description: |
    The option or options to check for. Accepts a single option string or a list of option strings. The condition passes when the dropdown is set to any of the listed options.
  required: true
  type: [string, list]
behavior:
  description: |
    When multiple dropdowns are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: |
    How long the dropdown must have been continuously on the selected option before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition works with both **Select** entities provided by integrations (domain `select`) and **Dropdown helpers** you create yourself (domain `input_select`).
- The option string must match the dropdown's option exactly, including capitalization. The UI lets you pick from the available options to avoid typos.
- A dropdown in the `unknown` or `unavailable` state never matches.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: dim the lights when the soundbar switches to **Movie** mode

Some media players expose their sound mode as a select entity, for example `select.living_room_soundbar_sound_mode` with options like **Music**, **Movie**, and **Night**. When someone starts a movie, dim the lights for a cinema feel.

- **Trigger**: Dropdown selection changed
  - **Target**: Living room soundbar sound mode
- **Condition**: Dropdown option is selected
  - **Target**: Living room soundbar sound mode
  - **Option**: Movie
- **Action**: Turn on light

{% details "YAML example for dimming the lights in Movie mode" %}

{% example %}
automation: |
  alias: "Dim lights for Movie mode"
  triggers:
    - trigger: select.selection_changed
      target:
        entity_id: select.living_room_soundbar_sound_mode
  conditions:
    - condition: select.is_option_selected
      target:
        entity_id: select.living_room_soundbar_sound_mode
      options:
        option: "Movie"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room
      data:
        brightness_pct: 20
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
