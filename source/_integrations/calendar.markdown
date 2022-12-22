---
title: Calendar
description: Instructions on how to integrate calendars within Home Assistant.
ha_release: 0.33
ha_domain: calendar
ha_quality_scale: internal
ha_category: []
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The calendar integration provides calendar entities, allowing other integrations
to integrate calendars into Home Assistant. Calendars are shown on the calendar
dashboard and can be used with automations.

A calendar entity has a state and attributes representing the next event (only).
A calendar trigger is much more flexible, has fewer limitations, and is
recommended for automations instead of using the entity state.

<div class='note'>

Calendar entities are here to be consumed and provided by other integrations.

This page, therefore, does not provide instructions on how to create calendar
entities. Please see the ["Calendar" category](/integrations/#calendar) on the
integrations page to find integration offering update entities.

</div>

## Viewing and managing calendars

Each calendar is represented as its own entity in Home Assistant and can be
viewed and managed on a calendar dashboard. You can find the calendar dashboard
in the main sidebar of your Home Assistant instance.

Some calendar integrations allow Home Assistant to manage your calendars
directly from Home Assistant. In this case, you can add new events by clicking
the “Add event” button in the lower right corner of the calendar dashboard.

## Automation

Calendar [Triggers](/docs/automation/trigger) enable automation based on an
event's start or end. Review the [Automating Home Assistant](/getting-started/automation/)
getting started guide on automations or the [Automation](/docs/automation/)
documentation for full details.

{% my automations badge %}

![Screenshot Trigger](/images/integrations/calendar/trigger.png)

An example of a calendar trigger in YAML:

```yaml
automation:
  - trigger:
    - platform: calendar
      # Possible values: start, end
      event: start
      # The calendar entity_id
      entity_id: calendar.personal
      # Optional time offset to fire a set time before or after event start/end
      offset: -00:15:00
```

Calendar triggers should not generally use automation mode `single` to ensure
the trigger can fire when multiple events start at the same time (e.g., use
`queued` or `parallel` instead). Note that calendars are read once every 15
minutes. When testing, make sure you do not plan events less than 15 minutes
away from the current time, or your trigger might not fire.

See [Automation Trigger Variables: Calendar](/docs/automation/templating/#calendar) 
for additional trigger data available for conditions or actions.

### Automation Recipes

Below are a few example ways you can use Calendar triggers.

{% details "Example: Calendar Event Notification " %}

This example automation consists of:

- For the calendar entity `calendar.personal`.
- At the start of any calendar event.
- Send a notification with the title and start time of the event.
- Allowing multiple events starting at the same time.

{% raw %}
```yaml
automation:
  - alias: Calendar notification
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
```
{% endraw %}

{% enddetails %}

{% details "Example: Calendar Event Light Schedule " %}

This example consists of:

- For the calendar entity ` calendar.device_automation`.
- When event summary contains `Front Lights`.
- Turn on and off light named `light.front` when the event starts and ends.

{% raw %}
```yaml
automation:
  - alias: Front Light Schedule
    trigger:
      - platform: calendar
        event: start
        entity_id: calendar.device_automation
      - platform: calendar
        event: end
        entity_id: calendar.device_automation
    condition:
      - condition: template
        value_template: "{{ 'Front Lights' in trigger.calendar_event.summary }}"
    action:
      - if:
          - "{{ trigger.event == 'start' }}"
        then:
          - service: light.turn_on
            entity_id: light.front
        else:
          - service: light.turn_off
            entity_id: light.front
```
{% endraw %}

{% enddetails %}
