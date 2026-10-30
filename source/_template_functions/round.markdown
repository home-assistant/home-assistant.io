---
title: "Round a number: round"
function_name: "round"
description: "Rounds a numeric value to a specified number of decimal places using various rounding methods."
available_as:
  - filter
category: type
return_type: float
limited: true
since: "0.7"
related_functions:
  - float
  - int
  - multiply
  - add
---

The `round` filter rounds a numeric value to a specified number of decimal places. It is a Home Assistant override of the standard `round` filter that adds support for a `default` parameter and the `half` rounding method. When rounding to zero decimals, it returns an integer instead of a float.

Rounding is essential whenever you display {% term sensor %} values on a dashboard or in a notification. A temperature of `21.456789` is not useful on a dashboard; `21.5` is much better. Similarly, you might want to round energy costs to two decimal places, or display a percentage as a whole number. The `round` filter supports four rounding methods to cover different use cases, from standard rounding to always rounding up or down.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ states("sensor.temperature") | float(0) | round(1) }}'
type: float
output: "21.5"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
round(
    value: Any,
    precision: int = 0,
    method: str = "common",
    default: Any,
) -> float | int | Any
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The value to round. Must be a number or a string that can be converted to a float.
  required: true
  type: any
precision:
  description: >
    The number of decimal places to round to. Defaults to `0`, which returns an integer.
  required: false
  default: "0"
  type: integer
method:
  description: >
    The rounding method to use. One of `common`, `ceil`, `floor`, or `half`. Defaults to `common`.
  required: false
  default: '"common"'
  type: string
default:
  description: >
    The value to return if the conversion fails, such as `0`. If you leave out `default` and the conversion fails, `round` raises an error and the template fails.
  required: false
  type: any
{% endfunction_parameters %}

## Rounding methods

The `round` filter supports four rounding methods:

### Common (default)

The default method uses Python's built-in rounding, which follows the "round half to even" (banker's rounding) strategy. Values exactly halfway between two numbers are rounded to the nearest even number.

{% example %}
template: '{{ 21.456 | round(1) }}'
title: Round to 1 decimal
type: float
output: "21.5"
{% endexample %}

{% example %}
template: '{{ 2.5 | round(0) }}'
title: "Banker's rounding: 2.5 rounds to even"
type: integer
output: "2"
{% endexample %}

{% example %}
template: '{{ 2.7 | round(0) }}'
title: Values above the halfway point round up
type: integer
output: "3"
{% endexample %}

{% example %}
template: '{{ 3.5 | round(0) }}'
title: "Banker's rounding: 3.5 rounds up to the even 4"
type: integer
output: "4"
{% endexample %}

### Ceil (always round up)

Always rounds up to the next value at the given precision.

{% example %}
template: '{{ 21.1 | round(0, "ceil") }}'
title: Always round up
type: integer
output: "22"
{% endexample %}

### Floor (always round down)

Always rounds down to the previous value at the given precision.

{% example %}
template: '{{ 21.9 | round(0, "floor") }}'
title: Always round down
type: integer
output: "21"
{% endexample %}

### Half (round to nearest 0.5)

Rounds the value to the nearest 0.5 increment. This is useful for thermostats and other {% term devices %} that operate in half-degree steps.

{% example %}
template: '{{ 21.3 | round(0, "half") }}'
type: float
output: "21.5"
{% endexample %}

## Good to know

- The default `common` method uses banker's rounding, where 0.5 rounds to the nearest even number. So `2.5 | round` gives `2`, not `3`.
- With `precision=0` (the default), the result is an integer. With a nonzero precision, the result is a float.
- The `half` method rounds to the nearest 0.5 rather than the nearest whole number.
- For example, 2.7 rounds to 3 with common and ceil, and to 2 with floor.
- With half, set a precision of 1 or higher to keep the .5: 2.7 | round(1, 'half') gives 2.5. At precision 0, the result is cut to a whole number, so 2.7 | round(0, 'half') gives 2

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display a clean temperature value

Round a temperature sensor to one decimal place for display on a dashboard.

{% example %}
template: '{{ states("sensor.outdoor_temperature") | float(0) | round(1) }}'
type: float
output: "18.3"
{% endexample %}

### Round up for resource planning

When calculating how many items you need, always round up so you don't run short.

{% example %}
template: |
  {{ (states("sensor.paint_area") | float(0) / 10) | round(0, "ceil") }}
title: Cans of paint needed (each covers 10 sqm)
type: integer
output: "4"
{% endexample %}

### Round a cost to two decimals

Display an energy cost with exactly two decimal places.

{% example %}
template: '{{ (states("sensor.energy_today") | float(0) * 0.25) | round(2) }}'
type: float
output: "3.47"
{% endexample %}

### Set a thermostat to the nearest half degree

Round a calculated target temperature to the nearest 0.5 so it matches what the thermostat accepts.

{% example %}
action: |
  action:
    - action: climate.set_temperature
      target:
        entity_id: climate.living_room
      data:
        temperature: >
          {{
            states("sensor.desired_temperature")
            | float(20) | round(0, "half")
          }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
