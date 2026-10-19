---
title: "Require a value is defined: is_defined"
function_name: "is_defined"
description: "Forces a template error if the value is undefined, ensuring variables exist before use."
available_as:
  - filter
category: type
return_type: any
limited: true
since: "0.7"
related_functions:
  - has_value
  - typeof
  - is_number
---

The `is_defined` filter checks that a value is not undefined and forces a template error if it is. If the value is defined, it passes through unchanged. This is a safety mechanism to catch typos and missing variables early rather than having them silently produce empty strings.

By default, Home Assistant is configured to be lenient with undefined variables, meaning a misspelled variable name produces an empty string instead of an error. While this is convenient for smaller {% term templates %}, it can make debugging very difficult. If you write {% jinja %}{{ sensr.temperature }}{% endjinja %} instead of {% jinja %}{{ sensor.temperature }}{% endjinja %}, you get a blank value with no indication that anything is wrong. The `is_defined` filter lets you opt in to strict checking for specific variables, so you get an immediate error that points to the problem.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ my_variable | is_defined }}'
type: any
output: "the value of my_variable"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
is_defined(
    value: Any,
) -> Any
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The value to check. If the value is an `Undefined` object, an error is raised. Otherwise, the value is returned unchanged.
  required: true
  type: any
{% endfunction_parameters %}

## How it works

When you reference a variable that does not exist in a template, it becomes an `Undefined` object. Normally, this silently renders as an empty string. The `is_defined` filter detects this and raises an error instead, making the problem visible.

{% example %}
template: '{{ my_var | is_defined }}'
title: "Raises an error if my_var does not exist"
{% endexample %}

{% tip %}

This filter is most useful in {% term scripts %} and {% term automations %} where variables are passed in from outside. It helps you catch cases where a required variable was not provided.

{% endtip %}

## Good to know

- This raises an error on undefined input, which is the opposite of most filters. Use it intentionally to enforce a variable's presence.
- A value set to `None` is considered defined and passes through without error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Validate a script variable

Ensure that a required variable was passed into a {% term script %} before using it.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          Reminder: {{ message | is_defined }}
{% endexample %}

If the `message` variable was not provided when calling the script, this raises a clear error instead of sending an empty notification.

### Guard multiple variables

Apply `is_defined` to each variable you depend on at the start of a template.

{% example %}
template: |
  {% set name = target_name | is_defined %}
  {% set room = target_room | is_defined %}
  {{ name }} is in the {{ room }}
type: string
output: "Alice is in the Kitchen"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
