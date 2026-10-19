---
title: "Test if odd: odd"
function_name: "odd"
description: "Tests whether a number is odd."
available_as:
  - test
category: math
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - even
  - divisibleby
  - int
---

The `odd` test checks whether an integer is odd (not divisible by 2). It returns `true` for odd numbers and `false` for even numbers.

Like [`even`](/template-functions/even/), this test is commonly used in loops to apply alternating styles or logic. It can also be used with [`select`](/template-functions/select/) and [`reject`](/template-functions/reject/) to filter lists of numbers based on whether they are odd.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if 3 is odd %}
    It is odd
  {% endif %}
type: string
output: "It is odd"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
odd(
    value: int,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The integer to test. Returns `true` if the value is not divisible by 2.
  required: true
  type: integer
{% endfunction_parameters %}

## Good to know

- Zero is even, not odd.
- The input must be an integer. Floats or strings raise an error unless converted first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check various numbers

{% example %}
template: |
  {{ 3 is odd }}
  {{ 8 is odd }}
  {{ 1 is odd }}
type: boolean
output: |
  true
  false
  true
{% endexample %}

### Filter odd numbers from a list

Use [`select`](/template-functions/select/) to extract only odd numbers from a range.

{% example %}
template: '{{ range(1, 11) | select("odd") | list }}'
type: list
output: "[1, 3, 5, 7, 9]"
{% endexample %}

### Count odd-valued sensors

Count how many {% term sensors %} in a group have odd integer values.

{% example %}
template: |
  {% set values = [
    states("sensor.counter_a") | int(0),
    states("sensor.counter_b") | int(0),
    states("sensor.counter_c") | int(0)
  ] %}
  {{ values | select("odd") | list | count }} sensors have odd values
type: string
output: "2 sensors have odd values"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
