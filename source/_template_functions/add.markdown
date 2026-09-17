---
title: "Add to a value: add"
function_name: "add"
description: "Adds a specified amount to a numeric value, with an optional default if conversion fails."
available_as:
  - filter
category: type
return_type: float
limited: true
since: "2023.1"
related_functions:
  - multiply
  - float
  - int
  - round
---

The `add` filter converts a value to a float and adds a specified amount to it. If the value cannot be converted to a number, it returns the default you provide instead of raising an error.

This is a convenient shorthand for arithmetic on {% term sensor %} values. Instead of converting to a float first and then adding, you can do it in a single step. It is especially useful when you need to apply a fixed offset to a reading, such as adjusting a temperature sensor by a calibration value, adding a base cost to a calculated price, or shifting a time value. For multiplication, see [`multiply`](/template-functions/multiply/).

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ states("sensor.temperature") | add(2.5) }}'
type: float
output: "24.0"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
add(
    value: Any,
    amount: float,
    default: Any = _SENTINEL,
) -> float | Any
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The value to convert to a float and add to. Must be a number or a string that can be converted to a float.
  required: true
  type: any
amount:
  description: >
    The amount to add to the value. Can be negative to subtract.
  required: true
  type: float
default:
  description: >
    Value to return if the conversion fails. If not provided, an error is raised on invalid input.
  required: false
  type: any
{% endfunction_parameters %}

## Subtracting values

To subtract, pass a negative amount.

{% example %}
template: '{{ states("sensor.temperature") | add(-5) }}'
title: Subtract 5 from a value
type: float
output: "16.5"
{% endexample %}

## Using a default value

If the sensor might be unavailable, provide a default to prevent errors.

{% example %}
template: '{{ states("sensor.temperature") | add(2.5, default=0) }}'
title: Safe addition with default
type: float
output: "24.0"
{% endexample %}

## Good to know

- There is no subtract filter. Pass a negative amount to subtract.
- The result is always a float, even when both inputs are integers.
- Without a default, a non-numeric input raises an error. Always pass a default when working with state values.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Apply a calibration offset

Correct a temperature sensor reading by a known offset.

{% example %}
template: '{{ states("sensor.outdoor_temperature") | add(-1.2) | round(1) }}'
title: Apply a -1.2 degree calibration offset
type: float
output: "17.1"
{% endexample %}

### Calculate a total with a base fee

Add a fixed base cost to a calculated usage charge.

{% example %}
template: |
  {{
    (states("sensor.energy_today") | float(0) * 0.25)
    | add(5.0) | round(2)
  }}
title: Energy cost with a base fee
type: float
output: "8.47"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
