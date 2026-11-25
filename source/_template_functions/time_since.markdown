---
title: "Human-readable time elapsed: time_since"
function_name: "time_since"
description: "Returns a human-readable string describing how much time has passed since a datetime."
available_as:
  - function
  - filter
category: datetime
return_type: string
limited: false
since: "2024.11"
related_functions:
  - time_until
  - timedelta_string
  - relative_time
  - now
  - as_datetime
  - as_timestamp
---

The `time_since` template function returns a human-readable string describing how much time has elapsed since a given {% term datetime %}. Give it a datetime in the past, and it returns something like "2 hours" or "3 days 5 hours" instead of a raw number of seconds.

This is useful whenever you want to display elapsed time in a natural, readable format. For example, showing "last seen 45 minutes ago" on a dashboard, displaying how long a door has been open, or reporting how long ago a sensor last updated. The function only works with datetimes in the past. For future datetimes, use [`time_until`](/template-functions/time_until/) instead. You can control the level of detail with the optional precision parameter, which determines how many time components (years, months, days, hours, minutes, seconds) to include.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ time_since(states.binary_sensor.front_door.last_changed) }}'
type: string
output: "2 hours"

---
filter: '{{ states.binary_sensor.front_door.last_changed | time_since }}'
type: string
output: "2 hours"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
time_since(
    value: datetime,
    precision: int = 1,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    A datetime object representing a point in the past. The function calculates the time elapsed between this datetime and now.
  required: true
  type: datetime
precision:
  description: >
    The number of time components to include in the output. A precision of 1 might return "2 hours", while a precision of 2 might return "2 hours 30 minutes". Higher precision gives more detail. Use 0 to include every time component that isn't zero.
  required: false
  default: "1"
  type: integer
{% endfunction_parameters %}

## Controlling precision

By default, `time_since` returns only the largest time component. Increase the precision to include more detail.

{% example %}
template: '{{ time_since(states.binary_sensor.front_door.last_changed, 1) }}'
type: string
output: "2 hours"
{% endexample %}

{% example %}
template: '{{ time_since(states.binary_sensor.front_door.last_changed, 3) }}'
type: string
output: "2 hours 15 minutes 10 seconds"
{% endexample %}

## Good to know

- Only works with datetimes in the past. A datetime in the future is returned unchanged, without an error. For future datetimes, use [`time_until`](/template-functions/time_until/) instead.
- The last unit shown is rounded to the nearest whole number. All other units are cut off. For example, 2 hours 45 minutes gives `"3 hours"` with a precision of 1.
- Because of this rounding, the result doesn't carry over to the next unit. For example, 59 minutes 40 seconds gives `"60 minutes"`, not `"1 hour"`.
- Units that are zero are skipped and don't count toward the precision. For example, 2 hours and 15 seconds gives `"2 hours 15 seconds"` with a precision of 2.
- Durations shorter than half a second return `"0 seconds"`.
- If the input isn't a datetime, it's returned unchanged. This includes `none`, which [`as_datetime`](/template-functions/as_datetime/) returns for states like `unknown`.
- Datetimes without a time zone are accepted. They're treated as your local time.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Show how long a door has been open

Display the elapsed time since a door opened on your dashboard.

{% example %}
template: |
  {{
    "Open for "
    ~ time_since(states.binary_sensor.front_door.last_changed)
  }}
type: string
output: "Open for 2 hours"
{% endexample %}

### Detailed elapsed time in a notification

Send a {% term notification %} with a more detailed breakdown of elapsed time.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          The washing machine has been running for
          {{ time_since(states.sensor.washer_start.last_changed, 2) }}.
{% endexample %}

### Show when something was last seen

Create a "last seen" display for a person tracker.

{% example %}
template: |
  {{
    "Last seen "
    ~ time_since(states.person.paulus.last_changed) ~ " ago"
  }}
type: string
output: "Last seen 45 minutes ago"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
