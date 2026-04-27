---
title: "Vacuum started cleaning"
trigger: vacuum.started_cleaning
domain: vacuum
description: "Triggers when a vacuum cleaner begins a cleaning task."
related_triggers:
  - vacuum.paused_cleaning
  - vacuum.docked
---

The **Vacuum started cleaning** trigger fires when the vacuum begins a new cleaning run. Use it for automations that need to respond when cleaning starts—like announcements, status changes, or notifications.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. In the **When** section, select **Add trigger**.
4. Search for **Vacuum: Vacuum started cleaning**.
5. Select targets (area, floor, or vacuums).
6. Pick **Trigger when**: **Any**, **First**, or **Last** as needed.
7. Save the automation.

### Options in the UI

{% options_ui %}
Trigger when:
  description: If targeting multiple vacuums, determines when the trigger fires (first, last, or any device starting to clean).
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

YAML example:

{% example %}
trigger: |
  trigger: vacuum.started_cleaning
  target:
    entity_id:
      - vacuum.upstairs
      - vacuum.downstairs
  options:
    behavior: first
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: Behavior when multiple vacuums targeted. Options: `any`/`first`/`last`.
  required: false
  type: string
  default: any
{% endoptions_yaml %}

target:
  description: Vacuum entity or group to monitor.
  required: true
  type: target

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Does not trigger when a vacuum comes back online—only on the actual start-cleaning event.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
