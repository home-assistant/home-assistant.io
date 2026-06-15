---
title: "Create calendar event"
action: calendar.create_event
domain: calendar
description: "Adds a new event to a calendar."
related_actions:
  - calendar.get_events
---

Use this action to add a new event to a calendar, for example to block out time or record that something happened.

{% include actions/ui_header.md %}

To create a calendar event from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the calendar you want to add the event to.
6. From the actions shown for that target, select **Create calendar event**.
7. Set the **Summary** and the start and end of the event.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Summary:
  description: The title of the event.
Description:
  description: A longer description of the event than the summary provides.
  required: false
Start time:
  description: The date and time the event should start.
  required: false
End time:
  description: The date and time the event should end. The end is exclusive.
  required: false
Start date:
  description: The date an all-day event should start.
  required: false
End date:
  description: The date an all-day event should end. The end is exclusive.
  required: false
In:
  description: Create the event a number of days or weeks from now.
  required: false
Location:
  description: The location of the event.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `calendar.create_event`. A basic example looks like this:

{% example %}
action: |
  action: calendar.create_event
  target:
    entity_id: calendar.family
  data:
    summary: Bowling night
    start_date_time: "2024-03-10 20:00:00"
    end_date_time: "2024-03-10 23:00:00"
    location: Bowling center
{% endexample %}

This adds a Bowling night event to `calendar.family`.

### Options in YAML

{% options_yaml %}
summary:
  description: The title of the event.
  required: true
  type: string
description:
  description: A longer description of the event than the summary provides.
  required: false
  type: string
start_date_time:
  description: The date and time the event should start, such as 2024-03-10 20:00:00.
  required: false
  type: string
end_date_time:
  description: The date and time the event should end (exclusive), such as 2024-03-10 23:00:00.
  required: false
  type: string
start_date:
  description: The date an all-day event should start, such as 2024-03-10.
  required: false
  type: string
end_date:
  description: The date an all-day event should end (exclusive), such as 2024-03-11.
  required: false
  type: string
in:
  description: "Create the event a number of days or weeks from now, such as days: 2 or weeks: 2."
  required: false
  type: map
location:
  description: The location of the event.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Set the timing of the event in one of three ways: a start and end time, a start and end date for an all-day event, or `in` to create it a number of days or weeks from now.
- The end of an event is exclusive, so an all-day event on 2024-03-10 uses an end date of 2024-03-11.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: log when the washing machine finishes

When the washing machine finishes, record it on a calendar so you have a history of when laundry was done.

- **Trigger**: Washing machine power drops to idle
- **Action**: Create calendar event
  - **Target**: Home log
  - **Summary**: Laundry finished

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Log when the washing machine finishes"
  triggers:
    - trigger: state
      entity_id: sensor.washing_machine_status
      to: idle
  actions:
    - action: calendar.create_event
      target:
        entity_id: calendar.home_log
      data:
        summary: Laundry finished
        start_date_time: "2024-03-10 18:00:00"
        end_date_time: "2024-03-10 18:01:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
