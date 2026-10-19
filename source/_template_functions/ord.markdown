---
title: "Unicode code point: ord"
function_name: "ord"
description: "Returns the Unicode code point for a single character."
available_as:
  - filter
category: functional
return_type: integer
limited: true
since: "0.7"
related_functions: []
---

The `ord` filter returns the Unicode code point (an integer) for a single character. It wraps Python's built-in `ord()` function. For example, `A` becomes `65`, and `a` becomes `97`.

This is useful when you need to work with character codes in {% term templates %}. For instance, you might need to convert characters to their numeric representation for protocol communication, compare characters numerically, or perform calculations based on character positions in the alphabet.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "A" | ord }}'
type: integer
output: "65"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
ord(
    character: str,
) -> int
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
character:
  description: >
    A single character to convert to its Unicode code point. Must be a string of length 1.
  required: true
  type: string
{% endfunction_parameters %}

## Common character codes

A few commonly used character codes for reference:

{% example %}
template: |
  A = {{ "A" | ord }}, Z = {{ "Z" | ord }}
  a = {{ "a" | ord }}, z = {{ "z" | ord }}
  0 = {{ "0" | ord }}, 9 = {{ "9" | ord }}
title: ASCII character codes
type: string
output: |
  A = 65, Z = 90
  a = 97, z = 122
  0 = 48, 9 = 57
{% endexample %}

## Good to know

- The input must be exactly one character. A string longer than one character raises an error.
- Works with any Unicode character, not just ASCII. The code point can be a large number for emoji or non-Latin scripts.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Check if a character is uppercase

Use the code point to determine if a character is an uppercase letter.

{% example %}
template: |
  {% set char = "H" %}
  {% set code = char | ord %}
  {{ code >= 65 and code <= 90 }}
title: Is uppercase check
type: boolean
output: "true"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
