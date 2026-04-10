---
title: "Get floor name: floor_name"
function_name: "floor_name"
description: "Returns the friendly name of a floor from its ID, area name, device ID, or entity ID."
available_as:
  - function
  - filter
category: floor
return_type: string
limited: false
since: "2024.1"
related_functions:
  - floor_id
  - floor_areas
  - floor_entities
  - floors
  - area_name
---

The `floor_name` template function returns the friendly, human-readable name of a {% term floor %}. You can give it a floor ID, an {% term area %} name, an {% term entity %} ID, or a {% term device %} ID, and it tells you the name of the floor it belongs to.

This is especially useful for building dynamic messages and {% term notifications %}. Instead of showing a technical floor ID like `ground_floor`, you can show the actual name _"Ground Floor"_ that you (or whoever receives the message) recognize. For example, when a leak sensor triggers, your notification can say _"Water detected on the Ground Floor"_ by looking up the floor name of the {% term sensor %} that triggered.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ floor_name("ground_floor") }}'
type: string
output: "Ground Floor"

---
filter: '{{ "ground_floor" | floor_name }}'
type: string
output: "Ground Floor"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
floor_name(
    lookup_value: str,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
lookup_value:
  description: >
    The floor ID, area name, entity ID, or device ID to look up. Returns the friendly name of the floor, or `None` if no matching floor is found.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `None` when the lookup value does not match a floor.
- The name changes when you rename the floor, so the output can shift over time.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Get the floor name from an entity

Find out which floor a sensor is on by passing its entity ID.

{% example %}
template: '{{ floor_name("sensor.living_room_temperature") }}'
type: string
output: "Ground Floor"
{% endexample %}

### Use in a notification with the trigger floor

A common pattern: when a sensor triggers an {% term automation %}, include the floor name in the notification. This works with any {% term trigger %} that provides `trigger.entity_id`, such as state or leak triggers.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        title: >
          {{ floor_name(trigger.entity_id) }}
        message: >
          Alert on {{ floor_name(trigger.entity_id) }}
{% endexample %}

### List all floor names

Loop through all floors and display their names.

{% example %}
template: |
  {% for id in floors() %}
    {{ floor_name(id) }}
  {% endfor %}
type: string
output: |
  Ground Floor
  First Floor
  Basement
{% endexample %}

### Show the floor of each area

Build a summary showing which floor each area belongs to, using `floor_name` as a way to resolve the human-readable floor for each area.

{% example %}
template: |
  {% for id in areas() %}
    {{ area_name(id) }}: {{ floor_name(id) }}
  {% endfor %}
type: string
output: |
  Living Room: Ground Floor
  Kitchen: Ground Floor
  Bedroom: First Floor
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
