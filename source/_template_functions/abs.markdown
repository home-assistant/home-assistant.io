---
title: "Absolute value: abs"
function_name: "abs"
description: "Returns the absolute value of a number."
available_as:
  - filter
category: math
return_type: number
limited: true
since: "0.7"
related_functions:
  - round
  - float
  - int
  - clamp
---

The `abs` filter returns the absolute value of a number, which is its distance from zero regardless of sign. Negative numbers become positive, while positive numbers and zero remain unchanged.
This is useful when you care about the magnitude of a difference but not its direction. For example, when calculating how far a temperature is from a target, the absolute value tells you the size of the deviation regardless of whether the actual temperature is above or below the target. It is also helpful for computing the difference between two {% term sensor %} readings where the order might vary.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ -5 | abs }}'
type: integer
output: "5"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | abs() -> number
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The number to get the absolute value of. Negative values become positive, positive values remain unchanged.
  required: true
  type: float
{% endfunction_parameters %}

## Absolute value of a float

The filter works with both integers and floating-point numbers.

{% example %}
template: '{{ -21.5 | abs }}'
type: float
output: "21.5"
{% endexample %}

## Good to know

- Raises an error when the value is not a number, so convert with [`float`](/template-functions/float/) or [`int`](/template-functions/int/) first if you're working with state strings.
- Works on integers and floats and preserves the original numeric type.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Calculate temperature deviation

Find how far the current temperature is from a target, regardless of direction.

{% example %}
template: |
  {% set current = states("sensor.temperature") | float(0) %}
  {% set target = 22.0 %}
  {{ (current - target) | abs | round(1) }} degrees from target
type: string
output: "1.5 degrees from target"
{% endexample %}

### Compute the difference between two sensors

Calculate the absolute difference between two {% term sensor %} readings.

{% example %}
template: |
  {% set indoor = states("sensor.indoor_temp") | float(0) %}
  {% set outdoor = states("sensor.outdoor_temp") | float(0) %}
  Difference: {{ (indoor - outdoor) | abs | round(1) }} degrees
type: string
output: "Difference: 8.3 degrees"
{% endexample %}

### Use in an automation condition

Only trigger when the power consumption change exceeds a threshold, regardless of direction.

{% example %}
automation: |
  condition:
    - condition: template
      value_template: >
        {{
          (states("sensor.power_now") | float(0)
          - states("sensor.power_previous") | float(0))
          | abs > 500
        }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
