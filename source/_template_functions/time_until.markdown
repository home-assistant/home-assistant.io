---
title: "Human-readable time remaining: time_until"
function_name: "time_until"
description: "Returns a human-readable string describing how much time remains until a datetime."
available_as:
  - function
  - filter
category: datetime
return_type: string
limited: false
since: "2024.11"
related_functions:
  - time_since
  - now
  - as_datetime
  - today_at
---

The `time_until` template function returns a human-readable string describing how much time remains until a given {% term datetime %} in the future. Give it a future datetime, and it returns something like "3 hours" or "2 days and 6 hours" instead of a raw number of seconds.

This is useful whenever you want to display a countdown or remaining time in a natural format. For example, showing how long until the next alarm goes off, displaying "arrives in 45 minutes" for a delivery, or reporting how much time is left on a timer. The function only works with datetimes in the future. For past datetimes, use [`time_since`](/template-functions/time_since/) instead. You can control the level of detail with the optional precision parameter, which determines how many time components (years, months, days, hours, minutes, seconds) to include.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ time_until(as_datetime(states("sensor.next_alarm"))) }}'
type: string
output: "6 hours"

---
filter: '{{ as_datetime(states("sensor.next_alarm")) | time_until }}'
type: string
output: "6 hours"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
time_until(
    value: datetime,
    precision: int = 1,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    A datetime object representing a point in the future. The function calculates the time remaining between now and this datetime.
  required: true
  type: datetime
precision:
  description: >
    The number of time components to include in the output, from 1 to 6. A precision of 1 might return "6 hours", while a precision of 2 might return "6 hours and 15 minutes". Higher precision gives more detail.
  required: false
  default: "1"
  type: integer
{% endfunction_parameters %}

## Controlling precision

By default, `time_until` returns only the largest time component. Increase the precision to include more detail.

{% example %}
template: '{{ time_until(as_datetime(states("sensor.next_alarm")), 1) }}'
type: string
output: "6 hours"
{% endexample %}

{% example %}
template: '{{ time_until(as_datetime(states("sensor.next_alarm")), 3) }}'
type: string
output: "6 hours, 15 minutes and 30 seconds"
{% endexample %}

## Good to know

- Only works with datetimes in the future. For past datetimes, use [`time_since`](/template-functions/time_since/) instead.
- Durations shorter than one second return `"0 seconds"`.
- The input datetime must be time zone aware.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Show time until next alarm

Display a countdown to the next alarm on your dashboard.

{% example %}
template: |
  {{ "Alarm in " ~ time_until(as_datetime(states("sensor.next_alarm"))) }}
type: string
output: "Alarm in 6 hours"
{% endexample %}

### Countdown to a scheduled event

Show how long until a calendar event starts, with more detail.

{% example %}
template: |
  {% set event_time = as_datetime(states("sensor.next_appointment")) %}
  Starts in {{ time_until(event_time, 2) }}
type: string
output: "Starts in 2 hours and 30 minutes"
{% endexample %}

### Time remaining in an automation condition

Only run the rest of an {% term automation %} if a scheduled event is less than 1 hour away. Combine `time_until` with a check on the remaining time using [`today_at`](/template-functions/today_at/) and [`now`](/template-functions/now/).

{% example %}
automation: |
  condition:
    - condition: template
      value_template: >
        {{
          as_datetime(states("sensor.next_event")) - now()
          < timedelta(hours=1)
        }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
