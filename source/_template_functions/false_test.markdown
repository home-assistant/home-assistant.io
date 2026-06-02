---
title: "Test if false: false"
function_name: "false"
description: "Tests whether a value is false."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - true_test
  - boolean_test
  - bool
  - sameas
---

The `false` test checks whether a value is `false`. It performs a strict identity check, meaning only the boolean value `false` passes. Values like `0`, `""`, `none`, and the string `"false"` do not match.

This is useful when you need to verify that a value is specifically the boolean `false` and not merely a falsy value. In Home Assistant, {% term entity %} attributes can be actual booleans, and this test lets you check for an exact `false` value without accidentally matching other falsy types like `0` or an empty string.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if false is false %}
    It is false
  {% endif %}
type: string
output: "It is false"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
false(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` only if the value is the boolean `false`.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- This is a strict identity test. Only the boolean `false` passes, while `0`, empty strings, and `None` do not.
- Entity states are strings, so `states("switch.x") is false` is always `false`. Use `is_state("switch.x", "off")` instead.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Strict boolean check

Only the boolean `false` passes; falsy values like `0` or `` do not.

{% example %}
template: |
  {{ false is false }}
  {{ 0 is false }}
  {{ "" is false }}
type: boolean
output: |
  true
  false
  false
{% endexample %}

### Verify a boolean attribute

Check that an {% term entity %} attribute is specifically `false`.

{% example %}
template: |
  {% set charging = state_attr("sensor.phone", "is_charging") %}
  {% if charging is false %}
    Phone is not charging
  {% endif %}
type: string
output: "Phone is not charging"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
