---
title: "Test same object: sameas"
function_name: "sameas"
description: "Tests whether a value is the same object as another (identity check)."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - eq
  - none
  - defined
---

The `sameas` test checks whether two values are the exact same object in memory (identity), not merely equal in value. It is equivalent to Python's `is` operator. Use `value is sameas(other)` to perform the check.

In most Home Assistant templates, you will use [`eq`](/template-functions/eq/) or `==` for value comparisons. The `sameas` test is primarily useful when you need to distinguish between identity and equality, such as checking if a value is specifically `true`, `false`, or `none` as singletons rather than merely equal to them.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if true is sameas(true) %}
    Same object
  {% endif %}
type: string
output: "Same object"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
sameas(
    value: Any,
    other: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. This is the left-hand side of the identity check.
  required: true
  type: any
other:
  description: >
    The object to compare against. The test checks if both refer to the same object.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Identity, not equality. `1 is sameas(true)` is `false` even though `1 == true`.
- Mostly useful for checking singletons like `true`, `false`, and `none`. For normal value comparison, use [`eq`](/template-functions/eq/).

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Identity vs equality

Two values can be equal but not the same object.

{% example %}
template: |
  {{ true is sameas(true) }}
  {{ 1 is sameas(true) }}
type: boolean
output: |
  true
  false
{% endexample %}

### Check for specific singletons

Verify that a value is the actual `none` singleton rather than something that equals `None`.

{% example %}
template: |
  {% set val = none %}
  {% if val is sameas(none) %}
    Value is None
  {% endif %}
type: string
output: "Value is None"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
