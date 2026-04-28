---
title: "Test less than or equal: le"
function_name: "le"
description: "Tests if a value is less than or equal to another. Also known as <=."
available_as:
  - test
aliases:
  - "<="
category: comparison
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - lt
  - gt
  - ge
  - eq
  - ne
---

The `le` test checks whether a value is less than or equal to another value. It is also available under the alias `<=`. When used with `is`, it reads naturally: `value is le(other)`.

While you can always use `<=` directly in conditions, the `le` test is essential when working with [`selectattr`](/template-functions/selectattr/), [`select`](/template-functions/select/), and similar filters that require a test name as a string. This lets you filter collections by comparing values to a maximum threshold without writing explicit loops.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if 5 is le(5) %}
    Less or equal
  {% endif %}
type: string
output: Less or equal
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
le(
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
- `<=` - `value is <=(other)`

## Using with selectattr

Filter entities at or below a maximum value.

{% example %}
template: |
  {{
    states.sensor
    | selectattr("attributes.brightness", "le", 128)
    | map(attribute="name") | list
  }}
title: Dimly lit rooms
type: list
output: "['Hallway', 'Bedroom']"
{% endexample %}

## Good to know

- When comparing entity state strings with numbers, convert first or wrap the threshold in quotes. String comparison puts `"9"` above `"10"`.
- Comparisons between incompatible types (a number and a string, for instance) raise an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Find values at or below a maximum

Use [`select`](/template-functions/select/) to find all numbers at or below a limit.

{% example %}
template: '{{ [10, 25, 30, 15, 40] | select("le", 25) | list }}'
type: list
output: "[10, 25, 15]"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
