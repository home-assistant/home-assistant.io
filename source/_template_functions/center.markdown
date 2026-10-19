---
title: "Center text in a field: center"
function_name: "center"
description: "Centers a string in a field of a given width, padding with spaces."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - indent
  - truncate
---

The `center` filter centers a string within a field of a specified width by padding it with spaces on both sides. If the string is already longer than the given width, it is returned unchanged.
This can be useful when you need to align text for fixed-width displays or when building formatted text output. For example, you might want to center a title in a notification or format text for a display that expects a fixed number of characters.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "hello" | center(20) }}'
type: string
output: "       hello        "
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
center(
    value: str,
    width: int = 80,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to center within the field.
  required: true
  type: string
width:
  description: >
    The total width of the field. The string is padded with spaces on both sides to fill this width. Defaults to `80`.
  required: false
  default: "80"
  type: integer
{% endfunction_parameters %}

## Good to know

- The default width is 80 characters, not the length of the input.
- If the string is already as long or longer than the width, it is returned unchanged with no padding or truncation.
- When the remaining space is odd, one extra space is added on the right side.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Center a heading in formatted text

Create a centered heading within a block of formatted text for a notification.

{% example %}
template: '{{ "hello" | center(20) }}'
type: string
output: '       hello        '
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
