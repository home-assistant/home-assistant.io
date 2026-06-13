---
title: "Euler's number: e"
function_name: "e"
description: "The mathematical constant e (Euler's number), approximately 2.71828."
available_as:
  - function
category: math
return_type: float
limited: true
since: "0.117"
related_functions:
  - pi
  - tau
  - log
---

The `e` template constant provides the mathematical constant e (Euler's number), approximately 2.71828. This is the base of the natural logarithm and appears throughout mathematics and science.

This is useful as the base for natural logarithm and exponential calculations in your {% term templates %}. For example, you might use it with the [`log`](/template-functions/log/) function for natural logarithm calculations, or in exponential growth and decay formulas applied to {% term sensor %} data.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ e }}'
type: float
output: "2.718281828459045"
{% endtemplate_function_usage %}

## Good to know

- This is a mathematical constant approximately equal to 2.71828.
- Use it without parentheses. `e` is a value, not a function you call.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Natural logarithm verification

Verify that the natural logarithm of `e` is 1.

{% example %}
template: |
  {{ log(e) }}
type: float
output: "1.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
