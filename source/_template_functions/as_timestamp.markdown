---
title: "Convert to UNIX timestamp: as_timestamp"
function_name: "as_timestamp"
description: "Converts a datetime object or string to a UNIX timestamp."
available_as:
  - function
  - filter
category: datetime
return_type: float
limited: true
since: "0.7"
related_functions:
  - as_datetime
  - now
  - utcnow
  - timestamp_custom
  - timestamp_local
  - timestamp_utc
---

The `as_timestamp` template function converts a {% term datetime %} object or a date/time string into a UNIX timestamp. The result is a floating-point number representing the number of seconds since January 1, 1970 (the UNIX epoch).

UNIX timestamps are useful when you need to perform arithmetic with dates and times, since they are plain numbers that can be added, subtracted, and compared. For example, you can subtract two timestamps to find the number of seconds between two events, or add a number of seconds to find a future time. Many external services and APIs also expect timestamps in this format. You can convert the result back to a readable date using [`timestamp_custom`](/template-functions/timestamp_custom/), [`timestamp_local`](/template-functions/timestamp_local/), or [`as_datetime`](/template-functions/as_datetime/).

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ as_timestamp("2024-03-15T14:30:00+01:00") }}'
type: float
output: "1710510600.0"

---
filter: '{{ "2024-03-15T14:30:00+01:00" | as_timestamp }}'
type: float
output: "1710510600.0"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
as_timestamp(
    value: datetime | str,
    default: Any = None,
) -> float | Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The datetime object or date/time string to convert. Strings must be in a recognized date/time format (for example, ISO 8601).
  required: true
  type: [string, datetime]
default:
  description: >
    Value to return if the conversion fails. If not provided, an error is raised on invalid input.
  required: false
  type: any
{% endfunction_parameters %}

## Converting the current time

You can convert [`now`](/template-functions/now/) or [`utcnow`](/template-functions/utcnow/) to get the current UNIX timestamp.

{% example %}
template: '{{ as_timestamp(now()) }}'
type: float
output: "1710510600.0"
{% endexample %}

## Using a default value

If the input might be invalid, provide a default to avoid errors.

{% example %}
template: '{{ as_timestamp("not a date", default=0) }}'
type: float
output: "0"
{% endexample %}

## Good to know

- The result is a UNIX timestamp in seconds (a float), not milliseconds.
- Without a default, unparseable strings raise an error.
- Subtracting two timestamps gives a duration in seconds, which can be compared directly with numeric thresholds.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Seconds since an entity last changed

Calculate how many seconds have passed since a sensor last changed {% term state %}.

{% example %}
template: |
  {{
    (as_timestamp(now())
     - as_timestamp(states.binary_sensor.front_door.last_changed))
    | int
  }}
type: integer
output: "3847"
{% endexample %}

### Check if something happened in the last 5 minutes

Determine whether the front door opened in the last 300 seconds.

{% example %}
template: |
  {{
    (as_timestamp(now())
     - as_timestamp(states.binary_sensor.front_door.last_changed))
    < 300
  }}
type: boolean
output: "true"
{% endexample %}

### Format a timestamp for display

Convert a datetime string to a UNIX timestamp and then format it using [`timestamp_custom`](/template-functions/timestamp_custom/).

{% example %}
template: |
  {{
    as_timestamp("2024-03-15T14:30:00+01:00")
    | timestamp_custom("%H:%M")
  }}
type: string
output: "14:30"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
