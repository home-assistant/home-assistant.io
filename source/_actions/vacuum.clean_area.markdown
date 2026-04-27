---
title: Clean area
action: vacuum.clean_area
domain: vacuum
description: "Cleans specific mapped areas using vacuum segments."
---

The **Clean area** action sends your vacuum to clean designated areas (segments) mapped in Home Assistant.

{% include integrations/labs_entity_actions_note.md %}

## Usage in the UI

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Vacuum: Clean area**.
4. Select your vacuum entity.
5. In **Area**, choose one or more mapped Home Assistant areas.
6. Save the automation.

## Usage in YAML

{% example %}
action: |
  - action: vacuum.clean_area
    target:
      entity_id: vacuum.cleaner
    area:
      - living_room
      - kitchen
{% endexample %}

## Options

### Options in YAML

{% options_yaml %}
target:
  description: The vacuum to send to specific areas.
  required: true
  type: target
area:
  description: The area(s) to clean. Use Home Assistant area IDs.
  required: true
  type: list
{% endoptions_yaml %}

## Good to know

- You must first map vacuum segments to Home Assistant areas in the entity settings.
- If mapping or area selection does not appear, your vacuum does not support this feature.

