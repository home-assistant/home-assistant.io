---
description: Instructions on how to use holiday calendars in Home Assistant.
ha_release: 2024.1
ha_domain: holiday
---

The **Holiday** {% term integration %} adds a {% term calendar %} with the public holidays for a country, and optionally a region within that country, to Home Assistant. You can use it to view upcoming holidays on your calendar dashboard and to power automations, for example, to keep the blinds closed on public holidays or turn on festive lights on a specific holiday.

The holiday data comes from the [holidays](https://pypi.org/project/holidays/) library, which covers a large number of countries and their regions. No account or internet connection is needed.

A {% term calendar %} entity has a state and attributes that represent the next upcoming event (only). A calendar trigger is a much more flexible way to power automations with fewer limitations than using the entity state.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Country:
  description: "The country to show holidays for. Defaults to the country set in your Home Assistant [general settings](/docs/configuration/basic/)."
Province:
  description: "The province, state, or other region of the country. Some regions have extra or different holidays. Only shown if the selected country has regions."
Categories:
  description: "Additional holiday categories to include, such as bank or school holidays. Public holidays are always included. Only shown if the selected country has additional categories. For the categories each country supports, refer to the [holidays](https://pypi.org/project/holidays/) library."
{% endconfiguration_basic %}

You can add the integration more than once, for example, to show holidays for several countries or regions. Each combination of country, region, and categories can only be added once.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Categories:
  description: "Additional holiday categories to include. Public holidays are always included. If the country has no additional categories, the options are not available."
{% endconfiguration_basic %}

To change the province or region of an existing entry, use **Reconfigure** from the three dots {% icon "mdi:dots-vertical" %} menu on the entry.

## Holiday calendar automations

Individual holiday *Events* are what powers automations such as:

- Turn on the Christmas lights at the *start* of Christmas Day.
- Prevent your covers from being opened on public holidays.

For an overview, refer to [calendar automations](/integrations/calendar#automation). You can use [calendar trigger variables](/docs/automation/trigger-data/#calendar-triggers) in a condition or action such as the event `summary`, `description`, `location` and in other places.

## Data updates

The holiday data is included in the integration, so no data is fetched from the internet. The calendar updates its state at the start of each day.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
