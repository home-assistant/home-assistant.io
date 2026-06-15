---
title: "Get calendar events"
action: calendar.get_events
domain: calendar
description: "Gets the events on a calendar within a date range."
related_actions:
  - calendar.create_event
---

Use this action to get the events on one or more calendars within a date range, for example to read out your agenda or send it in a notification.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get calendar events from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the calendars you want to read.
6. From the actions shown for that target, select **Get calendar events**.
7. Set the time range with a **Start time** and either an **End time** or a **Duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Start time:
  description: Return events after this time. When not set, defaults to now.
  required: false
End time:
  description: Return events before this time. The end is exclusive and cannot be used together with a duration.
  required: false
Duration:
  description: Return events from the start time for this duration. Cannot be used together with an end time.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `calendar.get_events`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: calendar.get_events
  target:
    entity_id:
      - calendar.school
      - calendar.work
  data:
    duration:
      hours: 24
  response_variable: agenda
{% endexample %}

This returns the events on `calendar.school` and `calendar.work` for the next 24 hours.

### Options in YAML

{% options_yaml %}
start_date_time:
  description: Return events after this time, such as 2024-03-10 20:00:00. When not set, defaults to now.
  required: false
  type: string
end_date_time:
  description: Return events before this time (exclusive), such as 2024-03-10 23:00:00. Cannot be used together with a duration.
  required: false
  type: string
duration:
  description: "Return events from the start time for this duration, such as hours: 24. Cannot be used together with an end time."
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Response data

The action returns the matching events for each calendar you targeted. The response is keyed by the calendar, with an `events` list. Each event includes the following fields:

- `summary`: The title of the event.
- `description`: A longer description of the event, if it has one.
- `start`: The date or date and time the event starts.
- `end`: The date or date and time the event ends. The end is exclusive.
- `location`: The location of the event, if it has one.

A shortened example of the response looks like this:

```yaml
calendar.school:
  events:
    - summary: Parents evening
      start: "2024-03-10 19:00:00"
      end: "2024-03-10 20:00:00"
      location: Main hall
calendar.work:
  events:
    - summary: Team standup
      start: "2024-03-10 09:00:00"
      end: "2024-03-10 09:15:00"
```

## Good to know

- Set the time range with a start time and either an end time or a duration, but not both an end time and a duration.

{% include actions/stuck.md %}

{% include actions/related.md %}
