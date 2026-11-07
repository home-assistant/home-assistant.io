---
title: "Test greater than: gt"
function_name: "gt"
description: "Tests if a value is greater than another. Also known as greaterthan or >."
available_as:
  - test
aliases:
  - greaterthan
  - ">"
category: comparison
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - ge
  - lt
  - le
  - eq
  - ne
---

The `gt` test checks whether a value is strictly greater than another value. It is also available under the aliases `greaterthan` and `>`. When used with `is`, it reads naturally: `value is gt(other)`.

While you can always use `>` directly in conditions, the `gt` test is essential when working with [`selectattr`](/template-functions/selectattr/), [`select`](/template-functions/select/), and similar filters that require a test name as a string. This lets you filter collections by comparing attribute values without writing explicit loops.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if 10 is gt(5) %}
    Greater
  {% endif %}
type: string
output: Greater
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
gt(
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
- `greaterthan` - `value is greaterthan(other)`
- `>` - Only as the name of the test in [`select`](/template-functions/select/) or [`selectattr`](/template-functions/selectattr/), such as `select(">", 25)`. `value is >(other)` doesn't work.

## Using with selectattr

Filter entities whose numeric attributes exceed a threshold.

{% example %}
template: |
  {{
    states.sensor
    | selectattr("attributes.battery_level", "number")
    | selectattr("attributes.battery_level", "gt", 25)
    | map(attribute="name") | list
  }}
title: Devices with more than 25% battery
type: list
output: "['Phone', 'Tablet']"
{% endexample %}

## Good to know

- Entity states are always strings, so comparing a state with this test compares text, not numbers. For example, `"9"` and `"unavailable"` both count as greater than `"25"`. Compare a numeric attribute instead, or convert the state with [`float`](/template-functions/float/) first.
- If an entity doesn't have the attribute, or its value is `None`, the comparison raises an error. To skip those entities, add [`selectattr("attributes.battery_level", "number")`](/template-functions/number_test/) first, as in the example above.
- This is strict. A value equal to the threshold does not pass. Use [`ge`](/template-functions/ge/) for greater-or-equal.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Filter values above a threshold

Use [`select`](/template-functions/select/) to find numbers exceeding a limit.

{% example %}
template: '{{ [10, 25, 30, 15, 40] | select("gt", 20) | list }}'
type: list
output: "[25, 30, 40]"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
