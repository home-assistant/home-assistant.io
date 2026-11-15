---
title: "Get last item: last"
function_name: "last"
description: "Returns the last item of a list or the last character of a string."
available_as:
  - filter
category: collection
return_type: any
limited: true
since: "0.7"
related_functions:
  - first
  - sort
  - select
---

The `last` filter returns the last item of a list or the last character of a string. It provides a clean, readable way to access the end of a sequence.

This is commonly used to get the final result from a sorted or filtered list. For example, after sorting {% term sensors %} by their state value, `last` gives you the highest reading. After filtering a list of recent events, `last` gives you the most recent one. It pairs naturally with [`first`](/template-functions/first/) to access both ends of a sequence.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ [10, 20, 30] | last }}'
type: integer
output: "30"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
last(
    value: list,
) -> Any
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list or string to get the last item from. Must be a non-empty sequence.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- If the sequence is empty, the result is undefined. It shows as empty, and the template editor shows a warning. If the template uses that result further, for example, in `(items | last).name`, you get an error. Chain with [`| default(value)`](/template-functions/default/) for a fallback.
- Filters like [`select`](/template-functions/select/) and [`map`](/template-functions/map/) return a generator. `last` can't read a generator from the end, so it causes an error. Add [`| list`](/template-functions/list/) before `last`.
- A number causes an error. A string returns its last character.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Get the highest temperature

Keep the states of temperature sensors that are numbers, convert them, sort them in ascending order, and pick the last (highest) one.

{% example %}
template: |
  {{
    expand("sensor.temperature_sensors")
    | map(attribute="state")
    | select("is_number")
    | map("float")
    | sort
    | last
  }}
type: float
output: "23.5"
{% endexample %}

### Get the most recently changed entity

Sort entities by their last changed time and pick the last one.

{% example %}
template: |
  {{
    expand("light.home_lights")
    | sort(attribute="last_changed")
    | map(attribute="entity_id")
    | list
    | last
  }}
type: string
output: "light.bedroom"
{% endexample %}

### Last character of a string

The `last` filter also works on strings, returning the last character.

{% example %}
template: '{{ "Hello" | last }}'
type: string
output: "o"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
