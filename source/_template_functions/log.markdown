---
title: "Logarithm: log"
function_name: "log"
description: "Returns the logarithm of a value with an optional base (default is natural logarithm)."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "0.117"
related_functions:
  - e
  - sqrt
---

The `log` template function returns the logarithm of a value. By default it computes the natural logarithm (base e). You can specify a different base, such as 10 for common logarithm or 2 for binary logarithm.

This is useful for scaling {% term sensor %} data that spans a wide range into something more manageable. For example, sound level sensors often benefit from logarithmic scaling, or you might use a log scale to visualize energy consumption data that varies by orders of magnitude.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ log(10, 10) }}'
type: float
output: "1.0"

---
filter: '{{ 100 | log(10) }}'
type: float
output: "2.0"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
log(
    value: Any,
    base: Any = e,
    default: Any = None,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to calculate the logarithm of. Must be a positive number.
  required: true
  type: float
base:
  description: >
    The base of the logarithm. Defaults to [`e`](/template-functions/e/) (Euler's number, ~2.718) for the natural logarithm. Use 10 for common logarithm or 2 for binary logarithm.
  required: false
  type: float
default:
  description: >
    Value to return if the calculation fails (for example, if the input is not a positive number). If not provided, an error is raised instead.
  required: false
  type: any
{% endfunction_parameters %}

## Using a default value

If the input value might not be a positive number, provide a default to avoid errors. This keeps your {% term template %} from breaking when a sensor is temporarily unavailable.

{% example %}
template: |
  {{ log(states("sensor.sound_level") | float(0), 10, default=0) }}
type: float
output: "0"
{% endexample %}

## Good to know

- The default base is [`e`](/template-functions/e/), which gives the natural logarithm. Pass `10` for common log or `2` for binary log.
- Zero or negative inputs raise an error unless you supply a default.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Natural logarithm

When no base is specified, the natural logarithm (base [`e`](/template-functions/e/)) is used.

{% example %}
template: |
  {{ log(e) }}
type: float
output: "1.0"
{% endexample %}

### Binary logarithm

Use base 2 for binary logarithm calculations.

{% example %}
template: |
  {{ log(256, 2) }}
type: float
output: "8.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
