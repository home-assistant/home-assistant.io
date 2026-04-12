---
title: "Arc tangent (inverse tangent): atan"
function_name: "atan"
description: "Returns the arc tangent (inverse tangent) of a value, in radians."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "0.117"
related_functions:
  - tan
  - asin
  - acos
  - atan2
---

The `atan` template function returns the arc tangent (inverse tangent) of a value. The result is in radians, in the range [-pi/2, pi/2]. Unlike [`atan2`](/template-functions/atan2/), this function takes a single value and cannot distinguish between quadrants.

This is useful for converting a slope or ratio back into an angle, for example when calculating an incline angle from rise-over-run {% term sensor %} data.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ atan(1) }}'
type: float
output: "0.7853981633974483"

---
filter: '{{ 1 | atan }}'
type: float
output: "0.7853981633974483"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
atan(
    value: Any,
    default: Any = None,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to calculate the arc tangent of. Must be numeric.
  required: true
  type: float
default:
  description: >
    Value to return if the calculation fails (for example, if the input is not numeric). If not provided, an error is raised instead.
  required: false
  type: any
{% endfunction_parameters %}

## Good to know

- Cannot tell quadrants apart because the sign information is lost. Use [`atan2`](/template-functions/atan2/) when you need the correct angle in all four quadrants.
- The result is in radians. Multiply by `180 / pi` to convert to degrees.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Using a default value

If the input might not be numeric, provide a default to avoid errors. This keeps your {% term template %} from breaking when a {% term sensor %} is temporarily unavailable.

{% example %}
template: '{{ atan(states("sensor.slope"), default=0) }}'
type: float
output: "0"
{% endexample %}

### Convert arc tangent to degrees

Turn a slope ratio (rise over run) into an angle in degrees.

{% example %}
template: '{{ (atan(1) * 180 / pi) | round(1) }}'
type: float
output: "45.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
