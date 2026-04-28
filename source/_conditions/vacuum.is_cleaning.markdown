---
title: Vacuum is cleaning
condition: vacuum.is_cleaning
domain: vacuum
description: "Passes when the vacuum cleaner is cleaning."
---

The **Vacuum is cleaning** condition passes when the vacuum is currently running a cleaning task.

Use this when you want an automation to continue only if the robot is actively cleaning, like pausing it for a quiet activity, avoiding another floor-cleaning routine, or sending a status update only while the run is still underway.

{% include integrations/labs_entity_triggers_note.md %}

Entities that are `unavailable` or `unknown` are excluded from the check.
With `behavior: any` (the default), the condition passes if at least one targeted vacuum is cleaning.
With `behavior: all`, it passes only if all targeted vacuums are cleaning.
If all are `unavailable` or `unknown`, the condition fails for `any` and passes for `all`.

## Usage in YAML

{% details "YAML example for the `vacuum.is_cleaning` condition" %}

```yaml
automation:
  conditions:
    - condition: vacuum.is_cleaning
      target:
        entity_id:
          - vacuum.upstairs
          - vacuum.downstairs
      options:
        behavior: all
```

- **Data attribute**: `target`
  - **Description**: The `vacuum` entities to check.
  - **Optional**: No

- **Data attribute**: `behavior`
  - **Description**: Controls how multiple vacuums are evaluated. Options:
    - `any` (passes if at least one vacuum is cleaning)
    - `all` (passes only if all targeted vacuums are cleaning)
  - **Optional**: Yes
  - Defaults to `any` if not specified.

{% enddetails %}

### Automation: pause the vacuum for movie time

When movie mode starts, this automation first checks whether the living room vacuum is actively cleaning. If it is, Home Assistant pauses it so the room is quiet.

- **Trigger**: Movie mode turns on
- **Condition**: Vacuum is cleaning
- **Target**: Living room vacuum
- **Action**: Pause cleaning

{% details "YAML example for pausing a vacuum during movie mode" %}

```yaml
automation:
  alias: "Pause vacuum for movie mode"
  triggers:
    - trigger: state
      entity_id: input_boolean.movie_mode
      to: "on"
  conditions:
    - condition: vacuum.is_cleaning
      target:
        entity_id: vacuum.living_room
      options:
        behavior: any
  actions:
    - action: vacuum.pause
      target:
        entity_id: vacuum.living_room
```

{% enddetails %}
