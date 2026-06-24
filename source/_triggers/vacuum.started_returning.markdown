---
title: "Vacuum started returning to dock"
trigger: vacuum.started_returning
domain: vacuum
description: "Triggers when one or more vacuum cleaners start returning to dock."
related_triggers:
  - vacuum.returned_to_dock
  - vacuum.started_cleaning
---

The **Vacuum cleaner started returning to dock** trigger fires when the vacuum finishes its current activity and sets out for its charging station. Use this to automate post-cleanup events, notifications, or dock preparation routines.

Use it to prepare for the robot to pass through a dark hallway, announce that cleaning is almost done, or turn off modes that only matter while active cleaning is in progress.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. In the **When** section, select **Add trigger**.
4. Search for **Vacuum: Vacuum cleaner started returning to dock**.
5. Select targets (individual/group, area, or floor).
6. Choose **Trigger when**: **Each**, **First**, or **All** as needed.
7. Under **For at least**, enter how long the vacuum must keep returning before the trigger fires.
8. Save the automation.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When monitoring more than one vacuum, controls when the trigger fires. Pick **Each** to fire every time any targeted vacuum starts returning, **First** to fire only on the first return event, or **All** to fire only after all targeted vacuums have started returning.
  required: true
For at least:
  description: The time the vacuum must keep returning before the trigger fires.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `vacuum.started_returning`. A basic example looks like this:

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

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple vacuums are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: true
  type: string
  default: each
for:
  description: >
    The time the vacuum must keep returning before the trigger fires.
    Accepts a duration like `00:00:10` for 10 seconds.
  required: false
  type: string
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires only when a vacuum actually starts returning to its dock.
- If a vacuum comes back online from `unavailable` or `unknown`, that does not count as a return-to-dock event.

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
