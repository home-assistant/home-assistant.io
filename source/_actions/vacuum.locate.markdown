---
title: Locate vacuum
action: vacuum.locate
domain: vacuum
description: "Plays a sound or flashes lights to help you find the vacuum."
---

The **Locate vacuum** action causes the vacuum to play a sound or flash lights, making it easier to find.

{% include integrations/labs_entity_actions_note.md %}

## Usage in the UI

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Vacuum: Locate vacuum**.
4. Select one or more vacuums, area, or group.
5. Save.

## Usage in YAML

{% example %}
action: |
  - action: vacuum.locate
    target:
      entity_id: vacuum.upstairs
{% endexample %}

Omitting `entity_id` will target all supported vacuums in your system.

## Options

### Options in YAML

{% options_yaml %}
target:
  description: The vacuum, area, or device to locate.
  required: false
  type: target
{% endoptions_yaml %}

## Good to know

- The locate function’s effects (sound, lights) depend on your vacuum model.

