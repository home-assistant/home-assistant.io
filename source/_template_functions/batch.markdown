---
title: "Split list into batches: batch"
function_name: "batch"
description: "Splits a list into smaller batches of a specified size."
available_as:
  - filter
category: collection
return_type: list
limited: true
since: "0.7"
related_functions:
  - slice
  - groupby
  - flatten
---

The `batch` filter splits a list into smaller sub-lists (batches) of a given size. If the last batch has fewer items than the requested size, you can optionally provide a fill value to pad it.

This is useful when you need to process or display items in fixed-size groups. For example, you might want to display {% term entities %} in rows of three on a dashboard, create notification messages that include a limited number of items per message, or iterate through a large list of {% term devices %} in manageable chunks.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ [1, 2, 3, 4, 5] | batch(2) | list }}'
type: list
output: "[[1, 2], [3, 4], [5]]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
batch(
    value: list,
    linecount: int,
    fill_with: Any = None,
) -> list[list]
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list to split into batches.
  required: true
  type: list
linecount:
  description: >
    The number of items per batch.
  required: true
  type: integer
fill_with:
  description: >
    A value to use for padding the last batch if it has fewer items than the batch size. If not provided, the last batch may be shorter than the others.
  required: false
  type: any
{% endfunction_parameters %}

## Padding the last batch

Use the `fill_with` parameter to pad the last batch so all batches have the same number of items.

{% example %}
template: '{{ [1, 2, 3, 4, 5] | batch(3, "N/A") | list }}'
type: list
output: '[[1, 2, 3], [4, 5, "N/A"]]'
{% endexample %}

## Good to know

- Returns a generator, so add [`| list`](/template-functions/list/) before using it with [`length`](/template-functions/length/) or iterating twice.
- Without `fill_with`, the last batch can be smaller than the requested size.
- The batch size must be a positive integer. Passing zero raises an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display entities in rows

Split a list of entity states into rows of three for a formatted display.

{% example %}
template: |
  {% set lights = ["light.kitchen", "light.bedroom", "light.hall",
                   "light.porch", "light.garage"] %}
  {% for row in lights | batch(3) %}
    Row {{ loop.index }}: {{ row | join(", ") }}
  {% endfor %}
type: string
output: |
  Row 1: light.kitchen, light.bedroom, light.hall
  Row 2: light.porch, light.garage
{% endexample %}

### Process devices in chunks

Iterate through a large list of items in manageable batches.

{% example %}
template: |
  {% set items = range(10) | list %}
  {% for chunk in items | batch(4) %}
    Batch {{ loop.index }}: {{ chunk | join(", ") }}
  {% endfor %}
type: string
output: |
  Batch 1: 0, 1, 2, 3
  Batch 2: 4, 5, 6, 7
  Batch 3: 8, 9
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
