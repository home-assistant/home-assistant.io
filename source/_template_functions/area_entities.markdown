---
title: "Get entities in an area: area_entities"
function_name: "area_entities"
description: "Returns a list of entity IDs associated with a given area."
available_as:
  - function
  - filter
category: area
return_type: "list of strings"
limited: true
since: "2021.11"
related_functions:
  - area_devices
  - area_humidity_sensor
  - area_id
  - area_name
  - area_temperature_sensor
  - areas
---

The `area_entities` template function returns a list of entity IDs that belong to a given {% term area %}. You can specify the area by its name (like _"Living Room"_) or by its internal ID. It gives you all {% term entities %} that have been assigned to that area in Home Assistant.

This is useful when you want to work with all entities in a room at once, without having to list each one by hand. For example, you could turn off every light in the bedroom at bedtime, check if any window in the house is open, or count how many motion sensors are currently active on a {% term floor %}. As you add or remove {% term devices %} from an area in Home Assistant, the list automatically updates, so your {% term automations %} and {% term templates %} always stay in sync with your actual setup.

{% tip %}
Automation actions can target an entire area through the visual editor, no template needed. Reach for `area_entities()` when you need to loop over or filter the entities inside a template expression.
{% endtip %}

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ area_entities("Living Room") }}'
type: list
output: |
  [
    "light.living_room_ceiling",
    "sensor.living_room_temperature",
    "binary_sensor.living_room_motion",
  ]

---
filter: '{{ "Living Room" | area_entities }}'
type: list
output: |
  [
    "light.living_room_ceiling",
    "sensor.living_room_temperature",
    "binary_sensor.living_room_motion",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
area_entities(
    area_name_or_id: str,
) -> list[str]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
area_name_or_id:
  description: >
    The name or ID of the area. You can find area IDs in {% my areas title="**Settings** > **Areas, labels & zones**" %}.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns an empty list when the area has no entities or when the name does not match. It does not raise an error.
- Includes both entities assigned directly to the area and entities inherited from devices in that area.
- The names used in the lookup are case-sensitive, so `"Living Room"` and `"living room"` are not the same.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count the lights that are on in an area

Want to know how many lights are currently on in a room? This combines [`area_entities`](/template-functions/area_entities/) with filters to narrow down to lights and count the ones that are on.

{% example %}
template: |
  {{
    area_entities("Kitchen")
    | select("match", "light.")
    | select("is_state", "on")
    | list
    | count
  }}
type: integer
output: "3"
{% endexample %}

### Check if any motion sensor is active in an area

This checks whether any motion sensor in the hallway is currently detecting motion. Useful as a {% term condition %} in automations.

{% example %}
template: |
  {{
    area_entities("Hallway")
    | select("match", "binary_sensor.")
    | select("is_state", "on")
    | list
    | count > 0
  }}
type: boolean
output: "true"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
