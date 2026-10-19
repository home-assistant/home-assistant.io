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
- `>=` - Only as the name of the test in [`select`](/template-functions/select/) or [`selectattr`](/template-functions/selectattr/), such as `select(">=", 25)`. `value is >=(other)` doesn't work.

## Using with selectattr

Filter entities whose attributes meet or exceed a minimum value.

{% example %}
template: |
  {{
    states.sensor
    | selectattr("attributes.battery_level", "number")
    | selectattr("attributes.battery_level", "ge", 50)
    | map(attribute="name") | list
  }}
title: Devices with at least 50% battery
type: list
output: "['Phone', 'Tablet']"
{% endexample %}

## Good to know

- Entity states are always strings, so comparing a state with this test compares text, not numbers. For example, `"9"` and `"unavailable"` both count as greater than `"25"`. Compare a numeric attribute instead, or convert the state with [`float`](/template-functions/float/) first.
- If an entity doesn't have the attribute, or its value is `None`, the comparison raises an error. To skip those entities, add [`selectattr("attributes.battery_level", "number")`](/template-functions/number_test/) first, as in the example above.
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
