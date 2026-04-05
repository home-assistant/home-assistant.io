---
title: "Convert to datetime: as_datetime"
function_name: "as_datetime"
description: "Converts a string or timestamp to a datetime object."
available_as:
  - function
  - filter
category: datetime
return_type: datetime
limited: true
since: "2021.12"
related_functions:
  - as_timestamp
  - as_local
  - as_timedelta
  - strptime
  - now
---

The `as_datetime` template function converts a date/time string or a UNIX timestamp into a {% term datetime %} object. Give it an ISO 8601 formatted string like "2024-03-15T14:30:00" or a numeric timestamp, and it returns a proper datetime you can work with in your templates.

Many {% term sensors %} and {% term integrations %} provide dates and times as plain text strings or UNIX timestamps. To compare those values with [`now`](/template-functions/now/), calculate time differences, or format them for display, you first need to turn them into datetime objects. `as_datetime` handles this conversion for you. It accepts ISO 8601 formatted strings (the most common format in Home Assistant) as well as numeric UNIX timestamps.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ as_datetime("2024-03-15T14:30:00+01:00") }}'
type: datetime
output: "2024-03-15 14:30:00+01:00"

---
filter: '{{ "2024-03-15T14:30:00+01:00" | as_datetime }}'
type: datetime
output: "2024-03-15 14:30:00+01:00"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
as_datetime(
    value: str | int | float,
    default: Any = None,
) -> datetime | Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to convert to a datetime. Can be an ISO 8601 formatted string or a numeric UNIX timestamp.
  required: true
  type: [string, float]
default:
  description: >
    Value to return if the conversion fails. If not provided, an error is raised on invalid input.
  required: false
  type: any
{% endfunction_parameters %}

## Converting from a UNIX timestamp

You can also convert a numeric UNIX timestamp (seconds since January 1, 1970) into a datetime object.

{% example %}
template: '{{ as_datetime(1710510600) }}'
type: datetime
output: "2024-03-15 14:30:00+00:00"
{% endexample %}

## Using a default value

If the input string might be invalid, provide a default value to avoid errors.

{% example %}
template: '{{ as_datetime("not a date", default="unknown") }}'
type: string
output: "unknown"
{% endexample %}

## Good to know

- Strings without a time zone are treated as local time; strings with an offset or `Z` suffix keep the original zone.
- UNIX timestamps are interpreted in UTC, so chain with [`as_local`](/template-functions/as_local/) if you need local time.
- Without a default, an unparseable input raises an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Convert a sensor value to a datetime

Many sensors store dates as strings. Convert them to datetime objects to perform comparisons or calculations.

{% example %}
template: '{{ as_datetime(states("sensor.next_appointment")) }}'
type: datetime
output: "2024-03-15 14:30:00+01:00"
{% endexample %}

### Calculate time until a future event

Convert a date string from a sensor and calculate how many hours remain until that event.

{% example %}
template: |
  {% set event = as_datetime(states("sensor.next_appointment")) %}
  {{ ((event - now()).total_seconds() / 3600) | round(1) }}
type: float
output: "3.5"
{% endexample %}

### Chain with as_local

Convert a UTC datetime string to your local time zone by chaining `as_datetime` with [`as_local`](/template-functions/as_local/).

{% example %}
template: '{{ as_datetime("2024-03-15T13:30:00+00:00") | as_local }}'
type: datetime
output: "2024-03-15 14:30:00+01:00"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
