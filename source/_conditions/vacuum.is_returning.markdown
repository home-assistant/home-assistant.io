---
title: Vacuum is returning
condition: vacuum.is_returning
domain: vacuum
description: "Passes when the vacuum cleaner is returning to the dock."
---

{% include integrations/labs_entity_triggers_note.md %}

The **Vacuum is returning** condition passes when the vacuum is currently returning to its dock or base.

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
