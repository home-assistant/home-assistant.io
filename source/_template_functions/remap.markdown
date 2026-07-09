---
title: "Remap a value between ranges: remap"
function_name: "remap"
description: "Remaps a value from one numeric range to another, with optional stepping and edge handling."
available_as:
  - function
  - filter
category: math
return_type: float
limited: true
since: "2025.5"
related_functions:
  - clamp
  - wrap
---

The `remap` template function maps a value from one numeric range to another. Give it a value and its original range, plus the target range, and it returns the proportionally mapped result. For example, a value of 50 in the range 0-100 maps to 127.5 in the range 0-255.

This is useful whenever you need to convert a {% term sensor %} reading from one scale to another. For example, you might remap a 0-100% brightness value to the 0-255 range a light expects, convert a temperature from one unit range to another, or map a 0-1023 analog sensor reading to a meaningful percentage. The optional `steps` and `edges` parameters give you fine-grained control over quantization and out-of-bounds behavior.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ remap(50, 0, 100, 0, 255) }}'
type: float
output: "127.5"

---
filter: '{{ 50 | remap(0, 100, 0, 255) }}'
type: float
output: "127.5"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
remap(
    value: Any,
    in_min: Any,
    in_max: Any,
    out_min: Any,
    out_max: Any,
    *,
    steps: int = 0,
    edges: str = "none",
) -> float
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to remap. Must be numeric.
  required: true
  type: float
in_min:
  description: >
    The minimum of the input range. Must be numeric.
  required: true
  type: float
in_max:
  description: >
    The maximum of the input range. Must be numeric.
  required: true
  type: float
out_min:
  description: >
    The minimum of the output range. Must be numeric.
  required: true
  type: float
out_max:
  description: >
    The maximum of the output range. Must be numeric.
  required: true
  type: float
steps:
  description: >
    If greater than 0, quantizes the output into the specified number of discrete steps. For example, `steps=4` divides the output range into 4 equal intervals. Defaults to 0 (continuous output).
  required: false
  type: integer
edges:
  description: >
    Controls how input values outside the input range are handled. Accepts one of four options: `none` (default) performs no special handling, allowing out-of-range values to be extrapolated linearly into the output range. `clamp` constrains out-of-range input values to the nearest boundary before mapping. `wrap` wraps out-of-range input values cyclically within the input range. `mirror` reflects out-of-range input values back into the input range.
  required: false
  type: string
{% endfunction_parameters %}

## Edge handling options

The `edges` parameter determines what happens when the input value falls outside the input range.

- **`none`** (default): Values outside the input range are extrapolated linearly. A value of 120 in a 0-100 input range maps proportionally beyond the output range.
- **`clamp`**: Values are constrained to the input range boundaries before mapping. A value of 120 in a 0-100 input range is treated as 100.
- **`wrap`**: Values wrap cyclically. A value of 120 in a 0-100 input range wraps to 20 before mapping.
- **`mirror`**: Values reflect back into the range. A value of 120 in a 0-100 input range mirrors to 80 before mapping.

{% example %}
template: |
  {{ remap(120, 0, 100, 0, 255, edges="clamp") }}
type: float
output: "255.0"
{% endexample %}

## Using steps for quantized output

The `steps` parameter divides the output into discrete intervals. This is useful when you need the result to snap to specific levels rather than being a continuous value.

{% example %}
template: |
  {{ remap(33, 0, 100, 0, 255, steps=4) }}
type: float
output: "63.75"
{% endexample %}

## Good to know

- By default, out-of-range inputs are extrapolated beyond the output range. Pass `edges="clamp"` to limit the result to the output range.
- The output ranges can go in reverse, which produces an inverted mapping.
- With `steps`, the output is quantized to discrete intervals, which is useful for dimmer steps or discrete sensor levels.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Remapping a sensor percentage to brightness

Convert a 0-100% sensor value to the 0-255 brightness range a light expects.

{% example %}
template: |
  {{
    remap(
      states("sensor.ambient_light_pct") | float,
      0, 100, 0, 255
    )
  }}
type: float
output: "127.5"
{% endexample %}

### Remapping with wrap edge handling

Wrap out-of-range values cyclically. This keeps the output cycling smoothly.

{% example %}
template: |
  {{ remap(450, 0, 360, 0, 100, edges="wrap") }}
type: float
output: "25.0"
{% endexample %}

### Remapping with mirror edge handling

Mirror out-of-range values back into the range for a ping-pong effect.

{% example %}
template: |
  {{ remap(120, 0, 100, 0, 255, edges="mirror") }}
type: float
output: "204.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
