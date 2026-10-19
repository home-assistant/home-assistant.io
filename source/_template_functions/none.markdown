---
title: "Test if none: none"
function_name: "none"
description: "Tests whether a value is None."
available_as:
  - test
category: type
return_type: boolean
limited: true
since: "0.7"
related_functions:
  - defined
  - undefined
  - default
  - has_value
---

The `none` test checks whether a value is `None`. It returns `true` if the value is `None` and `false` otherwise.

In Home Assistant, `None` can appear in various situations: an attribute that does not exist on an {% term entity %}, a function that returns nothing, or a variable that has been explicitly set to `None`. Testing for `None` is different from testing for [`undefined`](/template-functions/undefined/): a variable can be defined but have a value of `None`. This test helps you distinguish between "not set" and "set to nothing."

{% include template_functions/usage.md %}

{% template_function_usage %}
test: |
  {% if value is none %}
    Value is None
  {% endif %}
type: string
output: "Value is None"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
none(
    value: Any,
) -> bool
```

### Function parameters

The following parameters can be provided to this test.

{% function_parameters %}
value:
  description: >
    The value to test. Returns `true` if the value is `None`.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- This is different from [`undefined`](/template-functions/undefined/). A variable can be defined and still be `None`.
- The string `"None"` does not pass this test, only the actual `None` value does.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check for missing attributes

Test whether an {% term entity %} attribute exists before using it.

{% example %}
template: |
  {% if state_attr("climate.thermostat", "preset_mode") is none %}
    No preset mode available
  {% else %}
    Preset: {{ state_attr("climate.thermostat", "preset_mode") }}
  {% endif %}
type: string
output: "No preset mode available"
{% endexample %}

### Guard against None in calculations

Ensure a value is not `None` before performing math.

{% example %}
template: |
  {% set temp = state_attr("weather.home", "temperature") %}
  {% if temp is none %}
    Temperature unavailable
  {% else %}
    {{ temp | round(1) }} degrees
  {% endif %}
type: string
output: "21.5 degrees"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
