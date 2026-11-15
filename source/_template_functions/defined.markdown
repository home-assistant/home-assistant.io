---
title: "Test if defined: defined"
function_name: "defined"
description: "Tests whether a variable is defined (not undefined)."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - undefined
  - none
  - default
  - is_defined
---

The `defined` test checks whether a variable has been defined in the current template context. It returns `true` if the variable exists and `false` if it is undefined.

This test is commonly used to guard against errors when working with variables that may or may not be present. For example, {% term trigger %} variables are only available inside an {% term automation %} context, and optional variables passed to scripts may not always be set. Testing with `defined` before accessing a variable prevents "undefined" errors and lets you branch your logic accordingly.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if my_variable is defined %}
    Variable exists: {{ my_variable }}
  {% endif %}
type: string
output: "Variable exists: hello"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
defined(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The variable to test. Returns `true` if the variable is defined in the current context.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Checks whether a variable exists in the current context, not whether it has a non-empty value.
- A variable set to `None` passes this test. Use `is not none` to filter those out too.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Guard trigger variable access

Only access {% term trigger %} data when it is available.

{% example %}
template: |
  {% if trigger is defined %}
    Triggered by: {{ trigger.entity_id }}
  {% else %}
    No trigger context
  {% endif %}
type: string
output: "No trigger context"
{% endexample %}

### Check for optional script variables

Handle optional variables in a {% term script %} gracefully.

{% example %}
template: |
  {% if message is defined %}
    {{ message }}
  {% else %}
    Default notification text
  {% endif %}
type: string
output: "Default notification text"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
