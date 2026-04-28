---
title: "Remove items by test: reject"
function_name: "reject"
description: "Filters a list, removing items that pass a given test. The opposite of select."
available_as:
  - filter
category: collection
return_type: iterable
limited: true
since: "0.7"
related_functions:
  - select
  - rejectattr
  - selectattr
  - map
---

The `reject` filter is the opposite of [`select`](/template-functions/select/). It iterates over a list and removes items that pass the given test, keeping only those that fail it.

This is useful when it is easier to describe what you want to exclude rather than what you want to keep. For example, you might want to remove all zero values from a list, exclude unavailable states, or filter out empty strings. Instead of writing a complex [`select`](/template-functions/select/) with a negated condition, `reject` lets you express the exclusion directly and clearly.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ [1, 2, 3, 4, 5] | reject("greaterthan", 3) | list }}'
type: list
output: "[1, 2, 3]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
reject(
    value: list,
    *args: str,
) -> iterable
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list of items to filter.
  required: true
  type: list
args:
  description: >
    The test name as a string, optionally followed by arguments for the test. If no test is provided, items that are truthy are removed. Common tests include `equalto`, `greaterthan`, `lessthan`, [`string`](/template-functions/string/), `number`, [`contains`](/template-functions/contains/), and [`is_number`](/template-functions/is_number/).
  required: false
  type: string
{% endfunction_parameters %}

## Reject by truthiness

When no test is specified, `reject` removes items that are truthy, keeping only falsy values.

{% example %}
template: '{{ [0, 1, "", "hello", none, true] | reject | list }}'
type: list
output: "[0, '', None]"
{% endexample %}

## Exclude specific values

{% example %}
template: |
  {{
    ["on", "off", "unavailable", "on", "unknown"]
    | reject("equalto", "unavailable") | list
  }}
title: Remove unavailable states
type: list
output: "['on', 'off', 'on', 'unknown']"
{% endexample %}

## Good to know

- Returns an iterable, not a list. Add [`| list`](/template-functions/list/) before using it with [`length`](/template-functions/length/), [`first`](/template-functions/first/), or looping twice.
- Without a test, truthy items are removed. Zero, empty strings, and `None` are kept because they are falsy.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Remove zero values before averaging

Exclude zero readings that might skew an average calculation.

{% example %}
template: |
  {{
    [21.5, 0, 19.8, 22.3, 0]
    | reject("equalto", 0)
    | list
    | average
    | round(1)
  }}
type: float
output: "21.2"
{% endexample %}

### Exclude non-numeric values

Remove values that are not valid numbers before performing calculations.

{% example %}
template: |
  {{
    expand("group.temperature_sensors")
    | map(attribute="state")
    | reject("in", ["unavailable", "unknown"])
    | map("float")
    | list
  }}
type: list
output: "[21.5, 19.8, 22.3]"
{% endexample %}

### Remove empty strings

Clean up a list by removing empty or blank entries.

{% example %}
template: |
  {% set items = ["kitchen", "", "bedroom", "", "hall"] %}
  {{ items | reject("equalto", "") | list }}
type: list
output: '["kitchen", "bedroom", "hall"]'
{% endexample %}

### Exclude outlier values

Remove temperature readings that are outside a reasonable range.

{% example %}
template: |
  {{
    [21.5, 19.8, -40.0, 22.3, 99.9]
    | reject("greaterthan", 50)
    | reject("lessthan", -20)
    | list
  }}
type: list
output: "[21.5, 19.8, 22.3]"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
