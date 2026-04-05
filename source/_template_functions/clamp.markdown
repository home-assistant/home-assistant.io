---
title: "Clamp (constrain) a value: clamp"
function_name: "clamp"
description: "Constrains a value between a minimum and maximum bound."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "2025.4"
related_functions:
  - wrap
  - remap
  - min
  - max
---

The `clamp` template function constrains a value to lie within a given range. If the value is below the minimum it returns the minimum; if it is above the maximum it returns the maximum; otherwise it returns the value unchanged. The range is inclusive on both ends.

This is useful whenever you need to ensure a {% term sensor %} value stays within safe bounds before using it in an {% term automation %}. For example, you could clamp a brightness percentage to a range your light supports, limit a thermostat setpoint to a safe temperature range, or ensure a volume level never exceeds a certain maximum.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ clamp(150, 0, 100) }}'
type: float
output: "100.0"

---
filter: '{{ 150 | clamp(0, 100) }}'
type: float
output: "100.0"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
clamp(
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
    The value to constrain. Must be numeric.
  required: true
  type: float
min_value:
  description: >
    The minimum allowed value (inclusive lower bound). Must be numeric.
  required: true
  type: float
max_value:
  description: >
    The maximum allowed value (inclusive upper bound). Must be numeric.
  required: true
  type: float
{% endfunction_parameters %}

## Good to know

- Both bounds are inclusive, so a value equal to the minimum or maximum is returned unchanged.
- The result is always a float, even when all inputs are integers.
- If `min_value` is greater than `max_value`, the result will always be `min_value`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Limiting a thermostat setpoint

Ensure a calculated setpoint stays within a safe range.

{% example %}
template: |
  {% set desired = states("sensor.target_temperature") | float %}
  {{ clamp(desired, 16, 28) }}
type: float
output: "22.0"
{% endexample %}

### Clamping brightness

Keep a brightness value within the 0-255 range that a light expects.

{% example %}
template: |
  {% set raw = states("sensor.ambient_light") | float * 2.5 %}
  {{ clamp(raw, 0, 255) }}
type: float
output: "255.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
