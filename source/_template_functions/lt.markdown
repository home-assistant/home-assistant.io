---
title: "Test less than: lt"
function_name: "lt"
description: "Tests if a value is less than another. Also known as lessthan or <."
available_as:
  - test
aliases:
  - lessthan
  - "<"
category: comparison
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - le
  - gt
  - ge
  - eq
  - ne
---

The `lt` test checks whether a value is strictly less than another value. It is also available under the aliases `lessthan` and `<`. When used with `is`, it reads naturally: `value is lt(other)`.

While you can always use `<` directly in conditions, the `lt` test is essential when working with [`selectattr`](/template-functions/selectattr/), [`select`](/template-functions/select/), and similar filters that require a test name as a string. This lets you filter collections by comparing values to an upper limit without writing explicit loops.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if 3 is lt(5) %}
    Less than
  {% endif %}
type: string
output: Less than
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
lt(
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
- `lessthan` - `value is lessthan(other)`
- `<` - `value is <(other)`

## Using with selectattr

Filter entities below a certain threshold, for example to find low battery devices.

{% example %}
template: |
  {{
    states.sensor
    | selectattr("attributes.battery_level", "lt", 20)
    | map(attribute="name") | list
  }}
title: Low battery devices
type: list
output: "['Remote Control']"
{% endexample %}

## Good to know

- When comparing entity state strings with numbers, convert first or wrap the threshold in quotes. String comparison puts `"9"` above `"10"`.
- This is strict. A value equal to the threshold does not pass. Use [`le`](/template-functions/le/) for less-or-equal.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Filter values below a limit

Use [`select`](/template-functions/select/) to find numbers below a threshold.

{% example %}
template: '{{ [10, 25, 30, 15, 40] | select("lt", 20) | list }}'
type: list
output: "[10, 15]"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
