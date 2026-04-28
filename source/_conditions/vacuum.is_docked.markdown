---
title: Vacuum is docked
condition: vacuum.is_docked
domain: vacuum
description: "Passes when the vacuum cleaner is docked."
---

The **Vacuum is docked** condition passes when the vacuum is currently on its dock or charging base.

Use this when you want to continue only if the robot is safely parked, like before turning off a light near the charger, starting maintenance, or sending a reminder that the cleaning cycle is complete.

{% include integrations/labs_entity_triggers_note.md %}

Entities that are `unavailable` or `unknown` are excluded from the check. With `behavior: any` (the default), the condition passes if at least one targeted vacuum is docked. With `behavior: all`, it passes only if all targeted vacuums are docked. If all are `unavailable` or `unknown`, the condition fails for `any` and passes for `all`.

## Usage in YAML

{% details "YAML example for the `vacuum.is_docked` condition" %}

```yaml
automation:
  conditions:
    - condition: vacuum.is_docked
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
    - `any` (passes if at least one vacuum is docked)
    - `all` (passes only if all targeted vacuums are docked)
  - **Optional**: Yes
  - Defaults to `any` if not specified.

{% enddetails %}

### Automation: turn off the laundry room light after docking

At bedtime, this automation checks whether the vacuum is already docked. If it is, the light near the charging station turns off.

- **Trigger**: Time: 23:00
- **Condition**: Vacuum is docked
- **Target**: Laundry room vacuum
- **Action**: Turn off light

{% details "YAML example for turning off a light once the vacuum is docked" %}

```yaml
automation:
  alias: "Docked vacuum light off"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: vacuum.is_docked
      target:
        entity_id: vacuum.laundry_room
      options:
        behavior: any
  actions:
    - action: light.turn_off
      target:
        entity_id: light.laundry_room
```

{% enddetails %}
