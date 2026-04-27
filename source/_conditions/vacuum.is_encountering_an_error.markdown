---
title: Vacuum is encountering an error
condition: vacuum.is_encountering_an_error
domain: vacuum
description: "Passes when the vacuum cleaner is in an error state."
---

{% include integrations/labs_entity_triggers_note.md %}

The **Vacuum is encountering an error** condition passes when the vacuum is in an error state.

Entities that are `unavailable` or `unknown` are excluded from the check.
With `behavior: any` (the default), the condition passes if at least one targeted vacuum is in error.
With `behavior: all`, it passes only if all targeted vacuums are in error.
If all are `unavailable` or `unknown`, the condition fails for `any` and passes for `all`.

## Usage in YAML

{% details "YAML example for the `vacuum.is_encountering_an_error` condition" %}

```yaml
automation:
  conditions:
    - condition: vacuum.is_encountering_an_error
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
    - `any` (passes if at least one vacuum is in error)
    - `all` (passes only if all targeted vacuums are in error)
  - **Optional**: Yes
  - Defaults to `any` if not specified.

{% enddetails %}
