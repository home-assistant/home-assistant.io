---
title: "Today at a specific time: today_at"
function_name: "today_at"
description: "Returns today's date combined with a specific time."
available_as:
  - function
category: datetime
return_type: datetime
limited: false
since: "2021.12"
related_functions:
  - now
  - as_datetime
  - as_timestamp
  - timedelta
---

The `today_at` template function returns a {% term datetime %} object for today's date at a specific time you provide. Give it a time string like "08:00" or "14:30:00" and it returns a full datetime representing that time today, in your local time zone.

This is especially useful in {% term automations %} when you need to check whether the current time is before or after a specific point in the day. For example, you might want to turn on lights only after 18:00, send a morning summary at 07:00, or check if it is still before bedtime. Instead of manually constructing a datetime from the current date and your target time, `today_at` handles it in a single call.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ today_at("08:00") }}'
type: datetime
output: "2024-03-15 08:00:00+01:00"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
today_at(time_str: str = "00:00") -> datetime
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
time_str:
  description: >
    A time string in "HH:MM" or "HH:MM:SS" format. If not provided, defaults to midnight ("00:00").
  required: false
  default: '"00:00"'
  type: string
{% endfunction_parameters %}

## Comparing with the current time

A common use is to check if the current time is before or after a specific point in the day, using [`now`](/template-functions/now/) for comparison.

{% example %}
template: '{{ now() > today_at("18:00") }}'
type: boolean
output: "false"
{% endexample %}

## Good to know

- The returned datetime is in your Home Assistant time zone, making it safe to compare directly with [`now`](/template-functions/now/).
- "Today" is determined when the template runs, so a template scheduled at 23:59 and compared at 00:01 will use two different dates.
- Accepts strings in `"HH:MM"` or `"HH:MM:SS"` format. Other formats raise an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Only run an automation in the evening

Use `today_at` in a {% term condition %} to limit an {% term automation %} to run only between 18:00 and 23:00.

{% example %}
automation: |
  condition:
    - condition: template
      value_template: >
        {{ today_at("18:00") <= now() < today_at("23:00") }}
{% endexample %}

### Calculate minutes until a time

Find out how many minutes remain until a specific time today.

{% example %}
template: '{{ ((today_at("17:00") - now()).total_seconds() / 60) | int }}'
type: integer
output: "150"
{% endexample %}

### Set a time-based brightness

Adjust light brightness based on how close it is to bedtime.

{% example %}
template: |
  {% set bedtime = today_at("22:00") %}
  {% set hours_left = ((bedtime - now()).total_seconds() / 3600)
     | float | round(1) %}
  {{ [((hours_left / 4) * 100) | int, 10] | max }}
type: integer
output: "75"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
