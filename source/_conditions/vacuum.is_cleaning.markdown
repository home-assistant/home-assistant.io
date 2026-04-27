---
title: Vacuum is cleaning
condition: vacuum.is_cleaning
domain: vacuum
description: "Passes when the vacuum cleaner is cleaning."
---

{% include integrations/labs_entity_triggers_note.md %}

The **Vacuum is cleaning** condition passes when the vacuum is currently running a cleaning task.

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
