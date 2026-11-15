---
title: "Expand groups into entities: expand"
function_name: "expand"
description: "Expands groups and zones into a list of individual entity state objects."
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

The `expand` template function takes {% term groups %}, {% term zones %}, or lists of entity IDs and expands them into a flat list of individual {% term entity %} state objects. If you pass in a group, it gives you all the individual entities that belong to that group, with duplicates removed.

This is extremely useful when you want to work with a collection of entities. For example, you might have a group of temperature {% term sensors %} and want to calculate the average, find the highest reading, or count how many are above a threshold. The result contains full state objects, so you can access `.state`, `.entity_id`, `.attributes`, and `.last_changed` on each one.

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
    One or more entity IDs, state objects, groups, or lists of these. Groups are expanded into their individual entities. Duplicates are removed.
  required: true
  type: [string, list]
{% endfunction_parameters %}

## Good to know

- Returns full state objects, not entity IDs. Add `| map(attribute="entity_id")` to get IDs.
- Entities that do not exist are silently dropped from the result.
- The result has duplicates removed, but it isn't sorted. To sort it by entity ID, add `| sort(attribute="entity_id")`.
- The group itself isn't part of the result, only its members. This also applies to groups that you create with the [Group](/integrations/group/) integration, such as a light group.
- A zone expands to the persons in that zone.
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

States are text, so sorting the states from high to low puts `"9"` above `"21"`. To sort by value, this example pairs each value, as a number, with its entity ID. It then sorts the pairs from high to low and picks the first one. Sensors without a number, such as unavailable ones, are left out. If no sensor has a number, the template returns nothing.

{% example %}
template: |
  {% set sensors = expand("sensor.temperature_sensors")
    | selectattr("state", "is_number") | list %}
  {% if sensors %}
  {{
    zip(
      sensors | map(attribute="state") | map("float"),
      sensors | map(attribute="entity_id")
    )
    | sort(reverse=true)
    | first
    | last
  }}
  {% endif %}
type: string
output: "sensor.kitchen_temperature"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
