---
title: "Test equality: eq"
function_name: "eq"
description: "Tests if two values are equal. Also known as equalto or ==."
available_as:
  - test
aliases:
  - equalto
  - "=="
category: comparison
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - ne
  - gt
  - ge
  - lt
  - le
---

The `eq` test checks whether two values are equal. It is also available under the aliases `equalto` and `==`. When used with `is`, it reads naturally: `value is eq(other)`.

While you can always use `==` directly in {% jinja %}{% if %}{% endjinja %} conditions, the `eq` test becomes essential when working with [`selectattr`](/template-functions/selectattr/), [`rejectattr`](/template-functions/rejectattr/), [`select`](/template-functions/select/), and [`reject`](/template-functions/reject/). These filters require a test name as a string, and `eq` lets you filter collections based on equality without writing a loop.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if 5 is eq(5) %}
    Equal
  {% endif %}
type: string
output: Equal
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
eq(
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
- `equalto` - `value is equalto(other)`
- `==` - `value is ==(other)`

## Using with selectattr

The most common use of `eq` is filtering lists of objects by an attribute value.

{% example %}
template: |
  {{
    states.light
    | selectattr("state", "eq", "on")
    | map(attribute="name") | list
  }}
title: Find all lights that are on
type: list
output: "['Living Room', 'Kitchen']"
{% endexample %}

## Good to know

- Numbers and strings compare as unequal even when they look the same. `"5" is eq(5)` is `false`.
- When used with [`selectattr`](/template-functions/selectattr/), comparisons against entity states always compare strings, so wrap numbers in quotes or convert with [`float`](/template-functions/float/) first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Filter entities by state

Find all binary sensors that are currently off.

{% example %}
template: |
  {{
    states.binary_sensor
    | selectattr("state", "eq", "off")
    | map(attribute="entity_id") | list
  }}
type: list
output: "['binary_sensor.front_door', 'binary_sensor.garage']"
{% endexample %}

### Compare values in a list

Use [`select`](/template-functions/select/) to find items matching a specific value.

{% example %}
template: '{{ [1, 2, 3, 2, 1] | select("eq", 2) | list }}'
type: list
output: "[2, 2]"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
