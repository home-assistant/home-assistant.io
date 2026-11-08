---
title: "Get Recorder history"
action: recorder.get_history
domain: recorder
description: "Retrieves state history for one or more entities."
related_actions:
  - recorder.get_statistics
  - recorder.purge
  - recorder.purge_entities
  - recorder.enable
  - recorder.disable
---

Use this action to retrieve recorded state history for one or more entities over a time period. This is handy when an automation or script needs raw historical state transitions, for example to detect sequences, calculate durations, or apply custom logic based on past states.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

Only users with administrator rights can run this action.

{% note %}
History is retrieved from the recorder database and is subject to your recorder retention period (`purge_keep_days`).
{% endnote %}

{% include actions/ui_header.md %}

To get history from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Recorder: Get Recorder history**.
6. Set the options you want to use.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entities:
  description: The entities to return history for.
Start time:
  description: The start of the period to return history for.
End time:
  description: The end of the period to return history for. If omitted, returns all history from the start time onward.
  required: false
Allow truncation:
  description: Truncate the returned history to the first 1,000 records per entity instead of raising an error when the limit is exceeded.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `recorder.get_history`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: recorder.get_history
  data:
    entity_id:
      - input_boolean.away_mode
      - sensor.hvac_action
    start_time: "2025-10-06 11:00:00"
    end_time: "2025-10-06 12:00:00"
  response_variable: entity_history
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: The entity IDs to return history for.
  required: true
  type: list
start_time:
  description: The start time for the history query, such as 2025-10-06 11:00:00. Must be in the past.
  required: true
  type: string
end_time:
  description: The end time for the history query. If omitted, returns all history from the start time onward.
  required: false
  type: string
allow_truncation:
  description: Truncate the returned history to the first 1,000 records per entity instead of raising an error when the limit is exceeded. Defaults to false.
  required: false
  type: boolean
{% endoptions_yaml %}

## Response data

The action returns the history keyed by each entity ID requested. Each entity contains a list of state segments covering the requested time window:

- `start`: The start timestamp of the state segment (ISO 8601 UTC).
- `end`: The end timestamp of the state segment (ISO 8601 UTC).
- `state`: The state value during this segment.

An example of the response looks like this:

```yaml
history:
  input_boolean.away_mode:
    - start: "2025-10-06T11:00:00+00:00"
      end: "2025-10-06T11:02:30.052671+00:00"
      state: "off"
    - start: "2025-10-06T11:02:30.052671+00:00"
      end: "2025-10-06T11:03:17.792387+00:00"
      state: "on"
  sensor.hvac_action:
    - start: "2025-10-06T11:00:00+00:00"
      end: "2025-10-06T12:00:00+00:00"
      state: "idle"
```

## Good to know

- **Consecutive duplicate states**: Consecutive duplicate state values recorded across Home Assistant restarts or frequent sensor reports are merged into a continuous state span.
- **Timestamp clamping**: If an entity had a state established before `start_time`, its `start` timestamp is clamped to `start_time` so all returned segments fit cleanly within the requested window.
- **Limit and truncation**: Each entity is capped at 1,000 state segments. If an entity exceeds 1,000 segments, the action raises an error by default to prevent automations from silently acting on incomplete data. Set `allow_truncation: true` if you want the first 1,000 segments returned anyway.
- **Attributes**: Only state values are returned; state attributes are not included.
- **Statistics vs. state history**: To retrieve periodic aggregated statistics (such as min, max, mean, or sum) rather than raw state transitions, use the [`recorder.get_statistics`](/actions/recorder.get_statistics/) action instead.

{% include actions/stuck.md %}

{% include actions/related.md %}
