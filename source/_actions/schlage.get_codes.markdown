---
title: "Get the PIN codes of a Schlage lock"
action: schlage.get_codes
domain: schlage
description: "Returns all PIN codes stored on a Schlage lock."
related_actions:
  - schlage.add_code
  - schlage.delete_code
---

Use this action to retrieve all PIN codes stored on a Schlage lock. For example, you can use it to check which codes are set before adding or removing one.

This action returns its result as [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data) and does not change anything on the lock.

{% include actions/ui_header.md %}

To get the PIN codes from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Schlage lock.
6. From the actions shown for that target, select **Schlage: Get PIN codes**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `schlage.get_codes`. A basic example looks like this:

{% example %}
action: |
  action: schlage.get_codes
  target:
    entity_id: lock.front_door
  response_variable: codes
{% endexample %}

This stores the PIN codes of `lock.front_door` in a variable named `codes`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="lock" %}

## Response data

The action returns the result for each targeted lock, keyed by entity ID. For each lock, it returns a mapping of the stored codes, keyed by a unique code identifier. Each code has the following fields:

- **name**: The name of the PIN code.
- **code**: The PIN value.
- **access_code_id**: A unique access code identifier.
- **schedule**: The schedule for this PIN, or `null` for permanent PINs.

```yaml
lock.front_door:
  93ab517c-0000-0000-0000-000000000000:
    name: Example Person
    code: "3333"
    access_code_id: "93ab517c-0000-0000-0000-000000000000"
    schedule: null
  82958b77-0000-0000-0000-000000000000:
    name: Guest
    code: "1234"
    access_code_id: "82958b77-0000-0000-0000-000000000000"
    schedule:
      type: temporary
      start_datetime: "2026-09-01T15:00:00+00:00"
      end_datetime: "2026-09-01T16:00:00+00:00"
```

### Schedule formats

The `schedule` field describes when a PIN is active. It is `null` for permanent PINs, or one of the following shapes:

**Temporary** — set via the `start_datetime` and `end_datetime` fields:

```json
{
  "type": "temporary",
  "start_datetime": "2026-09-01T15:00:00+00:00",
  "end_datetime": "2026-09-01T16:00:00+00:00"
}
```

**Recurring** — a single recurring schedule set through the Schlage app:

```json
{
  "type": "recurring",
  "days_of_week": {
    "sun": false,
    "mon": true,
    "tue": true,
    "wed": true,
    "thu": true,
    "fri": true,
    "sat": false
  },
  "start_hour": 8,
  "start_minute": 0,
  "end_hour": 17,
  "end_minute": 0
}
```

**Recurring multi** — two time windows, also set through the Schlage app:

```json
{
  "type": "multi_recurring",
  "windows": [
    {
      "days_of_week": {
        "sun": false,
        "mon": true,
        "tue": true,
        "wed": true,
        "thu": true,
        "fri": true,
        "sat": false
      },
      "start_hour": 8,
      "start_minute": 0,
      "end_hour": 12,
      "end_minute": 0
    },
    {
      "days_of_week": {
        "sun": false,
        "mon": true,
        "tue": true,
        "wed": true,
        "thu": true,
        "fri": true,
        "sat": false
      },
      "start_hour": 13,
      "start_minute": 0,
      "end_hour": 17,
      "end_minute": 0
    }
  ]
}
```

Recurring and multi_recurring schedules are configured through the Schlage app and cannot be set through Home Assistant service actions.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
