---
title: "Flatten nested lists: flatten"
function_name: "flatten"
description: "Flattens nested lists into a single flat list."
available_as:
  - function
  - filter
category: collection
return_type: list
limited: true
since: "2023.1"
related_functions:
  - shuffle
  - combine
  - expand
---

The `flatten` template function takes a list that contains other lists (nested lists) and flattens them into a single, flat list. All items from all levels of nesting are brought up to the top level, which is useful for working with deeply nested data structures.

This is useful when you collect data from multiple sources that each return a list, and you end up with a list of lists. For example, you might gather the attributes from several {% term sensors %} that each return a list of values, or you might combine multiple groups and want a single flat list of all {% term entities %}. The optional `levels` parameter lets you control how many levels of nesting to flatten, so you can partially flatten a deeply nested structure if needed.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ flatten([[1, 2], [3, [4, 5]]]) }}'
type: list
output: "[1, 2, 3, 4, 5]"

---
filter: '{{ [[1, 2], [3, [4, 5]]] | flatten }}'
type: list
output: "[1, 2, 3, 4, 5]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
flatten(
    value: list,
    levels: int | None = None,
) -> list
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The nested list to flatten. Must be a list or collection.
  required: true
  type: list
levels:
  description: >
    The number of levels of nesting to flatten. If not provided, all levels are flattened completely. Set to `1` to only flatten one level deep.
  required: false
  type: integer
{% endfunction_parameters %}

## Controlling flatten depth

By default, `flatten` removes all nesting. Use the `levels` parameter to control how deep the flattening goes.

{% example %}
template: '{{ [[1, [2, 3]], [4, [5, 6]]] | flatten(levels=1) }}'
type: list
output: "[1, [2, 3], 4, [5, 6]]"
{% endexample %}

## Good to know

- Without `levels`, every layer of nesting is removed, which can produce surprising results on deeply structured data.
- Only nested lists are unpacked. Dictionaries and other collections inside the list are kept as-is.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Flatten sensor attributes from multiple entities

When multiple {% term sensors %} each return a list in an attribute, combine and flatten them into one list.

{% example %}
template: |
  {{
    [
      state_attr("sensor.room_a", "device_list"),
      state_attr("sensor.room_b", "device_list")
    ] | flatten
  }}
type: list
output: '["device_1", "device_2", "device_3", "device_4"]'
{% endexample %}

### Flatten and count unique items

Flatten a nested structure and then count the unique values.

{% example %}
template: |
  {{ [[1, 2, 3], [2, 3, 4], [4, 5]] | flatten | unique | list | count }}
type: integer
output: "5"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
