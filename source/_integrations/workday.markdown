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

% configuration_basic %}
Country:
  description: Choose a country, can also be left empty to start with an empty set of holidays.
Subdivision of country:
  description: Optionally select a specific subdivision of the chosen country.
Workdays:
  description: Which days are workdays
Days to exclude:
  description: Which days should not be workdays (note below the important information regarding the "Holiday" keyword)
Add holidays:
  description: Provide dates formatted with `YYYY-MM-DD` or a date range formatted with `YYYY-MM-DD,YYYY-MM-DD` to add them as holidays.
Remove holidays:
  description: Provide dates formatted with `YYYY-MM-DD`, a date range formatted with `YYYY-MM-DD,YYYY-MM-DD` or partial of name, (for example, `christmas` will find `Christmas Day`) to remove them from the list of holidays.
Offset:
  description: The offset can be used to see if future days are workdays. For example, put `1` to see today if tomorrow is a workday.
Additional category:
  description: Optional categories that can be used to select them as holidays
Language for named holidays:
  description: For use with "Remove holidays"; select which language to find named holidays.
{% endconfiguration_basic %}

The keyword "Holidays" is used for public holidays identified by the holidays module and holidays added by the "Add holidays" configuration option.

{% important %}
Take note of the "Holidays" keyword. Your first instinct might be to add it to the "Excludes" configuration, thinking it means skipping the holidays. But it is meant to exclude the days in the holiday list from the workdays. So, when you exclude "Holidays" and a workday falls on that day, that workday is excluded, and the sensor will be **off**. If you want every workday flagged with no regard to holidays, ensure that there is something in your "Excludes" configuration _other_ than "Holidays".
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

The integration completely rely on the information provided by the [holidays library](https://pypi.org/project/holidays/).

Check the [holidays repository](https://github.com/vacanza/python-holidays) if you are missing a certain holiday and/or it may require a special category to be used. Any issues on such, should be raised directly at that repository.

## Remove the integration

{% include integrations/remove_device_service.md %}