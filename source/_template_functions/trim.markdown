---
title: "Strip whitespace: trim"
function_name: "trim"
description: "Strips leading and trailing whitespace (or specified characters) from a string."
available_as:
  - filter
category: strings
return_type: string
limited: true
since: "0.7"
related_functions:
  - replace
  - striptags
---

The `trim` filter removes leading and trailing whitespace from a string. You can optionally specify which characters to strip instead of whitespace.
This is useful when working with {% term sensor %} values or other data that may include extra spaces or unwanted characters at the beginning or end. For example, some {% term devices %} report states with trailing spaces, or you may need to remove surrounding quotes or other characters before processing a value further.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "  hello world  " | trim }}'
type: string
output: hello world
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
trim(
    value: str,
    chars: str | None = None,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The string to strip. Leading and trailing whitespace (or specified characters) will be removed.
  required: true
  type: string
chars:
  description: >
    A string of characters to strip from both ends. If not provided, whitespace is stripped.
  required: false
  type: string
{% endfunction_parameters %}

## Stripping specific characters

Pass a string of characters to remove from both ends instead of whitespace.

{% example %}
template: '{{ "---hello---" | trim("-") }}'
title: Strip dashes from both ends
type: string
output: hello
{% endexample %}

## Good to know

- Only affects the beginning and end of the string. Whitespace between words is kept intact. Use [`replace`](/template-functions/replace/) for inner cleanup.
- When you pass the `chars` argument, every character in that string is treated as a candidate to strip. `trim("-_")` removes both dashes and underscores from each end.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Clean up a sensor value

Remove extra whitespace from a sensor state before using it in a comparison.

{% example %}
template: |
  {% set status = states("sensor.status") | trim %}
  {% if status == "ready" %}
    System is ready
  {% endif %}
type: string
output: "System is ready"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
