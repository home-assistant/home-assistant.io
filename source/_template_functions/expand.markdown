---
title: "Expand groups into entities: expand"
function_name: "expand"
description: "Expands groups and zones into a sorted list of individual entity state objects."
available_as:
  - function
  - filter
category: state
return_type: list
limited: false
since: "0.117"
related_functions:
  - states
  - is_state
  - area_entities
---

The `expand` template function takes {% term groups %}, {% term zones %}, or lists of entity IDs and expands them into a flat, sorted list of individual {% term entity %} state objects. If you pass in a group, it gives you all the individual entities that belong to that group, with duplicates removed.

This is extremely useful when you want to work with a collection of entities. For example, you might have a group of temperature {% term sensors %} and want to calculate the average, find the highest reading, or count how many are above a threshold. The result is sorted alphabetically by entity ID and contains full state objects, so you can access `.state`, `.entity_id`, `.attributes`, and `.last_changed` on each one.

{% tip %}
A [Group helper](/integrations/group/) can combine entities and expose aggregated values (count, sum, min, max, mean) without any template. Reach for `expand()` when you need to process the individual entities inside a template.
{% endtip %}

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ expand("light.living_room_lights") | map(attribute="entity_id") | list }}'
type: list
output: |
  [
    "light.living_room_ceiling",
    "light.living_room_lamp",
    "light.living_room_strip",
  ]

---
filter: '{{ "light.living_room_lights" | expand | map(attribute="entity_id") | list }}'
type: list
output: |
  [
    "light.living_room_ceiling",
    "light.living_room_lamp",
    "light.living_room_strip",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
expand(
    *args: str | State | list,
) -> list[State]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
args:
  description: >
    One or more entity IDs, state objects, groups, or lists of these. Groups are expanded into their individual entities. Duplicates are removed and the result is sorted by entity ID.
  required: true
  type: [string, list]
{% endfunction_parameters %}

## Good to know

- Returns full state objects, not entity IDs. Add `| map(attribute="entity_id")` to get IDs.
- Entities that do not exist are silently dropped from the result.
- The result is sorted by entity ID and has duplicates removed.
- Nested groups are expanded recursively, so you get every individual entity in the end.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count how many lights are on in a group

{% example %}
template: |
  {{
    expand("light.home_lights")
    | selectattr("state", "eq", "on")
    | list
    | count
  }}
type: integer
output: "5"
{% endexample %}

### Calculate average temperature from a group

Combine `expand` with [`average`](/template-functions/average/) to get the mean temperature across a group of sensors.

{% example %}
template: |
  {{
    expand("sensor.temperature_sensors")
    | map(attribute="state")
    | map("float")
    | average
  }}
type: float
output: "21.3"
{% endexample %}

### Find the entity with the highest value

{% example %}
template: |
  {{
    expand("sensor.temperature_sensors")
    | sort(attribute="state", reverse=true)
    | map(attribute="entity_id")
    | first
  }}
type: string
output: "sensor.kitchen_temperature"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
