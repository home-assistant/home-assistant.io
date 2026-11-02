---
title: "Get areas with a label: label_areas"
function_name: "label_areas"
description: "Returns a list of area IDs that have a specific label assigned."
available_as:
  - function
  - filter
category: label
return_type: list
limited: true
since: "2024.4"
related_functions:
  - label_devices
  - label_entities
  - labels
  - label_id
  - label_name
---

The `label_areas` template function returns a list of {% term area %} IDs that have a specific {% term label %} assigned. You can specify the label by its name or by its internal ID. This gives you all areas tagged with that label.

This is useful when you organize your areas using labels and want to act on groups of rooms. For example, if you label certain areas as _"Outdoor"_, you could use `label_areas` to find all outdoor areas and then turn off their lights at night, or check the temperature in all rooms labeled _"Heated"_. As you add or remove labels from areas, the list automatically updates, so your {% term automations %} and {% term templates %} always stay in sync.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ label_areas("Outdoor") }}'
type: list
output: |
  [
    "patio",
    "garden",
    "driveway",
  ]

---
filter: '{{ "Outdoor" | label_areas }}'
type: list
output: |
  [
    "patio",
    "garden",
    "driveway",
  ]
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
label_areas(
    label_id_or_name: str,
) -> list[str]
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
label_id_or_name:
  description: >
    The label name or ID to look up. Returns the area IDs that have this label assigned. You can find labels in {% my labels title="**Settings** > **Areas, labels & zones**" %}.
  required: true
  type: string
{% endfunction_parameters %}

## Good to know

- Returns an empty list when the label does not exist or no areas carry it.
- Accepts either the label name or the label ID, matching by name first.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count how many areas have a label

Find out how many areas are tagged with a specific label.

{% example %}
template: '{{ label_areas("Outdoor") | count }}'
type: integer
output: "3"
{% endexample %}

### List area names with a specific label

Get the friendly names of all areas that have a given label by combining `label_areas` with [`area_name`](/template-functions/area_name/).

{% example %}
template: |
  {{
    label_areas("Outdoor")
    | map("area_name")
    | join(", ")
  }}
type: string
output: "Patio, Garden, Driveway"
{% endexample %}

### Turn off lights in all areas with a label

Use in an automation to find all areas tagged with a label and act on their entities. This example collects all light entities from areas labeled _"Outdoor"_.

{% example %}
template: |
  {% for area_id in label_areas("Outdoor") %}
    {% for entity_id in area_entities(area_id)
      | select("match", "light.") %}
      {{ entity_id }}
    {% endfor %}
  {% endfor %}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
