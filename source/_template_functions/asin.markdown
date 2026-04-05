---
title: "Arc sine (inverse sine): asin"
function_name: "asin"
description: "Returns the arc sine (inverse sine) of a value, in radians."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "0.117"
related_functions:
  - sin
  - acos
  - atan
  - atan2
---

The `asin` template function returns the arc sine (inverse sine) of a value. The result is in radians, in the range [-pi/2, pi/2]. The input must be between -1 and 1.

This is useful when you need to convert a ratio back into an angle. For example, given a normalized {% term sensor %} reading you could recover the original angle used to produce it.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ asin(1) }}'
type: float
output: "1.5707963267948966"

---
filter: '{{ 1 | asin }}'
type: float
output: "1.5707963267948966"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
asin(
    value: Any,
    default: Any = None,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to calculate the arc sine of. Must be numeric and between -1 and 1.
  required: true
  type: float
default:
  description: >
    Value to return if the calculation fails (for example, if the input is out of range or not numeric). If not provided, an error is raised instead.
  required: false
  type: any
{% endfunction_parameters %}

## Good to know

- Inputs outside the range -1 to 1 raise an error unless you supply a default.
- The result is in radians. Multiply by `180 / pi` to convert to degrees.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Using a default value

If the input might be out of range or non-numeric, provide a default to avoid errors. This keeps your {% term template %} from breaking when a {% term sensor %} is temporarily unavailable.

{% example %}
template: '{{ asin(states("sensor.ratio"), default=0) }}'
type: float
output: "0"
{% endexample %}

### Convert arc sine to degrees

Convert the result from radians to degrees to make it more readable.

{% example %}
template: '{{ (asin(0.5) * 180 / pi) | round(1) }}'
type: float
output: "30.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
