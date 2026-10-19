---
title: "Maximum value: max"
function_name: "max"
description: "Returns the largest value from a list of values."
available_as:
  - function
category: math
return_type: float
limited: true
since: "0.117"
related_functions:
  - min
  - average
  - median
  - clamp
  - expand
---

The `max` template function returns the largest value from a collection. This is a Home Assistant override of the built-in `max` filter that also works as a function, allowing you to pass values either as a list or as separate arguments.

This is useful whenever you need to find the highest reading among multiple {% term sensors %}. For example, you might want to find the warmest room in your house, the highest power consumption across all your {% term devices %}, or the peak value in a set of readings. You can also use it with [`expand`](/template-functions/expand/) to work with groups of entities.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ max(21.5, 22.0, 19.8) }}'
type: float
output: "22.0"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
max(
    *args: list | float,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
values:
  description: >
    The values to find the maximum of. Can be a list or multiple separate arguments.
  required: true
  type: list
{% endfunction_parameters %}

## Good to know

- An empty list raises an error, so convert or filter out missing sensors first.
- Mixing strings and numbers in the input raises an error. Convert state strings with [`float`](/template-functions/float/) first.
- After a generator-producing filter like [`map`](/template-functions/map/), add [`| list`](/template-functions/list/) before using `max` as a filter.

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
    | list
    | max
  }}
type: float
output: "22.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
