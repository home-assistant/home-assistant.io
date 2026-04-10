---
title: "Get entities with a label: label_entities"
function_name: "label_entities"
description: "Returns a list of entity IDs that have a specific label assigned."
available_as:
  - function
  - filter
category: label
return_type: list
limited: true
since: "2024.4"
related_functions:
  - label_areas
  - label_devices
  - labels
  - label_id
  - label_name
---

The `label_entities` template function returns a list of {% term entity %} IDs that have a specific {% term label %} assigned. You can specify the label by its name or by its internal ID. This gives you all entities tagged with that label.

This is useful when you want to act on a group of entities that share a common label, regardless of which {% term area %} or {% term device %} they belong to. For example, if you label certain sensors as _"Critical"_, you could use `label_entities` to monitor all of them at once, or if you label energy-related entities as _"Energy Monitoring"_, you could build a dashboard that automatically includes every labeled entity. As you add or remove labels from entities, the list automatically updates, so your {% term automations %} and {% term templates %} always stay current.

{% tip %}
Automation actions can target entities by label through the visual editor, no template needed. Reach for `label_entities()` when you need to loop over or filter the entities inside a template expression.
{% endtip %}

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ label_entities("Critical") }}'
type: list
output: |
  [
    "sensor.living_room_temperature",
    "binary_sensor.front_door",
    "binary_sensor.smoke_detector",
  ]

---
filter: '{{ "Critical" | label_entities }}'
type: list
output: |
  [
    "sensor.living_room_temperature",
    "binary_sensor.front_door",
    "binary_sensor.smoke_detector",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
label_entities(
    label_id_or_name: str,
) -> list[str]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
label_id_or_name:
  description: >
    The label name or ID to look up. Returns the entity IDs that have this label assigned. You can find labels in {% my labels title="**Settings** > **Areas, labels & zones**" %}.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Only returns entities with the label assigned directly. Labels applied to devices or areas do not roll up to their entities.
- Returns an empty list when the label does not match any entities.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count entities with a specific label

Find out how many entities are tagged with a given label.

{% example %}
template: '{{ label_entities("Critical") | count }}'
type: integer
output: "3"
{% endexample %}

### Check if any critical entity is unavailable

Monitor all entities with a specific label and report if any of them are unavailable.

{% example %}
template: |
  {{
    label_entities("Critical")
    | select("is_state", "unavailable")
    | list
    | count > 0
  }}
type: boolean
output: "false"
{% endexample %}

### List the states of all labeled entities

Display the current state of every entity that has a given label.

{% example %}
template: |
  {% for entity_id in label_entities("Energy Monitoring") %}
    {{ state_attr(entity_id, "friendly_name") }}: {{ states(entity_id) }}
  {% endfor %}
type: string
output: |
  Living Room Power: 120
  Kitchen Power: 85
  Dryer Power: 2400
{% endexample %}

### Sum up energy usage from labeled entities

Calculate the total value across all entities with a specific label. This is useful for energy monitoring dashboards.

{% example %}
template: |
  {{
    label_entities("Energy Monitoring")
    | map("states")
    | map("float", default=0)
    | sum
  }}
type: float
output: "2605.0"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
