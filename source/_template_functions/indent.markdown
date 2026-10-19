---
title: "Indent text: indent"
function_name: "indent"
description: "Indents text by a given number of spaces, with options for the first line and blank lines."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - center
  - wordwrap
---

The `indent` filter adds a specified number of spaces to the beginning of each line in a string. By default, the first line and blank lines are not indented, but you can change this behavior with the `first` and `blank` parameters.
This is useful when building multi-line text output that needs proper formatting. For example, you might want to indent a block of YAML data in a notification, format a list of {% term entity %} states for readable display, or align text within a larger multi-line message.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "line 1\nline 2\nline 3" | indent(4) }}'
type: string
output: "line 1\n    line 2\n    line 3"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
indent(
    value: str,
    width: int = 4,
    first: bool = False,
    blank: bool = False,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to indent. Each line (except optionally the first and blank lines) will be prefixed with the specified number of spaces.
  required: true
  type: string
width:
  description: >
    The number of spaces to add to the beginning of each indented line. Defaults to `4`.
  required: false
  default: "4"
  type: integer
first:
  description: >
    Whether to indent the first line as well. Defaults to `false`.
  required: false
  default: "false"
  type: boolean
blank:
  description: >
    Whether to indent blank lines. Defaults to `false`.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Indenting the first line too

Set `first` to `true` to also indent the first line.

{% example %}
template: '{{ "line 1\nline 2" | indent(2, first=true) }}'
title: Indent all lines including the first
type: string
output: "  line 1\n  line 2"
{% endexample %}

## Good to know

- The first line is not indented by default. Pass `first=true` to indent it along with the rest.
- Blank lines are also skipped by default. Pass `blank=true` to pad them too.
- The width is in spaces, not tab characters.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Format a multi-line notification body

Indent a block of status information within a notification message.

{% example %}
template: |
  Home status:
  {{ "Temperature: 22°C\nHumidity: 65%\nPressure: 1013 hPa" | indent(4) }}
type: string
output: |
  Home status:
      Temperature: 22°C
      Humidity: 65%
      Pressure: 1013 hPa
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
