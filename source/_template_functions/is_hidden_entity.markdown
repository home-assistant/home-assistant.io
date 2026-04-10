---
title: "Test if entity is hidden: is_hidden_entity"
function_name: "is_hidden_entity"
description: "Tests if an entity is hidden in the entity registry."
available_as:
  - function
  - test
category: entity
return_type: boolean
limited: false
since: "2023.3"
related_functions:
  - has_value
  - is_state
  - entity_name
  - area_entities
---

The `is_hidden_entity` template function checks whether an {% term entity %} has been marked as hidden in the entity registry. It returns `true` if the entity exists and is hidden, and `false` otherwise.

Hidden entities are ones you have chosen to hide from the default user interface. They still exist and still track state, but they are not shown on dashboards by default. This function is useful when you are looping over entities in an {% term area %} or {% term domain %} and want to skip the ones that have been hidden. For example, you might want to count how many visible sensors are in a room, or build a dynamic dashboard card that only lists entities you have not hidden.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ is_hidden_entity("sensor.internal_diagnostics") }}'
type: boolean
output: "true"

---
test: |
  {% if "sensor.internal_diagnostics" is is_hidden_entity %}
    This entity is hidden
  {% endif %}
type: string
output: "This entity is hidden"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
is_hidden_entity(
    entity_id: str,
) -> bool
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entity_id:
  description: >
    The entity ID to check. Returns `true` if the entity exists in the registry and is hidden. Returns `false` if the entity is not hidden or does not exist.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `false` for entities that do not exist in the registry, not just for visible ones.
- This checks the registry "hidden" flag only. It does not detect entities filtered out by dashboard cards or custom visibility.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count visible entities in an area

Count the number of entities in an {% term area %} that are not hidden, so you know how many are actually shown on the dashboard.

{% example %}
template: |
  {{
    area_entities("Living Room")
    | reject("is_hidden_entity")
    | list
    | count
  }}
type: integer
output: "8"
{% endexample %}

### Filter out hidden entities from a list

Build a list of only the visible sensor entities in the kitchen.

{% example %}
template: |
  {% for entity_id in area_entities("Kitchen")
    | select("match", "sensor.")
    | reject("is_hidden_entity") %}
    {{ entity_id }}
  {% endfor %}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
