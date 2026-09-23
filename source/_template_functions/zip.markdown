---
title: "Combine iterables: zip"
function_name: "zip"
description: "Zips multiple iterables together into a list of tuples, pairing elements by position."
available_as:
  - function
category: functional
return_type: list
limited: true
since: "2024.7"
related_functions:
  - combine
---

The `zip` template function combines two or more lists (or other collections) element by element, producing a list of tuples where each tuple contains one item from each input list. It works just like Python's built-in `zip()` function. If the lists are different lengths, the result is truncated to the length of the shortest list.

This is useful when you have related data in separate lists that you need to pair up. For example, you might have a list of room names and a list of temperature readings, and you want to combine them so each room is paired with its temperature. Or you might want to iterate over two lists in parallel to build a formatted output.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ zip(["a", "b", "c"], [1, 2, 3]) | list }}'
type: list
output: "[('a', 1), ('b', 2), ('c', 3)]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
zip(
    *iterables: Iterable,
) -> list[tuple]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
iterables:
  description: >
    Two or more iterables to zip together. Each iterable contributes one element per tuple in the result.
  required: true
  type: list
{% endfunction_parameters %}

## Pairing related data

When you have data split across multiple lists, `zip` brings them together.

{% example %}
template: |
  {% set rooms = ["Living room", "Bedroom", "Kitchen"] %}
  {% set temps = [21.5, 19.8, 22.3] %}
  {% for room, temp in zip(rooms, temps) %}
    {{ room }}: {{ temp }}°C
  {% endfor %}
title: Pair rooms with temperatures
type: string
output: |
  Living room: 21.5°C
  Bedroom: 19.8°C
  Kitchen: 22.3°C
{% endexample %}

## Unequal length lists

When lists have different lengths, `zip` stops at the shortest one.

{% example %}
template: '{{ zip([1, 2, 3], ["a", "b"]) | list }}'
title: Shorter list wins
type: list
output: "[(1, 'a'), (2, 'b')]"
{% endexample %}

## Good to know

- Returns an iterator. Pipe the result through [`list`](/template-functions/list/) if you need to reuse it or display it directly.
- Input lists of different lengths are silently truncated to the shortest. Extra items from the longer lists are dropped without warning.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Build a formatted summary

Combine entity names with their states to create a summary string.

{% example %}
template: |
  {% set names = ["Front door", "Back door", "Garage"] %}
  {% set statuses = ["closed", "open", "closed"] %}
  {% for name, status in zip(names, statuses) %}
    {{ name }} is {{ status }}
  {% endfor %}
type: string
output: |
  Front door is closed
  Back door is open
  Garage is closed
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
