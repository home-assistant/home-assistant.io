---
title: "Tangent: tan"
function_name: "tan"
description: "Returns the tangent of a value given in radians."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "0.117"
related_functions:
  - sin
  - cos
  - asin
  - acos
  - atan
  - atan2
---

The `tan` template function returns the tangent of a value given in radians. It wraps Python's `math.tan`, so the input is expected to be an angle measured in radians rather than degrees.

This can be useful in calculations involving slopes, gradients, or angles derived from {% term sensor %} data. For example, you might use it to calculate a projected shadow length from a solar elevation angle.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ tan(0.7854) }}'
type: float
output: "1.0"

---
filter: '{{ 0.7854 | tan }}'
type: float
output: "1.0"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
tan(
    value: Any,
    default: Any = None,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The angle in radians to calculate the tangent of. Must be numeric.
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
  {{ tan(states("sensor.slope_angle"), default=0) }}
type: float
output: "0"
{% endexample %}

## Good to know

- The input is expected in radians, not degrees. Multiply degree values by `pi / 180` before passing them in.
- Tangent is undefined at 90, 270 degrees (and so on). Inputs near these angles return very large numbers due to floating-point behavior.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Tangent of a known angle

Calculate the tangent of 45 degrees by first converting to radians.

{% example %}
template: |
  {{ tan(45 * (pi / 180)) }}
type: float
output: "1.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
