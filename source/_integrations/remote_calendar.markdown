---
title: Remote calendar
description: Instructions on how to use remote calendars in Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Cloud Polling
ha_release: 2025.04
ha_config_flow: true
ha_domain: remote_calendar
ha_platforms:
  - calendar
ha_codeowners:
  - '@Thomas55555'
ha_integration_type: service
---

The **Remote calendar** {% term integration %} allows you to read a calendar in Home Assistant for powering automations.

A calendar entity has a state and attributes that represent the next upcoming event (only). A calendar trigger is a much more flexible way to power automations with fewer limitations than using the entity state.

## Installation instructions

{% include integrations/config_flow.md %}

## Update interval

The update interval of the calendar is every 24h.

### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

## Calendar Event Automations

Individual Calendar *Events* are what powers automations such as:

- Notify me *12 hours before* the *start* of the event named *Garbage collection*.

See [Calendar Automations](/integrations/calendar#automation) for an overview, and read more about [Calendar Trigger Variables](/docs/automation/templating/#calendar) for the available information you can use in a condition or action such as the event `summary`, `description`, `location` and more.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
