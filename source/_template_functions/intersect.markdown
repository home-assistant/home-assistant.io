---
title: "Set intersection: intersect"
function_name: "intersect"
description: "Returns items common to both lists (set intersection)."
available_as:
  - function
  - filter
category: collection
return_type: list
limited: true
since: "2023.1"
related_functions:
  - difference
  - union
  - symmetric_difference
  - set
---

The `intersect` template function returns a list of items that appear in both of the two lists you provide. This is the set intersection operation: only items that exist in both lists are included in the result.

This is useful when you want to find what two collections have in common. For example, you might have a list of {% term entities %} that are on and a list of entities in a specific room, and you want to know which entities in that room are currently on. Or you might want to find which {% term devices %} appear in two different groups, or determine which family members are in both the "home" zone and the "allowed" list. Duplicates are removed from the result since it operates as a set operation.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ intersect([1, 2, 3, 4], [3, 4, 5, 6]) }}'
type: list
output: "[3, 4]"

---
filter: '{{ [1, 2, 3, 4] | intersect([3, 4, 5, 6]) }}'
type: list
output: "[3, 4]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
intersect(
    value: list,
    other: list,
) -> list
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The first list to compare. Must be a list or collection.
  required: true
  type: list
other:
  description: >
    The second list to compare against. Must be a list or collection.
  required: true
  type: list
{% endfunction_parameters %}

## Good to know

- Duplicates are removed in the result because this works as a set operation.
- Order is not preserved. Add [`| sort`](/template-functions/sort/) if you need a consistent order.
- Returns an empty list when the two lists share nothing.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Find entities that are in both groups

Determine which {% term entities %} appear in two different groups.

{% example %}
template: |
  {% set group_a = expand("light.downstairs_lights")
     | map(attribute="entity_id") | list %}
  {% set group_b = expand("light.automated_lights")
     | map(attribute="entity_id") | list %}
  {{ intersect(group_a, group_b) }}
type: list
output: '["light.kitchen", "light.hallway"]'
{% endexample %}

### Find common items between two sensor lists

When two sensors each report a list of detected items, find which items are detected by both.

{% example %}
template: |
  {% set cam1 = state_attr("sensor.camera_1", "detected_objects") %}
  {% set cam2 = state_attr("sensor.camera_2", "detected_objects") %}
  {{ intersect(cam1, cam2) }}
type: list
output: '["person", "car"]'
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
