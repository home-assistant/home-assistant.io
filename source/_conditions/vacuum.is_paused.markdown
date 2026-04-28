---
title: Vacuum is paused
condition: vacuum.is_paused
domain: vacuum
description: "Passes when the vacuum cleaner is paused."
---

The **Vacuum is paused** condition passes when the vacuum is currently paused in the middle of a cleaning run.

Use this when you want an automation to continue only if the robot is stopped mid-run, like sending a reminder, turning on a nearby light, or resuming later as part of a scheduled routine.

{% include integrations/labs_entity_triggers_note.md %}

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

### Automation: remind you if the vacuum is still paused

This automation checks every 15 minutes whether the hallway vacuum is paused. If it is, Home Assistant sends a reminder so you can decide whether to resume it or clear an obstacle.

- **Trigger**: Every 15 minutes
- **Condition**: Vacuum is paused
- **Target**: Hallway vacuum
- **Action**: Notify mobile app

{% details "YAML example for a paused vacuum reminder" %}

```yaml
automation:
  alias: "Reminder for paused vacuum"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: vacuum.is_paused
      target:
        entity_id: vacuum.hallway
      options:
        behavior: any
  actions:
    - action: notify.mobile_app_phone
      data:
        title: "Vacuum is paused"
        message: "The hallway vacuum is still paused."
```

{% enddetails %}
