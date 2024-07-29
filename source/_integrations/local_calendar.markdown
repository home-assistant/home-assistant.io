---
title: Local calendar
description: Instructions on how to use local calendars in Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Local Polling
ha_release: 2022.12
ha_config_flow: true
ha_domain: local_calendar
ha_platforms:
  - calendar
  - diagnostics
ha_codeowners:
  - '@allenporter'
ha_integration_type: integration
---

The **Local calendar** {% term integration %} allows you to create a calendar of events in Home Assistant for powering automations.

A calendar entity has a state and attributes that represent the next upcoming event (only). A calendar trigger is a much more flexible way to power automations with fewer limitations than using the entity state.

{% include integrations/config_flow.md %}

## Calendar Event Automations

Individual Calendar *Events* are what powers automations such as:

- Turn on a light at the *start* of the event named *Front Yard Light*
- Send a notification *5 minutes before the start of any event*
- Stop the media player *30 minutes after* the *end* of the event named *Exercise*.

See [Calendar Automations](/integrations/calendar#automation) for an overview, and read more about [Calendar Trigger Variables](/docs/automation/templating/#calendar) for the available information you can use in a condition or action such as the event `summary`, `description`, `location` and more.
