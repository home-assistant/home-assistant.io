---
title: "Bitwise OR: bitwise_or"
function_name: "bitwise_or"
description: "Performs a bitwise OR operation on two values."
available_as:
  - function
  - filter
category: math
return_type: int
limited: true
since: "2023.1"
related_functions:
  - bitwise_and
  - bitwise_xor
---

The `bitwise_or` template function performs a bitwise OR operation on two integer values. Each bit in the result is set to 1 if at least one of the corresponding bits in the input values is 1.

This is useful when you need to combine multiple status flags into a single value or set specific bits in a bitmask. For example, if different {% term sensors %} each report a single flag bit and you want to combine them into a single status register, `bitwise_or` lets you merge them together.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ bitwise_or(5, 3) }}'
type: int
output: "7"

---
filter: '{{ 5 | bitwise_or(3) }}'
type: int
output: "7"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
bitwise_or(
    first_value: Any,
    second_value: Any,
) -> int
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
first_value:
  description: >
    The first integer value for the OR operation.
  required: true
  type: integer
second_value:
  description: >
    The second integer value for the OR operation.
  required: true
  type: integer
{% endfunction_parameters %}

## Good to know

- Both inputs must be integers. Convert state strings with [`int`](/template-functions/int/) first.
- Binary literals like `0b0010` work and can make bit flags more readable.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Combining status flags

Combine two flag values into a single bitmask.

{% example %}
template: |
  {% set flag_a = 0b0010 %}
  {% set flag_b = 0b0100 %}
  {{ bitwise_or(flag_a, flag_b) }}
type: int
output: "6"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
