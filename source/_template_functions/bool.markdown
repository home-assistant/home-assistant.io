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

The `bool` template function converts a value to a boolean (`true` or `false`). It recognizes common truthy values like `true`, `yes`, `on`, `enable`, and `1`, as well as falsy values like `false`, `no`, `off`, `disable`, and `0`. If the value cannot be recognized as either, `bool` raises an error. If you provide a default, it returns the default instead.

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
    default: Any,
) -> bool | Any
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value to convert to a boolean. Recognizes `true`/`false`, `yes`/`no`, `on`/`off`, `enable`/`disable`, `1`/`0`. Numbers and booleans also work. Other values raise an error unless a default is provided.
  required: true
  type: any
default:
  description: >
    The value to return if the conversion fails, such as `false`. If you leave out `default` and the conversion fails, `bool` raises an error and the template fails.
  required: false
  type: any
{% endfunction_parameters %}

## Recognized values

The function and the filter convert the following values to `true`: `true`, `yes`, `on`, `enable`, `1`.

It converts the following values to `false`: `false`, `no`, `off`, `disable`, `0`.

All text comparisons are case-insensitive, so `True`, `TRUE`, and `true` all work. Spaces at the start or end of the text are ignored.

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
- Any number other than `0` converts to `true`, including decimals like `0.5`. The number `0` converts to `false`.
- The booleans `true` and `false` are returned unchanged.
- Other values, such as `none`, raise an error unless you pass a default.

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
