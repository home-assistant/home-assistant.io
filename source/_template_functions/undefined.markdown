---
title: "Test if undefined: undefined"
function_name: "undefined"
description: "Tests whether a variable is undefined."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - defined
  - none
  - default
---

The `undefined` test checks whether a variable has not been defined in the current template context. It returns `true` if the variable does not exist and `false` if it has been assigned a value. It is the opposite of [`defined`](/template-functions/defined/).

This is useful when you want to explicitly detect missing variables and handle the absence case. For instance, you might want to set a default value or skip a section of the template when a particular variable has not been provided. While [`default`](/template-functions/default/) is often more concise for fallback values, `undefined` gives you full control with {% jinja %}{% if %}{% endjinja %} blocks.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if my_variable is undefined %}
    Variable is missing
  {% endif %}
type: string
output: "Variable is missing"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
undefined(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The variable to test. Returns `true` if the variable is not defined in the current context.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- A variable explicitly set to `none` is still defined, so this test returns `false` for it. Use `is none` to check for that case.
- Useful for template macros or scripts where callers may or may not pass an argument.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Provide fallback logic for missing data

When an optional variable is not provided, supply alternative content.

{% example %}
template: |
  {% if custom_greeting is undefined %}
    Welcome home!
  {% else %}
    {{ custom_greeting }}
  {% endif %}
type: string
output: "Welcome home!"
{% endexample %}

### Skip optional sections

Only render a section when the required data is available.

{% example %}
template: |
  Status report:
  {% if details is undefined %}
    No additional details available.
  {% else %}
    {{ details }}
  {% endif %}
type: string
output: |
  Status report:
    No additional details available.
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
