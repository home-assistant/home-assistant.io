---
title: "Get floor ID: floor_id"
function_name: "floor_id"
description: "Returns the floor ID for a given floor name, area name, device ID, or entity ID."
available_as:
  - function
  - filter
category: floor
return_type: string
limited: false
since: "2024.1"
related_functions:
  - floor_name
  - floor_areas
  - floor_entities
  - floors
  - area_id
---

The `floor_id` template function returns the unique floor ID for a given floor name, {% term area %} name, {% term device %} ID, or {% term entity %} ID. Every {% term floor %} in Home Assistant has an internal ID that stays the same even if you rename the floor, and this function lets you look it up.

This is useful when you need the floor ID to pass to other floor functions like [`floor_areas`](/template-functions/floor_areas/) or [`floor_entities`](/template-functions/floor_entities/), or when you want to find out which floor a particular entity, device, or area belongs to. For example, you could use it in an {% term automation %} to determine which floor a motion {% term sensor %} is on and then act on all devices on that floor.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ floor_id("Ground Floor") }}'
type: string
output: "ground_floor"

---
filter: '{{ "Ground Floor" | floor_id }}'
type: string
output: "ground_floor"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
floor_id(
    lookup_value: str,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
lookup_value:
  description: >
    The floor name, area name, entity ID, or device ID to look up. If a floor name is given, the matching floor ID is returned. If an area name, entity ID, or device ID is given, the floor ID of the floor that area, entity, or device belongs to is returned.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `None` when the lookup value does not match a floor, or when the area, entity, or device is not assigned to a floor.
- An entity gets its floor through its area, so an entity with no area returns `None`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Find the floor of an entity

Look up which floor a specific entity belongs to.

{% example %}
template: '{{ floor_id("sensor.living_room_temperature") }}'
type: string
output: "ground_floor"
{% endexample %}

### Find the floor of an area

Look up which floor a specific area is assigned to by passing its name.

{% example %}
template: '{{ floor_id("Kitchen") }}'
type: string
output: "ground_floor"
{% endexample %}

### Group areas by floor

Combine `floor_id` with [`areas`](/template-functions/areas/) to find out which areas belong to each floor.

{% example %}
template: |
  {% for area_id in areas() %}
    {{ area_name(area_id) }} is on {{ floor_name(floor_id(area_id)) }}
  {% endfor %}
type: string
output: |
  Living Room is on Ground Floor
  Kitchen is on Ground Floor
  Bedroom is on First Floor
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
