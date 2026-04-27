---
title: "Find regex match at index: regex_findall_index"
function_name: "regex_findall_index"
description: "Finds all occurrences of a regex pattern and returns the match at a specific index."
available_as:
  - filter
category: regex
return_type: string
limited: true
since: "0.7"
related_functions:
  - regex_findall
  - regex_match
  - regex_search
  - regex_replace
---

The `regex_findall_index` template filter finds all occurrences of a regular expression (regex) pattern in a string and returns the match at a specific position (index). A regular expression is a special text pattern that describes what you are looking for. This filter is a shorthand for using [`regex_findall`](/template-functions/regex_findall/) and then picking one result from the list by its index number.

This is useful when you know a sensor value or text contains multiple matches but you only need one specific one. For example, a sensor might report "23.5C / 45% humidity" and you want only the first number (temperature) or the second number (humidity). The index starts at 0 for the first match, 1 for the second, and so on.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "23.5C / 45% humidity" | regex_findall_index("\\d+\\.?\\d*") }}'
type: string
output: "23.5"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
regex_findall_index(
    value: str,
    find: str = "",
    index: int = 0,
    ignorecase: bool = False,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to search within for matches of the regex pattern.
  required: true
  type: string
find:
  description: >
    The regular expression pattern to search for. All non-overlapping matches are found, and the one at the specified index is returned.
  required: true
  type: string
index:
  description: >
    The position of the match to return, starting from 0 for the first match. Defaults to 0 (the first match).
  required: false
  default: "0"
  type: integer
ignorecase:
  description: >
    Set to `true` to make the search case-insensitive.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Selecting different matches

Use the `index` parameter to pick which match you want from the results.

{% example %}
template: |
  {{
    "10:15 - 23.5C, 11:30 - 24.1C"
    | regex_findall_index("\\d+\\.\\d+", index=0)
  }}
  {{
    "10:15 - 23.5C, 11:30 - 24.1C"
    | regex_findall_index("\\d+\\.\\d+", index=1)
  }}
title: First and second decimal number
type: string
output: |
  23.5
  24.1
{% endexample %}

## Good to know

- Indexing starts at 0 for the first match. Out-of-range indexes raise an error.
- Returns the string form of the match. For numbers, convert with [`float`](/template-functions/float/) or [`int`](/template-functions/int/) afterward.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Extract a specific value from a multi-part sensor

When a sensor returns a combined string with multiple values, pick the one you need.

{% example %}
template: |
  {% set state = "Power: 150W | Voltage: 230V | Current: 0.65A" %}
  Voltage: {{ state | regex_findall_index("\\d+\\.?\\d*", index=1) }}V
type: string
output: "Voltage: 230V"
{% endexample %}

### Get the second word in a string

Extract the second capitalized word from a status message.

{% example %}
template: |
  {{
    "Status: Device Online Ready"
    | regex_findall_index("[A-Z][a-z]+", index=1)
  }}
type: string
output: Device
{% endexample %}

### Parse a formatted date component

Extract a specific part from a formatted date string.

{% example %}
template: |
  {% set date_str = "2024-03-15" %}
  Month: {{ date_str | regex_findall_index("\\d+", index=1) }}
type: string
output: "Month: 03"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
