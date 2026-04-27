---
title: Vacuum is docked
condition: vacuum.is_docked
domain: vacuum
description: "Passes when the vacuum cleaner is docked."
---

{% include integrations/labs_entity_triggers_note.md %}

The **Vacuum is docked** condition passes when the vacuum is currently on its dock or charging base.

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
