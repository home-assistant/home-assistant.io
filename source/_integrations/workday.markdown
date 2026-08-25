---
title: Workday
description: Steps to configure the binary workday sensor.
ha_category:
  - Binary sensor
  - Calendar
  - Utility
ha_iot_class: Local Polling
ha_release: 0.41
ha_quality_scale: internal
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
  - '@gjohansson-ST'
ha_domain: workday
ha_platforms:
  - binary_sensor
  - calendar
  - diagnostics
ha_integration_type: service
---

The **Workday** {% term integration %} indicates whether the current day is a workday or not.

It allows specifying which days of the week will count as workdays and also uses the Python module [holidays library](https://pypi.org/project/holidays/) to incorporate information about region-specific public holidays.

This can be used to make daily automations that act differently on workdays than non-workdays. For example, you could make your bedroom lights turn on (gently) at 7 in the morning if it is a workday but wait until 11 if it is a non-working day.

The `workday` {% term integration %} also provides a {% term calendar %} entity that may be used to see upcoming workdays.

## Setup

Check the [country list](https://github.com/vacanza/holidays#available-countries) for available subdivisions (such as provinces, states and territories) for each country.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Country:
  description: The country whose public holidays you want to use. Leave it empty to start with an empty set of holidays.
Days to include::
  description: The weekdays that are workdays.
Days to exclude:
  description: The days that are not workdays. Note below the important information regarding the **Holidays** keyword.
Offset:
  description: Days offset from current day. It can be used to see if future days are workdays. For example, enter `1` to see today if tomorrow is a workday.
Add holidays:
  description: Provide dates formatted with `YYYY-MM-DD` or a date range formatted with `YYYY-MM-DD,YYYY-MM-DD` to add them as holidays.
Remove holidays:
  description: Provide dates formatted with `YYYY-MM-DD`, a date range formatted with `YYYY-MM-DD,YYYY-MM-DD` or partial of name, (for example, `christmas` will find `Christmas Day`) to remove them from the list of holidays.
Language for named holidays:
  description: The language that will be used in the configuration of the holidays exclusion.
Subdivision of country:
  description: The subdivision of the chosen country, if any or wanted.
  required: false
Additional category:
  description: Additional holiday categories to include. Check the supported categories for each country in the [holidays library webpage](https://pypi.org/project/holidays/).
{% endconfiguration_basic %}

{% important %}
The **Holidays** keyword represents the list of holidays imported from the holidays library and the holidays added in the **Add holidays** configuration option. When you select **Holidays** in the configuration option **Days to exclude**, the days that are in the holidays list are excluded from the workdays list. This means that if a holiday falls on a weekday defined as workday, that day does not count as workday (the workday sensor will have the **Off** state).
{% endimportant %}

{% include integrations/actions.md %}

## Automation example

Example usage for automation:

```yaml
automation:
  alias: "Turn on heater on workdays"
  triggers:
    - trigger: time
      at: "08:00:00"
  conditions:
    - condition: state
      entity_id: binary_sensor.workday_sensor
      state: "on"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.heater
```

## Data fetching and limitations

Data is loaded completely offline from the [holidays library](https://pypi.org/project/holidays/) and there is no data fetching.

Newly created holidays or other configuration options are completely based on the releases of the [holidays library](https://pypi.org/project/holidays/)

## Troubleshooting

The integration completely relies on the information provided by the [holidays library](https://pypi.org/project/holidays/).

Check the [holidays repository](https://github.com/vacanza/python-holidays) if you are missing a certain holiday.
Some holidays in your country may not be actual official holidays and are therefore set in a special category that needs to be selected.
Missing holidays or incorrect days need to be raised directly in the [holidays repository](https://github.com/vacanza/python-holidays).

## Remove the integration

{% include integrations/remove_device_service.md %}
