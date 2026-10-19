---
title: "Get entities on a floor: floor_entities"
function_name: "floor_entities"
description: "Returns a list of entity IDs for all entities on a given floor."
available_as:
  - function
  - filter
category: floor
return_type: list
limited: true
since: "2024.1"
related_functions:
  - floor_areas
  - floor_id
  - floor_name
  - floors
  - area_entities
---

The `floor_entities` template function returns a list of {% term entity %} IDs for all entities on a given {% term floor %}. You can specify the floor by its name (like _"Ground Floor"_) or by its internal ID. It gathers entities from every {% term area %} assigned to that floor, giving you a single flat list.

This is useful when you want to work with all entities across an entire floor at once, without having to loop through each area individually. For example, you could turn off every light on the upstairs floor at bedtime, count how many {% term sensors %} are active on the ground floor, or check if any window on a particular floor is open. As you add or remove {% term devices %} and areas from a floor in Home Assistant, the list automatically updates, so your {% term automations %} and {% term templates %} always stay in sync.

{% tip %}
Automation actions can target an entire floor through the visual editor, no template needed. Reach for `floor_entities()` when you need to loop over or filter the entities inside a template expression.
{% endtip %}

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ floor_entities("Ground Floor") }}'
type: list
output: |
  [
    "light.living_room_ceiling",
    "sensor.living_room_temperature",
    "light.kitchen_counter",
    "sensor.kitchen_humidity",
    "light.hallway",
  ]

---
filter: '{{ "Ground Floor" | floor_entities }}'
type: list
output: |
  [
    "light.living_room_ceiling",
    "sensor.living_room_temperature",
    "light.kitchen_counter",
    "sensor.kitchen_humidity",
    "light.hallway",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
floor_entities(
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

- Entities without an area (or whose area is not assigned to a floor) are not included.
- The result aggregates entities across every area on the floor, including entities inherited from devices in those areas.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count the lights that are on across a floor

Want to know how many lights are currently on across an entire floor? This filters the floor's entities down to lights and counts the ones that are on.

{% example %}
template: |
  {{
    floor_entities("Ground Floor")
    | select("match", "light.")
    | select("is_state", "on")
    | list
    | count
  }}
type: integer
output: "3"
{% endexample %}

### Check if any window is open on a floor

This checks whether any window sensor on the first floor is currently open. Useful as a {% term condition %} in automations, for example to prevent turning on the heating if a window is open upstairs.

{% example %}
template: |
  {{
    floor_entities("First Floor")
    | select("match", "binary_sensor.")
    | select("is_state", "on")
    | list
    | count > 0
  }}
type: boolean
output: "true"
{% endexample %}

### Turn off all lights on a floor

Use `floor_entities` in an {% term automation %} action to turn off every light on a given floor. This is handy for a "goodnight" routine that shuts down an entire floor.

{% example %}
action: |
  action:
    - action: light.turn_off
      target:
        entity_id: >
          {{
            floor_entities("First Floor")
            | select("match", "light.")
            | list
          }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
