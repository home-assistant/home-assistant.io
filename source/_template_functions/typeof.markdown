---
title: "Get the type of a value: typeof"
function_name: "typeof"
description: "Returns the type name of a value as a string."
available_as:
  - function
  - filter
category: type
return_type: string
limited: true
since: "2023.4"
related_functions:
  - is_number
  - float
  - int
  - bool
---

The `typeof` template function returns the type name of a value as a string. It tells you what kind of data you are working with, such as `str`, `int`, `float`, `list`, `dict`, or `bool`. This is the Python class name of the value.

This is primarily useful for debugging {% term templates %}. When a template does not behave as expected, it is often because a value is a different type than you assumed. For example, you might think a sensor value is a number, but it is actually a string. Or an attribute you expected to be a list is actually `None`. Using `typeof` lets you inspect the actual types at runtime so you can figure out what is going on and write the correct conversion or comparison.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ typeof(42) }}'
type: string
output: "int"

---
filter: '{{ states("sensor.temperature") | typeof }}'
type: string
output: "str"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
typeof(
    value: Any,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The value whose type name to return. Returns the Python class name as a string.
  required: true
  type: any
{% endfunction_parameters %}

## Common type names

Here are the type names you will encounter most often:

- `str` for text (for example, `hello` or the result of `states("...")`)
- `int` for whole numbers (for example, `42` or `states("...") | int`)
- `float` for decimal numbers (for example, `21.5` or `states("...") | float`)
- `bool` for `true` or `false`
- `list` for a list of values (for example, `[1, 2, 3]`)
- `dict` for a mapping (for example, `{"a": 1}`)
- `NoneType` for `None`

## Good to know

- Results are Python class names like `str`, `int`, or `NoneType`. They are not Jinja or YAML type names.
- All entity states are `str`, regardless of what they look like. A temperature sensor returning `21.5` still reports as `str` until you convert it.
- Intended mainly for debugging. In production templates, prefer type tests like `is number` or conversion functions like [`float`](/template-functions/float/).

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Debug a sensor state type

Check what type a state value is. Since all entity states are strings, this confirms the need for type conversion before math.

{% example %}
template: |
  State type: {{ states("sensor.temperature") | typeof }}
  After float: {{ (states("sensor.temperature") | float) | typeof }}
type: string
output: |
  State type: str
  After float: float
{% endexample %}

### Check the type of an attribute

{% term Entity %} attributes can be various types. Use `typeof` to inspect what you are working with.

{% example %}
template: '{{ state_attr("climate.living_room", "hvac_modes") | typeof }}'
type: string
output: "list"
{% endexample %}

### Conditional logic based on type

Handle different types differently in a {% term template %}.

{% example %}
template: |
  {% set val = state_attr("sensor.data", "reading") %}
  {% if val | typeof == "list" %}
    Got {{ val | length }} items
  {% else %}
    Single value: {{ val }}
  {% endif %}
type: string
output: "Got 3 items"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
