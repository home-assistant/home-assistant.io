---
title: "Wrap a value cyclically: wrap"
function_name: "wrap"
description: "Wraps a value cyclically within a range."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "2025.4"
related_functions:
  - clamp
  - remap
---

The `wrap` template function wraps a value cyclically within a given range. When the value goes past the maximum, it wraps back around to the minimum, and vice versa. The minimum is inclusive and the maximum is exclusive, so the result is always in the range [min, max).

This is useful for working with cyclic quantities like angles, hours of the day, or any value that should loop around rather than be clamped. For example, you could wrap a calculated heading to stay within 0-360 degrees, or keep an hour-of-day offset within a 24-hour cycle.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ wrap(370, 0, 360) }}'
type: float
output: "10.0"

---
filter: '{{ 370 | wrap(0, 360) }}'
type: float
output: "10.0"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
wrap(
    value: Any,
    min_value: Any,
    max_value: Any,
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to wrap. Must be numeric.
  required: true
  type: float
min_value:
  description: >
    The minimum of the range (inclusive). Must be numeric.
  required: true
  type: float
max_value:
  description: >
    The maximum of the range (exclusive). Must be numeric and greater than min_value.
  required: true
  type: float
{% endfunction_parameters %}

## Good to know

- The result is always a float, even when all inputs are integers.
- The range is half-open: `min_value` is included, `max_value` is not. Wrapping a value equal to `max_value` returns `min_value`.
- Unlike [`clamp`](/template-functions/clamp/), out-of-range values cycle around instead of being pinned to the nearest edge.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Wrapping a compass heading

Keep a calculated compass heading within the standard 0-360 degree range.

{% example %}
template: |
  {% set heading = states("sensor.wind_direction") | float + 45 %}
  {{ wrap(heading, 0, 360) }}
type: float
output: "35.0"
{% endexample %}

### Wrapping negative values

Values below the minimum wrap back from the maximum end.

{% example %}
template: |
  {{ wrap(-10, 0, 360) }}
type: float
output: "350.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
