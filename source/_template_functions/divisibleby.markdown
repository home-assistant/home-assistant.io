---
title: "Test if divisible by: divisibleby"
function_name: "divisibleby"
description: "Tests whether a number is divisible by another number."
available_as:
  - test
category: math
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - even
  - odd
  - int
  - float
---

The `divisibleby` test checks whether a number is evenly divisible by another number (the remainder is zero). It returns `true` if the division has no remainder and `false` otherwise. Use `value is divisibleby(num)` to perform the check.

This is useful for creating patterns in loops, such as applying different formatting to every third or fifth item. It can also be used with [`select`](/template-functions/select/) and [`reject`](/template-functions/reject/) to filter lists of numbers based on divisibility.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if 10 is divisibleby(5) %}
    Divisible by 5
  {% endif %}
type: string
output: "Divisible by 5"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
divisibleby(
    value: int,
    num: int,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The number to test.
  required: true
  type: integer
num:
  description: >
    The divisor. The test checks if `value` divided by `num` has zero remainder.
  required: true
  type: integer
{% endfunction_parameters %}

## Good to know

- Both inputs must be integers. Floats raise an error unless converted with [`int`](/template-functions/int/) first.
- Dividing by zero raises an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check various values

Test whether numbers are divisible by a given divisor.

{% example %}
template: |
  {{ 12 is divisibleby(3) }}
  {{ 12 is divisibleby(5) }}
  {{ 100 is divisibleby(10) }}
type: boolean
output: |
  true
  false
  true
{% endexample %}

### Filter multiples from a list

Use [`select`](/template-functions/select/) to find all numbers in a list that are multiples of a given number.

{% example %}
template: '{{ range(1, 21) | select("divisibleby", 4) | list }}'
type: list
output: "[4, 8, 12, 16, 20]"
{% endexample %}

### Apply alternating row styles in a loop

Use `divisibleby` to create a pattern every N iterations in a loop.

{% example %}
template: |
  {% for i in range(1, 7) %}
    {{ i }}{% if i is divisibleby(3) %} (group boundary){% endif %}
  {% endfor %}
type: string
output: |
    1
    2
    3 (group boundary)
    4
    5
    6 (group boundary)
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
