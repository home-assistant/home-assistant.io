---
title: "Get free/busy"
action: caldav.get_free_busy
domain: caldav
response: required
description: "Gets the busy periods of a CalDAV calendar within a time range."
related_actions:
  - calendar.get_events
---

Use this action to ask your CalDAV server when a calendar is busy within a time range, for example to run an automation only when you're not in a meeting. Events that are marked as free and canceled events don't count as busy.

{% include actions/ui_header.md %}

To get the busy periods from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the CalDAV calendar you want to check.
6. From the actions shown for that target, select **Get free/busy**.
7. Set the **Start time** and the **End time** of the time range.
8. In the **Response variable** field, enter a name to store the data in, such as `busy`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Start time:
  description: The start of the time range.
  required: true
End time:
  description: The end of the time range. It has to be after the start time.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `caldav.get_free_busy`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: caldav.get_free_busy
  target:
    entity_id: calendar.work
  data:
    start: "2026-01-05 08:00:00"
    end: "2026-01-05 18:00:00"
  response_variable: busy
{% endexample %}

This returns the busy periods of `calendar.work` on January 5 between 08:00 and 18:00 in the time zone of Home Assistant.

### Options in YAML

{% options_yaml %}
start:
  description: The start of the time range, such as 2026-01-05 08:00:00.
  required: true
  type: string
end:
  description: The end of the time range, such as 2026-01-05 18:00:00. It has to be after the start.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="calendar" entity_type="CalDAV calendar" example="calendar.work" %}

## Response data

{% include actions/response.md %}

The response is keyed by the calendar. Each calendar has a `periods` list with the `start` and `end` of every busy period in the time zone of Home Assistant, sorted by start time. Tentative events count as busy. Periods are cut to the time range, and periods that overlap or follow each other directly are returned as one. An empty list means that nothing is busy.

An example of the response looks like this:

```yaml
calendar.work:
  periods:
    - start: "2026-01-05T09:00:00+01:00"
      end: "2026-01-05T10:30:00+01:00"
    - start: "2026-01-05T14:00:00+01:00"
      end: "2026-01-05T15:00:00+01:00"
```

To continue only when nothing is busy, use the response in a condition:

{% raw %}

```yaml
- condition: template
  value_template: >
    {{ busy['calendar.work'].periods | length == 0 }}
```

{% endraw %}

## Good to know

- The CalDAV server works out the busy periods, so which events count as busy depends on the server. Nextcloud, Baikal, and Radicale count a canceled occurrence of a recurring event as busy, even though Home Assistant doesn't show it. Xandikos leaves it out.
- All-day events and events without a time zone get their times from the calendar's time zone on the server, or from UTC if the calendar has none. Radicale always uses UTC. If that time zone isn't the one Home Assistant uses, the busy periods of these events don't match the times Home Assistant shows for them, so an all-day event can start and end a few hours before or after midnight.
- If the server can't answer, for example because it doesn't support free/busy requests, the action fails with an error instead of returning an empty list. If you target several calendars and one of them fails, the whole action fails.
- For a calendar set up in YAML with a `search` in `custom_calendars`, the action fails, because the server only reports busy periods for the whole calendar.
- The action was tested with Baikal, Nextcloud, Radicale, and Xandikos. SOGo doesn't support free/busy requests on a calendar, so the action fails there.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
