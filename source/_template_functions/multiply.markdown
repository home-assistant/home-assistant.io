---
title: "Multiply a value: multiply"
function_name: "multiply"
description: "Multiplies a numeric value by a specified amount, with an optional default if conversion fails."
available_as:
  - filter
category: type
return_type: float
limited: true
since: "2023.1"
related_functions:
  - add
  - float
  - int
  - round
---

The `multiply` filter converts a value to a float and multiplies it by a specified amount. If the value cannot be converted to a number, it returns the default you provide instead of raising an error.

This is a convenient shorthand for scaling {% term sensor %} values. Instead of converting to a float first and then multiplying, you can do it in a single step. Common uses include converting units (watts to kilowatts, Celsius to Fahrenheit), applying a cost rate to an energy reading, or scaling a percentage to a different range. For addition, see [`add`](/template-functions/add/).

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ states("sensor.power_watts") | multiply(0.001) }}'
type: float
output: "1.5"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
multiply(
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
    The value to convert to a float and multiply. Must be a number or a string that can be converted to a float.
  required: true
  type: any
amount:
  description: >
    The amount to multiply the value by.
  required: true
  type: float
default:
  description: >
    Value to return if the conversion fails. If not provided, an error is raised on invalid input.
  required: false
  type: any
{% endfunction_parameters %}

## Using a default value

If the sensor might be unavailable, provide a default to prevent errors.

{% example %}
template: '{{ states("sensor.power_watts") | multiply(0.001, default=0) }}'
title: Safe multiplication with default
type: float
output: "1.5"
{% endexample %}

## Good to know

- There is no division filter. Pass a fractional amount, like `0.001` to divide by 1000.
- The result is always a float, even when both inputs are integers.
- Without a default, non-numeric input raises an error. Always pass a default when working with state values.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Convert watts to kilowatts

Scale a power reading from watts to kilowatts for cleaner display.

{% example %}
template: '{{ states("sensor.power_usage") | multiply(0.001) | round(2) }}'
type: float
output: "1.50"
{% endexample %}

### Calculate energy cost

Multiply today's energy consumption by the price per kWh.

{% example %}
template: '{{ states("sensor.energy_today") | multiply(0.25) | round(2) }}'
title: Energy cost at 0.25 per kWh
type: float
output: "3.47"
{% endexample %}

### Scale a percentage to a brightness value

Convert a 0-100 percentage to a 0-255 brightness scale for a light.

{% example %}
action: |
  action:
    - action: light.turn_on
      target:
        entity_id: light.desk_lamp
      data:
        brightness: >
          {{ states("sensor.ambient_light_pct") | multiply(2.55) | int(128) }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
