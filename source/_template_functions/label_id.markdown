---
title: "Get label ID: label_id"
function_name: "label_id"
description: "Returns the label ID for a given label name."
available_as:
  - function
  - filter
category: label
return_type: string
limited: false
since: "2024.4"
related_functions:
  - label_name
  - label_description
  - labels
  - label_areas
  - label_devices
  - label_entities
---

The `label_id` template function returns the unique {% term label %} ID for a given label name. Every label in Home Assistant has an internal ID that stays the same even if you rename the label, and this function lets you look it up from the human-readable name.

This is useful when you need the label ID to pass to other label functions like [`label_areas`](/template-functions/label_areas/), [`label_devices`](/template-functions/label_devices/), or [`label_entities`](/template-functions/label_entities/). For example, you could use it in an {% term automation %} to dynamically find all {% term entities %} or {% term devices %} with a particular label by name, without needing to know the internal ID ahead of time.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ label_id("Critical") }}'
type: string
output: "critical"

---
filter: '{{ "Critical" | label_id }}'
type: string
output: "critical"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
label_id(
    lookup_value: str,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
lookup_value:
  description: >
    The name of the label to look up. Returns the matching label ID, or `None` if no label with that name exists. You can find labels in {% my labels title="**Settings** > **Areas, labels & zones**" %}.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `None` when no label matches the name.
- The match is case-sensitive. `"critical"` does not match a label named `"Critical"`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Look up a label ID by name

Find the internal ID of a label using its friendly name.

{% example %}
template: '{{ label_id("Energy Monitoring") }}'
type: string
output: "energy_monitoring"
{% endexample %}

### Use label ID to find all entities with that label

Combine `label_id` with [`label_entities`](/template-functions/label_entities/) to find all entities that have a specific label, using the label's friendly name.

{% example %}
template: '{{ label_entities(label_id("Critical")) }}'
type: list
output: |
  [
    "sensor.living_room_temperature",
    "binary_sensor.front_door",
  ]
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
