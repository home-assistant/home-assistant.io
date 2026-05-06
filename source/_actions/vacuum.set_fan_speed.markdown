---
title: Set fan speed
action: vacuum.set_fan_speed
domain: vacuum
description: "Sets the fan/power level for cleaning."
---

The **Set vacuum cleaner fan speed** action changes the fan or suction power level of the vacuum while running or before cleaning starts.

Use it when you want stronger suction for dirtier rooms, a quieter mode during the evening, or different cleaning intensity for different schedules.

{% include actions/ui_header.md %}

To use this action from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Vacuum: Set vacuum cleaner fan speed**.
4. Choose the target vacuum, then select or enter the desired fan speed/power.
5. Save the automation.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.set_fan_speed
  target:
    entity_id: vacuum.cleaner
  fan_speed: turbo
{% endexample %}

This sets `vacuum.cleaner` to `turbo`.

The `fan_speed` value (label or number) is platform-dependent. Allowed values are typically found in your vacuum's manual or entity attributes.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: Vacuum entity to control.
  required: false
  type: map
fan_speed:
  description: Fan speed as a label (like 'eco', 'turbo') or percentage (0-100).
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Some platforms use named speeds; others use numeric values.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: use turbo mode for weekday cleaning

Before the weekday cleaning run starts, this automation sets the vacuum to a stronger fan speed so it can do a deeper clean while the house is empty.

- **Trigger**: Time: 09:00
- **Action**: Set fan speed
- **Target**: Main vacuum
- **Fan speed**: turbo

{% details "YAML example for increasing vacuum suction before cleaning" %}

{% example %}
automation: |
  alias: "Weekday vacuum turbo mode"
  triggers:
    - trigger: time
      at: "09:00:00"
  actions:
    - action: vacuum.set_fan_speed
      target:
        entity_id: vacuum.main_floor
      fan_speed: turbo
    - action: vacuum.start
      target:
        entity_id: vacuum.main_floor
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
