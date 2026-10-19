---
title: "Get areas on a floor: floor_areas"
function_name: "floor_areas"
description: "Returns a list of area IDs that belong to a given floor."
available_as:
  - function
  - filter
category: floor
return_type: list
limited: true
since: "2024.1"
related_functions:
  - floor_entities
  - floor_id
  - floor_name
  - floors
  - area_entities
  - area_name
---

The `floor_areas` template function returns a list of {% term area %} IDs that belong to a given {% term floor %}. You can specify the floor by its name (like _"Ground Floor"_) or by its internal ID. It gives you all areas that have been assigned to that floor in Home Assistant.

This is useful when you want to work with all areas on a particular floor at once. For example, you could turn off every light on the ground floor at bedtime, check if any room upstairs has an open window, or count how many rooms are on each floor. As you add or remove areas from a floor in Home Assistant, the list automatically updates, so your {% term automations %} and {% term templates %} always stay in sync with your actual setup.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ floor_areas("Ground Floor") }}'
type: list
output: |
  [
    "living_room",
    "kitchen",
    "hallway",
  ]

---
filter: '{{ "Ground Floor" | floor_areas }}'
type: list
output: |
  [
    "living_room",
    "kitchen",
    "hallway",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
floor_areas(
    floor_id_or_name: str,
) -> list[str]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
floor_id_or_name:
  description: >
    The name or ID of the floor. You can find floor IDs in {% my areas title="**Settings** > **Areas, labels & zones**" %}.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns an empty list when the floor does not exist or has no areas assigned.
- Returns area IDs, not human-readable names. Use [`area_name`](/template-functions/area_name/) to get the names.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count how many areas are on a floor

Find out how many areas are assigned to a given floor.

{% example %}
template: '{{ floor_areas("Ground Floor") | count }}'
type: integer
output: "3"
{% endexample %}

### List the area names on a floor

Loop through all areas on a floor and display their names using [`area_name`](/template-functions/area_name/).

{% example %}
template: |
  {% for area_id in floor_areas("Ground Floor") %}
    {{ area_name(area_id) }}
  {% endfor %}
type: string
output: |
  Living Room
  Kitchen
  Hallway
{% endexample %}

### Check if any area on a floor has motion

Loop through all areas on a floor and check if any has an active motion {% term sensor %}. This uses [`area_entities`](/template-functions/area_entities/) to get the entities for each area.

{% example %}
template: |
  {% for area_id in floor_areas("First Floor") %}
    {% if area_entities(area_id)
        | select("match", "binary_sensor.")
        | select("is_state", "on")
        | list
        | count > 0 %}
      Motion in {{ area_name(area_id) }}!
    {% endif %}
  {% endfor %}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
