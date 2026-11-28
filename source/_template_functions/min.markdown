---
title: "Minimum value: min"
function_name: "min"
description: "Returns the smallest value from a list of values."
available_as:
  - function
  - filter
category: math
return_type: any
limited: true
since: "0.117"
related_functions:
  - max
  - average
  - median
  - clamp
  - expand
---

The `min` template function returns the smallest value from a collection. The `min` filter comes from Jinja. Home Assistant adds a `min` function that wraps this filter. With the function, you can pass values as a list or as separate arguments.

This is useful whenever you need to find the lowest reading among multiple {% term sensors %}. For example, you might want to find the coldest room in your house, the lowest battery level across all your {% term devices %}, or the minimum energy usage in a set of readings. You can also use it with [`expand`](/template-functions/expand/) to work with groups of entities.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ min(21.5, 22.0, 19.8) }}'
type: float
output: "19.8"

---
filter: '{{ [21.5, 22.0, 19.8] | min }}'
type: float
output: "19.8"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
min(
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
    The values to find the minimum of. Can be a list or multiple separate arguments.
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

- With one argument, the argument must be a list or another iterable. With two or more arguments, `min` compares the arguments directly.
- The result has the same type as the items. For example, a list of numbers returns a number.
- An empty list returns an undefined value. The output is empty, and Home Assistant logs a warning. Calling `min()` without arguments raises an error.
- Strings are compared as text, not as numbers. For example, `min("9", "21")` returns `"21"`. Convert state strings with [`float`](/template-functions/float/) first.
- Text comparison ignores case by default. Set `case_sensitive=true` to compare uppercase and lowercase letters as different.
- Mixing strings and numbers in the input raises an error. Convert state strings with [`float`](/template-functions/float/) first.
- You can use `min` as a filter directly after [`map`](/template-functions/map/). You don't need to add [`| list`](/template-functions/list/) first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Minimum sensor value

Find the lowest temperature across multiple rooms.

{% example %}
template: |
  {{
    min(
      states("sensor.living_room_temperature") | float,
      states("sensor.bedroom_temperature") | float,
      states("sensor.kitchen_temperature") | float
    )
  }}
type: float
output: "19.8"
{% endexample %}

### Minimum from a list

Pass a list directly to the function.

{% example %}
template: |
  {{ min([21.5, 22.0, 19.8]) }}
type: float
output: "19.8"
{% endexample %}

### Minimum across a group of entities

If you have a {% term group %} of sensors, expand the group and find the smallest value.

{% example %}
template: |
  {{
    expand("sensor.indoor_temperatures")
    | map(attribute="state")
    | map("float")
    | min
  }}
type: float
output: "19.8"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
