---
title: "Remove duplicate values: unique"
function_name: "unique"
description: "Removes duplicate values from a list, keeping only unique items."
available_as:
  - filter
category: collection
return_type: list
limited: true
since: "0.7"
related_functions:
  - set
  - sort
  - select
  - groupby
---

The `unique` filter removes duplicate values from a list, keeping only the first occurrence of each value. Unlike converting to a [`set`](/template-functions/set/), the `unique` filter preserves the original order of items. You can also deduplicate based on a specific attribute of each item.

This is useful when you have a list that may contain duplicates and you want to remove them while keeping the order intact. For example, you might collect states from multiple {% term entities %} and want to know the distinct states that exist, or you might merge multiple lists of {% term devices %} and need to eliminate duplicates. The `attribute` parameter is especially helpful when working with lists of objects, letting you deduplicate by a specific property.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ [1, 2, 2, 3, 1, 4] | unique | list }}'
type: list
output: "[1, 2, 3, 4]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
unique(
    value: list,
    case_sensitive: bool = False,
    attribute: str | None = None,
) -> list
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list to remove duplicates from.
  required: true
  type: list
case_sensitive:
  description: >
    If `true`, "On" and "on" are treated as different values. Defaults to `false`.
  required: false
  default: "false"
  type: boolean
attribute:
  description: >
    Deduplicate based on this attribute of each item. Only the first item with each unique attribute value is kept.
  required: false
  type: string
{% endfunction_parameters %}

## Unique by attribute

Deduplicate a list of objects based on a specific attribute, keeping only the first object with each unique attribute value.

{% example %}
template: |
  {{
    expand("group.all_sensors")
    | unique(attribute="state")
    | map(attribute="entity_id")
    | list
  }}
title: One sensor per unique state value
type: list
output: '["sensor.kitchen_temp", "sensor.bedroom_temp"]'
{% endexample %}

## Good to know

- Unlike Python's standard behavior, this filter is case-insensitive by default. Pass `case_sensitive=true` if you want `"On"` and `"on"` treated as different values.
- Returns a generator, so pipe the result through [`list`](/template-functions/list/) if you need to loop over it more than once or display it directly.
- The first occurrence of each value wins, preserving the original list order.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Find distinct states across entities

Get the unique state values from a group of entities.

{% example %}
template: |
  {{
    expand("group.all_lights")
    | map(attribute="state")
    | unique
    | list
  }}
type: list
output: '["on", "off"]'
{% endexample %}

### Deduplicate a merged list

When combining entities from multiple sources, remove any that appear more than once.

{% example %}
template: |
  {% set list1 = ["light.kitchen", "light.bedroom", "light.hall"] %}
  {% set list2 = ["light.bedroom", "light.porch", "light.kitchen"] %}
  {{ (list1 + list2) | unique | list }}
type: list
output: '["light.kitchen", "light.bedroom", "light.hall", "light.porch"]'
{% endexample %}

### Case-sensitive deduplication

By default, `unique` is case-insensitive. Use `case_sensitive=true` to treat different cases as distinct values.

{% example %}
template: |
  {{ ["On", "on", "OFF", "off"] | unique(case_sensitive=true) | list }}
type: list
output: '["On", "on", "OFF", "off"]'
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
