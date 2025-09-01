---
title: Remote Calendar
description: Instructions on how to use remote calendars in Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Cloud Polling
ha_release: 2025.4
ha_config_flow: true
ha_domain: remote_calendar
ha_platforms:
  - calendar
  - diagnostics
ha_codeowners:
  - '@Thomas55555'
  - '@allenporter'
ha_integration_type: service
ha_quality_scale: silver
---

The **Remote calendar** {% term integration %} allows you to read a calendar in Home Assistant for powering automations.

## Known limitations

The integration does not provide the ability to connect to a resource that requires authentication or special headers.

## Installation instructions

{% include integrations/config_flow.md %}

Please provide the following information to the config flow.

{% configuration_basic %}
Calendar Name:
    description: "A name for your calendar, you can choose a name you want.
    Example: `Home Assistant Events`"
Calendar URL:
    description: "The URL of the remote calendar. Example: `https://calendar.google.com/calendar/ical/p07n98go11onamd08d0kmq6jhs%40group.calendar.google.com/public/basic.ics`"
{% endconfiguration_basic %}

## Data updates

At the start of the integration, we fetch data from the remote. If the update fails, the integration tries again to fetch the data. After that, the update interval of the calendar is set to every 24 hours.

### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}
## Supported functionality

The integration only supports reading a calendar. A calendar entity has a state and attributes that represent the next upcoming event (only). All the events of the calendar can be displayed in the Calendar dashboard.

## Calendar Event Automations

Individual Calendar *Events* are what powers automations such as:

- Notify me *12 hours before* the *start* of the event named *Garbage collection*.

See [Calendar Automations](/integrations/calendar#automation) for an overview, and read more about [Calendar Trigger Variables](/docs/automation/templating/#calendar) for the available information you can use in a condition or action such as the event `summary`, `description`, `location` and more.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
