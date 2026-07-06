---
title: "Get entities for an integration: integration_entities"
function_name: "integration_entities"
description: "Returns a list of entity IDs tied to an integration or config entry."
available_as:
  - function
  - filter
category: entity
return_type: "list of strings"
limited: false
since: "2022.4"
related_functions:
  - config_entry_id
  - config_entry_attr
  - area_entities
  - states
---

The `integration_entities` template function returns a list of {% term entity %} IDs that belong to a specific {% term integration %} or config entry. You can pass either a domain name (like `hue`) to get all entities for that integration, or a config entry title (like `Living Room Hue Bridge`) to narrow it down to a specific instance.

This is especially useful when you have multiple instances of the same integration and need to work with entities from only one of them. For example, if you have two Hue bridges, you can get the entities for each one separately by using their config entry titles. You can also use this to count how many entities an integration has created, or to check the state of all entities that belong to a particular integration at once.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ integration_entities("hue") }}'
type: list
output: |
  [
    "light.living_room",
    "light.bedroom",
    "sensor.hue_motion",
  ]

---
filter: '{{ "hue" | integration_entities }}'
type: list
output: |
  [
    "light.living_room",
    "light.bedroom",
    "sensor.hue_motion",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
integration_entities(
    entry_name: str,
) -> list[str]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
entry_name:
  description: >
    The integration domain name (for example, `hue`) or config entry title (for example, `Living Room Hue Bridge`). When a config entry title matches, only entities from that specific config entry are returned. Otherwise, all entities for the domain are returned.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- A domain name returns entities from every config entry of that integration. Use a config entry title to narrow down to one instance.
- Config entry title matches take precedence over domain matches, so a title that looks like a domain name is matched first as a title.
- Returns an empty list when nothing matches, rather than raising an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count entities for an integration

Find out how many entities a specific {% term integration %} has registered.

{% example %}
template: '{{ integration_entities("zwave_js") | count }}'
type: integer
output: "42"
{% endexample %}

### Check if any entity from an integration is unavailable

Loop through all entities from an integration and check if any are in the `unavailable` state.

{% example %}
template: |
  {{
    integration_entities("mqtt")
    | select("is_state", "unavailable")
    | list
    | count > 0
  }}
type: boolean
output: "false"
{% endexample %}

### Get entities from a specific config entry

When you have multiple instances of the same integration, use the config entry title to get entities for only one of them.

{% example %}
template: '{{ integration_entities("Living Room Hue Bridge") }}'
type: list
output: |
  [
    "light.living_room_ceiling",
    "light.living_room_lamp",
  ]
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
