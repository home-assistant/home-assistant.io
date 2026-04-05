---
title: "Sine: sin"
function_name: "sin"
description: "Returns the sine of a value given in radians."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "0.117"
related_functions:
  - cos
  - tan
  - asin
  - acos
  - atan
  - atan2
---

The `sin` template function returns the sine of a value given in radians. It wraps Python's `math.sin`, so the input is expected to be an angle measured in radians rather than degrees.

This is helpful when you need to create smooth cyclic animations, compute positional offsets for {% term automations %}, or perform trigonometric calculations based on {% term sensor %} data such as wind direction or solar elevation.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ sin(1.5708) }}'
type: float
output: "1.0"

---
filter: '{{ 1.5708 | sin }}'
type: float
output: "1.0"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
sin(
    value: Any,
    default: Any = None,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The angle in radians to calculate the sine of. Must be numeric.
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
  {{ sin(states("sensor.wind_direction"), default=0) }}
type: float
output: "0"
{% endexample %}

## Good to know

- The input must be in radians, not degrees. Multiply by `pi / 180` to convert degrees to radians.
- Due to floating-point precision, `sin(pi)` returns a very small number instead of exactly zero.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Sine of a known angle

Calculate the sine of 90 degrees by first converting to radians.

{% example %}
template: |
  {{ sin(90 * (pi / 180)) }}
type: float
output: "1.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
