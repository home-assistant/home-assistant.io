---
title: "Test if number: number"
function_name: "number"
description: "Tests whether a value is a number (integer or float)."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - is_number
  - integer_test
  - float_test
  - typeof
---

The `number` test checks whether a value is a number, meaning either an integer or a float. It returns `true` for both types and `false` for anything else, including numeric strings.

This test checks the Python type of the value, not whether a string can be parsed as a number. If you need to check whether a string like `21.5` can be converted to a number, use [`is_number`](/template-functions/is_number/) instead. The `number` test is useful when you already have a value from a calculation or attribute and want to confirm it is numeric before proceeding.

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if 42 is number %}
    It is a number
  {% endif %}
type: string
output: "It is a number"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
number(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is an integer or float.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- This checks the Python type. Numeric strings like `"21.5"` do not pass.
- To test whether a value can be parsed as a number, use [`is_number`](/template-functions/is_number/) instead.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check various types

Both integers and floats pass the `number` test, but strings do not.

{% example %}
template: |
  {{ 42 is number }}
  {{ 21.5 is number }}
  {{ "42" is number }}
type: boolean
output: |
  true
  true
  false
{% endexample %}

### Validate attribute values

Check that an {% term entity %} attribute is a numeric type before doing math.

{% example %}
template: |
  {% set brightness = state_attr("light.living_room", "brightness") %}
  {% if brightness is number %}
    Brightness: {{ (brightness / 255 * 100) | round(0) }}%
  {% else %}
    Brightness unknown
  {% endif %}
type: string
output: "Brightness: 75%"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
