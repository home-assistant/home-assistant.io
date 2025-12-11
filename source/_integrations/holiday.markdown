---
title: Holiday
description: Instructions on how to use holiday calendars in Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Local Polling
ha_release: 2024.1
ha_config_flow: true
ha_domain: holiday
ha_platforms:
  - calendar
ha_codeowners:
  - '@jrieger'
  - '@gjohansson-ST'
ha_integration_type: integration
---

The Holiday integration allows you to create a calendar of holidays in Home Assistant for powering automations.

It uses the Python module [holidays](https://pypi.org/project/holidays/) to incorporate information about region-specific public holidays.

A calendar entity has a state and attributes that represent the next upcoming event (only). A calendar trigger is a much more flexible way to power automations with fewer limitations than using the entity state.

Some countries provides additional categories to be configured besides the public holidays. See the details for each country in the [holidays](https://pypi.org/project/holidays/) library. If the country does not support additional categories, the option to configure categories will not be displayed.

{% include integrations/config_flow.md %}

## Holiday calendar automations

Individual holiday *Events* are what powers automations such as:

- Turn on the Christmas lights at the *start* of Christmas Day.
- Prevent your covers from being opened on public holidays.

For an overview, refer to [calendar automations](/integrations/calendar#automation). You can use [calendar trigger variables](/docs/automation/templating/#calendar) in a condition or action such as the event `summary`, `description`, `location` and in other places.
