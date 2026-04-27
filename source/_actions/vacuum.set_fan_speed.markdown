---
title: Set fan speed
action: vacuum.set_fan_speed
domain: vacuum
description: "Sets the fan/power level for cleaning."
---

The **Set fan speed** action changes the fan or suction power level of the vacuum while running or before cleaning starts.

{% include integrations/labs_entity_actions_note.md %}

## Usage in the UI

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Vacuum: Set fan speed**.
4. Choose the target vacuum, then select or enter the desired fan speed/power.
5. Save the automation.

## Usage in YAML

{% example %}
action: |
  - action: vacuum.set_fan_speed
    target:
      entity_id: vacuum.cleaner
    fan_speed: turbo
{% endexample %}

The `fan_speed` value (label or number) is platform-dependent. Allowed values are typically found in your vacuum’s manual or entity attributes.

## Options

### Options in YAML

{% options_yaml %}
target:
  description: Vacuum entity to control.
  required: false
  type: target
fan_speed:
  description: Fan speed as a label (like 'eco', 'turbo') or percentage (0-100).
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Some platforms use named speeds; others use numeric values.

