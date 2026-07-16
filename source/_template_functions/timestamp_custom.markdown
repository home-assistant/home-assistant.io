---
title: "Format timestamp with custom format: timestamp_custom"
function_name: "timestamp_custom"
description: "Formats a UNIX timestamp as a string using a custom format."
available_as:
  - filter
category: datetime
return_type: string
limited: true
since: "0.7"
related_functions:
  - timestamp_local
  - timestamp_utc
  - as_timestamp
  - strptime
---

The `timestamp_custom` filter formats a UNIX timestamp into a human-readable string using a format pattern you specify. Give it a timestamp and a format string like "%H:%M" or "%Y-%m-%d", and it returns the formatted date and time.

This is useful whenever you have a UNIX timestamp (a number of seconds since January 1, 1970) and want to display it in a specific format. Many {% term sensors %} expose timestamps as attributes, and external APIs often return times as UNIX timestamps. With `timestamp_custom`, you can turn those numbers into readable dates and times in exactly the format you need. By default, the timestamp is converted to your local time zone, but you can set the second parameter to `false` to keep it in UTC.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ 1710510600 | timestamp_custom("%H:%M") }}'
type: string
output: "14:30"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | timestamp_custom(
    format_string: str = "%Y-%m-%d %H:%M:%S",
    local_time: bool = True,
    default: Any = None,
) -> str | Any
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
format_string:
  description: >
    The format string describing the desired output. Uses Python strftime format codes such as `%Y` (year), `%m` (month), `%d` (day), `%H` (hour), `%M` (minute), `%S` (second).
  required: false
  default: '"%Y-%m-%d %H:%M:%S"'
  type: string
local_time:
  description: >
    Whether to convert the timestamp to the local time zone before formatting. Set to `false` to format in UTC.
  required: false
  default: "true"
  type: boolean
default:
  description: >
    Value to return if the formatting fails. If not provided, an error is raised on invalid input.
  required: false
  type: any
{% endfunction_parameters %}

## Formatting in UTC

By default, `timestamp_custom` converts the timestamp to your local time zone. Pass `false` as the second argument to format in UTC instead.

{% example %}
template: '{{ 1710510600 | timestamp_custom("%H:%M", false) }}'
type: string
output: "13:30"
{% endexample %}

## Common format patterns

Here are some patterns that cover the formats you need most often:

- `%Y-%m-%d` produces `2024-03-15`
- `%H:%M` produces `14:30`
- `%H:%M:%S` produces `14:30:00`
- `%d/%m/%Y` produces `15/03/2024`
- `%A, %B %d` produces `Friday, March 15`
- `%I:%M %p` produces `02:30 PM`

## Good to know

- The input must be a UNIX timestamp (a number of seconds). Pass a datetime object through [`as_timestamp`](/template-functions/as_timestamp/) first.
- The timestamp is converted to your Home Assistant time zone by default. Pass `false` as the second argument to format in UTC instead.
- Without a `default`, the filter raises an error for non-numeric inputs. Provide one to keep templates from breaking on unavailable sensors.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Format last changed time

Convert an entity's last changed time to a UNIX timestamp with [`as_timestamp`](/template-functions/as_timestamp/) and then format it.

{% example %}
template: |
  {{
    as_timestamp(states.sensor.temperature.last_changed)
    | timestamp_custom("%H:%M")
  }}
type: string
output: "14:30"
{% endexample %}

### Display a full date and time

Format a timestamp as a complete, human-readable date and time string.

{% example %}
template: '{{ as_timestamp(now()) | timestamp_custom("%A, %B %d at %H:%M") }}'
type: string
output: "Friday, March 15 at 14:30"
{% endexample %}

### Using a default value

If a sensor might provide an invalid timestamp, use a default to avoid errors.

{% example %}
template: |
  {{
    states("sensor.last_event") | float(0)
    | timestamp_custom("%Y-%m-%d", default="unknown")
  }}
type: string
output: "2024-03-15"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
