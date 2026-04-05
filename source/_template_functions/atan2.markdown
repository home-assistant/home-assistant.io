---
title: "Four-quadrant arc tangent: atan2"
function_name: "atan2"
description: "Returns the four-quadrant arc tangent of y/x, in radians."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "0.117"
related_functions:
  - atan
  - sin
  - cos
  - tan
---

The `atan2` template function returns the four-quadrant arc tangent of y/x in radians. Unlike [`atan`](/template-functions/atan/), which takes a single ratio, `atan2` takes two separate values (y and x) and correctly determines the angle in all four quadrants. The result is in the range [-pi, pi].

This is useful when you need to compute a true bearing or direction angle from two coordinate components. For example, you could calculate the angle to a point on a map, or determine wind direction from separate north-south and east-west wind speed {% term sensors %}.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ atan2(1, 1) }}'
type: float
output: "0.7853981633974483"

---
filter: '{{ (1, 1) | atan2 }}'
type: float
output: "0.7853981633974483"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
atan2(
    y: Any,
    x: Any,
    default: Any = None,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
y:
  description: >
    The y-coordinate (vertical component). Must be numeric.
  required: true
  type: float
x:
  description: >
    The x-coordinate (horizontal component). Must be numeric.
  required: true
  type: float
default:
  description: >
    Value to return if the calculation fails (for example, if either input is not numeric). If not provided, an error is raised instead.
  required: false
  type: any
{% endfunction_parameters %}

## Using a default value

If either input might not be numeric, provide a default to avoid errors. This keeps your {% term template %} from breaking when a sensor is temporarily unavailable.

{% example %}
template: |
  {{
    atan2(
      states("sensor.wind_ns") | float(0),
      states("sensor.wind_ew") | float(0),
      default=0
    )
  }}
type: float
output: "0"
{% endexample %}

## Good to know

- The argument order is `y, x`, not `x, y`. Swapping them flips your angle.
- The result is in radians and covers all four quadrants, unlike [`atan`](/template-functions/atan/).
- When `x` and `y` are both zero, the result is `0.0`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Passing values as a list

You can also pass the y and x values as a list or tuple, which is convenient when working with coordinate pairs.

{% example %}
template: |
  {{ atan2([1, 0]) }}
type: float
output: "1.5707963267948966"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
