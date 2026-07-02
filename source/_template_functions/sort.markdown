---
title: "Sort a list: sort"
function_name: "sort"
description: "Sorts the items in a list, with optional attribute-based and reverse sorting."
available_as:
  - filter
category: collection
return_type: list
limited: true
since: "0.7"
related_functions:
  - reverse
  - first
  - last
  - dictsort
  - unique
---

The `sort` filter sorts the items of a list in ascending order by default. You can reverse the order, control case sensitivity, and sort by a specific attribute of each item.

This is one of the most frequently used filters when working with {% term entity %} collections. It allows you to sort {% term sensors %} by their state value to find the highest or lowest reading, sort lights by brightness, or sort {% term entities %} alphabetically by name. Combined with [`first`](/template-functions/first/) or [`last`](/template-functions/last/), you can quickly find the minimum or maximum value from any group of entities.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ [3, 1, 4, 1, 5, 9] | sort | list }}'
type: list
output: "[1, 1, 3, 4, 5, 9]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
sort(
    value: list,
    reverse: bool = False,
    case_sensitive: bool = False,
    attribute: str | None = None,
) -> list
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list to sort.
  required: true
  type: list
reverse:
  description: >
    If `true`, sorts in descending order. Defaults to `false`.
  required: false
  default: "false"
  type: boolean
case_sensitive:
  description: >
    If `true`, uppercase letters sort before lowercase. Defaults to `false`, which treats uppercase and lowercase as equal.
  required: false
  default: "false"
  type: boolean
attribute:
  description: >
    Sort by this attribute of each item instead of the item itself. Useful for sorting lists of objects by a specific property.
  required: false
  type: string
{% endfunction_parameters %}

## Sort in descending order

Use `reverse=true` to sort from highest to lowest.

{% example %}
template: '{{ [3, 1, 4, 1, 5, 9] | sort(reverse=true) | list }}'
type: list
output: "[9, 5, 4, 3, 1, 1]"
{% endexample %}

## Sort by attribute

Sort a list of objects by a specific attribute. This is particularly powerful with entity state objects.

{% example %}
template: |
  {{
    expand("group.temperature_sensors")
    | sort(attribute="state")
    | map(attribute="entity_id")
    | list
  }}
title: Sort sensors by state value
type: list
output: |
  ["sensor.bedroom_temp", "sensor.living_room_temp",
   "sensor.kitchen_temp"]
{% endexample %}

## Good to know

- The default sort is case-insensitive. Pass `case_sensitive=true` for exact-case ordering.
- Sorting a list of entity states sorts strings alphabetically, so `"9"` comes after `"10"`. Convert values to numbers first if you need numeric ordering.
- Mixing types (strings and numbers together) raises an error.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Find the brightest light

Sort lights by brightness in descending order and get the first one.

{% example %}
template: |
  {{
    expand("group.home_lights")
    | selectattr("state", "eq", "on")
    | sort(attribute="attributes.brightness", reverse=true)
    | map(attribute="entity_id")
    | first
  }}
type: string
output: "light.living_room"
{% endexample %}

### Sort entities alphabetically by friendly name

Sort a group of entities by their friendly name attribute for display.

{% example %}
template: |
  {% for entity in expand("group.home_lights")
    | sort(attribute="name") %}
    {{ entity.name }}: {{ entity.state }}
  {% endfor %}
type: string
output: |
  Bedroom light: off
  Kitchen light: on
  Living room light: on
{% endexample %}

### Get the coldest and warmest temperatures

Use `sort` with [`first`](/template-functions/first/) and [`last`](/template-functions/last/) to find both extremes.

{% example %}
template: |
  {% set sensors = expand("group.temperature_sensors")
     | sort(attribute="state") %}
  Coldest: {{ sensors | first | attr("entity_id") }}
  Warmest: {{ sensors | last | attr("entity_id") }}
type: string
output: |
  Coldest: sensor.bedroom_temperature
  Warmest: sensor.kitchen_temperature
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
