---
title: "Get entity name: entity_name"
function_name: "entity_name"
description: "Gets the friendly name of an entity from its entity ID."
available_as:
  - function
  - filter
category: entity
return_type: "string or None"
limited: false
since: "2023.10"
related_functions:
  - states
  - is_hidden_entity
  - area_name
---

The `entity_name` template function returns the friendly name of an {% term entity %} given its entity ID. It looks up the name from the {% term entity %} registry first, falling back to the state object if the entity is not registered. If the entity does not exist at all, it returns `None`.

This is helpful whenever you want to display a human-readable name instead of a raw entity ID. For example, you might want to build a {% term notification %} that says "The Living Room Light is on" instead of "light.living_room is on". It is also useful when looping over a list of entity IDs and you need to present their names to a user in a readable format.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ entity_name("sensor.living_room_temperature") }}'
type: string
output: "Living Room Temperature"

---
filter: '{{ "sensor.living_room_temperature" | entity_name }}'
type: string
output: "Living Room Temperature"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
entity_name(
    entity_id: str,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entity_id:
  description: >
    The entity ID to look up. Returns the friendly name as a string, or `None` if the entity does not exist.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `None` when the entity does not exist. Chain with [`| default(value)`](/template-functions/default/) for a fallback.
- Uses the friendly name from the entity registry first, then falls back to the state object's friendly name.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Use entity names in a notification

Send a {% term notification %} with the friendly name of a {% term sensor %} instead of its entity ID.

{% example %}
action: |
  action:
    - action: notify.mobile
      data:
        message: >
          {{ entity_name("binary_sensor.front_door") }} is
          {{ states("binary_sensor.front_door") }}
{% endexample %}

### List names of all lights that are on

Loop through all light entities and display the friendly name of each one that is currently on.

{% example %}
template: |
  {% for light in states.light | selectattr("state", "eq", "on") %}
    {{ entity_name(light.entity_id) }}
  {% endfor %}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
