---
title: "Set difference: difference"
function_name: "difference"
description: "Returns items in the first list but not in the second (set difference)."
available_as:
  - function
  - filter
category: collection
return_type: list
limited: true
since: "2023.1"
related_functions:
  - intersect
  - union
  - symmetric_difference
  - set
---

The `difference` template function returns a list of items that are in the first list but not in the second. This is the set difference operation: it removes from the first list any items that also appear in the second list.

This is useful when you want to exclude certain items from a collection. For example, you might have all the {% term entities %} in a room and want to remove the ones that are already off, or you might have a list of all family members and want to exclude those who are currently home. You can also use it to find which {% term devices %} have been removed from a group, or to filter out known items from a detection list. Duplicates are removed from the result since it operates as a set operation.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ difference([1, 2, 3, 4, 5], [3, 4]) }}'
type: list
output: "[1, 2, 5]"

---
filter: '{{ [1, 2, 3, 4, 5] | difference([3, 4]) }}'
type: list
output: "[1, 2, 5]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
difference(
    value: list,
    other: list,
) -> list
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    The first list (the base set). Must be a list or collection.
  required: true
  type: list
other:
  description: >
    The second list (items to remove). Must be a list or collection.
  required: true
  type: list
{% endfunction_parameters %}

## Good to know

- Duplicates are removed in the result because this works as a set operation.
- Order is not preserved. Add [`| sort`](/template-functions/sort/) if you need a consistent order.
- This is one-sided. Items only in the second list do not appear in the result. Use [`symmetric_difference`](/template-functions/symmetric_difference/) to get items unique to either side.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Find entities not in a specific group

Determine which lights are in one group but not another.

{% example %}
template: |
  {% set home_lights = expand("light.home_lights")
     | map(attribute="entity_id") | list %}
  {% set automated = expand("light.automated_lights")
     | map(attribute="entity_id") | list %}
  {{ difference(home_lights, automated) }}
type: list
output: '["light.porch", "light.garage"]'
{% endexample %}

### Exclude unavailable entities

Filter out entities that are currently unavailable from a list.

{% example %}
template: |
  {% set all_sensors = ["sensor.temp_a", "sensor.temp_b", "sensor.temp_c"] %}
  {% set unavailable = all_sensors | select("is_state", "unavailable") | list %}
  {{ difference(all_sensors, unavailable) }}
type: list
output: '["sensor.temp_a", "sensor.temp_c"]'
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
