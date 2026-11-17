---
title: "Transform list items: map"
function_name: "map"
description: "Applies a filter to each item or extracts an attribute from each item in a list."
available_as:
  - filter
category: collection
return_type: iterable
limited: true
since: "0.7"
related_functions:
  - select
  - selectattr
  - expand
  - sort
---

The `map` filter applies a transformation to each item in a list and returns the results. It can be used in two primary ways: extracting an attribute from each item using `attribute=`, or applying another filter to each item by passing the filter name as a string. This is the standard Jinja `map` filter. You can pass any filter by name, including filters that Home Assistant adds, such as `as_datetime`.

This is one of the most heavily used filters in Home Assistant templates. You will find it in almost every template that works with a collection of {% term entities %}. The `attribute=` form extracts values like `.state`, `.entity_id`, or `.name` from entity state objects returned by [`expand`](/template-functions/expand/). The filter form lets you apply conversions like [`float`](/template-functions/float/), [`int`](/template-functions/int/), or [`round`](/template-functions/round/) to each item in a list, so you can build filter chains that transform raw entity data into useful results.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ expand("sensor.temperature_sensors") | map(attribute="state") | list }}'
type: list
output: '["21.5", "19.8", "22.3"]'
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
map(
    value: list,
    *args: str,
    attribute: str | int | None = None,
    default: Any = None,
) -> iterable
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list of items to transform.
  required: true
  type: list
args:
  description: >
    When extracting attributes, omit this. When applying a filter, pass the filter name as a string (for example, [`float`](/template-functions/float/), [`int`](/template-functions/int/), [`upper`](/template-functions/upper/)), optionally followed by arguments for that filter.
  required: false
  type: string
attribute:
  description: >
    The name of the attribute to extract from each item. Supports dotted notation for nested attributes (for example, `attributes.brightness`). You can also use a number as an index, such as `0` or `"items.0"`.
  required: false
  type: string
default:
  description: >
    A default value to use when an item does not have the specified attribute. It does not replace an attribute that exists but is set to `None`. Only used with `attribute=`.
  required: false
  type: any
{% endfunction_parameters %}

## Extract an attribute from each item

Use `attribute=` to pull a specific property from each item in the list.

{% example %}
template: |
  {{
    expand("light.home_lights")
    | map(attribute="entity_id")
    | list
  }}
title: Get entity IDs from expanded group
type: list
output: '["light.bedroom", "light.kitchen", "light.living_room"]'
{% endexample %}

## Apply a filter to each item

Pass a filter name as a string to apply it to every item in the list.

{% example %}
template: |
  {{
    ["21.5", "19.8", "22.3"]
    | map("float")
    | list
  }}
title: Convert string values to floats
type: list
output: "[21.5, 19.8, 22.3]"
{% endexample %}

## Nested attribute access

Use dotted notation to access nested attributes.

{% example %}
template: |
  {{
    expand("light.home_lights")
    | selectattr("state", "eq", "on")
    | map(attribute="attributes.brightness")
    | list
  }}
title: Get brightness of all lights that are on
type: list
output: "[255, 128, 64]"
{% endexample %}

## Good to know

- Returns an iterable, not a list. Add [`| list`](/template-functions/list/) before using it with [`length`](/template-functions/length/), [`first`](/template-functions/first/), or looping twice.
- `attribute=` extracts a property; a filter name as the first positional argument applies that filter to each item. You can use one or the other, not both.
- Missing attributes are undefined unless you pass `default=`. Home Assistant logs a warning when this happens.
- `default=` only replaces missing attributes. To also replace `None` values, add `| map("default", 0, true)`.
- `map("float")` raises an error on states like `unavailable`. To avoid this, pass a default: `map("float", 0)`.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Calculate average temperature from a group

Extract state values, convert to floats, and compute the average.

{% example %}
template: |
  {{
    expand("sensor.temperature_sensors")
    | map(attribute="state")
    | map("float")
    | average
  }}
type: float
output: "21.2"
{% endexample %}

### Get friendly names of all entities in a group

{% example %}
template: |
  {{
    expand("light.home_lights")
    | map(attribute="name")
    | list
  }}
type: list
output: '["Bedroom light", "Kitchen light", "Living room light"]'
{% endexample %}

### Chain map with round for clean display

Apply multiple transformations by chaining `map` calls.

{% example %}
template: |
  {{
    expand("sensor.temperature_sensors")
    | map(attribute="state")
    | map("float")
    | map("round", 1)
    | list
  }}
type: list
output: "[21.5, 19.8, 22.3]"
{% endexample %}

### Apply string filters to a list

Use `map` to apply string transformations to every item.

{% example %}
template: |
  {{
    ["hello", "world", "template"]
    | map("upper")
    | list
  }}
type: list
output: '["HELLO", "WORLD", "TEMPLATE"]'
{% endexample %}

### Default value for lights that are off

A light that is off has its `brightness` attribute set to `None`. Because the attribute exists, `default=` does not replace it. Instead, use the `default` filter with `true` as the second argument to replace `None` values.

{% example %}
template: |
  {{
    expand("light.home_lights")
    | map(attribute="attributes.brightness")
    | map("default", 0, true)
    | list
  }}
title: Brightness with 0 for lights that are off
type: list
output: "[255, 0, 128]"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
