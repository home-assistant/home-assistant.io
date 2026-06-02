---
title: "Filter items by attribute test: selectattr"
function_name: "selectattr"
description: "Filters a list, keeping only items where a specified attribute passes a test."
available_as:
  - filter
category: collection
return_type: iterable
limited: true
since: "0.7"
related_functions:
  - rejectattr
  - select
  - reject
  - map
  - expand
---

The `selectattr` filter iterates over a list of objects and keeps only those where a specified attribute passes a given test. It is the attribute-based counterpart of [`select`](/template-functions/select/): while [`select`](/template-functions/select/) tests the item itself, `selectattr` tests an attribute of each item.

This is one of the most frequently used filters in Home Assistant templates. It is the primary way to filter {% term entity %} state objects returned by [`expand`](/template-functions/expand/). You can filter lights that are on, sensors above a threshold, devices in a specific area, or entities matching any condition based on their attributes. It is incredibly versatile and appears in the vast majority of templates that work with entity collections.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: |
  {{ expand("group.all_lights")
    | selectattr("state", "eq", "on")
    | map(attribute="entity_id")
    | list
  }}
type: list
output: '["light.kitchen", "light.living_room"]'
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
selectattr(
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
    The test name and optional arguments. If only an attribute is provided (no test), items are kept when the attribute is truthy. Common tests include [`eq`](/template-functions/eq/), [`ne`](/template-functions/ne/), [`gt`](/template-functions/gt/), [`lt`](/template-functions/lt/), [`ge`](/template-functions/ge/), [`le`](/template-functions/le/), [`contains`](/template-functions/contains/), [`is_state`](/template-functions/is_state/), and `in`.
  required: false
  type: string
{% endfunction_parameters %}

## Filter by truthiness

When no test is specified, items are kept if the attribute value is truthy.

{% example %}
template: |
  {{
    expand("group.all_lights")
    | selectattr("attributes.brightness")
    | map(attribute="entity_id")
    | list
  }}
title: Lights that have a brightness attribute set
type: list
output: '["light.kitchen", "light.living_room"]'
{% endexample %}

## Common tests

### Equal to (eq)

{% example %}
template: |
  {{
    expand("group.all_lights")
    | selectattr("state", "eq", "on")
    | map(attribute="name")
    | join(", ")
  }}
title: Names of lights that are on
type: string
output: "Kitchen light, Living room light"
{% endexample %}

### Not equal to (ne)

{% example %}
template: |
  {{
    expand("group.all_sensors")
    | selectattr("state", "ne", "unavailable")
    | map(attribute="entity_id")
    | list
  }}
title: Available sensors
type: list
output: '["sensor.temperature", "sensor.humidity", "sensor.pressure"]'
{% endexample %}

### Greater than (gt)

{% example %}
template: |
  {{
    expand("group.temperature_sensors")
    | selectattr("state", "gt", "22")
    | map(attribute="entity_id")
    | list
  }}
title: Sensors above 22
type: list
output: '["sensor.kitchen_temp"]'
{% endexample %}

## Good to know

- Returns an iterable, not a list. Add [`| list`](/template-functions/list/) before using it with [`length`](/template-functions/length/), [`first`](/template-functions/first/), [`last`](/template-functions/last/), or looping twice.
- Without a test name, items are kept when the attribute value is truthy. Zero, empty string, and `None` are treated as false.
- Numeric comparisons compare state strings alphabetically unless you convert first. `"9"` is greater than `"10"` as strings. Apply `| map(attribute='state') | map('float')` before comparing, or filter with a test that converts on the fly.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count lights on in a specific area

Filter entities by state and count the results.

{% example %}
template: |
  {{
    expand("group.all_lights")
    | selectattr("state", "eq", "on")
    | list
    | length
  }}
type: integer
output: "3"
{% endexample %}

### Filter by device class

Use dotted notation to filter by nested attributes like device class.

{% example %}
template: |
  {{
    expand("group.all_sensors")
    | selectattr("attributes.device_class", "eq", "temperature")
    | map(attribute="entity_id")
    | list
  }}
type: list
output: |
  ["sensor.bedroom_temp", "sensor.kitchen_temp",
   "sensor.living_room_temp"]
{% endexample %}

### Find entities with state containing a substring

Use the [`contains`](/template-functions/contains/) test to match partial state values.

{% example %}
template: |
  {{
    expand("group.media_players")
    | selectattr("state", "contains", "play")
    | map(attribute="name")
    | join(", ")
  }}
type: string
output: "Living room speaker, Bedroom speaker"
{% endexample %}

### Chain multiple selectattr filters

Apply multiple filters in sequence to narrow down results.

{% example %}
template: |
  {{
    expand("group.all_lights")
    | selectattr("state", "eq", "on")
    | selectattr("attributes.brightness", "gt", 100)
    | map(attribute="name")
    | join(", ")
  }}
title: Bright lights that are on
type: string
output: "Kitchen light, Living room light"
{% endexample %}

### Filter unavailable entities

Find entities that are unavailable or unknown.

{% example %}
template: |
  {{
    expand("group.all_sensors")
    | selectattr("state", "in", ["unavailable", "unknown"])
    | map(attribute="entity_id")
    | list
  }}
title: Sensors that need attention
type: list
output: '["sensor.outdoor_temp", "sensor.garage_humidity"]'
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
