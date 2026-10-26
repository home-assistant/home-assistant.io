---
title: "Maximum value: max"
function_name: "max"
description: "Returns the largest value from a list of values."
available_as:
  - function
  - filter
category: math
return_type: any
limited: true
since: "0.117"
related_functions:
  - min
  - average
  - median
  - clamp
  - expand
---

The `max` template function returns the largest value from a collection. The `max` filter comes from Jinja. Home Assistant adds a `max` function that wraps this filter. With the function, you can pass values as a list or as separate arguments.

This is useful whenever you need to find the highest reading among multiple {% term sensors %}. For example, you might want to find the warmest room in your house, the highest power consumption across all your {% term devices %}, or the peak value in a set of readings. You can also use it with [`expand`](/template-functions/expand/) to work with groups of entities.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ max(21.5, 22.0, 19.8) }}'
type: float
output: "22.0"

---
filter: '{{ [21.5, 22.0, 19.8] | max }}'
type: float
output: "22.0"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
max(
    *args: list | float,
    case_sensitive: bool = False,
    attribute: str | int | None = None,
) -> Any
```

### Function parameters

The following parameters can be provided to this function or filter.

{% function_parameters %}
values:
  description: >
    The values to find the maximum of. Can be a list or multiple separate arguments.
  required: true
  type: list
case_sensitive:
  description: >
    Whether to compare text with case sensitivity. By default, uppercase and lowercase letters count as equal.
  required: false
  type: boolean
  default: "false"
attribute:
  description: >
    The attribute to compare when the values are objects or dictionaries. Supports dotted notation (for example, `attributes.brightness`).
  required: false
  type: string
{% endfunction_parameters %}

## Good to know

- With one argument, the argument must be a list or another iterable. With two or more arguments, `max` compares the arguments directly.
- The result has the same type as the items. For example, a list of numbers returns a number.
- An empty list returns an undefined value. The output is empty, and Home Assistant logs a warning. Calling `max()` without arguments raises an error.
- Strings are compared as text, not as numbers. For example, `max("9", "21")` returns `"9"`. Convert state strings with [`float`](/template-functions/float/) first.
- Text comparison ignores case by default. Set `case_sensitive=true` to compare uppercase and lowercase letters as different.
- Mixing strings and numbers in the input raises an error. Convert state strings with [`float`](/template-functions/float/) first.
- You can use `max` as a filter directly after [`map`](/template-functions/map/). You don't need to add [`| list`](/template-functions/list/) first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Maximum sensor value

Find the highest temperature across multiple rooms.

{% example %}
template: |
  {{
    max(
      states("sensor.living_room_temperature") | float,
      states("sensor.bedroom_temperature") | float,
      states("sensor.kitchen_temperature") | float
    )
  }}
type: float
output: "22.0"
{% endexample %}

### Maximum from a list

Pass a list directly to the function.

{% example %}
template: |
  {{ max([21.5, 22.0, 19.8]) }}
type: float
output: "22.0"
{% endexample %}

### Maximum across a group of entities

If you have a {% term group %} of sensors, expand the group and find the largest value.

{% example %}
template: |
  {{
    expand("sensor.indoor_temperatures")
    | map(attribute="state")
    | map("float")
    | max
  }}
type: float
output: "22.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
