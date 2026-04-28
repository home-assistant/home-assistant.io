---
title: "Vacuum started returning to dock"
trigger: vacuum.started_returning
domain: vacuum
description: "Triggers when a vacuum cleaner begins returning to its dock."
related_triggers:
  - vacuum.docked
  - vacuum.started_cleaning
---

The **Vacuum started returning to dock** trigger fires when the vacuum finishes its current activity and sets out for its charging station. Use this to automate post-cleanup events, notifications, or dock preparation routines.

Use it to prepare for the robot to pass through a dark hallway, announce that cleaning is almost done, or turn off modes that only matter while active cleaning is in progress.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. In the **When** section, select **Add trigger**.
4. Search for **Vacuum: Vacuum started returning to dock**.
5. Select targets (individual/group, area, or floor).
6. Choose **Trigger when**: **Any**, **First**, or **Last** as needed.
7. Save the automation.

### Options in the UI

{% options_ui %}
Trigger when:
  description: For multiple vacuums, controls if trigger fires on first, last, or any device starting the return.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

YAML example:

{% example %}
trigger: |
  trigger: vacuum.started_returning
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
  description: >
    For multiple targets: `any`, `first`, or `last` to control group event logic.
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

- This does not trigger on a vacuum coming online—only on the return-to-dock event.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on the hallway light while the vacuum returns

If your vacuum docks in a darker part of the house, you can turn on a nearby light when it starts heading back so it can finish its route with a clear path.

- **Trigger**: Vacuum started returning to dock
- **Target**: Downstairs vacuum
- **Condition**: Sun is below horizon
- **Action**: Turn on hallway light

{% details "YAML example for lighting the path back to the dock" %}

{% example %}
automation: |
  alias: "Light path for returning vacuum"
  triggers:
    - trigger: vacuum.started_returning
      target:
        entity_id: vacuum.downstairs
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
