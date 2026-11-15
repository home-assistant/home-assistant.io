---
title: "Get length of a collection: length"
function_name: "length"
description: "Returns the number of items in a list, characters in a string, or keys in a dictionary. Also available as count."
available_as:
  - filter
aliases:
  - count
category: collection
return_type: integer
limited: true
since: "0.7"
related_functions:
  - first
  - last
  - select
---

The `length` filter returns the number of items in a collection. For lists, it returns the number of elements. For strings, it returns the number of characters. For dictionaries, it returns the number of keys. It is also available under the alias `count`.

This is one of the most commonly used filters when working with {% term entity %} collections. You will frequently use it to count how many lights are on, how many doors are open, how many {% term sensors %} are above a threshold, or how many {% term devices %} are in a particular area. It typically appears at the end of a filter chain after [`select`](/template-functions/select/), [`selectattr`](/template-functions/selectattr/), or [`expand`](/template-functions/expand/).

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ [1, 2, 3, 4, 5] | length }}'
type: integer
output: "5"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
length(
    value: Sized,
) -> int
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list, string, or dictionary to measure. Any object that supports `len()` is accepted.
  required: true
  type: any
{% endfunction_parameters %}

## The count alias

The `count` filter is an alias for `length`. They behave identically.

{% example %}
template: '{{ ["a", "b", "c"] | count }}'
type: integer
output: "3"
{% endexample %}

## Good to know

- Cannot count generators directly. Add [`| list`](/template-functions/list/) after [`select`](/template-functions/select/), [`map`](/template-functions/map/), or [`selectattr`](/template-functions/selectattr/) first.
- For strings, it counts characters, not words or bytes.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Count how many lights are on

Count the number of lights currently in the "on" state.

{% example %}
template: |
  {{
    expand("light.home_lights")
    | selectattr("state", "eq", "on")
    | list
    | length
  }}
type: integer
output: "5"
{% endexample %}

### Count open doors

Count how many door sensors report an "on" (open) state.

{% example %}
template: |
  {{
    expand("binary_sensor.door_sensors")
    | selectattr("state", "eq", "on")
    | list
    | count
  }}
type: integer
output: "2"
{% endexample %}

### Get the number of attributes on an entity

Count how many attributes a particular entity has.

{% example %}
template: '{{ states.sensor.weather.attributes | length }}'
type: integer
output: "8"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
