---
title: "Reverse a list or string: reverse"
function_name: "reverse"
description: "Reverses the order of items in a list or characters in a string."
available_as:
  - filter
category: collection
return_type: any
limited: true
since: "0.7"
related_functions:
  - sort
  - first
  - last
---

The `reverse` filter reverses the order of items in a list or characters in a string. When applied to a list, the last item becomes the first and vice versa. When applied to a string, the characters are reversed.

This is useful when you need to display items in the opposite order from how they are stored. For example, you might have a list of recent events sorted oldest-first and want to show them newest-first, or you might want to reverse the order of {% term entities %} returned by [`expand`](/template-functions/expand/) after sorting. It provides a convenient way to flip any sequence without needing to re-sort with `reverse=true`.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ [1, 2, 3, 4, 5] | reverse | list }}'
type: list
output: "[5, 4, 3, 2, 1]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
reverse(
    value: list | str,
) -> list | str
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list or string to reverse. For lists, the result is a reverse iterator (use `| list` to convert back to a list). For strings, a reversed string is returned directly.
  required: true
  type: any
{% endfunction_parameters %}

## Reversing a string

When applied to a string, the characters are reversed directly.

{% example %}
template: '{{ "hello" | reverse }}'
type: string
output: "olleh"
{% endexample %}

## Good to know

- Returns a reverse iterator for lists. Add [`| list`](/template-functions/list/) before counting or accessing by index.
- On strings, the characters are reversed, which can break multi-byte sequences like emoji in some cases.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display entities in reverse order

Reverse the alphabetical order of expanded entities.

{% example %}
template: |
  {{
    expand("group.all_lights")
    | sort(attribute="entity_id")
    | reverse
    | map(attribute="entity_id")
    | list
  }}
type: list
output: '["light.porch", "light.kitchen", "light.bedroom"]'
{% endexample %}

### Show most recent events first

Reverse a chronologically sorted list so the most recent items appear first.

{% example %}
template: |
  {% set events = ["06:00 Motion detected", "07:30 Door opened",
                   "08:15 Light turned on"] %}
  {% for event in events | reverse %}
    {{ event }}
  {% endfor %}
type: string
output: |
  08:15 Light turned on
  07:30 Door opened
  06:00 Motion detected
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
