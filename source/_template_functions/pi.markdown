---
title: "Pi: pi"
function_name: "pi"
description: "The mathematical constant pi, approximately 3.14159."
available_as:
  - function
category: math
return_type: float
limited: true
since: "0.117"
related_functions:
  - tau
  - e
  - sin
  - cos
  - tan
---

The `pi` template constant provides the mathematical constant pi, approximately 3.14159. This is the ratio of a circle's circumference to its diameter and is fundamental to trigonometric and geometric calculations.

This is commonly used for converting between degrees and radians in trigonometric calculations. For example, you might multiply a degree-based {% term sensor %} value by `pi / 180` before passing it to [`sin`](/template-functions/sin/), [`cos`](/template-functions/cos/), or [`tan`](/template-functions/tan/). It is also useful for circle-related geometry in your {% term templates %}.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ pi }}'
type: float
output: "3.141592653589793"
{% endtemplate_function_usage %}

## Good to know

- This is a mathematical constant approximately equal to 3.14159.
- Use it without parentheses. `pi` is a value, not a function you call.
- Trigonometric functions like [`sin`](/template-functions/sin/), [`cos`](/template-functions/cos/), and [`tan`](/template-functions/tan/) expect radians, so multiply degree values by `pi / 180` first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Converting degrees to radians

Convert a sensor value in degrees to radians for use with trigonometric functions.

{% example %}
template: |
  {% set degrees = states("sensor.wind_direction") | float %}
  {{ degrees * (pi / 180) }}
type: float
output: "3.141592653589793"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
