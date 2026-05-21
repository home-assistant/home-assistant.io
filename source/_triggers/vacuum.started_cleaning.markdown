---
title: "Vacuum started cleaning"
trigger: vacuum.started_cleaning
domain: vacuum
description: "Triggers when a vacuum cleaner begins a cleaning task."
related_triggers:
  - vacuum.paused_cleaning
  - vacuum.docked
---

The **Vacuum cleaner started cleaning** trigger fires when the vacuum begins a new cleaning run. Use it for automations that need to respond when cleaning starts, like announcements, status changes, or notifications.

If you want to mark the house as being cleaned, pause other noisy routines, or let someone know the robot has started, this trigger gives you a reliable starting point.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. In the **When** section, select **Add trigger**.
4. Search for **Vacuum: Vacuum cleaner started cleaning**.
5. Select targets (area, floor, or vacuums).
6. Pick **Trigger when**: **Each**, **First**, or **All** as needed.
7. Under **For at least**, enter how long the vacuum must keep cleaning before the trigger fires.
8. Save the automation.

### Options in the UI

{% options_ui %}
Trigger when:
  description: If targeting multiple vacuums, determines when the trigger fires. Pick **Each** to fire every time any targeted vacuum starts cleaning, **First** to fire only on the first start event, or **All** to fire only after all targeted vacuums have started cleaning.
  required: true
For at least:
  description: The time the vacuum must keep cleaning before the trigger fires.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `vacuum.started_cleaning`. A basic example looks like this:

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

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple vacuums are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: true
  type: string
  default: any
for:
  description: >
    The time the vacuum must keep cleaning before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires only when cleaning actually starts.
- If a vacuum comes back online from `unavailable` or `unknown`, that does not count as starting a cleaning run.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: mark cleaning as in progress

When the downstairs vacuum starts, turn on a helper that other automations can use to avoid interrupting the cleaning run.

- **Trigger**: Vacuum started cleaning
- **Target**: Downstairs vacuum
- **Action**: Turn on input boolean

{% details "YAML example for tracking an active cleaning run" %}

{% example %}
automation: |
  alias: "Track active vacuum cleaning"
  triggers:
    - trigger: vacuum.started_cleaning
      target:
        entity_id: vacuum.downstairs
  actions:
    - action: input_boolean.turn_on
      target:
        entity_id: input_boolean.vacuum_cleaning
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
