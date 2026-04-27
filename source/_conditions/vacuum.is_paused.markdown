---
title: Vacuum is paused
condition: vacuum.is_paused
domain: vacuum
description: "Passes when the vacuum cleaner is paused."
---

{% include integrations/labs_entity_triggers_note.md %}

The **Vacuum is paused** condition passes when the vacuum is currently paused in the middle of a cleaning run.

Entities that are `unavailable` or `unknown` are excluded from the check.
With `behavior: any` (the default), the condition passes if at least one targeted vacuum is paused.
With `behavior: all`, it passes only if all targeted vacuums are paused.
If all are `unavailable` or `unknown`, the condition fails for `any` and passes for `all`.

## Usage in YAML

{% details "YAML example for the `vacuum.is_paused` condition" %}

```yaml
automation:
  conditions:
    - condition: vacuum.is_paused
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
    - `any` (passes if at least one vacuum is paused)
    - `all` (passes only if all targeted vacuums are paused)
  - **Optional**: Yes
  - Defaults to `any` if not specified.

{% enddetails %}
