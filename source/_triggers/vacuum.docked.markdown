---
title: "Vacuum returned to dock"
trigger: vacuum.docked
domain: vacuum
description: "Triggers when a vacuum cleaner docks."
related_triggers:
  - vacuum.started_returning
  - vacuum.started_cleaning
---

The **Vacuum returned to dock** trigger fires when your vacuum docks at its charging station.
Use it to automate notifications or actions when cleaning has finished.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, search for and select **Vacuum: Vacuum returned to dock**.
5. Under **Targets**, choose a single vacuum, an area, floor, or multiple vacuums.
6. Under **Trigger when**, pick **First**, **Last**, or **Any** to control how the trigger fires when more than one vacuum is targeted.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When monitoring more than one vacuum, controls when the trigger fires. Pick **First** to fire when any monitored vacuum returns to dock, **Last** for when they all have, or **Any** for every individual event.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `vacuum.docked`. Example:

{% example %}
trigger: |
  trigger: vacuum.docked
  target:
    entity_id:
      - vacuum.upstairs
      - vacuum.downstairs
  options:
    behavior: last
{% endexample %}

This example fires after both vacuums have docked.

### Options in YAML

{% options_yaml %}
behavior:
  description: >
    When multiple vacuums are targeted, controls when the trigger fires. Options: `any` (every time any targeted vacuum docks), `first` (only when the first returns), or `last` (only after all have docked).
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

- This trigger does **not** fire when a vacuum comes back online from an `unavailable` or `unknown` state—only on a stateful, valid transition to docked.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
