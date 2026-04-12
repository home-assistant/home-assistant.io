---
title: "Remove items by attribute test: rejectattr"
function_name: "rejectattr"
description: "Filters a list, removing items where a specified attribute passes a test. The opposite of selectattr."
available_as:
  - filter
category: collection
return_type: iterable
limited: true
since: "0.7"
related_functions:
  - selectattr
  - reject
  - select
  - map
  - expand
---

The `rejectattr` filter is the opposite of [`selectattr`](/template-functions/selectattr/). It iterates over a list of objects and removes those where a specified attribute passes the given test, keeping only those that fail it.

This is useful when you want to exclude {% term entities %} based on an attribute rather than select them. For example, you might want to remove all unavailable entities from a list, exclude entities that are off, or filter out sensors with a specific device class. It provides a cleaner, more readable alternative to writing [`selectattr`](/template-functions/selectattr/) with a negated condition.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: |
  {{ expand("group.all_lights")
    | rejectattr("state", "eq", "off")
    | map(attribute="entity_id")
    | list
  }}
type: list
output: '["light.kitchen", "light.living_room"]'
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
rejectattr(
    value: list,
    attribute: str,
    *args: str,
) -> iterable
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list of objects to filter.
  required: true
  type: list
attribute:
  description: >
    The attribute to test on each item. Supports dotted notation for nested attributes (for example, `attributes.device_class`).
  required: true
  type: string
args:
  description: >
    The test name and optional arguments. If only an attribute is provided (no test), items are removed when the attribute is truthy. Common tests include [`eq`](/template-functions/eq/), [`ne`](/template-functions/ne/), [`gt`](/template-functions/gt/), [`lt`](/template-functions/lt/), [`contains`](/template-functions/contains/), and `in`.
  required: false
  type: string
{% endfunction_parameters %}

## Reject by truthiness

When no test is specified, items are removed if the attribute value is truthy.

{% example %}
template: |
  {{
    expand("group.all_lights")
    | rejectattr("attributes.brightness")
    | map(attribute="entity_id")
    | list
  }}
title: Lights without a brightness value set
type: list
output: '["light.hall", "light.porch"]'
{% endexample %}

## Good to know

- Returns an iterable, not a list. Add [`| list`](/template-functions/list/) before using it with [`length`](/template-functions/length/), [`first`](/template-functions/first/), or looping twice.
- Without a test, items are removed when the attribute is truthy.
- Numeric comparisons against state strings compare alphabetically unless you convert first. `"9"` is greater than `"10"` as strings.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Exclude unavailable entities

Remove entities that are unavailable or unknown before processing.

{% example %}
template: |
  {{
    expand("group.all_sensors")
    | rejectattr("state", "in", ["unavailable", "unknown"])
    | map(attribute="entity_id")
    | list
  }}
title: Only available sensors
type: list
output: '["sensor.temperature", "sensor.humidity", "sensor.pressure"]'
{% endexample %}

### Remove entities that are off

Keep only entities that are not in the "off" state.

{% example %}
template: |
  {{
    expand("group.all_lights")
    | rejectattr("state", "eq", "off")
    | map(attribute="name")
    | join(", ")
  }}
type: string
output: "Kitchen light, Living room light"
{% endexample %}

### Exclude a specific device class

Remove sensors of a particular device class from a collection.

{% example %}
template: |
  {{
    expand("group.all_sensors")
    | rejectattr("attributes.device_class", "eq", "battery")
    | map(attribute="entity_id")
    | list
  }}
title: All sensors except battery sensors
type: list
output: '["sensor.temperature", "sensor.humidity", "sensor.pressure"]'
{% endexample %}

### Chain rejectattr with selectattr

Combine both filters to precisely control which entities are included.

{% example %}
template: |
  {{
    expand("group.all_sensors")
    | rejectattr("state", "in", ["unavailable", "unknown"])
    | selectattr("attributes.device_class", "eq", "temperature")
    | map(attribute="state")
    | map("float")
    | average
    | round(1)
  }}
title: Average temperature excluding unavailable sensors
type: float
output: "21.2"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
