---
title: "Parse duration string: as_timedelta"
function_name: "as_timedelta"
description: "Parses an ISO 8601 duration string into a timedelta object."
available_as:
  - function
  - filter
category: datetime
return_type: timedelta
limited: true
since: "2021.12"
related_functions:
  - timedelta
  - now
  - as_datetime
  - as_timestamp
---

The `as_timedelta` template function parses an ISO 8601 duration string and returns a Python timedelta object. Give it a string like "PT1H30M" (1 hour and 30 minutes) or "P2DT6H" (2 days and 6 hours), and it returns a timedelta you can use in time calculations.

Some {% term integrations %} and external services provide durations in ISO 8601 format. To use these values in calculations, such as adding a duration to the current time or comparing how long something will take, you need to convert them into timedelta objects first. `as_timedelta` does this for you. If you need to create a timedelta from numeric values (days, hours, minutes) rather than parsing a string, use [`timedelta`](/template-functions/timedelta/) instead.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ as_timedelta("PT1H30M") }}'
type: timedelta
output: "1:30:00"

---
filter: '{{ "PT1H30M" | as_timedelta }}'
type: timedelta
output: "1:30:00"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
as_timedelta(
    value: str,
) -> timedelta | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    An ISO 8601 duration string to parse. Common formats include "PT1H" (1 hour), "PT30M" (30 minutes), "P1D" (1 day), and "P2DT6H30M" (2 days, 6 hours, 30 minutes). Returns `None` if the string cannot be parsed.
  required: true
  type: string
{% endfunction_parameters %}

## ISO 8601 duration format

The ISO 8601 duration format uses `P` as a prefix, followed by date components and `T` to separate time components:

- `P1D` - 1 day
- `PT1H` - 1 hour
- `PT30M` - 30 minutes
- `PT45S` - 45 seconds
- `P2DT6H30M` - 2 days, 6 hours, 30 minutes

{% example %}
template: '{{ as_timedelta("P2DT6H30M") }}'
type: timedelta
output: "2 days, 6:30:00"
{% endexample %}

## Good to know

- Returns `None` when the string cannot be parsed, so guard against missing data before arithmetic.
- Only the ISO 8601 duration format is accepted. A plain string like `"1h30m"` will not work. For numeric inputs, use [`timedelta`](/template-functions/timedelta/).
- Year and month components (`Y`, `M` before `T`) are not supported because their length in seconds is not fixed.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Add a duration to the current time

Calculate when an event will end by adding a duration from a sensor to [`now`](/template-functions/now/).

{% example %}
template: '{{ now() + as_timedelta("PT2H30M") }}'
type: datetime
output: "2024-03-15 17:00:00.123456+01:00"
{% endexample %}

### Get total seconds from a duration

Convert an ISO 8601 duration string to a total number of seconds for use in numeric comparisons.

{% example %}
template: '{{ as_timedelta("PT1H30M").total_seconds() | int }}'
type: integer
output: "5400"
{% endexample %}

### Check if a remaining duration is short

Determine whether a timer or countdown is about to finish by comparing the duration to a threshold.

{% example %}
template: |
  {{
    as_timedelta(states("sensor.washer_remaining"))
    < as_timedelta("PT10M")
  }}
type: boolean
output: "true"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
