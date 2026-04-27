---
title: Pause cleaning
action: vacuum.pause
domain: vacuum
description: "Pauses the current cleaning task on a vacuum."
---

The **Pause cleaning** action instructs your vacuum to pause its current operation.

{% include integrations/labs_entity_actions_note.md %}

## Usage in the UI

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. In **Add action**, search for **Vacuum: Pause cleaning**.
4. Choose the vacuum, area, or device to pause.
5. Select **Save**.

## Usage in YAML

{% example %}
action: |
  - action: vacuum.pause
    target:
      entity_id: vacuum.downstairs
{% endexample %}

The `entity_id` target is optional. If omitted, all connected vacuums will pause.

## Options

### Options in YAML

{% options_yaml %}
target:
  description: The vacuum, area, or device to pause.
  required: false
  type: target
{% endoptions_yaml %}

## Good to know

- Some vacuums may not support pausing if they are not currently cleaning.

