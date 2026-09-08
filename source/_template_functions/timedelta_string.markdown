---
title: "Human-readable duration: timedelta_string"
function_name: "timedelta_string"
description: "Returns a human-readable string representation of a timedelta duration."
available_as:
  - function
  - filter
category: datetime
return_type: string
limited: false
since: "2026.6"
related_functions:
  - timedelta
  - as_timedelta
  - time_since
  - time_until
  - relative_time  
---

The `timedelta_string` template function converts a timedelta object into a human-readable string like "2 hours" or "1 day 30 minutes". Unlike [`time_since`](/template-functions/time_since/) and [`time_until`](/template-functions/time_until/), which compute the duration from the current time to a given datetime, `timedelta_string` works directly on an already-computed timedelta. This makes it useful when you've already calculated a duration from a subtraction or from a sensor, and just want to display it nicely.

Negative timedeltas are formatted using their absolute value.

You can control the level of detail with the optional `precision` parameter, which determines how many time components (years, months, days, hours, minutes, seconds) to include.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ timedelta_string(trigger.to_state.last_changed - trigger.from_state.last_changed) }}'
type: string
output: "15 minutes"

---
filter: '{{ (trigger.to_state.last_changed - trigger.from_state.last_changed) | timedelta_string }}'
type: string
output: "15 minutes"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
timedelta_string(
    value: timedelta,
    precision: int = 1,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    A timedelta object to format as a human-readable string. If the value is not a timedelta, it is returned unmodified.
  required: true
  type: timedelta
precision:
  description: >
    The number of time components to include in the output, from 1 to 6. A precision of 1 might return "2 hours", while a precision of 2 might return "2 hours 30 minutes". Use 0 to include all components. Higher precision gives more detail.
  required: false
  default: "1"
  type: integer
{% endfunction_parameters %}

## Controlling precision

By default, `timedelta_string` returns only the largest time component. Increase the precision to include more detail.

{% example %}
template: '{{ timedelta_string(timedelta(hours=2, minutes=30), 1) }}'
type: string
output: "3 hours"
{% endexample %}

{% example %}
template: '{{ timedelta_string(timedelta(hours=2, minutes=30), 2) }}'
type: string
output: "2 hours 30 minutes"
{% endexample %}

{% example %}
template: '{{ timedelta_string(timedelta(hours=1, minutes=54, seconds=33), 0) }}'
type: string
output: "1 hour 54 minutes 33 seconds"
{% endexample %}

## Good to know

- If the input is not a timedelta, it is returned unmodified.
- Negative timedeltas are formatted using their absolute value.
- Durations shorter than one second return `"0 seconds"`.
- If you want to go the other direction — display how long ago a datetime was, or how long until a future one — use [`time_since`](/template-functions/time_since/) or [`time_until`](/template-functions/time_until/) instead.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Show how long a door has been open

Display the elapsed time between two state changes in an automation.

{% example %}
template: |
  {% set open_for = trigger.to_state.last_changed - trigger.from_state.last_changed %}
  Open for {{ timedelta_string(open_for, 2) }}
type: string
output: "Open for 15 minutes 30 seconds"
{% endexample %}

### Format a duration from a sensor

Some integrations expose durations as ISO 8601 strings. Parse and display them.

{% example %}
template: |
  {% set duration = as_timedelta(states("sensor.runtime")) %}
  Running for {{ timedelta_string(duration) }}
type: string
output: "Running for 3 hours"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
