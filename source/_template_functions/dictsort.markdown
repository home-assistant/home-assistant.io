---
title: "Sort a dictionary: dictsort"
function_name: "dictsort"
description: "Sorts a dictionary by its keys or values, returning a list of key/value pairs."
available_as:
  - filter
category: collection
return_type: list
limited: true
since: "0.7"
related_functions:
  - sort
  - items
  - groupby
---

The `dictsort` filter sorts a dictionary and returns a list of `(key, value)` tuples in the sorted order. By default, it sorts by key in ascending order, but you can sort by value instead, control case sensitivity, and reverse the sort direction.

This is useful when you want to display or process dictionary data in a predictable order. For example, you might have a dictionary of {% term entity %} attributes and want to display them sorted alphabetically by name, or you might want to sort a mapping of room names to temperatures so the warmest room appears first.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ {"b": 2, "a": 1, "c": 3} | dictsort }}'
type: list
output: "[('a', 1), ('b', 2), ('c', 3)]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
dictsort(
    value: dict,
    case_sensitive: bool = False,
    by: str = "key",
    reverse: bool = False,
) -> list[tuple]
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The dictionary to sort.
  required: true
  type: map
case_sensitive:
  description: >
    Whether the sort should be case-sensitive. Defaults to `false`, meaning uppercase and lowercase letters are treated as equal.
  required: false
  default: "false"
  type: boolean
by:
  description: >
    Whether to sort by `key` or `value`. Defaults to `key`.
  required: false
  default: '"key"'
  type: string
reverse:
  description: >
    If `true`, sorts in descending order. Defaults to `false`.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Sort by value

Sort dictionary entries by their values instead of keys.

{% example %}
template: |
  {{
    {"kitchen": 22.5, "bedroom": 19.8, "living_room": 21.3}
    | dictsort(by="value")
  }}
type: list
output: "[('bedroom', 19.8), ('living_room', 21.3), ('kitchen', 22.5)]"
{% endexample %}

## Reverse sort order

Sort in descending order to see the highest values first.

{% example %}
template: |
  {{
    {"kitchen": 22.5, "bedroom": 19.8, "living_room": 21.3}
    | dictsort(by="value", reverse=true)
  }}
type: list
output: "[('kitchen', 22.5), ('living_room', 21.3), ('bedroom', 19.8)]"
{% endexample %}

## Good to know

- Returns a list of `(key, value)` tuples, not a dictionary. Access items with `result[0][0]` for the first key.
- Case-insensitive by default, which differs from [`sort`](/template-functions/sort/). Pass `case_sensitive=true` to match exact case.
- Sorting mixed-type values (strings and numbers together) raises an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display sorted entity attributes

Sort and display all attributes of a sensor in alphabetical order.

{% example %}
template: |
  {% for key, value in state_attr("sensor.weather", "forecast")[0] | dictsort %}
    {{ key }}: {{ value }}
  {% endfor %}
type: string
output: |
  condition: sunny
  temperature: 24
  wind_speed: 12
{% endexample %}

### Find the warmest room

Sort a temperature mapping by value in descending order and pick the first entry.

{% example %}
template: |
  {% set temps = {"Kitchen": 22.5, "Bedroom": 19.8, "Living room": 21.3} %}
  {% set sorted = temps | dictsort(by="value", reverse=true) %}
  The warmest room is {{ sorted[0][0] }} at {{ sorted[0][1] }}°C
type: string
output: "The warmest room is Kitchen at 22.5°C"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
