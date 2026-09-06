---
title: "Get first item: first"
function_name: "first"
description: "Returns the first item of a list or the first character of a string."
available_as:
  - filter
category: collection
return_type: any
limited: true
since: "0.7"
related_functions:
  - last
  - sort
  - select
---

The `first` filter returns the first item of a list or the first character of a string. It provides a clean, readable way to access the beginning of a sequence.

This is commonly used at the end of a filter chain to pick the top result after sorting, selecting, or otherwise narrowing down a list of {% term entities %}. For example, after sorting temperature {% term sensors %} by value, you can use `first` to grab the coldest reading. After filtering lights by state, use `first` to get the first match. It is one of the most frequently used filters when working with entity collections.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ [10, 20, 30] | first }}'
type: integer
output: "10"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
first(
    value: list,
) -> Any
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list or string to get the first item from. Must be a non-empty sequence.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Raises an error when the sequence is empty. Chain with [`| default(value)`](/template-functions/default/) if emptiness is possible.
- Works on any sequence, including strings (returns the first character) and generators.
- When used after [`selectattr`](/template-functions/selectattr/) or [`select`](/template-functions/select/), add [`| list`](/template-functions/list/) first or the result will only consume part of the iterable.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Get the entity with the lowest temperature

Sort temperature sensors and pick the first (lowest) one.

{% example %}
template: |
  {{
    expand("sensor.temperature_sensors")
    | sort(attribute="state")
    | map(attribute="entity_id")
    | first
  }}
type: string
output: "sensor.bedroom_temperature"
{% endexample %}

### Get the first active light

Find the first light that is currently on.

{% example %}
template: |
  {{
    expand("light.home_lights")
    | selectattr("state", "eq", "on")
    | map(attribute="entity_id")
    | first
  }}
type: string
output: "light.kitchen"
{% endexample %}

### First character of a string

The `first` filter also works on strings, returning the first character.

{% example %}
template: '{{ "Hello" | first }}'
type: string
output: "H"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
