---
title: Calendar
description: Instructions on how to integrate calendars within Home Assistant.
ha_release: 0.33
ha_domain: calendar
ha_quality_scale: internal
ha_category:
  - Calendar
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Calendar** {% term integration %} provides calendar {% term entities %}, allowing other integrations to integrate calendars into Home Assistant. Calendars are shown on the calendar dashboard and can be used with automations.

{% include integrations/building_block_integration.md %}

## Getting started with calendars

Home Assistant’s calendar support is designed primarily for automation use cases. It allows you to trigger automations based on events and access event information provided by calendar integrations, regardless of where the actual calendar data is stored. When supported by a given integration, Home Assistant can also create, edit, and delete events in external calendars, making it possible to interact with calendars both for reading and writing.

Home Assistant is not intended to replace a full-featured personal calendar. Instead, it works alongside external calendar platforms and complements them with powerful automation capabilities.

Depending on your needs, you can choose from several approaches:

- Use an existing external calendar: Explore the built-in [calendar integrations](/integrations/#calendar) to connect Home Assistant to your preferred calendar platform and use its events for automations.

- Run your own full-featured, privacy-focused calendar platform: Solutions like [Nextcloud Calendar](https://apps.nextcloud.com/apps/calendar) or other [self-hosted calendar platforms](https://github.com/awesome-selfhosted/awesome-selfhosted) provide complete calendar functionality and expose calendars over CalDAV. You can integrate them with Home Assistant using the [CalDAV integration](/integrations/caldav/) while keeping full calendar management outside Home Assistant.

- Use a simple, local event store for automations: The [Local Calendar integration](/integrations/local_calendar/) provides a fully local calendar designed specifically for automation workflows. It is not intended to function as a general-purpose personal calendar.

## Viewing and managing calendars

Each calendar is represented as its own {% term entity %} in Home Assistant and can be
viewed and managed on a calendar dashboard. You can find the calendar dashboard
in the main sidebar of your Home Assistant instance.

Some calendar integrations allow Home Assistant to manage your calendars
directly from Home Assistant. In this case, you can add new events by selecting
the **Add event** button in the lower right corner of the calendar dashboard.

The calendar dashboard provides quick visibility into upcoming events and simple
event editing, making it easier to build and troubleshoot automations that depend
on calendar data.

Also see [Actions](#actions) below.

## Calendar card

To display calendar events directly on your dashboards, Home Assistant includes the [calendar card](/dashboards/calendar/).
The card shows upcoming events from one or more calendar entities and provides a quick, glanceable view of your schedule.

## The state of a calendar entity

The state shows whether there is an active event:

- **On**: The calendar has an active event.
- **Off**: The calendar does not have an active event.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Automation

Calendar [Triggers](/docs/automation/trigger) enable {% term automation %} based on an
event's start or end. Review the [Automating Home Assistant](/getting-started/automation/)
getting started guide on automations or the [Automation](/docs/automation/)
documentation for full details.

Calendar {% term triggers %} are the best way to automate based on calendar events.
A calendar {% term entity %} can also be used to automate based on its state, but these are limited and attributes only represent the next event.

{% my automations badge %}

![Screenshot Trigger](/images/integrations/calendar/trigger.png)

An example of a calendar {% term trigger %} in YAML:

```yaml
automation:
  - triggers:
    - trigger: calendar
      # Possible values: start, end
      event: start
      # The calendar entity_id
      entity_id: calendar.personal
      # Optional time offset to fire a set time before or after event start/end
      offset: -00:15:00
```

Calendar triggers should not generally use automation mode `single` to ensure the trigger can fire when multiple events start at the same time. For example, use `queued` or `parallel` instead. Note that calendars are read once every 15 minutes. When testing, make sure you do not plan events less than 15 minutes away from the current time, or your {% term trigger %} might not fire.

See [Automation Trigger Variables: Calendar](/docs/automation/templating/#calendar) for additional trigger data available for conditions or actions.

### Automation recipes

Below are a few example ways you can use Calendar triggers.

{% details "Example: Calendar Event Notification " %}

This example automation consists of:

- For the calendar entity `calendar.personal`.
- At the start of any calendar event.
- Send a notification with the title and start time of the event.
- Allowing multiple events starting at the same time.

```yaml
automation:
  - alias: "Calendar notification"
    triggers:
      - trigger: calendar
        event: start
        entity_id: calendar.personal
    actions:
      - action: persistent_notification.create
        data:
          message: >-
            Event {{ trigger.calendar_event.summary }} @
            {{ trigger.calendar_event.start }}
```

{% enddetails %}

{% details "Example: Calendar Event Light Schedule " %}

This example consists of:

- For the calendar entity ` calendar.device_automation`.
- When event summary contains `Front Lights`.
- Turn on and off light named `light.front` when the event starts and ends.

```yaml
automation:
  - alias: "Front Light Schedule"
    triggers:
      - trigger: calendar
        event: start
        entity_id: calendar.device_automation
      - trigger: calendar
        event: end
        entity_id: calendar.device_automation
    conditions:
      - condition: template
        value_template: "{{ 'Front Lights' in trigger.calendar_event.summary }}"
    actions:
      - if:
          - "{{ trigger.event == 'start' }}"
        then:
          - action: light.turn_on
            target:
              entity_id: light.front
        else:
          - action: light.turn_off
            target:
              entity_id: light.front
```

{% enddetails %}

{% include integrations/actions.md %}

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}
