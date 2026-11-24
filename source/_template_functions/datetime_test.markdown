---
title: "Test if datetime: datetime"
function_name: "datetime"
description: "Tests whether a value is a datetime."
available_as:
  - test
category: datetime
return_type: boolean
limited: true
since: "2023.11"
related_functions:
  - as_datetime
  - as_local
  - now
  - typeof
---

The `datetime` test checks whether a value is a datetime object, a specific moment in time with a date and a time. It returns `true` for datetime objects and `false` for everything else, including date-and-time strings, UNIX timestamps, and date-only values.

Many sensors and attributes provide dates and times as plain text or numbers. This test lets you check whether a value is already a datetime before you compare it, calculate with it, or convert it with [`as_datetime`](https://www.home-assistant.io/template-functions/as_datetime/).

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if now() is datetime %}
    It is a datetime
  {% endif %}
type: string
output: "It is a datetime"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
datetime(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is a datetime.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Only real datetime objects pass. Strings like `"2024-03-15T14:30:00+01:00"`, UNIX timestamps, and date-only values do not.
- Datetimes with and without a time zone both pass.
- To convert a string or a UNIX timestamp, use [`as_datetime`](https://www.home-assistant.io/template-functions/as_datetime/). It returns `None` for invalid text, and `None` does not pass this test.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distinguish a datetime from other values

Check whether a value is a datetime rather than a string or a number.

{% example %}
template: |
  {{ now() is datetime }}
  {{ "2024-03-15T14:30:00+01:00" is datetime }}
  {{ as_datetime("2024-03-15T14:30:00+01:00") is datetime }}
  {{ 1710510600 is datetime }}
type: boolean
output: |
  true
  false
  true
  false
{% endexample %}

### Convert to a datetime only when needed

Convert a value with `as_datetime` only if it is not already a datetime.

{% example %}
template: |
  {% set value = "2024-03-15T14:30:00+01:00" %}
  {% set moment = value if value is datetime else as_datetime(value) %}
  {{ moment }}
type: datetime
output: "2024-03-15 14:30:00+01:00"
{% endexample %}

### Check that a conversion worked

`as_datetime` returns `None` for text it cannot parse, so test the result before you use it.

{% example %}
template: |
  {% set moment = as_datetime("not a date") %}
  {% if moment is datetime %}
    Year: {{ moment.year }}
  {% else %}
    Not a valid date
  {% endif %}
type: string
output: "Not a valid date"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
