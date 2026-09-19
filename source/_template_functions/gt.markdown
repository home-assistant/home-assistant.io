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
- `>` - `value is >(other)`

## Using with selectattr

Filter entities whose numeric attributes exceed a threshold.

{% example %}
template: |
  {{
    states.sensor
    | selectattr("state", "gt", "25")
    | map(attribute="name") | list
  }}
title: Sensors above 25
type: list
output: "['Outdoor Temperature']"
{% endexample %}

## Good to know

- When comparing entity state strings with numbers, convert first or wrap the threshold in quotes. String comparison puts `"9"` above `"10"`.
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
