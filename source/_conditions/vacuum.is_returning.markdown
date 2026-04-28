---
title: Vacuum is returning
condition: vacuum.is_returning
domain: vacuum
description: "Passes when the vacuum cleaner is returning to the dock."
---

The **Vacuum is returning** condition passes when the vacuum is currently returning to its dock or base.

Use this when you only want an automation to run while the robot is on its way home, like turning on a light near the dock, delaying another routine, or waiting to start cleanup until the path is clear again.

{% include integrations/labs_entity_triggers_note.md %}

Entities that are `unavailable` or `unknown` are excluded from the check.
With `behavior: any` (the default), the condition passes if at least one targeted vacuum is returning.
With `behavior: all`, it passes only if all targeted vacuums are returning.
If all are `unavailable` or `unknown`, the condition fails for `any` and passes for `all`.

## Usage in YAML

{% details "YAML example for the `vacuum.is_returning` condition" %}

```yaml
automation:
  conditions:
    - condition: vacuum.is_returning
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
    - `any` (passes if at least one vacuum is returning)
    - `all` (passes only if all targeted vacuums are returning)
  - **Optional**: Yes
  - Defaults to `any` if not specified.

{% enddetails %}

### Automation: turn on the dock light if the vacuum is returning

At night, this automation checks whether the vacuum is currently returning to the dock. If it is, the nearby light turns on to help light the final part of its path.

- **Trigger**: Time: 22:00
- **Condition**: Vacuum is returning
- **Target**: Downstairs vacuum
- **Action**: Turn on light

{% details "YAML example for lighting the dock area" %}

```yaml
automation:
  alias: "Light dock area for returning vacuum"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: vacuum.is_returning
      target:
        entity_id: vacuum.downstairs
      options:
        behavior: any
  actions:
    - action: light.turn_on
      target:
        entity_id: light.dock_area
```

{% enddetails %}
