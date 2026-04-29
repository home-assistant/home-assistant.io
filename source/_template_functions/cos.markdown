---
title: "Cosine: cos"
function_name: "cos"
description: "Returns the cosine of a value given in radians."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "0.117"
related_functions:
  - sin
  - tan
  - asin
  - acos
  - atan
  - atan2
---

The `cos` template function returns the cosine of a value given in radians. It wraps Python's `math.cos`, so the input is expected to be an angle measured in radians rather than degrees.

This is useful for trigonometric calculations based on {% term sensor %} data, such as computing horizontal distance from an angle, projecting solar elevation into usable values, or creating smooth cyclic patterns in {% term automations %}.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ cos(0) }}'
type: float
output: "1.0"

---
filter: '{{ 0 | cos }}'
type: float
output: "1.0"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
cos(
    value: Any,
    default: Any = None,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The angle in radians to calculate the cosine of. Must be numeric.
  required: true
  type: float
default:
  description: >
    Value to return if the calculation fails (for example, if the input is not numeric). If not provided, an error is raised instead.
  required: false
  type: any
{% endfunction_parameters %}

## Using a default value

If the input value might not be numeric, provide a default to avoid errors. This keeps your {% term template %} from breaking when a sensor is temporarily unavailable.

{% example %}
template: |
  {{ cos(states("sensor.angle"), default=1) }}
type: float
output: "1"
{% endexample %}

## Good to know

- The input must be in radians, not degrees. Multiply by `pi / 180` to convert degrees to radians.
- Due to floating-point precision, `cos(pi / 2)` returns a very small number instead of exactly zero.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Cosine of a known angle

Calculate the cosine of 60 degrees by first converting to radians.

{% example %}
template: |
  {{ cos(60 * (pi / 180)) }}
type: float
output: "0.5"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
