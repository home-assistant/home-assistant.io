---
title: "Test if true: true"
function_name: "true"
description: "Tests whether a value is true."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - false_test
  - boolean_test
  - bool
  - sameas
---

The `true` test checks whether a value is `true`. It performs a strict identity check, meaning only the boolean value `true` passes. Values like `1`, `true`, or non-empty strings do not match.

This is useful when you need to verify that a value is specifically the boolean `true` and not merely a truthy value. In Home Assistant, {% term entity %} attributes can be actual booleans, and this test lets you check for an exact `true` value without accidentally matching other truthy types.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if true is true %}
    It is true
  {% endif %}
type: string
output: "It is true"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
true(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` only if the value is the boolean `true`.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- This is a strict identity check. Truthy values like `1`, `"yes"`, or a non-empty list do not pass. Use [`boolean`](/template-functions/boolean_test/) if you want looser matching.
- The string `"true"` is not the boolean `true`. Entity states are always strings, so comparing a state with this test always returns `false`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Strict boolean check

Only the boolean `true` passes; truthy values like `1` or `true` do not.

{% example %}
template: |
  {{ true is true }}
  {{ 1 is true }}
  {{ "true" is true }}
type: boolean
output: |
  true
  false
  false
{% endexample %}

### Verify a boolean attribute

Check that an {% term entity %} attribute is specifically `true`.

{% example %}
template: |
  {% set locked = state_attr("lock.front_door", "is_jammed") %}
  {% if locked is true %}
    Door is jammed!
  {% endif %}
type: string
output: "Door is jammed!"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
