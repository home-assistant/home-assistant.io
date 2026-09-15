---
title: "Convert to string: string"
function_name: "string"
description: "Converts a value to its string representation."
available_as:
  - filter
category: type
return_type: string
limited: true
since: "0.7"
related_functions:
  - int
  - float
  - bool
  - typeof
---

The `string` filter converts a value to its string representation. Numbers, booleans, lists, and other types are all converted to their textual form.
While most values in Home Assistant templates are already strings (especially {% term entity %} states), you may encounter numbers or booleans from calculations or attributes that need to be explicitly converted to strings before concatenation or comparison. The `string` filter makes this conversion explicit and clear.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ 42 | string }}'
type: string
output: "42"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | string() -> str
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The value to convert to a string. Any type is accepted.
  required: true
  type: any
{% endfunction_parameters %}

## Good to know

- Booleans become `"True"` and `"False"` with a capital letter, matching Python's output.
- Lists and dictionaries are rendered using Python's `repr` format, so a list shows up as `"[1, 2, 3]"` with single quotes around strings.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Convert a number for display

Ensure a numeric result is treated as a string when building a message.

{% example %}
template: '{{ "Battery level: " ~ (87 | string) ~ "%" }}'
type: string
output: "Battery level: 87%"
{% endexample %}

### Convert a boolean to string

Convert a boolean value to its string form for use in a notification or label.

{% example %}
template: '{{ true | string }}'
type: string
output: "True"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
