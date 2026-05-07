---
title: "Square root: sqrt"
function_name: "sqrt"
description: "Returns the square root of a value."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "0.117"
related_functions:
  - log
  - e
  - pi
---

The `sqrt` template function returns the square root of a value. It wraps Python's `math.sqrt`, so the input must be a non-negative number.

This is useful for distance calculations, root-mean-square computations, or any {% term template %} where you need to take the square root of a {% term sensor %} value. For example, you could calculate the Euclidean distance between two points or convert power readings.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ sqrt(16) }}'
type: float
output: "4.0"

---
filter: '{{ 16 | sqrt }}'
type: float
output: "4.0"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
sqrt(
    value: Any,
    default: Any = None,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to calculate the square root of. Must be a non-negative number.
  required: true
  type: float
default:
  description: >
    Value to return if the calculation fails (for example, if the input is negative or not numeric). If not provided, an error is raised instead.
  required: false
  type: any
{% endfunction_parameters %}

## Using a default value

If the input value might be negative or non-numeric, provide a default to avoid errors. This keeps your {% term template %} from breaking when a sensor is temporarily unavailable.

{% example %}
template: |
  {{ sqrt(states("sensor.area") | float(-1), default=0) }}
type: float
output: "0"
{% endexample %}

## Good to know

- Negative inputs raise an error unless you supply a default.
- The result is always a float, even when the input is a perfect square.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distance calculation

Calculate the straight-line distance between two points using the Pythagorean theorem.

{% example %}
template: |
  {% set dx = 3 %}
  {% set dy = 4 %}
  {{ sqrt(dx**2 + dy**2) }}
type: float
output: "5.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
