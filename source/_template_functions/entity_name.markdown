---
title: "Get entity name: entity_name"
function_name: "entity_name"
description: "Gets the name of an entity from its entity ID, without the name of its device."
available_as:
  - function
  - filter
category: entity
return_type: "string or None"
limited: false
since: "2026.4"
related_functions:
  - states
  - is_hidden_entity
  - area_name
---

The `entity_name` template function returns the name of an {% term entity %} given its entity ID, without the name of its {% term device %}. For example, for a temperature sensor of the device _Living room sensor_, it returns _Temperature_. It looks up the name in the {% term entity %} registry first, and falls back to the friendly name of the state object if the entity is not registered. If the entity does not exist at all, it returns `None`.

This is helpful whenever you want to display a human-readable name instead of a raw entity ID. For example, you might want to build a {% term notification %} that says "Temperature is 21 °C" instead of "sensor.living_room_temperature is 21 °C". It is also useful when looping over a list of entity IDs and you need to present their names to a user in a readable format.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ entity_name("sensor.living_room_temperature") }}'
type: string
output: "Temperature"

---
filter: '{{ "sensor.living_room_temperature" | entity_name }}'
type: string
output: "Temperature"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
entity_name(
    entity_id: str,
    *,
    fallback: bool = False,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entity_id:
  description: >
    The entity ID to look up. Returns the name as a string, or `None` if the entity does not exist.
  required: true
  type: string
fallback:
  description: >
    If `true`, returns the name of the device when the entity has no name of its own, such as the main entity of a device. For example, `entity_name("switch.coffee_machine", fallback=true)` returns `Coffee machine` instead of an empty string.
  required: false
  default: "false"
  type: boolean
{% endfunction_parameters %}

## Good to know

- Returns `None` when the entity does not exist. Chain with [`| default(value)`](/template-functions/default/) for a fallback.
- Uses the name from the entity registry first, without the device name, then falls back to the friendly name of the state object.
- An entity without a name of its own, such as the main entity of a device, returns an empty string. To get the device name instead, use `fallback=true`.
- When you use `entity_name` as a filter, add the parameter in parentheses: `| entity_name(fallback=true)`. With [`map`](/template-functions/map/), use `map("entity_name", fallback=true)`.
- If the entity has its own area assigned, instead of using the area of its device, `fallback=true` does not return the device name.
- Pass an entity ID, not a state object.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Use entity names in a notification

Send a {% term notification %} with the name of a {% term sensor %} instead of its entity ID.
If the sensor is the main entity of its device, `fallback=true` uses the device name.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          {{ entity_name("binary_sensor.front_door", fallback=true) }} is
          {{ states("binary_sensor.front_door") }}
{% endexample %}

### List names of all lights that are on

Loop through all light entities and display the name of each one that is currently on.
Lights are often the main entity of their device, so `fallback=true` uses the device name for them.

{% example %}
template: |
  {% for light in states.light | selectattr("state", "eq", "on") %}
    {{ entity_name(light.entity_id, fallback=true) }}
  {% endfor %}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
