---
title: Vacuum is encountering an error
condition: vacuum.is_encountering_an_error
domain: vacuum
description: "Passes when the vacuum cleaner is in an error state."
---

The **Vacuum is encountering an error** condition passes when the vacuum is in an error state.

Use this when you want an automation to act only if the robot still needs attention, like sending a reminder later in the day, turning on a helper light, or skipping a follow-up routine until the issue is fixed.

{% include integrations/labs_entity_triggers_note.md %}

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

### Automation: remind you about an unresolved vacuum error

This automation checks every evening whether the upstairs vacuum is still in an error state. If it is, Home Assistant sends a reminder so the problem does not go unnoticed until the next cleaning run.

- **Trigger**: Time: 18:00
- **Condition**: Vacuum is encountering an error
- **Target**: Upstairs vacuum
- **Action**: Notify mobile app

{% details "YAML example for an unresolved vacuum error reminder" %}

```yaml
automation:
  alias: "Reminder for vacuum error"
  triggers:
    - trigger: time
      at: "18:00:00"
  conditions:
    - condition: vacuum.is_encountering_an_error
      target:
        entity_id: vacuum.upstairs
      options:
        behavior: any
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "Vacuum still needs help"
        message: "The upstairs vacuum is still reporting an error."
```

{% enddetails %}
