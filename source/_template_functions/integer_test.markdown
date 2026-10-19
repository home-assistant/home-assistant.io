---
title: "Test if integer: integer"
function_name: "integer"
description: "Tests whether a value is an integer type."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - int
  - float_test
  - number_test
  - typeof
---

The `integer` test checks whether a value is an integer. It returns `true` if the value is of integer type and `false` for any other type, including floats and strings that contain numeric characters.

This test is useful when you need to verify that a value is specifically an integer rather than a float or string. For example, some {% term entity %} attributes return integers for discrete counts (like the number of connected devices) while others return floats for measurements. This test lets you confirm the type before proceeding with type-specific logic.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if 42 is integer %}
    It is an integer
  {% endif %}
type: string
output: "It is an integer"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
integer(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is of integer type.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Booleans pass this test because `True` and `False` are integers in Python. Guard with `is not boolean` if that matters.
- Numeric strings like `"42"` do not pass. Convert with [`int`](/template-functions/int/) first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distinguish integer from float

Check whether a numeric value is specifically an integer.

{% example %}
template: |
  {{ 42 is integer }}
  {{ 42.0 is integer }}
  {{ "42" is integer }}
type: boolean
output: |
  true
  false
  false
{% endexample %}

### Validate before integer operations

Ensure a value is an integer before using it in an operation that requires whole numbers.

{% example %}
template: |
  {% set count = state_attr("sensor.devices", "count") %}
  {% if count is integer %}
    {{ count }} devices connected
  {% else %}
    Invalid count
  {% endif %}
type: string
output: "5 devices connected"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
