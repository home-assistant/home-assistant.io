---
title: Workday
description: Steps to configure the binary workday sensor.
ha_category:
  - Binary sensor
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
  - diagnostics
ha_integration_type: integration
---

The `workday` binary sensor indicates whether the current day is a workday or not.

It allows specifying which days of the week will count as workdays and also uses the Python module [holidays](https://pypi.org/project/holidays/) to incorporate information about region-specific public holidays.

This can be used to make daily automations that act differently on workdays than non-workdays. For example, you could make your bedroom lights turn on (gently) at 7 in the morning if it is a workday but wait until 11 if it is a non-working day.

## Setup

Check the [country list](https://github.com/vacanza/holidays#available-countries) for available provinces (and other subdivisions, like states and territories) for each country.

{% include integrations/config_flow.md %}

The keyword "Holidays" is used for public holidays identified by the holidays module and holidays added by the "Add holidays" configuration option.

{% important %}
Take note of the "Holidays" keyword. Your first instinct might be to add it to the "Excludes" configuration, thinking it means skipping the holidays. But it is meant to exclude the days in the holiday list from the workdays. So, when you exclude "Holidays" and a workday falls on that day, that workday is excluded, and the sensor will be **off**. If you want every workday flagged with no regard to holidays, ensure that there is something in your "Excludes" configuration _other_ than "Holidays".
{% endimportant %}

## Specific field information

Country code must be given according to [holidays](https://pypi.org/project/holidays/) notation. The country can also be set to `None` to start with an empty set of holidays. This is useful in conjunction with the add holidays field.

Subdivision code must be given according to [holidays](https://pypi.org/project/holidays/) notation.

Add holidays will only take dates formatted with `YYYY-MM-DD` or a date range formatted with `YYYY-MM-DD,YYYY-MM-DD`.

Remove holidays will take dates formatted with `YYYY-MM-DD`, a date range formatted with `YYYY-MM-DD,YYYY-MM-DD` or partial of name, for example, `christmas` will exclude `Christmas Day`.

The offset can be used to see if future days are workdays. For example, put `1` to see if tomorrow is a workday.

Additional categories can be added through the configuration to include optional holidays according to the lists provided in the [python-holidays library](https://github.com/vacanza/python-holidays?tab=readme-ov-file#available-countries)

## Action `workday.check_date`


This action populates [Response Data](/docs/scripts/perform-actions#use-templates-to-handle-response-data)
providing feedback if the date is a workday or not.

| Data attribute | Required | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `check_date` | yes | Date to test if workday or not. | 2022-03-10

{% raw %}
```yaml
action: workday.check_date
target:
  entity_id: binary_sensor.workday
data:
  check_date: "2023-12-25"
response_variable: check_date
```
{% endraw %}

The response data field `check_date` is providing:

| Response data | Description | Example |
| ---------------------- | ----------- | -------- |
| `workday` | Is date a workday. | True

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
