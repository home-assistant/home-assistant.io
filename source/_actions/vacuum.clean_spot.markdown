---
title: Clean spot
action: vacuum.clean_spot
domain: vacuum
description: "Performs a spot cleaning at the vacuum's location."
---

The **Clean spot** action asks the vacuum to perform a concentrated cleaning cycle at its current position.

{% include integrations/labs_entity_actions_note.md %}

## Usage in the UI

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Vacuum: Clean spot**.
4. Select the target vacuum, area, or group.
5. Save.

## Usage in YAML

{% example %}
action: |
  - action: vacuum.clean_spot
    target:
      entity_id: vacuum.office
{% endexample %}

Omitting `entity_id` targets all supported vacuums.

## Options

### Options in YAML

{% options_yaml %}
target:
  description: The vacuum, area, or group to spot clean.
  required: false
  type: target
{% endoptions_yaml %}

## Good to know

- Not all vacuum models support spot cleaning.

