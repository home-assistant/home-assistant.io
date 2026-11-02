---
title: "Test if float: float"
function_name: "float"
description: "Tests whether a value is a floating-point number type."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - float
  - integer_test
  - number_test
  - typeof
---

The [`float`](/template-functions/float/) test checks whether a value is a floating-point number. It returns `true` if the value is of float type and `false` for any other type, including integers and numeric strings.

This is useful when you need to verify the exact type of a numeric value. In Home Assistant, calculations often produce floats, and some {% term entity %} attributes are specifically floating-point values. This test lets you distinguish between integers and floats when the difference matters for your template logic.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if 21.5 is float %}
    It is a float
  {% endif %}
type: string
output: "It is a float"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
float(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is of float type.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Only true float values pass. Integers, numeric strings, and booleans do not.
- To accept any numeric input, use the [`number`](/template-functions/number_test/) test instead.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distinguish float from integer

Check whether a numeric value is a float rather than an integer.

{% example %}
template: |
  {{ 21.5 is float }}
  {{ 42 is float }}
  {{ "21.5" is float }}
type: boolean
output: |
  true
  false
  false
{% endexample %}

### Check calculation result type

Verify the type of a calculation result before formatting it.

{% example %}
template: |
  {% set result = 10 / 3 %}
  {% if result is float %}
    Result: {{ result | round(2) }}
  {% endif %}
type: string
output: "Result: 3.33"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
