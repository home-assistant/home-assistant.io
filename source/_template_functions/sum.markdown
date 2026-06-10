---
title: "Sum values in a list: sum"
function_name: "sum"
description: "Sums all values in a list, with optional attribute extraction and start value."
available_as:
  - filter
category: collection
return_type: number
limited: true
since: "0.7"
related_functions:
  - average
  - min
  - max
  - map
---

The `sum` filter adds up all the values in a list and returns the total. You can optionally specify an `attribute` to sum a specific property from each item, and a `start` value to begin the summation from.

This is useful whenever you need to total up numeric values from {% term sensors %} or {% term entities %}. For example, you might want to calculate total energy consumption across multiple meters, sum up the brightness values of all lights, or add up the number of items detected by multiple sensors. It works well at the end of a filter chain after extracting and converting values to numbers.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ [10, 20, 30] | sum }}'
type: integer
output: "60"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
sum(
    value: list,
    attribute: str | None = None,
    start: int | float = 0,
) -> int | float
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list of values to sum. Items should be numeric.
  required: true
  type: list
attribute:
  description: >
    If provided, this attribute is extracted from each item and summed. Useful for summing a property from a list of objects without needing a separate [`map`](/template-functions/map/) call.
  required: false
  type: string
start:
  description: >
    A starting value for the sum. Defaults to `0`.
  required: false
  default: "0"
  type: float
{% endfunction_parameters %}

## Good to know

- An empty list returns `0` (or the `start` value if you provided one) rather than raising an error.
- Every item in the list needs to be numeric. If states or attributes might be strings, pipe them through `map("float")` or `map("int")` first.

## Sum with attribute

Instead of using `map(attribute=...)` followed by `sum`, you can pass the attribute name directly to `sum`.

{% example %}
template: |
  {% set items = [{"name": "a", "value": 10}, {"name": "b", "value": 20}] %}
  {{ items | sum(attribute="value") }}
type: integer
output: "30"
{% endexample %}

## Sum with a start value

Use the `start` parameter to add an offset to the total.

{% example %}
template: '{{ [10, 20, 30] | sum(start=100) }}'
type: integer
output: "160"
{% endexample %}

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Total energy consumption across meters

Sum the state values from multiple energy sensors.

{% example %}
template: |
  {{
    expand("group.energy_meters")
    | map(attribute="state")
    | map("float")
    | sum
    | round(2)
  }}
type: float
output: "47.83"
{% endexample %}

### Total brightness of all lights that are on

Sum the brightness attribute across active lights.

{% example %}
template: |
  {{
    expand("group.all_lights")
    | selectattr("state", "eq", "on")
    | map(attribute="attributes.brightness")
    | sum
  }}
type: integer
output: "447"
{% endexample %}

### Calculate total daily cost

Multiply each sensor's consumption by a rate and sum the results.

{% example %}
template: |
  {% set rate = 0.25 %}
  {{
    expand("group.energy_meters")
    | map(attribute="state")
    | map("float")
    | sum
    | multiply(rate)
    | round(2)
  }}
title: Total energy cost
type: float
output: "11.96"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
