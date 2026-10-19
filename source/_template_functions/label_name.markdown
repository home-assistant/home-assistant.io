---
title: "Get label name: label_name"
function_name: "label_name"
description: "Returns the friendly name of a label from its ID."
available_as:
  - function
  - filter
category: label
return_type: string
limited: false
since: "2024.4"
related_functions:
  - label_id
  - label_description
  - labels
  - label_areas
  - label_devices
  - label_entities
---

The `label_name` template function returns the friendly, human-readable name of a {% term label %} from its internal ID. Every label in Home Assistant has an ID (like energy_monitoring) and a display name (like _"Energy Monitoring"_), and this function converts the ID to the name.

This is especially useful for building dynamic messages and {% term notifications %}. Instead of showing a technical label ID, you can display the actual name you (or whoever receives the message) recognize. For example, when listing the labels applied to an {% term entity %} or {% term device %}, you could convert each label ID returned by [`labels`](/template-functions/labels/) into its friendly name for a more readable output.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ label_name("critical") }}'
type: string
output: "Critical"

---
filter: '{{ "critical" | label_name }}'
type: string
output: "Critical"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
label_name(
    lookup_value: str,
) -> str | None
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
lookup_value:
  description: >
    The label ID to look up. Returns the friendly name of the label, or `None` if no label with that ID exists.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns `None` when the label does not exist.
- Only takes a label ID, not a name. The name comes back as the display string you see in the UI.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Display a label's friendly name

Convert a label ID into its human-readable name.

{% example %}
template: '{{ label_name("energy_monitoring") }}'
type: string
output: "Energy Monitoring"
{% endexample %}

### List all label names

Loop through all labels and display their friendly names using [`labels`](/template-functions/labels/) combined with `label_name`.

{% example %}
template: |
  {% for lbl_id in labels() %}
    {{ label_name(lbl_id) }}
  {% endfor %}
type: string
output: |
  Outdoor
  Critical
  Energy Monitoring
{% endexample %}

### Show the labels on an entity as names

Get the labels assigned to an entity and display their friendly names instead of IDs.

{% example %}
template: |
  {{
    labels("sensor.living_room_temperature")
    | map("label_name")
    | join(", ")
  }}
type: string
output: "Critical, Energy Monitoring"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
