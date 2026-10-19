---
title: "Slice a list into sub-lists: slice"
function_name: "slice"
description: "Slices a list into a specified number of sub-lists of roughly equal size."
available_as:
  - filter
category: collection
return_type: list
limited: true
since: "0.7"
related_functions:
  - batch
  - groupby
  - flatten
---

The `slice` filter divides a list into a specified number of sub-lists of approximately equal size. If the items do not divide evenly, the earlier sub-lists will have one more item than the later ones. You can optionally provide a fill value to pad the shorter sub-lists.

This is useful when you need to distribute items evenly across a fixed number of groups. For example, you might want to split a list of {% term entities %} into columns for display, distribute tasks across multiple workers, or divide a collection into a set number of pages. Note that `slice` differs from [`batch`](/template-functions/batch/): [`batch`](/template-functions/batch/) creates groups of a fixed size, while `slice` creates a fixed number of groups.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ [1, 2, 3, 4, 5] | slice(3) | list }}'
type: list
output: "[[1, 2], [3, 4], [5]]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
slice(
    value: list,
    slices: int,
    fill_with: Any = None,
) -> list[list]
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list to slice into sub-lists.
  required: true
  type: list
slices:
  description: >
    The number of sub-lists to create.
  required: true
  type: integer
fill_with:
  description: >
    A value to use for padding the shorter sub-lists so they all have the same length. If not provided, sub-lists may have different lengths.
  required: false
  type: any
{% endfunction_parameters %}

## Padding with fill_with

Use the `fill_with` parameter so all sub-lists have the same number of items.

{% example %}
template: '{{ [1, 2, 3, 4, 5] | slice(3, "-") | list }}'
type: list
output: '[[1, 2], [3, 4], [5, "-"]]'
{% endexample %}

## Good to know

- You specify the number of sub-lists, not the size of each one. Use [`batch`](/template-functions/batch/) when you want a fixed size per group.
- Returns a generator, so add [`| list`](/template-functions/list/) before iterating twice.
- Earlier sub-lists get the extra items when the count does not divide evenly.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Distribute entities across columns

Split a list of entities into three columns for a balanced display.

{% example %}
template: |
  {% set lights = ["light.kitchen", "light.bedroom", "light.hall",
                   "light.porch", "light.garage", "light.office",
                   "light.bathroom"] %}
  {% for column in lights | slice(3) %}
    Column {{ loop.index }}: {{ column | join(", ") }}
  {% endfor %}
type: string
output: |
  Column 1: light.kitchen, light.bedroom, light.hall
  Column 2: light.porch, light.garage, light.office
  Column 3: light.bathroom
{% endexample %}

### Split items into two halves

Divide a list into two roughly equal parts.

{% example %}
template: |
  {% set items = range(8) | list %}
  {% set halves = items | slice(2) | list %}
  First half: {{ halves[0] | join(", ") }}
  Second half: {{ halves[1] | join(", ") }}
type: string
output: |
  First half: 0, 1, 2, 3
  Second half: 4, 5, 6, 7
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
