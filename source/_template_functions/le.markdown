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
- `<=` - Only as the name of the test in [`select`](/template-functions/select/) or [`selectattr`](/template-functions/selectattr/), such as `select("<=", 128)`. `value is <=(other)` doesn't work.

## Using with selectattr

Filter entities at or below a maximum value.

{% example %}
template: |
  {{
    states.light
    | selectattr("attributes.brightness", "number")
    | selectattr("attributes.brightness", "le", 128)
    | map(attribute="name") | list
  }}
title: Dimly lit rooms
type: list
output: "['Hallway', 'Bedroom']"
{% endexample %}

## Good to know

- Entity states are always strings, so comparing a state with this test compares text, not numbers. For example, `"9"` and `"unavailable"` both count as greater than `"25"`. Compare a numeric attribute instead, or convert the state with [`float`](/template-functions/float/) first.
- If an entity doesn't have the attribute, or its value is `None`, the comparison raises an error. To skip those entities, add [`selectattr("attributes.brightness", "number")`](/template-functions/number_test/) first, as in the example above.
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
