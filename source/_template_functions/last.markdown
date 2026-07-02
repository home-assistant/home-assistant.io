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

- Raises an error when the sequence is empty. Chain with [`| default(value)`](/template-functions/default/) for a fallback.
- After a generator-producing filter like [`select`](/template-functions/select/) or [`map`](/template-functions/map/), add [`| list`](/template-functions/list/) first. Otherwise the entire sequence is consumed just to find the end.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Get the entity with the highest temperature

Sort temperature sensors in ascending order and pick the last (highest) one.

{% example %}
template: |
  {{
    expand("group.temperature_sensors")
    | sort(attribute="state")
    | map(attribute="entity_id")
    | last
  }}
type: string
output: "sensor.kitchen_temperature"
{% endexample %}

### Get the most recently changed entity

Sort entities by their last changed time and pick the last one.

{% example %}
template: |
  {{
    expand("group.home_lights")
    | sort(attribute="last_changed")
    | map(attribute="entity_id")
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
