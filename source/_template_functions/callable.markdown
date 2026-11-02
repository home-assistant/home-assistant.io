---
title: "Test if callable: callable"
function_name: "callable"
description: "Tests whether a value is callable (a function or method)."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - defined
  - typeof
---

The `callable` test checks whether a value is callable, meaning it can be invoked as a function. It returns `true` for functions, methods, and other callable objects, and `false` for regular values like strings, numbers, and lists.

In typical Home Assistant template usage, you rarely need to check if something is callable. However, this test can be useful in templates where you work with template macros or need to verify that a value is a function before attempting to call it.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if range is callable %}
    range is callable
  {% endif %}
type: string
output: "range is callable"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
callable(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value can be called as a function.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Most template values are not callable. This test is primarily useful when working with macros wrapped via [`as_function`](/template-functions/as_function/).

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check various values

Functions are callable, but regular values are not.

{% example %}
template: |
  {{ range is callable }}
  {{ "hello" is callable }}
  {{ 42 is callable }}
type: boolean
output: |
  true
  false
  false
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
