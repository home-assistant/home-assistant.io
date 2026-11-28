---
title: "Get free/busy"
action: caldav.get_free_busy
domain: caldav
response: required
description: "Gets the busy periods of a CalDAV calendar within a time range."
related_actions:
  - calendar.get_events
---

Use this action to ask your CalDAV server when a calendar is busy within a time range, for example to run an automation only when you're not in a meeting. Tentative events count as busy. Events that are marked as free and canceled events don't, though some servers still count a canceled occurrence of a recurring event (see [Good to know](#good-to-know)).

{% include actions/ui_header.md %}

To get the busy periods from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the CalDAV calendar you want to check.
6. From the actions shown for that target, select **Get free/busy**.
7. Set the time range with a **Start time** and either an **End time** or a **Duration**.
8. In the **Response variable** field, enter a name to store the data in, such as `busy`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Start time:
  description: The start of the time range. When not set, defaults to now.
  required: false
End time:
  description: The end of the time range. It has to be after the start time and cannot be used together with a duration.
  required: false
Duration:
  description: The length of the time range from the start time. Cannot be used together with an end time.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `caldav.get_free_busy`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: caldav.get_free_busy
  target:
    entity_id: calendar.work
  data:
    start_date_time: "2026-01-05 08:00:00"
    end_date_time: "2026-01-05 18:00:00"
  response_variable: busy
{% endexample %}

This returns the busy periods of `calendar.work` on January 5 between 08:00 and 18:00 in the time zone of Home Assistant.

{% example %}
action: |
  action: caldav.get_free_busy
  target:
    entity_id: calendar.work
  data:
    duration:
      hours: 2
  response_variable: busy
{% endexample %}

This returns the busy periods of `calendar.work` for the next 2 hours.

### Options in YAML

{% options_yaml %}
start_date_time:
  description: The start of the time range, such as `2026-01-05 08:00:00`. When not set, defaults to now.
  required: false
  type: string
end_date_time:
  description: The end of the time range, such as `2026-01-05 18:00:00`. It has to be after the start and cannot be used together with a duration.
  required: false
  type: string
duration:
  description: "The length of the time range from the start, such as `hours: 2`. Cannot be used together with an end time."
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md domain="calendar" entity_type="CalDAV calendar" example="calendar.work" %}

## Response data

{% include actions/response.md %}

The response is keyed by the calendar. Each calendar has a `periods` list with the `start` and `end` of every busy period in the time zone of Home Assistant, sorted by start time. Periods are cut to the time range, and periods that overlap or follow each other directly are returned as one. An empty list means that nothing is busy.

An example of the response looks like this:

```yaml
calendar.work:
  periods:
    - start: "2026-01-05T09:00:00+01:00"
      end: "2026-01-05T10:30:00+01:00"
    - start: "2026-01-05T14:00:00+01:00"
      end: "2026-01-05T15:00:00+01:00"
```

## Good to know

- Set the time range with a start time and either an end time or a duration, but not both an end time and a duration.
- The CalDAV server works out the busy periods, so which events count as busy depends on the server. Nextcloud, Baikal, and Radicale before 3.8.2 count a canceled occurrence of a recurring event as busy, even though Home Assistant doesn't show it. Xandikos and Radicale 3.8.2 or later leave it out.
- All-day events and events without a time zone get their times from the calendar's time zone on the server, or from UTC if the calendar has none. Radicale always uses UTC. If that time zone isn't the one Home Assistant uses, the busy periods of these events don't match the times Home Assistant shows for them, so an all-day event can start and end a few hours before or after midnight.
- If the server can't answer, for example because it doesn't support free/busy requests, the action fails with an error instead of returning an empty list. If you target several calendars and one of them fails, the whole action fails. A calendar that is unavailable, because Home Assistant couldn't reach its server at the last update, is left out of the response.
- For a calendar set up in YAML with a `search` in `custom_calendars`, the action fails, because the server only reports busy periods for the whole calendar.
- The action was tested with Baikal, Nextcloud, Radicale, and Xandikos. SOGo and Radicale before 3.2.3 don't support free/busy requests on a calendar, so the action fails there.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Start the robot vacuum only when you're not in a meeting

Start the robot vacuum at 10:00 on weekdays, but only when the work calendar has nothing busy in the next 2 hours, so the noise doesn't disturb a call. Events marked as free don't hold it back.

- **Trigger**: Time, 10:00:00 on weekdays
- **Action**: CalDAV: Get free/busy
  - **Target**: Work (`calendar.work`)
  - **Duration**: 2 hours
  - **Response variable**: `busy`
- **Condition**: Template, nothing is busy
- **Action**: Start vacuum cleaner
  - **Target**: Robot vacuum (`vacuum.robot`)

{% details "YAML example for starting the robot vacuum when you're not in a meeting" %}

{% example %}
automation: |
  alias: "Vacuum when no meeting is planned"
  triggers:
    - trigger: time
      at: "10:00:00"
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: caldav.get_free_busy
      target:
        entity_id: calendar.work
      data:
        duration:
          hours: 2
      response_variable: busy
    - condition: "{{ busy['calendar.work'].periods | length == 0 }}"
    - action: vacuum.start
      target:
        entity_id: vacuum.robot
{% endexample %}

{% enddetails %}

### Automation: Get the first busy period of the day in the morning

At 07:30, check the work calendar until 18:00 and send a notification with the first busy period. Meetings that overlap or follow each other directly count as one period.

- **Trigger**: Time, 07:30:00
- **Action**: CalDAV: Get free/busy
  - **Target**: Work (`calendar.work`)
  - **Duration**: 10 hours 30 minutes
  - **Response variable**: `busy`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for the first busy period of the day" %}

{% example %}
automation: |
  alias: "First busy period of the day"
  triggers:
    - trigger: time
      at: "07:30:00"
  actions:
    - action: caldav.get_free_busy
      target:
        entity_id: calendar.work
      data:
        duration:
          hours: 10
          minutes: 30
      response_variable: busy
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {% set periods = busy['calendar.work'].periods %}
          {% if periods | length == 0 %}
          Nothing is busy at work until 18:00.
          {% else %}
          Busy at work from {{ as_datetime(periods[0].start).strftime('%H:%M') }}
          to {{ as_datetime(periods[0].end).strftime('%H:%M') }}.
          {% endif %}
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
