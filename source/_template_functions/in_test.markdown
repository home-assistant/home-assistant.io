---
title: "Test if in sequence: in"
function_name: "in"
description: "Tests whether a value is contained in a sequence."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - eq
  - contains
  - sequence
  - select
---

The `in` test checks whether a value is contained in a given sequence (list, tuple, or string). It returns `true` if the value is found and `false` otherwise. Use `value is in(sequence)` to perform the check.

This test is useful when you want to check if an {% term entity %} state matches one of several possible values, or when filtering collections. While you can use Python's `in` operator directly in conditions (`if state in ["on", "off"]`), the `in` test can be used with filters like [`select`](/template-functions/select/) and [`reject`](/template-functions/reject/) that expect a test name.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if "on" is in(["on", "off", "idle"]) %}
    Found in list
  {% endif %}
type: string
output: "Found in list"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
in(
    value: Any,
    seq: Sequence,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to search for in the sequence.
  required: true
  type: any
seq:
  description: >
    The sequence (list, tuple, or string) to search in.
  required: true
  type: list
{% endfunction_parameters %}

## Good to know

- String membership is case-sensitive. `"ON" is in(["on", "off"])` is `false`.
- On a string, this checks for substring presence rather than whole-word matching.
- Unlike Python's `in` operator, this is a Jinja test, so it works as a filter argument in [`select`](/template-functions/select/) and [`reject`](/template-functions/reject/).

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check if state is one of several values

Verify that a {% term sensor %} state matches an expected set of values.

{% example %}
template: |
  {% set state = states("climate.thermostat") %}
  {% if state is in(["heat", "cool", "auto"]) %}
    Climate is active: {{ state }}
  {% else %}
    Climate is idle
  {% endif %}
type: string
output: "Climate is active: heat"
{% endexample %}

### Check for substring in a string

The `in` test also works with strings, checking for substring membership.

{% example %}
template: '{{ "error" is in("Connection error occurred") }}'
type: boolean
output: "true"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
