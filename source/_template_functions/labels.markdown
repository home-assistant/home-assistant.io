---
title: "Get all labels: labels"
function_name: "labels"
description: "Returns a list of all label IDs, or the labels assigned to a specific entity, device, or area."
available_as:
  - function
  - filter
category: label
return_type: list
limited: true
since: "2024.4"
related_functions:
  - label_id
  - label_name
  - label_description
  - label_areas
  - label_devices
  - label_entities
---

The `labels` template function returns a list of all {% term label %} IDs in your Home Assistant instance when called without an argument. When called with an {% term entity %} ID, {% term device %} ID, or {% term area %} ID, it returns only the labels assigned to that specific item.

Labels are tags you can assign to entities, devices, and areas for organization. This function is useful when you want to work with your labels programmatically. For example, you could list all labels in your system, check which labels are applied to a particular sensor, or build {% term automations %} that act on items based on their label assignments. Since labels can be added or removed at any time, using `labels()` ensures your {% term templates %} always reflect your current setup.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ labels() }}'
type: list
output: |
  [
    "outdoor",
    "critical",
    "energy_monitoring",
  ]

---
filter: '{{ "light.living_room" | labels }}'
type: list
output: |
  [
    "outdoor",
    "critical",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
labels() -> list[str]
labels(
    lookup_value: str,
) -> list[str]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
lookup_value:
  description: >
    An entity ID, device ID, or area ID to look up. When provided, only the labels assigned to that item are returned. When omitted, all label IDs are returned.
  required: false
  type: string
{% endfunction_parameters %}

## Good to know

- Without an argument, returns all label IDs. With an ID, returns only labels assigned to that specific entity, device, or area.
- Labels on a device or area do not roll up into the labels of their entities.
- Returns an empty list when the lookup value does not match or has no labels.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count how many labels you have

A convenient way to see how many labels are defined in your Home Assistant instance.

{% example %}
template: '{{ labels() | count }}'
type: integer
output: "3"
{% endexample %}

### Get labels for a specific entity

Find out which labels have been assigned to a particular entity.

{% example %}
template: '{{ labels("sensor.living_room_temperature") }}'
type: list
output: |
  [
    "critical",
    "energy_monitoring",
  ]
{% endexample %}

### Get labels for an area

Check which labels are assigned to a specific area by passing its area ID.

{% example %}
template: '{{ labels("living_room") }}'
type: list
output: |
  [
    "outdoor",
  ]
{% endexample %}

### Check if an entity has a specific label

Determine whether a particular label has been applied to an entity.

{% example %}
template: '{{ "critical" in labels("sensor.living_room_temperature") }}'
type: boolean
output: "true"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
