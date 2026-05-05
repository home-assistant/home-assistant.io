---
title: "Parse a time string: strptime"
function_name: "strptime"
description: "Parses a time string with a specified format into a datetime object."
available_as:
  - function
category: datetime
return_type: datetime
limited: true
since: "0.7"
related_functions:
  - as_datetime
  - as_timestamp
  - now
  - timestamp_custom
---

The `strptime` template function parses a date/time string according to a format you specify and returns a {% term datetime %} object. Give it a string like "15/03/2024 14:30" along with the matching format "%d/%m/%Y %H:%M", and it converts the text into a proper datetime you can work with.

While [`as_datetime`](/template-functions/as_datetime/) handles ISO 8601 formatted strings automatically, many {% term sensors %} and external data sources provide dates in non-standard formats. A weather service might return "March 15, 2024", a calendar integration might give you "15/03/2024", or a custom sensor might report "2024.03.15 14:30". `strptime` lets you parse any date format by telling it exactly how the string is structured. The format codes follow Python's strftime/strptime conventions.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ strptime("15/03/2024 14:30", "%d/%m/%Y %H:%M") }}'
type: datetime
output: "2024-03-15 14:30:00"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
strptime(
    string: str,
    format: str,
    default: Any = None,
) -> datetime | Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
string:
  description: The date/time string to parse.
  required: true
  type: string
format:
  description: >
    The format string describing the structure of the date/time string. Uses Python strftime format codes such as `%Y` (year), `%m` (month), `%d` (day), `%H` (hour), `%M` (minute), `%S` (second).
  required: true
  type: string
default:
  description: >
    Value to return if the string cannot be parsed with the given format. If not provided, an error is raised on invalid input.
  required: false
  type: any
{% endfunction_parameters %}

## Common format codes

Here are the most frequently used format codes and what each one stands for:

- `%Y`: four-digit year (for example, `2024`)
- `%m`: zero-padded month (for example, `03`)
- `%d`: zero-padded day (for example, `15`)
- `%H`: hour in 24-hour format (for example, `14`)
- `%M`: minute (for example, `30`)
- `%S`: second (for example, `00`)
- `%B`: full month name (for example, `March`)
- `%A`: full weekday name (for example, `Friday`)
- `%I`: hour in 12-hour format (for example, `02`)
- `%p`: AM or PM

## Using a default value

If the string might not match the expected format, provide a default to avoid errors.

{% example %}
template: '{{ strptime("invalid", "%Y-%m-%d", default="unknown") }}'
type: string
output: "unknown"
{% endexample %}

## Good to know

- The returned datetime has no time zone attached unless the format string includes one (for example, with `%z`). Compare it to another naive datetime or add a time zone before comparing with [`now`](/template-functions/now/).
- Missing components default to their lowest value. A format that only parses a time gives you a datetime on `1900-01-01`.
- The format string must match the input exactly. Extra spaces, different separators, or a mismatched case for month names causes parsing to fail.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Parse a date with month name

Parse a date string that uses the full month name.

{% example %}
template: '{{ strptime("March 15, 2024", "%B %d, %Y") }}'
type: datetime
output: "2024-03-15 00:00:00"
{% endexample %}

### Parse a 12-hour time format

Parse a time that uses AM/PM notation.

{% example %}
template: '{{ strptime("2:30 PM", "%I:%M %p") }}'
type: datetime
output: "1900-01-01 14:30:00"
{% endexample %}

### Parse and compare with now

Parse a date string from a sensor and check if it is in the past.

{% example %}
template: |
  {% set event_date = strptime(states("sensor.next_event"), "%Y-%m-%d %H:%M") %}
  {{ event_date < now().replace(tzinfo=none) }}
type: boolean
output: "false"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
