---
title: "Printf-style string formatting: format"
function_name: "format"
description: "Formats a string using printf-style placeholders like %s, %d, and %f."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - replace
  - truncate
---

The `format` filter applies printf-style string formatting to a template string, replacing placeholders like `%s` (string), `%d` (integer), and `%f` (float) with the provided values. This is the same formatting style used in many programming languages.
This is useful when you want to build a formatted string with multiple dynamic values inserted at specific positions. For example, you might want to format a notification message with a sensor name and its value, or create a display string with a number formatted to a specific number of decimal places.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "Hello %s, you have %d messages" | format("Alice", 5) }}'
type: string
output: "Hello Alice, you have 5 messages"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
format(
    value: str,
    *args: Any,
    **kwargs: Any,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The format string containing printf-style placeholders such as `%s` (string), `%d` (integer), or `%f` (float).
  required: true
  type: string
args:
  description: >
    The values to insert into the placeholders, in order.
  required: true
  type: any
{% endfunction_parameters %}

## Formatting numbers

Use `%d` for integers and `%f` for floats. You can control decimal places with `%.Nf`.

{% example %}
template: '{{ "Temperature: %.1f degrees" | format(22.456) }}'
title: Format a float to one decimal place
type: string
output: "Temperature: 22.5 degrees"
{% endexample %}

## Good to know

- Uses printf-style specifiers, not Python f-strings or `{0}` positional placeholders.
- Type must match: `%d` with a non-integer raises an error. Cast with [`int`](/template-functions/int/) or [`float`](/template-functions/float/) first.
- A literal percent sign in the output requires `%%` in the format string.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Build a notification message with sensor data

Create a formatted notification message combining multiple sensor values.

{% example %}
template: |
  {{
    "The %s is %.1f°C with %d%% humidity"
    | format("living room", 22.5, 65)
  }}
type: string
output: "The living room is 22.5°C with 65% humidity"
{% endexample %}

### Format a zero-padded number

Use `%03d` to pad a number with leading zeros.

{% example %}
template: '{{ "Sensor ID: S-%03d" | format(7) }}'
type: string
output: "Sensor ID: S-007"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
