---
title: "Bitwise XOR: bitwise_xor"
function_name: "bitwise_xor"
description: "Performs a bitwise XOR (exclusive OR) operation on two values."
available_as:
  - function
  - filter
category: math
return_type: int
limited: true
since: "2023.1"
related_functions:
  - bitwise_and
  - bitwise_or
---

The `bitwise_xor` template function performs a bitwise XOR (exclusive OR) operation on two integer values. Each bit in the result is set to 1 only if exactly one of the corresponding bits in the input values is 1.

This is useful for toggling specific bits in a bitmask or comparing two status values to find which bits differ. For example, you could compare the current and previous status registers of a {% term device %} to detect which flags have changed.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ bitwise_xor(5, 3) }}'
type: int
output: "6"

---
filter: '{{ 5 | bitwise_xor(3) }}'
type: int
output: "6"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
bitwise_xor(
    first_value: Any,
    second_value: Any,
) -> int
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
first_value:
  description: >
    The first integer value for the XOR operation.
  required: true
  type: integer
second_value:
  description: >
    The second integer value for the XOR operation.
  required: true
  type: integer
{% endfunction_parameters %}

## Good to know

- Both inputs must be integers. Convert state strings with [`int`](/template-functions/int/) first.
- XOR-ing a value with itself produces zero, which is a quick way to detect whether two values are identical.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Detecting changed bits

Compare two status values to find which bits changed.

{% example %}
template: |
  {% set old_status = 0b1010 %}
  {% set new_status = 0b1100 %}
  {{ bitwise_xor(old_status, new_status) }}
type: int
output: "6"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
