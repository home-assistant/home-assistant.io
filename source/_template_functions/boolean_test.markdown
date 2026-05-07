---
title: "Test if boolean: boolean"
function_name: "boolean"
description: "Tests whether a value is a boolean type."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - bool
  - true_test
  - false_test
  - typeof
---

The `boolean` test checks whether a value is a boolean (`true` or `false`). It returns `true` if the value is of boolean type and `false` for any other type, including strings like `true` or integers like `1`.

This is useful when you need to verify the type of a value before processing it. In Home Assistant, {% term entity %} states are always strings, but attributes can be actual booleans. If you need to distinguish between a real boolean and a string that looks like one, this test lets you check the actual type.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if true is boolean %}
    It is a boolean
  {% endif %}
type: string
output: "It is a boolean"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
boolean(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is of boolean type (`true` or `false`).
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Only the actual boolean values `true` and `false` pass this test. Strings like `"true"` and integers like `1` do not.
- Entity states are always strings, so this test will never succeed on a raw `states(...)` result.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distinguish boolean from string

Check whether a value is actually a boolean and not a string representation.

{% example %}
template: |
  {{ true is boolean }}
  {{ "true" is boolean }}
type: boolean
output: |
  true
  false
{% endexample %}

### Validate an attribute type

Verify that an {% term entity %} attribute is a real boolean before using it directly.

{% example %}
template: |
  {% set val = state_attr("switch.device", "is_locked") %}
  {% if val is boolean %}
    Lock state: {{ val }}
  {% else %}
    Unexpected type
  {% endif %}
type: string
output: "Lock state: True"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
