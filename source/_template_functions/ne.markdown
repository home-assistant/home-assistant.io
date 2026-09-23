---
title: "Test not equal: ne"
function_name: "ne"
description: "Tests if two values are not equal. Also known as !=."
available_as:
  - test
aliases:
  - "!="
category: comparison
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - eq
  - gt
  - ge
  - lt
  - le
---

The `ne` test checks whether two values are not equal. It is also available under the alias `!=`. When used with `is`, it reads naturally: `value is ne(other)`.

While you can always use `!=` directly in conditions, the `ne` test is particularly useful with [`selectattr`](/template-functions/selectattr/), [`rejectattr`](/template-functions/rejectattr/), [`select`](/template-functions/select/), and [`reject`](/template-functions/reject/). These filters require a test name as a string, and `ne` lets you filter out items matching a specific value without writing a loop.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if 5 is ne(3) %}
    Not equal
  {% endif %}
type: string
output: Not equal
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
ne(
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
- `!=` - `value is !=(other)`

## Using with selectattr

Filter entities whose state is not a specific value. This is useful for finding entities that are in an unexpected or non-default state.

{% example %}
template: |
  {{
    states.light
    | selectattr("state", "ne", "off")
    | map(attribute="name") | list
  }}
title: Find lights that are not off
type: list
output: "['Living Room', 'Kitchen']"
{% endexample %}

## Good to know

- Numbers and strings are not equal even when they look the same. `"5" is ne(5)` is `true`.
- Especially useful with [`selectattr`](/template-functions/selectattr/) to skip entities in a specific state like `unavailable`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Exclude unavailable entities

Filter out entities that are unavailable from a list.

{% example %}
template: |
  {{
    states.sensor
    | selectattr("state", "ne", "unavailable")
    | map(attribute="entity_id") | list
  }}
type: list
output: "['sensor.temperature', 'sensor.humidity']"
{% endexample %}

### Remove specific values from a list

Use [`reject`](/template-functions/reject/) to remove items equal to a specific value.

{% example %}
template: '{{ [1, 0, 3, 0, 5] | reject("eq", 0) | list }}'
type: list
output: "[1, 3, 5]"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
