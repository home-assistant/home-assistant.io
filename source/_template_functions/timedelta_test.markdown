---
title: "Test if datetime: timedelta"
function_name: "timedelta"
description: "Tests whether a value is a timedelta."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "2026.12"
related_functions:
  - timedelta
  - as_timedelta
  - timedelta_string
  - typeof
---

The `timedelta` test checks whether a value is a timedelta object, a duration such as 1 hour 30 minutes. It returns `true` for timedelta objects and `false` for everything else, including ISO 8601 duration strings like `"PT10M"` and numbers of seconds.

This is useful when a value might be a duration or might be something else, for example the result of [`as_timedelta`](https://www.home-assistant.io/template-functions/as_timedelta/), which returns `None` for invalid input. Checking the type first lets you avoid template errors when you do duration math or formatting.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if timedelta(hours=1) is timedelta %}
    It is a timedelta
  {% endif %}
type: string
output: "It is a timedelta"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
timedelta(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is a timedelta.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Only real timedelta objects pass. Strings like `"PT10M"`, numbers, and datetimes do not.
- To convert an ISO 8601 duration string first, use [`as_timedelta`](https://www.home-assistant.io/template-functions/as_timedelta/).
- Subtracting two datetimes gives a timedelta.
- `timedelta()` without `is` is the function that creates a duration. See [`timedelta`](https://www.home-assistant.io/template-functions/timedelta/).


{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distinguish a duration from other values

Check whether a value is a string or a numeric type.

{% example %}
template: |
  {{ timedelta(hours=1) is timedelta }}
  {{ "PT10M" is timedelta }}
  {{ as_timedelta("PT10M") is timedelta }}
  {{ now() is timedelta }}
type: boolean
output: |
  true
  false
  true
  false
{% endexample %}

### Guard a duration before formatting it

`as_timedelta` returns `None` for invalid input, so check the type first.

{% example %}
template: |
  {% set duration = as_timedelta("PT90M") %}
  {% if duration is timedelta %}
    {{ duration | timedelta_string(precision=2) }}
  {% endif %}
type: string
output: "1 hour 30 minutes"
{% endexample %}

### Count durations in a mixed list

{% example %}
template: |
  {{ [timedelta(hours=1), "PT10M", 5] | select("timedelta") | list | count }}
type: integer
output: 1
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
