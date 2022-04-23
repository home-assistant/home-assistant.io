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

The calendar can be used within [Automations](/docs/automation) as a trigger based on the calendar events.

```yaml
automation:
  trigger:
    - platform: calendar
      # Possible values: start, end
      event: start
      # The calendar entity_id
      entity_id: calendar.light_schedule
```

### Trigger Data

There is additional trigger data availale with details of the event that caused the trigger to fire.

| Template variable        | Data                                             |
| ------------------------ | ------------------------------------------------ |
| `trigger.platform`       | Hardcoded: `calendar`                            |
| `trigger.event_type`     | The trigger event type, either `start`  or `end` |
| `trigger.calendar_event` | The payload of the calendar event.               |

The `trigger.calendar_event` is populated with data from the calendar
event that caused the trigger to fire.

| Calendar event data | Data                                                        |
| ------------------- | ----------------------------------------------------------- |
| `summary`           | The title or summary of the calendar event.                 |
| `start`             | String representation of the start date or date time of the calendar event e.g. `2022-04-10`, or `2022-04-10 11:30:00-07:00` |
| `end`               | String representation of the end time of date time the calendar event in UTC  e.g. `2022-04-11`, or `2022-04-10 11:45:00-07:00`   |
| `all_day`           | Indicates the event spans the entire day.                   |
| `description`       | A detailed description of the calendar event, if available. |
| `location`          | Location information for the calendar event, if available.  |
