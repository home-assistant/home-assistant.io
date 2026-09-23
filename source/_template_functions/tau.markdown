---
title: "Tau: tau"
function_name: "tau"
description: "The mathematical constant tau (2 * pi), approximately 6.28318."
available_as:
  - function
category: math
return_type: float
limited: true
since: "0.117"
related_functions:
  - pi
  - e
  - sin
  - cos
  - tan
---

The `tau` template constant provides the mathematical constant tau, which equals 2 * [`pi`](/template-functions/pi/), approximately 6.28318. Tau represents one full turn in radians, making some circular and angular calculations more intuitive.

This is useful when working with full rotations or cyclic values. For example, instead of writing `2 * pi` to represent a full circle, you can use `tau`. This can make {% term templates %} involving angular {% term sensor %} data or periodic calculations cleaner and easier to read.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ tau }}'
type: float
output: "6.283185307179586"
{% endtemplate_function_usage %}

## Good to know

- This is a mathematical constant approximately equal to 6.28318, the same as `2 * pi`.
- Use it without parentheses. `tau` is a value, not a function you call.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Fraction of a full rotation

Calculate one quarter of a full rotation (90 degrees in radians).

{% example %}
template: |
  {{ tau / 4 }}
type: float
output: "1.5707963267948966"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
