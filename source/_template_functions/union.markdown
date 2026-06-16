---
title: "Set union: union"
function_name: "union"
description: "Returns all unique items from both lists (set union)."
available_as:
  - function
  - filter
category: collection
return_type: list
limited: true
since: "2023.1"
related_functions:
  - intersect
  - difference
  - symmetric_difference
  - set
---

The `union` template function combines two lists and returns all unique items from both. This is the set union operation: every item that appears in either list is included once in the result, with duplicates removed.

This is useful when you want to merge two collections without getting duplicate entries. For example, you might want to combine {% term entities %} from two different groups into one list, merge detected objects from multiple {% term sensors %}, or build a complete list of all {% term devices %} across multiple rooms. Since it operates as a set operation, each item appears only once in the result regardless of how many times it appeared in the input lists.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ union([1, 2, 3], [3, 4, 5]) }}'
type: list
output: "[1, 2, 3, 4, 5]"

---
filter: '{{ [1, 2, 3] | union([3, 4, 5]) }}'
type: list
output: "[1, 2, 3, 4, 5]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
union(
    value: list,
    other: list,
) -> list
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The first list. Must be a list or collection.
  required: true
  type: list
other:
  description: >
    The second list. Must be a list or collection.
  required: true
  type: list
{% endfunction_parameters %}

## Good to know

- Duplicates within either input list are removed in the result.
- The order of items is not guaranteed, so do not rely on a specific ordering.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Combine entities from multiple groups

Build a complete list of all unique {% term entities %} across two groups.

{% example %}
template: |
  {% set group_a = expand("group.downstairs_lights")
     | map(attribute="entity_id") | list %}
  {% set group_b = expand("group.upstairs_lights")
     | map(attribute="entity_id") | list %}
  {{ union(group_a, group_b) }}
type: list
output: '["light.kitchen", "light.hallway", "light.bedroom", "light.bathroom"]'
{% endexample %}

### Merge detected objects from multiple cameras

Combine detection lists to get a complete picture of what has been detected across all cameras.

{% example %}
template: |
  {% set cam1 = state_attr("sensor.camera_1", "detected_objects") %}
  {% set cam2 = state_attr("sensor.camera_2", "detected_objects") %}
  {{ union(cam1, cam2) }}
type: list
output: '["person", "car", "dog", "cat"]'
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
