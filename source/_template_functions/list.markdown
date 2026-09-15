---
title: "Convert to list: list"
function_name: "list"
description: "Converts a value to a list."
available_as:
  - filter
category: type
return_type: list
limited: true
since: "0.7"
related_functions:
  - set
  - tuple
  - flatten
  - zip
---

The `list` filter converts a value to a list. When applied to a string, it splits the string into a list of individual characters. When applied to a dictionary, it returns a list of the dictionary's keys. When applied to other collections like generators or sets, it materializes them into a list.
This filter is frequently used at the end of a filter chain to materialize the result of [`select`](/template-functions/select/), [`reject`](/template-functions/reject/), [`map`](/template-functions/map/), [`selectattr`](/template-functions/selectattr/), and similar filters into an actual list. These filters return generators (lazy sequences), and converting them to a list is necessary before you can use the result in further operations or display it.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ "hello" | list }}'
type: list
output: "['h', 'e', 'l', 'l', 'o']"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
value | list() -> list
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The value to convert to a list. Strings become lists of characters, dictionaries become lists of keys, and other collections are materialized into lists.
  required: true
  type: any
{% endfunction_parameters %}

## Materializing filter chains

Most template selection filters like [`select`](/template-functions/select/), [`reject`](/template-functions/reject/), and [`map`](/template-functions/map/) return generators. Use the `list` filter to convert them to an actual list.

{% example %}
template: '{{ [1, 2, 3, 4, 5] | select("gt", 3) | list }}'
title: Materialize a select filter result
type: list
output: "[4, 5]"
{% endexample %}

## Good to know

- Use this after [`select`](/template-functions/select/), [`reject`](/template-functions/reject/), [`map`](/template-functions/map/), [`selectattr`](/template-functions/selectattr/), and [`rejectattr`](/template-functions/rejectattr/) so you can count, loop, or slice the result.
- Applied to a string, this produces a list of single characters. Use `split(" ")` for words.
- Applied to a dictionary, this produces a list of keys, not values or pairs.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Get dictionary keys as a list

Extract the keys from a dictionary into a list.

{% example %}
template: '{{ {"name": "Kitchen", "temperature": 21.5} | list }}'
type: list
output: "['name', 'temperature']"
{% endexample %}

### Collect entity names into a list

Gather all light names that are currently on into a list for display.

{% example %}
template: |
  {{
    states.light
    | selectattr("state", "eq", "on")
    | map(attribute="name")
    | list
  }}
type: list
output: "['Living Room', 'Kitchen']"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
