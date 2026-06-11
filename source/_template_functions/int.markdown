---
title: "Convert to integer: int"
function_name: "int"
description: "Converts a value to an integer, with an optional default if conversion fails."
available_as:
  - function
  - filter
category: type
return_type: integer
limited: true
since: "0.7"
related_functions:
  - float
  - is_number
  - round
  - bool
---

The `int` template function converts a value to an integer (whole number). If the value cannot be converted, it returns the default you provide instead of raising an error. Like [`float`](/template-functions/float/), it is "forgiving" and safe to use with {% term sensor %} values that might sometimes be invalid.

In Home Assistant, all {% term entity %} states are stored as strings. When you need a whole number for math, comparisons, or passing to an {% term action %}, you need to convert first. The `int` function also supports a `base` parameter for converting hexadecimal, octal, or binary strings. If you need decimal precision, use [`float`](/template-functions/float/) instead.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ int("42") }}'
type: integer
output: "42"

---
filter: '{{ states("sensor.battery_level") | int }}'
type: integer
output: "87"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
int(
    value: Any,
    default: Any = _SENTINEL,
    base: int = 10,
) -> int | Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to convert to an integer. Strings representing whole numbers (like `42`) are converted. Non-numeric values raise an error unless a default is provided.
  required: true
  type: any
default:
  description: >
    Value to return if the conversion fails. If not provided, an error is raised on invalid input. It is strongly recommended to always provide a default.
  required: false
  type: any
base:
  description: >
    The numeric base to use for conversion. Defaults to `10` (decimal). Use `16` for hexadecimal, `8` for octal, or `2` for binary.
  required: false
  default: "10"
  type: integer
{% endfunction_parameters %}

## Using a default value

Since {% term sensor %} states can be `unavailable` or `unknown`, always provide a default to prevent your {% term template %} from breaking.

{% example %}
template: '{{ states("sensor.battery_level") | int(0) }}'
title: Safe conversion with default
type: integer
output: "87"
{% endexample %}

## Converting from other bases

Use the `base` parameter to convert hexadecimal, octal, or binary strings.

{% example %}
template: '{{ int("ff", base=16) }}'
title: Convert hexadecimal to integer
type: integer
output: "255"
{% endexample %}

{% example %}
template: '{{ int("0b1010", base=2) }}'
title: Convert binary to integer
type: integer
output: "10"
{% endexample %}

## Good to know

- Floats are truncated toward zero, not rounded. `2.9 | int` is `2`, and `-2.9 | int` is `-2`. Use [`round`](/template-functions/round/) first if you want rounding.
- A string with decimals like `"21.5"` fails without a default. Pipe through [`float`](/template-functions/float/) first or supply a default.
- The `base` parameter only applies to string inputs. Passing a number with `base=16` does not convert it.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Set a light brightness from a sensor

Use an {% term entity %} state as a brightness value for a light. The `int` filter converts the string state to a whole number suitable for the brightness attribute.

{% example %}
action: |
  action:
    - action: light.turn_on
      target:
        entity_id: light.living_room
      data:
        brightness: >
          {{ states("sensor.ambient_light") | int(128) }}
{% endexample %}

### Count items with integer math

Calculate how many full hours have passed since a counter was last reset.

{% example %}
template: |
  {{
    ((as_timestamp(now())
      - as_timestamp(states.counter.runtime.last_changed)) / 3600)
    | int(0)
  }}
type: integer
output: "3"
{% endexample %}

### Use in a condition

Only proceed if the battery level is above a threshold.

{% example %}
automation: |
  condition:
    - condition: template
      value_template: >
        {{ states("sensor.phone_battery") | int(0) > 20 }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
