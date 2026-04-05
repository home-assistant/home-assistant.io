---
title: "Convert to boolean: bool"
function_name: "bool"
description: "Converts a value to a boolean (true/false), with an optional default if conversion fails."
available_as:
  - function
  - filter
category: type
return_type: boolean
limited: true
since: "2022.10"
related_functions:
  - iif
  - is_number
  - int
  - float
---

The `bool` template function converts a value to a boolean (`true` or `false`). It recognizes common truthy values like `true`, `yes`, `on`, `enable`, and `1`, as well as falsy values like `false`, `no`, `off`, `disable`, and `0`. If the value cannot be recognized as either, it returns the default you provide instead of raising an error.

This is useful when working with {% term entity %} states or attributes that represent on/off or yes/no values as strings. For example, some {% term sensors %} report `on` or `off` as their state, and you might need to convert that to a proper boolean for use in a condition or calculation. The `bool` function understands all the common representations of true and false that appear throughout Home Assistant.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ bool("yes") }}'
type: boolean
output: "true"

---
filter: '{{ "off" | bool }}'
type: boolean
output: "false"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
bool(
    value: Any,
    default: Any = _SENTINEL,
) -> bool | Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to convert to a boolean. Recognizes `true`/`false`, `yes`/`no`, `on`/`off`, `enable`/`disable`, `1`/`0`. Other values raise an error unless a default is provided.
  required: true
  type: any
default:
  description: >
    Value to return if the conversion fails. If not provided, an error is raised on unrecognized input.
  required: false
  type: any
{% endfunction_parameters %}

## Recognized values

The filter converts the following values to `true`: `true`, `yes`, `on`, `enable`, `1`.

It converts the following values to `false`: `false`, `no`, `off`, `disable`, `0`.

All string comparisons are case-insensitive, so `True`, `TRUE`, and `true` all work.

## Using a default value

If the input might be an unexpected value, provide a default to prevent errors.

{% example %}
template: '{{ bool("maybe", default=false) }}'
title: Unrecognized value with default
type: boolean
output: "false"
{% endexample %}

## Good to know

- Only specific words are recognized as boolean. `"unavailable"` or `"unknown"` are not, so pass a default when reading sensor states.
- Comparisons are case-insensitive, so `"YES"`, `"Yes"`, and `"yes"` all convert to `true`.
- Integers other than `0` and `1` are not recognized and raise an error unless a default is given.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Convert a state for use in a condition

Check whether a switch-like sensor reports a truthy value.

{% example %}
template: |
  {% if states("sensor.night_mode") | bool(false) %}
    Night mode is active
  {% else %}
    Normal mode
  {% endif %}
type: string
output: "Night mode is active"
{% endexample %}

### Use with iif for display text

Combine `bool` with [`iif`](/template-functions/iif/) to convert a state into a human-readable label.

{% example %}
template: |
  {{
    states("input_boolean.guest_mode") | bool(false)
    | iif("Guests expected", "No guests")
  }}
type: string
output: "Guests expected"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
