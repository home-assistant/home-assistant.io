---
title: "Set symmetric difference: symmetric_difference"
function_name: "symmetric_difference"
description: "Returns items in either list but not in both."
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
  - union
  - set
---

The `symmetric_difference` template function returns a list of items that are in either of the two lists, but not in both. This is the set symmetric difference operation: it gives you the items that are unique to each list, excluding any items that the two lists share.

This is useful when you want to find what has changed between two collections. For example, you might compare today's list of active {% term devices %} with yesterday's to see which devices were added or removed. Or you might compare the members of two groups to find which {% term entities %} are exclusive to each group. It effectively combines the results of two [`difference`](/template-functions/difference/) calls in both directions. Duplicates are removed from the result since it operates as a set operation.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ symmetric_difference([1, 2, 3, 4], [3, 4, 5, 6]) }}'
type: list
output: "[1, 2, 5, 6]"

---
filter: '{{ [1, 2, 3, 4] | symmetric_difference([3, 4, 5, 6]) }}'
type: list
output: "[1, 2, 5, 6]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
symmetric_difference(
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

- Duplicates within either input list are collapsed: the result treats both inputs as sets.
- The order of items in the result is not guaranteed, so do not rely on a specific ordering.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Find devices exclusive to each group

Determine which {% term entities %} are in one group but not the other, and vice versa.

{% example %}
template: |
  {% set morning = ["light.kitchen", "light.hallway", "light.bedroom"] %}
  {% set evening = ["light.hallway", "light.bedroom",
                    "light.porch", "light.living_room"] %}
  {{ symmetric_difference(morning, evening) }}
type: list
output: '["light.kitchen", "light.porch", "light.living_room"]'
{% endexample %}

### Detect changes in a list

Compare a previous and current list to find items that were added or removed.

{% example %}
template: |
  {% set previous = ["sensor.temp_a", "sensor.temp_b", "sensor.temp_c"] %}
  {% set current = ["sensor.temp_b", "sensor.temp_c", "sensor.temp_d"] %}
  {{ symmetric_difference(previous, current) }}
type: list
output: '["sensor.temp_a", "sensor.temp_d"]'
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
