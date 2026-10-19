---
title: "Bitwise AND: bitwise_and"
function_name: "bitwise_and"
description: "Performs a bitwise AND operation on two values."
available_as:
  - function
  - filter
category: math
return_type: int
limited: true
since: "2023.1"
related_functions:
  - bitwise_or
  - bitwise_xor
---

The `bitwise_and` template function performs a bitwise AND operation on two integer values. Each bit in the result is set to 1 only if both corresponding bits in the input values are 1.

This is useful when working with {% term devices %} that communicate status or configuration using bitmasks. For example, some {% term sensors %} report multiple flags packed into a single integer value, and you can use `bitwise_and` to check whether a specific flag bit is set. It is also helpful for masking out specific bits from a register value.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ bitwise_and(7, 3) }}'
type: int
output: "3"

---
filter: '{{ 7 | bitwise_and(3) }}'
type: int
output: "3"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
bitwise_and(
    first_value: Any,
    second_value: Any,
) -> int
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
first_value:
  description: >
    The first integer value for the AND operation.
  required: true
  type: integer
second_value:
  description: >
    The second integer value for the AND operation.
  required: true
  type: integer
{% endfunction_parameters %}

## Good to know

- Both inputs must be integers. Convert state strings with [`int`](/template-functions/int/) first.
- To test whether a specific bit is set, compare the result to the bit mask or to zero.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Checking a status bit

Check if bit 2 (value 4) is set in a sensor's status register.

{% example %}
template: |
  {% set status = states("sensor.device_status") | int %}
  {{ bitwise_and(status, 4) > 0 }}
type: boolean
output: "True"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
