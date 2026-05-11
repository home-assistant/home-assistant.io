---
title: "Test greater than or equal: ge"
function_name: "ge"
description: "Tests if a value is greater than or equal to another. Also known as >=."
available_as:
  - test
aliases:
  - ">="
category: comparison
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - gt
  - lt
  - le
  - eq
  - ne
---

The `ge` test checks whether a value is greater than or equal to another value. It is also available under the alias `>=`. When used with `is`, it reads naturally: `value is ge(other)`.

While you can always use `>=` directly in conditions, the `ge` test is essential when working with [`selectattr`](/template-functions/selectattr/), [`select`](/template-functions/select/), and similar filters that require a test name as a string. This lets you filter collections by comparing attribute values to a minimum threshold without writing explicit loops.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if 5 is ge(5) %}
    Greater or equal
  {% endif %}
type: string
output: Greater or equal
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
ge(
    value: Any,
    other: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to test. This is the left-hand side of the comparison.
  required: true
  type: any
other:
  description: >
    The value to compare against.
  required: true
  type: any
{% endfunction_parameters %}

## Aliases

This test can also be used as:
- `>=` - `value is >=(other)`

## Using with selectattr

Filter entities whose attributes meet or exceed a minimum value.

{% example %}
template: |
  {{
    states.sensor
    | selectattr("attributes.battery_level", "ge", 50)
    | map(attribute="name") | list
  }}
title: Devices with at least 50% battery
type: list
output: "['Phone', 'Tablet']"
{% endexample %}

## Good to know

- When comparing entity state strings with numbers, convert first or wrap the threshold in quotes. String comparison puts `"9"` above `"10"`.
- Comparisons between incompatible types (a number and a string, for instance) raise an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Find values at or above a minimum

Use [`select`](/template-functions/select/) to find all numbers at or above a threshold.

{% example %}
template: '{{ [10, 25, 30, 15, 40] | select("ge", 25) | list }}'
type: list
output: "[25, 30, 40]"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
