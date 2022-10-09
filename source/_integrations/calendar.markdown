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
      # Optional time offset to fire a set time before or after event start/end
      offset: -00:15:00
```

Calendar triggers should should generally not use automation mode `single` to ensure the trigger
can fire when multiple events start at the same time (e.g. use `queued` or `parallel` instead)

See [Automation Trigger Variables: Calendar](/docs/automation/templating/#calendar) for additional trigger data available for conditions or actions.

### Automation Recipes

Below are a few example ways you can use Calendar triggers.

{% details "Example: Calendar Event Notification " %}

This example automation consists of:
- For the calendar entity `calendar.personal`
- At the start of any calendar event
- Send a notification with the title and start time of the event
- Allowing multiple events starting at the same time

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
  mode: queued
```
{% endraw %}

{% enddetails %}

{% details "Example: Calendar Event Light Schedule " %}

This example consists of:
- For the calendar entity ` calendar.device_automation`
- When event summary contains `Front Lights`
- Turn on and off light named `light.front` when the event starts and ends

{% raw %}
```yaml
automation:
  alias: Front Light Schedule
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
  mode: queued
```
{% endraw %}

{% enddetails %}
