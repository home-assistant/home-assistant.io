---
title: "Create a time duration: timedelta"
function_name: "timedelta"
description: "Creates a timedelta object from numeric time components."
available_as:
  - function
category: datetime
return_type: timedelta
limited: true
since: "0.7"
related_functions:
  - as_timedelta
  - now
  - utcnow
  - today_at
  - as_datetime
---

The `timedelta` template function creates a timedelta object from numeric values like days, hours, minutes, and seconds. This gives you a duration that you can add to or subtract from {% term datetime %} objects to calculate future or past times.

Whenever you need to offset a time by a specific amount, `timedelta` is how you express that amount. For example, you might want to check if a sensor changed in the last 10 minutes, calculate what time it will be in 2 hours, or determine if an event happened more than 3 days ago. You create a timedelta with the desired duration and then add or subtract it from a datetime like [`now`](/template-functions/now/). If you need to parse a duration from an ISO 8601 string instead of numeric values, use [`as_timedelta`](/template-functions/as_timedelta/).

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ timedelta(hours=2, minutes=30) }}'
type: timedelta
output: "2:30:00"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
timedelta(
    days: float = 0,
    seconds: float = 0,
    microseconds: float = 0,
    milliseconds: float = 0,
    minutes: float = 0,
    hours: float = 0,
    weeks: float = 0,
) -> timedelta
```

### Function parameters

The following parameters can be provided to this function. All parameters are optional and default to 0. You can combine multiple parameters to create any duration.

{% function_parameters %}
days:
  description: Number of days.
  required: false
  default: "0"
  type: float
seconds:
  description: Number of seconds.
  required: false
  default: "0"
  type: float
microseconds:
  description: Number of microseconds.
  required: false
  default: "0"
  type: float
milliseconds:
  description: Number of milliseconds.
  required: false
  default: "0"
  type: float
minutes:
  description: Number of minutes.
  required: false
  default: "0"
  type: float
hours:
  description: Number of hours.
  required: false
  default: "0"
  type: float
weeks:
  description: Number of weeks.
  required: false
  default: "0"
  type: float
{% endfunction_parameters %}

## Good to know

- All arguments are keyword-only. Call it as `timedelta(hours=2)`, not `timedelta(2)`.
- Values can be negative and can exceed their usual range. `timedelta(hours=36)` and `timedelta(days=1, hours=12)` produce the same duration.
- There is no `months` or `years` argument. Use `days=30` for an approximate month, or calculate a future date by adjusting `now()` components directly.

## Adding and subtracting durations

The most common use is adding or subtracting a timedelta from [`now`](/template-functions/now/) to calculate a time in the past or future.

{% example %}
template: '{{ now() - timedelta(hours=1) }}'
type: datetime
output: "2024-03-15 13:30:00.123456+01:00"
{% endexample %}

{% example %}
template: '{{ now() + timedelta(days=7) }}'
type: datetime
output: "2024-03-22 14:30:00.123456+01:00"
{% endexample %}

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check if something changed recently

Determine whether a sensor changed {% term state %} in the last 10 minutes.

{% example %}
template: |
  {{
    now() - states.binary_sensor.motion.last_changed
    < timedelta(minutes=10)
  }}
type: boolean
output: "true"
{% endexample %}

### Check if something is overdue

Determine whether a plant was last watered more than 3 days ago.

{% example %}
template: |
  {{
    now() - states.sensor.plant_last_watered.last_changed
    > timedelta(days=3)
  }}
type: boolean
output: "false"
{% endexample %}

### Calculate a future time for display

Show what time it will be in 45 minutes, formatted for a notification.

{% example %}
template: '{{ (now() + timedelta(minutes=45)).strftime("%H:%M") }}'
type: string
output: "15:15"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
