---
title: "Test if string: string"
function_name: "string"
description: "Tests whether a value is a string type."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - string
  - typeof
  - integer_test
  - float_test
---

The [`string`](/template-functions/string/) test checks whether a value is a string. It returns `true` if the value is of string type and `false` for any other type, including numbers and booleans.

In Home Assistant, {% term entity %} states are always strings, but attributes can be various types including numbers, booleans, and lists. This test is useful when you need to verify that a value is a string before performing string operations like splitting, replacing, or pattern matching.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if "hello" is string %}
    It is a string
  {% endif %}
type: string
output: "It is a string"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
string(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is of string type.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- A numeric-looking string such as `"42"` still passes this test. The test looks at the type, not the content.
- All entity states are strings in Home Assistant, so this test is most useful for attributes or values built inside a template.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distinguish strings from numbers

Check whether a value is a string or a numeric type.

{% example %}
template: |
  {{ "hello" is string }}
  {{ 42 is string }}
  {{ "42" is string }}
type: boolean
output: |
  true
  false
  true
{% endexample %}

### Conditionally process based on type

Handle an attribute differently depending on whether it is a string or another type.

{% example %}
template: |
  {% set val = state_attr("sensor.device", "info") %}
  {% if val is string %}
    Info: {{ val }}
  {% else %}
    Info: {{ val | tojson }}
  {% endif %}
type: string
output: "Info: Ready"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
