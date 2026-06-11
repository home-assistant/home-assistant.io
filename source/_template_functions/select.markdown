---
title: "Filter items by test: select"
function_name: "select"
description: "Filters a list, keeping only items that pass a given test."
available_as:
  - filter
category: collection
return_type: iterable
limited: true
since: "0.7"
related_functions:
  - reject
  - selectattr
  - rejectattr
  - map
---

The `select` filter iterates over a list and keeps only the items that pass a given test. Each item is tested individually, and only those for which the test returns true are included in the result.

This is one of the most powerful filters for working with lists of values in Home Assistant templates. You can use it to filter numeric values (keep only those above a threshold), filter strings (keep only those matching a pattern), or apply any of the built-in tests. It works on the items themselves; to filter by an attribute of each item, use [`selectattr`](/template-functions/selectattr/) instead. The `select` filter is commonly combined with [`map`](/template-functions/map/) to first extract values, then filter them.

{% include template_functions/usage.md %}

{% template_function_usage %}
filter: '{{ [1, 2, 3, 4, 5] | select("greaterthan", 3) | list }}'
type: list
output: "[4, 5]"
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
select(
    value: list,
    *args: str,
) -> iterable
```

### Function parameters

The following parameters can be provided to this filter.

{% function_parameters %}
value:
  description: >
    The list of items to filter.
  required: true
  type: list
args:
  description: >
    The test name as a string, optionally followed by arguments for the test. If no test is provided, items are tested for truthiness. Common tests include `equalto`, `greaterthan`, `lessthan`, [`string`](/template-functions/string/), `number`, [`contains`](/template-functions/contains/), [`is_state`](/template-functions/is_state/), and [`is_number`](/template-functions/is_number/).
  required: false
  type: string
{% endfunction_parameters %}

## Filter by truthiness

When no test is specified, `select` keeps items that are truthy (not `false`, `0`, `none`, or empty).

{% example %}
template: '{{ [0, 1, "", "hello", none, true] | select | list }}'
type: list
output: "[1, 'hello', True]"
{% endexample %}

## Common tests

### Greater than / less than

{% example %}
template: |
  {{
    [18.5, 21.3, 25.0, 19.8, 22.1]
    | select("greaterthan", 20)
    | list
  }}
title: Temperatures above 20
type: list
output: "[21.3, 25.0, 22.1]"
{% endexample %}

### Equal to

{% example %}
template: |
  {{ ["on", "off", "on", "off", "on"] | select("equalto", "on") | list }}
title: Keep only "on" values
type: list
output: "['on', 'on', 'on']"
{% endexample %}

### Contains

{% example %}
template: |
  {{
    ["sunny", "light rain", "cloudy", "heavy rain"]
    | select("contains", "rain")
    | list
  }}
title: Weather conditions with rain
type: list
output: "['light rain', 'heavy rain']"
{% endexample %}

## Good to know

- Returns an iterable, not a list. Add [`| list`](/template-functions/list/) before using it with [`length`](/template-functions/length/), [`first`](/template-functions/first/), or looping twice.
- Without a test, truthy items are kept. Zero, empty string, and `None` are dropped because they are falsy.
- To filter by an attribute of each item, use [`selectattr`](/template-functions/selectattr/) instead.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Filter numeric values from sensor data

After extracting state values, keep only those that are valid numbers.

{% example %}
template: |
  {{
    expand("group.temperature_sensors")
    | map(attribute="state")
    | select("is_number")
    | map("float")
    | list
  }}
type: list
output: "[21.5, 19.8, 22.3]"
{% endexample %}

### Find temperatures above a threshold

Extract values, convert to float, and filter for those above a target.

{% example %}
template: |
  {{
    expand("group.temperature_sensors")
    | map(attribute="state")
    | map("float")
    | select("greaterthan", 21)
    | list
  }}
type: list
output: "[21.5, 22.3]"
{% endexample %}

### Count values matching a condition

Combine `select` with [`list`](/template-functions/list/) and [`length`](/template-functions/length/) to count matching items.

{% example %}
template: |
  {{
    expand("group.all_doors")
    | map(attribute="state")
    | select("equalto", "on")
    | list
    | length
  }}
title: Number of open doors
type: integer
output: "2"
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
