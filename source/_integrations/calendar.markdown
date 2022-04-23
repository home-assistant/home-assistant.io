---
title: Calendar
description: Instructions on how to integrate calendars within Home Assistant.
ha_release: 0.33
ha_domain: calendar
ha_quality_scale: internal
ha_category: []
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: integration
---

The calendar integration allows you to integrate your calendars into Home Assistant. Calendars are shown on the calendar dashboard, and can be used with automations.

A calendar entity has state and attributes represent the next upcoming event (only). A calendar trigger is much more flexible, has fewer limitations, and is recommended for automations, instead of using the entity state.

## Automation

Calendar [Triggers](/docs/automation/trigger) enable automation based on an event start or end. Review the [Automating Home Assistant](/getting-started/automation/) getting started guide on automations or the [Automation](/docs/automation/) documentation for full details.

{% my automations badge %}

![Screenshot Trigger](/images/integrations/calendar/trigger.png)

An example of a calendar trigger in yaml:

```yaml
automation:
  trigger:
    - platform: calendar
      # Possible values: start, end
      event: start
      # The calendar entity_id
      entity_id: calendar.personal
```

### Example Automation

This is an example of an automation that sends a notification with details about the event that
triggered the automation. See [Automation Trigger Variables: Calendar](/docs/automation/templating/#calendar) for additional trigger data available for conditions or actions.


{% raw %}
```yaml
automation:
  alias: Calendar notification
  trigger:
    - platform: calendar
      event: start
      entity_id: calendar.personal
  action:
    - service: persistent_notification.create
      data:
        message: >-
          Event {{ trigger.calendar_event.summary }} @
          {{ trigger.calendar_event.start }}
  mode: single
```
{% endraw %}